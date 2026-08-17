"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { cn } from "../../lib/utils";

type SquiggleVariant = "hero" | "experience" | "projects";

/* Cell size of the page background grid, and the x of its first vertical line.
   Both must track the GridPattern rendered in src/app/page.tsx */
const GRID_PX = 80;
const GRID_LINE_X = -0.5;

/* Variants that snap to the background grid: the pen starts one square inside
   the section on the `from` side and runs to the last grid line clear of the
   headline, which marks itself with data-squiggle-stop */
const GRID_FIT: Partial<Record<SquiggleVariant, { from: "left" | "right" }>> = {
	experience: { from: "left" },
	projects: { from: "right" },
};

/* Below this the section stacks and the squiggle has its row to itself, so it
   keeps its natural full-width size. Tracks Tailwind's `lg` */
const SIDE_BY_SIDE = "(min-width: 1024px)";

/* A fitted squiggle never draws shorter than this, so a wide headline can't
   squash it into a stub */
const MIN_SQUARES = 4;

/* Pen speed in viewBox units per second. Shared by every variant so all three
   squiggles draw at the same rate no matter how long their path is */
const SPEED = 378;

/* Seconds the gray trail runs behind the white pen. The erase head follows the
   gray by the same amount again */
const TRAIL_LAG = 1;

/* Seconds the band sits empty between one pass erasing and the next starting */
const REST_S = 1;

/* Rendered stroke weight, in device pixels at each breakpoint. Held in device
   pixels by vector-effect="non-scaling-stroke" rather than in viewBox units, so
   the pen keeps its weight instead of thinning out as the band scales down */
const STROKE_CLASS =
	"[stroke-width:4px] md:[stroke-width:5px] lg:[stroke-width:7px]";

/* Every design is drawn in a band this tall, so the three share a scale */
const BAND_HEIGHT = 200;

/* An anchor and its outgoing tangent handle. The incoming handle is the mirror
   of it, which is what keeps every join smooth — the curve can never corner */
type Anchor = { x: number; y: number; hx: number; hy: number };

const point = (x: number, y: number, hx: number, hy: number): Anchor => ({
	x,
	y,
	hx,
	hy,
});

/* Circle-to-bezier handle ratio for a quarter arc */
const ARC_K = 0.5523;

/* A cursive crossed loop: the pen rises off the baseline, runs three quarters
   of a circle counter-clockwise, then crosses its own upstroke on the way out.
   `dir` is 1 when the pen travels left to right, -1 when it travels right to
   left. `r` sets the size of the circle */
function loop(cx: number, base: number, r: number, dir: 1 | -1): Anchor[] {
	const cy = base - 1.5 * r;
	const arc = (degrees: number): Anchor => {
		const t = (degrees * Math.PI) / 180;
		return point(
			cx + dir * r * Math.cos(t),
			cy - r * Math.sin(t),
			dir * -Math.sin(t) * ARC_K * r,
			-Math.cos(t) * ARC_K * r,
		);
	};

	return [
		point(cx - dir * 1.85 * r, base, dir * 0.85 * r, -0.48 * r),
		arc(-45),
		arc(45),
		arc(135),
		arc(225),
		point(cx + dir * 1.75 * r, base, dir * r, 0.12 * r),
	];
}

/* A design is a run of waves and loops. Waves stretch when the squiggle is
   asked to cover more ground; loops only slide along, so they stay circular */
type Wave = { kind: "wave"; x: number; y: number; hx: number; hy: number };
type Loop = { kind: "loop"; cx: number; base: number; r: number; dir: 1 | -1 };
type Stroke = Wave | Loop;

const wave = (x: number, y: number, hx: number, hy: number): Wave => ({
	kind: "wave",
	x,
	y,
	hx,
	hy,
});

const loopAt = (cx: number, base: number, r: number, dir: 1 | -1): Loop => ({
	kind: "loop",
	cx,
	base,
	r,
	dir,
});

