"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { BOUNCE, ZOOM, introTime } from "../lib/motion";

const EMAIL = "songzhang015@gmail.com";

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(EMAIL);
    return true;
  } catch {
    const input = document.createElement("textarea");
    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    input.value = EMAIL;
    input.style.cssText = "position:fixed;opacity:0;pointer-events:none";
    document.body.appendChild(input);
    input.select();
    try {
      return document.execCommand("copy");
    } catch {
      return false;
    } finally {
      input.remove();
      previousFocus?.focus({ preventScroll: true });
    }
  }
}

export default function Dock({ ready }: { ready: boolean }) {
  const [status, setStatus] = useState("");
  const dock = useRef<HTMLElement>(null);
  const tooltip = useRef<HTMLSpanElement>(null);
  const animation = useRef<Animation | null>(null);
  const reduced = useReducedMotion();
  useEffect(
    () => () => {
      animation.current?.cancel();
    },
    [],
  );

  useLayoutEffect(() => {
    if (!ready || reduced || !dock.current) return;
    const entrance = dock.current.animate(
      [
        { opacity: 0, transform: "translateY(140px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      {
        duration: introTime(900),
        delay: introTime(530),
        easing: ZOOM,
        fill: "backwards",
      },
    );
    return () => entrance.cancel();
  }, [ready, reduced]);

  async function showEmail() {
    const copied = await copyEmail();
    setStatus(copied ? "Copied email!" : EMAIL);
    animation.current?.cancel();
    const frames = reduced
      ? [{ opacity: 1 }, { opacity: 1 }]
      : [
          {
            transform: "translate(-50%,10px) scale(.5) rotate(-6deg)",
            opacity: 0,
            easing: BOUNCE,
          },
          {
            offset: 0.3,
            transform: "translate(-50%,0) scale(1) rotate(0)",
            opacity: 1,
          },
          {
            offset: 0.82,
            transform: "translate(-50%,0) scale(1) rotate(0)",
            opacity: 1,
            easing: "cubic-bezier(.5,0,.75,0)",
          },
          { transform: "translate(-50%,-10px) scale(.92)", opacity: 0 },
        ];
    const current = tooltip.current?.animate(frames, { duration: 1900 });
    if (current) {
      animation.current = current;
      current.onfinish = () => setStatus("");
    }
  }

  return (
    <div
      inert={!ready}
      className="pointer-events-none fixed inset-x-0 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-30 flex justify-center px-3 sm:bottom-[calc(1.25rem+env(safe-area-inset-bottom))]"
    >
      <nav
        ref={dock}
        aria-label="Contact and social links"
        style={{ opacity: ready ? 1 : 0 }}
        onFocusCapture={() => {
          // Keyboard focus must never land on a delayed, invisible link.
          dock.current?.getAnimations().forEach((entrance) => entrance.finish());
        }}
        className="pointer-events-auto flex flex-wrap items-center justify-center gap-1 rounded-2xl border-2 border-ink bg-white p-2 shadow-dock"
      >
        <a
          className="dock-item"
          href="https://github.com/songzhang015"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <a
          className="dock-item"
          href="https://linkedin.com/in/songxzhang"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
        <div className="relative">
          <span
            ref={tooltip}
            role="status"
            className="pointer-events-none absolute bottom-full left-1/2 mb-4 rounded-xl bg-ink px-3 py-2 text-sm font-semibold whitespace-nowrap text-white opacity-0"
            style={{ transform: "translateX(-50%)" }}
          >
            {status}
            <span
              aria-hidden="true"
              className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rotate-45 rounded-xs bg-ink"
            />
          </span>
          <button type="button" className="dock-item" onClick={showEmail}>
            Email
          </button>
        </div>
        <a
          className="dock-item bg-ink text-white"
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Resume.pdf
        </a>
      </nav>
    </div>
  );
}
