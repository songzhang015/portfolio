"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { BOUNCE, introTime } from "../lib/motion";

export default function Header({
  intro,
  playing,
  onReset,
}: {
  intro: boolean;
  playing: boolean;
  onReset: () => void;
}) {
  const [clock, setClock] = useState("");
  const header = useRef<HTMLElement>(null);
  const rule = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      setClock(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "America/Los_Angeles",
          hour: "numeric",
          minute: "2-digit",
        }),
      );
      timer = setTimeout(tick, 60_000 - (Date.now() % 60_000));
    };
    timer = setTimeout(tick, 0);
    return () => clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    if (!intro || !playing || !header.current || reduced) return;
    const animations = Array.from(
      header.current.querySelectorAll<HTMLElement>(".header-item"),
      (item, index) =>
        item.animate(
          [
            { opacity: 0, transform: "translateY(-26px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          {
            duration: introTime(700),
            delay: introTime(1950 + index * 60),
            easing: BOUNCE,
            fill: "both",
          },
        ),
    );
    const line = rule.current?.animate(
      [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
      {
        duration: introTime(340),
        delay: introTime(1760),
        easing: "cubic-bezier(.2,.8,.2,1)",
        fill: "both",
      },
    );
    return () => {
      animations.forEach((animation) => animation.cancel());
      line?.cancel();
    };
  }, [intro, playing, reduced]);

  return (
    <header
      ref={header}
      inert={intro}
      style={
        intro
          ? { background: "transparent", borderBottomColor: "transparent" }
          : undefined
      }
      className="fixed inset-x-0 top-0 z-50 flex h-12 items-center justify-between gap-4 border-b-2 border-ink bg-white px-5 text-sm font-semibold"
    >
      <button
        type="button"
        aria-label="Reset desktop"
        onClick={onReset}
        style={{ opacity: intro ? 0 : 1 }}
        className="header-item -ml-2 inline-flex min-h-11 min-w-11 items-center justify-center font-display text-xl transition-transform duration-200 ease-out hover:-rotate-6 hover:scale-110"
      >
        SZ
      </button>
      <p className="header-item" style={{ opacity: intro ? 0 : 1 }}>
        <span className="hidden sm:inline">Portland, OR · </span>
        <span className="tabular-nums">{clock || "\u00a0"}</span>
      </p>
      {intro && (
        <span
          ref={rule}
          aria-hidden="true"
          style={{ transform: "scaleX(0)" }}
          className="pointer-events-none absolute inset-x-0 -bottom-0.5 h-0.5 bg-ink"
        />
      )}
    </header>
  );
}
