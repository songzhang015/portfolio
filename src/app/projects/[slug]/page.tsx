import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS, getProject } from "../../../lib/projects";

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

	/* Intentionally blank for now — the case studies still need writing */
	return <main className="min-h-screen bg-black" />;
}
