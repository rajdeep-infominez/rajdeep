<script setup lang="ts">
/* ==================================================
   GalleryGrid Component
   ================================================== 
   Responsive grid layout for gallery items with 
   perspective container and staggered entry.
*/

import { onMounted } from 'vue';
import { useGalleryStore } from '@/store/gallery.store';
import GalleryCard from '@/components/gallery/GalleryCard.vue';
import FadeInUp from '@/components/motion/FadeInUp.vue';

const store = useGalleryStore();

onMounted(() => {
  // If no images, fetch them
  if (store.images.length === 0) {
    store.fetchImages();
  }
});

const handleCardClick = (id: string, rect: DOMRect) => {
  store.openModal(id, { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
};
</script>

<template>
  <div class="gallery-perspective-container min-h-screen">
    
    <!-- Loading State -->
    <div v-if="store.isLoading && store.images.length === 0" class="flex justify-center py-20">
      <div class="w-8 h-8 rounded-full border-2 border-accent-primary border-t-transparent animate-spin" />
    </div>

    <!-- Empty State -->
    <div v-else-if="store.isEmpty" class="text-center py-20 text-white/40">
      <p>No images found.</p>
    </div>

    <!-- Grid -->
    <div v-else class="gallery-grid-layout p-4 md:p-8 max-w-7xl mx-auto">
      <FadeInUp 
        v-for="(image, index) in store.images" 
        :key="image.id"
        :delay="index * 0.1"
        :distance="50"
        tag="div"
        class="h-full"
      >
        <GalleryCard 
          :image="image" 
          :index="index"
          @click="handleCardClick"
        />
      </FadeInUp>
    </div>
  </div>
</template>

<style scoped>
.gallery-perspective-container {
  perspective: 2000px;
}

.gallery-grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  align-items: start;
}

/* Staggered masonry-like feel (simulated for now) */
@media (min-width: 768px) {
  .gallery-grid-layout > div:nth-child(odd) {
    transform: translateY(2rem);
  }
}
</style>
