import { GlobalStyles } from "./styles/GlobalStyles";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";

function App() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <HeroSection />
    </>
  );
}

export default App;
