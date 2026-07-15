"use client";

import { motion, type Variants } from "framer-motion";

interface IconProps {
	label: string;
	icon: React.ReactNode;
}

const labelVariants: Variants = {
	hidden: { opacity: 0, y: -5 },
	visible: { opacity: 1, y: 0 },
};

export default function Icon({ label, icon }: IconProps) {
	return (
		<motion.div
			className="group relative flex h-14 w-16 cursor-pointer flex-col items-center justify-start"
			initial="hidden"
			whileHover="visible"
		>
			<div className="flex h-8 items-center justify-center transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-110">
				{icon}
			</div>

			<motion.div
				variants={labelVariants}
				transition={{ type: "spring", stiffness: 300, damping: 25 }}
				className="pointer-events-none absolute -bottom-1 text-xs text-neutral-300"
			>
				{label}
			</motion.div>
		</motion.div>
	);
}
