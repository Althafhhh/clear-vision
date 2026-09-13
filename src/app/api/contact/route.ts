import { Resend } from "resend";
import { NextResponse } from "next/server";

// TODO: replace with a verified domain address once set up in Resend.
// Until the domain is verified, Resend can only deliver to the account's
// own signup email: see Althaf's notes on Resend domain setup.
const FROM_ADDRESS = "Clear Vision Website <noreply@clearvision.lk>";
const TO_ADDRESS = "clearvisioncare@gmail.com";

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Instantiated here (not at module scope) so the RESEND_API_KEY env var
    // is only required at request time, not at build time.
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: FROM_ADDRESS,
      to: TO_ADDRESS,
      replyTo: email,
      subject: `New enquiry from ${name}: Clear Vision website`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || ":"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
