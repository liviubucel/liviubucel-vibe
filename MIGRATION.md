# LiviuBucel.com → Wix Vibe migration ledger

Date: 2026-10-22
Source: https://github.com/liviubucel/liviubucel (Astro 7, Sanity, Cloudflare)
Destination: https://github.com/liviubucel/liviubucel-vibe (Wix Vibe Astro 5, React)
Wix site ID: 052c11d8-b2bb-4c1f-9436-5b8ec599f358 (CyberSphere)
Workflow: isolated migration branch and PR. Preserve the original repository, production website and DNS until every required function passes.

## Verified content/permissions changes in Wix
- Public source Sanity records backed up outside both Git repositories.
- 8 real published blog posts including the entire plain-text body and original slugs/dates imported into Wix CMS articoleblog.
- 2 real Sanity projects and 2 additional verified public GitHub projects imported into Wix CMS proiecte (4 genuine projects).
- 3 Sanity certification records imported into Wix CMS acreditari, preserving earned / planned / in-progress information.
- 18 fake Wix Vibe seed rows removed (6 projects, 5 blog posts, 4 credentials, 3 fake employment entries) after isolated backup.
- Restricted 5 CMS collections' update/removal access; newsletter PII read is PRIVILEGED. Newsletter public insert requires further antispam controls.
- 26 original project images accepted by Wix Media Manager; initial processing status PENDING.
- Wix CMS romaniaCyberIncidents created with restricted editorial writes. Imported 73/73 published Cloudflare D1 incidents into this native CMS; all 73 were unverified ransomware-group claims, never confirmed breaches. Imported Ransomware.live upstream feed name/homepage from original D1 source registry as attribution (source homepage is NOT individual incident verification). The D1 ingestion pipeline and source tables remain to migrate.

## Git branch source changes
- Real source identity, verified social/email links, portrait from Wix Media, bilingual EN/RO links and navigation.
- Source-accurate About page without invented media mentions or employment history.
- Wix CMS-powered home page listing projects/posts and consent-based newsletter data capture.
- Contact page with real email, verified social accounts and CV request by email rather than an insecure public file.
- Bilingual React Router routes for original core pages and Cyber Monitor.
- Blog links preserve real original slugs and original item metadata.
- New native Wix CMS Cyber Monitor reader with incident categories, verification status and source-feed attribution. Reads the 73 imported published incident records; DOES NOT migrate D1 cron/ingestion yet.

## Unfinished and not safe for production cutover
1. Verify and migrate complete Cloudflare D1 incident-source evidence metadata/source-reference relations, sync audit logs and all scheduled ingestion/Queues/cron, only after tested native alternatives. The 73 publicly published incidents and upstream Ransomware.live attribution HAVE BEEN MIGRATED.
2. Preserve all article rich text, images, inline links, original SEO tags, hreflang and EN/RO translation accuracy; current articles are imported as full plain text only.
3. Build native equivalents for all remaining source URLs: design-works, travel, playground, RSS, llms.txt, SEO redirects.
4. Secure native CV request/delivery system; email-based request is a temporary safe function, not a full migration of the signed-token CV backend.
5. Actually set up newsletter confirmation, email delivery and unsubscribe/automation; storing signups is not enough.
6. Test Wix Vibe rendering, Media Manager processing, full SEO, accessibility, mobile responsiveness, error paths and abuse limits.
7. Production build/release through Wix's official site tool and full preview parity audit.
8. Only after acceptance switch liviubucel.com DNS, stop old live infrastructure and clean up the old GitHub repo.

## Local testing outcome
npm install failed because a Vibe-internal package @wix/locale-dataset-javascript was not available from the public npm registry. This is a dependency-environment blocker. An esbuild parser successfully parsed the changed TSX and TS files but emitted a warning that the full Astro tsconfig was unavailable. NO successful full build, production deployment or complete migration should be claimed.

## Phase 2 — Mozilla Protocol / Wix native apps (2026-10-22)

