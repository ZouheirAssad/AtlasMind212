"use client";

import { track } from "@vercel/analytics";
import { MessageCircle } from "lucide-react";
import { useI18n } from "@/components/i18n/i18n-provider";
import { whatsappHref } from "@/lib/site-config";

/** Floating WhatsApp button (bottom end corner). Renders nothing until `siteConfig.whatsapp` is set. */
export function WhatsAppButton() {
  const { dict, locale } = useI18n();
  const href = whatsappHref(dict.contactPage.whatsappMessage);
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={dict.contactPage.whatsappAria}
      onClick={() => track("whatsapp_click", { placement: "floating", locale })}
      className="fixed bottom-5 end-5 z-50 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgb(0_0_0/0.25)] transition-transform hover:scale-105 focus-visible:scale-105"
    >
      <MessageCircle className="size-7" aria-hidden="true" />
    </a>
  );
}
