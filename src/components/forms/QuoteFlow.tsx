"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Boxes, Check, GraduationCap, Handshake, MessageSquare, Paperclip, PackageSearch, Pencil, Wrench } from "lucide-react";
import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { equipmentForSale, sourcingCategories } from "@/content/equipment";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { ALLOWED_ATTACHMENT, validateContact, type ContactFields } from "@/lib/contact";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

/** What can be requested. `type` is the enquiry type the API expects. */
const needs = [
  { id: "services", type: "Services", icon: Wrench, title: "A service", body: "Pigging, commissioning, integrity, chemicals, monitoring, valves.", pickLabel: "Which services?", picks: services.map((s) => s.title) },
  { id: "sale", type: "Equipment for Sale", icon: Boxes, title: "Equipment we have", body: "Packages and skids available through Serviceberry.", pickLabel: "Which items?", picks: equipmentForSale.map((e) => e.title) },
  { id: "source", type: "Equipment Sourcing", icon: PackageSearch, title: "Equipment sourced", body: "Tell us the duty; we find, check and deliver it.", pickLabel: "What kind of equipment?", picks: sourcingCategories.map((c) => c.title) },
  { id: "project", type: "Project Collaboration", icon: Handshake, title: "A project partner", body: "Subcontract scopes, bids and technology partnerships.", pickLabel: "What kind of collaboration?", picks: ["EPC subcontract scope", "Bid or tender support", "Technology partnership", "Long-term service contract"] },
  { id: "academy", type: "Academy", icon: GraduationCap, title: "Training", body: "Technical, professional and business courses for your team.", pickLabel: "Which tracks?", picks: ["Technical", "Professional", "Business"] },
  { id: "other", type: "Other", icon: MessageSquare, title: "Something else", body: "A question, documents, or anything not listed.", pickLabel: "", picks: [] as string[] },
] as const;

const wheres = ["Onshore", "Offshore", "Plant or facility", "Workshop / our yard", "Not sure yet"];
const whens = ["As soon as possible", "Within 2 weeks", "Within 1–3 months", "Planning or budgeting"];
const reaches = ["Email", "Phone call", "WhatsApp"];
const steps = ["What you need", "About the job", "Your details", "Review"];
const by: Record<string, string> = { Email: "email", "Phone call": "phone", WhatsApp: "WhatsApp" };

type Need = (typeof needs)[number];

function Chip({ on, children, onClick }: { on: boolean; children: ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-[14.5px] transition-all duration-300",
        on ? "bg-brand text-white shadow-[0_8px_20px_-10px_rgba(11,79,191,0.8)]" : "bg-white text-ink ring-1 ring-line hover:ring-ink/30",
      )}
    >
      <span className={cn("grid size-4 place-items-center rounded-full transition-all", on ? "bg-white text-brand" : "ring-1 ring-ink/25")}>
        {on && <Check className="size-3" strokeWidth={3} />}
      </span>
      {children}
    </button>
  );
}

function Field({ label, optional, error, children }: { label: string; optional?: boolean; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-[14px] font-medium text-ink">
        {label} {optional && <span className="font-normal text-steel">(optional)</span>}
      </span>
      <span className="mt-2 block">{children}</span>
      {error && <span className="mt-1.5 block text-[13.5px] text-[#b3123f]">{error}</span>}
    </label>
  );
}

const input =
  "w-full rounded-2xl bg-white px-4 py-3.5 text-[16px] text-ink ring-1 ring-line outline-none transition-shadow placeholder:text-steel-2 focus:ring-2 focus:ring-brand";

/**
 * Request a quote in four short steps: pick what you need (and the specifics), describe the
 * job, leave your details, review and send. A live summary sits beside it. Sends through
 * /api/contact, so the email arrives in the same mailbox as the contact form.
 */
