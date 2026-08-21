import { useLenis } from "./lib/useLenis";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Process } from "./sections/Process";
import { Stack } from "./sections/Stack";
import { Work } from "./sections/Work";
import { Services } from "./sections/Services";
import { Contact } from "./sections/Contact";

function App() {
  useLenis();

  return (
    <div className="bg-ground text-text">
      <Nav />
      <Hero />
      <About />
      <Process />
      <Stack />
      <Work />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
