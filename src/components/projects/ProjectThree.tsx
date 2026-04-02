import { Package } from "lucide-react";
import Icon from "../others/Icon";
import Image from "next/image";

export default function ProjectThree() {
	return (
		<div className="flex justify-center p-32">
			<div className="flex flex-col w-full max-w-4xl gap-4">
				<div className="flex">
					<div className="w-[50%]">
						<span>3.</span> Coffee Companion
						<div>
							Description of Coffee companion application here, and everything
							that it does. My first personal project.
						</div>
					</div>
					<div className="w-[50%]">
						<Image
							src="/coffee_companion.png"
							alt="Description"
							width={1000}
							height={1000}
						/>
						{/* Make image clickable, on hover have the arrow */}
						<div className="flex">
							<Icon label="Label" icon={<Package />} color="#ff0000" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
