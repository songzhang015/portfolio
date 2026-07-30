"use client";

import { useEffect, useMemo, useRef } from "react";
import { cn } from "../../lib/utils";

/* Travel axis: "down" drifts top to bottom, "right" drifts left to right */
type Direction = "down" | "right";

const DEFAULT_CONFIG = {
    count: 300, // total particles alive at once
    speedMin: 24, // px/sec along the travel axis
    speedMax: 64,
    sizeMin: 0.5,
    sizeMax: 2.5,
    driftAmount: 12, // cross-axis sway in px
    driftSpeed: 0.5, // how fast the sway oscillates
    lifeMin: 10, // seconds — shortest-lived particles fade out around here
    lifeMax: 30, // seconds — longest-lived particles linger this long
    maxOpacity: 0.5,
    cursorRadius: 130, // px — glow influence radius around the pointer, 0 disables cursor effects entirely
    cursorGlow: 0.5, // extra opacity/size at cursor center (0 disables glow)
};

type ParticleConfig = typeof DEFAULT_CONFIG;

/* White through gray, as "r, g, b" fragments — matches the palette in globals.css */
const DEFAULT_COLORS = [
    "255, 255, 255", // white
    "223, 223, 223", // gray-light
    "166, 166, 166", // gray
    "105, 105, 105", // gray-dark
];

interface Bounds {
    width: number;
    height: number;
}

interface Pointer {
    x: number;
    y: number;
    active: boolean;
}

class Particle {
    x = 0;
    y = 0;
    /* Resting position on the axis the particle sways across */
    baseCross = 0;
    size = 0;
    speed = 0;
    life = 0;
    age = 0;
    driftPhase = 0;
    driftFreq = 0;
    color = "";
    glow = 0; // 0..1 proximity to the cursor
    colors: string[];
    config: ParticleConfig;
    direction: Direction;

    constructor(
        bounds: Bounds,
        colors: string[],
        config: ParticleConfig,
        direction: Direction,
    ) {
        this.colors = colors;
        this.config = config;
        this.direction = direction;
        this.color = colors[0] ?? "";
        this.reset(bounds);
    }

    reset(bounds: Bounds) {
        const config = this.config;
        this.x = Math.random() * bounds.width;
        this.y = Math.random() * bounds.height;
        this.baseCross = this.direction === "right" ? this.y : this.x;
        this.glow = 0;
        this.size =
            config.sizeMin + Math.random() * (config.sizeMax - config.sizeMin);
        this.speed =
            config.speedMin +
            Math.random() * (config.speedMax - config.speedMin);
        this.life =
            config.lifeMin + Math.random() * (config.lifeMax - config.lifeMin);
        this.age = 0;
        this.driftPhase = Math.random() * Math.PI * 2;
        this.driftFreq = config.driftSpeed * (0.5 + Math.random());
        this.color =
            this.colors[Math.floor(Math.random() * this.colors.length)] ?? "";
    }

    update(dt: number, bounds: Bounds, pointer: Pointer) {
        const config = this.config;
        this.age += dt;
        this.driftPhase += this.driftFreq * dt;

        const sway = Math.sin(this.driftPhase) * config.driftAmount;

        if (this.direction === "right") {
            this.x += this.speed * dt;
            this.y = this.baseCross + sway;
        } else {
            this.y += this.speed * dt;
            this.x = this.baseCross + sway;
        }

        this.glow = 0;
        if (pointer.active && config.cursorRadius > 0) {
            const dist = Math.hypot(this.x - pointer.x, this.y - pointer.y);

            if (dist < config.cursorRadius) {
                this.glow = 1 - dist / config.cursorRadius;
            }
        }

        if (this.age >= this.life) {
            this.reset(bounds);
        }
    }

    get opacity() {
        const t = this.age / this.life;
        let fade;
        if (t < 0.15) fade = t / 0.15;
        else if (t > 0.7) fade = 1 - (t - 0.7) / 0.3;
        else fade = 1;
        return Math.max(0, fade) * this.config.maxOpacity;
    }

    draw(ctx: CanvasRenderingContext2D) {
        const alpha = Math.min(
            this.opacity * (1 + this.config.cursorGlow * this.glow),
            1,
        );

        if (alpha <= 0) {
            return;
        }

        const radius = this.size * (1 + 0.5 * this.glow);

        ctx.beginPath();
        ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${alpha})`;
        ctx.fill();
    }
}

interface ParticleFieldProps {
    colors?: string[];
    config?: Partial<ParticleConfig>;
    direction?: Direction;
    className?: string;
}

export function ParticleField({
    colors = DEFAULT_COLORS,
    config,
    direction = "down",
    className,
}: ParticleFieldProps) {
    const resolvedConfig = useMemo<ParticleConfig>(
        () => ({ ...DEFAULT_CONFIG, ...config }),
        [config],
    );

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvasRefValue = canvasRef.current;

        if (
            !canvasRefValue ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return undefined;
        }

        const context = canvasRefValue.getContext("2d");

        if (!context) {
            return undefined;
        }

        const canvas: HTMLCanvasElement = canvasRefValue;
        const ctx: CanvasRenderingContext2D = context;

        const bounds: Bounds = {
            width: canvas.clientWidth,
            height: canvas.clientHeight,
        };

        function resize() {
            bounds.width = canvas.clientWidth;
            bounds.height = canvas.clientHeight;
            const dpr = window.devicePixelRatio || 1;
            canvas.width = bounds.width * dpr;
            canvas.height = bounds.height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        resize();

        const particles = Array.from(
            { length: resolvedConfig.count },
            () => new Particle(bounds, colors, resolvedConfig, direction),
        );

        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(canvas);

        const pointer: Pointer = { x: 0, y: 0, active: false };

        function handlePointerMove(event: PointerEvent) {
            const rect = canvas.getBoundingClientRect();
            pointer.x = event.clientX - rect.left;
            pointer.y = event.clientY - rect.top;
            pointer.active = true;
        }

        function handlePointerOut() {
            pointer.active = false;
        }

        window.addEventListener("pointermove", handlePointerMove, {
            passive: true,
        });
        window.addEventListener("pointerdown", handlePointerMove, {
            passive: true,
        });
        window.addEventListener("pointercancel", handlePointerOut);
        window.addEventListener("blur", handlePointerOut);
        document.addEventListener("pointerleave", handlePointerOut);

        let isVisible = true;
        const intersectionObserver = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry?.isIntersecting ?? true;
            },
            { threshold: 0 },
        );
        intersectionObserver.observe(canvas);

        let animationFrame = 0;
        let lastTime = performance.now();

        function animate(now: number) {
            const dt = Math.min((now - lastTime) / 1000, 0.05);
            lastTime = now;

            if (isVisible) {
                ctx.clearRect(0, 0, bounds.width, bounds.height);
                for (const particle of particles) {
                    particle.update(dt, bounds, pointer);
                    particle.draw(ctx);
                }
            }

            animationFrame = requestAnimationFrame(animate);
        }

        animationFrame = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrame);
            resizeObserver.disconnect();
            intersectionObserver.disconnect();
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerdown", handlePointerMove);
            window.removeEventListener("pointercancel", handlePointerOut);
            window.removeEventListener("blur", handlePointerOut);
            document.removeEventListener("pointerleave", handlePointerOut);
        };
    }, [colors, direction, resolvedConfig]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className={cn(
                "pointer-events-none absolute inset-0 h-full w-full",
                className,
            )}
        />
    );
}

export type { Direction, ParticleConfig, ParticleFieldProps };

export default ParticleField;
