import type { IconType } from "react-icons";
import { SiClaude, SiOpenai } from "react-icons/si";

type Tech = {
	label: string;
	/* Devicon font class; "colored" pulls the brand color from the CDN stylesheet */
	className?: string;
	/* Used for marks devicon doesn't ship — rendered in currentColor unless tinted */
	Icon?: IconType;
	/* Brand color for react-icons marks, since they carry no color of their own */
	color?: string;
};

/* Flask, Socket.IO, and Codex are near-black brand marks, so they stay in
   currentColor rather than disappearing into the background */
const TECH: Record<string, Tech> = {
	react: { label: "React", className: "devicon-react-original colored" },
	typescript: {
		label: "TypeScript",
		className: "devicon-typescript-plain colored",
	},
	javascript: {
		label: "JavaScript",
		className: "devicon-javascript-plain colored",
	},
	python: { label: "Python", className: "devicon-python-plain colored" },
	flask: { label: "Flask", className: "devicon-flask-original" },
	mongodb: { label: "MongoDB", className: "devicon-mongodb-plain colored" },
	sqlite: { label: "SQLite", className: "devicon-sqlite-plain colored" },
	electron: {
		label: "Electron",
		className: "devicon-electron-original colored",
	},
	html: { label: "HTML", className: "devicon-html5-plain colored" },
	css: { label: "CSS", className: "devicon-css3-plain colored" },
	websockets: {
		label: "WebSockets",
		className: "devicon-socketio-original",
	},
	claude: { label: "Claude", Icon: SiClaude, color: "#D97757" },
	codex: { label: "Codex", Icon: SiOpenai },
};

export type TechKey = keyof typeof TECH;

export default function TechIcon({ name }: { name: TechKey }) {
	const tech = TECH[name];

	if (tech.Icon) {
		return (
			<tech.Icon
				role="img"
				aria-label={tech.label}
				style={tech.color ? { color: tech.color } : undefined}
			/>
		);
	}

	return <i role="img" aria-label={tech.label} className={tech.className} />;
}
