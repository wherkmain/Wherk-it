import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Play-Cal: The Playdate Scheduling App That Ends Texting Chaos",
  description: "Stop the back-and-forth. Play-Cal makes scheduling playdates effortless with availability-based booking, party invitation sync, and co-parent coordination. Join the waitlist for early access.",
  keywords: "playdate scheduling app, playdate app, family calendar app, co-parent scheduling, party invitation tracker, kids activity planner",
  openGraph: {
    title: "Play-Cal - The Playdate & Family Calendar App",
    description: "Schedule playdates without the texting. Track party invitations. Sync with co-parents.",
    type: "website",
    url: "https://play-cal.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
