import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown,
  Cpu,
  Eye,
  Sparkles,
  Terminal,
  FolderGit2
} from 'lucide-react';

const SUBTITLES = [
  'These are my super cool CS280 projects :)',
  'Hope you enjoy your visit!',
  'Go Bears',
];

function HeroSubtitle() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [showRunner, setShowRunner] = useState(false);

  useEffect(() => {
    if (index >= SUBTITLES.length - 1) return;

    const fadeMs = 500;
    const holdMs = 3400;
    let fadeTimeout;
    const holdTimeout = window.setTimeout(() => {
      setVisible(false);
      fadeTimeout = window.setTimeout(() => {
        setIndex((current) => current + 1);
        setVisible(true);
      }, fadeMs);
    }, holdMs);

    return () => {
      clearTimeout(holdTimeout);
      clearTimeout(fadeTimeout);
    };
  }, [index]);

  useEffect(() => {
    if (index < SUBTITLES.length - 1 || !visible) return;

    const runnerTimeout = window.setTimeout(() => {
      setShowRunner(true);
    }, 2000);

    return () => clearTimeout(runnerTimeout);
  }, [index, visible]);

  return (
    <div className="relative z-10 mb-6 flex items-center gap-3 min-h-[2rem] sm:min-h-[2.5rem]">
      <h2 className="text-xl sm:text-2xl font-semibold text-slate-300 flex items-center gap-2">
        <Cpu className="w-5 h-5 text-cyan-400 shrink-0" />
        <span
          className={`transition-opacity duration-500 ease-in-out ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {SUBTITLES[index]}
        </span>
      </h2>
      <div
        className={`transition-opacity duration-500 ease-in-out ${
          showRunner ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {showRunner ? <WalkingBear /> : null}
      </div>
    </div>
  );
}

function WalkingBear() {
  return (
    <svg
      className="cal-bear"
      viewBox="0 0 48 32"
      width="42"
      height="28"
      aria-hidden="true"
    >
      <g className="bear-bob">
        <g className="bear-leg bear-leg-rear-right">
          <rect x="15" y="20" width="3.6" height="9.5" rx="1.8" />
        </g>
        <g className="bear-leg bear-leg-front-right">
          <rect x="28" y="20" width="3.6" height="9.5" rx="1.8" />
        </g>
        <ellipse cx="11" cy="18.5" rx="2.3" ry="1.6" />
        <ellipse cx="22" cy="17" rx="12" ry="8" />
        <circle cx="36" cy="13" r="7" />
        <circle cx="32.2" cy="7" r="2.5" />
        <circle cx="38.4" cy="6.6" r="2.5" />
        <ellipse cx="41.4" cy="14.2" rx="3.1" ry="2.2" />
        <circle className="bear-eye" cx="38.6" cy="11.6" r="0.9" />
        <g className="bear-leg bear-leg-rear-left">
          <rect x="12" y="20" width="4" height="10" rx="2" />
        </g>
        <g className="bear-leg bear-leg-front-left">
          <rect x="25" y="20" width="4" height="10" rx="2" />
        </g>
      </g>
    </svg>
  );
}

function SonarOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute right-8 sm:right-16 top-1/2 -translate-y-1/2 w-52 h-52 sm:w-72 sm:h-72 opacity-40">
        <div className="absolute inset-0 rounded-full border-2 border-cyan-400/70" />
        <div className="absolute inset-[16%] rounded-full border border-cyan-300/60" />
        <div className="absolute inset-[32%] rounded-full border border-cyan-300/50" />
        <div className="absolute inset-[48%] rounded-full border border-indigo-400/55" />
        <div className="absolute left-1/2 top-[8%] bottom-[8%] w-px bg-cyan-300/40" />
        <div className="absolute top-1/2 left-[8%] right-[8%] h-px bg-cyan-300/40" />
        <div className="absolute inset-0 rounded-full overflow-hidden sonar-sweep" />
        <div className="absolute inset-0 rounded-full border-2 border-cyan-200/80 sonar-ping" />
        <div className="absolute inset-0 rounded-full border border-indigo-300/70 sonar-ping-delayed" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-200 shadow-[0_0_16px_rgba(34,211,238,0.95)]" />
      </div>
    </div>
  );
}

export default function Home() {
  const [activeProject, setActiveProject] = useState(null);

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
    },
    {
      id: 'project-1',
      title: 'Project 1: Images of the Russian Empire — Colorizing the Prokudin-Gorskii Photo Collection',
      description:
        'This project takes the digitized Prokudin-Gorskii glass plate images and, using image processing techniques, automatically produces a color image with as few visual artifacts as possible. It does so by extracting the three color channel images, placing them on top of each other, and aligning them so that they form a single RGB color image.',
      highlights: [
        'Two pipelines',
        'Basic: split B/G/R, align G and R to B with L2, hard-coded crop',
        'Bells & Whistles: better features (edge comparisons), automatic crop, contrast, white balance, color mapping',
      ],
      internalRoute: '/project-1',
    },
    {
      id: 'project-2',
      title: 'Project 2: Fun with Filters and Frequencies',
      description:
        'This project builds 2D convolution from scratch, then uses finite differences and a Gaussian to find edges. The box blur, Dx, and Dy are the same sliding weighted sum with different weights. Part 2 uses those filters on frequencies: an unsharp mask to sharpen a photo, hybrid images that change with viewing distance, and a stack that blends two photos across a seam.',
      highlights: [
        'Part 1.1: Convolution with four loops, then two, checked against SciPy',
        'Part 1.2: Finite-difference edges on the cameraman',
        'Part 1.3: Derivative of Gaussian',
        'Part 1 Bells & Whistles: gradient orientation in HSV',
        'Part 2.1: Unsharp mask on the Taj Mahal',
        'Part 2.2: Hybrid images, with color on the low band, the high band, or both',
        'Part 2.3: Gaussian and Laplacian stacks',
        'Part 2.4: Multiresolution blending, the oraple and two custom seams',
      ],
      internalRoute: '/project-2',
    },
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
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 w-full space-y-10">
        <div className="space-y-10">
          {/* HERO SECTION */}
          <section id="about" className="relative min-h-[220px] sm:min-h-[260px] pt-2 pb-2">
            <SonarOverlay />
            <div className="relative z-10 inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-6">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>UC Berkeley CS280 • Computer Vision Portfolio</span>
            </div>

            <h1 className="relative z-10 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4">
              Hello, I&apos;m{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
                Ethan Diec
              </span>
            </h1>

            <HeroSubtitle />
          </section>

          {/* Projects Section */}
          <section id="projects" className="space-y-6 pt-2">
            <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-3xl font-bold text-white tracking-tight">Projects</h2>
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
                      className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out ${
                        isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                      }`}
                    >
                      <div className="min-h-0 overflow-hidden">
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
                              onClick={() => window.scrollTo(0, 0)}
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
        </div>
      </footer>
    </div>
  );
}
