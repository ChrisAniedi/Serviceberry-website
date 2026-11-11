# Serviceberry-website

Serviceberry Global Limited — company website.

Rebuild of www.serviceberryglobal.com, following the *Practical Website Redesign Workbook*.
Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · shadcn conventions (`components.json`, `cn`, cva) · Motion · Lenis.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (also type-checks)
npm run lint
```

## Where things live

| What | File |
|---|---|
| Phone, email, address, Academy URL, hero video switch | `src/content/site.ts` |
| Services (7 lines, scopes, technology, applications) | `src/content/services.ts` |
| Equipment for sale + sourcing categories | `src/content/equipment.ts` |
| Case studies | `src/content/projects.ts` |
| Partners | `src/content/partners.ts` |
| Every photo (one map, swap in one line) | `src/content/images.ts` |
| Brand colours and fonts | `src/app/globals.css` (`@theme`) |
| Contact form email delivery | `src/app/api/contact/route.ts` + `.env.example` |
| Redirects from old `.html` pages | `next.config.ts` |

## Pages

Home (workbook order) · About · Services + 7 service pages · Equipment (A. for sale / B. sourcing) + item pages ·
Projects + case studies (9 headings) · Partners (profiles) · QHSE · Careers · Academy · Contact · 404 · sitemap.xml · robots.txt.

The **Academy** has its own page (`/academy`) that explains and sells it; every main button there, on the homepage
band, in the footer and in the mobile menu goes out to https://academy.serviceberryglobal.com in a new tab.

## Design

- **Brand** from the Serviceberry brochure (Sept 2025): royal blue and navy from the logo's S, crimson from its drop
  (`--color-brand`, `--color-brand-deep`, `--color-berry`; `berry-light` / `brand-light` for text on dark).
  Archivo headlines (light, sentence case) and Instrument Sans body. Edge-to-edge layout (`--gutter`, `bleed-x`).
- **Buttons**: pill buttons (`components/ui/Button.tsx`, cva variants) with a fill that sweeps in and an arrow
  that slides through its round chip.
- **Hero**: a visible three-column grid over an offshore platform at sunset. The photo is alive (`HeroScene`):
  a flickering gas flare with smoke, blinking warning lights, drifting haze and light on the water. Side cards,
  a Launcher → Receiver arc with a travelling pig carrying the buttons, then About, Academy and partners.
- **Homepage**, top to bottom: scroll-reactive service band · services as a sideways-scrolling row of photo cards
  with glass panels (pins on large screens) · sticky pigging story · expanding technology panels (MTM-G, Elecsys
  Connect, Alpha Descaler, Purasolve PWD, HDPE-lined pipe) · field photos sliding both ways on scroll · "why clients
  work with us" glass tiles · equipment · stacking project cards · Academy · closing "Achieve more with Efficient
  Engineering." after the brochure's back page.
- **Photos**: `public/images/serviceberry/` are from the brochure (small; used in cards). `public/images/stock/` are
  free-licence Unsplash placeholders. Both go through `src/content/images.ts`.
- **Header**: links left, logo centre, Start a job and a Menu button that opens a full-screen menu.
- Everything respects the visitor's *reduce motion* setting.
- Unverified items show a "To verify" tag in `npm run dev` only; it never shows on the live site,
  so the checklist below must be done before launch.

## Before launch (from the workbook)

Anything not yet verified shows a **To verify** tag in development. Search the code for `TODO(verify)` and `[Confirm`.

- [ ] Replace stock photos (`public/images/stock`, free Unsplash licence) with genuine Serviceberry photos.
- [ ] Replace the wordmark in `src/components/ui/Logo.tsx` with the official logo file.
- [ ] Ask for the brochure photos at full size (the PDF copies are 300–1250px).
- [ ] Confirm phone numbers and email: the brochure lists +234 806 341 5145 and sales@serviceberryglobal.com.
- [ ] Management approves service list and wording (`confirmed: true`).
- [ ] Equipment: ownership/authority to advertise, availability, condition, specs, 3+ photos each (`verified: true`).
- [ ] Projects: three real case studies with client permission and exact role (`verified: true`).
- [ ] Partners: documented relationship, territory, logo permission (`verified: true`).
- [ ] QHSE: add current approved certificates.
- [ ] Contact: confirm map pin, add LinkedIn/WhatsApp, set `RESEND_API_KEY` / `CONTACT_TO` and test delivery + spam.
- [ ] Check the old site's page names and complete the redirects.
- [ ] Mobile/tablet/desktop testing; management sign-off.

## Hosting

The workbook assumed WordPress. This build is a Next.js site instead, so it needs a Node host
(Vercel is simplest; any Node 18+ server works). DNS: point only `www`/root to the new host when approved, and
leave the `academy` subdomain record untouched.
