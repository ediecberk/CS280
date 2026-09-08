import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Camera, Layers, Film } from 'lucide-react';

// Import local image assets directly
import closeUpImg from '../assets/project_0_closeup.jpeg';
import farImg from '../assets/project_0_farzoom.jpeg'
import closeArch from '../assets/project_0_archclose.jpeg'
import farArch from '../assets/project_0_archfar.jpeg'
import dollyZoom from '../assets/project_0_dollyzoom.gif'

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
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="glow-effect w-[500px] h-[500px] bg-cyan-500 top-[-100px] left-[-100px]" />
        <div className="glow-effect w-[600px] h-[600px] bg-indigo-600 top-[30%] right-[-200px]" />
        <div className="glow-effect w-[400px] h-[400px] bg-blue-500 bottom-[-100px] left-[20%]" />
      </div>
      {/* Fixed Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 shrink-0 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            to="/"
            onClick={() => window.scrollTo(0, 0)}
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
        </div>
      </footer>
    </div>
  );
}