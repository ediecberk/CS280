import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Code2,
  Cpu,
  Eye,
  Sparkles,
  Layers,
  Terminal,
  Mail,
  FolderGit2
} from 'lucide-react';

// Custom inline SVG components for Brand Icons (guaranteed compatibility across all Lucide React versions)
const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

export default function App() {
  // Accordion state: stores the ID of currently open project ('project-0' or null)
  const [activeProject, setActiveProject] = useState('project-0');

  // Project data for CS280
  const projects = [
    {
      id: 'project-0',
      title: 'Project 0: Becoming Friends with Your Camera',
      subtitle: 'Perspective & Optics Analysis',
      description:
        'This project explores the relationship between perspective, focal length, zoom, and camera position. It captures and compares portraits, architectural scenes, and a dolly zoom sequence to demonstrate perspective distortion and compression through photography.',
      highlights: [
        'Captured dolly zoom (Vertigo effect) sequence by varying focal length & subject distance.',
        'Analyzed perspective distortion across wide-angle to telephoto focal lengths.',
        'Evaluated field of view (FOV) and optical geometric compression.'
      ],
      techStack: ['Photography', 'Optics', 'Dolly Zoom', 'Python', 'OpenCV'],
      githubUrl: 'https://github.com/ediecberk/cs280-project-0',
      demoUrl: 'https://github.com/ediecberk/cs280-project-0#writeup',
      badge: 'CS280 Core Project'
    }
  ];

  // Helper toggle function: opens clicked project, automatically closes any other open project
  const toggleProject = (id) => {
    setActiveProject((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 bg-grid-pattern relative overflow-x-hidden flex flex-col">
      {/* Decorative Glow Elements */}
      <div className="glow-effect w-[500px] h-[500px] bg-cyan-500 top-[-100px] left-[-100px]" />
      <div className="glow-effect w-[600px] h-[600px] bg-indigo-600 top-[30%] right-[-200px]" />
      <div className="glow-effect w-[400px] h-[400px] bg-blue-500 bottom-[-100px] left-[20%]" />

      {/* Header Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80 transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400 bg-clip-text text-transparent">
                CS280 Portfolio
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                Vision & AI
              </span>
            </div>
          </div>

          <nav className="flex items-center space-x-6 text-sm font-medium">
            <a href="#about" className="text-slate-300 hover:text-cyan-400 transition-colors">
              About
            </a>
            <a href="#projects" className="text-slate-300 hover:text-cyan-400 transition-colors">
              Projects
            </a>
            <a
              href="https://github.com/ediecberk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-slate-900 border border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-600 transition-all shadow-sm"
            >
              <GithubIcon className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-16">
        
        {/* HERO SECTION */}
        <section id="about" className="relative pt-6 pb-4">
          
          
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-6">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>UC Berkeley CS280 • Computer Vision Portfolio</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4">
            Hello, I&apos;m{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
              Ethan Diec
            </span>
          </h1>

          <h2 className="text-xl sm:text-2xl font-semibold text-slate-300 mb-6 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400 inline" />
            <span>Computer Vision</span>
          </h2>

          <p className="text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed mb-8">
            These are my super cool CS280 projects :)
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium shadow-lg shadow-cyan-500/25 transition-all flex items-center space-x-2"
            >
              <span>Explore Projects</span>
              <ChevronDown className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/ediecberk"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-medium transition-all flex items-center space-x-2"
            >
              <GithubIcon className="w-4 h-4 text-cyan-400" />
              <span>GitHub Repositories</span>
            </a>
          </div>
        </section>

        {/* PROJECTS SECTION WITH ACCORDION COMPONENTS */}
        <section id="projects" className="space-y-6 pt-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center space-x-2 text-cyan-400 text-sm font-mono mb-1">
                <Layers className="w-4 h-4" />
                <span>INTERACTIVE ACCORDION</span>
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight">Featured Projects</h2>
            </div>
            <p className="text-slate-400 text-sm mt-2 md:mt-0">
              Click a project header to expand details and inspect tech stack.
            </p>
          </div>

          {/* Accordion Container */}
          <div className="space-y-4">
            {projects.map((project) => {
              const isOpen = activeProject === project.id;

              return (
                <div
                  key={project.id}
                  className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-slate-900/90 border-cyan-500/50 shadow-xl shadow-cyan-950/40 ring-1 ring-cyan-500/30'
                      : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/70 hover:border-slate-700'
                  }`}
                >
                  {/* Accordion Header / Trigger Button */}
                  <button
                    type="button"
                    onClick={() => toggleProject(project.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-cyan-500/50 rounded-xl transition-colors"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center space-x-4 pr-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                          isOpen
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                      >
                        <FolderGit2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-lg font-semibold text-white tracking-tight">
                            {project.title}
                          </h3>
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-cyan-300 border border-slate-700 font-mono">
                            {project.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 font-mono">{project.subtitle}</p>
                      </div>
                    </div>

                    {/* Expand/Collapse Indicator Icon */}
                    <div
                      className={`p-2 rounded-lg transition-transform duration-300 ${
                        isOpen ? 'bg-cyan-500/20 text-cyan-400 rotate-180' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>

                  {/* Accordion Content Body with Smooth Expand/Collapse Transition */}
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 pt-2 border-t border-slate-800/80 space-y-6">
                        {/* Project Description */}
                        <div>
                          <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-2 flex items-center gap-1.5">
                            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Overview</span>
                          </h4>
                          <p className="text-slate-300 text-sm leading-relaxed">{project.description}</p>
                        </div>

                        {/* Project Key Highlights */}
                        {project.highlights && project.highlights.length > 0 && (
                          <div>
                            <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-2">
                              Key Results & Features
                            </h4>
                            <ul className="space-y-1.5">
                              {project.highlights.map((item, idx) => (
                                <li key={idx} className="text-xs text-slate-300 flex items-start space-x-2">
                                  <span className="text-cyan-400 font-mono font-bold">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Tech Stack Tags */}
                        {project.techStack && project.techStack.length > 0 && (
                          <div>
                            <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-2 flex items-center gap-1.5">
                              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                              <span>Technologies Used</span>
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {project.techStack.map((tech, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 text-xs font-mono rounded-md bg-slate-800/90 text-slate-200 border border-slate-700 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Action Buttons: GitHub Repository & Demo */}
                        <div className="pt-2 flex flex-wrap items-center gap-3">
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-600 text-xs font-medium transition-all shadow-sm"
                          >
                            <GithubIcon className="w-4 h-4 text-cyan-400" />
                            <span>View GitHub Repository</span>
                            <ExternalLink className="w-3 h-3 text-slate-400 ml-1" />
                          </a>
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/50 text-cyan-300 border border-cyan-800/60 text-xs font-medium transition-all"
                          >
                            <Eye className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Project Demo & Docs</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/90 py-8 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Ethan Diec • CS280 Computer Vision Portfolio</p>
          <div className="flex items-center space-x-4 text-slate-400">
            <a href="https://github.com/ediecberk" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
              <GithubIcon className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com/diecethan" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
