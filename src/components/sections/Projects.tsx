import ProjectOne from "../projects/ProjectOne";
import ProjectTwo from "../projects/ProjectTwo";
import ProjectThree from "../projects/ProjectThree";

export default function Projects() {
	return (
		<section
			id="projects"
			className="flex flex-col gap-[30vh] mt-[30vh]"
		>
			<ProjectOne />
			<ProjectTwo />
			<ProjectThree />
		</section>
	);
}
