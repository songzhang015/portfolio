import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS, getProject } from "../../../lib/projects";
import GridPattern from "../../../components/ui/GridPattern";

type ProjectPageProps = {
	params: Promise<{ slug: string }>;
};

/* Prerenders one route per project; anything else 404s */
export function generateStaticParams() {
	return PROJECTS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
	params,
}: ProjectPageProps): Promise<Metadata> {
	const { slug } = await params;
	const project = getProject(slug);

	if (!project) {
		return { title: "Song Zhang" };
	}

	return {
		title: `${project.title} - Song Zhang`,
		description: project.summary,
	};
}

export default async function ProjectPage({ params }: ProjectPageProps) {
	const { slug } = await params;

	if (!getProject(slug)) {
		notFound();
	}

	/* Intentionally blank for now — the case studies still need writing, so the
	   page is just the same grid backdrop the rest of the site sits on */
	return (
		<main className="relative min-h-screen bg-black font-sans">
			{/* Fixed so the grid spans the whole page rather than scrolling away */}
			<GridPattern
				width={80}
				height={80}
				className="fixed inset-0 z-0 h-screen w-screen opacity-8"
			/>
		</main>
	);
}
