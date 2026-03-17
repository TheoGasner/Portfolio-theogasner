import { Header, Footer } from './components/common';
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
    <div className="w-full min-h-screen flex flex-col">
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
  );
}

export default App;
