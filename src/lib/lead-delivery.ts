import { createTransport } from "nodemailer";
import type { ContactFormValues } from "@/lib/contact-schema";
import { formatLeadMessage } from "@/lib/lead-message";

type SmtpConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  to: string;
};

function smtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT);
  const user = process.env.SMTP_USER?.trim();
  const password = process.env.SMTP_PASSWORD;
  const to = process.env.MAIL_TO?.trim();
  if (!host || !Number.isInteger(port) || port <= 0 || !user || !password || !to) {
    return null;
  }
  return { host, port, user, password, to };
}

export async function sendLeadEmail(lead: ContactFormValues, at: Date): Promise<boolean> {
  const config = smtpConfig();
  if (!config) {
    console.error("Lead email skipped: SMTP env is incomplete");
    return false;
  }

  try {
    const transport = createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      requireTLS: config.port === 587,
      auth: { user: config.user, pass: config.password },
    });
    const text = formatLeadMessage(lead, at);
    await transport.sendMail({
      from: `DevSite <${config.user}>`,
      to: config.to,
      replyTo: lead.email,
      subject: `Нова заявка DevSite — ${lead.name}`,
      text,
    });
    return true;
  } catch {
    console.error("Lead email failed");
    return false;
  }
}

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

export async function deliverLead(
  lead: ContactFormValues,
  at: Date,
): Promise<{ email: boolean; telegram: boolean }> {
  const [email, telegram] = await Promise.all([
    sendLeadEmail(lead, at),
    sendLeadTelegram(lead, at),
  ]);
  return { email, telegram };
}
