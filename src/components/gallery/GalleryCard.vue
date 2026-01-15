<script setup lang="ts">
/* ==================================================
   GalleryCard Component
   ================================================== 
   Individual gallery item with 3D tilt hover effect,
   image loading state, and overlay details.
*/

import { ref, onMounted } from 'vue';
import type { GalleryImage } from '@/types/gallery.types';
import { useTilt } from '@/composables/useTilt';

interface GalleryCardProps {
  image: GalleryImage;
  index?: number;
}

const props = defineProps<GalleryCardProps>();

const emit = defineEmits<{
  (e: 'click', id: string, rect: DOMRect): void;
}>();

const imageLoaded = ref(false);
const cardRef = ref<HTMLElement | null>(null);

const { 
  tiltTransform, 
  handleMouseMove, 
  handleMouseEnter, 
  handleMouseLeave,
  isHovered 
} = useTilt({ max: 6, scale: 1.02 });

const onImageLoad = () => {
  imageLoaded.value = true;
};

const handleClick = (e: MouseEvent) => {
  if (cardRef.value) {
    const rect = cardRef.value.getBoundingClientRect();
    emit('click', props.image.id, rect);
  }
};
</script>

<template>
  <div 
    ref="cardRef"
    class="gallery-card relative group cursor-pointer"
    :style="{ transform: tiltTransform }"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleClick"
  >
    <!-- Card Container -->
    <div class="card-inner overflow-hidden rounded-xl bg-dark-800 shadow-lg ring-1 ring-white/10 aspect-[4/5] relative">
      
      <!-- Skeleton Loader -->
      <div 
        v-if="!imageLoaded"
        class="absolute inset-0 z-10 animate-pulse bg-dark-700"
      >
        <div class="h-full w-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 animate-shimmer" />
      </div>

      <!-- Image -->
      <img 
        :src="image.url" 
        :alt="image.alt"
        class="w-full h-full object-cover transition-transform duration-700 ease-out"
        :class="{ 'scale-110': isHovered, 'opacity-0': !imageLoaded }"
        loading="lazy"
        @load="onImageLoad"
      />

      <!-- Overlay (Visible on Hover) -->
      <div 
        class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6"
      >
        <h3 class="text-white font-medium text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
          {{ image.alt }}
        </h3>
        <p class="text-white/60 text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
          by {{ image.author.name }}
        </p>
      </div>

      <!-- Border Glow -->
      <div 
        class="absolute inset-0 rounded-xl ring-1 ring-white/20 transition-opacity duration-300"
        :class="{ 'opacity-100': isHovered, 'opacity-0': !isHovered }"
      />
    </div>
  </div>
</template>

<style scoped>
.gallery-card {
  transition: transform 0.1s ease-out; /* Smooth tilt */
  will-change: transform;
}

.card-inner {
  transform-style: preserve-3d;
}

@keyframes shimmer {
  0% { transform: translateX(-150%) skewX(-12deg); }
  100% { transform: translateX(150%) skewX(-12deg); }
}

.animate-shimmer {
  animation: shimmer 1.5s infinite;
}
</style>
