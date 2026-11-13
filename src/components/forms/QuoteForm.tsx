"use client";

import { AnimatePresence, motion } from "motion/react";
import { Boxes, Check, CheckCircle2, ChevronDown, GraduationCap, Handshake, Loader2, MessageSquare, PackageSearch, Paperclip, Wrench, X } from "lucide-react";
import { useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { quoteNeeds, quoteReaches, quoteWhens, type QuoteNeed } from "@/content/quote";
import { waLink } from "@/content/site";
import { ALLOWED_ATTACHMENT, MAX_ATTACHMENT_BYTES, validateContact, type ContactFields } from "@/lib/contact";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;
const icons: Record<string, typeof Wrench> = { services: Wrench, source: PackageSearch, sale: Boxes, project: Handshake, academy: GraduationCap, other: MessageSquare };

const input =
  "w-full rounded-2xl bg-paper px-4 py-3.5 text-[16px] text-ink ring-1 ring-line outline-none transition-[box-shadow,background-color] placeholder:text-steel-2 hover:ring-ink/25 focus:bg-white focus:ring-2 focus:ring-brand aria-[invalid=true]:ring-[#b3123f]";

function Field({ label, optional, error, id, children, className }: { label: string; optional?: boolean; error?: string; id: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-[14px] font-medium text-ink">
        {label} {optional ? <span className="font-normal text-steel">(optional)</span> : <span className="text-berry">*</span>}
      </label>
      {children}
      {error && <p id={`${id}-err`} className="mt-1.5 text-[13.5px] text-[#b3123f]">{error}</p>}
    </div>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-[14.5px] transition-[background-color,color,box-shadow] duration-300",
        on ? "bg-ink text-white" : "bg-paper text-ink ring-1 ring-line hover:ring-ink/30",
      )}
    >
      <span className={cn("grid size-4 place-items-center rounded-full transition-colors", on ? "bg-white text-ink" : "ring-1 ring-ink/25")}>{on && <Check className="size-3" strokeWidth={3} />}</span>
      {children}
    </button>
  );
}

function Section({ n, title, hint, children }: { n: string; title: string; hint?: string; children: ReactNode }) {
  return (
    <fieldset className="border-t border-line pt-8 first:border-t-0 first:pt-0">
      <legend className="contents">
        <span className="flex items-baseline gap-3">
          <span className="font-display text-[14px] font-semibold text-brand tabular-nums">{n}</span>
          <span className="headline text-[clamp(1.5rem,2.2vw,1.9rem)]">{title}</span>
        </span>
      </legend>
      {hint && <p className="mt-2 text-[15px] text-steel">{hint}</p>}
      <div className="mt-6">{children}</div>
    </fieldset>
  );
}

type Init = { type?: string; subject?: string; details?: string; location?: string };

/**
 * The whole quote on one page: what you need (with the specifics), the job, and your
 * details, then one Send. Nothing is hidden behind Next buttons; errors show in place and
 * the page scrolls to the first one. Sends through /api/contact like the contact form.
 */
