# Creative Blog UI — DevJourney Portfolio

Modern, animated personal portfolio and blog frontend built with **React**, **Vite**, and **Material UI**.  
Showcases professional profile, experience, skills, projects, blog content, and a contact form — with full **English / Turkish** internationalization.

**Author:** [Halit Altun](https://github.com/halit-altun)  
**Repository:** https://github.com/halit-altun/creative-blog-ui

---

## Features

- Animated home experience (hero typewriter, tech stack, Framer Motion transitions)
- About section with CV-aligned bio, expertise areas, and chronological experience timeline
- Projects gallery driven by local data + i18n copy (GitHub-linked repos, image carousels)
- Blog listing and category detail pages (backed by external API)
- Contact form with validation (Formik + Yup) and mail API integration
- EN / TR language support via `i18next` (namespace-based JSON locales)
- First-visit language preference modal with cookie persistence (`preferredLanguage`)
- Default language: **English** until the user selects a preference
- Responsive layout (Material UI breakpoints)
- Footer stats (project count from local data, blog count from API)
- Netlify-ready static build (`dist`)

---

## Tech Stack

| Layer | Tools |
| --- | --- |
| UI | React 18, Material UI (MUI), Emotion |
| Build | Vite 6 |
| Routing | React Router 7 |
| Animation | Framer Motion, React Spring |
| i18n | i18next, react-i18next, i18next-http-backend |
| Forms | Formik, Yup |
| HTTP | Axios |
| Deploy | Netlify (`netlify.toml`) |

---

## Pages & Routes

| Path | Description |
| --- | --- |
| `/` | Redirects to `/home` |
| `/home` | Landing / hero, tech stack |
| `/about` | Bio, skills, experience |
| `/projects` | Project portfolio |
| `/blog` | Blog list |
| `/blog/:category` | Blog detail by category |
| `/contact` | Contact form |

---

## Getting Started

### Prerequisites

- Node.js **18+** (Node **20** recommended; used in Netlify)
- npm (or compatible package manager)

### Installation

```bash
git clone https://github.com/halit-altun/creative-blog-ui.git
cd creative-blog-ui
npm install
```

### Environment

Create a `.env` file in the project root:

```env
VITE_API_URL=https://your-api-base-url
```

Used for:

- `GET /api/blogs` — blog list & footer latest posts
- `GET /api/blogs/:category` — blog detail
- `POST /api/mail/send` — contact form

### Development

```bash
npm run dev
```

App runs at **http://localhost:3001** (port configured in `package.json` / `vite.config.js`).

PowerShell (optional explicit port):

```powershell
$env:PORT=3001; npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

Build output: `dist/`

### Lint

```bash
npm run lint
```

---

## Project Structure

```text
creative-blog-ui/
├── public/
│   ├── images/              # Profile, project screenshots, assets
│   ├── cv/                  # CV PDF files
│   └── locales/             # i18n JSON (namespace / language)
│       ├── home/
│       ├── about/
│       ├── projects/
│       ├── contact/
│       ├── blog/
│       ├── blog-detail/
│       └── layout/
│           ├── navbar/
│           └── footer/
├── src/
│   ├── components/          # UI sections & shared components
│   ├── context/             # AppContext (stats, etc.)
│   ├── data/                # projects.js (ids, tech, github, images)
│   ├── pages/               # Route-level pages
│   ├── utils/               # languageCookie helpers
│   ├── i18n.js              # i18next bootstrap
│   ├── App.jsx              # Routes, language modal gate
│   └── main.jsx
├── netlify.toml
├── vite.config.js
└── package.json
```

### i18n Notes

- Locales path pattern: `/locales/{{ns}}/{{lng}}.json`
- Supported languages: `en`, `tr`
- Fallback language: `en`
- Project **titles / descriptions / features** live in locale files; structural data (`id`, `tech`, `github`, `images`) lives in `src/data/projects.js`
- Language preference is stored in a cookie; if unset, the preference modal appears again on navigation until a choice is saved

---

## Deployment (Netlify)

`netlify.toml` defaults:

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** `20`

Set `VITE_API_URL` in the Netlify site environment variables (Build settings), then redeploy.

> **Important:** Do not commit `node_modules`. The repository uses `.gitignore` so Netlify installs dependencies cleanly on Linux.

---

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start Vite dev server on port 3001 |
| `npm start` | Same as `dev` |
| `npm run build` | Production build (`npx vite build`) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

---

## License

No project `LICENSE` file is currently published. Add a license before redistributing if required.

---

## Contact

**Halit Altun**  
GitHub: [@halit-altun](https://github.com/halit-altun)  
Project: [creative-blog-ui](https://github.com/halit-altun/creative-blog-ui)
