"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PROJECTS, ROLES } from "../lib/projects";
import DesktopWindow from "./DesktopWindow";
import ProjectGallery, { imagePosition } from "./ProjectGallery";
import Modal from "./Modal";
import Intro from "./Intro";
import Dock from "./Dock";
import Header from "./Header";
import {
  preloadProjectImages,
  useProjectImages,
} from "../hooks/useProjectImages";
import { introTime } from "../lib/motion";

export default function Desktop({
  initialProject,
}: {
  initialProject?: string;
}) {
  const bounds = useRef<HTMLDivElement>(null);
  const layers = useRef(10);
  const topWindow = useRef<string | null>(null);
  const [layer, setLayer] = useState<Record<string, number>>({});
  const [generation, setGeneration] = useState(0);
  const [project, setProject] = useState(initialProject ?? null);
  const [role, setRole] = useState<number | null>(null);
  const [intro, setIntro] = useState(!initialProject);
  const [playing, setPlaying] = useState(false);
  const finishIntro = useCallback(() => setIntro(false), []);
  const startIntro = useCallback(() => setPlaying(true), []);
  const raise = useCallback((id: string) => {
    if (topWindow.current === id) return;
    topWindow.current = id;
    const nextLayer = ++layers.current;
    setLayer((current) => ({ ...current, [id]: nextLayer }));
  }, []);
  useProjectImages(project);

  function reset() {
    topWindow.current = null;
    setGeneration((current) => current + 1);
    setLayer({});
    setProject(null);
    setRole(null);
  }
  const currentProject = PROJECTS.find((item) => item.slug === project);
  const currentRole = role === null ? null : ROLES[role];

  return (
    <>
      <a
        href="#hello"
        inert={intro}
        className="fixed top-16 left-4 z-50 rounded-xl bg-white p-3 font-semibold shadow-window -translate-y-40 focus:translate-y-0"
      >
        Skip to content
      </a>
      <Header intro={intro} playing={playing} onReset={reset} />
      <main
        inert={intro}
        ref={bounds}
        className="desktop relative isolate flex flex-col gap-6 px-4 pt-20 pb-[calc(8rem+env(safe-area-inset-bottom))] xl:block xl:p-0"
      >
        <DesktopWindow
          key={`hello-${generation}`}
          id="hello"
          title="hello.md"
          color="bg-peach"
          className="hello-window"
          bounds={bounds}
          onRaise={raise}
          layer={layer.hello}
          delay={0.25}
          ready={!intro}
        >
          <div className="@container flex flex-col items-start gap-6 p-6 sm:p-8">
            <p className="text-xl font-semibold">Hey, I&apos;m</p>
            <h1 className="-mt-2 whitespace-nowrap font-display text-[clamp(2.5rem,15cqw,8rem)] leading-none tracking-tight">
              Song Zhang
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-pretty">
              A senior at the University of Oregon studying Computer Science
              and working with frontend design, backend systems, and AI
              integrations.
            </p>
          </div>
        </DesktopWindow>
        <DesktopWindow
          key={`projects-${generation}`}
          id="projects"
          title="projects/"
          color="bg-lilac"
          className="projects-window"
          bounds={bounds}
          onRaise={raise}
          layer={layer.projects}
          delay={0.25 + introTime(140) / 1000}
          ready={!intro}
        >
          <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 sm:p-6 xl:grid-cols-3">
            {PROJECTS.map((item, index) => (
              <button
                type="button"
                key={item.slug}
                id={index === 0 ? "first-project" : undefined}
                onPointerEnter={() => preloadProjectImages(item.slug)}
                onFocus={() => preloadProjectImages(item.slug)}
                onClick={() => setProject(item.slug)}
                className="group flex flex-col items-center gap-3 rounded-xl p-2 transition-transform duration-200 ease-out hover:-translate-y-1 hover:-rotate-2"
              >
                <span className="relative block aspect-video w-full overflow-hidden rounded-lg border-2 border-ink bg-white">
                  <Image
                    unoptimized
                    src={item.preview}
                    alt={`${item.title} preview`}
                    fill
                    sizes="(min-width: 1280px) 15vw, (min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover"
                    style={{
                      objectPosition: imagePosition(item.imgs[0].align),
                    }}
                  />
                </span>
                <span className="text-center text-base leading-tight font-semibold">
                  {item.title}
                </span>
              </button>
            ))}
          </div>
        </DesktopWindow>
        <DesktopWindow
          key={`experience-${generation}`}
          id="experience"
          title="experience.md"
          color="bg-mint"
          className="experience-window"
          bounds={bounds}
          onRaise={raise}
          layer={layer.experience}
          delay={0.25 + introTime(280) / 1000}
          ready={!intro}
        >
          <div className="divide-y-2 divide-ink/10 py-2">
            {ROLES.map((item, index) => (
              <button
                type="button"
                key={item.file}
                onClick={() => setRole(index)}
                className="group flex w-full items-center justify-between gap-4 px-6 py-6 text-left sm:px-8"
              >
                <span className="flex min-w-0 flex-col gap-1 transition-transform duration-500 ease-bounce group-hover:translate-x-1">
                  <span className="font-display text-3xl tracking-tight">
                    {item.company}
                  </span>
                  <span className="text-base font-semibold">{item.role}</span>
                  <span className="text-sm text-muted">{item.meta}</span>
                </span>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-ink transition-transform duration-500 ease-bounce group-hover:translate-x-1">
                  <ArrowRight size={18} aria-hidden="true" />
                </span>
              </button>
            ))}
          </div>
        </DesktopWindow>
      </main>
      <Dock key={generation} ready={!intro} />
      {intro && <Intro onComplete={finishIntro} onStart={startIntro} />}
      {currentProject && (
        <ProjectGallery
          key={currentProject.slug}
          project={currentProject}
          onClose={() => setProject(null)}
        />
      )}
      {currentRole && (
        <Modal
          title={`experience/${currentRole.file}`}
          onClose={() => setRole(null)}
        >
          <div className="flex flex-col gap-2 p-6 sm:p-8">
            <h3 className="font-display text-4xl leading-none tracking-tight sm:text-5xl">
              {currentRole.company}
            </h3>
            <p className="mt-2 text-lg font-semibold">{currentRole.role}</p>
            <p className="text-sm text-muted">{currentRole.meta}</p>
            <p className="mt-4 text-lg leading-relaxed text-pretty">
              {currentRole.summary}
            </p>
          </div>
        </Modal>
      )}
    </>
  );
}
