import { createHash } from "node:crypto";
import type { ContactFormValues } from "@/lib/contact-schema";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const DEDUPE_MS = 15 * 60 * 1000;

const attempts = new Map<string, number[]>();
const deliveredAt = new Map<string, number>();
const inFlight = new Set<string>();

export function clientAddress(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim();
  return ip || request.headers.get("x-real-ip") || "unknown";
}

export function allowAttempt(ip: string, now = Date.now()): boolean {
  const recent = (attempts.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_ATTEMPTS) {
    attempts.set(ip, recent);
    return false;
  }
  recent.push(now);
  attempts.set(ip, recent);
  return true;
}

export function leadFingerprint(lead: ContactFormValues): string {
  const phone = lead.phone.replace(/\D/g, "");
  return createHash("sha256")
    .update(`${lead.email.toLowerCase()}|${phone}|${lead.message}`)
    .digest("hex");
}

export function claimLead(key: string, now = Date.now()): "new" | "duplicate" | "busy" {
  const sentAt = deliveredAt.get(key);
  if (sentAt !== undefined && now - sentAt < DEDUPE_MS) return "duplicate";
  if (inFlight.has(key)) return "busy";
  inFlight.add(key);
  return "new";
}

export function settleLead(key: string, delivered: boolean, now = Date.now()): void {
  inFlight.delete(key);
  if (delivered) deliveredAt.set(key, now);
}
