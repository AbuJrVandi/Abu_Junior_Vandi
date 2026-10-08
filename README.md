## Editing the current portfolio

Edit **`src/portfolio.js`** to update the content used by the current design:

- **`copy`**: name, headings, descriptions, buttons, form labels, messages, and social URLs.
- **`images`** and the image imports: hero/About portrait and project screenshots.
- **`links`**: navigation labels and section IDs. Keep IDs matched to the sections in App/components.
- **`services`**: service titles, tags, and descriptions.
- **`projects`**: each entry is `[title, description, image, category]`; add or remove entries as needed. Preview links open the supplied image.
- **`expertise`**: each entry is `[symbol, title, description]`.
- **`ribbon`**: continuously scrolling specialties. **`ribbonDuration`** sets seconds per loop; larger values move more slowly.
- **`email`**: EmailJS service ID, template ID, and public key. Never put private credentials here.

Edit **`src/App.css`** for colors (the `:root` variables), fonts, spacing, and responsive layouts. Browser title, description, and favicon are in **`public/index.html`**.

Run `npm start` to preview edits live. These are source-code edits; there is no public editing mode or admin dashboard. Build and redeploy to update a hosted version.

The navbar floats independently above the full-width page. The ribbon loops seamlessly, includes a pause/resume control, and respects reduced-motion settings. The footer stays full-width and the page scrollbar stays hidden.

<div align="center">

<img src="src/assets/img/JrAbu.png" alt="Abu Junior Vandi Logo" width="140" />

# Abu Junior Vandi — Portfolio 2026

**Modern, animated personal portfolio built with React**

