# Vue Gallery - UI/UX Motion Design Laboratory

## 🎯 Project Vision

> **"This is not a gallery app → it's a UI/UX + motion design laboratory disguised as a gallery."**

This project demonstrates how motion, feedback, and interaction improve usability and perception. Images/videos are content fillers, not the hero.

### Hero Elements
- Perspective motion
- Clip-path transitions
- Scroll-driven storytelling
- Perceived performance (lazy loading, skeletons)
- Visual hierarchy & interaction feedback

---

## 📋 UX Principles → Feature Mapping

| UX Principle | Implementation |
|-------------|----------------|
| **User-centricity** | Clear focus states, predictable motion, reduced cognitive load |
| **Consistency** | Unified motion curves, spacing, animation timing |
| **Visual hierarchy** | Scale, depth (perspective), opacity, z-axis |
| **Simplicity** | Minimal UI, content-first layout |
| **Feedback** | Hover, scroll response, loading states |
| **Performance perception** | Skeletons, lazy load, progressive reveal |

---

## 🛠️ Tech Stack

### Core
| Technology | Purpose |
|-----------|---------|
| **Vue 3** | Composition API |
| **Vite** | Fast dev/build |
| **TypeScript** | Type safety |
| **Pinia** | State management |
| **Vue Router** | Routing |

### Styling
| Technology | Purpose |
|-----------|---------|
| **Tailwind CSS** | Rapid UI development |
| **CSS Variables** | Motion tokens |

### Animation Stack
| Purpose | Tool |
|---------|------|
| Micro-interactions | CSS + Tailwind |
| Complex timelines | GSAP |
| Scroll-based | GSAP ScrollTrigger |
| Clip-path | CSS + GSAP |
| Perspective | CSS 3D transforms |

### Data Source
- **Unsplash API** (primary)
- **Pexels API** (fallback)

---

## 📁 Project Architecture

```
src/
│── animations/                    # Animation utilities & composables
│   ├── perspective.ts             # 3D perspective transforms
│   ├── clipPath.ts               # Clip-path transition utilities
│   └── scroll.ts                 # Scroll-driven animation helpers
│
│── components/
│   ├── gallery/                  # Gallery-specific components
│   │   ├── GalleryGrid.vue       # Main grid container
│   │   ├── GalleryCard.vue       # Individual gallery item
│   │   ├── GallerySkeleton.vue   # Loading skeleton
│   │   └── GalleryModal.vue      # Lightbox/modal view
│   │
│   ├── motion/                   # Reusable motion components
│   │   ├── PerspectiveWrapper.vue # 3D depth container
│   │   ├── ClipReveal.vue        # Clip-path reveal wrapper
│   │   ├── ScrollSection.vue     # Scroll-triggered section
│   │   └── ParallaxLayer.vue     # Parallax effect layer
│   │
│   ├── ui/                       # Base UI components
│   │   ├── BaseButton.vue        # Button with motion feedback
│   │   ├── BaseLoader.vue        # Loading spinner
│   │   └── BaseText.vue          # Typography with reveal
│   │
│   └── layout/                   # Layout components
│       ├── TheHeader.vue         # Site header
│       ├── TheFooter.vue         # Site footer
│       └── ScrollProgress.vue    # Scroll progress indicator
│
│── composables/                  # Vue composables
│   ├── useLazyLoad.ts           # Image lazy loading
│   ├── useCursorMotion.ts       # Cursor-based interactions
│   ├── useScrollProgress.ts     # Scroll position tracking
│   ├── useReducedMotion.ts      # Accessibility check
│   └── useImageService.ts       # API data fetching
│
│── pages/                        # Route pages
│   ├── HomePage.vue              # Landing / gallery experience
│   └── AboutPage.vue             # Project philosophy (optional)
│
│── store/                        # Pinia stores
│   └── gallery.store.ts          # Gallery state management
│
│── services/                     # API services
│   └── image.service.ts          # Unsplash/Pexels API
│
│── router/                       # Vue Router config
│   └── index.ts                  # Route definitions
│
│── styles/                       # Global styles
│   ├── motion-tokens.css         # Animation variables
│   └── base.css                  # Base/reset styles
│
│── types/                        # TypeScript types
│   ├── gallery.types.ts          # Gallery interfaces
│   └── motion.types.ts           # Animation interfaces
│
│── App.vue                       # Root component
└── main.ts                       # App entry point
```

---

