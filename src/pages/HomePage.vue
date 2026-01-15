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

// Components (will be created in later phases)
// import ClipReveal from '@/components/motion/ClipReveal.vue';
// import ScrollSection from '@/components/motion/ScrollSection.vue';
// import GalleryGrid from '@/components/gallery/GalleryGrid.vue';

const store = useGalleryStore();
const isLoaded = ref(false);
const scrollProgress = ref(0);

onMounted(() => {
  // Trigger entry animation after mount
  setTimeout(() => {
    isLoaded.value = true;
  }, 100);

  // Track scroll progress
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.value = Math.min(window.scrollY / scrollHeight, 1);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
});
</script>

<template>
  <main class="relative">
    <!-- Scroll Progress Indicator -->
    <div 
      class="scroll-progress"
      :style="{ transform: `scaleX(${scrollProgress})` }"
    />

    <!-- =============================================
         Section 0: Entry Transition
         ============================================= -->
    <section 
      class="section-container min-h-screen bg-dark-900"
      :class="{ 'animate-fade-in': isLoaded }"
    >
      <div class="content-wrapper text-center">
        <!-- Hero Title -->
        <h1 class="text-balance mb-6 opacity-0" :class="{ 'animate-fade-in-up': isLoaded }">
          <span class="block text-white/60 text-xl md:text-2xl font-normal mb-4 tracking-wide">
            UI/UX Motion Experience
          </span>
          <span class="gradient-text">
            Motion Gallery
          </span>
        </h1>

        <!-- Subtitle -->
        <p 
          class="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-12 opacity-0 delay-200"
          :class="{ 'animate-fade-in-up': isLoaded }"
        >
          Demonstrating how motion, feedback, and interaction 
          <span class="text-white">improve usability and perception.</span>
        </p>

        <!-- Scroll Indicator -->
        <div 
          class="flex flex-col items-center gap-3 opacity-0 delay-500"
          :class="{ 'animate-fade-in': isLoaded }"
        >
          <span class="text-sm text-white/40 tracking-widest uppercase">Scroll to explore</span>
          <div class="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <div class="w-1.5 h-3 bg-white/40 rounded-full animate-float" />
          </div>
        </div>
      </div>
    </section>

    <!-- =============================================
         Section 1: Intent Setting
         ============================================= -->
    <section class="section-container bg-dark-800">
      <div class="content-wrapper text-center">
        <h2 class="text-3xl md:text-5xl font-light text-white/90 mb-8 text-balance">
          <span class="text-white/40">Images are content fillers,</span><br>
          <span class="gradient-text font-semibold">Motion is the hero.</span>
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
          <!-- UX Principle Cards -->
          <div class="glass-card p-6 text-left hover-depth">
            <div class="text-3xl mb-4">🎯</div>
            <h3 class="text-lg font-semibold mb-2">User-Centricity</h3>
            <p class="text-white/50 text-sm">Clear focus states and predictable motion reduce cognitive load.</p>
          </div>
          
          <div class="glass-card p-6 text-left hover-depth">
            <div class="text-3xl mb-4">⚡</div>
            <h3 class="text-lg font-semibold mb-2">Feedback</h3>
            <p class="text-white/50 text-sm">Hover, scroll response, and loading states communicate system status.</p>
          </div>
          
          <div class="glass-card p-6 text-left hover-depth">
            <div class="text-3xl mb-4">🎭</div>
            <h3 class="text-lg font-semibold mb-2">Visual Hierarchy</h3>
            <p class="text-white/50 text-sm">Scale, depth, and opacity guide attention naturally.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- =============================================
         Section 2: Narrative Reveal (Placeholder)
         ============================================= -->
    <section class="section-container bg-dark-900">
      <div class="content-wrapper text-center">
        <blockquote class="text-4xl md:text-6xl font-light text-white/30 leading-relaxed">
          "Motion is 
          <span class="text-white font-semibold">feedback</span>, 
          not 
          <span class="text-white/50">decoration</span>."
        </blockquote>
      </div>
    </section>

    <!-- =============================================
         Section 3: Gallery Preview (Placeholder)
         ============================================= -->
    <section class="section-container bg-dark-800 py-32">
      <div class="content-wrapper">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl text-white mb-4">Interactive Gallery</h2>
          <p class="text-white/50">Perspective motion • Lazy loading • Depth effects</p>
        </div>

        <!-- Placeholder Gallery Grid -->
        <div class="gallery-grid">
          <!-- Skeleton Cards (will be replaced with actual gallery) -->
          <div 
            v-for="i in 6" 
            :key="i" 
            class="aspect-[4/3] skeleton rounded-2xl"
            :style="{ animationDelay: `${i * 0.1}s` }"
          />
        </div>
      </div>
    </section>

    <!-- =============================================
         Section 4: Reflection / Outro
         ============================================= -->
    <section class="section-container bg-dark-900">
      <div class="content-wrapper text-center max-w-3xl mx-auto">
        <h2 class="text-2xl md:text-3xl text-white/60 font-light mb-8">
          What this project demonstrates
        </h2>
        
        <div class="space-y-4 text-lg text-white/40">
          <p class="hover:text-white/70 transition-colors cursor-default">
            ✓ Advanced CSS/GSAP animation skills
          </p>
          <p class="hover:text-white/70 transition-colors cursor-default">
            ✓ Scroll-based narrative design
          </p>
          <p class="hover:text-white/70 transition-colors cursor-default">
            ✓ Performance-conscious implementation
          </p>
          <p class="hover:text-white/70 transition-colors cursor-default">
            ✓ Accessibility awareness
          </p>
          <p class="hover:text-white/70 transition-colors cursor-default">
            ✓ Clean, scalable architecture
          </p>
        </div>

        <div class="mt-16 pt-8 border-t border-white/10">
          <p class="text-white/30 text-sm">
            Built with Vue 3 • Tailwind CSS • GSAP • TypeScript
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* Scoped animation classes */
.animate-fade-in {
  animation: fadeIn var(--motion-duration-slow) var(--motion-ease-smooth) forwards;
}

.animate-fade-in-up {
  animation: fadeInUp var(--motion-duration-slow) var(--motion-ease-smooth) forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from { 
    opacity: 0; 
    transform: translateY(30px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}
</style>
