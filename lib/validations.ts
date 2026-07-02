import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80),
  email: z.string().trim().email("Please enter a valid email address."),
  contentSlug: z.string().trim().max(90).optional(),
  contentTitle: z.string().trim().max(200).optional(),
  source: z.string().trim().max(100).optional(),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80),
  email: z.string().trim().email("Please enter a valid email address."),
  projectType: z.string().trim().max(120).optional(),
  message: z.string().trim().min(10, "Please share a little more about your project.").max(3000),
});

export const guideMetadataSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters.").max(140),
  slug: z
    .string()
    .trim()
    .max(90)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only.")
    .optional()
    .or(z.literal("")),
  description: z.string().trim().min(20, "Description must be at least 20 characters.").max(700),
  thumbnailAlt: z.string().trim().max(180).optional().or(z.literal("")),
  status: z.enum(["draft", "published"]).default("draft"),
  contentType: z.enum(["article", "guide"]).default("article"),
  articleBody: z.string().trim().max(50000).optional().or(z.literal("")),
  metaTitle: z.string().trim().max(140).optional().or(z.literal("")),
  metaDescription: z.string().trim().max(300).optional().or(z.literal("")),
  canonicalSlug: z.string().trim().max(90).optional().or(z.literal("")),
  hasAffiliateLinks: z.boolean().default(false),
  isSponsored: z.boolean().default(false),
  sponsorName: z.string().trim().max(100).optional().or(z.literal("")),
  disclosureNote: z.string().trim().max(1000).optional().or(z.literal("")),
  gateType: z.enum(["hard", "soft", "none"]).default("hard"),
});

export const adminInviteSchema = z.object({
  email: z.string().trim().toLowerCase().email("Please enter a valid admin email address."),
});

export type LeadInput = z.infer<typeof leadSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type GuideMetadataInput = z.infer<typeof guideMetadataSchema>;
export type AdminInviteInput = z.infer<typeof adminInviteSchema>;
