export type Project = {
	/* Doubles as the /projects/<slug> route segment */
	slug: string;
	title: string;
	summary: string;
	completed: string;
};

/* Newest first — the featured grid renders them in this order */
export const PROJECTS: Project[] = [
	{
		slug: "coffee-companion",
		title: "Coffee Companion",
		summary:
			"An AI-powered coffee guide that logs brews and delivers personalized flavor-tuning recommendations.",
		completed: "Completed July 2026",
	},
	{
		slug: "nulloth",
		title: "Nulloth",
		summary:
			"An Electron app orchestrating parallel Claude and Codex coding agents across isolated git worktrees.",
		completed: "Completed May 2026",
	},
	{
		slug: "campus-security",
		title: "Campus Security",
		summary:
			"An AI-assisted dispatch platform for tracking, autofilling, and resolving campus safety incidents.",
		completed: "Completed April 2026",
	},
	{
		slug: "everleaf",
		title: "Everleaf",
		summary:
			"A data dashboard visualizing farm health, environmental metrics, and regional crop trends via REST API.",
		completed: "Completed November 2025",
	},
	{
		slug: "drawing-game",
		title: "Drawing Game",
		summary:
			"A real-time multiplayer drawing-and-guessing game built with Flask, MongoDB, and WebSockets.",
		completed: "Completed November 2025",
	},
];

export function getProject(slug: string): Project | undefined {
	return PROJECTS.find((project) => project.slug === slug);
}
