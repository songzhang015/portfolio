"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

interface RevealTextProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

function getPrefersReducedMotion() {
    if (typeof window === "undefined") {
        return false;
    }

    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function RevealText({
    children,
    className = "",
    delay = 0,
}: RevealTextProps) {
    const textRef = useRef<HTMLSpanElement>(null);
    const [prefersReducedMotion] = useState(getPrefersReducedMotion);
    const [isVisible, setIsVisible] = useState(prefersReducedMotion);
    const [isMaskOpen, setIsMaskOpen] = useState(prefersReducedMotion);

    useEffect(() => {
        const text = textRef.current;
        let maskTimeout = 0;

        if (!text) {
            return undefined;
        }

        if (prefersReducedMotion) {
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry) {
                    return;
                }

                if (entry.isIntersecting) {
                    setIsVisible(true);
                    window.clearTimeout(maskTimeout);
                    maskTimeout = window.setTimeout(() => {
                        setIsMaskOpen(true);
                    }, delay + 700);
                    return;
                }

                window.clearTimeout(maskTimeout);
                setIsMaskOpen(false);
                setIsVisible(false);
            },
            { threshold: 0.2 },
        );

        observer.observe(text);

        return () => {
            window.clearTimeout(maskTimeout);
            observer.disconnect();
        };
    }, [delay, prefersReducedMotion]);

    return (
        <span
            ref={textRef}
            className={`block ${isMaskOpen ? "overflow-visible" : "overflow-hidden"} ${className}`}
        >
            <span
                className={`block transform-gpu transition-transform duration-700 ease-out ${
                    isVisible ? "translate-y-0" : "translate-y-[110%]"
                }`}
                style={{
                    transitionDelay: `${delay}ms`,
                }}
            >
                {children}
            </span>
        </span>
    );
}
