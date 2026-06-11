# AtlasMind212 Design System

## Direction

Dark editorial technology: calm, intelligent, premium, and practical. The
experience uses an Atlas Night canvas, layered navy surfaces, precise cyan
signals, and very limited Atlas Red details inspired by Moroccan geometry.

## Typography

- Display: Calistoga, weight 400, for `h1`, `h2`, and editorial statements.
- Interface/body: Inter, weights 400-700.
- Technical: JetBrains Mono for metadata, commands, indexes, and status labels.
- Keep body copy between 60-72 characters per line where practical.

## Color

- Main background / Atlas Night: `#020617`
- Deep surface / Dark Navy: `#07111F`
- Elevated surface / Tech Panel: `#0B1626`
- Primary / Electric Cyan: `#00C8F5`
- Hover and focus glow / Neon Cyan: `#38DDFB`
- Main text / Ice White: `#F8FAFC`
- Muted text / Steel Gray: `#94A3B8`
- Accent / Atlas Red: `#F0323D`
- Border / Soft Blue Border: `#1E3A4A`

Cyan is the functional brand color for primary actions, links, selected states,
icons, progress, and focus. Red is limited to small labels, alerts, status
markers, and occasional geometric details. Never use red for a large section.

## Background And Surfaces

- The global Atlas Network wallpaper remains text-free and low contrast.
- Desktop uses `atlas-network-wallpaper-desktop.webp`; mobile uses the dedicated
  portrait crop.
- Content sections use 78-96% opaque navy surfaces so wallpaper detail never
  competes with copy.
- Cards use Dark Navy; elevated controls and panels use Tech Panel.
- Cyan glow is restrained to one focal element per viewport and never reduces
  edge or text contrast.

## Shape And Elevation

- Controls: 12-16px radius.
- Cards and imagery: 24-32px radius.
- Shadows use neutral black and optional low-opacity cyan, never warm brown.
- Interactive cards may move up by at most 6px on hover.

## Motion

- Press and hover feedback: 150-260ms.
- Scroll reveals: 580ms using an ease-out curve.
- Animate one or two focal elements per viewport.
- Never use scroll-jacking, custom cursors, parallax wallpaper, or continuous
  decorative motion.
- Under `prefers-reduced-motion`, present all content immediately and remove
  staged transforms and typewriter effects.

## Imagery

Use text-free editorial 3D scenes built from dark brushed metal, smoked glass,
frosted cyan glass, precise light routes, and sparse red calibration markers.
Images should feel technical but approachable. Avoid purple gradients, neon
overload, generic glowing brains, fake UI text, and busy compositions.

## Brand Assets & Tool Logos

- **Local Storage**: Official vector SVGs are stored under `public/brands/` to prevent third-party runtime dependencies.
- **Sizing & Aspect Ratio**: Logos must preserve official proportions without stretching or cropping.
- **Visual Contrast (Dark Tiles)**: Render official brand colors inside rounded dark elevated tiles (`#0B1626`, border `#1E3A4A`, radius `16px`) to ensure harmonized aesthetics on Atlas Night (`#020617`) and satisfy contrast requirements.
- **Logo Constellation**: scattered absolute-positioned background logos must maintain low opacity (`opacity: 0.12`) with background blur and navy overlays to stay subtle. Desktop displays up to 10 nodes, while mobile is limited to 3 key nodes to prevent clutter.
- **Micro-Animations**: Limit to soft entrance fades and subtle hover scale adjustments (no continuous rotation or floating).

## Accessibility

- WCAG AA contrast for text and controls.
- Cyan buttons use Atlas Night text.
- Minimum interactive target: 44px.
- Visible Neon Cyan focus rings on every interactive element.
- Dialogs and sheets require titles, descriptions, Escape handling, focus
  trapping, and focus return.
- Navigation exposes `aria-current`.
- Wallpaper and logo constellations are decorative and must use `aria-hidden="true"`.
- All motion has a reduced-motion equivalent.