export function QuoteFlow({ initialType, initialSubject }: { initialType?: string; initialSubject?: string }) {
  const start = needs.find((n) => n.type === initialType);
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [need, setNeed] = useState<Need | undefined>(start);
  const [picks, setPicks] = useState<string[]>(() => {
    if (!start || !initialSubject) return [];
    const hit = (start.picks as readonly string[]).find((p) => initialSubject.toLowerCase().includes(p.toLowerCase()));
    return hit ? [hit] : [];
  });
  const [where, setWhere] = useState("");
  const [when, setWhen] = useState("");
  const [location, setLocation] = useState("");
  const [details, setDetails] = useState(initialSubject && !picks.length ? `${initialSubject}\n` : "");
  const [file, setFile] = useState<File | null>(null);
  const [who, setWho] = useState({ name: "", company: "", jobTitle: "", email: "", phone: "" });
  const [reach, setReach] = useState("Email");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [failMsg, setFailMsg] = useState("");

  const toggle = (p: string) => setPicks((v) => (v.includes(p) ? v.filter((x) => x !== p) : [...v, p]));
  const chooseNeed = (n: Need) => {
    if (n.id !== need?.id) setPicks([]);
    setNeed(n);
    setErrors({});
  };

  const fields: ContactFields = useMemo(() => {
    const subject = need ? `Quote: ${need.title}${picks.length ? ` · ${picks.slice(0, 3).join(", ")}${picks.length > 3 ? "…" : ""}` : ""}` : "";
    const facts = [
      picks.length ? `${need?.pickLabel || "Selected"} ${picks.join("; ")}` : "",
      where && `Where: ${where}`,
      location && `Location: ${location}`,
      when && `Needed: ${when}`,
      `Preferred contact: ${reach}`,
    ].filter(Boolean);
    const message = `${facts.join("\n")}\n\n${details.trim() || "(no further details)"}`;
    return { ...who, type: need?.type ?? "", subject, message };
  }, [need, picks, where, location, when, reach, details, who]);

  const check = (s: number) => {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (!need) e.need = "Choose what you need.";
      else if (need.picks.length && !picks.length) e.picks = "Pick at least one, or choose “Something else”.";
    }
    if (s === 1) {
      if (!when) e.when = "Tell us when you need it.";
      if (details.trim().length < 10) e.details = "A line or two about the job helps us quote (at least 10 characters).";
      if (file) {
        const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
        if (file.size > 5 * 1024 * 1024) e.file = "Attachments must be 5 MB or smaller.";
        else if (!ALLOWED_ATTACHMENT.includes(ext)) e.file = "Use PDF, Word, Excel, JPG or PNG.";
      }
    }
    if (s === 2) Object.assign(e, validateContact(fields, null));
    delete e.subject;
    delete e.message;
    delete e.type;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const go = (to: number) => {
    if (to > step && !check(step)) return;
    setDir(to > step ? 1 : -1);
    setStep(to);
    window.scrollTo({ top: (document.getElementById("quote")?.offsetTop ?? 0) - 90, behavior: "smooth" });
  };

  const send = async () => {
    setState("sending");
    const fd = new FormData();
    Object.entries(fields).forEach(([k, v]) => fd.append(k, v));
    if (file) fd.append("attachment", file);
    try {
      const r = await fetch("/api/contact", { method: "POST", body: fd });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.ok) setState("sent");
      else {
        setFailMsg(j.error || "Something went wrong. Please try again, or email us.");
        setState("failed");
      }
    } catch {
      setFailMsg("We could not reach the server. Please check your connection, or email us.");
      setState("failed");
    }
  };

  if (state === "sent") {
    return (
      <motion.div id="quote" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="rounded-[32px] bg-white p-8 ring-1 ring-line sm:p-12">
        <span className="grid size-14 place-items-center rounded-full bg-brand text-white"><Check className="size-7" /></span>
        <h2 className="headline mt-8 text-[clamp(2rem,3.6vw,3rem)]">Thank you, {who.name.split(" ")[0]}.</h2>
        <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-steel">
          Your request is with our team. We will reply by {by[reach]} with questions, a scope or a quotation.
        </p>
        <Link href="/" className="mt-8 inline-flex min-h-11 items-center gap-2 font-medium text-brand hover:underline">Back to the home page <ArrowRight className="size-4" /></Link>
      </motion.div>
    );
  }

  return (
    <div id="quote" className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
      <div className="min-w-0">
        {/* progress */}
        <ol className="grid grid-cols-4 gap-2">
          {steps.map((s, i) => (
            <li key={s}>
              <button type="button" disabled={i > step} onClick={() => i < step && go(i)} className="group w-full text-left disabled:cursor-default">
                <span className="block h-1.5 overflow-hidden rounded-full bg-line">
                  <motion.span className="block h-full rounded-full bg-brand" initial={false} animate={{ width: i <= step ? "100%" : "0%" }} transition={{ duration: 0.6, ease }} />
                </span>
                <span className={cn("mt-2.5 hidden text-[13px] sm:block", i === step ? "font-semibold text-ink" : i < step ? "text-brand group-hover:underline" : "text-steel")}>
                  {String(i + 1).padStart(2, "0")} · {s}
                </span>
              </button>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-[13px] text-steel sm:hidden">Step {step + 1} of 4 · {steps[step]}</p>

        <div className="relative mt-10">
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.div
              key={step}
              custom={dir}
              initial={{ opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.45, ease }}
            >
              {step === 0 && (
                <section aria-labelledby="q0">
                  <h2 id="q0" className="headline text-[clamp(1.8rem,3vw,2.6rem)]">What do you need?</h2>
                  <p className="mt-2 text-[16px] text-steel">Choose one, then pick the specifics.</p>
                  <div role="radiogroup" className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {needs.map((n) => {
                      const on = need?.id === n.id;
                      return (
                        <button
                          key={n.id}
                          type="button"
                          role="radio"
                          aria-checked={on}
                          onClick={() => chooseNeed(n)}
                          className={cn(
                            "group relative flex min-h-[150px] flex-col justify-between rounded-[24px] p-5 text-left transition-all duration-300",
                            on ? "bg-brand-deep text-white shadow-[0_24px_40px_-24px_rgba(10,42,87,0.8)]" : "bg-white ring-1 ring-line hover:-translate-y-0.5 hover:ring-ink/25",
                          )}
                        >
                          <span className="flex items-center justify-between">
                            <span className={cn("grid size-11 place-items-center rounded-2xl transition-colors", on ? "bg-white/15 text-white" : "bg-brand-soft text-brand")}>
                              <n.icon className="size-5" strokeWidth={1.7} />
                            </span>
                            <span className={cn("grid size-6 place-items-center rounded-full transition-all", on ? "bg-white text-brand-deep" : "ring-1 ring-ink/20")}>
                              {on && <Check className="size-3.5" strokeWidth={3} />}
                            </span>
                          </span>
                          <span>
                            <span className="headline block text-[21px]">{n.title}</span>
                            <span className={cn("mt-1 block text-[14px] leading-snug", on ? "text-white/75" : "text-steel")}>{n.body}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.need && <p className="mt-3 text-[14px] text-[#b3123f]">{errors.need}</p>}

                  <AnimatePresence initial={false}>
                    {need && need.picks.length > 0 && (
                      <motion.div key={need.id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.5, ease }} className="overflow-hidden">
                        <div className="mt-8 rounded-[24px] bg-mist p-6">
                          <p className="font-medium text-ink">{need.pickLabel} <span className="font-normal text-steel">Pick all that apply.</span></p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {need.picks.map((p, i) => (
                              <motion.span key={p} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i, duration: 0.4, ease }}>
                                <Chip on={picks.includes(p)} onClick={() => toggle(p)}>{p}</Chip>
                              </motion.span>
                            ))}
                          </div>
                          {errors.picks && <p className="mt-3 text-[14px] text-[#b3123f]">{errors.picks}</p>}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </section>
              )}

              {step === 1 && (
                <section aria-labelledby="q1" className="space-y-8">
                  <div>
                    <h2 id="q1" className="headline text-[clamp(1.8rem,3vw,2.6rem)]">About the job</h2>
                    <p className="mt-2 text-[16px] text-steel">A rough picture is enough. We will ask about the rest.</p>
                  </div>
                  <div>
                    <p className="text-[14px] font-medium text-ink">Where is it? <span className="font-normal text-steel">(optional)</span></p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {wheres.map((w) => <Chip key={w} on={where === w} onClick={() => setWhere(where === w ? "" : w)}>{w}</Chip>)}
                    </div>
                  </div>
                  <Field label="Site or delivery location" optional>
                    <input className={input} value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Bonny, Rivers State" />
                  </Field>
                  <div>
                    <p className="text-[14px] font-medium text-ink">When do you need it?</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {whens.map((w) => <Chip key={w} on={when === w} onClick={() => setWhen(w)}>{w}</Chip>)}
                    </div>
                    {errors.when && <p className="mt-2 text-[13.5px] text-[#b3123f]">{errors.when}</p>}
                  </div>
                  <Field label="Details" error={errors.details}>
                    <textarea
                      className={cn(input, "min-h-[150px] resize-y")}
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="Line size and length, product, quantities, specifications or part numbers, anything you already know."
                    />
                  </Field>
                  <div>
                    <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-white px-4 text-[14.5px] ring-1 ring-line hover:ring-ink/30">
                      <Paperclip className="size-4" />
                      <span className="max-w-[240px] truncate">{file ? file.name : "Attach a drawing or spec"}</span>
                      <input type="file" className="sr-only" accept={ALLOWED_ATTACHMENT.join(",")} onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
                    </label>
                    {file && <button type="button" onClick={() => setFile(null)} className="ml-3 text-[14px] text-steel underline">Remove</button>}
                    <p className="mt-2 text-[13px] text-steel">Optional. PDF, Word, Excel, JPG or PNG, up to 5 MB.</p>
                    {errors.file && <p className="mt-1 text-[13.5px] text-[#b3123f]">{errors.file}</p>}
                  </div>
                </section>
              )}

              {step === 2 && (
                <section aria-labelledby="q2" className="space-y-6">
                  <div>
                    <h2 id="q2" className="headline text-[clamp(1.8rem,3vw,2.6rem)]">Your details</h2>
                    <p className="mt-2 text-[16px] text-steel">So the right engineer can come back to you.</p>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full name" error={errors.name}><input className={input} autoComplete="name" value={who.name} onChange={(e) => setWho({ ...who, name: e.target.value })} /></Field>
                    <Field label="Company" error={errors.company}><input className={input} autoComplete="organization" value={who.company} onChange={(e) => setWho({ ...who, company: e.target.value })} /></Field>
                    <Field label="Job title" optional><input className={input} autoComplete="organization-title" value={who.jobTitle} onChange={(e) => setWho({ ...who, jobTitle: e.target.value })} /></Field>
                    <Field label="Work email" error={errors.email}><input className={input} type="email" autoComplete="email" value={who.email} onChange={(e) => setWho({ ...who, email: e.target.value })} /></Field>
                    <Field label="Phone" error={errors.phone}><input className={input} type="tel" autoComplete="tel" value={who.phone} onChange={(e) => setWho({ ...who, phone: e.target.value })} /></Field>
                  </div>
                  <div>
                    <p className="text-[14px] font-medium text-ink">Best way to reach you</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {reaches.map((r) => <Chip key={r} on={reach === r} onClick={() => setReach(r)}>{r}</Chip>)}
                    </div>
                  </div>
                </section>
              )}

              {step === 3 && (
                <section aria-labelledby="q3">
                  <h2 id="q3" className="headline text-[clamp(1.8rem,3vw,2.6rem)]">Check and send</h2>
                  <p className="mt-2 text-[16px] text-steel">Make sure this is right. You can change anything.</p>
                  <dl className="mt-8 divide-y divide-line overflow-hidden rounded-[24px] bg-white ring-1 ring-line">
                    {[
                      { k: "You need", v: [need?.title, picks.join(", ")].filter(Boolean).join(": "), s: 0 },
                      { k: "The job", v: [where, location, when].filter(Boolean).join(" · "), s: 1 },
                      { k: "Details", v: details.trim() + (file ? `\nAttached: ${file.name}` : ""), s: 1 },
                      { k: "You", v: `${who.name}, ${who.jobTitle ? `${who.jobTitle}, ` : ""}${who.company}\n${who.email} · ${who.phone}\nReply by ${by[reach]}`, s: 2 },
                    ].map((r) => (
                      <div key={r.k} className="flex items-start justify-between gap-6 p-5 sm:p-6">
                        <div className="min-w-0">
                          <dt className="text-[13px] font-medium text-steel">{r.k}</dt>
                          <dd className="mt-1 text-[15.5px] whitespace-pre-line text-ink">{r.v || "—"}</dd>
                        </div>
                        <button type="button" onClick={() => go(r.s)} className="inline-flex min-h-11 shrink-0 items-center gap-1.5 text-[14px] font-medium text-brand hover:underline">
                          <Pencil className="size-3.5" /> Edit
                        </button>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-5 text-[13.5px] text-steel">By sending, you agree to be contacted about this request. We never share your details.</p>
                  {state === "failed" && (
                    <p role="alert" className="mt-4 rounded-2xl bg-[#fdecef] p-4 text-[14.5px] text-[#8c0f33]">
                      {failMsg}{" "}
                      {!failMsg.includes(site.email) && <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>}
                    </p>
                  )}
                </section>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* controls */}
        <div className="mt-10 flex items-center justify-between gap-4 border-t border-line pt-6">
          {step > 0 ? (
            <button type="button" onClick={() => go(step - 1)} className="inline-flex min-h-12 items-center gap-2 rounded-full px-5 text-[15px] font-medium text-ink ring-1 ring-line hover:ring-ink/30">
              <ArrowLeft className="size-4" /> Back
            </button>
          ) : (
            <span />
          )}
          {step < 3 ? (
            <button type="button" onClick={() => go(step + 1)} className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-brand py-1.5 pr-1.5 pl-6 text-[15px] font-medium text-white transition-colors hover:bg-brand-deep">
              Continue
              <span className="grid size-9 place-items-center rounded-full bg-white text-brand"><ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" /></span>
            </button>
          ) : (
            <button type="button" disabled={state === "sending"} onClick={send} className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-berry py-1.5 pr-1.5 pl-6 text-[15px] font-medium text-white shadow-[0_14px_30px_-14px_rgba(196,32,90,0.85)] transition-colors hover:bg-berry-deep disabled:opacity-70">
              {state === "sending" ? "Sending…" : "Send request"}
              <span className="grid size-9 place-items-center rounded-full bg-white text-berry"><ArrowRight className="size-4" /></span>
            </button>
          )}
        </div>
      </div>

      {/* live summary */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-[28px] bg-brand-deep p-6 text-white sm:p-7">
          <p className="text-[13px] font-medium text-white/70">Your request</p>
          <ul className="mt-4 space-y-4 text-[15px]">
            <SummaryRow label="Need" value={need?.title} />
            <SummaryRow label="Specifics" value={picks.length ? picks.join(", ") : undefined} />
            <SummaryRow label="Where" value={[where, location].filter(Boolean).join(" · ") || undefined} />
            <SummaryRow label="When" value={when || undefined} />
          </ul>
          <div className="mt-6 border-t border-white/15 pt-5">
            <p className="text-[13px] font-medium text-white/70">What happens next</p>
            <ol className="mt-3 space-y-2.5 text-[14px] text-white/85">
              {["We read it the same day", "An engineer calls with questions", "You get a scope or a priced quote", "We plan, deliver and report"].map((t, i) => (
                <li key={t} className="flex gap-3">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white/10 text-[12px]">{i + 1}</span> {t}
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="mt-4 rounded-[28px] bg-white p-6 ring-1 ring-line">
          <p className="text-[14px] font-medium text-ink">Rather talk?</p>
          <div className="mt-3 space-y-1.5 text-[15px] text-steel">
            {site.phones.map((p) => <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="block hover:text-brand">{p}</a>)}
            <a href={`mailto:${site.email}`} className="block break-all hover:text-brand">{site.email}</a>
          </div>
        </div>
      </aside>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value?: string }) {
  return (
    <li className="flex gap-3">
      <span className={cn("mt-1 grid size-4 shrink-0 place-items-center rounded-full transition-colors", value ? "bg-brand-light text-brand-deep" : "ring-1 ring-white/30")}>
        {value && <Check className="size-2.5" strokeWidth={3.5} />}
      </span>
      <span className="min-w-0">
        <span className="block text-[12.5px] text-white/60">{label}</span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={value ?? "none"} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className={cn("block", value ? "text-white" : "text-white/40")}>
            {value ?? "Not chosen yet"}
          </motion.span>
        </AnimatePresence>
      </span>
    </li>
  );
}
