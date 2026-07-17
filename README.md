# Creative Blog UI — DevJourney Portfolio

A full-stack personal portfolio, blog, and contact platform.
The **frontend** is a modern, animated React (Vite) single-page application; the **backend** is a Node.js/Express REST API backed by MongoDB, with contact-form emails delivered through the Gmail API.

**Author:** [Halit Altun](https://github.com/halit-altun)
**Repository:** https://github.com/halit-altun/creative-blog-ui
**Live site:** https://halitaltun.netlify.app

---

## Table of Contents

- [Monorepo Structure](#monorepo-structure)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Frontend](#frontend)
  - [Features](#frontend-features)
  - [Pages & Routes](#pages--routes)
  - [Project Structure](#frontend-project-structure)
  - [Environment Variables](#frontend-environment-variables)
  - [Getting Started](#frontend-getting-started)
- [Backend](#backend)
  - [Features](#backend-features)
  - [API Endpoints](#api-endpoints)
  - [Project Structure](#backend-project-structure)
  - [Environment Variables](#backend-environment-variables)
  - [Getting Started](#backend-getting-started)
  - [Contact Form → Email Flow (Gmail API)](#contact-form--email-flow-gmail-api)
- [Deployment](#deployment)
- [Scripts Reference](#scripts-reference)
- [License](#license)
- [Contact](#contact)

---

## Monorepo Structure

```text
creative-blog-ui/
├── frontend/     # React + Vite SPA (deployed on Netlify)
├── backend/      # Express REST API (deployed on Render)
└── netlify.toml  # Netlify build config (root-level, points to frontend/)
```

Each package (`frontend/`, `backend/`) has its own `package.json`, dependencies, and `.env` file — they are deployed and run independently.

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend UI | React 18, Material UI (MUI), Emotion |
| Frontend Build | Vite 6 |
| Frontend Routing | React Router 7 |
| Animation | Framer Motion, React Spring |
| Internationalization | i18next, react-i18next (English / Turkish) |
| Forms & Validation | Formik, Yup |
| HTTP Client | Axios |
| Backend Runtime | Node.js (ES Modules), Express 4 |
| Database | MongoDB (Mongoose ODM) |
| Backend Security | Helmet, CORS, express-rate-limit |
| Email Delivery | Gmail API (OAuth2, HTTPS) via `googleapis` |
| Frontend Hosting | Netlify |
| Backend Hosting | Render |

---

## Architecture Overview

```text
┌─────────────────┐        HTTPS (REST/JSON)        ┌───────────────────┐
│   Frontend SPA   │ ───────────────────────────────▶│   Backend API     │
│  React + Vite     │◀─────────────────────────────── │  Express + Node   │
│  (Netlify)         │                                 │  (Render)         │
└─────────────────┘                                 └────────┬──────────┘
                                                                │
                                    ┌───────────────────────────┼───────────────────────────┐
                                    ▼                            ▼                           
                            ┌───────────────┐            ┌────────────────────┐
                            │   MongoDB      │            │   Gmail API (v1)    │
                            │  (blogs,        │            │  OAuth2 / HTTPS      │
                            │   contact msgs) │            │  (sends contact       │
                            └───────────────┘            │   form notifications) │
                                                          └────────────────────┘
```

**Why the Gmail REST API instead of SMTP?**
Many free-tier cloud hosts (including Render's free plan) block outbound traffic on SMTP ports (`25`, `465`, `587`) to prevent spam abuse. Traditional `nodemailer` + SMTP therefore fails with connection timeouts in that environment. This project sends contact-form emails through Google's official **Gmail REST API** instead, which travels over standard HTTPS (port `443`) and is never blocked. Authentication uses a personal Google OAuth2 **refresh token** — no SMTP password of any kind is used or stored.

---

## Frontend

### Frontend Features

- Animated home experience (hero typewriter, tech stack, Framer Motion transitions)
- About section with CV-aligned bio, expertise areas, and chronological experience timeline
- Projects gallery driven by local data + i18n copy (GitHub-linked repos, image carousels)
- Blog listing and category detail pages (backed by the backend API)
- Contact form with validation (Formik + Yup) that posts to the backend mail API
- EN / TR language support via `i18next` (namespace-based JSON locales)
- First-visit language preference modal with cookie persistence (`preferredLanguage`)
- Default language: **English** until the user selects a preference
- Responsive layout (Material UI breakpoints)
- Footer stats (project count from local data, blog count from API)
- Netlify-ready static build (`dist`)

### Pages & Routes

| Path | Description |
| --- | --- |
| `/` | Redirects to `/home` |
| `/home` | Landing / hero, tech stack |
| `/about` | Bio, skills, experience |
| `/projects` | Project portfolio |
| `/blog` | Blog list |
| `/blog/:category` | Blog detail by category |
| `/contact` | Contact form |

### Frontend Project Structure

```text
frontend/
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
│   ├── pages/                # Route-level pages (Home, About, Contact, Blog, ...)
│   ├── services/             # api.js — Axios client + typed API calls
│   ├── utils/                # languageCookie helpers
│   ├── i18n.js                # i18next bootstrap
│   ├── App.jsx                 # Routes, language modal gate
│   └── main.jsx
├── netlify.toml
├── vite.config.js
└── package.json
```

### Frontend Environment Variables

Create `frontend/.env` (never committed — contains only a public API base URL, no secrets):

```env
VITE_API_URL=<your backend API base URL>
```

Used by `src/services/api.js` for:

- `GET /api/blogs` — blog list & footer latest posts
- `GET /api/blogs/:category` — blog detail
- `POST /api/mail/send` — contact form submission

> The production frontend is configured (via Netlify environment variables) to point at the live Render-hosted backend.

### Frontend Getting Started

**Prerequisites:** Node.js 18+ (20 recommended), npm

```bash
cd frontend
npm install
```

Create `.env` as shown above, then:

```bash
npm run dev       # http://localhost:3001
npm run build     # production build → dist/
npm run preview   # preview the production build
npm run lint       # ESLint
```

---

## Backend

### Backend Features

- REST API for blog content (list + category detail) backed by MongoDB
- Contact form endpoint with server-side validation and rate limiting
- Contact submissions persisted to MongoDB (`ContactMessage` collection) regardless of email delivery outcome
- Email notifications sent via the **Gmail API (OAuth2/HTTPS)** — bypasses SMTP port restrictions on cloud hosts
- Security middleware: Helmet (HTTP headers), CORS allow-list, per-IP rate limiting on the mail endpoint
- Structured, verbose logging for request lifecycle and email delivery diagnostics
- Health check endpoint reporting service status and (boolean) configuration state

### API Endpoints

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Service health/status check |
| `GET` | `/api/blogs` | List all blog posts |
| `GET` | `/api/blogs/:category` | Get a single blog post by category slug |
| `POST` | `/api/mail/send` | Submit the contact form (validated, rate-limited) |

**Contact form payload** (`POST /api/mail/send`):

```json
{
  "name": "string (required)",
  "surname": "string (required)",
  "email": "string, valid email (required)",
  "subject": "string (required)",
  "message": "string, min 10 characters (required)"
}
```

The submitted `email` belongs to the **visitor** contacting the site owner — it is stored and displayed inside the notification email as contact information; it is never used as the sending mailbox. The email is always sent from and to the site owner's configured Gmail address, so the visitor's message and reply-to address are clearly presented inside the email body.

Response:

```json
{
  "message": "Message sent successfully",
  "id": "<contact message id>",
  "emailSent": true,
  "emailError": "present only if email delivery failed"
}
```

> The contact message is always saved to the database first. If email delivery fails for any reason, the API still returns success for the submission itself, with `emailSent: false` and an `emailError` detail — no visitor message is ever lost.

### Backend Project Structure

```text
backend/
├── src/
│   ├── app.js                   # Express app setup (helmet, cors, routes)
│   ├── server.js                # Entry point — connects DB, starts HTTP server
│   ├── config/
│   │   ├── db.js                # MongoDB connection
│   │   └── env.js                # Centralized environment variable access
│   ├── controllers/
│   │   ├── blog.controller.js
│   │   └── mail.controller.js
│   ├── services/
│   │   ├── blog.service.js
│   │   └── mail.service.js        # Orchestrates save + email send
│   ├── lib/
│   │   ├── mongoNative.js
│   │   └── sendMail.js             # Gmail API email delivery
│   ├── middleware/
│   │   ├── asyncHandler.js
│   │   ├── errorHandler.js
│   │   └── validateMail.js         # Contact form payload validation
│   ├── models/
│   │   ├── Blog.js
│   │   └── ContactMessage.js
│   ├── routes/
│   │   ├── index.js
│   │   ├── blog.routes.js
│   │   └── mail.routes.js
│   ├── scripts/
│   │   └── getGmailRefreshToken.js  # One-time OAuth2 setup helper (see below)
│   ├── seed/
│   │   └── seedBlogs.js
│   ├── data/
│   │   └── sampleBlogs.js
│   └── utils/
│       └── escapeRegex.js
├── render.yaml                    # Render deployment blueprint
└── package.json
```

### Backend Environment Variables

Create `backend/.env` (never committed). **No real values are published here** — this table only documents the required variable names and what each is used for:

| Variable | Purpose |
| --- | --- |
| `PORT` | Port the Express server listens on |
| `MONGODB_URI` | MongoDB connection string |
| `MONGODB_DB` | Database name |
| `CORS_ORIGIN` | Comma-separated list of allowed frontend origins |
| `GMAIL_CLIENT_ID` | Google OAuth2 client ID (Gmail API) |
| `GMAIL_CLIENT_SECRET` | Google OAuth2 client secret (Gmail API) |
| `GMAIL_REFRESH_TOKEN` | Google OAuth2 refresh token, generated once via the setup script below |
| `MAIL_FROM` | Address the notification email is sent **from** (the site owner's Gmail) |
| `MAIL_TO` | Address the notification email is sent **to** (the site owner's Gmail) |

> For actual deployment, these variables are configured directly in the Render service's **Environment** settings. The values themselves (mailbox address, database credentials, OAuth secrets) are intentionally excluded from this document and from version control.

### Backend Getting Started

**Prerequisites:** Node.js 18+, npm, a MongoDB connection string, a Google Cloud project with the Gmail API enabled

```bash
cd backend
npm install
```

Create `.env` with the variables listed above (except `GMAIL_REFRESH_TOKEN`, obtained below), then:

```bash
npm run dev          # starts the API with file-watch (auto-restart)
npm start            # production start
npm run seed:blogs   # seeds sample blog data into MongoDB
```

The API listens on `http://localhost:<PORT>` (default `5000`).

### Contact Form → Email Flow (Gmail API)

Because SMTP ports are blocked on many free hosting tiers, this backend authenticates to Gmail using **OAuth2** and sends mail through Google's HTTPS REST API rather than opening an SMTP socket.

**One-time setup** (run locally, not needed again after the refresh token is generated):

1. In [Google Cloud Console](https://console.cloud.google.com/), create a project and enable the **Gmail API**.
2. Configure the **OAuth consent screen** (External user type, add your own Gmail address as a test user).
3. Create an **OAuth Client ID** of type **Desktop app** → note the generated Client ID and Client Secret.
4. Add `GMAIL_CLIENT_ID` and `GMAIL_CLIENT_SECRET` to `backend/.env`.
5. Run the helper script:

   ```bash
   npm run gmail:auth
   ```

6. Open the printed URL in a browser, sign in with the Gmail account that should send the notification emails, and grant access.
7. The script prints a `GMAIL_REFRESH_TOKEN` value — copy it into `backend/.env` **and** into the Render service's Environment Variables.

Once all three `GMAIL_*` variables and `MAIL_FROM` / `MAIL_TO` are set, contact form submissions are delivered automatically — no further manual steps are required, and the refresh token does not expire under normal use.

---

## Deployment

### Frontend — Netlify

Configured via the root-level `netlify.toml`:

- **Base directory:** `frontend`
- **Build command:** `npm install && npm run build`
- **Publish directory:** `dist`
- **Node version:** `20`
- SPA fallback redirect (`/* → /index.html`) is included for client-side routing

Set `VITE_API_URL` in the Netlify site's environment variables (Site settings → Build & deploy → Environment) to point at the deployed backend, then trigger a redeploy.

### Backend — Render

Configured via `backend/render.yaml`:

- **Runtime:** Node
- **Build command:** `npm install`
- **Start command:** `npm start`
- **Node version:** `20`

All variables listed in [Backend Environment Variables](#backend-environment-variables) must be set in the Render service's **Environment** tab. On the free plan, only HTTPS (port `443`) outbound traffic is unrestricted — this is exactly why the Gmail REST API approach is used instead of SMTP.

---

## Scripts Reference

### Frontend (`frontend/package.json`)

| Script | Description |
| --- | --- |
| `npm run dev` / `npm start` | Start Vite dev server on port 3001 |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

### Backend (`backend/package.json`)

| Script | Description |
| --- | --- |
| `npm run dev` | Start the API with auto-restart on file changes |
| `npm start` | Start the API (production mode) |
| `npm run seed:blogs` | Seed sample blog documents into MongoDB |
| `npm run gmail:auth` | One-time helper to generate a `GMAIL_REFRESH_TOKEN` |

---

## License

No project `LICENSE` file is currently published. Add a license before redistributing if required.

---

## Contact

**Halit Altun**
GitHub: [@halit-altun](https://github.com/halit-altun)
Project: [creative-blog-ui](https://github.com/halit-altun/creative-blog-ui)
Live site: https://halitaltun.netlify.app
