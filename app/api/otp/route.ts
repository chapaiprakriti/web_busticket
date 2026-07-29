import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { saveOtp, verifyOtp } from "@/lib/otp-store";

function getResend(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }
  return new Resend(apiKey);
}

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, email, otp } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ success: false, message: "Invalid email" }, { status: 400 });
    }

    if (action === "send") {
      const code = generateOtp();
      saveOtp(email, code);

      const resend = getResend();
      const { error } = await resend.emails.send({
        from: "Seat Sathi <onboarding@resend.dev>",
        to: [email],
        subject: "Your Seat Sathi OTP",
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#071b38;color:#fff;border-radius:12px;">
            <h2 style="color:#ef4444;">Seat Sathi — Password Reset</h2>
            <p>Your one-time password is:</p>
            <div style="font-size:40px;font-weight:bold;letter-spacing:12px;color:#f97316;margin:24px 0;">
              ${code}
            </div>
            <p style="color:#9ca3af;font-size:14px;">This OTP is valid for <strong>5 minutes</strong>. Do not share it with anyone.</p>
          </div>
        `,
      });

      if (error) {
        console.error("Resend error:", error);
        return NextResponse.json(
          { success: false, message: `Failed to send email: ${error.message}` },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true, message: "OTP sent to your email" });
    }

    if (action === "verify") {
      if (!otp) {
        return NextResponse.json({ success: false, message: "OTP is required" }, { status: 400 });
      }

      const result = verifyOtp(email, otp);
      if (!result.valid) {
        return NextResponse.json({ success: false, message: result.message }, { status: 400 });
      }

      return NextResponse.json({ success: true, message: result.message });
    }

    return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 });
  } catch (err: any) {
    console.error("OTP route error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
