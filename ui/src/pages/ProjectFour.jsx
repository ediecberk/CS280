import React from 'react';
import { Link } from 'react-router-dom';
import {
  Aperture,
  ArrowLeft,
  Blend,
  Camera,
  Code2,
  Grid3x3,
  List,
} from 'lucide-react';

function publicUrl(path) {
  if (!path) return null;
  const base = import.meta.env.BASE_URL ?? './';
  return `${base}${path.replace(/^\//, '')}`;
}

function Figure({ src, caption, className = '' }) {
  return (
    <figure className={`space-y-2 min-w-0 ${className}`}>
      <div className="rounded-lg bg-slate-950 border border-slate-800 overflow-hidden">
        <img src={src} alt={caption} className="block w-full h-auto" />
      </div>
      <figcaption className="text-xs text-slate-400 text-center font-mono italic">
        {caption}
      </figcaption>
    </figure>
  );
}

function CodeBlock({ children }) {
  return (
    <pre className="overflow-x-auto rounded-lg bg-slate-950 border border-slate-800 p-4 text-xs sm:text-sm leading-relaxed text-slate-200 font-mono">
      <code>{children}</code>
    </pre>
  );
}

function formatH(rows) {
  const cell = (v) =>
    Math.abs(v) > 0 && Math.abs(v) < 1e-3 ? v.toExponential(3) : Number(v.toFixed(6)).toString();
  return rows.map((row) => `[${row.map(cell).join(', ')}]`).join(',\n ');
}

