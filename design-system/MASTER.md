# AtlasMind Design System

## Direction

Light editorial technology: direct, capable, human, and practical. The system
uses documentary workplace photography, oversized sans-serif statements,
white and warm-ivory canvases, thin rules, and restrained copper/taupe brand
signals. It is inspired by modern European digital studios without copying
another company’s imagery, identity, copy, or page content.

## Typography

- One family: Inter, weights 400–800.
- Display headings are bold, tightly tracked, and fluid from mobile to desktop.
- Navigation and metadata use small uppercase Inter with measured tracking.
- Body copy stays 60–72 characters per line where practical.
- Do not use serif or monospace typography as a decorative device.

## Color

- Canvas: `#FFFFFF`
- Soft neutral surface: `#F7F7FA`
- Warm secondary surface: `#F3ECE7`
- Tinted editorial surface: `#FAF6F3`
- Main text: `#0A0A0A`
- Muted text: `#60616B`
- Charcoal brand surface: `#404447`
- Display copper: `#C26A44`
- Accessible interactive copper: `#9E4D2E`
- Copper hover: `#823B23`
- Taupe accent: `#B6A89B`
- Border: `#DED7D1`
- Destructive: `#C92A35`

Use display copper for large text and decorative rules. Use the darker
interactive copper for buttons, links, focus, and small text. Taupe is a sparse
highlight with dark foreground text and is not used as small text on charcoal.
Red and amber remain semantic colors only.

## Layout And Surfaces

- Use full-bleed photographic heroes or clean split compositions.
- Alternate white, soft neutral, and warm-ivory sections.
- Prefer asymmetrical editorial grids and generous vertical rhythm.
- Cards are flat white surfaces with 0–8px radii, thin borders, and subtle
  charcoal-neutral shadows.
- Use 1–4px copper rules and section dividers instead of glow, glass, or
  decorative technical grids.
- Admin pages use the same tokens in a denser dedicated private shell.

## Motion

- Hover and press feedback: 160–240ms.
- Scroll reveals: 480ms, opacity plus no more than 14px vertical movement.
- No continuous decorative motion, typewriter effects, parallax, or custom
  cursors.
- Under `prefers-reduced-motion`, show content immediately.

## Imagery

Use original, text-free documentary workplace photography: real-looking
people, modest studios, whiteboards, laptops, notes, cables, and natural light.
Keep skin, fabric, paper, and architectural texture believable. Add copper or
taupe line motifs with CSS or local SVG overlays rather than baking branding
into photographs. Avoid copied reference assets, staged stock-photo smiles,
generic robots, holograms, neon lighting, fake UI text, and futuristic AI
cliches.

Project imagery is local under `public/images/`, rendered with `next/image`,
stable dimensions, responsive `sizes`, useful alt text, and priority only for
the LCP image.

## Brand Assets

The AtlasMind source artwork lives at `assets/atlasmind-logo-source.jpeg`.
Production assets are the transparent full lockup at
`public/atlasmind-logo.png`, the square transparent mark at
`public/atlasmind-mark.png`, the extracted wordmarks at
`public/atlasmind-wordmark.png` and `public/atlasmind-wordmark-inverse.png`,
and the platform icons under `app/`. Use the mark with the original wordmark in
compact headers and the inverse wordmark on dark surfaces.

Official tool logos remain local under `public/brands/` and preserve their
original proportions and colors. When logos appear, use white or warm-neutral
tiles with neutral borders. Do not use third-party runtime logo dependencies.

## Accessibility

- WCAG AA contrast for text and controls.
- Minimum interactive target: 44px.
- Visible copper focus rings on links, controls, fields, summaries, and menus.
- Taupe controls always use dark text.
- Dialogs and sheets retain titles, descriptions, Escape handling, focus
  trapping, and focus return.
- Navigation exposes `aria-current` and mobile menus remain keyboard usable.
- Photography receives descriptive alt text unless it is purely decorative.
- All motion has a reduced-motion equivalent.
