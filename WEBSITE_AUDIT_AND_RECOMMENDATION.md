# DHA Karachi Villas Website Audit and Modernization Recommendation

Audit date: 10 October 2026 (Asia/Karachi)

## Executive finding

The live website is available, but the property catalogue is not: the home page is visibly stuck on **"Loading properties..."**. The code confirms that all listings are fetched from Supabase in the visitor's browser. The exact operational cause is now verified: the DHAKV Supabase project is `ACTIVE_HEALTHY`, but its Storage gateway returns **HTTP 402** because the **cached egress quota has been exceeded**. This blocks public property images. The database is not full: `public.properties` contains an estimated 75 records and occupies only 280 kB including indexes.

The codebase also has urgent security problems independent of the outage. Treat the existing backend and deployed secrets as compromised until rotated.

## What was audited

- Live production home page at `https://www.dhakv.com/`.
- All application pages, API routes, database scripts, configuration, and dependency manifest in this repository.
- A clean dependency installation and production build.
- Current provider limits and pricing from official Supabase, Cloudflare, Resend, Google AI, and Next.js documentation.

## Evidence and test results

| Check | Result | Meaning |
| --- | --- | --- |
| Live home page | Fail | The property section displays "Loading properties..." rather than listings. |
| Supabase project status | Active healthy, but service restricted | The DHAKV project itself is alive; this is not an inactive-project or database-capacity failure. |
| Supabase Storage request | Fail - HTTP 402 | Public property-image URLs return `exceed_cached_egress_quota`; the project owner must upgrade or remove the spend cap to restore the service. |
| Database catalogue | Present | `public.properties` has an estimated 75 listings and is only 280 kB total; the listings have not been lost. |
| Production build with the real environment absent | Fail | The API route creates a Supabase client at module load, so the build fails immediately when `NEXT_PUBLIC_SUPABASE_URL` is absent. |
| Controlled production build with non-sensitive placeholder variables | Pass | All 11 static pages compile; recovery/rebuild is technically feasible. |
| TypeScript and lint checks during build | Skipped by configuration | `ignoreBuildErrors` and `ignoreDuringBuilds` hide issues that should block release. |
| Dependency audit | Fail | `pnpm audit --prod` reports 3 critical, 30 high, 25 moderate, and 5 low findings. The dependency set requires a planned upgrade rather than ad-hoc patches. |
| Framework lifecycle | Unsupported | Next.js 14 is outside the current supported versions listed by Next.js. |

## Critical findings - fix before restoring administration

1. **Email API key is committed in source control.** `lib/send-email.ts:5` contains a live-looking Resend key instead of reading `RESEND_API_KEY` from the deployment's secret store. Rotate it in Resend now, remove it from the repository and Git history as appropriate, and issue a new restricted key only after the code is fixed.
2. **Admin access is a hard-coded browser password.** `app/admin/listings/page.tsx:138` compares a password in a client component. Anyone can retrieve it from the delivered JavaScript. There is no real login, session, MFA, or server-side permission check.
3. **Property editing is exposed to the public API role.** The browser uses the public Supabase client to insert, update, and delete listings. The supplied schema does not enable Row Level Security or add a policy that restricts listing changes to authorised staff. This must be assumed publicly writable unless the live dashboard independently proves a compensating policy.
4. **Image upload and deletion endpoints have no authentication or rate limit.** `app/api/upload-image/route.ts` and `app/api/delete-image/route.ts` use a service role key but never validate an admin session. Any visitor can request uploads or deletion attempts, creating abuse and storage-loss risk.
5. **Anonymous image uploads were deliberately enabled.** `scripts/20250715-allow-anon-upload-property-images.sql` grants uploads to the anonymous role. This can consume free storage, host unwanted content, and cause the very kind of quota failure now suspected.
6. **Contact form lacks abuse controls.** It calls a server action which sends email, but has no server-side input schema, rate limit, bot challenge, or output encoding. This permits spam, email-cost abuse, and HTML/email injection risk.

## High-priority reliability and quality findings

