"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const getNoRotationTransform = (transformStr: string): string => {
	const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr);
	if (hasRotate) {
		return transformStr.replace(/rotate\([\s\S]*?\)/, "rotate(0deg)");
	} else if (transformStr === "none") {
		return "rotate(0deg)";
	} else {
		return `${transformStr} rotate(0deg)`;
	}
};

const getPushedTransform = (baseTransform: string, offsetX: number): string => {
	const translateRegex = /translate\(([-0-9.]+)px\)/;
	const match = baseTransform.match(translateRegex);
	if (match) {
		const currentX = parseFloat(match[1]);
		const newX = currentX + offsetX;
		return baseTransform.replace(translateRegex, `translate(${newX}px)`);
	} else {
		return baseTransform === "none"
			? `translate(${offsetX}px)`
			: `${baseTransform} translate(${offsetX}px)`;
	}
};

const animateCard = (
	selector: gsap.TweenTarget,
	transform: string,
	delay = 0,
): void => {
	gsap.killTweensOf(selector);
	gsap.to(selector, {
		transform,
		duration: 0.4,
		ease: "back.out(1.4)",
		delay,
		overwrite: "auto",
	});
};

interface BounceCardsProps {
	className?: string;
	images?: string[];
	containerWidth?: number;
	containerHeight?: number;
	animationDelay?: number;
	animationStagger?: number;
	easeType?: string;
	transformStyles?: string[];
	enableHover?: boolean;
}

export default function BounceCards({
	className = "",
	images = [],
	containerWidth = 400,
	containerHeight = 400,
	animationDelay = 0.5,
	animationStagger = 0.06,
	easeType = "elastic.out(1, 0.8)",
	transformStyles = [
		"rotate(10deg) translate(-170px)",
		"rotate(5deg) translate(-85px)",
		"rotate(-3deg)",
		"rotate(-10deg) translate(85px)",
		"rotate(2deg) translate(170px)",
	],
	enableHover = false,
}: BounceCardsProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [activeImage, setActiveImage] = useState<string | null>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const ctx = gsap.context(() => {
			gsap.set(".card", { scale: 0 });
		}, containerRef);

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry?.isIntersecting) return;

				ctx.add(() => {
					gsap.to(".card", {
						scale: 1,
						stagger: animationStagger,
						ease: easeType,
						delay: animationDelay,
					});
				});

				observer.disconnect();
			},
			{ threshold: 0.35 },
		);

		observer.observe(containerRef.current);

		return () => {
			observer.disconnect();
			ctx.revert();
		};
	}, [animationDelay, animationStagger, easeType]);

	const pushSiblings = useCallback(
		(hoveredIdx: number) => {
			if (!enableHover || !containerRef.current) return;
			const q = gsap.utils.selector(containerRef);

			images.forEach((_, i) => {
				const selector = q(`.card-${i}`);
				const baseTransform = transformStyles[i] || "none";

				if (i === hoveredIdx) {
					animateCard(selector, getNoRotationTransform(baseTransform));
				} else {
					const offsetX = i < hoveredIdx ? -160 : 160;
					const distance = Math.abs(hoveredIdx - i);
					animateCard(
						selector,
						getPushedTransform(baseTransform, offsetX),
						distance * 0.05,
					);
				}
			});
		},
		[enableHover, images, transformStyles],
	);

	const resetSiblings = useCallback(() => {
		if (!enableHover || !containerRef.current) return;
		const q = gsap.utils.selector(containerRef);

		images.forEach((_, i) => {
			const selector = q(`.card-${i}`);
			animateCard(selector, transformStyles[i] || "none");
		});
	}, [enableHover, images, transformStyles]);

	return (
		<>
			<div
				className={`relative flex items-center justify-center ${className}`}
				ref={containerRef}
				style={{
					width: containerWidth,
					height: containerHeight,
				}}
			>
				{images.map((src, idx) => (
					<button
						key={idx}
						type="button"
						className={`card card-${idx} absolute z-20 aspect-square w-60 cursor-pointer overflow-hidden rounded-lg`}
						style={{
							boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
							transform: transformStyles[idx] || "none",
						}}
						onClick={() => setActiveImage(src)}
						onMouseEnter={() => pushSiblings(idx)}
						onMouseLeave={resetSiblings}
					>
						<Image
							className="object-cover"
							src={src}
							alt={`card-${idx}`}
							fill
							sizes="240px"
							unoptimized
						/>
					</button>
				))}
			</div>

			{activeImage && (
				<div
					className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/75 p-8 backdrop-blur-md"
					onClick={() => setActiveImage(null)}
				>
					<div
						className="relative z-20 aspect-square w-full max-w-3xl cursor-default overflow-hidden rounded-lg"
						onClick={(event) => event.stopPropagation()}
					>
						<Image
							className="object-contain"
							src={activeImage}
							alt="Expanded project card"
							fill
							sizes="min(100vw, 768px)"
							unoptimized
						/>
					</div>
				</div>
			)}
		</>
	);
}
