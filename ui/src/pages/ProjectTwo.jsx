import React from 'react';
import { Link } from 'react-router-dom';
import { Aperture, ArrowLeft, Blend, Code2, Combine, Grid3x3, Layers, List, Palette } from 'lucide-react';

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

export default function ProjectTwo() {
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
            CS280 • Project 2
          </span>
        </div>
      </header>

      <main className="relative z-10 flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 w-full space-y-12">
        <section className="space-y-4 border-b border-slate-800 pb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Project 2: Fun with Filters and Frequencies{' '}
            <Layers className="inline-block w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-cyan-400" />
          </h1>
          <p className="text-slate-300 leading-relaxed max-w-3xl">
            Building 2D convolution from scratch, using finite differences and a Gaussian
            to pull edges out of the cameraman image, sharpening a photo by adding its high
            frequencies back, mixing two photos so the one you see depends on how far away you
            stand, and blending an apple into an orange across a seam.
          </p>
        </section>

        <section className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <List className="w-5 h-5 text-cyan-400" />
            <span>Contents</span>
          </h2>
          <nav className="space-y-1 text-sm">
            {[
              ['part-1-1', '1.1 Convolutions from Scratch', 'Four loops, two loops, and a 9×9 box on a photo of me'],
              ['part-1-2', '1.2 Finite Difference Operator', 'Dx, Dy, gradient magnitude, and a thresholded edge image'],
              ['part-1-3', '1.3 Derivative of Gaussian', 'Blur first, then the same edges, packed into one filter'],
              ['bells', 'Bells & Whistles', 'Gradient direction drawn with hue'],
              ['part-2-1', '2.1 Image Sharpening', 'Unsharp mask on the Taj Mahal, and a blur that sharpening cannot undo'],
              ['part-2-2', '2.2 Hybrid Images', 'Derek and Nutmeg, then a cow and two presidents'],
              ['part-2-2-color', '2.2 Bells & Whistles', 'Color on the low band, the high band, or both'],
              ['part-2-3', '2.3 Gaussian and Laplacian Stacks', 'Same-size blur levels of the apple and the orange'],
              ['part-2-4', '2.4 Multiresolution Blending', 'The oraple, two portraits, and a day into a night'],
              ['part-2-4-color', '2.4 Bells & Whistles', 'Where the fruit color actually lives'],
              ['learned', 'What I learned', 'A filter sliding over the image, applied a few different ways'],
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

        <section id="part-1-1" className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Code2 className="w-5 h-5 text-cyan-400" />
            <span>Part 1.1: Convolutions from Scratch</span>
          </h2>
          <p className="text-slate-300 leading-relaxed">
            A convolution replaces every pixel with a weighted sum of its neighborhood. The weights
            are the filter. I flip the filter on both axes first, then slide it. That flip is what
            makes this convolution rather than cross-correlation. The 9×9 box is symmetric, so the
            flip does nothing to it. <span className="font-mono text-cyan-300">D<sub>x</sub></span> and{' '}
            <span className="font-mono text-cyan-300">D<sub>y</sub></span> are not, so skipping the
            flip would negate them.
          </p>

          <div className="space-y-3">
            <h3 className="text-base font-semibold text-white">Boundaries</h3>
            <p className="text-slate-300 leading-relaxed">
              Pixels outside the image are 0. That is the same rule as{' '}
              <span className="font-mono text-cyan-300">scipy.signal.convolve2d(..., boundary="fill", fillvalue=0)</span>.
              <span className="font-mono text-cyan-300"> full</span> keeps every place the filter still
              touches the image, so the result grows.{' '}
              <span className="font-mono text-cyan-300">same</span> center-crops that full result back
              to the original size, which is how SciPy defines it. For an odd filter the pad is
              symmetric. For an even one, like{' '}
              <span className="font-mono text-cyan-300">D<sub>x</sub></span> (width 2), the extra sample
              stays on the bottom and right.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Zero fill is why the box blur has a gray frame. White background pixels along the border
              get averaged with black pixels from outside the photo.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-semibold text-white">Four loops</h3>
            <p className="text-slate-300 leading-relaxed">
              One loop per output row, column, filter row, and filter column.
            </p>
            <CodeBlock>{`flipped = kernel[::-1, ::-1]
padded = np.pad(
    image,
    ((kh - 1, kh - 1), (kw - 1, kw - 1)),
    mode="constant",
    constant_values=0,
)

for i in range(out_h):
    for j in range(out_w):
        acc = 0.0
        for m in range(kh):
            for n in range(kw):
                acc += padded[i + m, j + n] * flipped[m, n]
        output[i, j] = acc`}</CodeBlock>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-semibold text-white">Two loops</h3>
            <p className="text-slate-300 leading-relaxed">
              Same pad and the same flip. The two filter loops become one NumPy sum over the window.
            </p>
            <CodeBlock>{`for i in range(out_h):
    for j in range(out_w):
        window = padded[i:i + kh, j:j + kw]
        output[i, j] = np.sum(window * flipped)`}</CodeBlock>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-semibold text-white">Compared with SciPy</h3>
            <p className="text-slate-300 leading-relaxed">
              Both versions match <span className="font-mono text-cyan-300">convolve2d(..., boundary="fill", fillvalue=0)</span>{' '}
              on odd kernels, even kernels, and both <span className="font-mono text-cyan-300">same</span> and{' '}
              <span className="font-mono text-cyan-300">full</span>. On my 480×298 photo the largest
              absolute error is about <span className="font-mono text-cyan-300">7×10⁻¹⁶</span>.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-slate-300">
                <thead>
                  <tr className="text-left text-xs font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800">
                    <th className="py-2 pr-4 font-medium">Filter</th>
                    <th className="py-2 pr-4 font-medium">Four loops</th>
                    <th className="py-2 pr-4 font-medium">Two loops</th>
                    <th className="py-2 pr-4 font-medium">SciPy</th>
                    <th className="py-2 font-medium">Max |error|</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-cyan-300">
                  <tr className="border-b border-slate-800/80">
                    <td className="py-2 pr-4 text-slate-300">9×9 box</td>
                    <td className="py-2 pr-4">1.94 s</td>
                    <td className="py-2 pr-4">0.273 s</td>
                    <td className="py-2 pr-4">0.014 s</td>
                    <td className="py-2">6.7×10⁻¹⁶</td>
                  </tr>
                  <tr className="border-b border-slate-800/80">
                    <td className="py-2 pr-4 text-slate-300">D<sub>x</sub></td>
                    <td className="py-2 pr-4">0.080 s</td>
                    <td className="py-2 pr-4">0.238 s</td>
                    <td className="py-2 pr-4">0.0012 s</td>
                    <td className="py-2">0</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-slate-300">D<sub>y</sub></td>
                    <td className="py-2 pr-4">0.106 s</td>
                    <td className="py-2 pr-4">0.240 s</td>
                    <td className="py-2 pr-4">0.0015 s</td>
                    <td className="py-2">0</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-slate-300 leading-relaxed">
              The four-loop version spends its time in Python, once per filter tap. On the 9×9 box
              that is 81 taps per pixel, so the two-loop version is about seven times faster. {' '}
              <span className="font-mono text-cyan-300">D<sub>x</sub></span> and{' '}
              <span className="font-mono text-cyan-300">D<sub>y</sub></span> only have two taps, and
              calling <span className="font-mono text-cyan-300">np.sum</span> at every pixel costs
              more than those two multiplies, so the four-loop version wins there. SciPy is compiled,
              and it is the fastest of the three in every case.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-semibold text-white">Box, D<sub>x</sub>, and D<sub>y</sub> on a photo of me</h3>
            <p className="text-slate-300 leading-relaxed">
              Read as grayscale. The long side is 480 pixels so the pure-Python loops stay practical.
            </p>
            <CodeBlock>{`box = np.ones((9, 9)) / 81.0
Dx = np.array([[1.0, -1.0]])
Dy = np.array([[1.0], [-1.0]])`}</CodeBlock>
            <p className="text-slate-300 leading-relaxed">
              The box sums to 1, so each output pixel is the average of a 9×9 neighborhood. After the
              flip, <span className="font-mono text-cyan-300">D<sub>x</sub></span> is this pixel minus
              the one to its left, and <span className="font-mono text-cyan-300">D<sub>y</sub></span> is
              this pixel minus the one above it. In the derivative figures, gray is a zero response.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Figure src={publicUrl('p2/original.png')} caption="Input, grayscale" />
              <Figure src={publicUrl('p2/box.png')} caption="9×9 box filter" />
              <Figure src={publicUrl('p2/dx.png')} caption="Dx = [1, −1]" />
              <Figure src={publicUrl('p2/dy.png')} caption="Dy, vertical difference" />
            </div>
            <p className="text-slate-300 leading-relaxed">
              The box wipes out fine structure: hair, teeth, and the collar stitching all dissolve into
              the local average. <span className="font-mono text-cyan-300">D<sub>x</sub></span> lights
              up vertical boundaries, such as the sides of the face and the collar. {' '}
              <span className="font-mono text-cyan-300">D<sub>y</sub></span> lights up horizontal ones:
              the eyebrows, the mouth, the hairline, and the collar seam. Each edge is a light ridge on
              one side and a dark ridge on the other, which is the sign of the difference. Flat regions
              stay gray.
            </p>
          </div>
        </section>

        <section id="part-1-2" className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Grid3x3 className="w-5 h-5 text-cyan-400" />
            <span>Part 1.2: Finite Difference Operator</span>
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Same <span className="font-mono text-cyan-300">D<sub>x</sub></span> and{' '}
            <span className="font-mono text-cyan-300">D<sub>y</sub></span>, now on the cameraman, using{' '}
            <span className="font-mono text-cyan-300">scipy.signal.convolve2d</span>. The gradient
            magnitude is{' '}
            <span className="font-mono text-cyan-300">√(D<sub>x</sub>² + D<sub>y</sub>²)</span>.
            A pixel is an edge when that magnitude is above 0.18, on an image scaled to{' '}
            <span className="font-mono text-cyan-300">[0, 1]</span>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Figure src={publicUrl('p2/cameraman.png')} caption="Cameraman" />
            <Figure src={publicUrl('p2/cameraman_dx.png')} caption="Partial derivative in x" />
            <Figure src={publicUrl('p2/cameraman_dy.png')} caption="Partial derivative in y" />
            <Figure src={publicUrl('p2/cameraman_magnitude.png')} caption="Gradient magnitude" />
          </div>
          <Figure src={publicUrl('p2/cameraman_edges.png')} caption="Edges, threshold 0.18" />
          <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-2">
            <h3 className="text-sm font-semibold text-cyan-400 font-mono uppercase tracking-wider">
              Threshold
            </h3>
            <p className="text-slate-300 leading-relaxed">
              I tried a few cutoffs. Around 0.08 the grass turns into a carpet of specks, because a
              one-pixel difference treats texture as an edge. Around 0.30 the coat and tripod stay,
              but the horizon and the distant buildings start to disappear. 0.18 is the compromise:
              the coat, camera, tripod, and skyline remain, and most of the grass drops out. About
              4.8% of the pixels survive. The leftover specks in the grass are real texture, and
              killing all of them also kills the faint skyline.
            </p>
          </div>
        </section>

        <section id="part-1-3" className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <span>Part 1.3: Derivative of Gaussian</span>
          </h2>
          <p className="text-slate-300 leading-relaxed">
            The finite-difference edges are noisy because they look at one pixel of change. A Gaussian
            is another averaging filter, like the box, except the weights peak in the center and fall
            off. A pixel is replaced mostly by its close neighbors, so a speck that disagrees with
            the pixels around it gets pulled toward them. A real edge is a whole neighborhood changing
            together, so the average only softens it and spreads it over a few pixels.
          </p>
          <p className="text-slate-300 leading-relaxed">
            I build it with <span className="font-mono text-cyan-300">cv2.getGaussianKernel</span> and
            an outer product. <span className="font-mono text-cyan-300">σ = 2</span> and the kernel is
            13×13, which covers about three standard deviations on each side. It sums to 1.
          </p>
          <CodeBlock>{`column = cv2.getGaussianKernel(13, 2.0)
gaussian = column @ column.T`}</CodeBlock>
          <p className="text-slate-300 leading-relaxed">
            Blur the cameraman with that kernel, then repeat Part 1.2. Smoothing lowers the peak
            gradients, so the threshold drops from 0.18 to 0.05. About 9.8% of the pixels are edges,
            and they are thicker and much quieter.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Figure src={publicUrl('p2/cameraman_blur.png')} caption="Gaussian blur, σ = 2" />
            <Figure src={publicUrl('p2/cameraman_blur_magnitude.png')} caption="Magnitude after the blur" />
            <Figure src={publicUrl('p2/cameraman_blur_dx.png')} caption="Dx of the blurred image" />
            <Figure src={publicUrl('p2/cameraman_blur_dy.png')} caption="Dy of the blurred image" />
          </div>
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-white">Compared with finite differences</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Figure src={publicUrl('p2/cameraman_edges.png')} caption="Finite difference edges, threshold 0.18" />
              <Figure src={publicUrl('p2/cameraman_blur_edges.png')} caption="After the Gaussian, threshold 0.05" />
            </div>
            <p className="text-slate-300 leading-relaxed">
              The finite-difference edges are thin and speckled. Grass and film grain show up. After the
              Gaussian, those specks are gone, the skyline and tripod stay, and each edge is a smoother
              band instead of a one-pixel crack.
            </p>
          </div>
          <p className="text-slate-300 leading-relaxed">
            Convolution can do both steps at once. I convolve the Gaussian with{' '}
            <span className="font-mono text-cyan-300">D<sub>x</sub></span> and with{' '}
            <span className="font-mono text-cyan-300">D<sub>y</sub></span> to get the
            derivative-of-Gaussian filters. Each one is a bright lobe next to a dark lobe: horizontal
            for x, vertical for y. Gray in the middle of the filter is weight 0.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Figure src={publicUrl('p2/dog_x.png')} caption="DoG filter in x" className="max-w-sm mx-auto w-full" />
            <Figure src={publicUrl('p2/dog_y.png')} caption="DoG filter in y" className="max-w-sm mx-auto w-full" />
          </div>
          <p className="text-slate-300 leading-relaxed">
            One convolution of the cameraman with these filters matches blur-then-derivative. Inside
            the image the max absolute difference is about{' '}
            <span className="font-mono text-cyan-300">10⁻¹⁵</span>. Along the border it can reach
            about 0.4, because two separate <span className="font-mono text-cyan-300">same</span>{' '}
            convolutions pad the edge differently than one convolution with the combined filter.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Figure src={publicUrl('p2/cameraman_blur_dx.png')} caption="Blur, then Dx" />
            <Figure src={publicUrl('p2/cameraman_dog_dx.png')} caption="Single convolution with the DoG in x" />
            <Figure src={publicUrl('p2/cameraman_blur_dy.png')} caption="Blur, then Dy" />
            <Figure src={publicUrl('p2/cameraman_dog_dy.png')} caption="Single convolution with the DoG in y" />
          </div>
        </section>

        <section id="bells" className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Palette className="w-5 h-5 text-cyan-400" />
            <span>Bells & Whistles: Gradient Orientation</span>
          </h2>
          <p className="text-slate-300 leading-relaxed">
            <span className="font-mono text-cyan-300">D<sub>x</sub></span> and{' '}
            <span className="font-mono text-cyan-300">D<sub>y</sub></span> are the two components of
            one arrow: the direction in which brightness increases. I turn that arrow into an angle
            and draw the angle as hue. Brightness of the color is the gradient magnitude, so flat
            areas stay black. Saturation is full wherever there is an edge.
          </p>
          <p className="text-slate-300 leading-relaxed">
            The angle is a polynomial arctangent, with no library angle function. For inputs in{' '}
            <span className="font-mono text-cyan-300">[0, 1]</span>, arctangent is a polynomial in{' '}
            <span className="font-mono text-cyan-300">x²</span>, multiplied by{' '}
            <span className="font-mono text-cyan-300">x</span>. For larger inputs I use{' '}
            <span className="font-mono text-cyan-300">arctan(x) = π/2 − arctan(1/x)</span>. The
            quadrant comes from the signs of <span className="font-mono text-cyan-300">D<sub>x</sub></span> and{' '}
            <span className="font-mono text-cyan-300">D<sub>y</sub></span>, the same cases a normal{' '}
            <span className="font-mono text-cyan-300">atan2</span> handles. Checked against the library
            function, the largest error on a test grid is about{' '}
            <span className="font-mono text-cyan-300">10⁻⁸</span> radians. Hue is that angle wrapped
            onto <span className="font-mono text-cyan-300">[0, 1]</span>, then converted to RGB by
            hand.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
            <Figure
              src={publicUrl('p2/orientation_legend.png')}
              caption="Right is red, down is yellow-green, left is cyan, up is blue"
              className="max-w-sm mx-auto w-full"
            />
            <Figure
              src={publicUrl('p2/cameraman_blur_orientation.png')}
              caption="Orientation after the Gaussian blur"
            />
          </div>
          <p className="text-slate-300 leading-relaxed">
            The arrow points toward the brighter side. The left edge of the dark coat is cyan because
            the bright background is to the left of that edge. Tripod legs take on a color for
            whichever way the brightness jumps across them. I cleared the outer few rows before
            coloring, because zero padding makes the image border a fake edge and it was drawing a
            neon frame around the whole photo.
          </p>
          <Figure
            src={publicUrl('p2/cameraman_orientation.png')}
            caption="Same drawing before the blur. The grass is noisy color."
          />
          <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-2">
            <h3 className="text-sm font-semibold text-cyan-400 font-mono uppercase tracking-wider">
              Takeaway
            </h3>
            <p className="text-slate-300 leading-relaxed">
              The filter is just the weights. Convolution is sliding them. The box, the finite
              differences, and the Gaussian are the same operation. Blurring and then taking{' '}
              <span className="font-mono text-cyan-300">D<sub>x</sub></span> is the same thing as
              building one filter that already has the blur in it.
            </p>
          </div>
        </section>

        <section id="part-2-1" className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Aperture className="w-5 h-5 text-cyan-400" />
            <span>Part 2.1: Image Sharpening</span>
          </h2>
          <p className="text-slate-300 leading-relaxed">
            The Gaussian from Part 1.3 is a low-pass filter. It keeps the slow changes in brightness
            and drops the fine ones. Subtracting that blur from the original leaves the high
            frequencies: edges, carving, whiskers. An image looks sharper when those are stronger, so
            I add a fraction of them back. The fraction is{' '}
            <span className="font-mono text-cyan-300">α</span>.
          </p>
          <p className="text-slate-300 leading-relaxed">
            <span className="font-mono text-cyan-300">
              sharp = I + α (I − I ∗ G) = I ∗ ((1 + α) e − α G)
            </span>
            . Here <span className="font-mono text-cyan-300">e</span> is an impulse the same size as{' '}
            <span className="font-mono text-cyan-300">G</span>, with a 1 in the center. The right-hand
            side is one convolution, the unsharp mask. The kernel sums to 1, so a flat region keeps
            its brightness. At <span className="font-mono text-cyan-300">α = 1.5</span> the center
            weight is about 2.44, and the other taps are a shallow negative copy of the Gaussian.
          </p>
          <CodeBlock>{`gaussian = gaussian_kernel(13, 2.0)
impulse = np.zeros_like(gaussian)
impulse[6, 6] = 1.0
unsharp = (1 + alpha) * impulse - alpha * gaussian
sharpened = conv(image, unsharp)`}</CodeBlock>
          <p className="text-slate-300 leading-relaxed">
            Same 13×13 Gaussian, <span className="font-mono text-cyan-300">σ = 2</span>, and the same{' '}
            <span className="font-mono text-cyan-300">conv</span> as Parts 1.2 and 1.3:{' '}
            <span className="font-mono text-cyan-300">scipy.signal.convolve2d</span> with zero fill,
            run once per color channel. The single convolution matches blur-then-subtract to about{' '}
            <span className="font-mono text-cyan-300">2×10⁻¹⁵</span>.
          </p>

          <div className="space-y-3">
            <h3 className="text-base font-semibold text-white">Taj Mahal</h3>
            <p className="text-slate-300 leading-relaxed">
              The course photo is 300×300. The blur softens the arch carving and the people on the
              walk. The high-frequency image is what the blur removed. Gray is a zero residual, and I
              stretched the contrast so the faint edges show. The strongest responses are about 0.32
              on an image scaled to <span className="font-mono text-cyan-300">[0, 1]</span>. Bright
              lines are sharper than their neighborhood, dark lines are darker. The bright rim around
              the frame is the zero padding from Part 1: the blur mixes in black from outside the
              photo, so the original minus the blur is bright along that edge.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Figure src={publicUrl('p2/taj.png')} caption="Taj Mahal" />
              <Figure src={publicUrl('p2/taj_blur.png')} caption="Gaussian blur, σ = 2" />
            </div>
            <Figure
              src={publicUrl('p2/taj_high.png')}
              caption="High frequencies, I − blur. Gray is zero."
            />
            <p className="text-slate-300 leading-relaxed">
              Three amounts of the same residual. At 0.75 the inlay and the cypress edges tighten and
              the photo still looks quiet. At 1.5 the carving in the main arch and the figures on the
              walk read more clearly, and a thin dark line starts to sit along the minarets. At 3.0
              the cypress trees pick up a bright rim against the sky, the marble goes chalky, and
              color fringes show along the dome. About 7.6% of the pixels leave{' '}
              <span className="font-mono text-cyan-300">[0, 1]</span> at 0.75, 12.7% at 1.5, and
              20.9% at 3.0. Those are the bright stone and the dark trees. I clip them back into
              range for the figures. 1.5 is the amount I kept.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Figure src={publicUrl('p2/taj_alpha_0.75.png')} caption="Sharpened, α = 0.75" />
              <Figure src={publicUrl('p2/taj_alpha_1.50.png')} caption="Sharpened, α = 1.5" />
              <Figure src={publicUrl('p2/taj_alpha_3.00.png')} caption="Sharpened, α = 3" />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-semibold text-white">Kitten</h3>
            <p className="text-slate-300 leading-relaxed">
              A second photo, already sharp. I scaled the long side to 720. The high frequencies are
              the whiskers, the fur, and the blades of grass in front. The background stays near gray.
              It was already smooth, so this Gaussian has little fine detail to remove there, and
              sharpening leaves it soft. At{' '}
              <span className="font-mono text-cyan-300">α = 1.5</span> the whiskers and the near
              grass get crisper.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Figure src={publicUrl('p2/kitten.png')} caption="Kitten" />
              <Figure src={publicUrl('p2/kitten_blur.png')} caption="Gaussian blur, σ = 2" />
              <Figure src={publicUrl('p2/kitten_high.png')} caption="High frequencies. Gray is zero." />
              <Figure src={publicUrl('p2/kitten_sharp.png')} caption="Sharpened, α = 1.5" />
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-4">
            <h3 className="text-sm font-semibold text-cyan-400 font-mono uppercase tracking-wider">
              Blur, then sharpen
            </h3>
            <p className="text-slate-300 leading-relaxed">
              I blurred the same kitten with a wider Gaussian, 25×25 and{' '}
              <span className="font-mono text-cyan-300">σ = 4</span>, then ran the unsharp mask
              above. Sharpening the blurred image mostly kept it blurred. The eyes and the silhouette
              pick up a darker outline, and the error against the original falls from 0.050 for the
              blur, to 0.040 at <span className="font-mono text-cyan-300">α = 1.5</span>, to 0.034 at{' '}
              <span className="font-mono text-cyan-300">α = 3</span>. The whiskers and the separate
              hairs stay gone. The wide blur removed them, and the mask only amplifies frequencies
              that are still in the image.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Figure src={publicUrl('p2/kitten.png')} caption="Original" />
              <Figure src={publicUrl('p2/kitten_lost.png')} caption="Blurred, σ = 4" />
              <Figure src={publicUrl('p2/kitten_recovered.png')} caption="Then unsharp mask, α = 1.5" />
              <Figure src={publicUrl('p2/kitten_recovered_strong.png')} caption="Then unsharp mask, α = 3" />
            </div>
          </div>
        </section>

        <section id="part-2-2" className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Blend className="w-5 h-5 text-cyan-400" />
            <span>Part 2.2: Hybrid Images</span>
          </h2>
          <p className="text-slate-300 leading-relaxed">
            High frequencies win when you can see them. From far away only the smooth part of a
            picture gets through. A hybrid adds the low frequencies of one photo to the high
            frequencies of another, so the two readings trade places with distance. The low pass is
            a Gaussian built the same way as in Part 1, from{' '}
            <span className="font-mono text-cyan-300">cv2.getGaussianKernel</span> and an outer
            product, only wider. The high pass is the photo minus a second, usually tighter,
            Gaussian. The two cutoffs do not have to match. These kernels are too wide for a direct
            convolution, so I use an FFT convolution. It matches the zero-fill same-size result away
            from the border, and the kernel is symmetric, so the flip does nothing.
          </p>
          <CodeBlock>{`low = conv(derek, gaussian)
high = nutmeg - conv(nutmeg, gaussian_tight)
hybrid = np.clip(low + high, 0, 1)`}</CodeBlock>
          <p className="text-slate-300 leading-relaxed">
            The faces have to land on top of each other or the eyes from one photo sit on the cheek
            of the other. I mark the two eyes by hand and solve for the scale, rotation, and shift
            that drops both pairs onto the same two points. The canvas is 380×420.
          </p>

          <div className="space-y-3">
            <h3 className="text-base font-semibold text-white">Derek and Nutmeg</h3>
            <p className="text-slate-300 leading-relaxed">
              Derek is the low-frequency image, Nutmeg the high-frequency one. Nutmeg's head is
              tilted, so the alignment rotates her until the eyes are level with Derek's. I tried
              cutoffs around σ = 10 and 4, 12 and 5, 14 and 6, and 18 and 8. At 18 the cat is still
              what you see after the picture is shrunk. At{' '}
              <span className="font-mono text-cyan-300">σ = 12</span> for Derek and{' '}
              <span className="font-mono text-cyan-300">σ = 5</span> for Nutmeg, the full image reads
              as the cat and a small copy reads as Derek. 12 keeps his head and his smile and drops
              the freckles. 5 keeps the whiskers and the fur stripes.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Figure src={publicUrl('p2/hybrid_derek_original.jpg')} caption="Derek" />
              <Figure src={publicUrl('p2/hybrid_nutmeg_original.jpg')} caption="Nutmeg" />
              <Figure src={publicUrl('p2/hybrid_derek_aligned.png')} caption="Aligned Derek" />
              <Figure src={publicUrl('p2/hybrid_nutmeg_aligned.png')} caption="Aligned Nutmeg" />
              <Figure src={publicUrl('p2/hybrid_derek_low.png')} caption="Low pass, σ = 12" />
              <Figure src={publicUrl('p2/hybrid_nutmeg_high.png')} caption="High pass, σ = 5. Gray is zero." />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
              <Figure src={publicUrl('p2/hybrid_derek_nutmeg.png')} caption="Hybrid, grayscale" />
              <Figure
                src={publicUrl('p2/hybrid_derek_nutmeg.png')}
                caption="Same hybrid, shown small"
                className="max-w-[7rem] mx-auto w-full"
              />
            </div>
            <p className="text-slate-300 leading-relaxed">
              The Fourier pictures are the log magnitude of the grayscale images, with the zero
              frequency in the middle. Derek's blur is a bright dot at the center. Nutmeg's whiskers
              are the angled streaks away from the center, because a thin line in the image is a
              streak in frequency, perpendicular to the line. The hybrid has the dot and the streaks.
              The horizontal and vertical lines are the frame of the photo.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <Figure src={publicUrl('p2/hybrid_fft_derek.png')} caption="Derek" />
              <Figure src={publicUrl('p2/hybrid_fft_nutmeg.png')} caption="Nutmeg" />
              <Figure src={publicUrl('p2/hybrid_fft_low.png')} caption="Low pass" />
              <Figure src={publicUrl('p2/hybrid_fft_high.png')} caption="High pass" />
              <Figure src={publicUrl('p2/hybrid_fft_hybrid.png')} caption="Hybrid" />
            </div>
          </div>

          <div id="part-2-2-color" className="p-4 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-4">
            <h3 className="text-sm font-semibold text-cyan-400 font-mono uppercase tracking-wider">
              Bells & Whistles: Color
            </h3>
            <p className="text-slate-300 leading-relaxed">
              I put color on the low-frequency image, the high-frequency image, both, or neither,
              with the same cutoffs. Grayscale already switches with size. Color only on Derek tints
              Nutmeg's muzzle pink, because his skin is a slow wash and it covers the whole cat.
              Color only on Nutmeg keeps the green eyes and the tabby fur, and Derek's far-away face
              stays a gray shape, which is enough to recognize him. Color on both brings the pink
              chin back. I kept color on the high-frequency image.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Figure src={publicUrl('p2/hybrid_color_gray.png')} caption="Both grayscale" />
              <Figure src={publicUrl('p2/hybrid_color_low.png')} caption="Color on Derek only" />
              <Figure src={publicUrl('p2/hybrid_color_high.png')} caption="Color on Nutmeg only" />
              <Figure src={publicUrl('p2/hybrid_color_both.png')} caption="Color on both" />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-semibold text-white">Me and a cow</h3>
            <p className="text-slate-300 leading-relaxed">
              Same cutoffs, with color on both images. I am the low frequencies, σ = 12. The cow is the
              high frequencies, σ = 5. Up close it is the cow, meadow included, because those edges
              are high frequency. Shrunk, the face reads as me, with the horns and the spots still
              sitting on top.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Figure src={publicUrl('p2/hybrid_me_original.jpg')} caption="Me" />
              <Figure src={publicUrl('p2/hybrid_cow_original.jpg')} caption="Cow" />
              <Figure src={publicUrl('p2/hybrid_me_cow.png')} caption="Hybrid" />
              <Figure
                src={publicUrl('p2/hybrid_me_cow.png')}
                caption="Same hybrid, shown small"
                className="max-w-[7rem] mx-auto w-full"
              />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-semibold text-white">Cow and a dog</h3>
            <p className="text-slate-300 leading-relaxed">
              The dog is the low frequencies, σ = 12. The cow is the high frequencies, σ = 5. Color is
              on both. Both tongues hang down, so they land on the same part of the face. Up close the
              patches and the horns read as the cow. Shrunk, the golden fur reads as the dog, and the
              horns still stick up past the head.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Figure src={publicUrl('p2/hybrid_dog_original.jpg')} caption="Dog" />
              <Figure src={publicUrl('p2/hybrid_cow_original.jpg')} caption="Cow" />
              <Figure src={publicUrl('p2/hybrid_dog_cow.png')} caption="Hybrid" />
              <Figure
                src={publicUrl('p2/hybrid_dog_cow.png')}
                caption="Same hybrid, shown small"
                className="max-w-[7rem] mx-auto w-full"
              />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-semibold text-white">Obama and Trump</h3>
            <p className="text-slate-300 leading-relaxed">
              Obama is the low frequencies, σ = 10. Trump is the high frequencies, σ = 4. Color is on
              both. Trump is turned a little, so the eyes line up better than the jaw, and a second
              face ghosts around the chin. Up close the wrinkles and the hair read as Trump. Small,
              the dark hair and the suit read as Obama. His skin tone is smooth, so it lives in the
              low band. Leaving that band gray, the way the cat's color setting does, washes this one
              out. That is why this pair keeps color on both images.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Figure src={publicUrl('p2/hybrid_obama_original.jpg')} caption="Obama" />
              <Figure src={publicUrl('p2/hybrid_trump_original.jpg')} caption="Trump" />
              <Figure src={publicUrl('p2/hybrid_obama_trump.png')} caption="Hybrid" />
              <Figure
                src={publicUrl('p2/hybrid_obama_trump.png')}
                caption="Same hybrid, shown small"
                className="max-w-[7rem] mx-auto w-full"
              />
            </div>
          </div>
        </section>

        <section id="part-2-3" className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Grid3x3 className="w-5 h-5 text-cyan-400" />
            <span>Part 2.3: Gaussian and Laplacian Stacks</span>
          </h2>
          <p className="text-slate-300 leading-relaxed">
            A pyramid shrinks the image at every level. A stack does not. Every level of the apple
            stays 300×300, so the six levels fit in one array. Level 0 is the photo. The later
            levels are that same photo blurred by{' '}
            <span className="font-mono text-cyan-300">σ = 2, 4, 8, 32, 64</span>. The kernel is the
            Part 1 Gaussian, <span className="font-mono text-cyan-300">cv2.getGaussianKernel</span>{' '}
            times its transpose. I pad with reflection. A zero border at σ = 64 would darken the
            fruit. I built the blurs myself. There is no{' '}
            <span className="font-mono text-cyan-300">cv2.pyrDown</span>.
          </p>
          <CodeBlock>{`gaussian[0] = image
gaussian[i] = blur(image, sigma_i)
laplacian[i] = gaussian[i] - gaussian[i + 1]
laplacian[-1] = gaussian[-1]`}</CodeBlock>
          <p className="text-slate-300 leading-relaxed">
            Each Laplacian level is one Gaussian minus the next blurrier one. The last level is the
            leftover blur, a wash of orange with no edge left in it. Adding the Laplacian levels
            returns the apple. The largest pixel error on that sum is about{' '}
            <span className="font-mono text-cyan-300">1×10⁻¹⁶</span>. In the Laplacian strips, gray
            is zero and the contrast is stretched, same as the high-pass figures above. The Gaussian
            strips are the blurs themselves.
          </p>
          <Figure
            src={publicUrl('p2/apple_gaussian.jpg')}
            caption="Apple Gaussian stack. Left is the photo, then σ = 2, 4, 8, 32, 64."
          />
          <Figure
            src={publicUrl('p2/apple_laplacian.jpg')}
            caption="Apple Laplacian stack. The last tile is the leftover blur."
          />
          <Figure
            src={publicUrl('p2/orange_gaussian.jpg')}
            caption="Orange Gaussian stack, same sigmas."
          />
          <Figure
            src={publicUrl('p2/orange_laplacian.jpg')}
            caption="Orange Laplacian stack."
          />
        </section>

        <section id="part-2-4" className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Combine className="w-5 h-5 text-cyan-400" />
            <span>Part 2.4: Multiresolution Blending</span>
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Cutting the apple and the orange in half and setting them side by side leaves a line
            through the fruit and through the pencil. Blurring that cut would also blur the peel.
            The stack blends each frequency band with its own copy of the mask. The mask starts as a
            step, white on the apple's half. For the oraple I blur that step with the same widths as
            the day-and-night seam, σ = 18, 28, 40, 60, 90, and 130. The finest band is already a
            ramp, so the speckles near the join fade instead of stopping on a line. The coarsest
            band is wide enough that the red and the yellow overlap. The oraple is the sum of those
            bands.
          </p>
          <CodeBlock>{`blended[i] = lap_apple[i] * mask[i] + lap_orange[i] * (1 - mask[i])
oraple = np.clip(sum(blended), 0, 1)`}</CodeBlock>
          <Figure
            src={publicUrl('p2/mask_gaussian.jpg')}
            caption="Oraple mask stack, σ = 18, 28, 40, 60, 90, 130. White is the apple. The first level is already a ramp."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Figure src={publicUrl('p2/apple.png')} caption="Apple" />
            <Figure src={publicUrl('p2/orange.png')} caption="Orange" />
            <Figure src={publicUrl('p2/oraple_hard.png')} caption="Hard cut down the middle" />
            <Figure src={publicUrl('p2/oraple.png')} caption="Stack blend" />
          </div>
          <p className="text-slate-300 leading-relaxed">
            The figure below follows Szeliski Figure 3.42. The first three rows are Laplacian levels
            0, 2, and 4. Left is the apple times that level's mask, middle is the orange times the
            complement, right is the sum. Level 0 is the peel texture through the σ = 18 ramp, so
            the speckles fade across the middle. Level 4 is color at σ = 90, and the red and the
            yellow overlap. The bottom row collapses every band: the apple's
            contribution, the orange's contribution, and the oraple. The pencil runs through without
            a break. The skin goes from smooth red to pitted yellow, and there is no line at the
            join.
          </p>
          <Figure
            src={publicUrl('p2/oraple_figure.jpg')}
            caption="(a)–(l). Levels 0, 2, and 4, then the two collapsed halves and the oraple."
          />

          <div id="part-2-4-color" className="p-4 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-4">
            <h3 className="text-sm font-semibold text-cyan-400 font-mono uppercase tracking-wider">
              Bells & Whistles: Color
            </h3>
            <p className="text-slate-300 leading-relaxed">
              The grayscale blend has the same smooth join. It no longer reads as two fruits, because
              red against yellow is what tells them apart, and that contrast is low frequency. It
              sits in the last two bands. Keeping color only on those bands, and turning the finer
              bands into luminance, leaves a red half and a yellow half with gray speckles. Color on
              every band is the one that still looks like the photograph. The peel color and the peel
              texture are both part of which fruit it is, so I kept both. Day and night, further down, is
              the same test where the two sides are different colors of sky.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Figure src={publicUrl('p2/oraple_gray.png')} caption="Both fruits in grayscale" />
              <Figure src={publicUrl('p2/oraple_low_color.png')} caption="Color only on the two coarsest bands" />
              <Figure src={publicUrl('p2/oraple.png')} caption="Color on every band" />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-semibold text-white">Man and woman</h3>
            <p className="text-slate-300 leading-relaxed">
              Two studio portraits, aligned the same way as the hybrids: I mark the pupils and solve
              for the scale, rotation, and shift that lands both pairs on the same two points. The
              canvas is 420×500, and the eyes sit 120 pixels apart. He is on the left of the straight
              seam. She is on the right. Their backgrounds do not match, white against gray, and his
              beard has no counterpart on her cheek.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Figure src={publicUrl('p2/face_man.png')} caption="Aligned man" />
              <Figure src={publicUrl('p2/face_woman.png')} caption="Aligned woman" />
              <Figure src={publicUrl('p2/face_hard.png')} caption="Hard cut through the nose" />
              <Figure src={publicUrl('p2/face_seam.png')} caption="Same cut, blended by the stack" />
            </div>
            <p className="text-slate-300 leading-relaxed">
              The hard cut splits the nose, the lips, and the background. After the stack, the nose
              is one nose and the skin tone fades across the middle. The beard and the smile stay on
              his side. Those edges live in the fine bands, and the mask there is still a step, so
              the whiskers are not allowed to smear onto her cheek. Her closed mouth stays on the
              right for the same reason.
            </p>
            <p className="text-slate-300 leading-relaxed">
              The second mask is an ellipse from the forehead to the chin, cheek to cheek, instead of
              a line. White is his face. Outside the oval is her hair, her neck, the gray background,
              and the white top. The coarse bands blur the oval, so the jaw and the hairline do not
              look cut out. His smile and beard sit inside her silhouette.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Figure src={publicUrl('p2/face_oval_mask.png')} caption="Irregular mask. White is the man." />
              <Figure src={publicUrl('p2/face_oval.png')} caption="Oval blend" />
            </div>
            <Figure
              src={publicUrl('p2/face_oval_levels.jpg')}
              caption="Laplacian bands of the oval blend: level 0, level 2, and level 4. Gray is zero."
            />
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-semibold text-white">Day and night</h3>
            <p className="text-slate-300 leading-relaxed">
              Both skies are 612×408, so they share a frame without a warp. The sun and the moon both
              sit right of center. I flip the day photo left to right, so the sun moves to the left,
              and then upside down, so its cloud band lines up with the night clouds. Day is the left
              half and night is the right. The cut keeps the sun and the moon.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Figure src={publicUrl('p2/sky_day.png')} caption="Day" />
              <Figure src={publicUrl('p2/sky_night.png')} caption="Night" />
              <Figure src={publicUrl('p2/sky_hard.png')} caption="Hard cut down the middle" />
              <Figure src={publicUrl('p2/sky_blend.png')} caption="Stack blend, color" />
            </div>
            <p className="text-slate-300 leading-relaxed">
              The hard cut is a line between the sun and the moon. The clouds sit along the top, level
              with the moon, and the sun is lower on the left. On this pair the mask is wider than
              the fruit stack. The finest band is already a ramp, σ = 18, and the coarsest is σ =
              130, so the middle fades over a broad band. A few stars cross onto the day side. The
              sun and the moon stay where they are, and the blue fades into the purple. In grayscale the join is still smooth, and it is only a light sky beside a
              dark one. The afternoon-versus-night reading is the color in the coarse bands.
            </p>
            <Figure
              src={publicUrl('p2/sky_gray.png')}
              caption="Same seam in grayscale. The colors are gone, so the two sides are only bright and dark."
            />
            <p className="text-slate-300 leading-relaxed">
              The second mask is the same ellipse as the portraits, centered at (210, 230) with
              radii 108 and 155. Black is day. The sun sits in that oval and the moon sits outside
              it, so the hard cut is a curve around the sun. The stack uses the same widths as the
              straight seam, and the blue fades into the night instead of stopping on the curve.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Figure src={publicUrl('p2/sky_oval_mask.png')} caption="Same ellipse. White is night." />
              <Figure src={publicUrl('p2/sky_oval_hard.png')} caption="Hard cut around the sun" />
              <Figure src={publicUrl('p2/sky_oval.png')} caption="Same oval, blended by the stack" />
            </div>
          </div>
        </section>

        <section id="learned" className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Aperture className="w-5 h-5 text-cyan-400" />
            <span>What I learned</span>
          </h2>
          <p className="text-slate-300 leading-relaxed">
            The most useful thing was seeing convolution in practice. I understand it as sliding a
            filter over an image. At each pixel the filter is a weighted sum of the neighborhood, and
            the output is that sum. The weights are the choice. A box averages, so fine detail
            disappears. <span className="font-mono text-cyan-300">D<sub>x</sub></span> and{' '}
            <span className="font-mono text-cyan-300">D<sub>y</sub></span> are two taps, so they light
            up edges. A Gaussian keeps the slow changes and drops the fine ones.
          </p>
          <p className="text-slate-300 leading-relaxed">
            The same slide applies in different ways. Sharpening adds the high frequencies back.
            A hybrid keeps the low frequencies of one photo and the high frequencies of another, so
            the picture changes with how far away you stand. A stack splits the photo into those
            bands, and blending puts each band back through its own mask.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Blending was my favorite, because it simply looks good. A hard cut is a line through the
            apple, through a face, or between the sun and the moon. After the stack, the colors fade
            across the join and the line is gone.
          </p>
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
