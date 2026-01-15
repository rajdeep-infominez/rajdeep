<script setup lang="ts">
/* ==================================================
   ScrollSection Component
   ================================================== 
   A section that can be pinned during scroll and
   drives child animations based on scroll progress.
   
   Usage:
   <ScrollSection pin :scrub="1" @progress="handleProgress">
     <template #default="{ progress }">
       <YourContent :style="{ opacity: progress }" />
     </template>
   </ScrollSection>
*/

import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import { useScrollTrigger } from '@/composables/useScrollTrigger';
import { useReducedMotion } from '@/composables/useReducedMotion';

interface ScrollSectionProps {
  /** Pin the section during scroll */
  pin?: boolean;
  /** Add spacing after pinned section */
  pinSpacing?: boolean;
  /** Scrub value (true, false, or number for smoothing) */
  scrub?: boolean | number;
  /** Start position (e.g., 'top top', 'center center') */
  start?: string;
  /** End position (e.g., '+=100%', 'bottom top') */
  end?: string;
  /** Show debug markers */
  markers?: boolean;
  /** Unique ID for the trigger */
  triggerId?: string;
  /** Custom height multiplier for pinned duration */
  heightMultiplier?: number;
}

const props = withDefaults(defineProps<ScrollSectionProps>(), {
  pin: false,
  pinSpacing: true,
  scrub: true,
  start: 'top top',
  end: '+=100%',
  markers: false,
  triggerId: undefined,
  heightMultiplier: 1,
});

const emit = defineEmits<{
  (e: 'progress', progress: number): void;
  (e: 'enter'): void;
  (e: 'leave'): void;
  (e: 'enterBack'): void;
  (e: 'leaveBack'): void;
}>();

const { prefersReducedMotion } = useReducedMotion();
const { createTrigger, ScrollTrigger } = useScrollTrigger({ markers: props.markers });

const sectionRef = ref<HTMLElement | null>(null);
const progress = ref(0);
const isActive = ref(false);
const direction = ref<'forward' | 'backward'>('forward');

// Computed end value based on height multiplier
const computedEnd = computed(() => {
  if (props.end.startsWith('+=')) {
    return `+=${100 * props.heightMultiplier}%`;
  }
  return props.end;
});

onMounted(() => {
  if (!sectionRef.value) return;

  // Skip pinning if reduced motion is preferred
  const shouldPin = props.pin && !prefersReducedMotion.value;

  createTrigger({
    id: props.triggerId,
    trigger: sectionRef.value,
    start: props.start,
    end: computedEnd.value,
    pin: shouldPin,
    pinSpacing: props.pinSpacing,
    scrub: props.scrub,
    onUpdate: (self) => {
      progress.value = self.progress;
      direction.value = self.direction === 1 ? 'forward' : 'backward';
      emit('progress', self.progress);
    },
    onEnter: () => {
      isActive.value = true;
      emit('enter');
    },
    onLeave: () => {
      isActive.value = false;
      emit('leave');
    },
    onEnterBack: () => {
      isActive.value = true;
      emit('enterBack');
    },
    onLeaveBack: () => {
      isActive.value = false;
      emit('leaveBack');
    },
  });
});

// Expose progress and state to parent
defineExpose({
  progress,
  isActive,
  direction,
});
</script>

<template>
  <section 
    ref="sectionRef" 
    class="scroll-section"
    :class="{ 
      'is-active': isActive,
      'is-pinned': pin,
    }"
    :data-progress="progress.toFixed(2)"
  >
    <!-- Slot with progress data -->
    <slot 
      :progress="progress" 
      :isActive="isActive"
      :direction="direction"
    />
  </section>
</template>

<style scoped>
.scroll-section {
  position: relative;
  width: 100%;
}

.scroll-section.is-pinned {
  /* Ensure proper stacking context for pinned sections */
  z-index: 1;
}

.scroll-section.is-active {
  z-index: 2;
}
</style>
