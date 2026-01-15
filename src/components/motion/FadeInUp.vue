<script setup lang="ts">
/* ==================================================
   FadeInUp Component
   ================================================== 
   Animates content with a fade-in and upward motion.
   Uses GSAP for smooth animations with reduced motion support.
*/

import { ref, onMounted, watch, nextTick } from 'vue';
import { gsap } from 'gsap';
import { useReducedMotion } from '@/composables/useReducedMotion';

interface FadeInUpProps {
  /** Animation duration in seconds */
  duration?: number;
  /** Delay before animation starts in seconds */
  delay?: number;
  /** Distance to travel upward in pixels */
  distance?: number;
  /** Whether to auto-play on mount (or when this becomes true) */
  autoPlay?: boolean;
  /** Easing function */
  ease?: string;
  /** Initial opacity */
  fromOpacity?: number;
}

const props = withDefaults(defineProps<FadeInUpProps>(), {
  duration: 0.8,
  delay: 0,
  distance: 30,
  autoPlay: true,
  ease: 'power3.out',
  fromOpacity: 0,
});

const emit = defineEmits<{
  (e: 'complete'): void;
  (e: 'start'): void;
}>();

const { prefersReducedMotion } = useReducedMotion();
const elementRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);
const isAnimating = ref(false);
const isMounted = ref(false);

const animate = () => {
  if (!elementRef.value || isAnimating.value || isVisible.value) return;

  // Skip animation if reduced motion is preferred
  if (prefersReducedMotion.value) {
    if (elementRef.value) {
      elementRef.value.style.opacity = '1';
      elementRef.value.style.transform = 'translateY(0)';
    }
    isVisible.value = true;
    emit('complete');
    return;
  }

  isAnimating.value = true;
  emit('start');

  gsap.fromTo(
    elementRef.value,
    {
      opacity: props.fromOpacity,
      y: props.distance,
    },
    {
      opacity: 1,
      y: 0,
      duration: props.duration,
      delay: props.delay,
      ease: props.ease,
      onComplete: () => {
        isAnimating.value = false;
        isVisible.value = true;
        emit('complete');
      },
    }
  );
};

// Watch for autoPlay prop changes
watch(() => props.autoPlay, (newVal) => {
  if (newVal && isMounted.value && !isVisible.value) {
    nextTick(() => {
      animate();
    });
  }
}, { immediate: false });

onMounted(() => {
  if (elementRef.value) {
    // Set initial hidden state
    elementRef.value.style.opacity = String(props.fromOpacity);
    elementRef.value.style.transform = `translateY(${props.distance}px)`;
  }

  isMounted.value = true;

  // If autoPlay is already true on mount, start animation
  if (props.autoPlay) {
    nextTick(() => {
      animate();
    });
  }
});

defineExpose({
  animate,
  isVisible,
  isAnimating,
});
</script>

<template>
  <div ref="elementRef" class="fade-in-up">
    <slot />
  </div>
</template>

<style scoped>
.fade-in-up {
  will-change: opacity, transform;
}
</style>
