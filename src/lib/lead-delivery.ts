import type { ContactFormValues } from "@/lib/contact-schema";
import { formatLeadMessage } from "@/lib/lead-message";

export async function sendLeadTelegram(
  lead: ContactFormValues,
  at: Date,
): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
  if (!token || !chatId) {
    console.error("Lead telegram skipped: bot env is incomplete");
    return false;
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: formatLeadMessage(lead, at),
          disable_web_page_preview: true,
        }),
      },
    );
    if (!response.ok) {
      console.error("Lead telegram failed");
      return false;
    }
    return true;
  } catch {
    console.error("Lead telegram failed");
    return false;
  }
}
