import { useLenis } from "./lib/useLenis";
import { TopBar } from "./components/TopBar";
import { Hero } from "./sections/Hero";
import { Now } from "./sections/Now";
import { Work } from "./sections/Work";
import { Lab } from "./sections/Lab";
import { About } from "./sections/About";
import { Process } from "./sections/Process";
import { Contact } from "./sections/Contact";

function App() {
  useLenis();

  return (
    <div className="bg-starch text-ink">
      <TopBar />
      <main>
        <Hero />
        <Now />
        <Work />
        <Lab />
        <About />
        <Process />
        <Contact />
      </main>
    </div>
  );
}

export default App;
