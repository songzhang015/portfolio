import { Package } from "lucide-react";
import Icon from "../others/Icon";

export default function ProjectOne() {
	return (
		<div className="">
			<div>
				<span>1.</span> Coffee Companion
				<div>
					Description of Coffee companion application here, and everything that
					it does. My first personal project.
				</div>
				<button>GitHub</button>
			</div>
			<div>
				<div>Image</div>
				<div className="flex">
					<Icon label="Label" icon={<Package />} color="#ff0000" />
				</div>
			</div>
		</div>
	);
}
