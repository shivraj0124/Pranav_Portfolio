"use client";

import React, { useState, useCallback, useRef } from "react";
import SectionHeading from "../ui/SectionHeading";

// ─── Toast ────────────────────────────────────────────────────────────────────
type ToastType = "success" | "error" | "info";
interface Toast { id: number; message: string; type: ToastType; }

function ToastContainer({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: number) => void }) {
  return (
    <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex items-center gap-3 rounded-2xl px-5 py-4 text-sm font-semibold shadow-2xl backdrop-blur-md animate-toast-in"
          style={{
            background:
              t.type === "success" ? "rgba(21,128,61,0.95)"
              : t.type === "error" ? "rgba(185,28,28,0.95)"
              : "rgba(14,73,255,0.95)",
            color: "#fff",
            border: `1px solid ${
              t.type === "success" ? "rgba(74,222,128,0.4)"
              : t.type === "error" ? "rgba(252,165,165,0.4)"
              : "rgba(147,197,253,0.4)"
            }`,
            minWidth: "280px",
            maxWidth: "380px",
          }}
        >
          <span style={{ fontSize: 18 }}>
            {t.type === "success" ? "✦" : t.type === "error" ? "✕" : "→"}
          </span>
          <span style={{ flex: 1 }}>{t.message}</span>
          <button onClick={() => onRemove(t.id)} className="opacity-60 hover:opacity-100 transition-opacity">✕</button>
        </div>
      ))}
    </div>
  );
}

function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const show = useCallback((message: string, type: ToastType = "info") => {
    const id = Date.now();
    setToasts((p) => [...p, { id, message, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 4500);
  }, []);
  const remove = useCallback((id: number) => setToasts((p) => p.filter((t) => t.id !== id)), []);
  return { toasts, show, remove };
}

// ─── Field Error ──────────────────────────────────────────────────────────────
function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1 text-xs text-red-400 font-medium pl-1 animate-fade-in">{msg}</p>;
}

// ─── OTP Input (4 boxes) ──────────────────────────────────────────────────────
function OtpInput({ value, onChange, disabled }: {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  const refs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
  const digits = value.padEnd(6, "").split("").slice(0, 6);

  const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      const next = digits.map((d, idx) => (idx === i ? "" : d)).join("");
      onChange(next);
      if (i > 0 && !digits[i]) refs[i - 1].current?.focus();
    }
  };

  const handleChange = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const char = e.target.value.replace(/\D/g, "").slice(-1);
    const next = digits.map((d, idx) => (idx === i ? char : d)).join("");
    onChange(next);
    if (char && i < 5) refs[i + 1].current?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    onChange(pasted.padEnd(6, "").slice(0, 6));
    refs[Math.min(pasted.length, 5)].current?.focus();
    e.preventDefault();
  };

  return (
    <div className="flex gap-3 justify-center">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <input
          key={i}
          ref={refs[i]}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digits[i] || ""}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKey(i, e)}
          onPaste={handlePaste}
          disabled={disabled}
          className="w-14 h-14 text-center text-xl font-bold rounded-2xl border-2 outline-none transition-all duration-200 bg-white/5 text-white border-white/20 focus:border-[#0E49FF] focus:bg-[#0E49FF]/10 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ caretColor: "#0E49FF" }}
        />
      ))}
    </div>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
type Step = "form" | "otp" | "done";

