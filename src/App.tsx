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
import { Beads } from "./sections/Beads";
import { Intro } from "./components/Intro";
import { Cursor } from "./components/Cursor";
import { BackToTop } from "./components/Motion";
import { Thread } from "./components/Thread";
import { CommandBar } from "./components/CommandBar";
import { useEffect } from "react";
import { applyTheme, tick } from "./lib/prefs";

function App() {
  useLenis();
  useEffect(() => {
    applyTheme();
    // Soft tick on every button and link press, only when the visitor has turned sound on.
    const onClick = (e: MouseEvent) => { if ((e.target as HTMLElement).closest("a, button")) tick(); };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="bg-starch text-ink">
      <Intro />
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <Thread />
      <CommandBar />
      <TopBar />
      <main className="overflow-x-clip">
        <Hero />
        <Now />
        <Ribbon />
        <Work />
        <Lab />
        <About />
        <Process />
        <Beads />
        <Contact />
      </main>
      <BackToTop />
    </div>
  );
}

export default App;
