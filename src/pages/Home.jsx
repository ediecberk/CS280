import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown,
  Cpu,
  Eye,
  Sparkles,
  Terminal,
  FolderGit2
} from 'lucide-react';

const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.9 0-1.63.73-1.63 1.63s.73 1.63 1.63 1.63 1.63-.73 1.63-1.63-.73-1.63-1.63-1.63Z" />
  </svg>
);

export default function Home() {
  const [activeProject, setActiveProject] = useState('project-0');

  const projects = [
    {
      id: 'project-0',
      title: 'Project 0: Becoming Friends with Your Camera',
      description:
        'This project explores the relationship between perspective, focal length, zoom, and camera position. It captures and compares portraits, architectural scenes, and a dolly zoom sequence to demonstrate perspective distortion and compression through photography.',
      highlights: [
        'Part 1: Selfie: The Wrong Way vs. The Right Way',
        'Part 2: Architectural Perspective Compression',
        'Part 3: The Dolly Zoom'
      ],
      internalRoute: '/project-0',
      badge: '{}'
    }
  ];

  const toggleProject = (id) => {
    setActiveProject((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 bg-grid-pattern relative flex flex-col">
      {/* Decorative Glow Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="glow-effect w-[500px] h-[500px] bg-cyan-500 top-[-100px] left-[-100px]" />
        <div className="glow-effect w-[600px] h-[600px] bg-indigo-600 top-[30%] right-[-200px]" />
        <div className="glow-effect w-[400px] h-[400px] bg-blue-500 bottom-[-100px] left-[20%]" />
      </div>

      {/* Header Navigation - Fixed at top */}
      <header className="fixed top-0 left-0 right-0 z-50 shrink-0 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400 bg-clip-text text-transparent">
                CS280 Portfolio
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
      <main className="relative z-10 flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 w-full space-y-10">
        <div className="space-y-10">
          {/* HERO SECTION */}
          <section id="about" className="relative pt-2 pb-2">
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
              <span>These are my super cool CS280 projects :)</span>
            </h2>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium shadow-lg shadow-cyan-500/25 transition-all flex items-center space-x-2"
              >
                <span>Explore Projects</span>
              </a>
              <a
                href="https://github.com/ediecberk/CS280"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-medium transition-all flex items-center space-x-2"
              >
                <GithubIcon className="w-4 h-4 text-cyan-400" />
                <span>GitHub Repository</span>
              </a>
            </div>
          </section>

          {/* PROJECTS SECTION WITH ACCORDION COMPONENTS */}
          <section id="projects" className="space-y-6 pt-2">
            <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-3xl font-bold text-white tracking-tight">Featured Projects</h2>
              </div>
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
                        </div>
                      </div>

                      <div
                        className={`p-2 rounded-lg transition-transform duration-300 ${
                          isOpen ? 'bg-cyan-500/20 text-cyan-400 rotate-180' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </button>

                    {/* Accordion Content Body */}
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

                          {/* Project Highlights */}
                          {project.highlights && project.highlights.length > 0 && (
                            <div>
                              <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-2">
                                Project Features
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

                          {/* Action Button linking to Interactive Route */}
                          <div className="pt-2 flex flex-wrap items-center gap-3">
                            <Link
                              to={project.internalRoute}
                              className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/50 text-cyan-300 border border-cyan-800/60 text-xs font-medium transition-all"
                            >
                              <Eye className="w-3.5 h-3.5 text-cyan-400" />
                              <span>Open Project Showcase</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/80 bg-slate-950/90 py-4 text-center text-xs text-slate-500 shrink-0">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Ethan Diec • CS280 Computer Vision Portfolio</p>
          <div className="flex items-center space-x-4 text-slate-400">
            <a href="https://github.com/ediecberk" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
              <GithubIcon className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/in/diecethan" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