function Contact({ dark }: { dark: boolean }) {
  const { toasts, show, remove } = useToast();

  const [step, setStep] = useState<Step>("form");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const bg = dark ? "bg-[#060614] text-white" : "bg-[#f0f4ff] text-[#0a0a1a]";
  const inputBase = "w-full rounded-2xl border px-5 py-4 text-sm outline-none transition-all duration-200 backdrop-blur-sm";
  const inputTheme = dark
    ? "bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-[#0E49FF]"
    : "bg-white border-[#0E49FF]/20 text-black placeholder:text-black/30 focus:border-[#0E49FF]";
  const inputError = "!border-red-500/70";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name as keyof typeof errors]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const validate = () => {
    const e: typeof errors = {};
    if (!formData.name.trim()) e.name = "Name is required.";
    if (!formData.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Enter a valid email address.";
    if (!formData.message.trim()) e.message = "Message is required.";
    else if (formData.message.trim().length < 10) e.message = "Message must be at least 10 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const startCooldown = (secs = 60) => {
    setCooldown(secs);
    cooldownRef.current = setInterval(() => {
      setCooldown((c) => {
        if (c <= 1) { clearInterval(cooldownRef.current!); return 0; }
        return c - 1;
      });
    }, 1000);
  };

  // Step 1 → send OTP
  const handleSendOtp = async () => {
    if (!validate()) { show("Please fix the errors below.", "error"); return; }
    try {
      setOtpLoading(true);
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await res.json();
      if (data.success) {
        show(`OTP sent to ${formData.email}`, "success");
        setStep("otp");
        setOtp("");
        startCooldown(60);
      } else {
        show(data.message || "Failed to send OTP.", "error");
      }
    } catch {
      show("Network error. Please try again.", "error");
    } finally {
      setOtpLoading(false);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    if (cooldown > 0) return;
    try {
      setOtpLoading(true);
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await res.json();
      if (data.success) {
        show("New OTP sent!", "success");
        setOtp("");
        startCooldown(60);
      } else {
        show(data.message || "Failed to resend OTP.", "error");
      }
    } catch {
      show("Network error.", "error");
    } finally {
      setOtpLoading(false);
    }
  };

  // Step 2 → verify OTP → send email
  const handleVerifyAndSend = async () => {
    if (otp.replace(/\D/g, "").length < 6) {
      show("Please enter the complete 6-digit OTP.", "error");
      return;
    }
    try {
      setVerifyLoading(true);
      const verifyRes = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp }),
      });
      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        show(verifyData.message || "Incorrect OTP. Try again.", "error");
        setOtp("");
        return;
      }
    } catch {
      show("Verification failed. Try again.", "error");
      return;
    } finally {
      setVerifyLoading(false);
    }

    // OTP verified — now send the email
    try {
      setSendLoading(true);
      const emailRes = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const emailData = await emailRes.json();
      if (emailData.success) {
        setStep("done");
        show("Message sent! I'll get back to you within 24 hours. ✦", "success");
      } else {
        show(emailData.message || "Failed to send message.", "error");
      }
    } catch {
      show("Something went wrong. Try again.", "error");
    } finally {
      setSendLoading(false);
    }
  };

  const resetForm = () => {
    setStep("form");
    setFormData({ name: "", email: "", message: "" });
    setErrors({});
    setOtp("");
    setCooldown(0);
  };

  return (
    <>
      <style>{`
        @keyframes toastIn {
          from { opacity:0; transform:translateX(40px) scale(0.95); }
          to   { opacity:1; transform:translateX(0) scale(1); }
        }
        @keyframes fadeIn {
          from { opacity:0; transform:translateY(-4px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes slideUp {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes pulseGlow {
          0%,100% { box-shadow:0 0 30px rgba(14,73,255,0.45); }
          50%      { box-shadow:0 0 55px rgba(14,73,255,0.75); }
        }
        .animate-toast-in  { animation:toastIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .animate-fade-in   { animation:fadeIn 0.2s ease forwards; }
        .animate-slide-up  { animation:slideUp 0.4s cubic-bezier(0.34,1.3,0.64,1) forwards; }
        .btn-glow:not(:disabled) { animation:pulseGlow 2.5s ease-in-out infinite; }
        .btn-glow:hover:not(:disabled) { transform:scale(1.02); }
        .btn-glow:active:not(:disabled) { transform:scale(0.98); }
      `}</style>

      <ToastContainer toasts={toasts} onRemove={remove} />

      <section id="contact" className={`relative overflow-hidden py-24 ${bg}`}>
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-[#0E49FF]/20 blur-[130px]" />

        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <SectionHeading title="Contact" dark={dark} />
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            Let's create something{" "}
            <span className="italic text-yellow-400">unforgettable.</span>
          </h2>
          <p className={`mt-4 text-sm leading-relaxed ${dark ? "text-white/60" : "text-black/55"}`}>
            Drop me a message and I'll get back to you within 24 hours.
          </p>

          {/* ── STEP: FORM ── */}
          {step === "form" && (
            <div className="mt-12 space-y-4 text-left animate-slide-up">
              <div>
                <input type="text" name="name" value={formData.name} onChange={handleChange}
                  className={`${inputBase} ${inputTheme} ${errors.name ? inputError : ""}`}
                  placeholder="Your name" autoComplete="name" />
                <FieldError msg={errors.name} />
              </div>
              <div>
                <input type="email" name="email" value={formData.email} onChange={handleChange}
                  className={`${inputBase} ${inputTheme} ${errors.email ? inputError : ""}`}
                  placeholder="Email address" autoComplete="email" />
                <FieldError msg={errors.email} />
              </div>
              <div>
                <textarea rows={5} name="message" value={formData.message} onChange={handleChange}
                  className={`${inputBase} ${inputTheme} resize-none ${errors.message ? inputError : ""}`}
                  placeholder="Tell me about your project…" />
                <FieldError msg={errors.message} />
              </div>
              <button onClick={handleSendOtp} disabled={otpLoading}
                className="btn-glow cursor-pointer w-full rounded-2xl bg-[#0E49FF] py-4 text-sm font-black text-white transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:animate-none">
                {otpLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40" strokeDashoffset="10" strokeLinecap="round" />
                    </svg>
                    Sending OTP…
                  </span>
                ) : "Continue → Verify Email"}
              </button>
            </div>
          )}

          {/* ── STEP: OTP ── */}
          {step === "otp" && (
            <div className="mt-12 animate-slide-up">
              {/* Card */}
              <div className={`rounded-3xl border p-8 text-center ${dark ? "bg-white/5 border-white/10" : "bg-white border-[#0E49FF]/15"}`}>
                {/* Icon */}
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0E49FF]/15 border border-[#0E49FF]/30">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0E49FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="6" width="20" height="16" rx="3"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </div>
                <h3 className="text-xl font-extrabold mb-1">Check your inbox</h3>
                <p className={`text-sm mb-1 ${dark ? "text-white/50" : "text-black/50"}`}>
                  We sent a 6-digit code to
                </p>
                <p className="text-sm font-bold text-[#0E49FF] mb-6">{formData.email}</p>

                <OtpInput value={otp} onChange={setOtp} disabled={verifyLoading || sendLoading} />

                <button onClick={handleVerifyAndSend}
                  disabled={otp.replace(/\D/g,"").length < 6 || verifyLoading || sendLoading}
                  className="btn-glow mt-6 w-full cursor-pointer rounded-2xl bg-[#0E49FF] py-4 text-sm font-black text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:animate-none">
                  {verifyLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40" strokeDashoffset="10" strokeLinecap="round"/>
                      </svg>
                      Verifying…
                    </span>
                  ) : sendLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40" strokeDashoffset="10" strokeLinecap="round"/>
                      </svg>
                      Sending message…
                    </span>
                  ) : "Verify & Send Message ✦"}
                </button>

                {/* Resend + back */}
                <div className="mt-5 flex items-center justify-between text-xs">
                  <button onClick={resetForm}
                    className={`transition-colors ${dark ? "text-white/40 hover:text-white/70" : "text-black/40 hover:text-black/70"}`}>
                    ← Change email
                  </button>
                  <button onClick={handleResend} disabled={cooldown > 0 || otpLoading}
                    className={`font-semibold transition-colors ${cooldown > 0 ? (dark ? "text-white/30 cursor-not-allowed" : "text-black/30 cursor-not-allowed") : "text-[#0E49FF] hover:text-blue-400 cursor-pointer"}`}>
                    {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend OTP"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP: DONE ── */}
          {step === "done" && (
            <div className="mt-12 animate-slide-up">
              <div className={`rounded-3xl border p-10 text-center ${dark ? "bg-white/5 border-white/10" : "bg-white border-[#0E49FF]/15"}`}>
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/15 border border-green-500/30">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-extrabold mb-2">Message Sent! ✦</h3>
                <p className={`text-sm leading-relaxed mb-6 ${dark ? "text-white/55" : "text-black/55"}`}>
                  Thanks for reaching out. I will get back<br/>to you within 24 hours.
                </p>
                <button onClick={resetForm}
                  className="text-sm font-bold text-[#0E49FF] hover:text-blue-400 transition-colors cursor-pointer">
                  ← Send another message
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Contact;