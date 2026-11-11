"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, Loader2, Paperclip } from "lucide-react";
import { enquiryTypes } from "@/content/site";
import { ALLOWED_ATTACHMENT, validateContact, type ContactFields, type FieldErrors } from "@/lib/contact";

type Props = { defaultType?: string; defaultSubject?: string; defaultMessage?: string };

const input =
  "w-full bg-white px-4 py-3.5 text-[16px] text-ink ring-1 ring-line placeholder:text-steel-2 transition outline-none focus:ring-2 focus:ring-brand";

/** Contact form with the exact fields from the workbook (section 8). */
export function ContactForm({ defaultType, defaultSubject, defaultMessage }: Props) {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");
  const [fileName, setFileName] = useState("");

  const initialType = defaultType && (enquiryTypes as readonly string[]).includes(defaultType) ? defaultType : "";

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const data = new FormData(form);
    const fields = Object.fromEntries(
      ["name", "company", "jobTitle", "email", "phone", "type", "subject", "message"].map((k) => [k, String(data.get(k) ?? "")]),
    ) as ContactFields;
    const file = data.get("attachment");
    const errs = validateContact(fields, file instanceof File ? file : null);
    setErrors(errs);
    setServerError("");
    if (Object.keys(errs).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", body: data });
      const json = await res.json();
      if (json.ok) {
        setState("done");
        form.reset();
      } else {
        setErrors(json.errors ?? {});
        setServerError(json.error ?? "");
        setState("idle");
      }
    } catch {
      setServerError("Network error. Please try again or email us directly.");
      setState("idle");
    }
  }

  const Err = ({ k }: { k: keyof FieldErrors }) =>
    errors[k] ? <p id={`${k}-err`} className="mt-1.5 text-[13px] text-red-600">{errors[k]}</p> : null;
  const aria = (k: keyof FieldErrors) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-err` : undefined });
  const Label = ({ htmlFor, children, optional }: { htmlFor: string; children: string; optional?: boolean }) => (
    <label htmlFor={htmlFor} className="mb-2 block font-display text-[12px] font-semibold tracking-[0.08em] text-ink uppercase">
      {children} {optional && <span className="text-steel">(optional)</span>}
    </label>
  );

  return (
    <AnimatePresence mode="wait">
      {state === "done" ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 text-center ring-1 ring-line"
          role="status"
        >
          <CheckCircle2 className="mx-auto size-12 text-go" strokeWidth={1.5} />
          <p className="mt-6 font-display text-2xl font-semibold ">Thank you for contacting Serviceberry Global Limited.</p>
          <p className="mx-auto mt-3 max-w-md text-steel">
            Your enquiry has been received. A member of our team will respond as soon as possible.
          </p>
          <button type="button" onClick={() => setState("idle")} className="mt-8 text-sm font-semibold underline underline-offset-4">
            Send another enquiry
          </button>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={onSubmit} noValidate className="grid grid-cols-1 gap-5 sm:grid-cols-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div>
            <Label htmlFor="name">Name</Label>
            <input id="name" name="name" autoComplete="name" className={input} {...aria("name")} />
            <Err k="name" />
          </div>
          <div>
            <Label htmlFor="company">Company</Label>
            <input id="company" name="company" autoComplete="organization" className={input} {...aria("company")} />
            <Err k="company" />
          </div>
          <div>
            <Label htmlFor="jobTitle" optional>Job title</Label>
            <input id="jobTitle" name="jobTitle" autoComplete="organization-title" className={input} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <input id="email" name="email" type="email" autoComplete="email" className={input} {...aria("email")} />
            <Err k="email" />
          </div>
          <div>
            <Label htmlFor="phone">Telephone</Label>
            <input id="phone" name="phone" type="tel" autoComplete="tel" className={input} {...aria("phone")} />
            <Err k="phone" />
          </div>
          <div>
            <Label htmlFor="type">Enquiry type</Label>
            <select id="type" name="type" defaultValue={initialType} className={`${input} appearance-none`} {...aria("type")}>
              <option value="" disabled>Choose one…</option>
              {enquiryTypes.map((t) => <option key={t} value={t} >{t}</option>)}
            </select>
            <Err k="type" />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="subject">Subject</Label>
            <input id="subject" name="subject" defaultValue={defaultSubject} className={input} {...aria("subject")} />
            <Err k="subject" />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="message">Message</Label>
            <textarea id="message" name="message" rows={6} defaultValue={defaultMessage} className={`${input} resize-y`} {...aria("message")} />
            <Err k="message" />
          </div>
          <div className="sm:col-span-2">
            <span className="mb-2 block font-display text-[12px] font-semibold tracking-[0.08em] text-ink uppercase">Attachment <span className="text-steel">(optional)</span></span>
            <label htmlFor="attachment" className="flex min-h-12 cursor-pointer items-center gap-3 border border-dashed border-steel-2 bg-white px-4 py-3 text-[14px] text-steel transition-colors hover:border-ink">
              <Paperclip className="size-4" />
              <span className="min-w-0 truncate">{fileName || "Add a file: PDF, Word, Excel, JPG or PNG, up to 5 MB"}</span>
            </label>
            <input
              id="attachment"
              name="attachment"
              type="file"
              accept={ALLOWED_ATTACHMENT.join(",")}
              className="sr-only"
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
              {...aria("attachment")}
            />
            <Err k="attachment" />
          </div>
          {/* honeypot */}
          <div aria-hidden className="absolute -left-[9999px]">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          {serverError && <p className="text-[14px] text-red-600 sm:col-span-2" role="alert">{serverError}</p>}
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={state === "sending"}
              className="chamfer inline-flex min-h-12 items-center gap-3 bg-brand pr-8 pl-6 font-display text-[16px] font-semibold text-white transition-colors hover:bg-brand-deep disabled:opacity-70"
            >
              {state === "sending" && <Loader2 className="size-4 animate-spin" />}
              {state === "sending" ? "Sending…" : "Send enquiry"}
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