## 🎬 Motion Design System

### Motion Tokens

```typescript
export const motionTokens = {
  duration: {
    instant: 0.1,     // Immediate feedback
    fast: 0.2,        // Micro-interactions
    base: 0.4,        // Standard transitions
    slow: 0.8,        // Emphasis animations
    dramatic: 1.2     // Entry/exit animations
  },
  easing: {
    smooth: 'power3.out',
    elastic: 'elastic.out(1, 0.4)',
    bounce: 'bounce.out',
    sharp: 'power4.inOut'
  },
  depth: {
    subtle: 10,       // Hover lift
    hover: 20,        // Card hover
    focus: 40,        // Active state
    modal: 60         // Modal depth
  },
  rotation: {
    subtle: 2,        // Micro rotation
    tilt: 8,          // Perspective tilt
    flip: 180         // Card flip
  }
};
```

### Motion Rules
1. **One dominant motion per interaction**
2. **Always reversible** (scroll up = rewind)
3. **Respect `prefers-reduced-motion`**
4. **GPU-only transforms** (`transform`, `opacity`)
5. **No layout-thrashing animations**

---

## 📜 Scroll Experience Storyboard

### Section 0 — Entry Transition (Page Load)
| Property | Value |
|----------|-------|
| **Trigger** | Initial page load |
| **Visual** | Full-viewport clip-path reveal |
| **Motion** | Clip-path expands, slight opacity fade-in |
| **UX Purpose** | Sets tone: "this experience is curated" |

### Section 1 — Intent Setting (Intro)
| Property | Value |
|----------|-------|
| **Scroll Range** | 0vh → 100vh |
| **Visual** | Minimal text, large negative space |
| **Motion** | Text fades in & slightly scales, background parallax |
| **UX Principle** | Simplicity, low cognitive load |

### Section 2 — Scroll Lock + Narrative Reveal
| Property | Value |
|----------|-------|
| **Scroll Range** | 100vh → 200vh |
| **Behavior** | Section pins, scroll drives animation |
| **Visual** | Statement: "Motion is feedback, not decoration." |
| **Motion** | Text splits into layers, foreground moves faster |
| **UX Principle** | Visual hierarchy |

### Section 3 — Perspective Gallery Introduction
| Property | Value |
|----------|-------|
| **Scroll Range** | 200vh → 300vh |
| **Layout** | Gallery grid starts compressed/stacked |
| **Motion** | Cards spread into grid as user scrolls |
| **Scroll Mapping** | `progress → scale + translateZ + rotateX` |
| **UX Principle** | Progressive disclosure |

### Section 4 — Interactive Gallery (Free Scroll)
| Property | Value |
|----------|-------|
| **Scroll Range** | 300vh → auto |
| **Behavior** | Normal scrolling, hover interactions enabled |
| **Motion** | Perspective tilt on hover, elevation feedback |
| **UX Principle** | User control |

### Section 5 — Lazy Load Feedback Zone
| Property | Value |
|----------|-------|
| **Trigger** | Gallery nearing viewport bottom |
| **Visual** | Skeleton cards → blur → sharp images |
| **Motion** | Skeleton shimmer, content fades with Y-translation |
| **UX Principle** | Perceived performance |

### Section 6 — Focus Mode (Modal)
| Property | Value |
|----------|-------|
| **Trigger** | User clicks gallery item |
| **Behavior** | Scroll freezes, background scales down |
| **Motion** | Selected item zooms forward, clip-path reveal |
| **UX Principle** | Focus, reduced distraction |

### Section 7 — Scroll Resume
| Property | Value |
|----------|-------|
| **Trigger** | Modal close |
| **Motion** | Reverse animation, scroll position restored |
| **UX Principle** | Continuity |

### Section 8 — Reflection / Closing
| Property | Value |
|----------|-------|
| **Scroll Range** | Last 100vh |
| **Visual** | Typography-focused, minimal imagery |
| **Motion** | Text reveals line-by-line, scroll-driven opacity |
| **UX Principle** | Calm closure |

---

## 🔧 Dependencies to Install

```bash
# Core dependencies
npm install vue-router@4 pinia

# Animation
npm install gsap

# Styling
npm install -D tailwindcss postcss autoprefixer

# TypeScript (optional but recommended)
npm install -D typescript vue-tsc @types/node

# Utilities
npm install axios  # For API calls
```

---

## 📅 Phase-wise Implementation Plan

