import { createServerFn } from "@tanstack/react-start";

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const sendContactEmail = createServerFn({ method: "POST" })
  .handler(async ({ data }: { data: ContactFormData }) => {
    const { sendEmailWithResend } = await import("./contact.server");
    return await sendEmailWithResend(data);
  });
