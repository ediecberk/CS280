import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Grid3x3, Rows3, Aperture, Code2, List } from 'lucide-react';
import churchIntensity from '../assets/project_1_church_intensity.jpg';
import emirIntensity from '../assets/project_1_emir_intensity.jpg';
import churchGradient from '../assets/project_1_church_gradient.jpg';
import emirGradient from '../assets/project_1_emir_gradient.jpg';

const ADVANCED_STEPS = [
  { key: 'aligned', label: 'Aligned / Colorized', folder: 'original' },
  { key: 'cropped', label: 'Cropped', folder: 'cropped' },
  { key: 'contrast', label: 'Contrasted', folder: 'contrasted' },
  { key: 'whiteBalance', label: 'White Balance', folder: 'balanced' },
  { key: 'colorMapping', label: 'Color Mapping', folder: 'mapped' },
];

const PROCESS_TIMES = {
  cathedral: 0.07,
  church: 3.47,
  emir: 3.53,
  harvesters: 3.23,
  icon: 3.43,
  ilemselga: 4.09,
  melons: 3.52,
  monastery: 0.10,
  religous_painting: 3.00,
  self_portrait: 3.28,
  siren: 3.24,
  three_generations: 3.17,
  tobolsk: 0.09,
  wharf: 2.98,
  monument_at_the_cathedral: 0.09,
  piony: 0.07,
  'v-imienii-daniia': 0.08,
};

const OFFSETS = {
  cathedral: { g: [5, 2], r: [8, 47] },
  church: { g: [49, 454], r: [79, 447] },
  emir: { g: [49, 24], r: [66, 44] },
  harvesters: { g: [59, 17], r: [124, 13] },
  icon: { g: [41, 17], r: [89, 23] },
  ilemselga: { g: [40, 7], r: [130, 11] },
  melons: { g: [81, 10], r: [178, 14] },
  monastery: { g: [-3, 2], r: [3, 2] },
  religous_painting: { g: [28, 3], r: [69, 7] },
  self_portrait: { g: [78, 29], r: [176, 37] },
  siren: { g: [50, -6], r: [96, -25] },
  three_generations: { g: [52, 14], r: [111, 11] },
  tobolsk: { g: [3, 3], r: [6, 3] },
  wharf: { g: [15, -7], r: [82, -16] },
  monument_at_the_cathedral: { g: [1, 3], r: [8, 5] },
  piony: { g: [5, 0], r: [11, -1] },
  'v-imienii-daniia': { g: [6, 1], r: [12, -1] },
};

const SINGLE_OFFSETS = {
  cathedral: { g: [5, 2], r: [12, 3] },
  monastery: { g: [-3, 2], r: [3, 2] },
  tobolsk: { g: [3, 3], r: [6, 3] },
};

const ADVANCED_OFFSETS = {
  cathedral: { g: [5, 2], r: [12, 3] },
  church: { g: [25, 4], r: [58, -4] },
  emir: { g: [49, 24], r: [107, 40] },
  harvesters: { g: [60, 17], r: [124, 14] },
  icon: { g: [41, 17], r: [90, 23] },
  ilemselga: { g: [40, 7], r: [131, 11] },
  melons: { g: [80, 10], r: [176, 13] },
  monastery: { g: [-3, 2], r: [3, 2] },
  religous_painting: { g: [30, 6], r: [70, 6] },
  self_portrait: { g: [78, 29], r: [175, 37] },
  siren: { g: [49, -6], r: [96, -24] },
  three_generations: { g: [53, 12], r: [111, 9] },
  tobolsk: { g: [3, 3], r: [6, 3] },
  wharf: { g: [15, -6], r: [82, -16] },
  monument_at_the_cathedral: { g: [1, 3], r: [8, 5] },
  piony: { g: [5, 0], r: [11, -1] },
  'v-imienii-daniia': { g: [6, 1], r: [12, -1] },
};

const INTENSITY_OFFSETS = {
  church: { g: [49, 454], r: [79, 447] },
  emir: { g: [49, 24], r: [66, 44] },
};

const INTENSITY_IMAGES = {
  church: churchIntensity,
  emir: emirIntensity,
};

const GRADIENT_OFFSETS = {
  church: { g: [25, 4], r: [58, -4] },
  emir: { g: [49, 24], r: [107, 40] },
};

const GRADIENT_IMAGES = {
  church: churchGradient,
  emir: emirGradient,
};

