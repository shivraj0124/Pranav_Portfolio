export function generateEmailHTML(formData: {
  name: string;
  email: string;
  message: string;
}): string {
  const date = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>New Message — Pranav Pangrikar</title>
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;900&family=Barlow:wght@400;500;600&display=swap" rel="stylesheet"/>
</head>
<body style="margin:0;padding:0;background:#050810;font-family:'Barlow',sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#050810;padding:40px 16px;">
  <tr><td align="center">
  <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

    <!-- TOP ACCENT BARS -->
    <tr>
      <td width="84%" style="background:#2563eb;height:4px;border-radius:2px 0 0 0;"></td>
      <td width="16%" style="background:#facc15;height:4px;border-radius:0 2px 0 0;"></td>
    </tr>

    <!-- HEADER -->
    <tr>
      <td colspan="2" style="background:#0d1224;border:1px solid #1e2a45;border-top:none;padding:32px 40px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <!-- P Logo pill -->
              <table cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                <tr>
                  <td style="background:#2563eb;border-radius:8px;padding:5px 12px 5px 7px;">
                    <table cellpadding="0" cellspacing="0"><tr>
                      <td style="background:#fff;border-radius:5px;width:22px;height:22px;text-align:center;vertical-align:middle;">
                        <span style="font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:14px;color:#2563eb;">P</span>
                      </td>
                      <td style="padding-left:8px;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:15px;color:#fff;letter-spacing:0.5px;">Pranav.</td>
                    </tr></table>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 4px;font-family:'Barlow Condensed',sans-serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#2563eb;">New Portfolio Inquiry</p>
              <h1 style="margin:0;font-family:'Barlow Condensed',sans-serif;font-size:34px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;text-transform:uppercase;line-height:1.1;">
                YOU'VE GOT<br>
                <span style="color:#facc15;">A MESSAGE.</span>
              </h1>
            </td>
            <td align="right" valign="top">
              <div style="color:#facc15;font-size:22px;line-height:1;margin-bottom:8px;">✦</div>
              <p style="margin:0;font-family:'Barlow Condensed',sans-serif;font-size:11px;color:#3d4f70;letter-spacing:2px;text-transform:uppercase;">${date}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- AVAILABLE BADGE -->
    <tr>
      <td colspan="2" style="background:#0b0f1e;border-left:1px solid #1e2a45;border-right:1px solid #1e2a45;padding:10px 40px;">
        <table cellpadding="0" cellspacing="0">
          <tr>
            <td style="background:#0d1224;border:1px solid #1e2a45;border-radius:999px;padding:5px 14px;">
              <table cellpadding="0" cellspacing="0"><tr>
                <td style="width:7px;height:7px;background:#22c55e;border-radius:50%;"></td>
                <td style="padding-left:8px;font-family:'Barlow Condensed',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#94a3b8;">Incoming · 2026</td>
              </tr></table>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- SENDER INFO -->
    <tr>
      <td colspan="2" style="background:#0d1224;border-left:1px solid #1e2a45;border-right:1px solid #1e2a45;padding:20px 40px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td width="48%">
              <p style="margin:0 0 4px;font-family:'Barlow Condensed',sans-serif;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#3d4f70;">From</p>
              <p style="margin:0;font-family:'Barlow Condensed',sans-serif;font-size:20px;font-weight:700;color:#fff;letter-spacing:0.3px;">${formData.name}</p>
            </td>
            <td width="4%" style="border-left:1px solid #1e2a45;">&nbsp;</td>
            <td width="48%" style="padding-left:12px;">
              <p style="margin:0 0 4px;font-family:'Barlow Condensed',sans-serif;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#3d4f70;">Email</p>
              <a href="mailto:${formData.email}" style="font-family:'Barlow',sans-serif;font-size:13px;color:#2563eb;text-decoration:none;">${formData.email}</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- YELLOW DIVIDER -->
    <tr>
      <td colspan="2" style="background:#0b0f1e;border-left:1px solid #1e2a45;border-right:1px solid #1e2a45;padding:0 40px;">
        <div style="height:1px;background:#facc15;opacity:0.2;"></div>
      </td>
    </tr>

    <!-- MESSAGE -->
    <tr>
      <td colspan="2" style="background:#0d1224;border-left:1px solid #1e2a45;border-right:1px solid #1e2a45;padding:24px 40px 32px;">
        <table cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
          <tr>
            <td style="width:3px;background:#facc15;border-radius:2px;">&nbsp;</td>
            <td style="padding-left:10px;font-family:'Barlow Condensed',sans-serif;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#3d4f70;">Message</td>
          </tr>
        </table>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="background:#080c18;border:1px solid #1e2a45;border-left:3px solid #2563eb;border-radius:0 8px 8px 0;padding:18px 20px;">
              <p style="margin:0;font-family:'Barlow',sans-serif;font-size:14px;line-height:1.85;color:#cbd5e1;">
                ${formData.message.replace(/\n/g, "<br/>")}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- CTA ROW -->
    <tr>
      <td colspan="2" style="background:#080c18;border:1px solid #1e2a45;border-top:none;padding:18px 40px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="font-family:'Barlow',sans-serif;font-size:12px;color:#3d4f70;">Reply directly to reach ${formData.name} →</td>
            <td align="right">
              <a href="mailto:${formData.email}?subject=Re: Your message — Pranav Pangrikar"
                 style="display:inline-block;background:#facc15;border-radius:999px;padding:10px 24px;font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#080c18;text-decoration:none;">
                Hire Me →
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- FOOTER -->
    <tr>
      <td colspan="2" style="background:#050810;border:1px solid #131b2e;border-top:none;padding:14px 40px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="font-family:'Barlow Condensed',sans-serif;font-size:11px;color:#1e2a45;letter-spacing:1px;">
              Pranav Pangrikar &nbsp;·&nbsp; Graphic Designer &amp; Visual Storyteller
            </td>
            <td align="right" style="color:#1e2a45;font-size:14px;">✦</td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- BOTTOM ACCENT BARS -->
    <tr>
      <td width="84%" style="background:#2563eb;height:3px;border-radius:0 0 0 2px;"></td>
      <td width="16%" style="background:#facc15;height:3px;border-radius:0 0 2px 0;"></td>
    </tr>

  </table>
  </td></tr>
</table>

</body>
</html>
  `;
}


// ─── Usage with Resend ────────────────────────────────────────────────────────
//
// import { Resend } from "resend";
// import { generateEmailHTML } from "./email_template";
//
// const resend = new Resend(process.env.RESEND_API_KEY);
//
// await resend.emails.send({
//   from: "portfolio@yourdomain.com",
//   to: "pranav@example.com",
//   subject: `New inquiry from ${formData.name}`,
//   html: generateEmailHTML(formData),
// });