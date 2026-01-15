<script setup lang="ts">
/* ==================================================
   Home Page - Gallery Experience
   ================================================== 
   The main gallery experience page with sections:
   - Entry animation (clip-path reveal)
   - Intro section (intent setting)
   - Narrative scroll section
   - Perspective gallery grid
   - Reflection/outro section
*/

import { ref, onMounted } from 'vue';
import { useGalleryStore } from '@/store/gallery.store';
import { useReducedMotion } from '@/composables/useReducedMotion';

// Motion Components
import ClipReveal from '@/components/motion/ClipReveal.vue';
import FadeInUp from '@/components/motion/FadeInUp.vue';
import ScrollSection from '@/components/motion/ScrollSection.vue';
import GalleryGrid from '@/components/gallery/GalleryGrid.vue';

// Composables
import { useScrollTrigger } from '@/composables/useScrollTrigger';

const store = useGalleryStore();
const { prefersReducedMotion } = useReducedMotion();
const { gsap, createScrollFromTo, createTimeline, isReady: scrollReady } = useScrollTrigger();

const isPageReady = ref(false);
const heroRevealed = ref(false);
const showContent = ref(false);
const narrativeProgress = ref(0);

// Refs for scroll-animated elements
const quoteSection = ref<HTMLElement | null>(null);
const feedbackWord = ref<HTMLElement | null>(null);
const decorationWord = ref<HTMLElement | null>(null);

// Staggered animation delays
const staggerDelays = {
  subtitle: 0.3,
  scrollIndicator: 0.6,
};

const onHeroRevealComplete = () => {
  heroRevealed.value = true;
  // Start showing content after hero reveal
  setTimeout(() => {
    showContent.value = true;
  }, 100);
};

// Handle narrative section progress for word emphasis
const onNarrativeProgress = (progress: number) => {
  narrativeProgress.value = progress;
};

onMounted(() => {
  // Small delay to ensure DOM is ready
  setTimeout(() => {
    isPageReady.value = true;
  }, 50);
});
</script>