const DESIGNS: Record<SquiggleVariant, { width: number; strokes: Stroke[] }> = {
	/* Rolling wave that keeps changing its mind, through a wide loop and a
	   small one */
	hero: {
		width: 1920,
		strokes: [
			wave(0, 118, 100, 8),
			wave(185, 134, 70, 0),
			wave(335, 96, 70, -4),
			wave(475, 122, 60, 10),
			loopAt(625, 130, 34, 1),
			wave(840, 114, 70, -6),
			wave(975, 140, 70, 4),
			wave(1120, 84, 75, -4),
			wave(1270, 130, 65, 8),
			loopAt(1410, 134, 22, 1),
			wave(1580, 118, 65, -10),
			wave(1700, 92, 55, 0),
			wave(1820, 126, 55, 6),
			wave(1920, 108, 50, 0),
		],
	},

	/* Choppier rhythm that resolves into twin loops, small then large */
	experience: {
		width: 960,
		strokes: [
			wave(0, 126, 60, -14),
			wave(130, 90, 55, 6),
			wave(270, 124, 50, 6),
			loopAt(400, 126, 26, 1),
			loopAt(560, 126, 34, 1),
			wave(760, 112, 60, -10),
			wave(860, 92, 45, 2),
			wave(960, 106, 40, 0),
		],
	},

	/* Drawn right to left: one broad swoop into a single tall loop */
	projects: {
		width: 960,
		strokes: [
			wave(960, 108, -80, -2),
			wave(770, 132, -90, 8),
			wave(540, 86, -80, -4),
			loopAt(340, 124, 38, -1),
			wave(110, 104, -60, -6),
			wave(0, 116, -50, 0),
		],
	},
};

/* Lays a design out over `stretch` times its natural width. Waves are spread
   apart, loops keep their radius so the circles never turn into ellipses */
function anchorsFor(variant: SquiggleVariant, stretch: number): Anchor[] {
	return DESIGNS[variant].strokes.flatMap((stroke) =>
		stroke.kind === "wave"
			? [
					point(
						stroke.x * stretch,
						stroke.y,
						stroke.hx * stretch,
						stroke.hy,
					),
				]
			: loop(stroke.cx * stretch, stroke.base, stroke.r, stroke.dir),
	);
}

function toPath(anchors: Anchor[]): string {
	const round = (n: number) => Number(n.toFixed(2));
	let d = `M${round(anchors[0].x)},${round(anchors[0].y)}`;

	for (let i = 0; i < anchors.length - 1; i += 1) {
		const from = anchors[i];
		const to = anchors[i + 1];
		d +=
			` C${round(from.x + from.hx)},${round(from.y + from.hy)}` +
			` ${round(to.x - to.hx)},${round(to.y - to.hy)}` +
			` ${round(to.x)},${round(to.y)}`;
	}

	return d;
}

const pathFor = (variant: SquiggleVariant, stretch: number): string =>
	toPath(anchorsFor(variant, stretch));

function clamp(value: number, min: number, max: number): number {
	return Math.min(Math.max(value, min), max);
}

interface SquiggleProps {
	variant: SquiggleVariant;
	className?: string;
}

/* Where a grid-fitted squiggle ended up once its column had been measured */
type Fitted = {
	stretch: number;
	width: number;
	height: number;
	offset: number;
};

