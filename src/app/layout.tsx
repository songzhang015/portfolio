import type { Metadata } from "next";
import { Fredoka, Onest } from "next/font/google";
import "./globals.css";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  display: "swap",
});
const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: "700",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Song Zhang",
  description:
    "Song Zhang — Computer Science student at the University of Oregon, building frontend experiences, backend systems, and AI integrations.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${onest.variable} ${fredoka.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
