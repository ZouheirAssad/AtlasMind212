import module from "module";

const originalRequire = module.prototype.require;
module.prototype.require = function (
  this: unknown,
  ...args: Parameters<typeof originalRequire>
) {
  if (args[0] === "server-only") {
    return {};
  }
  return originalRequire.apply(this, args);
};

async function main() {
  const { sendContactNotification } =
    await import("../lib/email/contact-notification");

  console.log("Starting contact notification email test...");

  // Print active configuration (safely mask secrets)
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_NOTIFICATION_FROM;
  const to = process.env.CONTACT_NOTIFICATION_TO;

  console.log("Configuration:");
  console.log(
    `- RESEND_API_KEY: ${apiKey ? "configured (masked)" : "not configured"}`,
  );
  console.log(`- CONTACT_NOTIFICATION_FROM: ${from || "not configured"}`);
  console.log(`- CONTACT_NOTIFICATION_TO: ${to || "not configured"}`);

  if (!apiKey || !from || !to) {
    console.error(
      "❌ Setup check failed. Ensure RESEND_API_KEY, CONTACT_NOTIFICATION_FROM, and CONTACT_NOTIFICATION_TO are defined.",
    );
    process.exit(1);
  }

  const testPayload = {
    name: "Diagnostic Test Submitter",
    email: "test-submitter@example.com",
    projectType: "ai-integration",
    message:
      "This is a diagnostic test email to verify that Resend email delivery is working correctly.",
    submittedAt: new Date().toISOString(),
  };

  try {
    await sendContactNotification(testPayload);
    console.log("✅ Diagnostic email sent successfully!");
  } catch (error) {
    console.error("❌ Diagnostic email failed:");
    console.error(error);
    process.exit(1);
  }
}

main();
