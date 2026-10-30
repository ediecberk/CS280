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

        <section id="homography" className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Code2 className="w-5 h-5 text-cyan-400" />
            <span>Part A.2: Recover Homographies</span>
          </h2>
          <p className="text-slate-300 leading-relaxed">
            A homography is a 3×3 matrix that says where each pixel of one
            photo should land in the other. The bottom-right entry is just a
            scale, so I set it to 1 and solve for the other eight numbers. One
            matching point{' '}
            <span className="font-mono text-cyan-300">(x, y)</span> in the
            first photo and{' '}
            <span className="font-mono text-cyan-300">(x′, y′)</span> in the
            second gives two equations.
          </p>
          <CodeBlock>{`[ x  y  1  0  0  0  -x' x  -x' y ]   [h11]   [x']
[ 0  0  0  x  y  1  -y' x  -y' y ] · [h12] = [y']
                                  [h13]
                                  [h21]
                                  [h22]
                                  [h23]
                                  [h31]
                                  [h32]`}</CodeBlock>
          <p className="text-slate-300 leading-relaxed">
            Four matching points are enough to pin down H. I use more than
            four and find the best fit for the extras. The matches themselves
            come from SIFT. I keep a match when its best partner looks clearly
            better than the second-best, throw out the bad ones with RANSAC,
            and then refit{' '}
            <span className="font-mono text-cyan-300">computeH</span> on what
            is left. The RANSAC loop and the solve are mine.{' '}
            <span className="font-mono text-cyan-300">cv2.findHomography</span>{' '}
            is not used.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Products like{' '}
            <span className="font-mono text-cyan-300">x′x</span> get huge when
            the coordinates are in pixels. For the courtyard left-to-center
            pair, that raw setup is badly scaled (condition number about
            1.3×10⁷). So I first move each point set to its center and shrink
            it to a fixed size, solve there, and undo the scaling afterward.
          </p>
          <p className="text-slate-300 leading-relaxed">
            One good match from that pair is{' '}
            <span className="font-mono text-cyan-300">(660.2, 699.9)</span> in
            the left photo and{' '}
            <span className="font-mono text-cyan-300">(366.9, 681.9)</span> in
            the center. It adds two of the 1446 rows. The fit itself uses all
            723 good matches.
          </p>
          <CodeBlock>{`H, left → center, courtyard
[[ 1.081    0.008   -332.425 ]
 [ 0.040    1.058    -44.262 ]
 [ 0.000086  0.000004   1.000 ]]`}</CodeBlock>
          <p className="text-slate-300 leading-relaxed">
            After the refit, the average miss, in pixels of the 1200-long
            photo:
          </p>
          <CodeBlock>{`courtyard    left    723 matches kept   1.05 px
courtyard    right   903 matches kept   1.09 px
living room  left     83 matches kept   0.58 px
living room  right   161 matches kept   1.52 px
laundry      left     29 matches kept   1.39 px
laundry      right   227 matches kept   1.67 px`}</CodeBlock>
          <p className="text-slate-300 leading-relaxed">
            The laundry left pair keeps the fewest matches. The overlap there
            is mostly the doorway and the machines, and not much else stays
            fixed. The matches that remain still land within about 1.4 pixels.
          </p>
          <p className="text-slate-300 leading-relaxed">
            The figures show 12 of the good matches, spread across the
            overlap. The homography uses every good match, not just the ones
            drawn.
          </p>
          <Figure
            src={publicUrl('p4/courtyard_matches.jpg')}
            caption="Courtyard matches. Top is left against center, bottom is right against center"
          />
          <Figure
            src={publicUrl('p4/livingroom_matches.jpg')}
            caption="Living room matches. They sit on the window, the frames, and the furniture"
          />
          <Figure
            src={publicUrl('p4/laundry_matches.jpg')}
            caption="Laundry matches. Fewer on the left pair, where the overlap is narrower"
          />
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
