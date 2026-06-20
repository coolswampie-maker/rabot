#!/usr/bin/env bash
# Build a fully static version of the site into ./out (no server/DB/admin).
# Temporarily removes the server-only parts (admin, API routes, dynamic OG
# image), runs `next build` with STATIC_EXPORT=1, then restores everything.
#
# The local Postgres must be running during the build (content is baked in):
#   node scripts/dev-db.mjs &   # if not already running
#   bash scripts/build-static.sh
set -euo pipefail
export PATH="$HOME/.local/node/bin:$PATH"
cd "$(dirname "$0")/.."

STASH=".static-stash"
ITEMS=(
  "src/app/admin"
  "src/app/api"
  "src/components/admin"
  "src/app/[locale]/opengraph-image.tsx"
)

mkdir -p "$STASH"
restore() {
  local i=0
  for item in "${ITEMS[@]}"; do
    if [ -e "$STASH/$i" ]; then
      mkdir -p "$(dirname "$item")"
      mv "$STASH/$i" "$item"
    fi
    i=$((i + 1))
  done
  rmdir "$STASH" 2>/dev/null || true
}
trap restore EXIT

i=0
for item in "${ITEMS[@]}"; do
  [ -e "$item" ] && mv "$item" "$STASH/$i" || true
  i=$((i + 1))
done

rm -rf out .next
STATIC_EXPORT=1 NEXT_PUBLIC_STATIC=1 npx prisma generate >/dev/null
STATIC_EXPORT=1 NEXT_PUBLIC_STATIC=1 npx next build

# GitHub Pages: keep the custom domain and serve the _next/ folder (Jekyll skips _dirs).
touch out/.nojekyll
[ -f CNAME ] && cp CNAME out/CNAME || true

echo ""
echo "✓ Static site generated in ./out  —  deploy this folder to Cloudflare Pages / GitHub Pages / any static host."
