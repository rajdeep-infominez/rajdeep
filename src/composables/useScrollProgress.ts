/* ==================================================
   useScrollProgress Composable
   ================================================== 
   Tracks scroll position and provides reactive values
   for scroll-based animations.
   
   Usage:
   const { 
     scrollY,
     scrollProgress, 
     scrollDirection,
     isScrolling 
   } = useScrollProgress()
*/

import { ref, onMounted, onUnmounted, computed } from 'vue';

export interface ScrollProgressOptions {
    /** Throttle delay in ms (default: 10) */
    throttleMs?: number;
    /** Element to track scroll on (default: window) */
    element?: HTMLElement | null;
}

export function useScrollProgress(options: ScrollProgressOptions = {}) {
    const { throttleMs = 10 } = options;

    // Reactive state
    const scrollY = ref(0);
    const scrollHeight = ref(0);
    const viewportHeight = ref(0);
    const scrollDirection = ref<'up' | 'down' | 'idle'>('idle');
    const isScrolling = ref(false);

    // Previous scroll position for direction detection
    let prevScrollY = 0;
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
    let ticking = false;

    // Computed scroll progress (0 to 1)
    const scrollProgress = computed(() => {
        if (scrollHeight.value <= viewportHeight.value) return 0;
        const maxScroll = scrollHeight.value - viewportHeight.value;
        return Math.min(Math.max(scrollY.value / maxScroll, 0), 1);
    });

    // Computed percentage (0 to 100)
    const scrollPercentage = computed(() => {
        return Math.round(scrollProgress.value * 100);
    });

    const updateScrollValues = () => {
        if (typeof window === 'undefined') return;

        const currentScrollY = window.scrollY || document.documentElement.scrollTop;

        // Update direction
        if (currentScrollY > prevScrollY) {
            scrollDirection.value = 'down';
        } else if (currentScrollY < prevScrollY) {
            scrollDirection.value = 'up';
        }

        prevScrollY = currentScrollY;
        scrollY.value = currentScrollY;
        scrollHeight.value = document.documentElement.scrollHeight;
        viewportHeight.value = window.innerHeight;
        isScrolling.value = true;

        // Reset isScrolling after scroll stops
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling.value = false;
            scrollDirection.value = 'idle';
        }, 150);

        ticking = false;
    };

    const handleScroll = () => {
        if (!ticking) {
            if (throttleMs > 0) {
                setTimeout(() => {
                    requestAnimationFrame(updateScrollValues);
                }, throttleMs);
            } else {
                requestAnimationFrame(updateScrollValues);
            }
            ticking = true;
        }
    };

    const handleResize = () => {
        if (typeof window === 'undefined') return;
        viewportHeight.value = window.innerHeight;
        scrollHeight.value = document.documentElement.scrollHeight;
    };

    onMounted(() => {
        if (typeof window === 'undefined') return;

        // Set initial values
        updateScrollValues();

        // Add listeners
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize, { passive: true });
    });

    onUnmounted(() => {
        if (typeof window === 'undefined') return;

        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);

        if (scrollTimeout) clearTimeout(scrollTimeout);
    });

    // Utility function to scroll to a specific progress (0-1)
    const scrollToProgress = (progress: number, behavior: ScrollBehavior = 'smooth') => {
        if (typeof window === 'undefined') return;

        const maxScroll = scrollHeight.value - viewportHeight.value;
        const targetY = maxScroll * Math.min(Math.max(progress, 0), 1);

        window.scrollTo({
            top: targetY,
            behavior,
        });
    };

    return {
        scrollY,
        scrollProgress,
        scrollPercentage,
        scrollDirection,
        isScrolling,
        scrollHeight,
        viewportHeight,
        scrollToProgress,
    };
}
