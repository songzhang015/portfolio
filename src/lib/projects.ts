export type Screenshot = { src: string; align?: string };
export type Project = {
  slug: string;
  preview: string;
  title: string;
  altTitle: string;
  tag: "peach" | "lilac" | "mint";
  summary: string;
  sentences: string[];
  tech: string[];
  completed: string;
  repoUrl: string;
  imgs: Screenshot[];
};
export const TECH: Record<string, string> = {
  react: "React",
  typescript: "TypeScript",
  javascript: "JavaScript",
  python: "Python",
  flask: "Flask",
  mongodb: "MongoDB",
  sqlite: "SQLite",
  electron: "Electron",
  html: "HTML",
  css: "CSS",
  websockets: "WebSockets",
  claude: "Claude",
  codex: "Codex",
};
export const PROJECTS: Project[] = [
  {
    slug: "coffee-companion",
    preview: "/projects/coffee-companion/preview.webp",
    summary:
      "An AI-powered coffee guide that logs brews and delivers personalized flavor-tuning recommendations.",
    title: "Coffee Companion",
    altTitle: "AI-Powered Coffee Guide",
    tag: "peach",
    tech: ["react", "typescript", "python", "flask", "claude", "mongodb"],
    completed: "Completed July 2026",
    repoUrl: "https://github.com/songzhang015/coffee-companion-v2",
    imgs: [
      {
        src: "/projects/coffee-companion/landing.webp",
      },
      {
        src: "/projects/coffee-companion/recommendations.webp",
        align: "top",
      },
      {
        src: "/projects/coffee-companion/login.webp",
      },
      {
        src: "/projects/coffee-companion/new-entry.webp",
      },
    ],
    sentences: [
      "Coffee logger with built in agent to tune and improve your coffee brews.",
      "Uses an algorithm taking various parameters like coffee amount, temperatures, grind size, and more to calculate a score for an agent to review and give personalized feedback.",
    ],
  },
  {
    slug: "nulloth",
    preview: "/projects/nulloth/preview.webp",
    summary:
      "An Electron app orchestrating parallel Claude and Codex coding agents across isolated git worktrees.",
    title: "Nulloth",
    altTitle: "Multi-Agent Coding Orchestrator",
    tag: "lilac",
    tech: ["electron", "typescript", "react", "claude", "codex", "sqlite"],
    completed: "Completed May 2026",
    repoUrl: "https://github.com/flamboh/beaver-hacks-2026",
    imgs: [
      {
        src: "/projects/nulloth/control-panel.webp",
        align: "top-left",
      },
      {
        src: "/projects/nulloth/skills.webp",
        align: "top",
      },
      {
        src: "/projects/nulloth/review.webp",
      },
      {
        src: "/projects/nulloth/agents.webp",
      },
    ],
    sentences: [
      "Electron desktop app facilitating multiple coding agents with support for both Claude and Codex to work side by side in its own git worktree.",
      "Includes an MCP and skill recommender and Semgrep scanning for security.",
    ],
  },
  {
    slug: "campus-security",
    preview: "/projects/campus-security/preview.webp",
    summary:
      "An AI-assisted dispatch platform for tracking, autofilling, and resolving campus safety incidents.",
    title: "Campus Security",
    altTitle: "AI-Assisted Campus Incident Dispatch",
    tag: "mint",
    tech: ["flask", "mongodb", "typescript", "python", "react"],
    completed: "Completed April 2026",
    repoUrl: "https://github.com/songzhang015/campus-security",
    imgs: [
      {
        src: "/projects/campus-security/dashboard.webp",
        align: "top-left",
      },
      {
        src: "/projects/campus-security/incident-panel.webp",
        align: "top",
      },
      {
        src: "/projects/campus-security/alert-drafts.webp",
      },
      {
        src: "/projects/campus-security/sign-in.webp",
      },
    ],
    sentences: [
      "Incident dispatch platform for campus safety teams, with workflows to open incidents, move through triage, and hand off issues at shift change.",
      "Includes AI-assisted form filling, verification, and alerting.",
    ],
  },
  {
    slug: "everleaf",
    preview: "/projects/everleaf/preview.webp",
    summary:
      "A data dashboard visualizing farm health, environmental metrics, and regional crop trends via REST API.",
    title: "EverLeaf",
    altTitle: "Farm Health Analytics Dashboard",
    tag: "peach",
    tech: ["react", "typescript", "python", "flask", "mongodb"],
    completed: "Completed November 2025",
    repoUrl: "https://github.com/Tyrost/EverLeaf",
    imgs: [
      {
        src: "/projects/everleaf/hero.webp",
        align: "left",
      },
      {
        src: "/projects/everleaf/features.webp",
      },
      {
        src: "/projects/everleaf/highlights.webp",
      },
      {
        src: "/projects/everleaf/analytics.webp",
      },
    ],
    sentences: [
      "Team dashboard for reading and analyzing farm health across multiple regions, using crop data and various metrics to find and form patterns.",
    ],
  },
  {
    slug: "drawing-game",
    preview: "/projects/drawing-game/preview.webp",
    summary:
      "A real-time multiplayer drawing-and-guessing game built with Flask, MongoDB, and WebSockets.",
    title: "Drawing Game",
    altTitle: "Multiplayer Drawing Guessing Game",
    tag: "lilac",
    tech: ["html", "css", "javascript", "python", "flask", "websockets"],
    completed: "Completed November 2025",
    repoUrl: "https://github.com/songzhang015/cs-322-final-project",
    imgs: [
      {
        src: "/projects/drawing-game/lobby.webp",
      },
      {
        src: "/projects/drawing-game/canvas.webp",
        align: "top",
      },
      {
        src: "/projects/drawing-game/drawing.webp",
      },
      {
        src: "/projects/drawing-game/guessing.webp",
      },
    ],
    sentences: [
      "Online multiplayer drawing game using WebSockets.",
      "One player sketches a word, everyone else tries to guess it as fast as possible.",
    ],
  },
];
export const ROLES = [
  {
    company: "QuackHacks",
    file: "quackhacks.md",
    role: "Software Engineer",
    meta: "June 2026 - Present · Eugene, OR",
    summary:
      "University of Oregon's premier hackathon, hosting hundreds of students from over 30 different schools to collaborate together across a 24-hour event.",
  },
  {
    company: "Synrax",
    file: "synrax.md",
    role: "Co-Founder & Project Manager",
    meta: "January 2026 - May 2026 · Eugene, OR",
    summary:
      "AI code-review platform integrated with GitHub to review pull requests and generate smoke and unit tests, built for developers and engineering managers.",
  },
];
export function getProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}
