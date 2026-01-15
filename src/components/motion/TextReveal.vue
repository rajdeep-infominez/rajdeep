<script setup lang="ts">
/* ==================================================
   TextReveal Component
   ================================================== 
   Reveals text with various scroll-driven animations
   like word-by-word, character-by-character, or line reveal.
   
   Usage:
   <TextReveal type="words" :stagger="0.1">
     Your text content here
   </TextReveal>
*/

import { ref, onMounted, computed, useSlots } from 'vue';
import { useScrollTrigger } from '@/composables/useScrollTrigger';
import { useReducedMotion } from '@/composables/useReducedMotion';

interface TextRevealProps {
  /** Type of text splitting */
  type?: 'words' | 'chars' | 'lines' | 'none';
  /** Stagger delay between elements */
  stagger?: number;
  /** Animation duration */
  duration?: number;
  /** Start trigger position */
  start?: string;
  /** Use scrub for smooth scroll-based animation */
  scrub?: boolean | number;
  /** Animation direction */
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  /** Distance to travel */
  distance?: number;
  /** Tag to use for the wrapper */
  tag?: string;
  /** Enable debug markers */
  markers?: boolean;
}

const props = withDefaults(defineProps<TextRevealProps>(), {
  type: 'words',
  stagger: 0.05,
  duration: 0.8,
  start: 'top 80%',
  scrub: false,
  direction: 'up',
  distance: 30,
  tag: 'div',
  markers: false,
});

const { prefersReducedMotion } = useReducedMotion();
const { createTimeline, gsap } = useScrollTrigger({ markers: props.markers });

const containerRef = ref<HTMLElement | null>(null);
const isRevealed = ref(false);
const slots = useSlots();

// Get animation properties based on direction
const getAnimationProps = computed(() => {
  const from: gsap.TweenVars = { opacity: 0 };
  
  switch (props.direction) {
    case 'up':
      from.y = props.distance;
      break;
    case 'down':
      from.y = -props.distance;
      break;
    case 'left':
      from.x = props.distance;
      break;
    case 'right':
      from.x = -props.distance;
      break;
    case 'fade':
      // Just opacity, no movement
      break;
  }
  
  return from;
});

onMounted(() => {
  if (!containerRef.value) return;

  // Skip animations if reduced motion is preferred
  if (prefersReducedMotion.value) {
    isRevealed.value = true;
    return;
  }

  let targets: Element[] = [];

  // Get targets based on type
  switch (props.type) {
    case 'words':
      targets = Array.from(containerRef.value.querySelectorAll('.word'));
      break;
    case 'chars':
      targets = Array.from(containerRef.value.querySelectorAll('.char'));
      break;
    case 'lines':
      targets = Array.from(containerRef.value.querySelectorAll('.line'));
      break;
    case 'none':
      targets = [containerRef.value];
      break;
  }

  if (targets.length === 0) {
    targets = [containerRef.value];
  }

  // Set initial state
  gsap.set(targets, getAnimationProps.value);

  // Create animation
  const timeline = createTimeline(
    {
      trigger: containerRef.value,
      start: props.start,
      scrub: props.scrub,
      onComplete: () => {
        isRevealed.value = true;
      },
    }
  );

  timeline.to(targets, {
    opacity: 1,
    x: 0,
    y: 0,
    duration: props.duration,
    stagger: props.stagger,
    ease: 'power3.out',
  });
});

// Helper function to split text into words
const splitIntoWords = (text: string): string[] => {
  return text.split(/\s+/).filter(word => word.length > 0);
};
</script>

<template>
  <component 
    :is="tag"
    ref="containerRef" 
    class="text-reveal"
    :class="{ 'is-revealed': isRevealed }"
  >
    <template v-if="type === 'words'">
      <span 
        v-for="(word, index) in splitIntoWords($slots.default?.()?.[0]?.children?.toString() || '')"
        :key="index"
        class="word"
      >
        {{ word }}&nbsp;
      </span>
    </template>
    <template v-else>
      <slot />
    </template>
  </component>
</template>

<style scoped>
.text-reveal {
  display: inline;
}

.text-reveal .word,
.text-reveal .char,
.text-reveal .line {
  display: inline-block;
  will-change: transform, opacity;
}

.text-reveal .word {
  white-space: nowrap;
}
</style>
