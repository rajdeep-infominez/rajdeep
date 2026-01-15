<script setup lang="ts">
/* ==================================================
   ImageModal Component (Enhanced)
   ================================================== 
   Full-screen lightbox with GSAP FLIP-style animation.
   The image animates from its grid position to full screen.
*/

import { onMounted, onUnmounted, computed, ref, nextTick, watch } from 'vue';
import { useGalleryStore } from '@/store/gallery.store';
import { gsap } from 'gsap';
import { useReducedMotion } from '@/composables/useReducedMotion';

const store = useGalleryStore();
const { prefersReducedMotion } = useReducedMotion();

const currentImage = computed(() => store.currentImage);
const imageRef = ref<HTMLImageElement | null>(null);
const containerRef = ref<HTMLElement | null>(null);

const close = () => {
  // Animate closing if needed, for now just close
  // Enhancing close animation would require tracking the grid element again
  store.closeModal();
};

const handleKeydown = (e: KeyboardEvent) => {
  if (!store.modal.isOpen) return;

  switch (e.key) {
    case 'Escape':
      close();
      break;
    case 'ArrowRight':
      store.nextImage();
      break;
    case 'ArrowLeft':
      store.prevImage();
      break;
  }
};

// Enter Animation (FLIP)
const animateEnter = () => {
  if (prefersReducedMotion.value || !store.modal.initialRect || !imageRef.value) return;

  const initial = store.modal.initialRect;
  const final = imageRef.value.getBoundingClientRect();
  
  if (!final.width || !final.height) return;

  // Calculate generic deltas
  // We want to animate FROM the grid position provided by initialRect
  // TO the centered position (final)
  
  const scaleX = initial.width / final.width;
  const scaleY = initial.height / final.height;
  
  // Center points to avoid transform-origin complexity
  const initialCenterX = initial.left + initial.width / 2;
  const initialCenterY = initial.top + initial.height / 2;
  const finalCenterX = final.left + final.width / 2;
  const finalCenterY = final.top + final.height / 2;

  const deltaX = initialCenterX - finalCenterX;
  const deltaY = initialCenterY - finalCenterY;

  gsap.fromTo(imageRef.value, 
    {
      x: deltaX,
      y: deltaY,
      scaleX: scaleX,
      scaleY: scaleY,
      opacity: 0, // start slightly transparent
    },
    {
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
      duration: 0.6,
      ease: 'power3.out',
      clearProps: 'all'
    }
  );
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
  
  // Trigger animation when rendered
  if (store.modal.isOpen) {
    nextTick(() => {
      // Small delay to ensure layout is stable
      setTimeout(animateEnter, 10);
    });
  }
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <Transition name="modal-fade">
    <div 
      v-if="store.modal.isOpen && currentImage"
      ref="containerRef"
      class="fixed inset-0 z-50 flex items-center justify-center bg-dark-900/95 backdrop-blur-md"
      @click.self="close"
    >
      <!-- Close Button -->
      <button 
        class="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 z-50"
        @click="close"
        aria-label="Close modal"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Navigation buttons... (same as before) -->
      <button 
        class="absolute left-6 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors p-4 hidden md:block z-50"
        @click.stop="store.prevImage"
        aria-label="Previous image"
      >
        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button 
        class="absolute right-6 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors p-4 hidden md:block z-50"
        @click.stop="store.nextImage"
        aria-label="Next image"
      >
        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- Image Container -->
      <div class="relative max-w-[90vw] max-h-[90vh] aspect-[4/5] md:aspect-auto flex items-center justify-center p-4">
        <img 
          ref="imageRef"
          :src="currentImage.url" 
          :alt="currentImage.alt"
          class="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-sm will-change-transform"
        />
        
        <!-- Info Bar (Fade in separately) -->
        <div class="absolute -bottom-12 left-0 w-full text-center animate-fade-in-up">
          <h3 class="text-white text-lg font-medium">{{ currentImage.alt }}</h3>
          <p class="text-white/50 text-sm">by {{ currentImage.author.name }}</p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.4s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out 0.3s backwards;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
