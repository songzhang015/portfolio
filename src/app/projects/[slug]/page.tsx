import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS, getProject } from "../../../lib/projects";
import GridPattern from "../../../components/ui/GridPattern";
import Header from "../../../components/sections/Header";

type ProjectPageProps = {
	params: Promise<{ slug: string }>;
};

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

	return (
		<div className="relative min-h-screen bg-black font-sans">
			<GridPattern
				width={80}
				height={80}
				className="fixed inset-0 z-0 h-screen w-screen opacity-8"
			/>

			<Header />

			<main className="relative z-10 min-h-screen" />
		</div>
	);
}