const JPG_RESULTS = [
  { id: 'cathedral', title: 'Cathedral' },
  { id: 'monastery', title: 'Monastery' },
  { id: 'tobolsk', title: 'Tobolsk' },
];

const TIF_RESULTS = [
  { id: 'church', title: 'Church' },
  { id: 'emir', title: 'Emir' },
  { id: 'harvesters', title: 'Harvesters' },
  { id: 'icon', title: 'Icon' },
  { id: 'ilemselga', title: 'Ilemselga' },
  { id: 'melons', title: 'Melons' },
  { id: 'religous_painting', title: 'Religious Painting' },
  { id: 'self_portrait', title: 'Self Portrait' },
  { id: 'siren', title: 'Siren' },
  { id: 'three_generations', title: 'Three Generations' },
  { id: 'wharf', title: 'Wharf' },
];

const PROVIDED_RESULTS = [...JPG_RESULTS, ...TIF_RESULTS];

const EXTRA_RESULTS = [
  { id: 'piony', title: 'Piony' },
  { id: 'monument_at_the_cathedral', title: 'Cathedral Monument' },
  { id: 'v-imienii-daniia', title: 'V imienii Daniia' },
];

function publicUrl(path) {
  if (!path) return null;
  const base = import.meta.env.BASE_URL ?? './';
  return `${base}${path.replace(/^\//, '')}`;
}

function ImageCard({ src, label, title, offset, caption }) {
  return (
    <figure className="space-y-2 min-w-0">
      {src ? (
        <img
          src={src}
          alt={title || label || caption}
          className="block w-full h-auto rounded-md"
        />
      ) : (
        <div className="min-h-[8rem] rounded-lg border border-dashed border-slate-700 flex items-center justify-center px-2">
          <span className="text-[10px] sm:text-xs font-mono text-slate-500 text-center leading-relaxed">
            {label}
          </span>
        </div>
      )}
      {(title || offset || caption) && (
        <figcaption className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
          {title && <span className="text-sm font-bold text-slate-200">{title}</span>}
          {offset && <OffsetChips offset={offset} />}
          {!title && caption && (
            <span className="text-slate-400 font-mono italic">{caption}</span>
          )}
        </figcaption>
      )}
    </figure>
  );
}

function OffsetChips({ offset }) {
  if (!offset) return null;
  return (
    <>
      <span className="font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
        G ({offset.g[0]}, {offset.g[1]})
      </span>
      <span className="font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
        R ({offset.r[0]}, {offset.r[1]})
      </span>
    </>
  );
}

function PipelineRows({ images }) {
  return images.map((image) => (
    <div key={image.id} className="space-y-3">
      <h3 className="flex flex-wrap items-center gap-1.5 text-base font-semibold text-white tracking-tight">
        <span>{image.title}</span>
        <OffsetChips offset={ADVANCED_OFFSETS[image.id]} />
        {PROCESS_TIMES[image.id] != null && (
          <span className="font-mono font-normal text-slate-400">
            {PROCESS_TIMES[image.id].toFixed(2)}s
          </span>
        )}
      </h3>
      <div className="overflow-x-auto">
        <div className="grid grid-cols-5 gap-3 min-w-[800px]">
          {ADVANCED_STEPS.map((step) => (
            <ImageCard
              key={step.key}
              src={publicUrl(`p1/advanced/${step.folder}/${image.id}.jpg`)}
              label={step.label}
              caption={step.label}
            />
          ))}
        </div>
      </div>
    </div>
  ));
}

function ResultGrid({ images, srcFor, placeholderFor, offsets = OFFSETS }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image) => (
        <ImageCard
          key={image.id}
          src={srcFor?.(image)}
          label={placeholderFor?.(image) || image.title}
          title={image.title}
          offset={offsets[image.id]}
        />
      ))}
    </div>
  );
}