- The visitor experience depends on client-side data fetches. There is no friendly error state, retry button, cached catalogue, or fallback when Supabase is unavailable. Both listing components only log failures to the browser console.
- The main hero search is unfinished: it only logs filters to the browser (`components/hero-section.tsx:17`) and cannot find properties.
- Listing details are modals rather than shareable property pages. This weakens search visibility, individual campaign links, analytics, and lead attribution.
- Prices are modelled inconsistently: TypeScript says `number`, while the original SQL schema says `VARCHAR(50)`. Filters expose a price range but do not apply one.
- Property IDs were migrated from numeric to text, while the TypeScript model and dialog-state map still type them as numbers. This is a latent breakage risk.
- Images are unoptimised and use direct public URLs. The same external Vercel Blob hero image is used across pages and there is no responsive-image strategy, compression workflow, or image provenance control.
- SEO is incomplete: the Google verification placeholder remains in the metadata; there is no repository sitemap or robots implementation; property pages are not individual indexable URLs; open-graph imagery is tied to the failing Supabase storage bucket.
- No automated tests, error monitoring, uptime monitor, audit log, data export, backup schedule, or deployment configuration is included in the repository.
- Social links include placeholders and a link to an unrelated Facebook identity. The footer exposes the internal admin route under "Property Management".
- Next.js is `14.2.16`, build checks are deliberately bypassed, many package versions are `latest`, and the current audit reports 63 production dependency findings. Upgrade to a supported Next.js line, pin versions, add CI, and run type/lint checks on every release.

## UI and conversion recommendations

The current red-and-slate visual foundation is serviceable, but it is generic, heavy on gradients/shadows, and lacks trust cues expected for premium DHA real estate. The redesign should be editorial and property-led rather than component-led.

1. Use a premium, calm palette: charcoal, warm stone, restrained DHA red/gold accent; real licensed property photography; one consistent type family pairing.
2. Replace the non-working hero search with a practical search bar: purpose, property type, DHA phase, size, bedroom count, and budget. It must lead to visible results.
3. Create fast, shareable property detail pages with permanent URLs, image gallery, specifications, map/area reference, WhatsApp action, enquiry action, and clear "last updated" date.
4. Add a prominent mobile sticky action bar: Call, WhatsApp, Enquire. These are the highest-value lead paths for this audience.
5. Add trust material supplied and approved by the client: office photograph, agent/team profiles, verified testimonials, process explanation, and disclosure that pricing/availability requires confirmation.
6. Improve accessibility and quality: image alt text, keyboard-friendly gallery/dialogs, clear empty/error states, practical contrast, lightweight motion, and mobile performance budget.
7. Add analytics and search-console verification only after the client owns the accounts and privacy/cookie wording is approved.

## Recommended zero-recurring-cost architecture for normal brokerage traffic

### Recommendation: Cloudflare-first static catalogue with a protected staff workspace

```text
Visitors
  -> Cloudflare Pages (fast public website and property pages)
  -> Cloudflare Worker (protected form, search API, rate limits)
  -> D1 (small property and lead database) + R2 (optimised property images)
  -> Resend (inquiry notification) + WhatsApp click-to-chat

Staff
  -> protected admin login
  -> create/edit listings and images
  -> audit trail and downloadable backup
```

Why this is the best fit:

- It removes the single free Supabase dependency from the public page render.
- Static pages are fast globally and remain visible even if the management workspace has a temporary problem.
- Cloudflare's free Worker/D1/R2 allowances are far better aligned to a small local catalogue. As researched on 10 October 2026: D1 includes 5 million rows read/day, 100,000 rows written/day, and 5 GB storage; R2 includes 10 GB-month storage, 1 million writes, 10 million reads monthly, and no egress charge. Those are allowances, not unlimited promises.
- Use Cloudflare Turnstile on forms; its free plan includes unlimited challenges, suitable for typical production sites.
- Resend's free tier currently allows 3,000 transactional emails/month with a 100/day limit. It is appropriate for enquiries when rate-limited; it is not a bulk-marketing system.

### Important cost truth

There is no credible permanent "unlimited and zero-cost" backend, AI service, call agent, or domain. Every provider has a fair-use limit, can change its plan, and may require an account/payment method. The correct promise is: **no planned monthly platform charge for normal traffic, clear monitoring, a hard traffic/usage alert, and an approved paid fallback only if the business outgrows the free allowance.** Domain renewal remains a normal external recurring cost.

### Alternative choices

| Option | When it fits | Limitation |
| --- | --- | --- |
| Repair existing Supabase Free | Immediate temporary restoration | 1 GB files, 500 MB database, 5 GB egress, pause after one inactive week; does not solve the code security issues. |
| Supabase Pro | Client prefers the existing system and accepts a predictable fee | Starts at $25/month, still requires a secure rebuild. |
| Recommended Cloudflare migration | Client wants no planned recurring platform fee and a durable low-traffic architecture | Requires migration work, controlled account ownership, and a future paid fallback at high traffic. |