A fast, responsive, single-page portfolio showcasing full-stack development,
UI/UX design, and data analysis work.

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![React Bootstrap](https://img.shields.io/badge/React_Bootstrap-2.798679-blue?style=flat-square&logo=reactbootstrap&logoColor=white)](https://react-bootstrap.github.io/)
[![Create React App](https://img.shields.io/badge/build-CRA-09B8A8?style=flat-square&logo=create-react-app&logoColor=white)](https://create-react-app.dev/)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

[**Live Demo**](#-live-demo) · [**Getting Started**](#-getting-started) · [**Project Structure**](#-project-structure) · [**Deployment**](#-deployment)

</div>

---

## Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Getting Started](#-getting-started)
- [Optional: Contact Email Server](#-optional-contact-email-server)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [Contact](#-contact)

---

## Overview

Portfolio 2026 is a single-page React application presenting a professional
personal brand. It combines a typewriter-animated hero, a skill carousel, a
tabbed project showcase, and a working contact form — all wrapped in a dark,
modern design that adapts to every screen size.

| Section | Description |
| :------ | :---------- |
| **Hero** | Typewriter rotation across *Web Developer*, *Data Analyst*, *UI/UX Designer*, *Full-stack Developer* |
| **Skills** | Infinite responsive carousel: Web Dev, Full-stack, UI/UX, Data Analysis |
| **Projects** | 9 case studies across 3 tabs (fintech, government, logistics, ML, ed-tech, and more) |
| **Contact** | Validated contact form powered by EmailJS |
| **Footer** | Logo, copyright, and social links |

---

## Live Demo

<div align="center">

| Netlify | Vercel |
| :-----: | :----: |
| [![Deploy to Netlify](https://www.netlify.com/img/deploy-light.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/AbuJrVandi/Portfolio_2026) | [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/AbuJrVandi/Portfolio_2026) |

</div>

---

## Tech Stack

| Layer | Technologies |
| :---- | :----------- |
| **Framework** | React 18, JavaScript (ES6+) |
| **Build Tool** | Create React App (`react-scripts` 5) |
| **UI / Styling** | React Bootstrap, Bootstrap 5, Custom CSS, `animate.css` |
| **Animations** | `animate.css`, `react-on-screen` (scroll reveal), custom typewriter effect |
| **Carousel** | `react-multi-carousel` |
| **Routing / Anchors** | `react-router-dom`, `react-router-hash-link` |
| **Contact** | EmailJS (`@emailjs/browser`) |
| **Optional Backend** | Express, Nodemailer, CORS (`server.js`) |
| **Testing** | Jest, React Testing Library |

---

## Features

- **Fully responsive** — mobile-first layout tested from small phones to wide desktops
- **Scroll-aware navbar** — changes style after scrolling, highlights the active section
- **Typewriter hero** — cycles through roles with a custom delete/type loop
- **Tabbed project showcase** — three grouped tabs with animated transitions
- **Scroll reveal animations** — elements animate in only when visible
- **Working contact form** — inline validation and success/error feedback via EmailJS
- **Production-ready deployments** — pre-configured for Netlify and Vercel

---

## Getting Started

### Prerequisites

- **Node.js** 20.x (LTS recommended) — `package.json` targets `20.x`
- **npm** 9+ (bundled with Node)

> Check your versions with `node -v` and `npm -v`.

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/AbuJrVandi/Portfolio_2026.git
cd Portfolio_2026

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

The app runs at **[http://localhost:3000](http://localhost:3000)** and hot-reloads on save.

### Available Scripts

| Command | Description |
| :------ | :---------- |
| `npm start` | Launch the development server with hot reload |
| `npm run build` | Create an optimized production build in `/build` |
| `npm run build:log` | Production build wrapped in a step-by-step deployment log |
| `npm test` | Run the test suite in watch mode |
| `npm run server` | Start the optional Express contact server on port `5000` |
| `npm run eject` | **One-way** — eject CRA config (irreversible) |

---

## Optional: Contact Email Server

The primary contact form uses **EmailJS** (no server required). `server.js` is an
alternative Express + Nodemailer endpoint if you prefer sending mail from your
own backend.

```bash
# Set your Gmail credentials, then:
export EMAIL_USER=your_account@gmail.com   # PowerShell: $env:EMAIL_USER="..."
export EMAIL_PASS=your_app_password        # Gmail App Password, not your login
npm run server                             # -> http://localhost:5000
```

> **Security note:** never commit real credentials. The `.env` file is already
> git-ignored — keep secrets there or in your host's environment settings.

---

## Project Structure

```
Portfolio_2026/
├── public/                  # Static assets, favicon, index.html, manifest
├── src/
│   ├── assets/
│   │   ├── font/            # Centra No.2 font family
│   │   └── img/             # Logo, project screenshots, icons, backgrounds
│   ├── components/
│   │   ├── NavBar.js        # Sticky nav + social links + CTA
│   │   ├── Banner.js        # Hero with typewriter effect
│   │   ├── Skills.js        # Responsive skills carousel
│   │   ├── Projects.js      # Tabbed project showcase
│   │   ├── ProjectCard.js   # Individual project card
│   │   ├── Contact.js       # EmailJS contact form
│   │   ├── Newsletter.js    # Mailchimp subscribe block
│   │   ├── MailchimpForm.js # Mailchimp integration helper
│   │   └── Footer.js        # Logo, socials, copyright
│   ├── App.js               # Section composition
│   ├── App.css              # Component styles
│   └── index.js             # App entry point
├── server.js                # Optional Express/Nodemailer contact API
├── netlify.toml             # Netlify build + SPA redirect config
├── vercel.json              # Vercel SPA rewrite config
└── package.json
```

---

## Deployment

Both platform configs are already committed — connect the repository and push.

<details>
<summary><strong>Netlify</strong></summary>

`netlify.toml` handles everything — the build command runs `scripts/deploy-log.js`,
which prints a timestamped step-by-step log (environment, install, build,
artifact summary) in the Netlify deploy output:

```toml
[build]
  command = "node scripts/deploy-log.js"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Deploy by dragging the repo into [app.netlify.com](https://app.netlify.com) or
using the button above.
</details>

<details>
<summary><strong>Vercel</strong></summary>

`vercel.json` rewrites all routes to `index.html` for SPA routing:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Import the repository at [vercel.com/new](https://vercel.com/new) — framework
preset: **Create React App**, output directory: **build**.
</details>

<details>
<summary><strong>Manual / Static Host</strong></summary>

```bash
npm run build
# Upload the generated /build folder to any static host
```
</details>

---

## Contact

<div align="center">

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Abu_Junior_Vandi-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/abu-junior-vandi-67b12425a/)
[![Facebook](https://img.shields.io/badge/Facebook-Profile-1877F2?style=flat-square&logo=facebook&logoColor=white)](https://www.facebook.com/share/1ADLjFL2aK/?mibextid=wwXIfr)
[![Instagram](https://img.shields.io/badge/Instagram-@abuzo_marvani-E4405F?style=flat-square&logo=instagram&logoColor=white)](https://www.instagram.com/abuzo_marvani)

**Abu Junior Vandi** — Web Developer · Data Analyst · UI/UX Designer · Full-stack Developer

</div>

---

<div align="center">

<sub>© 2026 Abu Junior Vandi. All Rights Reserved.</sub>

</div>
