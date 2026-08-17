"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { fadeUp } from "../../lib/animations";
import ParticleField from "../ui/ParticleField";
import Squiggle from "../ui/Squiggle";

type Role = {
    title: string;
    meta: string;
    summary: string;
};

const ROLES: Role[] = [
    {
        title: "QuackHacks • Software Engineer",
        meta: "June 2026 - Present • Eugene, OR",
        summary:
            "University of Oregon's premier hackathon, hosting hundreds of students from over 30 different schools to collaborate together across a 24-hour event.",
    },
    {
        title: "Synrax • Co-Founder & Software Engineer",
        meta: "January 2026 - May 2026 • Eugene, OR",
        summary:
            "AI code-review platform integrated with GitHub to review pull requests and generate smoke and unit tests, built for developers and engineering managers.",
    },
];

const listVariants: Variants = {
    initial: {},
    visible: { transition: { staggerChildren: 0.15 } },
};

/* Square side, which doubles as the length of each leg of the circuit */
const BOX_PX = 110;

const MOVE_S = 0.6;
const PAUSE_S = 0.9;
const LAP_S = (MOVE_S + PAUSE_S) * 4;

/* Alternating move/pause legs, as cumulative fractions of a full lap */
const LAP_TIMES = [
    MOVE_S,
    PAUSE_S,
    MOVE_S,
    PAUSE_S,
    MOVE_S,
    PAUSE_S,
    MOVE_S,
    PAUSE_S,
].reduce<number[]>(
    (times, seconds) => [...times, times[times.length - 1] + seconds / LAP_S],
    [0],
);

/* Corner steps in grid units. Each move keyframe is followed by a duplicate that
   holds the box still, so the pair reads as move, pause, move, pause. Box one runs
   clockwise from the top-left; box two runs the same circuit from the bottom-right,
   which keeps the two diagonal from each other the whole way around. */
const BOX_ONE_STEPS = {
    x: [0, 1, 1, 1, 1, 0, 0, 0, 0],
    y: [0, 0, 0, 1, 1, 1, 1, 0, 0],
};

const BOX_TWO_STEPS = {
    x: [1, 0, 0, 0, 0, 1, 1, 1, 1],
    y: [1, 1, 1, 0, 0, 0, 0, 1, 1],
};

const LAP_TRANSITION = {
    duration: LAP_S,
    times: LAP_TIMES,
    ease: "easeInOut" as const,
    repeat: Infinity,
    repeatType: "loop" as const,
};

function toPixels(steps: { x: number[]; y: number[] }) {
    return {
        x: steps.x.map((step) => step * BOX_PX),
        y: steps.y.map((step) => step * BOX_PX),
    };
}

function toStartPixels(steps: { x: number[]; y: number[] }) {
    return { x: steps.x[0] * BOX_PX, y: steps.y[0] * BOX_PX };
}

export default function Experience() {
    const reduceMotion = useReducedMotion();

    const boxStyle = { width: BOX_PX, height: BOX_PX };

    return (
        <section
            id="experience"
            className="relative flex min-h-svh flex-col justify-between overflow-hidden px-8 pt-32 pb-24 md:px-16"
        >
            <ParticleField direction="right" className="z-0" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center">
                <motion.div
                    variants={fadeUp}
                    initial="initial"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="w-full lg:w-1/2 lg:shrink-0"
                >
                    <Squiggle variant="experience" />
                </motion.div>

                <motion.h2
                    variants={fadeUp}
                    initial="initial"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    data-squiggle-stop=""
                    className="font-medium leading-[1.02] tracking-tight text-white text-[clamp(2rem,11vw,4rem)] lg:flex-1 lg:text-[clamp(1.5rem,5vw,16rem)]"
                >
                    <span className="block text-right lg:pr-14">TECHNICAL</span>
                    <span className="block text-right lg:pr-14">EXPERIENCE</span>
                </motion.h2>
            </div>

            <div
                aria-hidden="true"
                className="pointer-events-none absolute top-3/4 left-3/4 z-10 hidden translate-x-[calc(-50%+6rem)] translate-y-[calc(-50%-2rem)] lg:block"
                style={{ width: BOX_PX * 2, height: BOX_PX * 2 }}
            >
                <motion.div
                    className="absolute top-0 left-0 bg-white"
                    style={boxStyle}
                    animate={
                        reduceMotion
                            ? toStartPixels(BOX_ONE_STEPS)
                            : toPixels(BOX_ONE_STEPS)
                    }
                    transition={reduceMotion ? { duration: 0 } : LAP_TRANSITION}
                />

                <motion.div
                    className="absolute top-0 left-0 bg-white"
                    style={boxStyle}
                    animate={
                        reduceMotion
                            ? toStartPixels(BOX_TWO_STEPS)
                            : toPixels(BOX_TWO_STEPS)
                    }
                    transition={reduceMotion ? { duration: 0 } : LAP_TRANSITION}
                />
            </div>

            <motion.div
                variants={listVariants}
                initial="initial"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="relative z-10 mt-16 flex flex-col gap-12 sm:pl-4 md:mt-24 md:gap-14 md:pl-8"
            >
                {ROLES.map((role) => (
                    <motion.div
                        key={role.title}
                        variants={fadeUp}
                        className="w-fit"
                    >
                        <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl md:text-3xl lg:whitespace-nowrap lg:text-4xl">
                            {role.title}
                        </h3>

                        <p className="mt-2 text-base text-gray md:text-lg">
                            {role.meta}
                        </p>

                        <p className="mt-4 w-full max-w-3xl text-lg leading-relaxed text-gray-light md:text-xl">
                            {role.summary}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
