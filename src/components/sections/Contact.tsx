export default function Contact() {
	return (
		<div className="flex justify-center p-32">
			<div className="flex flex-col w-full max-w-4xl gap-4">
				<div className="flex flex-col gap-1">
					<div className="text-2xl font-bold">Contact Me</div>
					<hr className="max-w-xs text-white/50"></hr>
				</div>

				<div className="flex">
					<div className="text-lg flex flex-col gap-4 text-gray-400 w-full">
						<div>
							I&apos;m always open to chatting, feel free to reach out using any
							of the methods below!
						</div>
						<div className="flex justify-evenly w-full">
							<div className="flex flex-col">
								<div>Button</div>
								<div>Email</div>
							</div>
							<div className="flex flex-col">
								<div>Button</div>
								<div>GitHub</div>
							</div>
							<div className="flex flex-col">
								<div>Button</div>
								<div>LinkedIn</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
