"use client";

import { useLoading } from "../others/LoadingContext";
import ParticleField from "../ui/ParticleField";
import Squiggle from "../ui/Squiggle";
import {
    motion,
    type Variants,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const BLURBS = [
    "Hello there! I'm Song, a senior at the University of Oregon studying Computer Science.",
    "I have experience with frontend design, backend systems, and AI integrations.",
    "Please feel free to reach out or connect if you'd like to collaborate or chat!",
];

/* How long each blurb stays highlighted before the rotation advances */
const ROTATE_MS = 6000;

/* Entrance timings, shared so the rotation can wait for the intro to land */
const ENTER_DELAY_S = 1;
const STAGGER_S = 0.2;
const ITEM_DURATION_S = 0.7;

/* The blurbs are the second staggered child of the intro group */
const BLURBS_REVEALED_MS = (ENTER_DELAY_S + STAGGER_S + ITEM_DURATION_S) * 1000;

const itemVariants: Variants = {
    initial: { y: 24, opacity: 0, filter: "blur(8px)" },
    visible: {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        transition: {
            duration: ITEM_DURATION_S,
            ease: [0.34, 1.56, 0.64, 1] as never,
        },
    },
};

export default function Introduction() {
    const isLoading = useLoading();
    const sectionRef = useRef<HTMLElement | null>(null);

    const [activeBlurb, setActiveBlurb] = useState(0);
    const [hoveredBlurb, setHoveredBlurb] = useState<number | null>(null);
    const [rotating, setRotating] = useState(false);

    useEffect(() => {
        if (isLoading) return;

        const timer = setTimeout(() => setRotating(true), BLURBS_REVEALED_MS);
        return () => clearTimeout(timer);
    }, [isLoading]);

    useEffect(() => {
        if (!rotating || hoveredBlurb !== null) return;

        const timer = setTimeout(
            () => setActiveBlurb((i) => (i + 1) % BLURBS.length),
            ROTATE_MS,
        );
        return () => clearTimeout(timer);
    }, [rotating, activeBlurb, hoveredBlurb]);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 90,
        damping: 20,
        mass: 0.3,
    });

    const contentY = useTransform(smoothProgress, [0, 1], [0, -18]);

    return (
        <section
            ref={sectionRef}
            className="relative flex min-h-svh flex-col overflow-hidden"
        >
            <ParticleField className="z-0" />

            <motion.div
                className="relative z-10 flex w-full flex-1 flex-col justify-between px-8 pt-32 pb-10 md:px-16 md:pt-48"
                style={{ y: contentY }}
                variants={{
                    initial: {},
                    visible: {
                        transition: {
                            delay: ENTER_DELAY_S,
                            staggerChildren: STAGGER_S,
                            delayChildren: ENTER_DELAY_S,
                        },
                    },
                }}
                initial="initial"
                animate={isLoading ? "initial" : "visible"}
            >
                <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-8 xl:flex-row xl:justify-center xl:gap-16">
                    <motion.h1
                        variants={itemVariants}
                        className="text-6xl font-medium leading-[1.2] tracking-tight md:text-7xl"
                    >
                        <span className="block text-white">Song</span>
                        <span className="block text-gray-dark">Zhang</span>
                    </motion.h1>

                    <motion.div
                        variants={itemVariants}
                        className="space-y-8 pt-4 text-lg md:text-xl xl:whitespace-nowrap"
                    >
                        {BLURBS.map((blurb, i) => (
                            <p
                                key={i}
                                onMouseEnter={() => {
                                    setHoveredBlurb(i);
                                    setActiveBlurb(i);
                                }}
                                onMouseLeave={() => setHoveredBlurb(null)}
                                className={`cursor-default transition-colors duration-500 ease-in-out ${
                                    activeBlurb === i
                                        ? "text-white"
                                        : "text-gray-dark"
                                }`}
                            >
                                {blurb}
                            </p>
                        ))}
                    </motion.div>
                </div>

                <motion.div variants={itemVariants} className="-mx-8 md:-mx-16">
                    <Squiggle variant="hero" />
                </motion.div>

                <motion.h2
                    variants={itemVariants}
                    className="font-medium leading-[1.02] tracking-tight text-white text-[clamp(2rem,11vw,4rem)] lg:text-[clamp(1.5rem,5vw,16rem)]"
                >
                    <span className="block lg:pl-14">
                        DEVELOPING{" "}
                        <span className="block lg:inline">FULL-STACK</span>
                    </span>
                    <span className="block lg:pr-14 lg:text-right">
                        APPLICATIONS
                    </span>
                </motion.h2>
            </motion.div>
        </section>
    );
}
