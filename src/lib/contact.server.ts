import { Resend } from "resend";
import type { ContactFormData } from "./contact";

export async function sendEmailWithResend(data: ContactFormData) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY belum dikonfigurasi pada environment variables.");
  }

  const resend = new Resend(apiKey);
  const { data: result, error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: "prajadewanata@gmail.com",
    replyTo: data.email,
    subject: `[Portfolio] New message from ${data.name}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #111; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
        <h2 style="margin-top: 0; color: #111827; border-bottom: 2px solid #f3f4f6; padding-bottom: 12px; font-size: 20px;">
          📬 Pesan Baru dari Website Portofolio
        </h2>
        <div style="margin: 16px 0;">
          <p style="margin: 6px 0;"><strong>Pengirim:</strong> ${data.name}</p>
          <p style="margin: 6px 0;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">${data.email}</a></p>
        </div>
        <div style="margin-top: 20px;">
          <p style="margin-bottom: 8px;"><strong>Isi Pesan:</strong></p>
          <div style="background-color: #f9fafb; padding: 16px; border-left: 4px solid #111827; border-radius: 4px; white-space: pre-wrap; font-size: 14px; color: #374151;">
${data.message}
          </div>
        </div>
        <hr style="border: none; border-top: 1px solid #f3f4f6; margin: 24px 0 16px 0;" />
        <p style="font-size: 12px; color: #9ca3af; margin: 0;">
          Pesan ini dikirim secara otomatis melalui formulir kontak portofolio Anda.
        </p>
      </div>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    throw new Error(error.message);
  }

  return { success: true, id: result?.id };
}
