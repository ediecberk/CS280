import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Blend,
  Camera,
  Code2,
  Combine,
  Image as ImageIcon,
  Grid3x3,
  Layers,
  List,
  Palette,
  RotateCw,
  Wind,
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

export default function ProjectThree() {
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
            CS280 • Project 3
          </span>
        </div>
      </header>

      <main className="relative z-10 flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 w-full space-y-12">
        <section className="space-y-4 border-b border-slate-800 pb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Project 3: Flow Models{' '}
            <Wind className="inline-block w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-cyan-400" />
          </h1>
          <p className="text-slate-300 leading-relaxed max-w-3xl">
            Part A samples and edits 512×512 images with the pretrained PixNerd
            flow model. Time runs from noise at{' '}
            <span className="font-mono text-cyan-300">t = 0</span> to a clean
            image at <span className="font-mono text-cyan-300">t = 1</span>, and
            the model predicts the velocity{' '}
            <span className="font-mono text-cyan-300">x1 − ε</span>. Sections
            1.1 through 1.5 use one photograph of cherry trees in front of a
            mountain. The Campanile shows up later, for editing.
          </p>
          <p className="text-slate-300 leading-relaxed max-w-3xl">
            Part B trains a UNet on MNIST from scratch. A one-step denoiser
            learns to remove Gaussian noise. Flow matching then learns the
            velocity from noise to a digit, first with time alone and then with
            the digit class.
          </p>
        </section>

        <section className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <List className="w-5 h-5 text-cyan-400" />
            <span>Contents</span>
          </h2>
          <nav className="space-y-1 text-sm">
            {[
              ['part-1-1', 'A 1.1 Noisy Training Inputs', 'The same noise at t = 0.25, 0.50, and 0.75'],
              ['part-1-2', 'A 1.2 Classical Denoising', 'Gaussian blur after undoing the t scale'],
              ['part-1-3', 'A 1.3 One-Step Denoising', 'One velocity, then a jump to the clean endpoint'],
              ['part-1-4', 'A 1.4 Visualizing Velocity', 'Predicted update against the saved ground truth'],
              ['part-1-5', 'A 1.5 Euler Sampling', 'Twenty-five steps from the t = 0.50 input'],
              ['part-1-6', 'A 1.6 Sampling from Noise', 'Five seeds, prompt “a high quality photo”'],
              ['part-2-1', 'A 2.1 Classifier-Free Guidance', 'The same five noises with weight 7'],
              ['part-3-1', 'A 3.1 Image-to-Image Editing', 'Seven starting times on three photographs'],
              ['drawings', 'A · Web Image and Drawings', 'A dragon, a chick, and a duck'],
              ['part-3-2', 'A 3.2 Text-Guided Editing', 'Lighthouse, autumn maples, and a lava lake'],
              ['part-3-3', 'A 3.3 Visual Anagrams', 'A 180° flip between two prompts'],
              ['part-3-4', 'A 3.4 Hybrid Images', 'Low frequencies from far away, high frequencies up close'],
              ['bells', 'A · Bells & Whistles', 'A 90° turn, an inner disk, and a course logo'],
              ['b-noise', 'B 1.2 Noising MNIST', 'Sigma from 0 to 1 on the same ten digits'],
              ['b-train', 'B 1.2.1 Training a Denoiser', 'Sigma 0.5, five epochs, hidden size 128'],
              ['b-ood', 'B 1.2.2 Out of Distribution', 'The same 7 at noise levels the model did not train on'],
              ['b-pure', 'B 1.2.3 Pure Noise', 'Every sample collapses to one average digit'],
              ['b-time', 'B 2.2 Time-Conditioned Flow', 'Predict x1 − x0, with an exponential learning rate'],
              ['b-time-samples', 'B 2.3 Sampling', 'Epochs 1, 5, and 10, fifty Euler steps'],
              ['b-class', 'B 2.5 Class Conditioning', 'One-hot class, 10% dropout, ten epochs'],
              ['b-class-samples', 'B 2.6 Sampling', 'Four of each digit, guidance 5, and a fixed learning rate'],
              ['b-bells', 'B · Bells & Whistles', 'The time-only model trained through epoch 20'],
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
            <span>Part 1.1: Noisy Training Inputs</span>
          </h2>
          <p className="text-slate-300 leading-relaxed">
            <span className="font-mono text-cyan-300">interpolate</span> builds a
            noisy training input on a straight line from noise to the clean
            image. I sampled one noise tensor and reused it at three times.
            At the endpoints, <span className="font-mono text-cyan-300">t = 0</span>{' '}
            returns the noise and <span className="font-mono text-cyan-300">t = 1</span>{' '}
            returns the photograph.
          </p>
          <CodeBlock>{`xt = (1 - t) * eps + t * x1`}</CodeBlock>
          <p className="text-slate-300 leading-relaxed">
            Larger <span className="font-mono text-cyan-300">t</span> keeps more
            of the mountain and the trees. At{' '}
            <span className="font-mono text-cyan-300">t = 0.25</span> the scene
            is mostly noise.
          </p>
          <Figure
            src={publicUrl('p3/noisy_inputs.png')}
            caption="Original image and the same noise at t = 0.25, 0.50, and 0.75"
          />
        </section>

        <section id="part-1-2" className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-cyan-400" />
            <span>Part 1.2: Classical Denoising</span>
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Gaussian blur is a baseline that never calls the flow model. The
            photograph inside <span className="font-mono text-cyan-300">xt</span>{' '}
            is scaled by <span className="font-mono text-cyan-300">t</span>, so I
            divided by <span className="font-mono text-cyan-300">t</span> and then
            blurred. For each saved input I tried standard deviations 1, 2, 4,
            8, and 16, and kept the blur closest to the original image.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Blur takes out some of the grain and also the branches and the
            mountain edge. It never returns a sharp photograph, and the gap is
            largest at <span className="font-mono text-cyan-300">t = 0.25</span>.
          </p>
          <Figure src={publicUrl('p3/blur_025.png')} caption="Noisy input and best Gaussian blur at t = 0.25" />
          <Figure src={publicUrl('p3/blur_050.png')} caption="Noisy input and best Gaussian blur at t = 0.50" />
          <Figure src={publicUrl('p3/blur_075.png')} caption="Noisy input and best Gaussian blur at t = 0.75" />
        </section>

        <section id="part-1-3" className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <span>Part 1.3: One-Step Denoising</span>
          </h2>
          <p className="text-slate-300 leading-relaxed">
            <span className="font-mono text-cyan-300">one_step_denoise</span> asks
            the model for one velocity at{' '}
            <span className="font-mono text-cyan-300">(xt, t)</span> with the
            prompt “a high quality photo”, then jumps to the clean endpoint.
            The prediction is a velocity, so it is added.
          </p>
          <CodeBlock>{`x_hat = xt + (1 - t) * v`}</CodeBlock>
          <p className="text-slate-300 leading-relaxed">
            One step is sharper than blur. At{' '}
            <span className="font-mono text-cyan-300">t = 0.75</span> the trees
            and the mountain come back. At{' '}
            <span className="font-mono text-cyan-300">t = 0.25</span> the estimate
            stays soft, because a single velocity has to stand in for the whole
            path.
          </p>
          <Figure
            src={publicUrl('p3/onestep_025.png')}
            caption="Original, noisy input, and one-step estimate at t = 0.25"
          />
          <Figure
            src={publicUrl('p3/onestep_050.png')}
            caption="Original, noisy input, and one-step estimate at t = 0.50"
          />
          <Figure
            src={publicUrl('p3/onestep_075.png')}
            caption="Original, noisy input, and one-step estimate at t = 0.75"
          />
        </section>

        <section id="part-1-4" className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <span>Part 1.4: Visualizing Velocity</span>
          </h2>
          <p className="text-slate-300 leading-relaxed">
            The one-step update is{' '}
            <span className="font-mono text-cyan-300">(1 − t) v̂</span>. The
            original image and the noise were saved, so the ground-truth update
            is <span className="font-mono text-cyan-300">(1 − t)(x1 − ε) = x1 − xt</span>.
            The error map is the root-mean-square difference of those two
            updates across RGB, taken before any display scaling. Every update
            shares one symmetric color scale, with zero at middle gray.
          </p>
          <Figure
            src={publicUrl('p3/velocity_original.png')}
            caption="Original image used for the velocity comparison"
          />
          <Figure
            src={publicUrl('p3/velocity_025.png')}
            caption="t = 0.25. The predicted update is blurrier than the ground truth, and the error sits on the trees and the mountain edge"
          />
          <Figure
            src={publicUrl('p3/velocity_050.png')}
            caption="t = 0.50. The predicted and ground-truth updates agree more closely"
          />
          <Figure
            src={publicUrl('p3/velocity_075.png')}
            caption="t = 0.75. Less noise is left, so both updates are smaller and the error map is quieter"
          />
        </section>

        <section id="part-1-5" className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Wind className="w-5 h-5 text-cyan-400" />
            <span>Part 1.5: Euler Sampling</span>
          </h2>
          <p className="text-slate-300 leading-relaxed">
            <span className="font-mono text-cyan-300">euler_sample</span> repeats
            a small step along the predicted velocity and shortens the last step
            so the path ends at <span className="font-mono text-cyan-300">t = 1</span>.
            I checked a constant velocity field for a full run from 0, a half
            run from 0.5, and a start time that needs a shortened final step.
            Starting from the saved{' '}
            <span className="font-mono text-cyan-300">t = 0.50</span> image, I
            took 25 steps of size 0.02 and showed the initial state, every fifth
            update, and the final image.
          </p>
          <CodeBlock>{`x = x + h * v(x, t)`}</CodeBlock>
          <p className="text-slate-300 leading-relaxed">
            The image sharpens as <span className="font-mono text-cyan-300">t</span>{' '}
            increases. Euler denoising lands closer to the original than the
            Gaussian blur or the one-step estimate of the same noisy input.
          </p>
          <Figure
            src={publicUrl('p3/euler_trajectory.png')}
            caption="Euler trajectory from the t = 0.50 input. Shown times are 0.50, 0.60, 0.70, 0.80, 0.90, and 1.00"
          />
          <Figure
            src={publicUrl('p3/euler_comparison.png')}
            caption="Same noisy input cleaned by Gaussian blur, one-step denoising, and Euler sampling"
          />
        </section>

        <section id="part-1-6" className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-cyan-400" />
            <span>Part 1.6: Sampling from Noise</span>
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Sampling from scratch is the same Euler loop with{' '}
            <span className="font-mono text-cyan-300">t</span> starting at 0 and{' '}
            <span className="font-mono text-cyan-300">x</span> equal to Gaussian
            noise. The prompt is “a high quality photo”, the step size is 0.02,
            and the five seeds are 180, 181, 182, 183, and 184.
          </p>
          <p className="text-slate-300 leading-relaxed">
            The five images are different photographs, and they still fall into
            a few similar subjects. The prompt names a quality, and it leaves
            the scene open, so the samples repeat familiar compositions.
          </p>
          <Figure
            src={publicUrl('p3/samples_unguided.png')}
            caption='Five samples from noise. Seeds 180 through 184, prompt "a high quality photo", no guidance'
          />
        </section>

        <section id="part-2-1" className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Combine className="w-5 h-5 text-cyan-400" />
            <span>Part 2.1: Classifier-Free Guidance</span>
          </h2>
          <p className="text-slate-300 leading-relaxed">
            <span className="font-mono text-cyan-300">cfg_velocity</span> evaluates
            the same image and time twice, once with the prompt and once with an
            empty prompt, then pushes the velocity further toward the prompt.
            At <span className="font-mono text-cyan-300">w = 0</span> the
            combination is the conditional prediction. The samples below use{' '}
            <span className="font-mono text-cyan-300">w = 7</span>, step size
            0.02, and the same five noises as section 1.6.
          </p>
          <CodeBlock>{`v_cfg = vc + w * (vc - vu)`}</CodeBlock>
          <p className="text-slate-300 leading-relaxed">
            Guidance makes the samples sharper, and the same seeds spread into
            different kinds of photographs. The faces look like real people
            rather than amalgamations that are human-like but are obviously not
            accurate.
          </p>
          <Figure
            src={publicUrl('p3/samples_cfg.png')}
            caption="Seeds 180 through 184 again, now with guidance weight 7"
          />
        </section>

        <section id="part-3-1" className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Camera className="w-5 h-5 text-cyan-400" />
            <span>Part 3.1: Image-to-Image Editing</span>
          </h2>
          <p className="text-slate-300 leading-relaxed">
            <span className="font-mono text-cyan-300">edit</span> noises an image
            to a starting time and then integrates to 1 with classifier-free
            guidance. The prompt is still “a high quality photo”, the guidance
            weight is 7, and the step size is 0.02. The seven starting times are
            0.02, 0.04, 0.06, 0.10, 0.14, 0.25, and 0.50. A smaller starting
            time leaves more of the path for the model to replace the image.
          </p>
          <p className="text-slate-300 leading-relaxed">
            The Campanile, the cherry-tree photo, and a mountain valley each
            use seed 180. At the lowest starting times the sampler invents a
            new photograph. By <span className="font-mono text-cyan-300">t = 0.25</span>{' '}
            the original scene is mostly back.
          </p>
          <Figure
            src={publicUrl('p3/edit_campanile.png')}
            caption="Campanile. The tower returns as the starting time increases"
          />
          <Figure
            src={publicUrl('p3/edit_sakura.png')}
            caption="Cherry trees and mountain, the image from section 1"
          />
          <Figure src={publicUrl('p3/edit_mountain.png')} caption="Mountain valley" />

          <div id="drawings" className="space-y-4 pt-2">
            <h3 className="text-base font-semibold text-white">A web image and two drawings</h3>
            <p className="text-slate-300 leading-relaxed">
              I repeated the same seven starting times on a dragon image from
              the web and on two drawings, a chick and a duck. The loader
              center-crops each file to a square and resizes it to 512×512.
            </p>
            <p className="text-slate-300 leading-relaxed">
              The drawings have less photographic detail for the model to hold
              onto, so the low starting times turn them into unrelated photos.
              The original drawing is recognizable again once the starting time
              is large enough.
            </p>
            <Figure src={publicUrl('p3/edit_dragon.png')} caption="Dragon image downloaded from the web" />
            <Figure src={publicUrl('p3/edit_chick.png')} caption="First drawing, a chick" />
            <Figure src={publicUrl('p3/edit_duck.png')} caption="Second drawing, a duck" />
          </div>
        </section>

        <section id="part-3-2" className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Camera className="w-5 h-5 text-cyan-400" />
            <span>Part 3.2: Text-Guided Editing</span>
          </h2>
          <p className="text-slate-300 leading-relaxed">
            This is the same edit as section 3.1, with the generic photo prompt
            replaced by a prompt for each image. The Campanile becomes “a
            photograph of a lighthouse beside the ocean”. The cherry trees
            become “a photograph of autumn maple trees in front of a snowy
            mountain”. The mountain valley becomes “a photograph of a lava lake
            between volcanoes”.
          </p>
          <p className="text-slate-300 leading-relaxed">
            The prompt wins at the small starting times. The original image
            wins at <span className="font-mono text-cyan-300">t = 0.50</span>.
            The middle times keep the framing of the photograph while the
            surface changes toward the prompt.
          </p>
          <Figure
            src={publicUrl('p3/text_campanile.png')}
            caption='Campanile, prompt "a photograph of a lighthouse beside the ocean"'
          />
          <Figure
            src={publicUrl('p3/text_sakura.png')}
            caption='Cherry trees, prompt "a photograph of autumn maple trees in front of a snowy mountain"'
          />
          <Figure
            src={publicUrl('p3/text_mountain.png')}
            caption='Mountain valley, prompt "a photograph of a lava lake between volcanoes"'
          />
        </section>

        <section id="part-3-3" className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <RotateCw className="w-5 h-5 text-cyan-400" />
            <span>Part 3.3: Visual Anagrams</span>
          </h2>
          <p className="text-slate-300 leading-relaxed">
            <span className="font-mono text-cyan-300">visual_anagrams</span> averages
            two guided velocities at every Euler step. One is the upright image
            with prompt A. The other flips the image 180 degrees, evaluates
            prompt B, and flips the velocity back. Both prompts in a pair use
            the same medium so the texture still matches after the rotation.
            The step size is 0.02 and the guidance weight is 7.
          </p>
          <CodeBlock>{`v = 0.5 * (v_a + flip(cfg(flip(x), prompt_b)))`}</CodeBlock>
          <p className="text-slate-300 leading-relaxed">
            Seed 180 is a bearded wizard upright and a rocky canyon after a 180
            degree turn. Seed 181 is a wolf upright and a pine forest after the
            same turn.
          </p>
          <Figure
            src={publicUrl('p3/anagram_wizard.png')}
            caption='Seed 180. Left: "an oil painting of a bearded wizard". Right: the same image rotated 180 degrees, "an oil painting of a rocky canyon"'
          />
          <Figure
            src={publicUrl('p3/anagram_wolf.png')}
            caption='Seed 181. Left: "a lithograph of a wolf". Right: rotated 180 degrees, "a lithograph of a pine forest"'
          />
        </section>

        <section id="part-3-4" className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Blend className="w-5 h-5 text-cyan-400" />
            <span>Part 3.4: Hybrid Images</span>
          </h2>
          <p className="text-slate-300 leading-relaxed">
            <span className="font-mono text-cyan-300">make_hybrids</span> builds
            each Euler step from the low frequencies of one velocity and the
            high frequencies of another. Prompt A supplies the low frequencies,
            which read from far away. Prompt B supplies the high frequencies,
            which read up close. The low-pass filter is a Gaussian blur with
            sigma 16. Both prompts are evaluated at the same image and time.
          </p>
          <CodeBlock>{`step = lowpass(v_a) + v_b - lowpass(v_b)`}</CodeBlock>
          <p className="text-slate-300 leading-relaxed">
            The full-size image shows the close prompt. The 64×64 view shows
            the distant prompt. Seed 180 pairs a lion in the distance with tree
            bark up close. Seed 181 pairs a moon in the distance with a coral
            reef up close.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
            <Figure
              src={publicUrl('p3/hybrid_lion_full.png')}
              caption='Seed 180, full size. Close: "a lithograph of tree bark"'
            />
            <Figure
              src={publicUrl('p3/hybrid_lion_small.png')}
              caption='Seed 180, reduced size. Distant: "a lithograph of a lion"'
              className="max-w-[8rem] mx-auto w-full"
            />
            <Figure
              src={publicUrl('p3/hybrid_moon_full.png')}
              caption='Seed 181, full size. Close: "a lithograph of a coral reef"'
            />
            <Figure
              src={publicUrl('p3/hybrid_moon_small.png')}
              caption='Seed 181, reduced size. Distant: "a lithograph of a moon"'
              className="max-w-[8rem] mx-auto w-full"
            />
          </div>
        </section>

        <section id="bells" className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Palette className="w-5 h-5 text-cyan-400" />
            <span>Part A: Bells & Whistles</span>
          </h2>
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-white">Two more visual anagrams</h3>
            <p className="text-slate-300 leading-relaxed">
              Section 3.3 flips the image upside down. The Visual Anagrams paper
              also allows any rearrangement of pixels that can be undone exactly.
              I used two of those. A 90 degree rotation turns an oil painting of
              a city skyline into an oil painting of a sailing ship. An inner
              rotation turns only a disk in the center by 180 degrees and leaves
              the border fixed. That pair is a lithograph of a desert canyon and
              a lithograph of a coral reef. The branching shapes belong to both
              prompts, so the two views stay related after the disk is turned.
            </p>
            <Figure
              src={publicUrl('p3/anagram_rotation_90.png')}
              caption='90 degree rotation. Left: "an oil painting of a city skyline". Right: the same image rotated 90 degrees, "an oil painting of a sailing ship"'
            />
            <Figure
              src={publicUrl('p3/anagram_inner_rotation.png')}
              caption='Inner rotation. Left: "a lithograph of a desert canyon". Right: the center disk rotated 180 degrees, "a lithograph of a coral reef"'
            />
          </div>
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-white">Course logo</h3>
            <p className="text-slate-300 leading-relaxed">
              I edited the Berkeley “Cal” mark with the same procedure as
              section 3.2. The prompt is “a course logo for a computer vision
              class, blue and gold, a bear and a camera”. The low starting times
              replace the script with a bear and a camera. By{' '}
              <span className="font-mono text-cyan-300">t = 0.50</span> the
              original mark is back. The small lettering the model adds is
              generated shapes, and it is not readable text.
            </p>
            <Figure
              src={publicUrl('p3/course_logo.png')}
              caption="Berkeley mark edited at starting times 0.02, 0.04, 0.06, 0.10, 0.14, 0.25, and 0.50"
            />
          </div>
        </section>

        <section id="b-noise" className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Grid3x3 className="w-5 h-5 text-cyan-400" />
            <span>Part B 1.2: Noising MNIST</span>
          </h2>
          <p className="text-slate-300 leading-relaxed">
            A clean digit <span className="font-mono text-cyan-300">x</span> is
            already scaled to <span className="font-mono text-cyan-300">[0, 1]</span>.
            Noise is added on top of it. I used the same ten test digits and the
            same noise draw at every level, so the only thing that changes down
            the rows is <span className="font-mono text-cyan-300">σ</span>.
          </p>
          <CodeBlock>{`z = x + sigma * eps`}</CodeBlock>
          <p className="text-slate-300 leading-relaxed">
            At 0.2 the strokes are still easy to read. At 0.5 they are speckled
            and still recognizable. At 1.0 the digit is mostly gone.
          </p>
          <Figure
            src={publicUrl('p3/b_noise_levels.png')}
            caption="The same ten digits at σ = 0, 0.2, 0.4, 0.5, 0.6, 0.8, and 1.0"
          />
        </section>

        <section id="b-train" className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <span>Part B 1.2.1: Training a Denoiser</span>
          </h2>
          <p className="text-slate-300 leading-relaxed">
            The UNet sees <span className="font-mono text-cyan-300">z</span> and
            is trained to return <span className="font-mono text-cyan-300">x</span>,
            with mean squared error. Hidden size{' '}
            <span className="font-mono text-cyan-300">D = 128</span>, noise level{' '}
            <span className="font-mono text-cyan-300">σ = 0.5</span>, batch size
            256, Adam at <span className="font-mono text-cyan-300">1e-4</span>,
            five epochs. The noise is drawn inside the training loop, so each
            epoch shows the network a new <span className="font-mono text-cyan-300">ε</span>.
          </p>
          <p className="text-slate-300 leading-relaxed">
            The loss falls in the first few hundred steps and then sits near the
            bottom of the plot. After one epoch the test digits are already
            readable. After five they are a little cleaner, especially the 4 and
            the 5.
          </p>
          <Figure
            src={publicUrl('p3/b_denoise_loss.png')}
            caption="Denoiser training loss. The faint line is each step. The solid line is a moving average"
          />
          <div className="grid grid-cols-1 gap-6">
            <Figure
              src={publicUrl('p3/b_denoise_epoch1.png')}
              caption="Test digits noised at σ = 0.5 and denoised after epoch 1"
            />
            <Figure
              src={publicUrl('p3/b_denoise_epoch5.png')}
              caption="The same test digits after epoch 5"
            />
          </div>
        </section>

        <section id="b-ood" className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-cyan-400" />
            <span>Part B 1.2.2: Out-of-Distribution Noise</span>
          </h2>
          <p className="text-slate-300 leading-relaxed">
            The network only trained at{' '}
            <span className="font-mono text-cyan-300">σ = 0.5</span>. I kept one
            test 7 and one noise draw, then changed{' '}
            <span className="font-mono text-cyan-300">σ</span>. Each row is the
            noisy input and the reconstruction.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Through 0.6 the 7 comes back cleanly. At 0.8 the crossbar starts to
            break. At 1.0 the reconstruction is a bent, noisy stroke. The
            denoiser is tied to the noise level it saw in training.
          </p>
          <Figure
            src={publicUrl('p3/b_denoise_ood.png')}
            caption="One 7 at σ = 0, 0.2, 0.4, 0.5, 0.6, 0.8, and 1.0. Left is the input, right is the denoiser"
            className="max-w-sm mx-auto w-full"
          />
        </section>

        <section id="b-pure" className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Wind className="w-5 h-5 text-cyan-400" />
            <span>Part B 1.2.3: Denoising Pure Noise</span>
          </h2>
          <p className="text-slate-300 leading-relaxed">
            I trained a fresh copy of the same UNet for five epochs. The input
            is Gaussian noise with no digit in it. The target is a clean
            training image. The loss falls, and the outputs do not become ten
            different digits.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Every sample is the same soft blob. Mean squared error is minimized
            by the average of the targets. The noise does not say which digit
            the target was, so that average is the centroid of digits 0 through
            9. Epoch 1 is already that blob. Epoch 5 only makes it a little
            smoother.
          </p>
          <Figure
            src={publicUrl('p3/b_pure_loss.png')}
            caption="Pure-noise training loss over five epochs"
          />
          <Figure
            src={publicUrl('p3/b_pure_epoch1.png')}
            caption="Ten held-out noise samples after epoch 1"
          />
          <Figure
            src={publicUrl('p3/b_pure_epoch5.png')}
            caption="The same noise samples after epoch 5"
          />
        </section>

        <section id="b-time" className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Code2 className="w-5 h-5 text-cyan-400" />
            <span>Part B 2.2: Time-Conditioned Flow Matching</span>
          </h2>
          <p className="text-slate-300 leading-relaxed">
            One step cannot turn pure noise into a chosen digit, because the
            input carries no information about which digit to draw. Flow
            matching walks there in small steps. A time{' '}
            <span className="font-mono text-cyan-300">t</span> is drawn from{' '}
            <span className="font-mono text-cyan-300">[0, 1]</span>, the noisy
            sample is the straight line from noise to the digit, and the UNet
            predicts the velocity along that line.
          </p>
          <CodeBlock>{`xt = (1 - t) * x0 + t * x1
target = x1 - x0`}</CodeBlock>
          <p className="text-slate-300 leading-relaxed">
            Time goes in through two fully connected blocks and scales the
            unflatten and the first upsampling block. Hidden size{' '}
            <span className="font-mono text-cyan-300">D = 64</span>, batch size
            64, ten epochs. Adam starts at{' '}
            <span className="font-mono text-cyan-300">1e-2</span> and an
            exponential scheduler multiplies the learning rate by{' '}
            <span className="font-mono text-cyan-300">0.1^(1/10)</span> after
            every epoch, so it ends near{' '}
            <span className="font-mono text-cyan-300">1e-3</span>. The loss
            drops in the first epoch and then declines slowly.
          </p>
          <Figure
            src={publicUrl('p3/b_time_loss.png')}
            caption="Time-conditioned training loss over ten epochs"
          />
        </section>

        <section id="b-time-samples" className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Wind className="w-5 h-5 text-cyan-400" />
            <span>Part B 2.3: Sampling</span>
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Sampling starts at Gaussian noise and adds{' '}
            <span className="font-mono text-cyan-300">(1/50) · uθ(x, t)</span>{' '}
            fifty times. The seed is 180, and each grid is 40 samples. There is
            no class label, so the model chooses the digit.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Epoch 1 is mostly scribbles, with a few 1s and 0s. Epoch 5 is a page
            of digits, some of them doubled or broken. Epoch 10 is cleaner. A
            few still look like two digits written on top of each other.
          </p>
          <Figure
            src={publicUrl('p3/b_time_epoch1.png')}
            caption="Time-conditioned samples after epoch 1. Seed 180"
          />
          <Figure
            src={publicUrl('p3/b_time_epoch5.png')}
            caption="After epoch 5"
          />
          <Figure
            src={publicUrl('p3/b_time_epoch10.png')}
            caption="After epoch 10"
          />
        </section>

        <section id="b-class" className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Combine className="w-5 h-5 text-cyan-400" />
            <span>Part B 2.5: Class-Conditioned Flow Matching</span>
          </h2>
          <p className="text-slate-300 leading-relaxed">
            The class is a one-hot vector of length 10. On 10% of the steps that
            vector is set to zero, so the network still has to work with no
            class. Time and class are added after two more fully connected
            blocks.
          </p>
          <CodeBlock>{`unflatten = c1 * unflatten + t1
up1 = c2 * up1 + t2`}</CodeBlock>
          <p className="text-slate-300 leading-relaxed">
            Training matches the time-only run: <span className="font-mono text-cyan-300">D = 64</span>,
            batch size 64, ten epochs, Adam from{' '}
            <span className="font-mono text-cyan-300">1e-2</span> with the same
            exponential decay. The scheduled run opens with one very large loss,
            then settles.
          </p>
          <Figure
            src={publicUrl('p3/b_class_loss.png')}
            caption="Class-conditioned training loss. The schedule starts at 1e-2, so the first steps spike"
          />
        </section>

        <section id="b-class-samples" className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Wind className="w-5 h-5 text-cyan-400" />
            <span>Part B 2.6: Sampling</span>
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Sampling uses 300 Euler steps and guidance 5. The unconditional
            velocity is the forward pass with the class mask set to zero, which
            is different from asking for digit 0.
          </p>
          <CodeBlock>{`u = u_uncond + 5 * (u_cond - u_uncond)`}</CodeBlock>
          <p className="text-slate-300 leading-relaxed">
            Each grid is four copies of digits 0 through 9, seed 180. After one
            epoch the rows already agree on the class. The 4s and 5s are still
            messy. By epoch 5 they are digits, and by epoch 10 the rows are
            clean and the four copies are not identical.
          </p>
          <Figure
            src={publicUrl('p3/b_class_epoch1.png')}
            caption="Epoch 1. Four of each digit, guidance 5, 300 steps"
          />
          <Figure
            src={publicUrl('p3/b_class_epoch5.png')}
            caption="Epoch 5"
          />
          <Figure
            src={publicUrl('p3/b_class_epoch10.png')}
            caption="Epoch 10"
          />

          <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-4">
            <h3 className="text-sm font-semibold text-cyan-400 font-mono uppercase tracking-wider">
              Without the scheduler
            </h3>
            <p className="text-slate-300 leading-relaxed">
              I trained a second network with a constant learning rate of{' '}
              <span className="font-mono text-cyan-300">1e-3</span>. That is the
              rate the exponential schedule reaches at epoch 10, so the run
              skips the large early steps. The loss starts lower and stays
              noisy at about the same floor. At epoch 10 the digits match the
              scheduled model. A few 6s are a little softer.
            </p>
            <Figure
              src={publicUrl('p3/b_class_fixed_loss.png')}
              caption="Constant learning rate 1e-3, ten epochs"
            />
            <Figure
              src={publicUrl('p3/b_class_fixed_epoch10.png')}
              caption="Epoch 10 without the scheduler. Same seed, guidance, and step count"
            />
          </div>
        </section>

        <section id="b-bells" className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Palette className="w-5 h-5 text-cyan-400" />
            <span>Part B: Bells & Whistles</span>
          </h2>
          <p className="text-slate-300 leading-relaxed">
            The time-only samples at epoch 10 are readable and still worse than
            the class-conditioned ones. I kept training that same network, with
            the same scheduler, from epoch 10 through epoch 20. The loss keeps
            inching down. Sampling again uses seed 180, so the grid lines up
            with the epoch-10 samples.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Most digits stay where they were. On the bottom row, a shape that
            read as an 8 at epoch 10 reads as a 5, and a 9 becomes a 1. The
            class label is still doing more work than these extra epochs.
          </p>
          <Figure
            src={publicUrl('p3/b_time_long_loss.png')}
            caption="Time-conditioned loss through epoch 20. The curve includes the first ten epochs"
          />
          <Figure
            src={publicUrl('p3/b_time_epoch20.png')}
            caption="Time-conditioned samples after epoch 20. Seed 180"
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
