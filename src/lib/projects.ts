import type { TechKey } from "../components/ui/TechIcon";

export type ProjectImage = {
	src: string;
	/* Scales the image inside its frame — 1.3 zooms 30% into the center */
	zoom?: number;
	/* Which edge of the image stays in frame when it's cropped — defaults to center */
	align?: keyof typeof IMAGE_ALIGNMENTS;
};

export const IMAGE_ALIGNMENTS = {
	left: "object-left",
	right: "object-right",
	top: "object-top",
	bottom: "object-bottom",
	"top-left": "object-top-left",
} as const;

export type Project = {
	/* Doubles as the /projects/<slug> route segment */
	slug: string;
	title: string;
	/* Descriptor shown above the rotating sentences on the project page */
	altTitle: string;
	summary: string;
	/* Rotated one at a time on the project page, like the hero blurbs */
	sentences: string[];
	/* Keys into the TechIcon registry, rendered in this order */
	tech: TechKey[];
	completed: string;
	repoUrl: string;
	/* Featured-card image; the card falls back to a placeholder without it */
	card?: ProjectImage;
	/* Project-page panels in slot order — the first fills the tall left slot */
	gallery?: ProjectImage[];
};

/* Newest first — the featured grid renders them in this order */
export const PROJECTS: Project[] = [
	{
		slug: "coffee-companion",
		title: "Coffee Companion",
		altTitle: "AI-Powered Coffee Guide",
		summary:
			"An AI-powered coffee guide that logs brews and delivers personalized flavor-tuning recommendations.",
		sentences: [
			"Helps users identify key elements in their coffee and tune future brews toward preferred flavor and aroma notes.",
			"Features an easy-to-use interface for logging brews.",
			"Uses logged brew data, sensory feedback, and key coffee metrics like aroma, acidity, sweetness, body, and flavor to generate tailored recommendations.",
			"Supports core functionality including brew logging, guided tasting, and entry management, along with tuning suggestions based on user input.",
			"Includes account features such as email/password login, third-party authentication, and verification.",
		],
		tech: ["react", "typescript", "python", "flask", "claude", "mongodb"],
		completed: "Completed July 2026",
		repoUrl: "https://github.com/songzhang015/coffee-companion-v2",
		card: { src: "/projects/coffee-companion/landing.png" },
		gallery: [
			{ src: "/projects/coffee-companion/recommendations.jpeg", align: "top" },
			{ src: "/projects/coffee-companion/login.png" },
			{ src: "/projects/coffee-companion/new-entry.png" },
		],
	},
	{
		slug: "nulloth",
		title: "Nulloth",
		altTitle: "Multi-Agent Coding Orchestrator",
		summary:
			"An Electron app orchestrating parallel Claude and Codex coding agents across isolated git worktrees.",
		sentences: [
			"An Electron desktop app that orchestrates multiple AI coding agents in parallel, going beyond a single chat loop into full agent infrastructure.",
			"Runs both Claude and Codex agents side by side, each working in its own isolated git worktree lane.",
			"Features a Linear-inspired dark workbench with live terminals, chat transcripts, diff review, and per-agent run settings.",
			"Includes supporting infrastructure like an MCP recommender, a skills system, Semgrep scanning, and SQLite-backed session persistence.",
			"Provides a project landing and setup flow, git commit/lane actions, and a control panel for monitoring and managing concurrent agent runs.",
		],
		tech: ["electron", "typescript", "react", "claude", "codex", "sqlite"],
		completed: "Completed May 2026",
		repoUrl: "https://github.com/flamboh/beaver-hacks-2026",
		card: { src: "/projects/nulloth/control-panel.png", align: "top-left" },
		gallery: [
			{ src: "/projects/nulloth/skills.png", align: "top" },
			{ src: "/projects/nulloth/review.png" },
			{ src: "/projects/nulloth/agents.png" },
		],
	},
	{
		slug: "campus-security",
		title: "Campus Security",
		altTitle: "AI-Assisted Campus Incident Dispatch",
		summary:
			"An AI-assisted dispatch platform for tracking, autofilling, and resolving campus safety incidents.",
		sentences: [
			"A full-stack incident management platform for campus safety dispatch teams to track incidents, manage workflows, and hand off shifts.",
			"Supports incident creation, dispatch tracking, and resolution workflows through an editable side-panel interface.",
			"Offers server-side filtering by status, priority, and timeframe, plus a dashboard with cached stats and incident analytics.",
			"Uses AI to autofill incidents from descriptions, generate high/critical emergency responses over SMS and email, and write dispatcher shift-handoff summaries.",
			"Secures access with HTTP-only session cookies and JWT-based authentication.",
		],
		tech: ["flask", "mongodb", "typescript", "python", "react"],
		completed: "Completed April 2026",
		repoUrl: "https://github.com/songzhang015/campus-security",
		card: { src: "/projects/campus-security/sign-in.png", zoom: 1.4 },
		gallery: [
			{ src: "/projects/campus-security/incident-panel.jpeg", align: "top" },
			{ src: "/projects/campus-security/dashboard.png" },
			{ src: "/projects/campus-security/alert-drafts.png" },
		],
	},
	{
		slug: "everleaf",
		title: "EverLeaf",
		altTitle: "Farm Health Analytics Dashboard",
		summary:
			"A data dashboard visualizing farm health, environmental metrics, and regional crop trends via REST API.",
		sentences: [
			"A data-driven dashboard for exploring agricultural farm data, environmental metrics, and crop health across regions.",
			"Serves farm details, health indices, and geo-coordinates through a REST API, powering interactive maps and a rotating globe.",
			"Runs statistical analysis on the backend, including linear regression between features and regional field averages.",
			"Visualizes trends with rich charts, scatterplots, and per-region breakdowns for metrics like rainfall and crop type.",
			"Handles user accounts and authentication, with per-user data managed on top of a MongoDB store.",
		],
		tech: ["react", "typescript", "python", "flask", "mongodb"],
		completed: "Completed November 2025",
		repoUrl: "https://github.com/Tyrost/EverLeaf",
		card: { src: "/projects/everleaf/hero.png", align: "left" },
		gallery: [
			{ src: "/projects/everleaf/features.jpeg" },
			{ src: "/projects/everleaf/highlights.png" },
			{ src: "/projects/everleaf/analytics.png" },
		],
	},
	{
		slug: "drawing-game",
		title: "Drawing Game",
		altTitle: "Multiplayer Drawing Guessing Game",
		summary:
			"A real-time multiplayer drawing-and-guessing game built with Flask, MongoDB, and WebSockets.",
		sentences: [
			"An online multiplayer drawing-and-guessing game where one player sketches a word while others race to guess it.",
			"Syncs the canvas, chat, timers, prompts, and player state live across every player in a room in real time.",
			"Manages rooms, turns, scoring, word banks, and a hint-reveal system with clear server-versus-client authority.",
			"Runs entirely containerized with Docker, bundling the Flask app and MongoDB into a single docker compose up.",
			"Built as an MVP for CS 322 at the University of Oregon, with a live deployment on Render.",
		],
		tech: [
			"html",
			"css",
			"javascript",
			"python",
			"flask",
			"websockets",
		],
		completed: "Completed November 2025",
		repoUrl: "https://github.com/songzhang015/cs-322-final-project",
		card: { src: "/projects/drawing-game/lobby.png", zoom: 1.1 },
		gallery: [
			{ src: "/projects/drawing-game/canvas.jpeg", align: "top" },
			{ src: "/projects/drawing-game/drawing.png" },
			{ src: "/projects/drawing-game/guessing.png" },
		],
	},
];

export function getProject(slug: string): Project | undefined {
	return PROJECTS.find((project) => project.slug === slug);
}