## AI and automation roadmap

### Safe, useful, zero-recurring-cost features to include in the rebuild

- Smart property finder: guided filters with plain-language chips such as "3-bed house in Phase 6 for rent". This is deterministic, fast, accurate to the catalogue, and should not be labelled AI.
- Bilingual guided enquiry: English/Urdu intake that asks only the information an agent needs, tags the lead, records consent, and sends it to WhatsApp/email.
- Lead routing: instant acknowledgement, staff notification, source/property attribution, follow-up status, and daily digest. Use fixed rules first.
- Listing quality assistant: browser-side checklists for missing photos, empty fields, duplicate IDs, image size, and required disclosures before publication.
- Price and affordability tools: mortgage/payment and area/unit calculators, clearly marked as estimates.

### AI pilot after the secure rebuild is stable

1. **Grounded website assistant** - answers only from approved listings and FAQ material, in English and Urdu; shows cited property cards; captures a lead or hands off to WhatsApp when uncertain. It must never invent availability, prices, legal advice, or investment returns.
2. **Staff drafting assistant** - drafts listing descriptions, social captions, enquiry summaries, and FAQ replies. A person must review before publication or sending.
3. **Lead summary and priority suggestion** - creates a concise staff-only summary; rules and human review remain the decision makers.
4. **Image support** - suggests alt text and flags poor-quality/duplicate photos; it does not create deceptive property imagery.

Cloudflare Workers AI presently offers 10,000 free neurons per day but rejects requests after the free allowance and some models require a paid plan. Google Gemini also provides a limited free developer tier, but its unpaid tier may use submitted content to improve Google products. Therefore, neither should be promised as an unlimited production service or used for sensitive lead data without a client-approved privacy position. The recommended chatbot design includes daily caps, Turnstile, per-visitor rate limits, a manual WhatsApp fallback, and a zero-spend/disable switch.

### Call agent recommendation

Do **not** include an autonomous calling agent in phase one. A real voice agent requires a telephone number/SIP provider plus speech/AI usage, consent and recording rules, testing, and human escalation; it cannot reliably be delivered with zero ongoing cost. Start with WhatsApp Business quick replies and a booking form. Reconsider a voice pilot only after real inquiry volume demonstrates value and the client approves a monthly usage budget and call script.

## Phased delivery plan

1. **Emergency safety and evidence**: client-owned accounts, export listings/images, inspect Supabase usage/logs, rotate exposed credentials, stop anonymous uploads, remove public admin path, and keep a rollback copy.
2. **Foundation**: upgrade framework/dependencies, establish real administrator login, protected server APIs, validation, Turnstile, rate limiting, backups, monitoring, and release checks.
3. **Catalogue and UI**: migrate data/images, build property URLs/search/detail pages, redesign mobile conversion paths, and validate every public page.
4. **Go-live and monitoring**: client acceptance, DNS/domain cut-over, 30-day error/usage monitoring, staff handover, and recovery runbook.
5. **AI pilot**: only after clean data and stable lead flow; start with a capped, read-only assistant and measure handoffs before expanding.

## Client communication position

The original custom site was delivered on the best low-cost stack suitable at the time. Free managed services deliberately have usage and inactivity limits; the original project fee covered the custom website work, not indefinite third-party infrastructure capacity, storage growth, domain renewal, or future AI/telephony usage. The proposed update protects the client's investment by replacing the fragile setup, strengthening security, and using a no-planned-monthly-cost operating model for normal usage. It must not be represented as unlimited or risk-free.

## Sources consulted

- Supabase pricing: https://supabase.com/pricing
- Cloudflare Workers and D1 pricing: https://developers.cloudflare.com/workers/platform/pricing/
- Cloudflare R2 pricing: https://developers.cloudflare.com/r2/pricing/
- Cloudflare Turnstile plans: https://developers.cloudflare.com/turnstile/plans/
- Resend pricing: https://resend.com/pricing
- Cloudflare Workers AI pricing: https://developers.cloudflare.com/workers-ai/platform/pricing/
- Gemini API pricing and terms: https://ai.google.dev/gemini-api/docs/pricing and https://ai.google.dev/gemini-api/terms
- Next.js support policy: https://nextjs.org/support-policy
