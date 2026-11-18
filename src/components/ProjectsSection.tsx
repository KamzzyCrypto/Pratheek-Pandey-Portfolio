import { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  portfolioData,
  type ProjectCategory,
  type ProjectItem,
} from '../data/portfolioData';
import { EditorialImage } from './EditorialImage';
import { ProjectModal } from './ProjectModal';

type FilterOption = 'All' | ProjectCategory;

export function ProjectsSection() {
  const { projects } = portfolioData;
  const [activeFilter, setActiveFilter] = useState<FilterOption>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const filteredItems: ProjectItem[] =
    activeFilter === 'All'
      ? projects.items
      : projects.items.filter((item) => item.category === activeFilter);

  const handleOpenProject = (
    project: ProjectItem,
    buttonEl: HTMLButtonElement
  ) => {
    triggerRef.current = buttonEl;
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  };

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-16 bg-[#FFFFFF] text-[#0B0B0B] border-t border-[#0B0B0B]/15"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-32">
        {/* Section Header & Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[#0B0B0B]/15">
          <div>
            <p className="text-xs sm:text-sm font-medium tracking-wide text-[#5B5A56] mb-4">
              {projects.sectionLabel}
            </p>
            <div className="flex items-baseline gap-4">
              <h2
                id="projects-heading"
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#0B0B0B]"
              >
                {projects.heading}
              </h2>
              <span
                className="text-sm text-[#5B5A56] tabular-nums"
                aria-live="polite"
              >
                ({String(filteredItems.length).padStart(2, '0')})
              </span>
            </div>
            <p className="mt-3 text-xs sm:text-sm text-[#5B5A56] max-w-xl">
              {projects.note}
            </p>
          </div>

          <div
            role="group"
            aria-label="Filter projects by category"
            className="flex flex-wrap items-center gap-2"
          >
            {projects.categories.map((category) => {
              const isActive = activeFilter === category;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveFilter(category)}
                  className={`min-h-[40px] px-4 py-2 text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 border transition-colors duration-150 ${
                    isActive
                      ? 'bg-[#0B0B0B] text-[#FFFFFF] border-[#0B0B0B]'
                      : 'bg-transparent text-[#0B0B0B] border-[#0B0B0B]/20 hover:border-[#0B0B0B]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Uniform Side-by-Side Editorial Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 sm:gap-y-14 items-start">
          {filteredItems.map((project) => (
            <article key={project.id} className="min-w-0">
              <button
                type="button"
                onClick={(event) => handleOpenProject(project, event.currentTarget)}
                className="group w-full text-left block focus-visible:outline-2 focus-visible:outline-[#0B0B0B] focus-visible:outline-offset-4"
              >
                <div className="w-full aspect-[16/9] bg-[#F4F3EF] border border-[#0B0B0B]/10 overflow-hidden">
                  <EditorialImage
                    src={project.image}
                    alt={project.alt}
                    surface="light"
                    fallbackTitle={project.title}
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                  />
                </div>

                  <div className="mt-4 pt-3 border-t border-[#0B0B0B]/15">
                    <div className="flex items-center justify-between gap-4 text-xs text-[#5B5A56] tabular-nums">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-[#0B0B0B]">
                          {project.category}
                        </span>
                        {project.year?.trim() && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{project.year}</span>
                          </>
                        )}
                        {project.pdfUrl?.trim() && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>PDF</span>
                          </>
                        )}
                      </div>
                      <span className="inline-flex items-center gap-1 text-[#0B0B0B] opacity-75 group-hover:opacity-100 transition-opacity duration-150">
                        <span>View</span>
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </span>
                    </div>

                    <h3 className="mt-2 font-display text-xl sm:text-2xl font-medium tracking-tight text-[#0B0B0B] group-hover:underline underline-offset-4">
                      {project.title}
                    </h3>

                    <p className="mt-1.5 text-sm text-[#5B5A56] leading-relaxed">
                      {project.summary}
                    </p>
                  </div>
              </button>
            </article>
          ))}
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={handleCloseModal} />
    </section>
  );
}
