"use client";

import { motion } from "framer-motion";

interface IconProps {
	label: string;
	icon: React.ReactNode;
	color: string;
}

export default function Icon({ label, icon, color }: IconProps) {
	return (
		<motion.div
			className="flex flex-col items-center justify-start cursor-pointer group relative h-14 w-16"
			style={{ "--hover-color": color } as React.CSSProperties}
			initial="hidden"
			whileHover="visible"
		>
			<div className="h-8 flex items-center justify-center text-neutral-500 grayscale opacity-70 transition-all duration-500 ease-out group-hover:text-[var(--hover-color)] group-hover:grayscale-0 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:scale-110">
				{icon}
			</div>

			<motion.div
				variants={{
					hidden: { opacity: 0, y: -5 },
					visible: { opacity: 1, y: 0 },
				}}
				transition={{ type: "spring", stiffness: 300, damping: 25 }}
				className="absolute -bottom-1 text-xs text-neutral-300 pointer-events-none"
			>
				{label}
			</motion.div>
		</motion.div>
	);
}
