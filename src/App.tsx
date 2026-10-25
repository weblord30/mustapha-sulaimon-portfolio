import { useLenis } from "./lib/useLenis";
import { TopBar } from "./components/TopBar";
import { Hero } from "./sections/Hero";
import { Now } from "./sections/Now";
import { Work } from "./sections/Work";
import { Lab } from "./sections/Lab";
import { About } from "./sections/About";
import { Process } from "./sections/Process";
import { Contact } from "./sections/Contact";
import { Ribbon } from "./sections/Ribbon";
import { Intro } from "./components/Intro";
import { Cursor } from "./components/Cursor";
import { BackToTop } from "./components/Motion";

function App() {
  useLenis();

  return (
    <div className="bg-starch text-ink">
      <Intro />
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <TopBar />
      <main className="overflow-x-clip">
        <Hero />
        <Now />
        <Ribbon />
        <Work />
        <Lab />
        <About />
        <Process />
        <Contact />
      </main>
      <BackToTop />
    </div>
  );
}

export default App;
