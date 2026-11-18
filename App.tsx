import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ServicesSection } from './components/ServicesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0B] text-[#0B0B0B]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#FFFFFF] focus:text-[#0B0B0B] focus:border focus:border-[#0B0B0B] focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>

      <Header />

      <main id="main-content" className="flex-1">
        <Hero />
        <AboutSection />
        <ProjectsSection />
        <ServicesSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
