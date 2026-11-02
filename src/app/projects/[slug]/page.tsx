import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS, getProject } from "../../../lib/projects";
import Desktop from "../../../components/Desktop";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PROJECTS.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project
    ? { title: `${project.title} — Song Zhang`, description: project.summary }
    : { title: "Song Zhang" };
}
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  if (!getProject(slug)) notFound();
  return <Desktop initialProject={slug} />;
}
