# Variant User Monitoring System

## Overview
**Purpose:** Monitor BlueHost database for new user signups and send email alerts  
**Frequency:** Every 30 minutes  
**Location:** Hostinger VPS (72.62.81.176)  
**Alert Email:** lee@wherk.com

## Architecture
```
BlueHost DB (162.241.253.54)
    ↓ (queried every 30 min)
Hostinger VPS (72.62.81.176)
    ↓ (if new users found)
Email Alert → lee@wherk.com
    ↓
Log Entry → /opt/metabase/user_alerts.log
```

## Configuration

### Database Connection
- **Host:** 162.241.253.54 (BlueHost)
- **Database:** abycicmy_variant
- **Table:** users
- **Check:** Users created in last 3 hours

### Monitor Script
**Location:** `/opt/metabase/monitor_with_email.sh`

**What it does:**
1. Queries `users` table for records with `created_at` in last 3 hours
2. If new users found, sends email alert with details
3. Logs activity to `/opt/metabase/user_alerts.log`

### Cron Schedule
```
*/30 * * * * /opt/metabase/monitor_with_email.sh >> /opt/metabase/cron.log 2>&1
```

Runs at: :00 and :30 of every hour

## Email Alert Format
```
Subject: Alert: X New User(s) in Last 3 Hours - Variant

New user registrations detected:
[id] [email] [first_name] [last_name] [company] [created_at]

---
Time: [timestamp]
Dashboard: https://reports.wherk.ai
```

## Management Commands

### SSH into Monitor Server
```bash
ssh root@72.62.81.176
```

### Check Monitor Logs
```bash
cat /opt/metabase/user_alerts.log
cat /opt/metabase/cron.log
```

### Test Monitor Script
```bash
/opt/metabase/monitor_with_email.sh
```

### Edit Check Interval
```bash
crontab -e
# Change */30 to desired minutes (e.g., */15 for 15 min)
```

### Change Alert Email
Edit `/opt/metabase/monitor_with_email.sh`:
```bash
ALERT_EMAIL="your-email@example.com"
```

## Troubleshooting

### Check if Cron is Running
```bash
systemctl status cron
```

### View Last Cron Output
```bash
tail -20 /opt/metabase/cron.log
```

### Test Database Connection
```bash
mysql -h 162.241.253.54 -u abycicmy_clawdeaccess -p abycicmy_variant -e "SELECT COUNT(*) FROM users;"
```

### Manual Email Test
```bash
echo "Test message" | mail -s "Test Subject" lee@wherk.com
```

## Files
- **Monitor Script:** `/opt/metabase/monitor_with_email.sh`
- **Log File:** `/opt/metabase/user_alerts.log`
- **Cron Log:** `/opt/metabase/cron.log`
- **Last Alert:** `/opt/metabase/.last_alert_time`

## Future Enhancements
- [ ] Add Telegram alerts in addition to email
- [ ] Include user statistics (total users, growth rate)
- [ ] Add second table monitoring (interests, etc.)
- [ ] Create Metabase dashboard widget for alert history
- [ ] Add SMS alerts for critical thresholds

---
*Setup Date: 2026-02-07*  
*Status: ✅ Active*  
*Next Check: Every 30 minutes*
