import ProjectOne from "../projects/ProjectOne";
import ProjectTwo from "../projects/ProjectTwo";
import ProjectThree from "../projects/ProjectThree";

export default function Projects() {
	return (
		<div className="flex flex-col gap-48">
			<ProjectOne />
			<ProjectTwo />
			<ProjectThree />
		</div>
	);
}
