#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
out=public/nordlys-source.zip
rm -f "$out"
zip -q -r "$out" \
  src integrations scripts public package.json package-lock.json tsconfig.json \
  astro.config.mjs postcss.config.mjs tailwind.config.mjs \
  eslint.config.ts vitest.config.ts vitest.setup.ts \
  vite-error-overlay-plugin.js \
  NORDLYS-LICENSE.md NORDLYS-ATTRIBUTION.md NORDLYS-SOURCE-README.md \
  -x "public/nordlys-source.zip" "*/node_modules/*" "*/.cache/*" \
     "*/.env*" "*/.git/*" "*/.wix/*" "*/.DS_Store"
unzip -t "$out" | tail -1
printf 'Corresponding source: %s (%s bytes)\n' "$out" "$(stat -c %s "$out")"