function PointTable({ srcLabel, dstLabel, points }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-800">
      <table className="w-full text-xs sm:text-sm text-left font-mono">
        <thead className="bg-slate-950 text-slate-400">
          <tr>
            <th className="px-3 py-2 font-medium">#</th>
            <th className="px-3 py-2 font-medium">{srcLabel}</th>
            <th className="px-3 py-2 font-medium">{dstLabel}</th>
          </tr>
        </thead>
        <tbody className="text-slate-200">
          {points.map((p) => (
            <tr key={p.n} className="border-t border-slate-800">
              <td className="px-3 py-1.5 text-slate-400">{p.n}</td>
              <td className="px-3 py-1.5">
                ({p.src[0].toFixed(1)}, {p.src[1].toFixed(1)})
              </td>
              <td className="px-3 py-1.5">
                ({p.dst[0].toFixed(1)}, {p.dst[1].toFixed(1)})
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PairBlock({ title, srcLabel, dstLabel, points, H }) {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-cyan-300 font-mono">{title}</h4>
      <PointTable srcLabel={srcLabel} dstLabel={dstLabel} points={points} />
      <CodeBlock>{`H =\n[[ ${formatH(H)} ]]`}</CodeBlock>
    </div>
  );
}

const HOMOGRAPHY_DATA = {
  courtyard: {
    left: {
      points: [
        { n: 1, src: [660.2, 699.9], dst: [366.9, 681.9] },
        { n: 2, src: [345.6, 88.0], dst: [37.4, 62.3] },
        { n: 3, src: [314.2, 1122.5], dst: [14.2, 1119.0] },
        { n: 4, src: [866.8, 211.3], dst: [561.8, 198.4] },
        { n: 5, src: [842.2, 1167.6], dst: [544.7, 1138.8] },
        { n: 6, src: [338.2, 476.9], dst: [35.4, 459.4] },
        { n: 7, src: [350.4, 802.1], dst: [50.9, 792.0] },
        { n: 8, src: [616.7, 376.6], dst: [319.5, 359.4] },
      ],
      H: [
        [1.0812, 0.008384, -332.4249],
        [0.040093, 1.0577, -44.26201],
        [8.587e-5, 3.703e-6, 1.0],
      ],
    },
    right: {
      points: [
        { n: 1, src: [327.4, 750.5], dst: [672.5, 747.5] },
        { n: 2, src: [72.3, 247.7], dst: [427.2, 245.8] },
        { n: 3, src: [47.9, 1189.5], dst: [397.2, 1172.2] },
        { n: 4, src: [534.1, 1166.9], dst: [885.1, 1176.6] },
        { n: 5, src: [517.3, 328.8], dst: [874.2, 320.4] },
        { n: 6, src: [14.0, 603.0], dst: [365.7, 595.2] },
        { n: 7, src: [60.1, 898.1], dst: [408.8, 885.3] },
        { n: 8, src: [263.5, 465.4], dst: [611.7, 460.6] },
      ],
      H: [
        [0.925799, -0.003849, 354.7876],
        [-0.03936, 0.977774, 5.45711],
        [-8.519e-5, 3.699e-7, 1.0],
      ],
    },
  },
  livingroom: {
    left: {
      points: [
        { n: 1, src: [645.4, 684.1], dst: [188.3, 680.6] },
        { n: 2, src: [834.0, 701.3], dst: [366.4, 685.1] },
        { n: 3, src: [534.6, 584.6], dst: [62.7, 580.5] },
        { n: 4, src: [569.2, 753.6], dst: [106.0, 760.1] },
        { n: 5, src: [741.7, 675.0], dst: [283.9, 665.6] },
        { n: 6, src: [651.8, 604.8], dst: [194.4, 599.9] },
        { n: 7, src: [540.2, 660.9], dst: [73.0, 663.2] },
        { n: 8, src: [668.9, 749.6], dst: [212.5, 745.4] },
      ],
      H: [
        [1.948053, 0.051877, -970.5362],
        [0.515658, 1.852133, -434.8015],
        [0.000935, 0.000157, 1.0],
      ],
    },
    right: {
      points: [
        { n: 1, src: [180.0, 1098.9], dst: [581.1, 1109.1] },
        { n: 2, src: [64.6, 563.7], dst: [419.9, 578.1] },
        { n: 3, src: [405.1, 737.5], dst: [767.2, 769.6] },
        { n: 4, src: [203.6, 752.5], dst: [561.8, 764.7] },
        { n: 5, src: [20.7, 741.6], dst: [395.6, 738.7] },
        { n: 6, src: [341.2, 1095.5], dst: [746.6, 1146.2] },
        { n: 7, src: [65.0, 1162.9], dst: [478.5, 1145.5] },
        { n: 8, src: [247.4, 642.8], dst: [592.7, 659.0] },
      ],
      H: [
        [0.647731, 0.065413, 313.5923],
        [-0.172879, 0.813485, 95.34769],
        [-0.000335, -6.908e-5, 1.0],
      ],
    },
  },
  laundry: {
    left: {
      points: [
        { n: 1, src: [700.4, 897.8], dst: [198.6, 859.8] },
        { n: 2, src: [753.1, 141.4], dst: [218.3, 102.0] },
        { n: 3, src: [694.4, 1102.7], dst: [205.0, 1058.5] },
        { n: 4, src: [702.3, 329.3], dst: [177.2, 289.5] },
        { n: 5, src: [874.8, 965.5], dst: [356.2, 887.3] },
        { n: 6, src: [521.7, 847.7], dst: [16.5, 845.9] },
        { n: 7, src: [817.5, 843.3], dst: [306.0, 787.2] },
        { n: 8, src: [724.3, 831.2], dst: [218.1, 790.7] },
      ],
      H: [
        [1.528444, 0.080411, -841.7709],
        [0.222694, 1.52509, -234.855],
        [0.000614, 7.89e-5, 1.0],
      ],
    },
    right: {
      points: [
        { n: 1, src: [310.2, 886.4], dst: [664.5, 860.6] },
        { n: 2, src: [36.1, 722.6], dst: [396.9, 667.1] },
        { n: 3, src: [495.0, 968.9], dst: [882.3, 986.9] },
        { n: 4, src: [330.2, 690.0], dst: [680.2, 659.6] },
        { n: 5, src: [130.7, 878.9], dst: [485.7, 826.6] },
        { n: 6, src: [445.7, 794.9], dst: [818.0, 783.4] },
        { n: 7, src: [177.3, 659.5], dst: [523.0, 617.1] },
        { n: 8, src: [222.8, 786.1], dst: [575.4, 746.2] },
      ],
      H: [
        [0.72458, 0.0354, 344.4597],
        [-0.164487, 0.948823, -13.82355],
        [-0.00036, 1.438e-5, 1.0],
      ],
    },
  },
};

export default function ProjectFour() {
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
            CS280 • Project 4
          </span>
        </div>
      </header>

      <main className="relative z-10 flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 w-full space-y-12">
        <section className="space-y-4 border-b border-slate-800 pb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Project 4: Image Warping and Mosaicing{' '}
            <Aperture className="inline-block w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-cyan-400" />
          </h1>
          <p className="text-slate-300 leading-relaxed max-w-3xl">
            Part A turns a few photos from one spot into a wider view. I find
            how each side photo lines up with the center one, stretch the side
            photos to match, and smooth the overlap. The same stretch also
            makes a fridge and a microwave door look flat and front-facing. I
            wrap the courtyard onto a cylinder as well.
          </p>
          <p className="text-slate-300 leading-relaxed max-w-3xl">
            Before any of that, every photo is resized so its long side is
            1200 pixels. The errors below are in those pixels.
          </p>
        </section>

        <section className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <List className="w-5 h-5 text-cyan-400" />
            <span>Contents</span>
          </h2>
          <nav className="space-y-1 text-sm">
            {[
              ['shoot', 'A.1 Shoot the Pictures', 'Courtyard, living room, and laundry, three views each'],
              ['homography', 'A.2 Recover Homographies', 'How the photos are lined up, and the six fits'],
              ['warp', 'A.3 Warp the Images', 'Two ways to fill in pixels, on the fridge and the microwave'],
              ['mosaic', 'A.4 Blend into a Mosaic', 'A hard seam, then a soft blend, on all three sets'],
              ['cylinder', 'A.5 Cylindrical Mosaic', 'The courtyard wrapped onto a cylinder'],
            ].map(([id, title, blurb]) => (
              <button
                key={id}
                type="button"
                onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
                className="block w-full text-left rounded-lg p-3 hover:bg-slate-800/60 transition-colors"
              >
                <div className="font-semibold text-white">{title}</div>
                <p className="text-slate-400 mt-1">{blurb}</p>
              </button>
            ))}
          </nav>
        </section>

        <section id="shoot" className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Camera className="w-5 h-5 text-cyan-400" />
            <span>Part A.1: Shoot the Pictures</span>
          </h2>
          <p className="text-slate-300 leading-relaxed">
            I took all of these myself. I stood in one place and turned the
            phone between shots, so the views share the same center of
            projection. Each set is a left, a center, and a right, with a large
            overlap. The courtyard is outdoors. The living room and the laundry
            room are indoors.
          </p>
          <Figure
            src={publicUrl('p4/courtyard_sources.jpg')}
            caption="Courtyard. Left, center, and right. The building, the chairs, and the tile show up in more than one shot"
          />
          <Figure
            src={publicUrl('p4/livingroom_sources.jpg')}
            caption="Living room. Left, center, and right. The window sits in all three"
          />
          <Figure
            src={publicUrl('p4/laundry_sources.jpg')}
            caption="Laundry room. Left, center, and right. The machines and the window sit in the overlap"
          />
        </section>

        <section id="homography" className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-8">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Code2 className="w-5 h-5 text-cyan-400" />
            <span>Part A.2: Recover Homographies</span>
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Each matching point in one photo and the other gives two rows of the
            system that solves for H. Stack many of those rows and solve for the
            eight unknowns.
          </p>
          <CodeBlock>{`[x, y, 1, 0, 0, 0, -x'x, -x'y] h = x'
[0, 0, 0, x, y, 1, -y'x, -y'y] h = y'`}</CodeBlock>

          <div className="space-y-6">
            <h3 className="text-base font-semibold text-white">Courtyard</h3>
            <Figure
              src={publicUrl('p4/courtyard_matches.jpg')}
              caption="Courtyard matches. Top left→center, bottom right→center"
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PairBlock
                title="Left → center"
                srcLabel="Left (x, y)"
                dstLabel="Center (x, y)"
                points={HOMOGRAPHY_DATA.courtyard.left.points}
                H={HOMOGRAPHY_DATA.courtyard.left.H}
              />
              <PairBlock
                title="Right → center"
                srcLabel="Right (x, y)"
                dstLabel="Center (x, y)"
                points={HOMOGRAPHY_DATA.courtyard.right.points}
                H={HOMOGRAPHY_DATA.courtyard.right.H}
              />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-base font-semibold text-white">Living room</h3>
            <Figure
              src={publicUrl('p4/livingroom_matches.jpg')}
              caption="Living room matches. Top left→center, bottom right→center"
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PairBlock
                title="Left → center"
                srcLabel="Left (x, y)"
                dstLabel="Center (x, y)"
                points={HOMOGRAPHY_DATA.livingroom.left.points}
                H={HOMOGRAPHY_DATA.livingroom.left.H}
              />
              <PairBlock
                title="Right → center"
                srcLabel="Right (x, y)"
                dstLabel="Center (x, y)"
                points={HOMOGRAPHY_DATA.livingroom.right.points}
                H={HOMOGRAPHY_DATA.livingroom.right.H}
              />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-base font-semibold text-white">Laundry</h3>
            <Figure
              src={publicUrl('p4/laundry_matches.jpg')}
              caption="Laundry matches. Top left→center, bottom right→center"
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PairBlock
                title="Left → center"
                srcLabel="Left (x, y)"
                dstLabel="Center (x, y)"
                points={HOMOGRAPHY_DATA.laundry.left.points}
                H={HOMOGRAPHY_DATA.laundry.left.H}
              />
              <PairBlock
                title="Right → center"
                srcLabel="Right (x, y)"
                dstLabel="Center (x, y)"
                points={HOMOGRAPHY_DATA.laundry.right.points}
                H={HOMOGRAPHY_DATA.laundry.right.H}
              />
            </div>
          </div>
        </section>

        <section id="warp" className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Grid3x3 className="w-5 h-5 text-cyan-400" />
            <span>Part A.3: Warp the Images</span>
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Both warps work backward. For each pixel in the output, I ask H
            where that pixel came from in the source photo, then read the color
            there. Going forward from the source would leave holes. Nearest
            neighbor grabs the closest source pixel. Bilinear mixes the four
            around it.
          </p>
          <CodeBlock>{`I(x, y) = I00 (x1-x)(y1-y) + I10 (x-x0)(y1-y)
         + I01 (x1-x)(y-y0) + I11 (x-x0)(y-y0)`}</CodeBlock>
          <p className="text-slate-300 leading-relaxed">
            I checked the warp on the front of a fridge and on a microwave
            door. Both are rectangles in the room and skewed shapes in the
            photo. I marked the four corners and mapped them onto a rectangle
            whose width and height are the average edge lengths of that shape.
            A small margin sits around it so the object fills the result.
          </p>
          <Figure
            src={publicUrl('p4/fridge_marked.jpg')}
            caption="Fridge. The outline is the front face: both doors and the freezer drawer"
          />
          <Figure
            src={publicUrl('p4/fridge_bilinear.jpg')}
            caption="Bilinear result. The doors, the handles, and the paper look front-facing. A sliver of the left side is still visible, because that side faces a different way"
          />
          <Figure
            src={publicUrl('p4/microwave_marked.jpg')}
            caption="Microwave. The outline is the door glass"
          />
          <Figure
            src={publicUrl('p4/microwave_bilinear.jpg')}
            caption="Bilinear result. The glass is a flat window, with the handle along the right edge"
          />
          <p className="text-slate-300 leading-relaxed">
            On the fridge, nearest neighbor took 0.07 seconds and bilinear took
            0.11 seconds. The crop below is the same spot of both. Nearest
            neighbor turns the handle and the paper into steps. Bilinear
            follows the curve and keeps the writing readable. The mosaics use
            bilinear.
          </p>
          <Figure
            src={publicUrl('p4/fridge_compare.jpg')}
            caption="Fridge handle and paper. Left is nearest neighbor, right is bilinear"
          />
          <Figure
            src={publicUrl('p4/microwave_compare.jpg')}
            caption="Microwave door mesh. Nearest neighbor breaks the dots into blocks. Bilinear keeps the screen even"
          />
        </section>

        <section id="mosaic" className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Blend className="w-5 h-5 text-cyan-400" />
            <span>Part A.4: Blend the Images into a Mosaic</span>
          </h2>
          <p className="text-slate-300 leading-relaxed">
            The center photo stays where it is. The left and right photos are
            stretched into that same view. I send the four corners of each
            photo through its H, take the bounding box of everything, and
            stretch all three into that shared canvas.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Dropping the side photos on top of the center leaves a hard edge
            wherever one photo starts. So each photo also gets a weight that is
            high in the middle and falls toward the border. I stretch the
            weight with the photo. Where two photos overlap, the weights are
            turned into a mix, so the middle of a photo counts more than its
            edge.
          </p>
          <CodeBlock>{`out = Σ (image · weight) / Σ weight`}</CodeBlock>
          <p className="text-slate-300 leading-relaxed">
            On the courtyard, a hard paste draws a vertical line through the
            windows and the tile, where the brightness changes. The soft mix
            takes that line out. The three bilinear stretches for this mosaic
            took 1.37 seconds.
          </p>
          <Figure
            src={publicUrl('p4/courtyard_hard.jpg')}
            caption="Courtyard, side photos pasted on top of the center. The seam is a bright vertical cut"
          />
          <Figure
            src={publicUrl('p4/courtyard_mosaic.jpg')}
            caption="Courtyard, same lineup, soft mix. The windows, the tile, and the chairs meet without a cut"
          />
          <p className="text-slate-300 leading-relaxed">
            The living room lines up on the window and the chairs. The right
            wall and the plant show up twice. The phone shifted a little
            between shots, and that wall is close, so one stretch cannot seat
            the near wall and the far window together. The black wedges are
            parts of the canvas no photo covers.
          </p>
          <Figure
            src={publicUrl('p4/livingroom_mosaic.jpg')}
            caption="Living room. The back wall agrees. The right wall and the plant show up twice, and the ceiling has an uncovered notch"
          />
          <p className="text-slate-300 leading-relaxed">
            The laundry room is the tightest of the three, and it still
            stitches. The window bars and the machines continue across the
            seam. The upper cabinets keep a faint second edge. This mosaic took
            2.96 seconds to stretch.
          </p>
          <Figure
            src={publicUrl('p4/laundry_mosaic.jpg')}
            caption="Laundry room. The window and the machines line up. The cabinets keep a faint second edge"
          />
        </section>

        <section id="cylinder" className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Aperture className="w-5 h-5 text-cyan-400" />
            <span>Part A.5: Cylindrical Mosaic</span>
          </h2>
          <p className="text-slate-300 leading-relaxed">
            A wide turn mapped onto a flat plane bends the outer photos. I also
            built the courtyard on a cylinder. Each output pixel has an angle
            and a height. I turn those back into a pixel in one of the
            original photos and read the color once, with the same bilinear
            mix. On the cylinder, the side photos are just left-right shifts of
            the center, estimated from the same good matches.
          </p>
          <CodeBlock>{`θ = arctan((x - cx) / f)
x = f · tan(θ) + cx
y = y_cyl / cos(θ) + cy`}</CodeBlock>
          <p className="text-slate-300 leading-relaxed">
            The radius of the cylinder is the focal length in pixels. A 26 mm
            lens on this 900-pixel-wide photo would be about 650 px. I tried
            radii from 0.35 to 2.4 times the width and kept the one where the
            matched points agree on a single shift. That radius is 1781 px.
            The leftover miss is 0.00072 in angle units. The left photo sits
            292 px to the left of center, the right photo 344 px to the right.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Because the radius is large, the bow is gentle. The building’s
            vertical edges stay straight across all three photos, and the top
            and bottom of the canvas curve a little. The same soft mix blends
            the overlap.
          </p>
          <Figure
            src={publicUrl('p4/courtyard_cylinder.jpg')}
            caption="Courtyard on a cylinder of radius 1781 px. The outer border bows. The window grid stays vertical"
          />
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
