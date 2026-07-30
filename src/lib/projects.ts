import type { TechKey } from "../components/ui/TechIcon";

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
		repoUrl: "https://github.com/songzhang015/coffee-companion",
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
	},
	{
		slug: "everleaf",
		title: "Everleaf",
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
	},
];

export function getProject(slug: string): Project | undefined {
	return PROJECTS.find((project) => project.slug === slug);
}
