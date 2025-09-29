#!/bin/zsh

# Get the directory where this script is located (project root)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR" || exit 1

# Command to run your server
DOTNET_CMD=(dotnet run)

# Kill existing server on exit
cleanup() {
    echo "Stopping server..."
    kill $SERVER_PID 2>/dev/null
    exit 0
}
trap cleanup SIGINT SIGTERM

# Start the server
start_server() {
    echo "Starting server..."
    "${DOTNET_CMD[@]}" &
    SERVER_PID=$!
    echo "Server running with PID $SERVER_PID"
}

# Watch for file changes and restart when needed (macOS with fswatch)
watch_and_restart() {
    fswatch -o -r --exclude '\.git|bin|obj' . | while read; do
        echo "Change detected, restarting server..."
        kill $SERVER_PID 2>/dev/null
        start_server
    done
}

start_server
watch_and_restart
