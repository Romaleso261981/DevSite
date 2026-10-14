import { contactSchema } from "@/lib/contact-schema";
import { deliverLead } from "@/lib/lead-delivery";
import {
  allowAttempt,
  claimLead,
  clientAddress,
  leadFingerprint,
  settleLead,
} from "@/lib/lead-guard";

const MAX_BODY_BYTES = 16_000;

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return respond(request, 403, { ok: false, error: "Запит відхилено." });
  }

  let body: unknown;
  try {
    body = await readBody(request);
  } catch (error) {
    const tooLarge = error instanceof Error && error.message === "too-large";
    return respond(
      request,
      tooLarge ? 413 : 400,
      {
        ok: false,
        error: tooLarge ? "Заявка занадто велика." : "Некоректний запит.",
      },
    );
  }

  if (isHoneypotFilled(body)) {
    return respond(request, 200, { ok: true, delivered: false });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return respond(request, 400, {
      ok: false,
      error: "Перевірте заповнення форми.",
    });
  }

  const ip = clientAddress(request);
  if (!allowAttempt(ip)) {
    return respond(request, 429, {
      ok: false,
      error: "Забагато спроб. Спробуйте трохи пізніше.",
    });
  }

  const key = leadFingerprint(parsed.data);
  const claim = claimLead(key);
  if (claim === "duplicate") {
    return respond(request, 200, {
      ok: true,
      delivered: true,
      duplicate: true,
    });
  }
  if (claim === "busy") {
    return respond(request, 409, {
      ok: false,
      error: "Заявка вже надсилається.",
    });
  }

  const channels = await deliverLead(parsed.data, new Date());
  const delivered = channels.email || channels.telegram;
  settleLead(key, delivered);

  if (!delivered) {
    return respond(request, 502, {
      ok: false,
      error:
        "Не вдалося надіслати заявку. Спробуйте ще раз або напишіть нам на пошту, вказану на сторінці.",
    });
  }

  return respond(request, 200, { ok: true, delivered: true });
}

async function readBody(request: Request): Promise<unknown> {
  const type = request.headers.get("content-type") ?? "";
  if (type.includes("application/json")) {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) throw new Error("too-large");
    return JSON.parse(raw) as unknown;
  }

  const form = await request.formData();
  return {
    name: textField(form.get("name")),
    email: textField(form.get("email")),
    phone: textField(form.get("phone")),
    projectType: textField(form.get("projectType")),
    message: textField(form.get("message")),
    hp_leave_blank: textField(form.get("hp_leave_blank")),
  };
}

function textField(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value : "";
}

function respond(
  request: Request,
  status: number,
  body: Record<string, unknown>,
) {
  if (request.headers.get("sec-fetch-mode") === "navigate") {
    const url = new URL("/", request.url);
    url.searchParams.set("lead", body.delivered === true ? "sent" : "error");
    url.hash = "contact";
    return Response.redirect(url, 303);
  }
  return Response.json(body, { status });
}

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const host = request.headers.get("host");
  if (!host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function isHoneypotFilled(body: unknown): boolean {
  if (!body || typeof body !== "object" || !("hp_leave_blank" in body)) return false;
  const value = body.hp_leave_blank;
  return typeof value === "string" && value.trim().length > 0;
}
