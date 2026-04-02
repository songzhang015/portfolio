import { Package } from "lucide-react";
import { SiNextdotjs, SiReact, SiFlask, SiMongodb } from "react-icons/si";
import { Python } from "svgl-react";
import Icon from "../others/Icon";
import Image from "next/image";

export default function ProjectOne() {
	return (
		<div className="flex justify-center p-32">
			<div className="flex flex-col w-full max-w-4xl gap-4">
				{/* Projects Header */}
				<div className="flex flex-col gap-1 items-end">
					<div className="text-2xl font-bold">My Projects</div>
					<hr className="w-full max-w-xs text-white/50"></hr>
				</div>

				<div className="flex">
					<div className="w-[50%]">
						<span>1.</span> Coffee Companion
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
						<div className="flex justify-between mt-4">
							<Icon
								label="Next.js"
								icon={<SiNextdotjs className="w-6 h-6" />}
								color="#ffffff"
							/>
							<Icon
								label="React"
								icon={<SiReact className="w-6 h-6" />}
								color="#61DAFB"
							/>
							<Icon
								label="Python"
								icon={<Python className="w-10 h-10" />}
								color=""
							/>
							<Icon
								label="Flask"
								icon={<SiFlask className="w-6 h-6" />}
								color="#ffffff"
							/>
							<Icon
								label="MongoDB"
								icon={<SiMongodb className="w-6 h-6" />}
								color="#47A248"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
