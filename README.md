# 🚀 Harshit Vaidya Dev Portfolio

A stunning, interactive, and modern developer portfolio & agency site built with **React**, **Vite**, and **Three.js**. Showcasing premium web/app projects, smooth 3D visuals, and a pro-level user experience.

---

## ✨ Project Overview

Welcome to the next-level portfolio for **Harshit Vaidya**—where logic meets aesthetics. This site blends:
- **3D planet hero** (Three.js + React Three Fiber)
- Animated, scroll-triggered sections
- Dynamic project showcases
- Custom fonts & beautiful UI
- Lightning-fast performance (Vite + Tailwind CSS)

---

## 🏆 Features

- **Immersive Hero Section:** 3D animated planet, interactive lighting, and responsive design.
- **Animated Navigation:** Smooth, GSAP-powered burger menu and scroll navigation.
- **Service Highlights:** Sticky, animated service cards with detailed breakdowns.
- **Works/Portfolio:** Interactive, animated project list with tech stack badges and image previews.
- **About Section:** Personal intro, animated text, and AI-generated portrait.
- **Contact & Socials:** Marquee effects, direct email, phone, and social links.
- **Custom Fonts:** Amiamie font family for a unique, premium look.
- **Mobile-First & Responsive:** Looks stunning on all devices.
- **Performance & Accessibility:** Optimized for speed and usability.

---

## 🛠️ Tech Stack

- **React 19**
- **Vite** (blazing fast dev/build)
- **Tailwind CSS** (utility-first styling)
- **GSAP** (animations, scroll triggers)
- **@react-three/fiber** & **@react-three/drei** (3D rendering)
- **Three.js** (3D planet model)
- **Lenis** (smooth scrolling)
- **Iconify** (icon system)
- **Custom Fonts** (Amiamie)

---

## 🚦 Getting Started

1. **Clone the repo:**
   ```bash
   git clone https://github.com/harshitvaidya/Gsap-Portfolio.git
   cd dev-web
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the dev server:**
   ```bash
   npm run dev
   ```
4. **Build for production:**
   ```bash
   npm run build
   ```
5. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## 📁 Folder Structure

```
├── public/
│   ├── assets/
│   │   ├── backgrounds/      # Section backgrounds
│   │   └── projects/         # Project showcase images
│   ├── fonts/amiamie/        # Custom Amiamie font (otf, ttf)
│   ├── images/               # Profile/AI images
│   └── models/               # 3D planet model (GLB)
├── src/
│   ├── components/           # Reusable UI components (Marquee, AnimatedHeader, Planet, etc.)
│   ├── sections/             # Main page sections (Hero, About, Services, Works, Contact, etc.)
│   ├── constants/            # Data for services, projects, socials
│   ├── index.css             # Tailwind + custom fonts/styles
│   ├── App.jsx               # Main app layout
│   └── main.jsx              # Entry point
├── index.html                # App HTML shell
├── vite.config.js            # Vite config
├── eslint.config.js          # ESLint config
└── package.json              # Project metadata & scripts
```

---

## 📜 Scripts

- `npm run dev` — Start local dev server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run lint` — Lint code with ESLint

---

## 🙏 Credits

- **3D Model:** [Planet.glb](public/models/Planet.glb) auto-generated via [gltfjsx](https://github.com/pmndrs/gltfjsx)
- **Fonts:** [Amiamie](https://amiamie.com/) (included locally)
- **Icons:** [Iconify](https://iconify.design/)
- **Inspiration:** Crafted by Harshit Vaidya — [GitHub](https://github.com/harshitvaidya) | [Instagram](https://www.instagram.com/harshit_vaidya/)

---

## 🪪 License

This project is open source and available under the [MIT License](LICENSE).
