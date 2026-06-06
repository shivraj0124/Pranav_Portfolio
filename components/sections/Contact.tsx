"use client";

import React, { useState } from "react";
import SectionHeading from "../ui/SectionHeading";
// Usage in your contact form handler (e.g. EmailJS / Nodemailer / Resend):
// Pass formData.name, formData.email, formData.message into generateEmailHTML()

// ─── Example usage with EmailJS ──────────────────────────────────────────────
//
// import emailjs from "@emailjs/browser";
// import { generateEmailHTML } from "./email_template";
//
// await emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
//   to_name: "Pranav",
//   from_name: formData.name,
//   from_email: formData.email,
//   html_message: generateEmailHTML(formData),   // ← pass this to an HTML field
// });
//
// Make sure your EmailJS template uses {{html_message}} in an HTML block,
// or switch to Resend / Nodemailer for full HTML email support.
function Contact({ dark }: { dark: boolean }) {
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const T = {
    blue: "#0E49FF",
    yellow: "#FACC15",
    fuchsia: "#D946EF",
  };

  const bg = dark ? "bg-[#060614] text-white" : "bg-[#f0f4ff] text-[#0a0a1a]";

  const input = dark
    ? "bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-[#0E49FF]"
    : "bg-white border-[#0E49FF]/20 text-black placeholder:text-black/30 focus:border-[#0E49FF]";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const sendOtp = async () => {
    const response = await fetch("/api/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
      }),
    });

    const data = await response.json();

    if (data.success) {
      alert("OTP sent");
    }
  };
  const verifyOtp = async () => {
    const response = await fetch("/api/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        otp,
      }),
    });

    const data = await response.json();

    if (data.success) {
      setIsVerified(true);

      alert("Email verified");
    } else {
      alert(data.message);
    }
  };
  const sendEmail = async () => {
    if (!isVerified) {
      alert("Please verify your email first");
      return;
    }
    // Empty field validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Message sent successfully!");

        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        alert("Failed to send message");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className={`relative overflow-hidden py-24 ${bg}`}>
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-[#0E49FF]/20 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <SectionHeading title="Contact" dark={dark} />

        <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl lg:text-5xl">
          Let's create something{" "}
          <span className="italic text-yellow-400">unforgettable.</span>
        </h2>

        <p
          className={`mt-4 text-sm leading-relaxed ${
            dark ? "text-white/60" : "text-black/55"
          }`}
        >
          Drop me a message and I'll get back to you within 24 hours.
        </p>

        <div className="mt-12 space-y-4 text-left">
          <input
            required
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full rounded-2xl border px-5 py-4 text-sm outline-none transition-all backdrop-blur-sm ${input}`}
            placeholder="Your name"
          />

          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full rounded-2xl border px-5 py-4 text-sm outline-none transition-all backdrop-blur-sm ${input}`}
            placeholder="Email address"
          />
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full rounded-xl border px-4 py-3"
            />

            <button
              type="button"
              onClick={sendOtp}
              className="bg-blue-600 text-white px-4 rounded-xl"
            >
              Send OTP
            </button>

            <button
              type="button"
              onClick={verifyOtp}
              className="bg-green-600 text-white px-4 rounded-xl"
            >
              Verify
            </button>
          </div>

          <textarea
            required
            rows={4}
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={`w-full rounded-2xl border px-5 py-4 text-sm outline-none transition-all backdrop-blur-sm resize-none ${input}`}
            placeholder="Tell me about your project…"
          />

          <button
            onClick={sendEmail}
            disabled={loading}
            className="cursor-pointer w-full rounded-2xl bg-[#0E49FF] py-4 text-sm font-black text-white shadow-[0_0_30px_rgba(14,73,255,0.5)] transition-all hover:shadow-[0_0_50px_rgba(14,73,255,0.8)] hover:scale-[1.02]"
          >
            {loading ? "Sending..." : "Send Message →"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Contact;