export default function Squiggle({ variant, className }: SquiggleProps) {
	const whiteRef = useRef<SVGPathElement | null>(null);
	const grayRef = useRef<SVGPathElement | null>(null);
	const svgRef = useRef<SVGSVGElement | null>(null);
	const [fitted, setFitted] = useState<Fitted | null>(null);

	useLayoutEffect(() => {
		const svg = svgRef.current;
		const column = svg?.parentElement;
		const fit = GRID_FIT[variant];

		if (!svg || !column || !fit) return undefined;

		const sideBySide = window.matchMedia(SIDE_BY_SIDE);
		const line = (x: number) => (x - GRID_LINE_X) / GRID_PX;
		const at = (n: number) => GRID_LINE_X + n * GRID_PX;
		const headline = svg
			.closest("section")
			?.querySelector("[data-squiggle-stop]");

		/* Where the headline's ink actually starts and ends. Its box spans the
		   whole half, so the lines themselves have to be measured: the pen
		   stops at the outermost glyph, the E of EXPERIENCE or the S of
		   PROJECTS, whichever line reaches furthest */
		const glyphEdge = () => {
			if (!headline) return null;

			const walker = document.createTreeWalker(headline, NodeFilter.SHOW_TEXT);
			const range = document.createRange();
			let left = Infinity;
			let right = -Infinity;

			for (let node = walker.nextNode(); node; node = walker.nextNode()) {
				range.selectNodeContents(node);

				for (const rect of range.getClientRects()) {
					if (rect.width === 0) continue;

					left = Math.min(left, rect.left);
					right = Math.max(right, rect.right);
				}
			}

			return left < right ? { left, right } : null;
		};

		const layout = () => {
			const box = column.getBoundingClientRect();
			const text = glyphEdge();

			if (box.width === 0 || !text || !sideBySide.matches) {
				setFitted(null);
				return;
			}

			const fromLeft = fit.from === "left";

			/* One square in from the section edge, then out to the last line
			   that still clears the headline */
			const start = at(Math.round(line(fromLeft ? box.left : box.right)));
			const stop = at(
				fromLeft
					? Math.floor(line(text.left))
					: Math.ceil(line(text.right)),
			);

			const span = fromLeft ? stop - start : start - stop;

			if (span < MIN_SQUARES * GRID_PX) {
				setFitted(null);
				return;
			}

			setFitted((current) => {
				const next = {
					stretch: span / box.width,
					width: span,
					/* The pen keeps the size the column would have given it, so
					   every squiggle draws at one weight however far it runs */
					height: (box.width * BAND_HEIGHT) / DESIGNS[variant].width,
					offset: (fromLeft ? start : stop) - box.left,
				};

				return current &&
					current.stretch === next.stretch &&
					current.offset === next.offset
					? current
					: next;
			});
		};

		layout();

		/* Web fonts land after first paint and move the headline, so the stop
		   has to be taken again once they do */
		void document.fonts?.ready.then(layout);

		const observer = new ResizeObserver(layout);
		observer.observe(column);
		if (headline) observer.observe(headline);
		window.addEventListener("resize", layout);
		sideBySide.addEventListener("change", layout);

		return () => {
			observer.disconnect();
			window.removeEventListener("resize", layout);
			sideBySide.removeEventListener("change", layout);
		};
	}, [variant]);

	const path = useMemo(
		() => pathFor(variant, fitted?.stretch ?? 1),
		[variant, fitted?.stretch],
	);

	useEffect(() => {
		const white = whiteRef.current;
		const gray = grayRef.current;
		const svg = svgRef.current;

		if (!white || !gray || !svg) return undefined;

		const total = white.getTotalLength();
		const cycle = total / SPEED + 2 * TRAIL_LAG + REST_S;

		/* A zero-length dash still paints a dot under the round linecap, so an
		   empty span is hidden outright rather than drawn */
		const paint = (path: SVGPathElement, from: number, to: number) => {
			const length = Math.max(to - from, 0);
			path.style.strokeDasharray = `${length} ${total}`;
			path.style.strokeDashoffset = `${-from}`;
			path.style.opacity = length > 0 ? "1" : "0";
		};

		const showWholePath = () => {
			paint(white, 0, total);
			paint(gray, 0, 0);
		};

		let elapsed = 0;
		let visible = true;
		let last = performance.now();
		let frame = 0;

		const observer = new IntersectionObserver(
			([entry]) => {
				visible = entry?.isIntersecting ?? true;
			},
			{ threshold: 0 },
		);
		observer.observe(svg);

		const animate = (now: number) => {
			const dt = Math.min((now - last) / 1000, 0.05);
			last = now;

			if (visible) {
				elapsed = (elapsed + dt) % cycle;

				const head = clamp(elapsed * SPEED, 0, total);
				const trail = clamp((elapsed - TRAIL_LAG) * SPEED, 0, total);
				const erase = clamp((elapsed - 2 * TRAIL_LAG) * SPEED, 0, total);

				paint(white, trail, head);
				paint(gray, erase, trail);
			}

			frame = requestAnimationFrame(animate);
		};

		const query = window.matchMedia("(prefers-reduced-motion: reduce)");

		const sync = () => {
			cancelAnimationFrame(frame);

			if (query.matches) {
				showWholePath();
				return;
			}

			elapsed = 0;
			last = performance.now();
			frame = requestAnimationFrame(animate);
		};

		sync();
		query.addEventListener("change", sync);

		return () => {
			cancelAnimationFrame(frame);
			observer.disconnect();
			query.removeEventListener("change", sync);
		};
	}, [variant, path]);

	const design = DESIGNS[variant];

	return (
		<svg
			ref={svgRef}
			aria-hidden="true"
			viewBox={`0 0 ${design.width * (fitted?.stretch ?? 1)} ${BAND_HEIGHT}`}
			fill="none"
			preserveAspectRatio="xMidYMid meet"
			style={
				fitted
					? {
							width: fitted.width,
							height: fitted.height,
							transform: `translateX(${fitted.offset}px)`,
						}
					: undefined
			}
			className={cn("pointer-events-none block h-auto w-full", className)}
		>
			<path
				ref={grayRef}
				d={path}
				className={cn("stroke-gray-dark", STROKE_CLASS)}
				vectorEffect="non-scaling-stroke"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeDasharray="0 1"
				style={{ opacity: 0 }}
			/>
			<path
				ref={whiteRef}
				d={path}
				className={cn("stroke-white", STROKE_CLASS)}
				vectorEffect="non-scaling-stroke"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeDasharray="0 1"
				style={{ opacity: 0 }}
			/>
		</svg>
	);
}

export type { SquiggleVariant };
