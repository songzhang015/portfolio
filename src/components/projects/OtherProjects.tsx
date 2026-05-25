"use client";

import Image from "next/image";
import { motion, type PanInfo } from "framer-motion";
import { useState } from "react";

interface OtherProject {
	title: string;
	image: string;
}

const otherProjects: OtherProject[] = [
	{ title: "Placeholder 1", image: "/coffee_companion.png" },
	{ title: "Placeholder 2", image: "/coffee_companion.png" },
	{ title: "Placeholder 3", image: "/coffee_companion.png" },
];

const getWrappedIndex = (index: number): number => {
	return (index + otherProjects.length) % otherProjects.length;
};

const getSlideOffset = (index: number, activeIndex: number): number => {
	const rawOffset = index - activeIndex;
	const midpoint = otherProjects.length / 2;

	if (rawOffset > midpoint) return rawOffset - otherProjects.length;
	if (rawOffset < -midpoint) return rawOffset + otherProjects.length;

	return rawOffset;
};

export default function OtherProjects() {
	const [activeIndex, setActiveIndex] = useState(0);

	const moveToSlide = (direction: number): void => {
		setActiveIndex((currentIndex) => getWrappedIndex(currentIndex + direction));
	};

	const handleDragEnd = (
		_event: MouseEvent | TouchEvent | PointerEvent,
		info: PanInfo,
	): void => {
		if (info.offset.x < -50 || info.velocity.x < -500) {
			moveToSlide(1);
			return;
		}

		if (info.offset.x > 50 || info.velocity.x > 500) {
			moveToSlide(-1);
		}
	};

	return (
		<section className="relative z-20 flex justify-center px-8 py-32 md:px-16 lg:px-24">
			<div className="flex w-full max-w-7xl flex-col items-center gap-16">
				<div className="text-center text-xs font-bold uppercase tracking-[0.22em] text-sky-blue">
					04 / Other Projects
				</div>

				<motion.div
					className="relative z-20 flex h-[420px] w-full max-w-7xl cursor-pointer touch-pan-y items-center justify-center overflow-visible"
					drag="x"
					dragConstraints={{ left: 0, right: 0 }}
					dragElastic={0.22}
					onDragEnd={handleDragEnd}
					style={{ perspective: 1200 }}
				>
					{otherProjects.map((project, index) => {
						const offset = getSlideOffset(index, activeIndex);
						const isActive = offset === 0;
						const direction = Math.sign(offset);
						const x = direction * 378;
						const scale = isActive ? 1 : 0.666;
						const opacity = isActive ? 1 : 0.5;

						return (
							<motion.button
								key={`${project.title}-${index}`}
								type="button"
								className="absolute z-20 aspect-square w-72 cursor-pointer overflow-hidden rounded-lg shadow-2xl md:w-[420px]"
								animate={{
									x,
									scale,
									opacity,
								}}
								transition={{
									duration: 0.7,
									ease: [0.22, 1, 0.36, 1],
								}}
								style={{
									zIndex: isActive ? 30 : 20,
								}}
								onClick={() => {
									if (!isActive) setActiveIndex(index);
								}}
							>
								<Image
									src={project.image}
									alt={project.title}
									fill
									sizes="(min-width: 768px) 420px, 288px"
									className="object-cover object-top"
								/>
								<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
									<div className="text-left text-lg font-bold text-white">
										{project.title}
									</div>
								</div>
							</motion.button>
						);
					})}
				</motion.div>
			</div>
		</section>
	);
}
