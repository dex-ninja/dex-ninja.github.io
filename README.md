# DexNinja project page

Static research project page for **DexNinja: Learning Robust Dexterous Cutting Policy with a Real-to-Sim-to-Real Data Engine** (CoRL 2026).

Published at https://dex-ninja.github.io/ using GitHub Pages, from the root of `main`.

## Preview

```sh
python -m http.server 8000
```

Open http://localhost:8000. No build tool or package installation is required. For video chapter seeking, use GitHub Pages or a local static server with HTTP byte-range support; Python’s basic server is sufficient for a layout preview.

## Release links

Paper and code intentionally say **Coming soon**, pending the CoRL release. Replace the two `.resource.unavailable` spans in `index.html` with links when the authors are ready. No manuscript PDF or private source code is included. BibTeX is intentionally omitted until the authors are ready to add it.

## Content and provenance

- Title, authors, method, main results, component ablations, and limitations: `main_camera_ready.tex` and `sections_camera_ready/` in the supplied paper repository.
- Main comparison: 25 trials per food, four foods, 100 trials per training regime. Sim-only / Real-only / Sim+Real success is 34 / 31 / 50 percent. The 63 percent result belongs to the separate scaling experiment with 300 simulated episodes.
- Scaling results: `tabs/scaling.tex`. Multi-cut results: `sections_camera_ready/6_experiments.tex`.
- Figures are web-optimized renderings of the supplied `teaser_v4.pdf`, `pipeline_new_v7.pdf`, `data_augmentation_v2.pdf`, `domain.pdf`, `tactile_v4.pdf`, and `multi_cuts_quali.pdf`.
- Full presentation: the supplied `paper/media/DexNinja.mp4`, losslessly remuxed for progressive playback. Hero clips are silent spatial/temporal excerpts from that video (252–263 seconds for strawberry/banana and 269–296 seconds for lemon). The original 4× / 8× demonstration speeds are preserved.
- The research code was surveyed across its tracked source tree, with focused inspection of deformable simulation, tactile sensing, real/sim data pairing, arm/hand policy heads, trajectory densification, registration, and deployment. Website results are sourced from the manuscript, not inferred from code or demonstration videos.
- The code checkout contains multiple experimental variants; the page describes the paper's method and does not claim a complete public implementation is available.

The layout is independently implemented in the academic project-page style of [Nerfies](https://nerfies.github.io/), credited in the footer. The Noto Sans font is redistributed under its SIL Open Font License; see `static/fonts/OFL.txt`. Paper figures and video remain the authors' research materials.

## Behavior

Responsive layout; user-controlled, muted demonstration loops; reduced-motion support; lazy-loaded figures with keyboard-accessible enlargement; full video with chapter navigation; metric/food result controls; complete static result table. The title follows the video's two-line opening card, with the red italic project name inline. Authors link to identified personal or institutional webpages, with research-profile links where no personal homepage was found. Names without an identified page remain plain text. The main research content and video controls also work without JavaScript.
