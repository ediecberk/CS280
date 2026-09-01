import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Camera, Layers, Film } from 'lucide-react';

// Import local image assets directly
import closeUpImg from '../assets/project_0_closeup.jpeg';
import farImg from '../assets/project_0_farzoom.jpeg'
import closeArch from '../assets/project_0_archclose.jpeg'
import farArch from '../assets/project_0_archfar.jpeg'
import dollyZoom from '../assets/project_0_dollyzoom.gif'

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

function ImagePlaceholder({ src, label, caption }) {
  return (
    <figure className="space-y-2">
      <div className="rounded-lg bg-slate-950 border border-dashed border-slate-700 flex items-center justify-center overflow-hidden">
        {src ? (
          <img src={src} alt={caption || label} className="w-full h-full object-cover" />
        ) : (
          <span className="text-xs font-mono text-slate-500">{label}</span>
        )}
      </div>
      <figcaption className="text-xs text-slate-400 text-center font-mono italic">
        {caption}
      </figcaption>
    </figure>
  );
}

export default function ProjectZero() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 bg-grid-pattern relative flex flex-col">
      {/* Fixed Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 shrink-0 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            <span>Back to Portfolio</span>
          </Link>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-800 text-cyan-300 border border-slate-700">
            CS280 • Project 0
          </span>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="relative z-10 flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 w-full space-y-12">
        {/* Title Header */}
        <section className="space-y-4 border-b border-slate-800 pb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Project 0: Becoming Friends with Your Camera{" "}
            <Camera className="inline-block w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-cyan-400" />
          </h1>
        </section>

        {/* Part 1 */}
        <section className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Camera className="w-5 h-5 text-cyan-400" />
            <span>Part 1: Selfie: The Wrong Way vs. The Right Way</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImagePlaceholder
              src={closeUpImg}
              label="Image placeholder"
              caption="Wrong way (close-up / wide angle)"
            />
            <ImagePlaceholder
              src={farImg}
              label="Image placeholder"
              caption="Right way (farther back / zoomed in)"
            />
          </div>

          <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-1.5">
            <h3 className="text-xl font-semibold text-cyan-400 font-mono uppercase tracking-wider">
              Takeaway
            </h3>
            <p className="text-m text-slate-300 leading-relaxed">
              Because the camera is very close to the face, the relative difference in distance between near features and far features is significant. For instance, you can barely see my ears in this image, while my nose and cheeks are disproportionately large! After stepping back and zooming in, features are more balanced because the relative distance of each feature to the camera becomes much more similar.
            </p>
          </div>
        </section>

        {/* Part 2 */}
        <section className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <span>Part 2: Architectural Perspective Compression</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImagePlaceholder
              src={farArch}
              label="Image placeholder"
              caption="Far shot, zoomed in"
              />
            <ImagePlaceholder
              src={closeArch}
              label="Image placeholder"
              caption="Closer shot, no zoom"
            />
          </div>

          <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-1.5">
            <h3 className="text-xl font-semibold text-cyan-400 font-mono uppercase tracking-wider">
              Takeaway
            </h3>
            <p className="text-m text-slate-300 leading-relaxed">
              This had a similar effect as the selfie test! When far away and zoomed in, the building was a little flat, almost like a 2D wall. The closer shot with no zoom appeared much more 3D. My shots weren't perfectly aligned, but I believe the reason for this effect is that the relative distance of different parts of the building to the camera is almost identical when you stand far away, but it varies drastically when you stand up close.
            </p>
          </div>
        </section>

        {/* Part 3 */}
        <section className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Film className="w-5 h-5 text-cyan-400" />
            <span>Part 3: The Dolly Zoom</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <figure className="flex flex-col items-center space-y-2 w-full max-w-sm mx-auto">
            <div className="w-full rounded-lg bg-slate-950 border border-slate-800 overflow-hidden">
                <img 
                src={dollyZoom} 
                alt="Dolly Zoom GIF" 
                className="w-full h-auto object-contain block" 
                />
            </div>
            <figcaption className="text-xs text-slate-400 text-center font-mono italic">
                Dolly Zoom Sequence
            </figcaption>
            </figure>

            <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-2">
            <h3 className="text-xl font-semibold text-cyan-400 font-mono uppercase tracking-wider">
                Takeaway
            </h3>
            <p className="text-m text-slate-300 leading-relaxed">
              This was a really cool effect to create! Although my camera handling wasn't perfect, my water bottle stays almost stationary, but the background looks like it's getting farther away.
            </p>
            </div>

        </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/80 bg-slate-950/90 py-4 text-center text-xs text-slate-500 shrink-0">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
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