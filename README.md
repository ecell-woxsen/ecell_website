# E-Cell Woxsen — Where Builders Start

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)](https://bun.sh/)

The official platform for **The Entrepreneurship Cell of Woxsen University**. We build founders, not just businesses. E-Cell is where raw ideas meet real execution through hands-on programs, mentorship, and a network that ships.

---

## 🚀 Core Initiatives

- **LaunchPad**: 8-week pre-incubation sprint from napkin sketch to MVP.
- **Founder Lab**: Deep research vertical mapping markets and failure patterns.
- **Speaker Circuit**: Unfiltered conversations with founders and VCs.
- **Community Fund**: Micro-grants for student ventures (₹50K–2L) to prove traction.

## ✨ Features

- **Modern UI/UX**: Built with a sleek, dark-themed aesthetic and glassmorphism.
- **Dynamic Content**: Data-driven architecture for events, initiatives, and team management.
- **Interactive Sections**: Smooth reveal animations and responsive layouts.
- **Ecosystem Sections**: About, Events, Initiatives, Team, Affiliations, and Community modules.
- **Comprehensive Pages**: Dedicated sub-pages for in-depth information and contact.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) (App Router)
- **Library**: [React 19](https://reactjs.org)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **Runtime**: [Bun](https://bun.sh) (Recommended)

## 📁 Project Structure

```text
├── app/               # Next.js App Router (Pages & Layouts)
├── components/        # Reusable UI Components
│   ├── layout/        # Navbar, Footer
│   ├── sections/      # Home page sections (Hero, About, etc.)
│   └── ui/            # Atomic components (Buttons, etc.)
├── data/              # Centralized site content & config
├── public/            # Static assets (Images, SVGs)
└── styles/            # Global CSS & Tailwind config
```

## 🗄️ Restoring Temporarily Archived Features

The following sections, pages, and components have been temporarily archived to streamline the current layout. Follow these steps to reactivate them on the active site:

### 1. Events Section & Page
* **Page Route**: Rename the folder `app/_events` back to `app/events` to reactivate the public `/events` page.
* **Component Relocation**: Move `components/archive/Events.tsx` back to `components/sections/Events.tsx`.
* **Homepage Integration**: In [app/page.tsx](app/page.tsx), uncomment the `Events` import statement and the `<Events />` component tag in the `Home` function.
* **Hero Section Button**: In [components/sections/Hero.tsx](components/sections/Hero.tsx), uncomment the `<Button href="/events" ...>Explore Events</Button>` component.
* **Navigation Links**: In [data/navigation.ts](data/navigation.ts), uncomment the `{ label: "Events", href: "/events" }` objects in both the `navLinks` and `footerLinks.quickLinks` arrays.

### 2. Initiatives Section & Page
* **Page Route**: Rename the folder `app/_initiatives` back to `app/initiatives` to reactivate the public `/initiatives` page.
* **Component Relocation**: Move `components/archive/Initiatives.tsx` back to `components/sections/Initiatives.tsx`.
* **Homepage Integration**: In [app/page.tsx](app/page.tsx), uncomment the `Initiatives` import statement and the `<Initiatives />` component tag in the `Home` function.
* **Scrollspy Tracking**: In [components/layout/Navbar.tsx](components/layout/Navbar.tsx), uncomment the `"initiatives"` value inside the `sectionIds` array in the `useEffect` hook.
* **Navigation Links**: In [data/navigation.ts](data/navigation.ts), uncomment the `{ label: "Initiatives", href: "/initiatives" }` objects in both the `navLinks` and `footerLinks.quickLinks` arrays.

### 3. Affiliations Page
* **Page Route**: Rename the folder `app/_affiliations` back to `app/affiliations` to reactivate the public `/affiliations` page.
* **Navigation Links**: In [data/navigation.ts](data/navigation.ts), uncomment the `{ label: "Affiliations", href: "/affiliations" }` objects in both the `navLinks` and `footerLinks.connect` arrays.

### 4. Marquee (Moving Bar) Component
* **Component Relocation**: Move `components/archive/Marquee.tsx` back to `components/sections/Marquee.tsx`.
* **Homepage Integration**: In [app/page.tsx](app/page.tsx), uncomment the `Marquee` import statement and the `<Marquee />` component tag in the `Home` function.

---

## 🚥 Getting Started

### Prerequisites

- **Bun** (Preferred) or **Node.js**
- A terminal with Git installed

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ecell-woxsen/ecell_website.git
   cd ecell-website
   ```

2. **Install dependencies:**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Set up Environment Variables:**
   Copy the example environment file to create your local configuration:
   ```bash
   cp .env.example .env.local
   ```
   Open `.env.local` and fill in the missing keys (e.g. Resend, Groq, and custom Auth paths). See [Environment Variables Configuration](#-environment-variables-configuration) below for details.

4. **Initialize & Start Convex (Backend Database):**
   This project uses [Convex](https://convex.dev) for real-time data storage and serverless backend functions. Run the dev environment to automatically link the project:
   ```bash
   npx convex dev
   # or
   bunx convex dev
   ```
   *Note: This command will guide you through signing up/logging in to Convex and creating a development deployment. Once linked, it automatically generates the schema clients and appends your Convex deployment credentials to `.env.local`.*

5. **Run the Next.js development server:**
   In a separate terminal window, start the frontend development server:
   ```bash
   bun dev
   # or
   npm run dev
   ```

6. **Open the browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 Environment Variables Configuration

The application uses environment variables to communicate with various backend cloud services. Below is a description of the keys defined in [.env.example](.env.example):

### 🔷 Convex Cloud Database
* **`CONVEX_DEPLOYMENT`**: Identifies your active Convex project environment (e.g. `dev:earnest-mallard-521`).
* **`NEXT_PUBLIC_CONVEX_URL`**: Public URL of your Convex API endpoint (e.g. `https://earnest-mallard-521.convex.cloud`).
* **`NEXT_PUBLIC_CONVEX_SITE_URL`**: Public URL of your Convex HTTP actions endpoints (e.g. `https://earnest-mallard-521.convex.site`).
* *Note: Running `npx convex dev` handles creating and writing these values for you automatically.*

### 📧 Email Dispatch (Resend)
* **`RESEND_API_KEY`**: API key from [Resend](https://resend.com) used to send automated notification emails for submitted startup ideas, newsletter signs, and contact forms.

### 🤖 AI Form Processing (Groq)
* **`GROQ_API_KEY`**: API key from the [Groq Console](https://console.groq.com) to leverage AI-assisted categorization and summary parsing of contact form messages using `llama3-8b-8192`. If not defined, contact messages will process normally, skipping AI enrichment.

### 🛡️ Authentication & Portal Configuration
* **`BETTER_AUTH_SECRET`**: A cryptographically secure 32-character random string used to secure user sessions.
* **`ADMIN_LOGIN_PATH`** & **`NEXT_PUBLIC_ADMIN_LOGIN_PATH`**: An obfuscated custom route segment used to access the E-Cell admin portal (e.g. `portal-y9k4v2z8` exposes `/portal-y9k4v2z8` as the admin entrypoint). Make sure to set these to identical values.

## 📦 Scripts

- `bun dev`: Starts the development server.
- `bun build`: Builds the application for production.
- `bun start`: Starts the production server.
- `bun lint`: Runs ESLint for code quality checks.

## 🌐 Connect with Us

- **Website**: [ecell.woxsen.edu.in](https://ecell.woxsen.edu.in)
- **LinkedIn**: [ecell-woxsen](https://linkedin.com/company/ecell-woxsen)
- **Instagram**: [@ecell_woxsen](https://instagram.com/ecell_woxsen)
- **Email**: [ecell@woxsen.edu.in](mailto:ecell@woxsen.edu.in)

---

Built with ❤️ by the **E-Cell Woxsen Tech Team**.
