# Wherk It - YouTube Video Processor

Extract transcripts and metadata from YouTube videos.

## Deploy to Railway

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo>
git push -u origin main
```

### 2. Deploy on Railway
1. Go to https://railway.app and create new project
2. Select "Deploy from GitHub repo"
3. Choose this repository
4. Add environment variables in Railway dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `OPENAI_API_KEY` (optional, for Whisper transcription fallback)

### 3. Alternative: Deploy with Railway CLI
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes |
| `OPENAI_API_KEY` | For Whisper audio transcription fallback | No |

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000