### Source-backed and confirmed in Wix apps
- Installed first-party Wix Blog, Wix Forms (New) and Wix Portfolio on the same Wix Vibe CyberSphere site; original external domain left untouched.
- Created native blog member "Liviu Bucel" and imported 8/8 original published Sanity posts as actual Wix Blog posts with Ricos paragraphs/headings and original dates; 6 Romanian, 2 English according to article text. Wix Blog rich-content API confirmed 92 nodes for one representative imported post.
- Created native "Liviu Bucel — Contact" Wix Forms form: ID 350bbd87-09af-4295-9dbc-7e9cab1123bb; its four contact fields were read back with required validation and Wix Contacts mappings.
- Created native "Liviu Bucel — Security Updates" Wix Forms form: ID e85c654a-1a61-44dd-beb7-54868f6c7014; email and consent required, mapped to Wix Contacts email subscriptions. Form submission capture is not the same as working mailing-list double opt-in/delivery/unsubscribe.
- Installed first-party Wix Portfolio and migrated 4 verified project records to official Wix Portfolio. Deleted six obvious autogenerated sample photography projects; native project list now contains only genuine technical work.
- Site business-facing display name updated to Liviu Bucel; no live-domain change.
- Native CMS legacy copies remain as temporary backups; site page UI now uses native Wix Blog, Forms and Portfolio. Native CMS remains the correct data store for specialised Cyber Monitor incident records, certifications and other custom data.

### Official Mozilla Protocol theme
- Vendored official @mozilla-protocol/core v22.0.0 release CSS plus Protocol component CSS and full MPL 2.0 license, preserving upstream copyright. Mozilla fonts and supporting imagery load from the original public npm release via CDN (no font binaries committed).
- Custom monochrome Liviu Bucel identity styles layer on top; no Mozilla/Firefox logo or claim of affiliation.
- Rebuilt responsive header/footer, homepage, About, Blog list/article, Projects list/detail, Contact, Experience, Credentials, Privacy, and Romania Cyber Monitor on Protocol layouts/classes, not merely color substitutions.
- Original source placeholder URLs /design-works, /travel and /playground restored, with only the source-backed "coming soon" behaviour.
- Native Wix Blog SDK is the article source, Wix Portfolio SDK/server public projection the project source, Wix Forms SDK the contact/updates submission destination.
- Bilingual URL paths remain, but source content does NOT have 1:1 editorial translations; original article language is preserved rather than fictitious AI translations.

### Validation and outstanding acceptance
- 20 cross-app Protocol/native source contracts verified with scripts/migration-audit.mjs; esbuild TSX/TS syntax parser passed. Full Vibe Astro production bundle must still pass Wix-controlled build.
- Need browse published preview on desktop and mobile; verify SDK authorization for Wix Portfolio public read (server-side elevation included), Blog rendering and Forms submission.
- Need verify Wix-native email automations and confirmation/unsubscribe before newsletter delivery. Full automated threat feed ingestion is not yet migrated, only 73 published incident records.
- SEO redirect validation for 2 long blog slugs, canonical metadata, full sitemap, accessibility/security headers, and domain cutover are not signed off.
- Original liviubucel.com live production, Cloudflare Workers, Sanity, original GitHub repository and DNS remain untouched.

## Wix Vibe runtime import fix (2026-10-22)
- Captured exact HTTP 500 from the authenticated remote Vite server: Failed to resolve import @wix/portfolio from src/lib/wix-portfolio.ts. This 500 also made Router.tsx fail to hydrate.
- Removed the missing static SDK import and the dependent backend API route.
- **Temporary read-only bridge** reads the already imported legacy CMS mirror for project cards while the actual Wix Portfolio app remains installed with all four real projects.
- Editing Portfolio entries alone does not instantly update the temporary CMS reader. The live native SDK integration remains an acceptance requirement before retiring CMS mirrors.
- No change to Wix Blog or Wix Forms native app flows, original site, DNS or production hosting.
