<script setup lang="ts">
/* ==================================================
   ParallaxLayer Component
   ================================================== 
   Creates a parallax scrolling effect where content
   moves at a different speed than the page scroll.
   
   Usage:
   <ParallaxLayer :speed="0.5">
     <img src="background.jpg" />
   </ParallaxLayer>
*/

import { ref, onMounted, computed } from 'vue';
import { useScrollTrigger } from '@/composables/useScrollTrigger';
import { useReducedMotion } from '@/composables/useReducedMotion';

interface ParallaxLayerProps {
  /** Speed multiplier (0 = stationary, 1 = normal scroll, >1 = faster, <0 = reverse) */
  speed?: number;
  /** Direction of parallax movement */
  direction?: 'vertical' | 'horizontal';
  /** Start trigger position */
  start?: string;
  /** End trigger position */
  end?: string;
  /** Enable debug markers */
  markers?: boolean;
  /** Additional CSS class */
  layerClass?: string;
}

const props = withDefaults(defineProps<ParallaxLayerProps>(), {
  speed: 0.5,
  direction: 'vertical',
  start: 'top bottom',
  end: 'bottom top',
  markers: false,
  layerClass: '',
});

const { prefersReducedMotion } = useReducedMotion();
const { createScrollFromTo, gsap } = useScrollTrigger({ markers: props.markers });

const layerRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);

// Calculate the movement distance based on speed
const movementDistance = computed(() => {
  // Base movement is 100% of viewport height
  const baseDistance = 100;
  // Subtract 1 from speed so that speed=1 means no parallax
  const multiplier = props.speed - 1;
  return baseDistance * multiplier;
});

onMounted(() => {
  if (!layerRef.value || !contentRef.value) return;

  // Skip parallax if reduced motion is preferred
  if (prefersReducedMotion.value) return;

  const isVertical = props.direction === 'vertical';

  createScrollFromTo(
    contentRef.value,
    {
      y: isVertical ? `${movementDistance.value}%` : 0,
      x: isVertical ? 0 : `${movementDistance.value}%`,
    },
    {
      y: isVertical ? `${-movementDistance.value}%` : 0,
      x: isVertical ? 0 : `${-movementDistance.value}%`,
      ease: 'none',
    },
    {
      trigger: layerRef.value,
      start: props.start,
      end: props.end,
      scrub: true,
    }
  );
});
</script>

<template>
  <div 
    ref="layerRef" 
    class="parallax-layer"
    :class="layerClass"
  >
    <div 
      ref="contentRef" 
      class="parallax-content"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.parallax-layer {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.parallax-content {
  width: 100%;
  height: 100%;
  will-change: transform;
}
</style>
