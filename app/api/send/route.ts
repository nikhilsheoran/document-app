import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["thenikhilsheoran@gmail.com"],
      subject: "Hello world",
      react: EmailTemplate({ firstName: "Nikhil" }),
      text: '',
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
