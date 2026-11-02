"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { BOUNCE } from "../lib/motion";

type Props = {
  title: string;
  color?: string;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  lightbox?: boolean;
};

export default function Modal({
  title,
  color = "bg-mint",
  onClose,
  children,
  className = "max-w-xl",
  lightbox = false,
}: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  useLayoutEffect(() => {
    const dialog = ref.current;
    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    dialog?.showModal();
    if (dialog) {
      // Inverse size keeps edge travel proportional: doubling the window
      // halves its scale change and tilt, using the same spring throughout.
      const size = Math.max(dialog.offsetWidth, dialog.offsetHeight, 1);
      const strength = Math.min(1, 576 / size);
      dialog.style.setProperty("--modal-start-scale", `${1 - 0.24 * strength}`);
      dialog.style.setProperty("--modal-start-rotation", `${-2 * strength}deg`);
      dialog.style.setProperty("--modal-easing", BOUNCE);
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);

  return (
    <dialog
      ref={ref}
      aria-label={title}
      tabIndex={lightbox ? -1 : undefined}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (lightbox || event.target === event.currentTarget) onClose();
      }}
      className={`${lightbox ? "lightbox cursor-zoom-out border-0 bg-transparent" : "window window-dialog"} w-full ${className}`}
    >
      {lightbox ? (
        children
      ) : (
        <>
          <div className={`window-bar shrink-0 ${color}`}>
            <button
              type="button"
              onClick={onClose}
              aria-label={`Close ${title}`}
              autoFocus
              className="modal-close -mx-2.5 -my-3 flex size-11 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ease-bounce hover:scale-125"
            >
              <span
                aria-hidden="true"
                className="size-3 rounded-full border border-ink bg-rose-300"
              />
            </button>
            <h2 className="min-w-0 flex-1 pr-8 text-center text-sm font-semibold wrap-anywhere">
              {title}
            </h2>
          </div>
          <div className="min-h-0 overflow-y-auto overscroll-contain rounded-b-2xl">
            {children}
          </div>
        </>
      )}
    </dialog>
  );
}