<template>
  <main class="relative overflow-hidden">
    <!-- =============================================
         Section 0: Entry Transition (Hero)
         ============================================= -->
    <ClipReveal
      shape="circle"
      :duration="1.4"
      :delay="0.2"
      origin="50% 50%"
      ease="power4.out"
      :auto-play="isPageReady"
      @complete="onHeroRevealComplete"
    >
      <section class="section-container min-h-screen bg-dark-900 relative">
        <!-- Decorative gradient orbs -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            class="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-primary/10 rounded-full blur-[120px]"
            :class="{ 'animate-pulse-slow': heroRevealed }"
          />
          <div 
            class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-secondary/10 rounded-full blur-[100px]"
            :class="{ 'animate-pulse-slow': heroRevealed }"
            style="animation-delay: 1s;"
          />
        </div>

        <div class="content-wrapper text-center relative z-10">
          <!-- Hero Title -->
          <FadeInUp 
            :duration="0.9" 
            :delay="0.1" 
            :distance="40"
            :auto-play="heroRevealed"
          >
            <h1 class="text-balance mb-6">
              <span class="block text-white/50 text-lg md:text-xl font-light mb-6 tracking-[0.2em] uppercase">
                UI/UX Motion Experience
              </span>
              <span class="gradient-text text-5xl md:text-7xl lg:text-8xl font-bold">
                Motion Gallery
              </span>
            </h1>
          </FadeInUp>

          <!-- Subtitle -->
          <FadeInUp 
            :duration="0.9" 
            :delay="staggerDelays.subtitle" 
            :distance="30"
            :auto-play="heroRevealed"
          >
            <p class="text-lg md:text-xl lg:text-2xl text-white/50 max-w-2xl mx-auto mb-16 leading-relaxed">
              Demonstrating how motion, feedback, and interaction 
              <span class="text-white font-medium">improve usability and perception.</span>
            </p>
          </FadeInUp>

          <!-- Scroll Indicator -->
          <FadeInUp 
            :duration="0.8" 
            :delay="staggerDelays.scrollIndicator" 
            :distance="20"
            :auto-play="heroRevealed"
          >
            <div class="flex flex-col items-center gap-4">
              <span class="text-xs text-white/30 tracking-[0.3em] uppercase font-medium">
                Scroll to explore
              </span>
              <div class="scroll-mouse">
                <div class="scroll-mouse-wheel" />
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>
    </ClipReveal>

    <!-- =============================================
         Section 1: Intent Setting
         ============================================= -->
    <section class="section-container bg-dark-800 py-32">
      <div class="content-wrapper text-center">
        <h2 class="text-3xl md:text-5xl lg:text-6xl font-light text-white/90 mb-8 text-balance leading-tight">
          <span class="text-white/30">Images are content fillers,</span><br>
          <span class="gradient-text font-semibold">Motion is the hero.</span>
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-20 max-w-5xl mx-auto">
          <!-- UX Principle Cards -->
          <div class="principle-card glass-card p-8 text-left">
            <div class="principle-icon">🎯</div>
            <h3 class="text-xl font-semibold mb-3 text-white">User-Centricity</h3>
            <p class="text-white/50 text-sm leading-relaxed">
              Clear focus states and predictable motion reduce cognitive load.
            </p>
          </div>
          
          <div class="principle-card glass-card p-8 text-left">
            <div class="principle-icon">⚡</div>
            <h3 class="text-xl font-semibold mb-3 text-white">Feedback</h3>
            <p class="text-white/50 text-sm leading-relaxed">
              Hover, scroll response, and loading states communicate system status.
            </p>
          </div>
          
          <div class="principle-card glass-card p-8 text-left">
            <div class="principle-icon">🎭</div>
            <h3 class="text-xl font-semibold mb-3 text-white">Visual Hierarchy</h3>
            <p class="text-white/50 text-sm leading-relaxed">
              Scale, depth, and opacity guide attention naturally.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- =============================================
         Section 2: Narrative Quote (Scroll Animated)
         ============================================= -->
    <ScrollSection
      pin
      :scrub="1"
      start="top top"
      end="+=150%"
      :height-multiplier="1.5"
      @progress="onNarrativeProgress"
    >
      <template #default="{ progress }">
        <section 
          ref="quoteSection"
          class="section-container bg-dark-900 min-h-screen"
        >
          <!-- Animated background layers -->
          <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div 
              class="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-accent-primary/5 to-transparent"
              :style="{ opacity: progress * 0.5 }"
            />
            <div 
              class="absolute inset-0 flex items-center justify-center"
            >
              <div 
                class="w-[600px] h-[600px] bg-accent-primary/10 rounded-full blur-[150px] transition-transform duration-300"
                :style="{ 
                  transform: `scale(${0.5 + progress * 1.5})`,
                  opacity: 0.3 + progress * 0.4
                }"
              />
            </div>
          </div>

          <div class="content-wrapper text-center max-w-5xl mx-auto relative z-10">
            <!-- Main Quote -->
            <blockquote class="text-4xl md:text-6xl lg:text-8xl font-light leading-tight">
              <!-- "Motion is" - starts dim, stays dim -->
              <span 
                class="quote-word transition-all duration-500"
                :style="{ 
                  opacity: 0.15 + progress * 0.15,
                  transform: `translateY(${(1 - progress) * 20}px)`
                }"
              >
                "Motion is
              </span>
              
              <!-- "feedback" - emphasized at 0-50% progress -->
              <span 
                ref="feedbackWord"
                class="quote-word-emphasis inline-block transition-all duration-500"
                :style="{ 
                  opacity: progress < 0.5 ? 0.3 + progress * 1.4 : 1,
                  transform: `translateY(${(1 - Math.min(progress * 2, 1)) * 30}px) scale(${1 + (progress < 0.5 ? progress * 0.1 : 0.05)})`,
                  color: progress > 0.3 ? 'white' : 'rgba(255,255,255,0.5)'
                }"
              >
                feedback
              </span>
              
              <!-- ", not" - fades in at middle -->
              <span 
                class="quote-word transition-all duration-500"
                :style="{ 
                  opacity: 0.1 + progress * 0.2,
                  transform: `translateY(${(1 - progress) * 15}px)`
                }"
              >
                , not
              </span>
              
              <!-- "decoration" - emphasized at 50-100% progress -->
              <span 
                ref="decorationWord"
                class="quote-word-strikethrough inline-block transition-all duration-500"
                :class="{ 'strikethrough-active': progress > 0.6 }"
                :style="{ 
                  opacity: progress > 0.5 ? 0.4 + (progress - 0.5) * 0.8 : 0.3,
                  transform: `translateY(${(1 - progress) * 25}px)`,
                  color: progress > 0.7 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.3)'
                }"
              >
                decoration
              </span>
              
              <!-- "." - fades in last -->
              <span 
                class="quote-word transition-all duration-500"
                :style="{ 
                  opacity: progress > 0.8 ? (progress - 0.8) * 5 * 0.3 : 0.1,
                  transform: `translateY(${(1 - progress) * 10}px)`
                }"
              >
                ."
              </span>
            </blockquote>

            <!-- Progress-based subtitle -->
            <p 
              class="mt-12 text-lg md:text-xl text-white/30 transition-all duration-500"
              :style="{ 
                opacity: progress > 0.7 ? (progress - 0.7) * 3 : 0,
                transform: `translateY(${progress > 0.7 ? 0 : 20}px)`
              }"
            >
              Motion should communicate intent, not distract from it.
            </p>

            <!-- Scroll hint at bottom -->
            <div 
              class="absolute bottom-10 left-1/2 -translate-x-1/2 transition-opacity duration-500"
              :style="{ opacity: progress < 0.9 ? 1 - progress : 0 }"
            >
              <div class="flex flex-col items-center gap-2 text-white/20">
                <span class="text-xs tracking-widest uppercase">Keep scrolling</span>
                <svg class="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </div>
        </section>
      </template>
    </ScrollSection>

    <!-- =============================================
         Section 3: Interactive Gallery
         ============================================= -->
    <section class="section-container bg-dark-800 py-32">
      <div class="content-wrapper">
        <div class="text-center mb-20">
          <h2 class="text-3xl md:text-5xl text-white mb-4 font-semibold">Interactive Gallery</h2>
          <p class="text-white/40 text-lg">Perspective motion • Lazy loading • Depth effects</p>
        </div>

        <!-- Real Gallery Grid -->
        <GalleryGrid />
      </div>
    </section>

    <!-- =============================================
         Section 4: Reflection / Outro
         ============================================= -->
    <section class="section-container bg-dark-900 py-32">
      <div class="content-wrapper text-center max-w-3xl mx-auto">
        <h2 class="text-2xl md:text-4xl text-white/50 font-light mb-12">
          What this project demonstrates
        </h2>
        
        <div class="space-y-6 text-lg md:text-xl">
          <p class="demo-item">
            <span class="demo-check">✓</span>
            <span>Advanced CSS/GSAP animation skills</span>
          </p>
          <p class="demo-item">
            <span class="demo-check">✓</span>
            <span>Scroll-based narrative design</span>
          </p>
          <p class="demo-item">
            <span class="demo-check">✓</span>
            <span>Performance-conscious implementation</span>
          </p>
          <p class="demo-item">
            <span class="demo-check">✓</span>
            <span>Accessibility awareness</span>
          </p>
          <p class="demo-item">
            <span class="demo-check">✓</span>
            <span>Clean, scalable architecture</span>
          </p>
        </div>

        <div class="mt-20 pt-10 border-t border-white/5">
          <p class="text-white/20 text-sm tracking-wide">
            Built with Vue 3 • Tailwind CSS • GSAP • TypeScript
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* Scroll Mouse Indicator */
.scroll-mouse {
  width: 24px;
  height: 40px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 8px;
}

