<script setup lang="ts">
/* ==================================================
   About Page
   ================================================== 
   Explains the design philosophy and motion principles
*/

import { ref, onMounted } from 'vue';

const isLoaded = ref(false);

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true;
  }, 100);
});
</script>

<template>
  <main class="section-container bg-dark-900">
    <div class="content-wrapper max-w-4xl">
      <!-- Header -->
      <div 
        class="text-center mb-16 opacity-0"
        :class="{ 'animate-fade-in-up': isLoaded }"
      >
        <h1 class="text-4xl md:text-6xl gradient-text mb-6">About This Project</h1>
        <p class="text-xl text-white/60">
          A UI/UX motion design laboratory built with Vue 3
        </p>
      </div>

      <!-- Content -->
      <div 
        class="space-y-12 opacity-0 delay-200"
        :class="{ 'animate-fade-in': isLoaded }"
      >
        <!-- Philosophy -->
        <section class="glass-card p-8">
          <h2 class="text-2xl font-semibold mb-4 text-white">Philosophy</h2>
          <p class="text-white/60 leading-relaxed">
            This project demonstrates how motion, feedback, and interaction improve 
            usability and perception. The images and videos are content fillers — 
            the real stars are the animations and UX patterns.
          </p>
        </section>

        <!-- UX Principles -->
        <section class="glass-card p-8">
          <h2 class="text-2xl font-semibold mb-6 text-white">UX Principles</h2>
          <ul class="space-y-4 text-white/60">
            <li class="flex items-start gap-4">
              <span class="text-accent-primary">→</span>
              <div>
                <strong class="text-white">User-centricity:</strong> 
                Clear focus states, predictable motion, reduced cognitive load
              </div>
            </li>
            <li class="flex items-start gap-4">
              <span class="text-accent-primary">→</span>
              <div>
                <strong class="text-white">Consistency:</strong> 
                Unified motion curves, spacing, animation timing
              </div>
            </li>
            <li class="flex items-start gap-4">
              <span class="text-accent-primary">→</span>
              <div>
                <strong class="text-white">Visual hierarchy:</strong> 
                Scale, depth (perspective), opacity, z-axis
              </div>
            </li>
            <li class="flex items-start gap-4">
              <span class="text-accent-primary">→</span>
              <div>
                <strong class="text-white">Feedback:</strong> 
                Hover, scroll response, loading states
              </div>
            </li>
          </ul>
        </section>

        <!-- Tech Stack -->
        <section class="glass-card p-8">
          <h2 class="text-2xl font-semibold mb-6 text-white">Tech Stack</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="text-center p-4 bg-dark-700 rounded-xl">
              <div class="text-2xl mb-2">⚡</div>
              <span class="text-white/80">Vue 3</span>
            </div>
            <div class="text-center p-4 bg-dark-700 rounded-xl">
              <div class="text-2xl mb-2">🎨</div>
              <span class="text-white/80">Tailwind</span>
            </div>
            <div class="text-center p-4 bg-dark-700 rounded-xl">
              <div class="text-2xl mb-2">🎬</div>
              <span class="text-white/80">GSAP</span>
            </div>
            <div class="text-center p-4 bg-dark-700 rounded-xl">
              <div class="text-2xl mb-2">📘</div>
              <span class="text-white/80">TypeScript</span>
            </div>
          </div>
        </section>

        <!-- Back Link -->
        <div class="text-center pt-8">
          <router-link 
            to="/" 
            class="btn-primary inline-flex items-center gap-2"
          >
            <span>←</span>
            <span>Back to Gallery</span>
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
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
