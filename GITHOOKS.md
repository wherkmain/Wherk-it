# Git Hooks - Secret Detection

This repository uses pre-commit hooks to prevent accidentally committing secrets, API keys, and credentials.

## What's Protected

### Blocked Files
- `.env` files (all variants)
- `credentials.env`
- `secrets.json`, `secrets.yaml`, `secrets.yml`
- SSH private keys
- AWS credentials

### Detected Patterns
- OpenAI API keys (`sk-...`)
- GitHub tokens (`ghp_...`, `gho_...`, `ghu_...`, `ghs_...`)
- Stripe keys (`sk_live_...`, `sk_test_...`)
- Slack tokens (`xoxb-...`, `xoxa-...`)
- SendGrid API keys (`SG.***`)
- AWS Access Keys (`AKIA...`)
- JWT tokens
- Database URLs with embedded passwords
- Private keys (RSA, DSA, EC, OpenSSH)
- Generic patterns: `password`, `api_key`, `token`, `secret` with values

## Installation

### Automatic (already done)
The hook is automatically installed when you clone/pull this repo.

### Manual
```bash
cp .githooks/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

## Testing

Try to commit a file with a fake secret:
```bash
echo "API_KEY=sk-test1234567890abcdef" > test.txt
git add test.txt
git commit -m "test"
```

You should see:
```
🛑 COMMIT BLOCKED!
Potential secrets or credential files detected.
```

## Bypass (Not Recommended)

In emergencies only:
```bash
git commit --no-verify -m "your message"
```

## Troubleshooting

### False Positives
If the hook blocks legitimate code:
1. Check if you're accidentally including real secrets
2. Move secrets to environment variables
3. Add files to `.gitignore` if they shouldn't be tracked

### Hook Not Running
```bash
# Check if hook is executable
ls -la .git/hooks/pre-commit

# Reinstall
cp .githooks/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

## For New Repositories

Copy the `.githooks/` directory and this `GITHOOKS.md` to any new repo:
```bash
cp -r .githooks /path/to/new/repo/
cp .githooks/pre-commit /path/to/new/repo/.git/hooks/
chmod +x /path/to/new/repo/.git/hooks/pre-commit
```

---
**Never commit secrets. Use environment variables or secret managers.**
