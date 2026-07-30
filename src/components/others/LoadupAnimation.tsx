"use client";

import {
    motion,
    AnimatePresence,
    useMotionValue,
    useSpring,
    useTransform,
} from "motion/react";
import { useEffect, useState, type CSSProperties } from "react";

import CountUp from "../ui/CountUp";
import { LoadingContext } from "./LoadingContext";

/* Two-stage curtain: the gray panel sweeps down over the name to cover the
   screen, then the whole overlay slides up off the top to reveal the page */
const COVER_START = 4.5;
const COVER_DURATION = 0.5;
const REVEAL_START = COVER_START + COVER_DURATION + 0.1;
const REVEAL_DURATION = 0.5;

/* Hold the overlay until the upward reveal has fully cleared the viewport */
const LOADER_DURATION = (REVEAL_START + REVEAL_DURATION) * 1000;

const COUNT_DELAY = 0.1;
const COUNT_DURATION = 1.0;

/* Passed to CountUp as well, so the bar tracks the number exactly. Damping is
   below CountUp's own 20 + 40 / duration to shorten the crawl into 100 */
const COUNT_SPRING = {
    damping: 33,
    stiffness: 100 * (1 / COUNT_DURATION),
    /* Snap the last half-unit instead of crawling it - the tail is invisible
	   anyway once the value rounds to 100, but it delays landing by ~1s */
    restDelta: 0.4,
};

/* The spring reads a settled 100 by ~1.95s; hold it, then push it out of frame.
   Keep at least ~0.2s of daylight between those two or the push starts before
   the counter ever displays 100 */
const NAME_START = 2.15;
const SWAP_DURATION = 1.1;

/* Matches the name block's measured height (48px name + 4px gap + 24px sub) so
   both lines clip against the window edges at once during the swap. This is the
   floor: the counter and name sit one slot apart, so any taller and the gap
   between them grows, any shorter and the name clips at rest */
const SLOT_HEIGHT = "4.75rem";

export default function LoadupAnimation({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isLoading, setIsLoading] = useState(true);

    const progress = useMotionValue(0);
    const smoothProgress = useSpring(progress, COUNT_SPRING);
    const barWidth = useTransform(smoothProgress, (value) => `${value}%`);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, LOADER_DURATION);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            progress.set(100);
        }, COUNT_DELAY * 1000);

        return () => clearTimeout(timer);
    }, [progress]);

    return (
        <LoadingContext.Provider value={isLoading}>
            <>
                <AnimatePresence>
                    {isLoading && (
                        <motion.div
                            key="loader-overlay"
                            className="fixed inset-0 z-[999] flex justify-center items-center h-screen overflow-hidden bg-black"
                            initial={{ y: "0%" }}
                            animate={{ y: "-100%" }}
                            transition={{
                                duration: REVEAL_DURATION,
                                delay: REVEAL_START,
                                ease: [0.76, 0, 0.24, 1],
                            }}
                        >
                            {/* Sweeps down over the name, then rides the overlay back up */}
                            <motion.div
                                className="absolute inset-0 z-20 bg-gray-background"
                                initial={{ y: "-100%" }}
                                animate={{ y: "0%" }}
                                transition={{
                                    duration: COVER_DURATION,
                                    delay: COVER_START,
                                    ease: [0.76, 0, 0.24, 1],
                                }}
                            />

                            <motion.div
                                className="relative z-10 h-[var(--swap-slot)] w-full overflow-hidden select-none"
                                style={
                                    {
                                        "--swap-slot": SLOT_HEIGHT,
                                    } as CSSProperties
                                }
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            >
                                {/* One track of two full-height slots: the name pushes the
								    counter up and out of the window as it slides in */}
                                <motion.div
                                    initial={{ y: "0%" }}
                                    animate={{ y: "-50%" }}
                                    transition={{
                                        duration: SWAP_DURATION,
                                        delay: NAME_START,
                                        ease: [0.65, 0, 0.35, 1],
                                    }}
                                >
                                    <div className="flex h-[var(--swap-slot)] items-center justify-center">
                                        <span className="text-white text-base tabular-nums">
                                            <CountUp
                                                to={100}
                                                duration={COUNT_DURATION}
                                                delay={COUNT_DELAY}
                                                damping={COUNT_SPRING.damping}
                                                stiffness={
                                                    COUNT_SPRING.stiffness
                                                }
                                                restDelta={
                                                    COUNT_SPRING.restDelta
                                                }
                                            />
                                        </span>
                                    </div>

                                    <div className="flex h-[var(--swap-slot)] flex-col items-center justify-center">
                                        <span className="text-white text-4xl sm:text-5xl font-bold">
                                            Song Zhang
                                        </span>
                                        <span className="text-gray text-base mt-1">
                                            Software Engineer&nbsp; /
                                            &nbsp;System Design&nbsp; / &nbsp;AI
                                            Integration
                                        </span>
                                    </div>
                                </motion.div>
                            </motion.div>

                            <motion.div
                                className="absolute inset-x-0 bottom-0 z-10 h-[3px] bg-gray-background"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            >
                                <motion.div
                                    className="h-full bg-white"
                                    style={{ width: barWidth }}
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Page content - locked during load to prevent scroll */}
                <div className={isLoading ? "h-screen overflow-hidden" : ""}>
                    {children}
                </div>
            </>
        </LoadingContext.Provider>
    );
}
