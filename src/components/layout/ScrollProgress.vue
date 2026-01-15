<script setup lang="ts">
/* ==================================================
   ScrollProgress Component
   ================================================== 
   A visual scroll progress indicator bar that shows
   how far the user has scrolled through the page.
*/

import { useScrollProgress } from '@/composables/useScrollProgress';

interface ScrollProgressProps {
  /** Position of the progress bar */
  position?: 'top' | 'bottom';
  /** Height of the bar in pixels */
  height?: number;
  /** Whether to show percentage text */
  showPercentage?: boolean;
}

const props = withDefaults(defineProps<ScrollProgressProps>(), {
  position: 'top',
  height: 3,
  showPercentage: false,
});

const { scrollProgress, scrollPercentage } = useScrollProgress();
</script>

<template>
  <div 
    class="scroll-progress-container"
    :class="[`position-${position}`]"
    :style="{ height: `${height}px` }"
  >
    <!-- Progress Bar -->
    <div 
      class="scroll-progress-bar"
      :style="{ transform: `scaleX(${scrollProgress})` }"
    />
    
    <!-- Optional Percentage Display -->
    <span 
      v-if="showPercentage && scrollProgress > 0.01" 
      class="scroll-percentage"
    >
      {{ scrollPercentage }}%
    </span>
  </div>
</template>

<style scoped>
.scroll-progress-container {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.05);
  overflow: hidden;
}

.position-top {
  top: 0;
}

.position-bottom {
  bottom: 0;
}

.scroll-progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to right,
    var(--color-accent-primary),
    var(--color-accent-secondary),
    var(--color-accent-tertiary)
  );
  transform-origin: left center;
  transition: transform 0.1s ease-out;
}

.scroll-percentage {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 10px;
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  padding: 2px 6px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}
</style>
