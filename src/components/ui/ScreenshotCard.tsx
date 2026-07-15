"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp } from "../../lib/animations";

interface ScreenshotCardProps {
	src: string;
	alt: string;
	viewportAmount?: number;
}

export default function ScreenshotCard({
	src,
	alt,
	viewportAmount = 0.25,
}: ScreenshotCardProps) {
	return (
		<motion.div
			className="relative z-20 cursor-pointer overflow-hidden rounded-lg bg-[#10131a]"
			variants={fadeUp}
			initial="initial"
			whileInView="visible"
			viewport={{ once: true, amount: viewportAmount }}
		>
			<Image
				src={src}
				alt={alt}
				width={1200}
				height={900}
				className="h-auto w-full object-cover"
			/>
		</motion.div>
	);
}
