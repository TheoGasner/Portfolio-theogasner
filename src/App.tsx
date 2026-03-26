import { AnimatedBackground, ScrollProgress, CustomCursor, Header, Footer } from './components/common';
import {
  HeroSection,
  AboutSection,
  ProjectsSection,
  ExperienceSection,
  SkillsSection,
  ContactSection,
} from './components/sections';

function App() {
  return (
    <>
      {/* Curseur personnalisé */}
      <CustomCursor />

      {/* Fond animé global - fixed derrière tout le contenu */}
      <AnimatedBackground />

      {/* Barre de progression scroll */}
      <ScrollProgress />

      {/* Contenu au-dessus du fond */}
      <div className="relative z-[1] w-full min-h-screen flex flex-col">
        {/* Header Navigation */}
        <Header />

        {/* Main content */}
        <main className="w-full flex-grow">
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <ExperienceSection />
          <SkillsSection />
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default App;