.scroll-mouse-wheel {
  width: 4px;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 2px;
  animation: scrollWheel 1.5s ease-in-out infinite;
}

@keyframes scrollWheel {
  0%, 100% {
    opacity: 1;
    transform: translateY(0);
  }
  50% {
    opacity: 0.3;
    transform: translateY(8px);
  }
}

/* Pulse animation for orbs */
.animate-pulse-slow {
  animation: pulseSlow 4s ease-in-out infinite;
}

@keyframes pulseSlow {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}

/* Principle Cards */
.principle-card {
  transition: all 0.4s cubic-bezier(0.33, 1, 0.68, 1);
  transform-style: preserve-3d;
}

.principle-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px -15px rgba(99, 102, 241, 0.2);
}

.principle-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  display: inline-block;
  transition: transform 0.3s ease;
}

.principle-card:hover .principle-icon {
  transform: scale(1.1);
}

/* Gallery Skeleton */
.gallery-skeleton {
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.03) 0%, 
    rgba(255, 255, 255, 0.06) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.05);
  overflow: hidden;
  position: relative;
}

.gallery-skeleton-inner {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.05) 50%,
    transparent 100%
  );
  animation: shimmer 2s ease-in-out infinite;
  transform: translateX(-100%);
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

/* Demo Items */
.demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.35);
  transition: color 0.3s ease;
  cursor: default;
}

.demo-item:hover {
  color: rgba(255, 255, 255, 0.8);
}

.demo-check {
  color: var(--color-accent-primary);
  font-weight: 600;
}

.demo-item:hover .demo-check {
  animation: checkPop 0.3s ease;
}

@keyframes checkPop {
  50% {
    transform: scale(1.3);
  }
}

/* Quote Word Styles */
.quote-word {
  display: inline-block;
  will-change: transform, opacity;
}

.quote-word-emphasis {
  font-weight: 600;
  will-change: transform, opacity, color;
  text-shadow: 0 0 40px rgba(99, 102, 241, 0.3);
}

.quote-word-strikethrough {
  position: relative;
  will-change: transform, opacity;
}

.quote-word-strikethrough::after {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--color-accent-primary), var(--color-accent-tertiary));
  transition: width 0.6s cubic-bezier(0.33, 1, 0.68, 1);
}

.quote-word-strikethrough.strikethrough-active::after {
  width: 100%;
}
</style>
