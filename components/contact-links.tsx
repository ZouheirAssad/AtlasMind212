"use client";

import { track } from "@vercel/analytics";
import { Facebook, Github, Instagram, Linkedin, MapPin, MessageCircle, Phone } from "lucide-react";
import { useI18n } from "@/components/i18n/i18n-provider";
import { phoneHref, siteConfig, socialProfiles, whatsappHref } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const SOCIAL_ICONS = {
  instagram: Instagram,
  linkedin: Linkedin,
  facebook: Facebook,
  github: Github,
  googleBusinessProfile: MapPin,
} as const;

const SOCIAL_LABELS: Record<keyof typeof SOCIAL_ICONS, string> = {
  instagram: "Instagram",
  linkedin: "LinkedIn",
  facebook: "Facebook",
  github: "GitHub",
  googleBusinessProfile: "Google Maps",
};

/** Phone and WhatsApp links; each renders only when its number is configured. */
export function PhoneWhatsAppLinks({ placement, className, itemClassName }: { placement: string; className?: string; itemClassName?: string }) {
  const { dict, locale } = useI18n();
  const phone = phoneHref();
  const whatsapp = whatsappHref(dict.contactPage.whatsappMessage);
  if (!phone && !whatsapp) return null;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {phone && (
        <a href={phone} onClick={() => track("phone_click", { placement, locale })} className={cn("flex min-h-11 items-center gap-3", itemClassName)}>
          <Phone className="size-5" aria-hidden="true" />
          <span><span className="sr-only">{dict.contactPage.phone}: </span><span dir="ltr">{siteConfig.phone}</span></span>
        </a>
      )}
      {whatsapp && (
        <a href={whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { placement, locale })} className={cn("flex min-h-11 items-center gap-3", itemClassName)}>
          <MessageCircle className="size-5" aria-hidden="true" />
          <span>{dict.contactPage.whatsapp} · <span dir="ltr">{siteConfig.whatsapp}</span></span>
        </a>
      )}
    </div>
  );
}

/** Icon links to the configured social and directory profiles. */
export function SocialLinks({ className, itemClassName }: { className?: string; itemClassName?: string }) {
  const { dict } = useI18n();
  const profiles = socialProfiles();
  if (!profiles.length) return null;

  return (
    <div role="group" aria-label={dict.contactPage.followUs} className={cn("flex flex-wrap gap-2", className)}>
      {profiles.map(({ key, url }) => {
        const Icon = SOCIAL_ICONS[key];
        return (
          <a key={key} href={url} target="_blank" rel="noopener noreferrer me" aria-label={SOCIAL_LABELS[key]} className={cn("grid size-11 place-items-center rounded-sm border", itemClassName)}>
            <Icon className="size-5" aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}
