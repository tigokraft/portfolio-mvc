#!/usr/bin/env zsh
# watch-restart.sh – poor-man’s nodemon for ASP.NET MVC on macOS
set -euo pipefail

PROJECT_ROOT="${0:A:h}"
DOTNET_RUN=(dotnet run --project "$PROJECT_ROOT")
POLL_INTERVAL=0.5

# ── build once (use -q instead of --quiet) ──
echo "🔨  Building once…"
dotnet build -q -nologo        #  ← changed here

# ── rest of the file stays the same ──
typeset -F LAST_TS
LAST_TS=$(find "$PROJECT_ROOT" -type f -print0 | xargs -0 stat -f %m | sort -n | tail -n1)

trap 'kill %1 2>/dev/null' EXIT INT TERM

while true; do
    echo "🚀  Starting server…"
    "${DOTNET_RUN[@]}" & SERVER_PID=$!

    while kill -0 $SERVER_PID 2>/dev/null; do
        sleep $POLL_INTERVAL
        typeset -F NEW_TS
        NEW_TS=$(find "$PROJECT_ROOT" -type f -print0 | xargs -0 stat -f %m | sort -n | tail -n1)
        if (( $(echo "$NEW_TS > $LAST_TS" | bc -l) )); then
            LAST_TS=$NEW_TS
            echo "📝  File changed – restarting…"
            break
        fi
    done

    kill $SERVER_PID 2>/dev/null || true
    wait   $SERVER_PID 2>/dev/null || true
done