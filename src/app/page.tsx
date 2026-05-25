import Header from "../components/sections/Header";
import Introduction from "../components/sections/Introduction";
import About from "../components/sections/About";
import Projects from "../components/sections/Projects";
import Contact from "../components/sections/Contact";
import LoadupAnimation from "../components/others/LoadupAnimation";
import CursorGlow from "../components/others/CursorGlow";

export default function Home() {
	return (
		<LoadupAnimation>
			<div className="font-sans bg-oxford-blue">
				<CursorGlow />
				<Header />
				<Introduction />
				<About />
				<Projects />
				<Contact />
			</div>
		</LoadupAnimation>
	);
}
