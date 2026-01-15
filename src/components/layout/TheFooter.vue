<script setup lang="ts">
/* ==================================================
   The Footer Component
   ================================================== */
</script>

<template>
  <footer class="bg-dark-800 border-t border-white/5 py-12 px-6">
    <div class="content-wrapper">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <!-- Logo & Copyright -->
        <div class="text-center md:text-left">
          <p class="text-xl font-display font-semibold mb-2">
            <span class="gradient-text">Motion</span>Gallery
          </p>
          <p class="text-white/40 text-sm">
            © {{ new Date().getFullYear() }} UI/UX Motion Experience
          </p>
        </div>

        <!-- Animation Inspirations -->
        <div class="text-center md:text-right">
          <p class="text-white/40 text-sm mb-2">Animation Inspirations</p>
          <div class="flex flex-wrap justify-center md:justify-end gap-4 text-xs">
            <a 
              href="https://codepen.io/Bembit/pen/azvNgqM" 
              target="_blank" 
              rel="noopener"
              class="text-white/50 hover:text-accent-primary transition-colors"
            >
              Perspective
            </a>
            <a 
              href="https://codepen.io/onslaughtilus/full/vELNyJJ" 
              target="_blank" 
              rel="noopener"
              class="text-white/50 hover:text-accent-primary transition-colors"
            >
              Clip Path
            </a>
            <a 
              href="https://codepen.io/denishmistry7/full/RNrraZp" 
              target="_blank" 
              rel="noopener"
              class="text-white/50 hover:text-accent-primary transition-colors"
            >
              Scroll Magic
            </a>
            <a 
              href="https://codepen.io/stealy/full/pvzYpoB" 
              target="_blank" 
              rel="noopener"
              class="text-white/50 hover:text-accent-primary transition-colors"
            >
              Lazy Load
            </a>
          </div>
        </div>
      </div>

      <!-- Tech Stack -->
      <div class="mt-8 pt-8 border-t border-white/5 text-center">
        <p class="text-white/30 text-xs">
          Built with Vue 3 • Tailwind CSS • GSAP • TypeScript • Pinia
        </p>
      </div>
    </div>
  </footer>
</template>