export function QuoteForm({ type, subject, details: startDetails, location: startLocation }: Init) {
  const start = quoteNeeds.find((n) => n.type === type);
  const [need, setNeed] = useState<QuoteNeed | undefined>(start);
  const [picks, setPicks] = useState<string[]>(() => {
    if (!start || !subject) return [];
    const hit = start.picks.find((p) => subject.toLowerCase().includes(p.toLowerCase()));
    return hit ? [hit] : [];
  });
  const [details, setDetails] = useState(() => {
    const pre = [subject && !picks.length ? subject : "", startDetails ?? ""].filter(Boolean).join("\n");
    return pre;
  });
  const [location, setLocation] = useState(startLocation ?? "");
  const [when, setWhen] = useState(quoteWhens[0]);
  const [reach, setReach] = useState<string>("Email");
  const [file, setFile] = useState<File | null>(null);
  const [who, setWho] = useState({ name: "", company: "", jobTitle: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [failMsg, setFailMsg] = useState("");
  const top = useRef<HTMLDivElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const toggle = (p: string) => setPicks((v) => (v.includes(p) ? v.filter((x) => x !== p) : [...v, p]));
  const choose = (n: QuoteNeed) => {
    if (n.id !== need?.id) setPicks([]);
    setNeed(n);
    setErrors((e) => ({ ...e, need: "" }));
  };

  const fields: ContactFields = useMemo(() => {
    const subj = need ? `Quote: ${need.title}${picks.length ? ` · ${picks.slice(0, 3).join(", ")}${picks.length > 3 ? "…" : ""}` : ""}` : "";
    const facts = [
      picks.length ? `${need?.pickLabel || "Selected"} ${picks.join("; ")}` : "",
      location && `Location: ${location}`,
      `Needed: ${when}`,
      `Preferred contact: ${reach}`,
    ].filter(Boolean);
    return { ...who, type: need?.type ?? "", subject: subj, message: `${facts.join("\n")}\n\n${details.trim()}` };
  }, [need, picks, location, when, reach, details, who]);

  const waText = [
    "Hello Serviceberry, I would like a quote.",
    need && `Need: ${need.title}${picks.length ? ` (${picks.join(", ")})` : ""}`,
    details.trim() && `Details: ${details.trim()}`,
    location && `Location: ${location}`,
    `Needed: ${when}`,
    (who.name || who.company) && `From: ${[who.name, who.company].filter(Boolean).join(", ")}`,
  ]
    .filter(Boolean)
    .join("\n");

  async function submit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const e: Record<string, string> = {};
    if (!need) e.need = "Choose what you need.";
    if (details.trim().length < 10) e.details = "A line or two about the job helps us quote (at least 10 characters).";
    if (file) {
      const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
      if (file.size > MAX_ATTACHMENT_BYTES) e.file = "Attachments must be 5 MB or smaller.";
      else if (!ALLOWED_ATTACHMENT.includes(ext)) e.file = "Use PDF, Word, Excel, JPG or PNG.";
    }
    const c = validateContact(fields, null);
    delete c.subject;
    delete c.message;
    delete c.type;
    Object.assign(e, c);
    setErrors(e);
    setFailMsg("");
    const first = Object.keys(e)[0];
    if (first) {
      const el = document.getElementById(`q-${first}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      el?.focus({ preventScroll: true });
      return;
    }

    setState("sending");
    const data = new FormData();
    Object.entries(fields).forEach(([k, v]) => data.append(k, v));
    if (file) data.append("attachment", file);
    data.append("website", (ev.currentTarget.elements.namedItem("website") as HTMLInputElement)?.value ?? "");
    try {
      const res = await fetch("/api/contact", { method: "POST", body: data });
      const json = await res.json();
      if (json.ok) {
        setState("sent");
        top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        setState("idle");
        setFailMsg(json.error || Object.values(json.errors ?? {}).join(" ") || "Something went wrong. Please try again.");
      }
    } catch {
      setState("idle");
      setFailMsg("Network error. Please try again, or message us on WhatsApp.");
    }
  }

  const aria = (k: string) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `q-${k}-err` : undefined });
  const setWhoField = (k: keyof typeof who) => (ev: { target: { value: string } }) => setWho((w) => ({ ...w, [k]: ev.target.value }));

  return (
    <div ref={top} className="scroll-mt-28">
      <AnimatePresence mode="wait">
        {state === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            role="status"
            className="rounded-[30px] bg-white p-8 text-center ring-1 ring-line sm:p-14"
          >
            <CheckCircle2 className="mx-auto size-14 text-go" strokeWidth={1.4} />
            <p className="headline mt-6 text-[clamp(1.8rem,3vw,2.6rem)]">Request received. Thank you, {who.name.split(" ")[0]}.</p>
            <p className="mx-auto mt-3 max-w-lg text-[16.5px] text-steel">
              An engineer will read it and reply by {reach === "Email" ? "email" : reach === "Phone call" ? "phone" : "WhatsApp"}. If it is urgent, message us now.
            </p>
            <div className="mx-auto mt-8 max-w-md rounded-2xl bg-paper p-5 text-left text-[15px] ring-1 ring-line">
              <p className="font-semibold">{fields.subject}</p>
              <p className="mt-1 text-steel">{[location, when].filter(Boolean).join(" · ")}</p>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={waLink(`Hello Serviceberry, I just sent a quote request: ${fields.subject}.`)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-[#25d366] px-5 font-display text-[15px] font-semibold text-[#06281a]">
                <WhatsAppIcon /> Follow up on WhatsApp
              </a>
              <button type="button" onClick={() => setState("idle")} className="min-h-12 rounded-full px-5 font-display text-[15px] font-medium ring-1 ring-line hover:ring-ink/30">
                Send another request
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10 rounded-[30px] bg-white p-6 ring-1 ring-line sm:p-10">
            <Section n="01" title="What do you need?" hint="Pick one, then the specifics if they apply.">
              <div id="q-need" tabIndex={-1} role="radiogroup" aria-label="What do you need?" className="grid gap-2.5 outline-none sm:grid-cols-2 xl:grid-cols-3">
                {quoteNeeds.map((n, i) => {
                  const Icon = icons[n.id];
                  const on = need?.id === n.id;
                  return (
                    <button
                      key={n.id}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => choose(n)}
                      className={cn(
                        "group relative flex items-start gap-3.5 rounded-2xl p-4 text-left transition-[background-color,box-shadow,color] duration-300",
                        on ? "bg-brand-deep text-white shadow-[0_18px_40px_-22px_rgba(10,42,87,0.9)]" : "bg-paper ring-1 ring-line hover:ring-ink/30",
                      )}
                    >
                      <span className={cn("grid size-10 shrink-0 place-items-center rounded-xl transition-colors", on ? "bg-brand-light text-brand-deep" : "bg-white text-brand ring-1 ring-line")}>
                        <Icon className="size-5" strokeWidth={1.7} />
                      </span>
                      <span className="min-w-0">
                        <span className="flex items-center gap-2">
                          <span className={cn("font-display text-[12px] font-semibold tabular-nums", on ? "text-brand-light" : "text-steel-2")}>{String(i + 1).padStart(2, "0")}</span>
                          <span className="text-[15.5px] font-semibold">{n.title}</span>
                        </span>
                        <span className={cn("mt-1 block text-[13.5px] leading-snug", on ? "text-white/70" : "text-steel")}>{n.body}</span>
                      </span>
                      {on && <Check className="absolute top-3 right-3 size-4 text-brand-light" strokeWidth={3} />}
                    </button>
                  );
                })}
              </div>
              {errors.need && <p className="mt-2 text-[13.5px] text-[#b3123f]">{errors.need}</p>}

              <AnimatePresence initial={false}>
                {need && need.picks.length > 0 && (
                  <motion.div key={need.id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.45, ease }} className="overflow-hidden">
                    <p className="mt-7 mb-3 text-[14px] font-medium">
                      {need.pickLabel} <span className="font-normal text-steel">(pick any)</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {need.picks.map((p) => (
                        <Chip key={p} on={picks.includes(p)} onClick={() => toggle(p)}>{p}</Chip>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Section>

            <Section n="02" title="About the job">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="q-details" label="Quantities, specifications or a short description" error={errors.details} className="sm:col-span-2">
                  <textarea
                    id="q-details"
                    rows={4}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="e.g. Cleaning pig runs on a 12-inch, 8 km flowline; wax build-up; line in service."
                    className={`${input} resize-y`}
                    {...aria("details")}
                  />
                </Field>
                <Field id="q-location" label="Location" optional>
                  <input id="q-location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Field, facility or city" className={input} />
                </Field>
                <Field id="q-when" label="Needed by" optional>
                  <div className="relative">
                    <select id="q-when" value={when} onChange={(e) => setWhen(e.target.value)} className={`${input} appearance-none pr-11`}>
                      {quoteWhens.map((w) => <option key={w}>{w}</option>)}
                    </select>
                    <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-steel" />
                  </div>
                </Field>
                <div className="sm:col-span-2">
                  <p className="mb-2 text-[14px] font-medium">Drawings, a datasheet or photos <span className="font-normal text-steel">(optional)</span></p>
                  {file ? (
                    <div className="flex items-center justify-between gap-3 rounded-2xl bg-paper px-4 py-3 ring-1 ring-line">
                      <span className="flex min-w-0 items-center gap-3 text-[15px]"><Paperclip className="size-4 shrink-0 text-brand" /> <span className="truncate">{file.name}</span></span>
                      <button type="button" onClick={() => { setFile(null); if (fileInput.current) fileInput.current.value = ""; }} aria-label="Remove file" className="grid size-8 place-items-center rounded-full hover:bg-white"><X className="size-4" /></button>
                    </div>
                  ) : (
                    <label htmlFor="q-file" className="flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-steel-2/70 bg-paper px-4 py-3 text-[14.5px] text-steel transition-colors hover:border-brand hover:text-ink">
                      <Paperclip className="size-4" /> Add a file: PDF, Word, Excel, JPG or PNG, up to 5 MB
                    </label>
                  )}
                  <input ref={fileInput} id="q-file" type="file" accept={ALLOWED_ATTACHMENT.join(",")} className="sr-only" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
                  {errors.file && <p id="q-file-err" className="mt-1.5 text-[13.5px] text-[#b3123f]">{errors.file}</p>}
                </div>
              </div>
            </Section>

            <Section n="03" title="Your details">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="q-name" label="Full name" error={errors.name}>
                  <input id="q-name" autoComplete="name" value={who.name} onChange={setWhoField("name")} className={input} {...aria("name")} />
                </Field>
                <Field id="q-company" label="Company" error={errors.company}>
                  <input id="q-company" autoComplete="organization" value={who.company} onChange={setWhoField("company")} className={input} {...aria("company")} />
                </Field>
                <Field id="q-email" label="Work email" error={errors.email}>
                  <input id="q-email" type="email" autoComplete="email" value={who.email} onChange={setWhoField("email")} className={input} {...aria("email")} />
                </Field>
                <Field id="q-phone" label="Phone" error={errors.phone}>
                  <input id="q-phone" type="tel" autoComplete="tel" placeholder="+234" value={who.phone} onChange={setWhoField("phone")} className={input} {...aria("phone")} />
                </Field>
                <Field id="q-jobTitle" label="Job title" optional>
                  <input id="q-jobTitle" autoComplete="organization-title" value={who.jobTitle} onChange={setWhoField("jobTitle")} className={input} />
                </Field>
                <div>
                  <p className="mb-2 text-[14px] font-medium">Best way to reach you</p>
                  <div role="radiogroup" aria-label="Best way to reach you" className="flex flex-wrap gap-2">
                    {quoteReaches.map((r) => (
                      <button
                        key={r}
                        type="button"
                        role="radio"
                        aria-checked={reach === r}
                        onClick={() => setReach(r)}
                        className={cn("min-h-11 rounded-full px-4 text-[14.5px] transition-colors", reach === r ? "bg-ink text-white" : "bg-paper ring-1 ring-line hover:ring-ink/30")}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Section>

            {/* honeypot */}
            <div aria-hidden className="absolute -left-[9999px]">
              <label htmlFor="q-website">Website</label>
              <input id="q-website" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="border-t border-line pt-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  disabled={state === "sending"}
                  className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-berry px-8 font-display text-[16px] font-semibold text-white shadow-[0_14px_30px_-14px_rgba(182,52,75,0.85)] transition-colors hover:bg-berry-deep disabled:opacity-70"
                >
                  {state === "sending" && <Loader2 className="size-5 animate-spin" />}
                  {state === "sending" ? "Sending…" : "Submit request"}
                </button>
                <a
                  href={waLink(waText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full px-7 font-display text-[16px] font-medium text-ink ring-1 ring-ink/20 transition-colors ring-inset hover:bg-[#25d366]/10 hover:ring-[#25d366]"
                >
                  <WhatsAppIcon className="size-5 text-[#1faa55]" /> Send via WhatsApp instead
                </a>
              </div>
              <p className="mt-4 text-[13.5px] text-steel">By submitting, you agree to be contacted about this request. We only use your details to reply.</p>
            </div>
            {failMsg && <p role="alert" className="rounded-2xl bg-[#fdecef] px-4 py-3 text-[14.5px] text-[#8a0f30]">{failMsg}</p>}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
