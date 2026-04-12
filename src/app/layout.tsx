import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
	variable: "--font-inter-sans",
	subsets: ["latin"],
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
		<html lang="en" className={`${inter.variable} h-full antialiased`}>
			<head>
				<link
					rel="stylesheet"
					type="text/css"
					href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
				/>
			</head>
			<body className="min-h-full flex flex-col">{children}</body>
		</html>
	);
}
