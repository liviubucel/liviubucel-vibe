# Nordlys-Based Frontend — Corresponding Source

This archive accompanies the published Nordlys-derived client-side personal website.
It is provided in accordance with GPL-3.0-only.

- Upstream theme: https://github.com/FjellOverflow/nordlys
- Upstream author: FjellOverflow
- License: GPL-3.0-only (NORDLYS-LICENSE.md).
- Modified from Astro to a React Router application in a Wix Vibe Astro shell.
- Wix Blog, Wix Portfolio and Wix Forms are configured as native data sources.
- IBM Plex Sans: SIL OFL-1.1, see public/fonts/OFL-LICENSE.md.
- PhotoSwipe and its plugins: MIT, see src/vendor/photoswipe/LICENSE-*.txt.

## Rebuilding

Contains the React and Astro source, official Wix SDK integration, source assets,
project configuration, dependency manifest, and testing scripts. A Wix Vibe project
and corresponding installed Wix apps are required to access site-managed data.
Some private Wix managed dependencies are not served from the public npm registry.

No user account tokens, DNS credentials, API secrets or .env files are included.
The package excludes node_modules, caches and sensitive operational data.
