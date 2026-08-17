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
			"Logs every brew you pull and turns that history into flavor tuning you can act on the next morning.",
			"Each entry captures what actually changes the cup: roast, grind, dose, ratio, and water temperature, alongside your own scores for aroma, acidity, sweetness, body, and flavor.",
			"Claude reads the log against those scores and traces a sour cup back to its cause, rather than just naming the flaw.",
			"Suggestions come back as a conversation: warm the water to 200F, add 2g of coffee, shift to medium-coarse, and here is what each change should do.",
			"Accounts support Google sign-in and email verification, with each brew log tied to the account that created it.",
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
			"An Electron desktop app that runs several coding agents at once, closer to agent infrastructure than to another chat window.",
			"Claude and Codex work side by side, each in its own git worktree, so parallel runs never fight over the same files.",
			"A Linear-inspired dark workbench keeps live terminals, chat transcripts, diff review, and per-agent run settings in one view.",
			"An MCP recommender, a skills system, Semgrep scanning, and SQLite-backed session persistence handle the parts that make long runs survivable.",
			"Commit and lane actions, project setup, and a control panel round it out, so a dozen concurrent runs stay legible.",
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
			"A dispatch platform for campus safety teams: open an incident, move it through triage, and hand the board off cleanly at shift change.",
			"Dispatchers work each case from an editable side panel, with server-side filtering by status, priority, and timeframe across the full history.",
			"AI drafts an incident from a plain-language description, writes the high and critical alerts that go out over SMS and email, and summarizes a shift for whoever takes it next.",
			"The dashboard caches its stats and analytics, so the numbers are already there when someone opens it mid-shift.",
			"Dispatcher sessions run on HTTP-only cookies with JWT-based authentication.",
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
			"A dashboard for reading farm health across regions, pairing environmental metrics with crop data to show what moves together.",
			"A Flask REST API serves farm details, health indices, and geo-coordinates to the interactive maps and a rotating globe.",
			"The statistics run on the backend, including linear regression between features and regional field averages, instead of being pushed onto the browser.",
			"Charts, scatterplots, and per-region breakdowns make patterns in metrics like rainfall and crop type readable at a glance.",
			"Accounts and per-user data sit on MongoDB, so the regions someone saves stay their own.",
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
			"An online multiplayer game where one player sketches a word and everyone else races to guess it.",
			"WebSockets keep the canvas, chat, timers, prompts, and player list in sync across the room, stroke by stroke.",
			"The server owns rooms, turns, scoring, word banks, and the hint reveal, so no client can read ahead to the answer.",
			"Docker Compose bundles the Flask app and MongoDB, bringing the whole game up with one command.",
			"Deployed on Render, with rooms created and joined through a shared link.",
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
