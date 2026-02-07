#!/bin/bash
# Message timing diagnostic logger
# Logs timestamps for incoming messages and responses

LOG_DIR="/Users/openclaw/.openclaw/workspace/logs"
mkdir -p "$LOG_DIR"
LOG_FILE="$LOG_DIR/message-timing.log"

# Function to log with timestamp
log_message() {
    local event="$1"
    local msg_id="$2"
    local channel="$3"
    local timestamp=$(date "+%Y-%m-%d %H:%M:%S.%3N %Z")
    local unix_time=$(date +%s.%N)
    
    echo "[$timestamp] [$unix_time] $event | msg_id=$msg_id | channel=$channel" >> "$LOG_FILE"
}

# Log this script startup
log_message "LOGGER_STARTUP" "N/A" "system"
echo "Message timing logger initialized"
echo "Log file: $LOG_FILE"
