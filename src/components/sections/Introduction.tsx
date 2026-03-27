export default function Introduction() {
	return (
		<div className="flex justify-center items-center h-screen">
			<div className="flex flex-col w-full max-w-5xl gap-4">
				<div className="text-lg text-sky-blue">Hi, I&apos;m</div>
				<div className="text-6xl font-bold">Song Zhang</div>
				<div className="text-2xl text-gray-400">
					A software engineer attending the University of Oregon.
				</div>
				<div className="text-2xl text-gray-400">
					Feel free to reach out at any time!
				</div>
				<button className="text-lg border border-sky-blue text-sky-blue mt-1 self-start px-6 py-3 cursor-pointer">
					Say Hello
				</button>
			</div>
		</div>
	);
}
