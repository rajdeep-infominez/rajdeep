<script setup lang="ts">
/* ==================================================
   ClipReveal Component
   ================================================== 
   A wrapper component that reveals its content using
   CSS clip-path animations. Supports multiple shapes
   and trigger modes.
   
   Usage:
   <ClipReveal shape="circle" :duration="1.2" :delay="0.2">
     <YourContent />
   </ClipReveal>
*/

import { ref, onMounted, watch, computed, nextTick } from 'vue';
import { gsap } from 'gsap';
import { useReducedMotion } from '@/composables/useReducedMotion';

export interface ClipRevealProps {
  /** Shape of the clip-path reveal */
  shape?: 'circle' | 'inset' | 'polygon-diagonal' | 'polygon-vertical';
  /** Animation duration in seconds */
  duration?: number;
  /** Delay before animation starts in seconds */
  delay?: number;
  /** Whether to auto-play on mount (or when this becomes true) */
  autoPlay?: boolean;
  /** Origin point for circle/ellipse (e.g., '50% 50%') */
  origin?: string;
  /** Easing function */
  ease?: string;
}

const props = withDefaults(defineProps<ClipRevealProps>(), {
  shape: 'circle',
  duration: 1.2,
  delay: 0,
  autoPlay: true,
  origin: '50% 50%',
  ease: 'power3.out',
});

const emit = defineEmits<{
  (e: 'complete'): void;
  (e: 'start'): void;
}>();

const { prefersReducedMotion } = useReducedMotion();

const containerRef = ref<HTMLElement | null>(null);
const isRevealed = ref(false);
const isAnimating = ref(false);
const isMounted = ref(false);

// Clip-path values based on shape
const clipPaths = computed(() => {
  const [originX, originY] = props.origin.split(' ');
  
  switch (props.shape) {
    case 'circle':
      return {
        from: `circle(0% at ${originX} ${originY})`,
        to: `circle(150% at ${originX} ${originY})`,
      };
    case 'inset':
      return {
        from: 'inset(0 100% 0 0)',
        to: 'inset(0 0% 0 0)',
      };
    case 'polygon-diagonal':
      return {
        from: 'polygon(0 0, 0 0, 0 0)',
        to: 'polygon(0 0, 200% 0, 200% 200%)',
      };
    case 'polygon-vertical':
      return {
        from: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
        to: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      };
    default:
      return {
        from: `circle(0% at ${originX} ${originY})`,
        to: `circle(150% at ${originX} ${originY})`,
      };
  }
});

const reveal = () => {
  if (!containerRef.value || isAnimating.value || isRevealed.value) return;

  // If reduced motion is preferred, skip animation
  if (prefersReducedMotion.value) {
    if (containerRef.value) {
      containerRef.value.style.clipPath = clipPaths.value.to;
      containerRef.value.style.opacity = '1';
    }
    isRevealed.value = true;
    emit('complete');
    return;
  }

  isAnimating.value = true;
  emit('start');

  gsap.fromTo(
    containerRef.value,
    {
      clipPath: clipPaths.value.from,
      opacity: 0,
    },
    {
      clipPath: clipPaths.value.to,
      opacity: 1,
      duration: props.duration,
      delay: props.delay,
      ease: props.ease,
      onComplete: () => {
        isAnimating.value = false;
        isRevealed.value = true;
        emit('complete');
      },
    }
  );
};

const hide = () => {
  if (!containerRef.value || isAnimating.value || !isRevealed.value) return;

  if (prefersReducedMotion.value) {
    if (containerRef.value) {
      containerRef.value.style.clipPath = clipPaths.value.from;
      containerRef.value.style.opacity = '0';
    }
    isRevealed.value = false;
    return;
  }

  isAnimating.value = true;

  gsap.to(containerRef.value, {
    clipPath: clipPaths.value.from,
    opacity: 0,
    duration: props.duration * 0.8,
    ease: 'power2.in',
    onComplete: () => {
      isAnimating.value = false;
      isRevealed.value = false;
    },
  });
};

// Watch for autoPlay prop changes - this is key for when parent controls play
watch(() => props.autoPlay, (newVal) => {
  if (newVal && isMounted.value && !isRevealed.value) {
    nextTick(() => {
      reveal();
    });
  }
}, { immediate: false });

onMounted(() => {
  if (containerRef.value) {
    // Set initial hidden state
    containerRef.value.style.clipPath = clipPaths.value.from;
    containerRef.value.style.opacity = '0';
  }

  isMounted.value = true;

  // If autoPlay is already true on mount, start animation
  if (props.autoPlay) {
    nextTick(() => {
      reveal();
    });
  }
});

// Expose methods for parent component
defineExpose({
  reveal,
  hide,
  isRevealed,
  isAnimating,
});
</script>

<template>
  <div 
    ref="containerRef" 
    class="clip-reveal"
    :class="{ 'is-revealed': isRevealed }"
  >
    <slot />
  </div>
</template>

<style scoped>
.clip-reveal {
  will-change: clip-path, opacity;
}
</style>
