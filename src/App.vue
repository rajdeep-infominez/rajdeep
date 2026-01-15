<script setup lang="ts">
/* ==================================================
   App Root Component
   ================================================== 
   Main application wrapper with layout components
*/

import { onMounted } from 'vue';
import { useGalleryStore } from '@/store/gallery.store';

// Layout components
import TheHeader from '@/components/layout/TheHeader.vue';
import TheFooter from '@/components/layout/TheFooter.vue';

const store = useGalleryStore();

onMounted(() => {
  // Check for reduced motion preference
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  store.setReducedMotion(mediaQuery.matches);

  // Listen for changes
  mediaQuery.addEventListener('change', (e) => {
    store.setReducedMotion(e.matches);
  });
});
</script>

<template>
  <div class="app-wrapper min-h-screen flex flex-col bg-dark-900">
    <!-- Header -->
    <TheHeader />

    <!-- Main Content -->
    <div class="flex-1">
      <router-view v-slot="{ Component }">
        <transition 
          name="page" 
          mode="out-in"
          @before-enter="$el?.scrollTo?.(0, 0)"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </div>

    <!-- Footer -->
    <TheFooter />
  </div>
</template>

<style>
/* Page transition animations */
.page-enter-active,
.page-leave-active {
  transition: opacity var(--motion-duration-base) var(--motion-ease-smooth),
              transform var(--motion-duration-base) var(--motion-ease-smooth);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
