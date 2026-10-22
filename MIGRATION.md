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
- New Wix CMS romaniaCyberIncidents collection created with restricted editorial writes. It is currently EMPTY pending Cloudflare D1 source migration.

## Git branch source changes
- Real source identity, verified social/email links, portrait from Wix Media, bilingual EN/RO links and navigation.
- Source-accurate About page without invented media mentions or employment history.
- Wix CMS-powered home page listing projects/posts and consent-based newsletter data capture.
- Contact page with real email, verified social accounts and CV request by email rather than an insecure public file.
- Bilingual React Router routes for original core pages and Cyber Monitor.
- Blog links preserve real original slugs and original item metadata.
- New native Wix CMS Cyber Monitor reader with incident categories and verification status; DOES NOT migrate D1 ingestion yet.

## Unfinished and not safe for production cutover
1. Export/sanitise/import Cloudflare D1 incident records and source evidence; replace scheduled ingestion/Queues/cron only after tested alternative.
2. Preserve all article rich text, images, inline links, original SEO tags, hreflang and EN/RO translation accuracy; current articles are imported as full plain text only.
3. Build native equivalents for all remaining source URLs: design-works, travel, playground, RSS, llms.txt, SEO redirects.
4. Secure native CV request/delivery system; email-based request is a temporary safe function, not a full migration of the signed-token CV backend.
5. Actually set up newsletter confirmation, email delivery and unsubscribe/automation; storing signups is not enough.
6. Test Wix Vibe rendering, Media Manager processing, full SEO, accessibility, mobile responsiveness, error paths and abuse limits.
7. Production build/release through Wix's official site tool and full preview parity audit.
8. Only after acceptance switch liviubucel.com DNS, stop old live infrastructure and clean up the old GitHub repo.

## Local testing outcome
npm install failed because a Vibe-internal package @wix/locale-dataset-javascript was not available from the public npm registry. This is a dependency-environment blocker. An esbuild parser successfully parsed the changed TSX and TS files but emitted a warning that the full Astro tsconfig was unavailable. NO successful full build, production deployment or complete migration should be claimed.
