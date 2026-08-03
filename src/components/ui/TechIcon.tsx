import type { ComponentType, SVGProps } from "react";
import { BsOpenai } from "react-icons/bs";
import { SiClaude } from "react-icons/si";

type Tech = {
	label: string;
	/* Devicon font class; "colored" pulls the brand color from the CDN stylesheet */
	className?: string;
	/* Path to a multicolor brand SVG under public/, drawn at 1em */
	src?: string;
	/* Used for marks devicon doesn't ship — rendered in currentColor unless tinted */
	Icon?: ComponentType<SVGProps<SVGSVGElement>>;
	/* Brand color for react-icons marks, since they carry no color of their own */
	color?: string;
};

function WebSocketMark(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			viewBox="0 0 256 193"
			fill="currentColor"
			width="1.33em"
			height="1em"
			{...props}
		>
			<path d="M192.44 144.645h31.78V68.339l-35.805-35.804l-22.472 22.472l26.497 26.497zm31.864 15.931H113.452L86.954 134.08l11.237-11.236l21.885 21.885h45.028l-44.357-44.441l11.32-11.32l44.357 44.358v-45.03l-21.801-21.801l11.152-11.153L110.685 0H0l31.696 31.696v.084h65.74l23.227 23.227l-33.96 33.96L63.476 65.74V47.712h-31.78v31.193l55.007 55.007L64.314 156.3l35.805 35.805H256z" />
		</svg>
	);
}

/* Flask, WebSockets, and Codex are near-black brand marks, so they stay in
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
	python: { label: "Python", src: "/logos/python.svg" },
	flask: { label: "Flask", className: "devicon-flask-original" },
	mongodb: { label: "MongoDB", src: "/logos/mongodb.svg" },
	sqlite: { label: "SQLite", className: "devicon-sqlite-plain colored" },
	electron: { label: "Electron", src: "/logos/electron.svg" },
	html: { label: "HTML", className: "devicon-html5-plain colored" },
	css: { label: "CSS", className: "devicon-css3-plain colored" },
	websockets: { label: "WebSockets", Icon: WebSocketMark },
	claude: { label: "Claude", Icon: SiClaude, color: "#D97757" },
	codex: { label: "Codex", Icon: BsOpenai },
};

export type TechKey = keyof typeof TECH;

export default function TechIcon({ name }: { name: TechKey }) {
	const tech = TECH[name];

	if (tech.src) {
		return (
			// eslint-disable-next-line @next/next/no-img-element
			<img
				src={tech.src}
				alt={tech.label}
				className="h-[1em] w-[1em] shrink-0"
			/>
		);
	}

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
