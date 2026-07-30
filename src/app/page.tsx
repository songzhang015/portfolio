import Header from "../components/sections/Header";
import Introduction from "../components/sections/Introduction";
import Experience from "../components/sections/Experience";
// import About from "../components/sections/About";
import Projects from "../components/sections/Projects";
import Contact from "../components/sections/Contact";
import LoadupAnimation from "../components/others/LoadupAnimation";
import GridPattern from "../components/ui/GridPattern";

/* Breathing room between sections where only the background grid shows through.
   Each section's particles fade out before they reach it — see ParticleField's edgeFade. */
function SectionGap() {
    return <div aria-hidden="true" className="h-[10vh]" />;
}

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
                <SectionGap />
                <Experience />
                {/* <About /> */}
                <SectionGap />
                <Projects />
                <SectionGap />
                <Contact />
            </div>
        </LoadupAnimation>
    );
}
