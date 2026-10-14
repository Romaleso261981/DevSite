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
    return Response.json(
      { ok: false, error: "Запит відхилено." },
      { status: 403 },
    );
  }

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return Response.json(
      { ok: false, error: "Не вдалося прочитати заявку." },
      { status: 400 },
    );
  }

  if (raw.length > MAX_BODY_BYTES) {
    return Response.json(
      { ok: false, error: "Заявка занадто велика." },
      { status: 413 },
    );
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return Response.json(
      { ok: false, error: "Некоректний запит." },
      { status: 400 },
    );
  }

  if (isHoneypotFilled(body)) {
    return Response.json({ ok: true, delivered: false });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Перевірте заповнення форми." },
      { status: 400 },
    );
  }

  const ip = clientAddress(request);
  if (!allowAttempt(ip)) {
    return Response.json(
      { ok: false, error: "Забагато спроб. Спробуйте трохи пізніше." },
      { status: 429 },
    );
  }

  const key = leadFingerprint(parsed.data);
  const claim = claimLead(key);
  if (claim === "duplicate") {
    return Response.json({ ok: true, delivered: true, duplicate: true });
  }
  if (claim === "busy") {
    return Response.json(
      { ok: false, error: "Заявка вже надсилається." },
      { status: 409 },
    );
  }

  const channels = await deliverLead(parsed.data, new Date());
  const delivered = channels.email || channels.telegram;
  settleLead(key, delivered);

  if (!delivered) {
    return Response.json(
      {
        ok: false,
        error:
          "Не вдалося надіслати заявку. Спробуйте ще раз або напишіть нам на пошту, вказану на сторінці.",
      },
      { status: 502 },
    );
  }

  return Response.json({ ok: true, delivered: true });
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
  if (!body || typeof body !== "object" || !("company" in body)) return false;
  const value = body.company;
  return typeof value === "string" && value.trim().length > 0;
}
