"use client";

import {
    motion,
    useDragControls,
    useReducedMotion,
    useMotionValue,
} from "motion/react";
import { BOUNCE, introTime } from "../lib/motion";
import {
    useRef,
    useEffect,
    useLayoutEffect,
    type ReactNode,
    type RefObject,
} from "react";

type Props = {
    id: string;
    title: string;
    color: string;
    className: string;
    children: ReactNode;
    bounds: RefObject<HTMLDivElement | null>;
    onRaise: (id: string) => void;
    layer?: number;
    delay: number;
    ready: boolean;
};

export default function DesktopWindow({
    id,
    title,
    color,
    className,
    children,
    bounds,
    onRaise,
    layer,
    delay,
    ready,
}: Props) {
    const controls = useDragControls();
    const reduced = useReducedMotion();
    const surface = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Animate the surface independently of the drag layer, so the entrance
    // runs on the compositor and never delays a pointer gesture.
    useLayoutEffect(() => {
        if (!ready || reduced || !surface.current) return;
        const animation = surface.current.animate(
            [
                { opacity: 0, transform: "scale(.3) rotate(-12deg)" },
                { opacity: 1, transform: "scale(1) rotate(0)" },
            ],
            {
                duration: introTime(700),
                delay: delay * 1000,
                easing: BOUNCE,
                fill: "backwards",
            },
        );
        return () => animation.cancel();
    }, [ready, reduced, delay]);

    useEffect(() => {
        const resetOnResize = () => {
            x.set(0);
            y.set(0);
            surface.current
                ?.getAnimations()
                .forEach((animation) => animation.cancel());
        };
        window.addEventListener("resize", resetOnResize);
        return () => window.removeEventListener("resize", resetOnResize);
    }, [x, y]);

    return (
        <motion.section
            id={id}
            aria-labelledby={`${id}-title`}
            className={`desktop-window ${className}`}
            style={{ zIndex: layer, x, y }}
            drag
            dragListener={false}
            dragControls={controls}
            dragConstraints={bounds}
            dragMomentum={false}
            dragElastic={0}
            whileDrag={reduced ? undefined : { rotate: -1.5, scale: 1.02 }}
            transition={{ duration: reduced ? 0 : 0.2, ease: "easeOut" }}
            onPointerDown={() => onRaise(id)}
            onFocusCapture={() => {
                surface.current
                    ?.getAnimations()
                    .forEach((animation) => animation.cancel());
                onRaise(id);
            }}
        >
            <div
                ref={surface}
                className="window"
                style={{ opacity: ready ? 1 : 0 }}
            >
                <div
                    className={`window-bar ${color} touch-pan-y xl:touch-none xl:cursor-grab xl:active:cursor-grabbing`}
                    onPointerDown={(event) => {
                        if (window.matchMedia("(min-width: 80rem)").matches) {
                            surface.current
                                ?.getAnimations()
                                .forEach((animation) => animation.cancel());
                            controls.start(event);
                        }
                    }}
                >
                    <h2 id={`${id}-title`} className="flex-1 text-center">
                        {title}
                    </h2>
                </div>
                {children}
            </div>
        </motion.section>
    );
}
