"use client";

import { useEffect, useRef } from "react";
import { INTRO_SPEED, introTime } from "../lib/motion";

const NAME_FILL_START = 2350;
// The timeline is scaled by INTRO_SPEED; add 500 ms of real playback time.
const NAME_FILL_DURATION = 1000 + 500 * INTRO_SPEED;
const INTRO_END = NAME_FILL_START + NAME_FILL_DURATION + 20;

const easeInOut = (progress: number) =>
  progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;

export default function Intro({
  onComplete,
  onStart,
}: {
  onComplete: () => void;
  onStart: () => void;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const word = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionPreference.matches) {
      onComplete();
      return;
    }
    const surface = canvas.current;
    const name = word.current;
    const context = surface?.getContext("2d", { alpha: true });
    if (!surface || !context || !name) {
      onComplete();
      return;
    }

    let cancelled = false;
    let frame = 0;
    let wakeTimer: ReturnType<typeof setTimeout> | undefined;
    let fontTimer: ReturnType<typeof setTimeout> | undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const width = window.innerWidth;
    const height = window.innerHeight;
    const waveHeight = Math.min(64, Math.max(32, width * 0.04));
    const ratio = Math.min(1.5, window.devicePixelRatio || 1);
    surface.width = width * ratio;
    surface.height = height * ratio;
    context.scale(ratio, ratio);
    const colors = getComputedStyle(document.documentElement);
    const sky = colors.getPropertyValue("--color-sky").trim();
    const skyLight = colors.getPropertyValue("--color-sky-light").trim();

    function wave(
      color: string,
      level: number,
      amplitude: number,
      time: number,
      back = false,
    ) {
      context!.beginPath();
      context!.moveTo(0, height);
      for (let x = 0; x <= width + 16; x += 16) {
        const offset = back
          ? 0.62 * Math.sin(x * 0.0085 + time * 0.0026 + 2.1) +
            0.38 * Math.sin(x * 0.021 - time * 0.0037 + 3.57)
          : 0.62 * Math.sin(x * 0.011 + time * 0.0032) +
            0.38 * Math.sin(x * 0.024 - time * 0.0022);
        context!.lineTo(x, level + amplitude * offset);
      }
      context!.lineTo(width, height);
      context!.closePath();
      context!.fillStyle = color;
      context!.fill();
    }

    async function run() {
      await Promise.race([
        document.fonts.ready,
        new Promise<void>((resolve) => {
          fontTimer = setTimeout(resolve, 900);
        }),
      ]);
      clearTimeout(fontTimer);
      if (cancelled) return;
      // Read font metrics once, before animation; avoid layout reads per frame.
      const wordWidth = name!.offsetWidth;
      const wordHeight = name!.offsetHeight;
      const pad = wordHeight * 0.6;
      const textStyle = getComputedStyle(name!);
      context!.font = `${textStyle.fontWeight} ${textStyle.fontSize} ${textStyle.fontFamily}`;
      const metrics = context!.measureText(name!.textContent ?? "Song Zhang");
      const inkTop = Number.isFinite(metrics.fontBoundingBoxAscent)
        ? (wordHeight -
            metrics.fontBoundingBoxAscent -
            metrics.fontBoundingBoxDescent) /
            2 +
          metrics.fontBoundingBoxAscent -
          metrics.actualBoundingBoxAscent
        : 0;
      const started = performance.now();
      onStart();

      let waterSettled = false;
      function draw(now: number) {
        if (cancelled) return;
        const elapsed = (now - started) * INTRO_SPEED;
        if (elapsed <= 1900) {
          const progress = Math.min(1, Math.max(0, (elapsed - 120) / 1780));
          const amplitude =
            waveHeight * (1 - progress) ** 1.2 * Math.min(1, progress * 5);
          const level = height + 30 - (height + 30 - 48) * easeInOut(progress);
          context!.clearRect(0, 0, width, height);
          if (amplitude > 0.05)
            wave(
              skyLight,
              level - amplitude * 0.9,
              amplitude * 0.9,
              elapsed,
              true,
            );
          wave(sky, level, amplitude, elapsed);
        } else if (!waterSettled) {
          waterSettled = true;
          // The water is still during the hold and name fill.
          context!.clearRect(0, 0, width, height);
          context!.fillStyle = sky;
          context!.fillRect(0, 48, width, height - 48);
        }
        if (elapsed >= NAME_FILL_START) {
          const progress = Math.min(
            1,
            (elapsed - NAME_FILL_START) / NAME_FILL_DURATION,
          );
          const level =
            wordHeight + pad - (wordHeight + 2 * pad) * easeInOut(progress);
          const amplitude = wordHeight * 0.045 * Math.sin(Math.PI * progress);
          const points = [
            `${-pad}px ${-pad * 2}px`,
            `${wordWidth + pad}px ${-pad * 2}px`,
          ];
          for (let x = wordWidth + pad; x >= -pad; x -= 24) {
            const y =
              level +
              amplitude *
                (0.62 * Math.sin(x * 0.011 + elapsed * 0.0032) +
                  0.38 * Math.sin(x * 0.024 - elapsed * 0.0022));
            points.push(`${x.toFixed(1)}px ${y.toFixed(1)}px`);
          }
          name!.style.clipPath = `polygon(${points.join(",")})`;
          // The mask keeps moving through padding after the last visible ink.
          // Reveal the desktop as soon as the name is fully covered instead.
          if (level + amplitude <= inkTop - 1) {
            onComplete();
            return;
          }
        }
        if (elapsed >= INTRO_END) {
          onComplete();
          return;
        }
        if (elapsed >= 1900 && elapsed < NAME_FILL_START) {
          wakeTimer = setTimeout(
            () => {
              frame = requestAnimationFrame(draw);
            },
            introTime(NAME_FILL_START - elapsed),
          );
        } else frame = requestAnimationFrame(draw);
      }
      frame = requestAnimationFrame(draw);
    }
    void run();
    const onKey = (event: KeyboardEvent) => {
      if (["Escape", "Enter", " "].includes(event.key)) {
        event.preventDefault();
        onComplete();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onComplete);
    const onMotionChange = () => {
      if (motionPreference.matches) onComplete();
    };
    motionPreference.addEventListener("change", onMotionChange);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      clearTimeout(wakeTimer);
      clearTimeout(fontTimer);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onComplete);
      motionPreference.removeEventListener("change", onMotionChange);
      document.body.style.overflow = previousOverflow;
    };
  }, [onComplete, onStart]);

  return (
    <button
      type="button"
      aria-label="Skip introduction"
      onClick={onComplete}
      style={{ cursor: "default" }}
      className="fixed inset-0 z-40 overflow-hidden bg-white"
    >
      <canvas
        ref={canvas}
        aria-hidden="true"
        className="absolute inset-0 size-full"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <span
          ref={word}
          className="whitespace-pre font-display leading-none tracking-tight text-white"
          style={{ fontSize: "min(17vw, 15rem)" }}
        >
          Song Zhang
        </span>
      </span>
    </button>
  );
}
