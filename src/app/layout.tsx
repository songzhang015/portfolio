import type { Metadata } from "next";
import { Geist, Italianno } from "next/font/google";
import SmoothScroll from "../components/others/SmoothScroll";
import "./globals.css";

/* Variable font - the whole 400-700 range is available, so regular (400),
   medium (500) and bold (700) all resolve from this single face */
const geist = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
	weight: ["400", "500", "700"],
});

/* Display face, used only for the SZ monogram in the header */
const italianno = Italianno({
	variable: "--font-italianno-display",
	subsets: ["latin"],
	weight: "400",
});

export const metadata: Metadata = {
	title: "Song Zhang",
	description: "Portfolio Website - Song Zhang",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${geist.variable} ${italianno.variable} h-full antialiased`}
		>
			<head>
				<link
					rel="stylesheet"
					type="text/css"
					href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
				/>
			</head>
			<body className="min-h-full flex flex-col">
				<SmoothScroll>{children}</SmoothScroll>
			</body>
		</html>
	);
}
