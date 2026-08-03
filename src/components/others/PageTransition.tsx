"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { useLenis } from "lenis/react";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { cn } from "../../lib/utils";
import { markInAppNavigation } from "../../lib/intro";

/* Same two-stage curtain as the loadup: the gray panel sweeps down to cover the
   screen, then the whole overlay slides up off the top to reveal what's behind */
const COVER_DURATION = 0.5;
const REVEAL_DURATION = 0.5;
const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const;

/* If the route somehow never lands, reveal anyway rather than trap the page
   behind the curtain */
const NAVIGATION_TIMEOUT_MS = 1500;

/* Frames to keep re-pinning the target section after the route lands. The
   landing page settles over the first few frames — fonts, images and the
   router's own scroll reset all move things — so one scroll isn't enough */
const SETTLE_FRAMES = 12;

/* "top" and "bottom" pin to the page edges; the rest are section ids */
export type ScrollTarget = "top" | "bottom" | "experience" | "projects";

/* covering: gray sweeping down over the old page
   covered: screen fully hidden, route change in flight */
type Phase = "idle" | "covering" | "covered";

type NavigateWithCurtain = (href: string, scrollTo?: ScrollTarget) => void;

const PageTransitionContext = createContext<NavigateWithCurtain>(() => {});

export const usePageTransition = () => useContext(PageTransitionContext);

export default function PageTransition({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const pathname = usePathname();
	const lenis = useLenis();

	const [phase, setPhase] = useState<Phase>("idle");
	const [pendingHref, setPendingHref] = useState<string | null>(null);
	const [pendingScroll, setPendingScroll] = useState<ScrollTarget | null>(
		null,
	);
	const [timedOut, setTimedOut] = useState(false);

	/* Read once up front rather than in an effect, then track changes */
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(
		() =>
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches,
	);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

		const handleChange = (event: MediaQueryListEvent): void => {
			setPrefersReducedMotion(event.matches);
		};

		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, []);

	const navigate = useCallback<NavigateWithCurtain>(
		(href, scrollTo) => {
			if (phase !== "idle") return;

			markInAppNavigation();

			setPendingHref(href);
			setPendingScroll(scrollTo ?? null);
			setPhase("covering");
		},
		[phase],
	);

	const hasLanded = phase === "covered" && pathname === pendingHref;

	useEffect(() => {
		if (!hasLanded || !pendingScroll || !lenis) return;

		let framesLeft = SETTLE_FRAMES;
		let frame = 0;

		const pin = (): void => {
			const section =
				pendingScroll === "top" || pendingScroll === "bottom"
					? null
					: document.getElementById(pendingScroll);

			const destination =
				pendingScroll === "top"
					? 0
					: pendingScroll === "bottom"
						? "bottom"
						: section;

			if (destination !== null) {
				lenis.resize();
				lenis.scrollTo(destination, {
					offset: 0,
					immediate: true,
					force: true,
				});
			}

			framesLeft -= 1;
			if (framesLeft > 0) frame = requestAnimationFrame(pin);
		};

		pin();

		return () => cancelAnimationFrame(frame);
	}, [hasLanded, pendingScroll, lenis]);

	useEffect(() => {
		if (phase !== "covered") return;

		const timer = setTimeout(
			() => setTimedOut(true),
			NAVIGATION_TIMEOUT_MS,
		);

		return () => clearTimeout(timer);
	}, [phase]);

	/* Derived rather than stored, so the new route landing is what drives the
	   reveal instead of a second round of state updates */
	const isRevealing = hasLanded || (phase === "covered" && timedOut);

	/* Reduced motion keeps the same sequencing — including the mid-curtain jump
	   to the right section — just without the visible sweep */
	const coverDuration = prefersReducedMotion ? 0 : COVER_DURATION;
	const revealDuration = prefersReducedMotion ? 0 : REVEAL_DURATION;

	return (
		<PageTransitionContext.Provider value={navigate}>
			{children}

			<AnimatePresence>
				{phase !== "idle" && (
					<motion.div
						key="page-curtain"
						/* Transparent while the gray sweeps down so the old page stays
						   visible underneath; black only once the screen is covered */
						className={cn(
							"fixed inset-0 z-[998] overflow-hidden",
							phase === "covering"
								? "bg-transparent"
								: "bg-black",
						)}
						initial={{ y: "0%" }}
						animate={{ y: isRevealing ? "-100%" : "0%" }}
						transition={{
							duration: revealDuration,
							ease: CURTAIN_EASE,
						}}
						onAnimationComplete={() => {
							if (!isRevealing) return;

							setPendingHref(null);
							setPendingScroll(null);
							setTimedOut(false);
							setPhase("idle");
						}}
					>
						<motion.div
							className="absolute inset-0 bg-gray-background"
							initial={{ y: "-100%" }}
							animate={{ y: "0%" }}
							transition={{
								duration: coverDuration,
								ease: CURTAIN_EASE,
							}}
							onAnimationComplete={() => {
								if (phase !== "covering") return;

								setPhase("covered");

								if (pendingHref) {
									router.push(pendingHref, {
										scroll: !pendingScroll,
									});
								}
							}}
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</PageTransitionContext.Provider>
	);
}
