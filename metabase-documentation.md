# Variant Metabase Portal - Complete Documentation

## Overview
**Name:** Variant Metabase Portal  
**URL:** https://reports.wherk.ai  
**Purpose:** Business Intelligence Dashboard for Variant

## Hosting Details
- **Provider:** Hostinger International Limited
- **VPS Hostname:** srv1207590
- **IP Address:** 72.62.81.176
- **Location:** Boston, Massachusetts
- **SSH Access:** root@72.62.81.176 (credentials in .env)

## Architecture

### Application Stack
- **Metabase Version:** v0.57.6 (e9e9771)
- **Java Version:** OpenJDK 21.0.9
- **Deployment:** Docker Compose
- **Container Port:** 3000
- **External Access:** Nginx reverse proxy with SSL

### Infrastructure
```
Internet → Nginx (443) → Docker (3000) → Metabase Container
                ↓
        Let's Encrypt SSL (Certbot)
```

## Configuration Files

### Docker Compose (`/opt/metabase/docker-compose.yml`)
```yaml
version: '3.8'

services:
  metabase:
    image: metabase/metabase:latest
    container_name: metabase
    restart: unless-stopped
    ports:
      - "3000:3000"
    volumes:
      - metabase-data:/metabase-data
    environment:
      - MB_DB_FILE=/metabase-data/metabase.db
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 60s

volumes:
  metabase-data:
    driver: local
```

### Nginx Config (`/etc/nginx/sites-enabled/reports.wherk.ai`)
- Reverse proxy to localhost:3000
- SSL via Let's Encrypt (Certbot)
- HTTP/2 and WebSocket support

## Access Credentials
- **Username:** lee@wherk.com
- **Password:** v&mIFYDMu7-D (stored in .env)

## Database
- **Type:** H2 (embedded file database)
- **Location:** `/metabase-data/metabase.db` (Docker volume)
- **⚠️ Warning:** H2 is NOT recommended for production. Consider migrating to PostgreSQL or MySQL.

## Known Dashboards
- **Dashboard ID:** 2-variant
- **Current Tab:** 4-tab-1

## Backup Strategy

### Critical Files to Backup
1. **Metabase Data:** Docker volume `metabase-data`
2. **Docker Compose:** `/opt/metabase/docker-compose.yml`
3. **Nginx Config:** `/etc/nginx/sites-enabled/reports.wherk.ai`
4. **SSL Certs:** `/etc/letsencrypt/live/reports.wherk.ai/`

### Backup Commands
```bash
# Backup Metabase data volume
docker run --rm -v metabase_metabase-data:/source -v /backup:/backup alpine tar czf /backup/metabase-data-$(date +%Y%m%d).tar.gz -C /source .

# Backup configuration files
tar czf /backup/metabase-config-$(date +%Y%m%d).tar.gz /opt/metabase /etc/nginx/sites-enabled/reports.wherk.ai /etc/letsencrypt/live/reports.wherk.ai/
```

## Maintenance Commands

```bash
# SSH into server
ssh root@72.62.81.176

# View Metabase logs
docker logs metabase -f

# Restart Metabase
docker-compose -f /opt/metabase/docker-compose.yml restart

# Check Metabase health
curl http://localhost:3000/api/health

# Update Metabase to latest
docker-compose -f /opt/metabase/docker-compose.yml pull
docker-compose -f /opt/metabase/docker-compose.yml up -d
```

## Security Notes
- SSL enabled via Let's Encrypt
- Credentials encryption: DISABLED (see warning in logs)
- H2 database used (not recommended for production)

## TODO / Recommendations
1. [ ] Migrate from H2 to PostgreSQL for production use
2. [ ] Enable Metabase encryption for credentials at rest
3. [ ] Set up automated backups (daily)
4. [ ] Document connected data sources
5. [ ] Create disaster recovery runbook

---
*Documentation Last Updated: 2026-02-07*  
*Metabase Version: v0.57.6*
