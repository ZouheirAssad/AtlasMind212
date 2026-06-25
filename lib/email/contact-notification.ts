import "server-only";

import { Resend } from "resend";

export type ContactNotificationPayload = {
  name: string;
  email: string;
  projectType?: string;
  message: string;
  submittedAt: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildHtml(payload: ContactNotificationPayload): string {
  const rows = [
    ["Name", payload.name],
    ["Email", payload.email],
    ["Project type", payload.projectType || "Not specified"],
    ["Submitted at", payload.submittedAt],
  ]
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:6px 16px 6px 0;color:#64748b;font-size:13px;white-space:nowrap;vertical-align:top">${label}</td>
          <td style="padding:6px 0;color:#0f172a;font-size:15px;vertical-align:top">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  const message = escapeHtml(payload.message).replace(/\n/g, "<br />");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>New contact submission — AtlasMind212</title>
  </head>
  <body style="margin:0;background:#f8fafc;font-family:Inter,Arial,sans-serif">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc">
      <tr>
        <td style="padding:32px 16px">
          <table role="presentation" align="center" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden">
            <tr>
              <td style="padding:24px 32px;background:#020617">
                <span style="font-family:JetBrains Mono,Menlo,monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#00c8f5">AtlasMind212</span>
                <h1 style="margin:8px 0 0;font-size:20px;font-weight:600;color:#f8fafc">New contact submission</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
                  ${rows}
                </table>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px">
                  <tr>
                    <td style="padding:12px 16px;background:#f1f5f9;border-radius:12px;font-size:15px;line-height:1.6;color:#0f172a">${message}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px 24px;font-size:12px;color:#94a3b8">
                Sent from the AtlasMind212 contact form.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function sendContactNotification(
  payload: ContactNotificationPayload,
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY environment variable is not configured.");
  }

  const from = process.env.CONTACT_NOTIFICATION_FROM;
  if (!from) {
    throw new Error(
      "CONTACT_NOTIFICATION_FROM environment variable is not configured.",
    );
  }

  const to = process.env.CONTACT_NOTIFICATION_TO;
  if (!to) {
    throw new Error(
      "CONTACT_NOTIFICATION_TO environment variable is not configured.",
    );
  }

  const resend = new Resend(apiKey);
  let apiError: { message: string; name?: string } | null = null;

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      subject: `New contact submission from ${payload.name}`,
      html: buildHtml(payload),
      replyTo: payload.email,
    });

    if (error) {
      apiError = error;
    }
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error("Resend unexpected exception:", {
      from,
      to,
      exceptionMessage: errMsg,
      payload: {
        name: payload.name,
        email: payload.email,
        projectType: payload.projectType,
        submittedAt: payload.submittedAt,
      },
    });
    throw err;
  }

  if (apiError) {
    console.error("Resend API returned an error:", {
      from,
      to,
      errorMessage: apiError.message,
      errorName: apiError.name,
      payload: {
        name: payload.name,
        email: payload.email,
        projectType: payload.projectType,
        submittedAt: payload.submittedAt,
      },
    });
    throw new Error(`Resend email delivery failed: ${apiError.message}`);
  }
}
