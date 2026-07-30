"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { cn } from "../../lib/utils";

/* Same two-stage curtain as the loadup: the gray panel sweeps down to cover the
   screen, then the whole overlay slides up off the top to reveal what's behind */
const COVER_DURATION = 0.5;
const REVEAL_DURATION = 0.5;
const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const;

/* If the route somehow never lands, reveal anyway rather than trap the page
   behind the curtain */
const NAVIGATION_TIMEOUT_MS = 1500;

/* covering: gray sweeping down over the old page
   covered: screen fully hidden, route change in flight */
type Phase = "idle" | "covering" | "covered";

const PageTransitionContext = createContext<(href: string) => void>(() => {});

export const usePageTransition = () => useContext(PageTransitionContext);

export default function PageTransition({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const pathname = usePathname();

	const [phase, setPhase] = useState<Phase>("idle");
	const [pendingHref, setPendingHref] = useState<string | null>(null);
	const [timedOut, setTimedOut] = useState(false);

	const navigate = useCallback(
		(href: string) => {
			if (phase !== "idle") return;

			/* No curtain when motion is reduced — just go */
			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
				router.push(href);
				return;
			}

			setPendingHref(href);
			setPhase("covering");
		},
		[phase, router],
	);

	/* Backstop only — the reveal normally starts as soon as the route lands */
	useEffect(() => {
		if (phase !== "covered") return;

		const timer = setTimeout(() => setTimedOut(true), NAVIGATION_TIMEOUT_MS);

		return () => clearTimeout(timer);
	}, [phase]);

	/* Derived rather than stored, so the new route landing is what drives the
	   reveal instead of a second round of state updates */
	const isRevealing =
		phase === "covered" && (pathname === pendingHref || timedOut);

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
							phase === "covering" ? "bg-transparent" : "bg-black",
						)}
						initial={{ y: "0%" }}
						animate={{ y: isRevealing ? "-100%" : "0%" }}
						transition={{
							duration: REVEAL_DURATION,
							ease: CURTAIN_EASE,
						}}
						onAnimationComplete={() => {
							if (!isRevealing) return;

							setPendingHref(null);
							setTimedOut(false);
							setPhase("idle");
						}}
					>
						<motion.div
							className="absolute inset-0 bg-gray-background"
							initial={{ y: "-100%" }}
							animate={{ y: "0%" }}
							transition={{
								duration: COVER_DURATION,
								ease: CURTAIN_EASE,
							}}
							onAnimationComplete={() => {
								if (phase !== "covering") return;

								setPhase("covered");

								if (pendingHref) {
									router.push(pendingHref);
								}
							}}
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</PageTransitionContext.Provider>
	);
}
