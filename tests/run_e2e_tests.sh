#!/usr/bin/env bash
# ==============================================================================
# JC Apex Ventures  -  Master E2E Test Suite Runner
# Executes all 4 tiers of E2E opaque-box tests covering R1-R10
# ==============================================================================

set -o pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Verify node runtime
if ! command -v node >/dev/null 2>&1; then
  echo "Error: Node.js runtime not found in PATH." >&2
  exit 127
fi

# Run the Node.js test runner
node "$SCRIPT_DIR/runner.mjs" "$@"
EXIT_CODE=$?

exit $EXIT_CODE
