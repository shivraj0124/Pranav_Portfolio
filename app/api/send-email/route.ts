import nodemailer from "nodemailer";
import { generateEmailHTML } from "@/lib/emailTemplate";
export async function POST(req: Request) {
  try {
    const body = await req.json();  
    console.log(body,process.env.EMAIL_USER);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "sk40fs@gmail.com",
      subject: body.subject,
      html: generateEmailHTML({
        name: body.name,
        email: body.email,
        message: body.message,
      }),
    });

    return Response.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error: any) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}
