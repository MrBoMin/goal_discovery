import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Find Your Path - Discover Your True Career Direction",
  description:
    "Feeling stuck or unclear about your career goals? Through 12 strategic self-reflection questions, discover your strengths, values, and the career path that truly aligns with who you are. Free AI-powered career clarity tool.",
  keywords: [
    "career clarity",
    "career direction",
    "career assessment",
    "find your path",
    "career coach",
    "self-reflection",
    "career change",
    "professional development",
  ],
  authors: [{ name: "Find Your Path" }],
  openGraph: {
    title: "Find Your Path - Discover Your True Career Direction",
    description:
      "Free AI-powered tool to help you discover career clarity through strategic self-reflection questions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
