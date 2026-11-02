"use client";

import { useEffect } from "react";
import { PROJECTS } from "../lib/projects";

// Warm only the project the visitor intends to view. Retain completion promises
// rather than image elements so the browser can reclaim decoded image memory.
const images = new Map<string, Promise<void>>();

export function preloadProjectImages(slug: string) {
  const project = PROJECTS.find((item) => item.slug === slug);
  if (!project) return;
  for (const { src } of project.imgs) {
    if (images.has(src)) continue;
    const image = new window.Image();
    image.decoding = "async";
    image.fetchPriority = "low";
    image.src = src;
    images.set(
      src,
      image.decode().catch(() => {
        images.delete(src);
      }),
    );
  }
}

export function useProjectImages(slug: string | null) {
  useEffect(() => {
    if (slug) preloadProjectImages(slug);
  }, [slug]);
}
