<script setup lang="ts">
/* ==================================================
   ImageModal Component
   ================================================== 
   Full-screen lightbox for viewing gallery images.
   Handles closing, navigation, and focus management.
*/

import { onMounted, onUnmounted, computed } from 'vue';
import { useGalleryStore } from '@/store/gallery.store';

const store = useGalleryStore();

const currentImage = computed(() => store.currentImage);

const close = () => {
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

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <Transition name="modal-fade">
    <div 
      v-if="store.modal.isOpen && currentImage"
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

      <!-- Navigation Buttons -->
      <button 
        class="absolute left-6 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors p-4 hidden md:block"
        @click.stop="store.prevImage"
        aria-label="Previous image"
      >
        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button 
        class="absolute right-6 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors p-4 hidden md:block"
        @click.stop="store.nextImage"
        aria-label="Next image"
      >
        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- Image Container -->
      <div class="relative max-w-[90vw] max-h-[90vh] aspect-[4/5] md:aspect-auto">
        <img 
          :src="currentImage.url" 
          :alt="currentImage.alt"
          class="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-sm"
        />
        
        <!-- Info Bar -->
        <div class="absolute -bottom-12 left-0 w-full text-center">
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
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
