export default function About() {
	return (
		<div className="flex justify-center p-32">
			<div className="flex flex-col w-full max-w-4xl  gap-4">
				<div className="flex flex-col gap-1">
					<div className="text-2xl font-bold">About Me</div>
					<hr className="max-w-xs text-white/50"></hr>
				</div>

				<div className="flex">
					<div className="text-lg flex flex-col gap-4 text-gray-400 max-w-[50%]">
						<div>Hello there!</div>
						<div>
							I&apos;m passionate about designing, building, and collaborating
							with others to create software that I&apos;m proud of. Currently
							I&apos;m exploring cloud infrastructure and scalability.
						</div>
						<div>
							Outside of tech, I love hiking and traveling with friends
							outdoors, and over the next few years I hope to explore some of
							Oregon&apos;s tallest mountain peaks.
						</div>
						<div>
							Please feel free to reach out or connect if you&apos;d like to
							collaborate or chat!
						</div>
					</div>
					<div>Picture Here</div>
				</div>
			</div>
		</div>
	);
}
