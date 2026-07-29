import Header from "../components/sections/Header";
import Introduction from "../components/sections/Introduction";
import About from "../components/sections/About";
import Projects from "../components/sections/Projects";
import Contact from "../components/sections/Contact";
import LoadupAnimation from "../components/others/LoadupAnimation";
import GridPattern from "../components/ui/GridPattern";

export default function Home() {
	return (
		<LoadupAnimation>
			<div className="relative font-sans bg-black">
				{/* Fixed so the grid spans the whole page rather than scrolling away */}
				<GridPattern
					width={80}
					height={80}
					className="fixed inset-0 z-0 h-screen w-screen opacity-8"
				/>

				<Header />
				<Introduction />
				<About />
				<Projects />
				<Contact />
			</div>
		</LoadupAnimation>
	);
}
