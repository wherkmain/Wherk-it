#!/bin/bash
# Quick timestamp test - call this when message arrives

LOG_FILE="/Users/openclaw/.openclaw/workspace/logs/message-timing.log"

echo "[$(date "+%Y-%m-%d %H:%M:%S.%3N %Z")] [$(date +%s.%N)] MSG_RECEIVED | msg_id=$1 | from=$2" >> "$LOG_FILE"
echo "Logged: Message $1 received from $2 at $(date "+%H:%M:%S")"
