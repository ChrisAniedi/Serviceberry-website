import { NextResponse } from "next/server";
import { validateContact, type ContactFields } from "@/lib/contact";
import { site } from "@/content/site";

/**
 * Receives the contact form and emails it to the company mailbox via Resend
 * (https://resend.com). Set in the hosting environment:
 *   RESEND_API_KEY  – API key
 *   CONTACT_TO      – monitored mailbox, e.g. info@serviceberryglobal.com
 *   CONTACT_FROM    – verified sender, e.g. "Serviceberry Website <web@serviceberryglobal.com>"
 * Without a key, development logs the enquiry; production returns an error so nothing is lost silently.
 */
const str = (v: FormDataEntryValue | null) => (typeof v === "string" ? v : "");
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid form." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (str(form.get("website"))) return NextResponse.json({ ok: true });

  const fields: ContactFields = {
    name: str(form.get("name")),
    company: str(form.get("company")),
    jobTitle: str(form.get("jobTitle")),
    email: str(form.get("email")),
    phone: str(form.get("phone")),
    type: str(form.get("type")),
    subject: str(form.get("subject")),
    message: str(form.get("message")),
  };
  const fileEntry = form.get("attachment");
  const file = fileEntry instanceof File && fileEntry.size > 0 ? fileEntry : null;

  const errors = validateContact(fields, file);
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] enquiry (no RESEND_API_KEY set, not emailed):", fields, file?.name);
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json(
      { ok: false, error: `The form is not connected yet. Please email ${site.email}.` },
      { status: 503 },
    );
  }

  const rows = ([
    ["Name", fields.name],
    ["Company", fields.company],
    ["Job title", fields.jobTitle || "—"],
    ["Email", fields.email],
    ["Telephone", fields.phone],
    ["Enquiry type", fields.type],
    ["Subject", fields.subject],
  ] as const)
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#667"><b>${k}</b></td><td>${esc(v)}</td></tr>`)
    .join("");

  const attachments = file
    ? [{ filename: file.name, content: Buffer.from(await file.arrayBuffer()).toString("base64") }]
    : undefined;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "Serviceberry Website <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO ?? site.email],
      reply_to: fields.email,
      subject: `[Website · ${fields.type}] ${fields.subject}`,
      html: `<table>${rows}</table><p style="white-space:pre-wrap">${esc(fields.message)}</p>`,
      attachments,
    }),
  });

  if (!res.ok) {
    console.error("[contact] send failed", res.status, await res.text());
    return NextResponse.json({ ok: false, error: `Sorry, sending failed. Please email ${site.email}.` }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