export default function ProjectOne() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 bg-grid-pattern relative flex flex-col">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="glow-effect w-[500px] h-[500px] bg-cyan-500 top-[-100px] left-[-100px]" />
        <div className="glow-effect w-[600px] h-[600px] bg-indigo-600 top-[30%] right-[-200px]" />
        <div className="glow-effect w-[400px] h-[400px] bg-blue-500 bottom-[-100px] left-[20%]" />
      </div>

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
            CS280 • Project 1
          </span>
        </div>
      </header>

      <main className="relative z-10 flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 w-full space-y-12">
        <section className="space-y-4 border-b border-slate-800 pb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Project 1: Images of the Russian Empire{' '}
            <Aperture className="inline-block w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-cyan-400" />
          </h1>
          <p className="text-slate-300 leading-relaxed max-w-3xl">
            Colorizing the Prokudin-Gorskii photo collection by splitting B/G/R glass plates,
            aligning them, and post-processing the stacked RGB result.
          </p>
        </section>

        <section className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <List className="w-5 h-5 text-cyan-400" />
            <span>Contents</span>
          </h2>
          <p className="text-sm text-slate-400">
            Two pipelines: a basic align-and-stack path, then bells & whistles post-processing (more details below).
          </p>
          <nav className="space-y-4 text-sm">
            <button
              type="button"
              onClick={() => document.getElementById('basic')?.scrollIntoView({ behavior: 'smooth' })}
              className="block w-full text-left rounded-lg p-3 -m-3 hover:bg-slate-800/60 transition-colors"
            >
              <div className="font-semibold text-white">1. Basic</div>
              <p className="text-slate-400 mt-1">
                Split B/G/R, align G and R to B, crop (hard-coded)
              </p>
            </button>
            <button
              type="button"
              onClick={() => document.getElementById('bells')?.scrollIntoView({ behavior: 'smooth' })}
              className="block w-full text-left rounded-lg p-3 -m-3 hover:bg-slate-800/60 transition-colors"
            >
              <div className="font-semibold text-white">2. Bells & Whistles</div>
              <p className="text-slate-400 mt-1">
                Similar alignment pipeline (but with more advanced implementation), plus post-processing:
              </p>
              <ul className="mt-1.5 ml-4 list-disc text-slate-400 space-y-0.5">
                <li>Better Features (Gradient vs. Intensity)</li>
                <li>Automatic Cropping</li>
                <li>Automatic Contrasting</li>
                <li>White Balance</li>
                <li>Color Mapping</li>
              </ul>
            </button>
          </nav>
        </section>

        <section id="basic" className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Code2 className="w-5 h-5 text-cyan-400" />
            <span>Basic Pipeline Approach</span>
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Each Prokudin-Gorskii scan is a single tall grayscale image with three exposures stacked
            top to bottom: blue, then green, then red. I split those plates, align G and R to B,
            and stack them into one RGB image.
          </p>
          <ol className="space-y-5 text-slate-300 leading-relaxed list-decimal list-outside pl-5">
            <li>
              Read the scan as a float image in <span className="font-mono text-cyan-300">[0, 1]</span>.
            </li>
            <li>
              Split it into three equal-height plates: <span className="font-mono text-cyan-300">B</span> on
              top, <span className="font-mono text-cyan-300">G</span> in the middle,{' '}
              <span className="font-mono text-cyan-300">R</span> on the bottom.
            </li>
            <li>
              Exhaustively search alignments of G → B and R → B. I run single-scale on the three
              provided JPGs and pyramid alignment on every scan.
              <ul className="mt-2 space-y-2 list-disc text-slate-400">
                <li>
                  Single-scale (cathedral, monastery, tobolsk): score every alignment of{' '}
                  <span className="font-mono text-cyan-300">(dy, dx)</span> in{' '}
                  <span className="font-mono text-cyan-300">[-15, 15]²</span> and keep the best.
                </li>
                <li>
                  Pyramid (all images): I shrink the scan by averaging each 2 × 2 into one pixel,
                  again and again, until the shortest side is under 128 pixels. On that small copy
                  I search alignments in the{' '}
                  <span className="font-mono text-cyan-300">[-15, 15]</span> window and get the
                  offset with the best score. Then I walk back up, doubling the offset, applying it
                  to the next-larger plates, and searching a small{' '}
                  <span className="font-mono text-cyan-300">[-2, 2]</span> window to fine tune the
                  offset. Repeat until the image is back at full size.
                </li>
              </ul>
            </li>
            <li>
              Score each offset with L2 on the interior only, ignoring about 15% of the border.
              <ul className="mt-2 space-y-2 list-disc text-slate-400">
                <li>
                  Euclidean distance:{' '}
                  <span className="font-mono text-cyan-300">
                    ‖A − B‖₂ = √(Σ<sub>i</sub> (A<sub>i</sub> − B<sub>i</sub>)²)
                  </span>
                  . Here <span className="font-mono text-cyan-300">B</span> is the blue plate
                  and <span className="font-mono text-cyan-300">A</span> is
                  G or R. I use this metric on each pixel, then sum up all the
                  pixel scores. I keep the shift with the smallest score. This is run on raw
                  plate brightness for the basic pipeline.
                </li>
                <li>
                  I only score the middle (~70%, dropping 15% per side). The scan rims and the
                  leftover strip from sliding a plate are huge mismatches. If I included
                  them, L2 would pick a shift that cleans up the border instead of lining up
                  the actual photo.
                </li>
                <li>
                  Note: NCC is implemented but commented out in the source code.
                </li>
              </ul>
            </li>
            <li>
              Apply the best <span className="font-mono text-cyan-300">(dy, dx)</span>.
              After shifting, replace rolled over pixels with black pixels.
            </li>
            <li>
              Stack the shifted channels as RGB and crop a fixed 10% margin off every side.
            </li>
          </ol>

          <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-3">
            <h3 className="text-sm font-semibold text-cyan-400 font-mono uppercase tracking-wider">
              Beyond the basics
            </h3>
            <div className="space-y-3 text-slate-300 leading-relaxed">
              <p>
                Since bells and whistles are required for me, I wanted to have two sections:
                one where I do bare bones alignment and stacking, and one where I do more advanced alignment and stacking.
                This pipeline is L2 on raw pixels plus a hard-coded crop.
              </p>
              <p>
                <span className="font-semibold text-white">Hard-coded crop.</span> Shifting G and R
                leaves a rim of black fill and leftover scan border, which shows up as tinted
                fringes after stacking. After colorizing, I trim a fixed 10% off each edge. When implmeneting
                this basic pipeline, I didn't want to do too much, so I hard-coded the 10%.
              </p>
            </div>
          </div>
        </section>

        <section className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-10">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Grid3x3 className="w-5 h-5 text-cyan-400" />
              <span>Basic Alignment Pipeline</span>
            </h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-white">Single-scale Alignment</h3>
            </div>
            <ResultGrid
              images={JPG_RESULTS}
              srcFor={(image) => publicUrl(`p1/basics/single/${image.id}.jpg`)}
              offsets={SINGLE_OFFSETS}
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-white">Multi-scale Pyramid Alignment</h3>
            </div>
            <ResultGrid
              images={PROVIDED_RESULTS}
              srcFor={(image) => publicUrl(`p1/basics/${image.id}.jpg`)}
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-white">Additional images</h3>
              <p className="text-sm text-slate-400">
                Same pipeline on 3 extra plates from the Prokudin-Gorskii collection.
              </p>
            </div>
            <ResultGrid
              images={EXTRA_RESULTS}
              srcFor={(image) => publicUrl(`p1/basics/${image.id}.jpg`)}
            />
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-semibold text-white">Misaligned Images</h3>
            <div className="space-y-3 text-slate-300 leading-relaxed">
              <p>
                Three of the pyramid results came out wrong: cathedral, church, and emir.
                Everything else looked well-aligned.
              </p>
              <p>
                <span className="font-semibold text-white">Cathedral.</span> Searching the
                JPG exhaustively works. Pyramid alignment does not, causing the red plate to slide way
                off. The picture is small, so once I shrink it the match is being decided on a
                handful of pixels. Matching with L2 on raw RGB pixels guesses wrong, so when I double that guess on the way
                back up, the little refine window cannot save it.
              </p>
              <p>
                <span className="font-semibold text-white">Church and Emir.</span> For these images,
                the three plates just do not look the same. A robe or a wall can be
                bright in one color and dark in another, so comparing raw brightness lines up
                the wrong stuff. Church flies off to a huge offset. Emir gets green right but
                misses on red.
              </p>
              <p>
                I fix all three in Bells & Whistles by matching edges instead of brightness.
              </p>
            </div>
          </div>
        </section>

        <section id="bells" className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Code2 className="w-5 h-5 text-cyan-400" />
            <span>Bells & Whistles Approach</span>
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Same starting pipeline as basic: read the scan as float <span className="font-mono text-cyan-300">[0, 1]</span>,
            split B / G / R, search translations of G and R onto B with the pyramid on every
            image, score L2 on the interior, apply the shift
            without wrapping, and stack RGB. <br /><br /> <b>The Extras:</b>
          </p>
          <ol className="space-y-5 text-slate-300 leading-relaxed list-decimal list-outside pl-5">
            <li>
              Alignment (same search as basic, but L2 on Roberts cross edges instead of raw brightness).
              <ul className="mt-2 space-y-2 list-disc text-slate-400">
                <li>
                  The three filters may disagree on brightness (a robe can be bright in G and dark
                  in B), but the edges of the same scene line up better.
                </li>
                <li>
                  Example in practice: the outline of a building stays bright, because those pixels
                  sit next to very different neighbors. Each pixel in a stretch of sky is almost the
                  same brightness as the pixels around it, so it goes dark (~0). This helps
                  alignment by focusing on the structure of the image rather than the brightness.
                </li>
                <li>
                  That is the gradient: how much a pixel differs from the ones around it. I use
                  Roberts cross, which is almost the same thing, just a 2×2 diagonal version
                  of that difference:{' '}
                  <span className="font-mono text-cyan-300">gₓ = I[i, j] − I[i+1, j+1]</span>,{' '}
                  <span className="font-mono text-cyan-300">gᵧ = I[i, j+1] − I[i+1, j]</span>, then{' '}
                  <span className="font-mono text-cyan-300">|∇I| = √(gₓ² + gᵧ²)</span>.
                </li>
                <li>
                  Then I do the same scoring as basic: L2 and the coarse-to-fine pyramid
                  speedup, but each plate is mapped with the values above instead of its
                  brightness.
                </li>
              </ul>
            </li>
            <li>
              Automatic Cropping
              <ul className="mt-2 space-y-2 list-disc text-slate-400">
                <li>
                  First, I crop the overlap from the shifts. I keep B as the reference that stays in place,
                  while shifting G and R creates empty areas along the edges. Since B still has pixels in those
                  areas, they can show up as a tinted edge when the channels are stacked. The offset tells me
                  how much to crop away. If G moved down by{' '} <span className="font-mono text-cyan-300">dy</span>,
                  the top{' '} <span className="font-mono text-cyan-300">dy</span> rows of G are empty, so I crop
                  that many rows off the top. If it moved up, I crop the bottom. The same idea applies to left
                  and right with <span className="font-mono text-cyan-300">dx</span>. I use the larger of the G
                  and R shifts on each border.
                </li>
                <li>
                  I then crop the scan borders. A pixel is considered “border-colored” if it is very dark
                  (&lt; 0.05) or very light (&gt; 0.95). A whole row or column counts
                  as border if ≥ 90% of its pixels meet that condition. In the stacked RGB image, I also treat
                  a line as border if the three channels disagree: the minimum pairwise NCC of R, G, and B along
                  that line is below 0.2, or the mean per-pixel channel spread is high compared to the interior.
                  I work inward from each edge, up to 10% of each side, and stop once I reach actual content.
                  I allow a 2-row/column leeway so that a single noisy line does not stop cropping.
                </li>
              </ul>
            </li>
            <li>
              Automatic Contrasting
              <ul className="mt-2 space-y-2 list-disc text-slate-400">
                <li>
                  I dump every R, G, and B number in the image into one list.
                  From that list I take the 5th percentile as{' '}
                  <span className="font-mono text-cyan-300">lo</span> and the 95th as{' '}
                  <span className="font-mono text-cyan-300">hi</span>, instead of the absolute
                  min/max, so a few crazy rim pixels do not pin the range.
                </li>
                <li>
                  Then I map every value with{' '}
                  <span className="font-mono text-cyan-300">(x − lo) / (hi − lo)</span> and clip
                  to <span className="font-mono text-cyan-300">[0, 1]</span>. The same{' '}
                  <span className="font-mono text-cyan-300">lo</span> /{' '}
                  <span className="font-mono text-cyan-300">hi</span> is applied to R, G, and B,
                  so almost-black goes to 0, almost-white goes to 1, and the middle greys get
                  spread out.
                </li>
              </ul>
            </li>
            <li>
              Color Mapping
              <ul className="mt-2 space-y-2 list-disc text-slate-400">
                <li>
                  Right now a pixel is just (red plate, green plate, blue plate) shown as R, G, B.
                  Prokudin-Gorskii's filters were broader than that, so the plates are not the same
                  as display red/green/blue. Each output color should be a mix.
                </li>
                <li>
                  For every pixel I make a new color as a weighted sum of the three plates. Output
                  red is mostly the red plate plus a little green; green is mostly green plus a
                  little of both neighbors; blue is mostly blue plus a little green:
                  <br />
                  <span className="font-mono text-cyan-300">
                    R′ = 0.92 R + 0.08 G
                  </span>
                  <br />
                  <span className="font-mono text-cyan-300">
                    G′ = 0.10 R + 0.80 G + 0.10 B
                  </span>
                  <br />
                  <span className="font-mono text-cyan-300">
                    B′ = 0.12 G + 0.88 B
                  </span>
                </li>
                <li>
                  I picked small off-diagonal weights so each channel stays itself but borrows a
                  bit from its neighbors. Then I clip to{' '}
                  <span className="font-mono text-cyan-300">[0, 1]</span>.
                </li>
              </ul>
            </li>
            <li>
              White Balancing
              <ul className="mt-2 space-y-2 list-disc text-slate-400">
                <li>
                  The color of the light that hit the scene affects the whole photo, known as the illuminant.
                  If it was a bit yellow or green, the whole photo looks tinted, including things that should be
                  white or gray.
                </li>
                <li>
                  To estimate the illuminant, I take the mean R, mean G, and mean B over every pixel. (i.e. [0.4, 0.5, 0.3])
                </li>
                <li>
                  To neutralize the tint, I want that average to be gray (average of R, G, and B means [0.4]).
                  I then scale each channel by{' '}
                  <span className="font-mono text-cyan-300">gray / that channel's mean</span>.
                  Then I clip to{' '} <span className="font-mono text-cyan-300">[0, 1]</span>.
                  So, in our example, the red plate pixels would be multiplied by 0.4 / 0.4 = 1, the green plate by 0.4 / 0.5 = 0.8, and the blue plate by 0.4 / 0.3 = 1.33.
                </li>
              </ul>
            </li>
          </ol>

          <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-3">
            <h3 className="text-sm font-semibold text-cyan-400 font-mono uppercase tracking-wider">
              Takeaways
            </h3>
            <div className="space-y-3 text-slate-300 leading-relaxed">
              <p>
                <span className="font-semibold text-white">Alignment (Better Features).</span> On
                plates like Emir, the three channels do not share the same brightness. I originally
                aligned on pixel intensity, but then switched to edges instead because it produced better results.
                You can see the intensity-only alignment below.
              </p>
              <p>
                <span className="font-semibold text-white">Cropping.</span> I keep more of the image
                than the hard-coded 10% crop (though that also means you can see more of the plate
                imperfections and scan rims at the edges).
              </p>
              <p>
                <span className="font-semibold text-white">Contrast.</span> The percentile
                stretch means our pixels use more of the <span className="font-mono text-cyan-300">[0, 1]</span>{' '}
                range, so the images look more lively.
              </p>
              <p>
                <span className="font-semibold text-white">Color mapping.</span> Mixing a little
                of each neighboring plate makes the color look less harsh. They're less like three
                filters stacked and more like one photo.
              </p>
              <p>
                <span className="font-semibold text-white">White balance.</span> Some plates come
                out with a tint (too green, too yellow). Pushing the average color toward gray
                makes whites look closer to white.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-white">Intensity versus gradient</h3>
              <p className="text-sm text-slate-400">
                Same search window and L2 score. Left scores raw brightness. Right scores edges.
              </p>
            </div>
            {[
              { id: 'emir', title: 'Emir' },
              { id: 'church', title: 'Church' },
            ].map((image) => (
              <div key={image.id} className="space-y-3">
                <h4 className="text-sm font-semibold text-white">{image.title}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
                  <ImageCard
                    src={INTENSITY_IMAGES[image.id]}
                    title="Intensity"
                    offset={INTENSITY_OFFSETS[image.id]}
                  />
                  <ImageCard
                    src={GRADIENT_IMAGES[image.id]}
                    title="Gradient"
                    offset={GRADIENT_OFFSETS[image.id]}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-8">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Rows3 className="w-5 h-5 text-cyan-400" />
              <span>Bells & Whistles Pipeline</span>
            </h2>
            <p className="text-sm text-slate-400">
              Each row is aligned / colorized, then cropped, contrast, white balance, and color
              mapping. Times are for the full pipeline.
            </p>
          </div>

          <div className="space-y-10">
            <PipelineRows images={PROVIDED_RESULTS} />
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-semibold text-white">Additional images</h3>
            <p className="text-sm text-slate-400">
                My post-processing is not as advanced as the LoC's, so the results are not as good.
                However, the alignment looks very similar, and I am pretty happy with the results!
            </p>
          </div>
          <div className="space-y-10">
            <PipelineRows images={EXTRA_RESULTS} />
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-slate-800/80 bg-slate-950/90 py-4 text-center text-xs text-slate-500 shrink-0">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Ethan Diec • CS280 Computer Vision Portfolio</p>
        </div>
      </footer>
    </div>
  );
}
