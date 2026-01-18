#!/bin/bash
echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"
if [[ "$VERCEL_GIT_COMMIT_REF" == "main" || "$VERCEL_GIT_COMMIT_REF" == "dev" ]]; then
  echo "✅ - Build permitido"
  exit 1
else
  echo "🛑 - Build ignorado"
  exit 0
fi
