import type { ContactFormValues } from "@/lib/contact-schema";

export function formatLeadMessage(lead: ContactFormValues, at: Date): string {
  return [
    "🔔 НОВА ЗАЯВКА — DEVSITE",
    `👤 Ім'я: ${lead.name}`,
    `📞 Телефон: ${lead.phone}`,
    `📧 Email: ${lead.email}`,
    `🌐 Тип сайту: ${lead.projectType}`,
    `💬 Повідомлення: ${lead.message}`,
    `🕒 Дата та час: ${formatKyiv(at)}`,
  ].join("\n");
}

function formatKyiv(date: Date): string {
  const parts = new Intl.DateTimeFormat("uk-UA", {
    timeZone: "Europe/Kyiv",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";
  return `${value("day")}.${value("month")}.${value("year")}, ${value("hour")}:${value("minute")}`;
}
