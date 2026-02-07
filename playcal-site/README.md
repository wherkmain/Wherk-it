# Play-Cal Website

The marketing website for Play-Cal - the playdate scheduling app.

## Built With

- Next.js 16
- TypeScript
- Tailwind CSS
- Static Export

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build for Production

```bash
npm run build
```

Static files are output to `/dist` folder.

## Deploy to Vercel

1. Push to GitHub
2. Import to Vercel
3. Build settings are auto-detected
4. Deploy!

## Environment Variables

None required for static site.

## Formspree Setup

1. Create account at [formspree.io](https://formspree.io)
2. Create new form
3. Copy form endpoint URL
4. Replace `YOUR_FORM_ID` in `app/components/WaitlistForm.tsx`

## File Structure

```
app/
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── PhoneMockup.tsx
│   ├── FeatureCard.tsx
│   ├── StepCard.tsx
│   ├── TestimonialCard.tsx
│   └── WaitlistForm.tsx
├── page.tsx (homepage)
├── layout.tsx
└── globals.css
```

## Colors

- Primary Purple: `#7C3AED`
- Primary Dark: `#5B21B6`
- Accent Teal: `#14B8A6`
- Soft Lavender: `#E9D5FF`
