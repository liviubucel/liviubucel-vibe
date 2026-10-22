# Identity-focused redesign QA — Liviu Bucel

Design source of truth: existing public personal site at https://www.liviubucel.com/
Design-system reference: official Mozilla Protocol 22.0.0, https://protocol.mozilla.org/
Implementation scope: native Wix Vibe site (GitHub project liviubucel/liviubucel-vibe).

## Why the first Wix page was rejected (visually observed)
- Public Wix staging showed a full-width orange-accented agency/marketing hero with a reddish avatar and generic horizontal sections.
- Original personal site instead has a subtle dark grid background, compact personal Bento Grid, monochrome memoji, and identifiable modules arranged around personal introduction.
- Protocol CSS present in Git by itself does not prove deployed design-system fidelity; first Wix public build did not include that CSS bundle.

## Current isolated design experiment
- Preserve the user's actual introduction (Hello, I'm Liviu Bucel), skill areas, social profile links, personal motto, original monochrome avatar, and distinct module navigation.
- Compact Bento composition uses Mozilla Protocol typography and component styling, avoiding Mozilla/Firefox trademarks and false affiliation.
- Visible panels for About, Credentials, Time Zones, Projects, Experience, Contact, Blog, Design Works, Support and native Wix Forms newsletter.
- Native business apps remain the source of truth: Wix Blog for posts, Wix Portfolio for projects, Wix Forms for contact and signups. Only custom/unsupported data uses Wix CMS.
- Credentials use the records and truthful statuses already stored in Wix CMS: OWASP Member (earned), CCNA (planned), CompTIA Security+ (in progress).
- The user's original media logos do not automatically prove editorial features. Do not add unsupported media claims.
- Live personal domain, existing Cloudflare and original GitHub repo stay unchanged.

## QA
- 20/20 migration static-contract tests pass.
- esbuild parses modified TSX; git diff --check passes.
- Desktop visual review performed on a local static HTML/CSS approximation in Chrome.
- Mobile-width screenshot reviewed; actual React navigation must still be tested against Wix runtime.
- Static browser mock is a layout verification tool only; it does not prove live Wix Blog/Portfolio/Forms integrations or a successful Wix build.

## Blockers before merging or publishing
1. Wix Vibe preview and deployment have been reporting technical errors. Confirm actual Wix backend full build and deployed bundle.
2. End-to-end verify native Blog/Portfolio/Forms on Wix staging domain.
3. Check complete visual consistency of other pages under Mozilla Protocol, desktop/mobile keyboard accessibility and contrast.
4. Ensure original route coverage, verified content, redirections/canonicals and live threat feed before any liviubucel.com cutover.
5. Resolve or account for GitHub-reported dependency vulnerabilities.

No production deployment is authorised by this branch alone.
