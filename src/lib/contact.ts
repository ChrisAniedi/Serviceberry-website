import { enquiryTypes } from "@/content/site";

export const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;
export const ALLOWED_ATTACHMENT = [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".jpg", ".jpeg", ".png"];

export type ContactFields = {
  name: string;
  company: string;
  jobTitle: string;
  email: string;
  phone: string;
  type: string;
  subject: string;
  message: string;
};

export type FieldErrors = Partial<Record<keyof ContactFields | "attachment", string>>;

/** Shared by the form (instant feedback) and the API route (the real check). */
export function validateContact(f: ContactFields, file?: { name: string; size: number } | null): FieldErrors {
  const e: FieldErrors = {};
  if (f.name.trim().length < 2) e.name = "Please enter your name.";
  if (f.company.trim().length < 2) e.company = "Please enter your company.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "Please enter a valid email address.";
  if (f.phone.replace(/[^\d]/g, "").length < 7) e.phone = "Please enter a telephone number.";
  if (!(enquiryTypes as readonly string[]).includes(f.type)) e.type = "Please choose an enquiry type.";
  if (f.subject.trim().length < 3) e.subject = "Please add a subject.";
  if (f.message.trim().length < 10) e.message = "Please tell us a little more (at least 10 characters).";
  if (f.message.length > 5000) e.message = "Please keep the message under 5,000 characters.";
  if (file && file.size > 0) {
    if (file.size > MAX_ATTACHMENT_BYTES) e.attachment = "Attachments must be 5 MB or smaller.";
    const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    if (!ALLOWED_ATTACHMENT.includes(ext)) e.attachment = "Use PDF, Word, Excel, JPG or PNG.";
  }
  return e;
}
