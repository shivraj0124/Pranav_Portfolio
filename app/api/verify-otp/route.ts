import { otpStore } from "@/lib/otpStore";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const stored = otpStore.get(body.email);

    if (!stored) {
      return Response.json({
        success: false,
        message: "OTP not found",
      });
    }

    // Expired
    if (Date.now() > stored.expiresAt) {

      otpStore.delete(body.email);

      return Response.json({
        success: false,
        message: "OTP expired",
      });
    }

    // Wrong OTP
    if (stored.otp !== body.otp) {
      return Response.json({
        success: false,
        message: "Invalid OTP",
      });
    }

    otpStore.delete(body.email);

    return Response.json({
      success: true,
      message: "OTP verified",
    });

  } catch (error: any) {

    return Response.json({
      success: false,
      error: error.message,
    });
  }
}