import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import ParticleBackground from './components/ParticleBackground';

function App() {
  return (
    <div className="min-h-screen bg-[#0a0b10] bg-gradient-to-br from-indigo-950/40 via-[#0a0b10] to-emerald-950/20 text-white w-full overflow-x-hidden selection:bg-indigo-500/30 selection:text-indigo-200 relative">
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
      </main>
    </div>
  )
}

export default App
