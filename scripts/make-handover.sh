#!/usr/bin/env bash
# Produce a clean HANDOVER copy of the project — the public site + working lead
# collection + the token-protected /leads viewer, WITHOUT the professional CMS
# (admin editor) source. Use this when the client gets the source code itself;
# if you only deploy the running site for them, just deploy with ENABLE_CMS
# unset and you don't need this script.
#
#   bash scripts/make-handover.sh [DEST]      # default DEST: ../rudn-handover
#
# Then, in DEST:  npm install && cp .env.example .env (fill it) && npm run build && npm start
set -euo pipefail
cd "$(dirname "$0")/.."

DEST="${1:-../rudn-handover}"

rm -rf "$DEST"
mkdir -p "$DEST"

# Export only tracked files (no node_modules / .next / .env / git history).
git archive --format=tar HEAD | tar -x -C "$DEST"

# Remove the CMS so the editor cannot be exposed in the handover. (Helper libs
# like src/lib/auth.ts are left in place: nothing imports them once the admin is
# gone, so they are inert — removing them would only risk a dangling import.)
rm -rf \
  "$DEST/src/app/admin" \
  "$DEST/src/components/admin" \
  "$DEST/src/app/api/auth" \
  "$DEST/src/app/api/media"

echo "✓ Handover copy created at: $DEST"
echo "  CMS source removed. Public site + lead collection + /leads remain."
echo ""
echo "  Next steps in $DEST:"
echo "    npm install"
echo "    cp .env.example .env   # set DATABASE_URL, LEADS_TOKEN, SMTP_* etc."
echo "    npx prisma db push && npm run db:seed"
echo "    npm run build && npm start"
