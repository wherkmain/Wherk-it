#!/bin/bash
# Log when response is sent

LOG_FILE="/Users/openclaw/.openclaw/workspace/logs/message-timing.log"

echo "[$(date "+%Y-%m-%d %H:%M:%S.%3N %Z")] [$(date +%s.%N)] RESPONSE_SENT | msg_id=$1 | to=$2" >> "$LOG_FILE"
echo "Logged: Response to $1 sent at $(date "+%H:%M:%S")"
