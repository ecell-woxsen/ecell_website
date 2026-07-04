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

### Installation

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

3. **Run the development server:**
   ```bash
   bun dev
   # or
   npm run dev
   ```

4. **Open the browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

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
