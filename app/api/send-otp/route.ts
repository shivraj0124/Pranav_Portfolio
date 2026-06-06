import nodemailer from "nodemailer";
import { otpStore } from "../../../lib/otpStore";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const email = body.email;

    // Generate 6 digit OTP
    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Save OTP for 5 minutes
    otpStore.set(email, {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Verification Code",
      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2>Email Verification</h2>

          <p>Your OTP is:</p>

          <h1 style="
            letter-spacing: 8px;
            color: #2563eb;
          ">
            ${otp}
          </h1>

          <p>
            This OTP will expire in 5 minutes.
          </p>
        </div>
      `,
    });

    return Response.json({
      success: true,
    });

  } catch (error: any) {

    return Response.json({
      success: false,
      error: error.message,
    });
  }
}