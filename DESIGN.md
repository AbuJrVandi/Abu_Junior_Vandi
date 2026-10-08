# Portfolio design

The portfolio follows the supplied Dribbble screenshots: a cream canvas, amber accents, floating dark pill navigation, a centered portrait, a specialty ribbon, an expandable service list, and alternating cream and dark sections.

The reference's sample identity, reviews, awards, and education history are replaced with Abu Junior Vandi's existing portfolio content. All fourteen projects remain available through **View all projects**. Eight of them — TenkiPay, Korlie, WanGov, Achievers Standard Academy, Am Novate, Strimlyne, Adrehs, and SUS Energy — display an auto-generated screenshot of their live site inside a browser-chrome frame (address bar shows the domain) with a pulsing Live badge; clicking the preview or the **Live Preview ↗** link opens the live site in a new tab. Screenshots come from the free WordPress mShots service and fall back to the bundled capture in `src/assets/img/` if the service fails. The remaining projects (LOG, FitTrack, ML Algorithm, AMI, Online, LM) keep image-only preview links because live URLs were not supplied.

## Full-width refinement

The outer border, rounded page frame, and page margins are removed. The footer spans the viewport. Following the latest revision, the navbar floats in an inset rounded pill, independent of the full-width page. The page scrollbar is visually hidden while wheel, touch, and keyboard scrolling remain enabled. Navigation highlights the visible section; entrance reveals and hover feedback respect reduced-motion preferences. The mobile menu supports Escape to close and returns focus to its toggle.

Browser checks confirmed full-width headers and footers, no horizontal overflow at 320px and 390px, working scroll-based navigation, and visible content with reduced motion.

## Local preview and checks

- `npm start` starts the development site.
- `npm run build` produces the production site.
- `npm test -- --watchAll=false` checks service expansion, project expansion, mobile navigation, and contact success/error handling.

The contact form retains the existing EmailJS configuration. Tests mock delivery and do not send messages.

## Portrait asset

- Source: `src/assets/img/header-img.jpeg`
- Output: `src/assets/img/abu-portrait-cutout.png`
- Tool: built-in imagegen, transparent-background edit.
- Prompt: "Use case: background-extraction. Asset type: portfolio website hero portrait cutout. Edit target: the provided photograph of Abu. Remove only the background, including car, roof, plants and ground. Preserve the man's exact face, identity, hairstyle, skin tone, burgundy clothing, hands, body and pose unchanged. Output a clean photographic cutout on a genuinely transparent background, tightly framed around the person from head to bottom of existing image. No text or additional objects."

The original photograph is preserved. The generated cutout is stored in the project and used in the hero and About section.

## Content editing and ribbon

`src/portfolio.js` holds portfolio copy, images, social URLs, navigation, services, projects, expertise, EmailJS public configuration, ribbon labels, and ribbon speed. The README explains editing. The specialties ribbon repeats two identical groups for a seamless continuous loop, with pause/resume and reduced-motion support.