### Phase 1: Foundation (Day 1-2)
- [ ] Project restructure & cleanup
- [ ] Install dependencies (Tailwind, GSAP, Pinia, Vue Router, TypeScript)
- [ ] Setup Tailwind CSS configuration
- [ ] Create motion tokens system (`motion-tokens.css`)
- [ ] Setup Pinia store structure
- [ ] Setup Vue Router with basic routes
- [ ] Create base layout components (Header, Footer)

### Phase 2: Entry Experience (Day 3-4)
- [ ] Create `ClipReveal.vue` component
- [ ] Implement page load animation (Section 0)
- [ ] Create intro section with fade/scale text (Section 1)
- [ ] Add scroll progress indicator
- [ ] Implement `useReducedMotion` composable

### Phase 3: Scroll Narrative (Day 5-6)
- [ ] Setup GSAP ScrollTrigger
- [ ] Create `ScrollSection.vue` pinned section component
- [ ] Implement narrative reveal section (Section 2)
- [ ] Create parallax layer component
- [ ] Add layered text animation

### Phase 4: Perspective Gallery (Day 7-8)
- [ ] Create `PerspectiveWrapper.vue` component
- [ ] Implement `useCursorMotion` composable
- [ ] Build `GalleryGrid.vue` with perspective reveal
- [ ] Build `GalleryCard.vue` with hover depth
- [ ] Implement scroll-driven grid spread (Section 3)

### Phase 5: Interactive Gallery (Day 9-10)
- [ ] Setup Unsplash/Pexels API service
- [ ] Create `useImageService` composable
- [ ] Implement `useLazyLoad` composable
- [ ] Build `GallerySkeleton.vue` with shimmer effect
- [ ] Add blur-to-sharp image reveal
- [ ] Connect gallery to API data

### Phase 6: Modal Experience (Day 11-12)
- [ ] Build `GalleryModal.vue` with depth zoom
- [ ] Implement clip-path modal transition
- [ ] Add keyboard support (ESC to close)
- [ ] Implement scroll lock during modal
- [ ] Add backdrop blur effect

### Phase 7: Closing & Polish (Day 13-14)
- [ ] Create reflection/outro section (Section 8)
- [ ] Add typography reveal animations
- [ ] Performance optimization (will-change, RAF)
- [ ] Accessibility audit (reduced motion, focus states)
- [ ] Cross-browser testing
- [ ] Mobile responsiveness fine-tuning

### Phase 8: Documentation & Deploy (Day 15)
- [ ] Code comments & documentation
- [ ] README updates
- [ ] Build optimization
- [ ] Deploy to Vercel/Netlify

---

## 🎨 Animation Reference Inspirations

| Animation Type | Reference |
|---------------|-----------|
| Perspective | [CodePen - Perspective](https://codepen.io/Bembit/pen/azvNgqM) |
| Clip Path | [CodePen - Clip Path](https://codepen.io/onslaughtilus/full/vELNyJJ) |
| ScrollMagic | [CodePen - Scroll Magic](https://codepen.io/denishmistry7/full/RNrraZp) |
| Lazy Load | [CodePen - Lazy Load](https://codepen.io/stealy/full/pvzYpoB) |

---

## 🧪 Testing Checklist

### Manual Testing
- [ ] Mobile responsiveness (iOS Safari, Android Chrome)
- [ ] Slow network simulation (3G)
- [ ] Broken image handling
- [ ] Reduced motion preference
- [ ] Keyboard navigation
- [ ] Screen reader compatibility

### Performance Targets
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] 60fps scroll animations

---

## 🚀 Deployment Options

| Platform | Command |
|----------|---------|
| **Vercel** | `vercel deploy` |
| **Netlify** | `netlify deploy` |
| **GitHub Pages** | `npm run build && gh-pages -d dist` |

---

## 📝 Notes

- This project prioritizes **motion quality over feature quantity**
- Each animation should have a **clear UX purpose**
- Code should be **portfolio-presentable** with clean architecture
- **Document design decisions** for interview discussions

---

## 🎯 Success Criteria

> "This developer understands UX psychology, motion as feedback, and performance-aware animation, not just frameworks."

The project demonstrates:
1. ✅ Advanced CSS/GSAP animation skills
2. ✅ Scroll-based narrative design
3. ✅ Performance-conscious implementation
4. ✅ Accessibility awareness
5. ✅ Clean, scalable architecture
6. ✅ Design system thinking
