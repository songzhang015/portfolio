"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { TECH, type Project } from "../lib/projects";
import Modal from "./Modal";

const COLORS = { peach: "bg-peach", lilac: "bg-lilac", mint: "bg-mint" };
const TAG_TILTS = [
  "rotate-[-0.7deg]",
  "rotate-[0.95deg]",
  "rotate-[-1.2deg]",
  "rotate-[1.45deg]",
];
export function imagePosition(align?: string) {
  return align === "top-left" ? "left top" : (align ?? "center");
}

export default function ProjectGallery({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState(0);
  const [zoom, setZoom] = useState<number | null>(null);
  const image = project.imgs[selected];

  return (
    <>
      <Modal
        title={`projects/${project.slug}`}
        color={COLORS[project.tag]}
        onClose={onClose}
        className="project-dialog max-w-6xl"
      >
        <div className="grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-2">
          <div className="min-w-0 space-y-3">
            <button
              type="button"
              onClick={() => setZoom(selected)}
              aria-label={`Enlarge ${project.title} screenshot ${selected + 1}`}
              className="relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden rounded-xl border-2 border-ink bg-white transition-transform duration-500 ease-bounce hover:scale-101"
            >
              <Image
                unoptimized
                src={image.src}
                alt={`${project.title} screenshot ${selected + 1}`}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                style={{ objectPosition: imagePosition(image.align) }}
              />
            </button>
            <div className="grid grid-cols-4 gap-2">
              {project.imgs.map((image, index) => (
                <button
                  type="button"
                  key={image.src}
                  onPointerEnter={(event) => {
                    if (
                      event.pointerType === "mouse" &&
                      window.matchMedia("(hover: hover)").matches
                    ) {
                      setSelected(index);
                    }
                  }}
                  onFocus={() => setSelected(index)}
                  onClick={() => {
                    setSelected(index);
                    setZoom(index);
                  }}
                  aria-label={`Enlarge ${project.title} screenshot ${index + 1}`}
                  aria-pressed={selected === index}
                  className={`relative aspect-video min-h-11 w-full min-w-0 overflow-hidden rounded-lg border-2 transition duration-300 hover:-translate-y-1 hover:opacity-100 sm:min-h-0 ${selected === index ? "border-ink" : "border-ink/20 opacity-60"}`}
                >
                  <Image
                    unoptimized
                    src={image.src}
                    alt=""
                    fill
                    sizes="160px"
                    className="object-cover"
                    style={{ objectPosition: imagePosition(image.align) }}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="flex min-w-0 flex-col items-start gap-4">
            <p className="text-sm font-semibold text-muted">
              {project.completed}
            </p>
            <h3 className="font-display text-4xl leading-none tracking-tight sm:text-5xl">
              {project.altTitle}
            </h3>
            <p className="text-base leading-relaxed text-pretty sm:text-lg">
              {project.sentences.join(" ")}
            </p>
            <ul aria-label="Technologies" className="flex flex-wrap gap-2">
              {project.tech.map((tech, index) => (
                <li
                  className={`rounded-full border-2 border-ink px-3 py-1 text-xs font-semibold transition-transform duration-200 ease-out motion-safe:hover:-translate-y-[3px] ${TAG_TILTS[index % TAG_TILTS.length]}`}
                  key={tech}
                >
                  {TECH[tech]}
                </li>
              ))}
            </ul>
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="action mt-1 text-sm"
            >
              View on GitHub <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </Modal>
      {zoom !== null && (
        <Modal
          title={`${project.title} screenshot`}
          onClose={() => setZoom(null)}
          className="max-w-7xl"
          lightbox
        >
          <div
            key={project.imgs[zoom].src}
            className="relative h-[65svh] overflow-hidden rounded-xl"
          >
            <Image
              unoptimized
              src={project.imgs[zoom].src}
              alt={`${project.title} screenshot ${zoom + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </Modal>
      )}
    </>
  );
}
