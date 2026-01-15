/* ==================================================
   useReducedMotion Composable
   ================================================== 
   Detects user's motion preference for accessibility.
   Respects prefers-reduced-motion media query.
   
   Usage:
   const { prefersReducedMotion } = useReducedMotion()
*/

import { ref, onMounted, onUnmounted } from 'vue';

export function useReducedMotion() {
    const prefersReducedMotion = ref(false);
    let mediaQuery: MediaQueryList | null = null;

    const updateMotionPreference = (event: MediaQueryListEvent | MediaQueryList) => {
        prefersReducedMotion.value = event.matches;
    };

    onMounted(() => {
        // Check if window is available (SSR safety)
        if (typeof window === 'undefined') return;

        mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

        // Set initial value
        prefersReducedMotion.value = mediaQuery.matches;

        // Listen for changes
        mediaQuery.addEventListener('change', updateMotionPreference);
    });

    onUnmounted(() => {
        if (mediaQuery) {
            mediaQuery.removeEventListener('change', updateMotionPreference);
        }
    });

    return {
        prefersReducedMotion,
    };
}
