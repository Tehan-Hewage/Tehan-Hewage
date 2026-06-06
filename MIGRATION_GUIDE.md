# Portfolio Migration & Setup Guide

Your current portfolio is built as a static HTML website using vanilla JavaScript and the Tailwind CSS CDN. To use the new 3D Spline Scene, React layout cards, and Spotlight animations, you need a Node.js-based React build system supporting TypeScript and shadcn UI.

This guide details how to set up the environment and migrate your site.

---

## 1. Project Initialization (Vite + React + TS)

Run the following command to initialize a new Vite project with React and TypeScript in a new folder, or clear the current folder (after making a backup) and run:

```bash
# Create a new Vite app in a subfolder or current folder
npm create vite@latest ./ -- --template react-ts
```

Install standard project dependencies:
```bash
npm install
```

---

## 2. Set Up Tailwind CSS

To install Tailwind CSS, its peer dependencies, and generate config files:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Configure Path Resolvers in `tailwind.config.js`
Replace the contents of `tailwind.config.js` with:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        spotlight: "spotlight 2s ease .75s 1 forwards",
      },
      keyframes: {
        spotlight: {
          "0%": {
            opacity: 0,
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: 1,
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
}
```

---

## 3. Configure TypeScript Path Aliases

To support the `@/...` import syntax, configure the tsconfig.

Install path helper utility:
```bash
npm install -D @types/node
```

Modify `vite.config.ts`:
```typescript
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
})
```

Add the compiler options to `tsconfig.json` (inside `compilerOptions`):
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

## 4. Initialize shadcn UI

Run the shadcn initialization script:

```bash
npx shadcn@latest init
```

During initialization, configure options as follows:
- **Style**: Default
- **Base color**: Slate / Zinc
- **CSS variables**: Yes
- **Tailwind CSS file location**: `src/index.css`
- **Import alias for components**: `@/components`
- **Import alias for utils**: `@/lib/utils`

---

## 5. Install Component Dependencies

Run the following command to install the required external libraries for the Spline 3D Scene and Spotlight animations:

```bash
npm install @splinetool/runtime @splinetool/react-spline framer-motion clsx tailwind-merge
```

---

## 6. Component Placement and Path Integrity

We have created the React components for you under:
- `/lib/utils.ts` (Classname utility helper)
- `/components/ui/splite.tsx` (Lazy-loaded Spline component)
- `/components/ui/card.tsx` (shadcn Card component)
- `/components/ui/spotlight.tsx` (Aceternity SVG Spotlight)
- `/components/ui/spotlight-hover.tsx` (ibelick Hover Spotlight)
- `/components/ui/demo.tsx` (SplineSceneBasic demo)
- `/components/Hero.tsx` (Your brand new, redone Hero section)

### Why the Default Component Path `/components/ui` Is Critical

If your components path is not set to `/components/ui` (or `src/components/ui` relative to project configuration), it causes significant workflow overhead:

1. **shadcn CLI Automation**: The shadcn CLI uses `/components/ui` as its default directory for atomic UI elements. Running commands like `npx shadcn@latest add button` relies on `components.json` mapping. If this directory doesn't exist, CLI additions will fail or scatter components across custom folders, breaking layout structure.
2. **Import Cleanliness**: Standard imports assume path aliases such as `import { Card } from "@/components/ui/card"`. Deviating from this disrupts consistency and leads to broken absolute paths.
3. **Atomic vs. Composite Separation**: 
   - **/components/ui/**: Reserved for low-level, atomic primitive elements (buttons, dialogs, cards, input fields) that are headless and styled globally.
   - **/components/**: Used for high-level composite layout structures (e.g. `Hero.tsx`, `Projects.tsx`, `Navbar.tsx`) that combine multiple primitives to form a specific view or page layout.

---

## 7. Activating the Redesigned Hero Section

In your main entry page (e.g., `src/App.tsx` or `src/main.tsx`), import and mount the new `<Hero />` component:

```tsx
import React from 'react';
import { Hero } from './components/Hero';

function App() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Redone 3D Spline Scene Hero section */}
      <Hero />
      
      {/* Rest of your sections can go here */}
    </div>
  );
}

export default App;
```

Start your development server to view the results:
```bash
npm run dev
```
