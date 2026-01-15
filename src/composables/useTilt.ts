/* ==================================================
   useTilt Composable
   ================================================== 
   Provides reactive 3D tilt values based on mouse position
   relative to an element.
   
   Usage:
   const { tiltTransform, handleMouseMove, handleMouseLeave } = useTilt({ max: 15 });
*/

import { ref, computed } from 'vue';
import { useReducedMotion } from '@/composables/useReducedMotion';

interface TiltOptions {
    /** Maximum tilt rotation in degrees */
    max?: number;
    /** Perspective value in pixels */
    perspective?: number;
    /** Scale on hover */
    scale?: number;
    /** Easing for the transition (CSS format) */
    easing?: string;
    /** Speed of the transition */
    speed?: number;
}

export function useTilt(options: TiltOptions = {}) {
    const {
        max = 8,
        perspective = 1000,
        scale = 1.05,
    } = options;

    const { prefersReducedMotion } = useReducedMotion();

    const rotateX = ref(0);
    const rotateY = ref(0);
    const scaleValue = ref(1);
    const isHovered = ref(false);

    const tiltTransform = computed(() => {
        if (prefersReducedMotion.value) {
            return isHovered.value ? `scale(${scale})` : 'scale(1)';
        }
        return `
      perspective(${perspective}px) 
      rotateX(${rotateX.value}deg) 
      rotateY(${rotateY.value}deg) 
      scale(${scaleValue.value})
    `;
    });

    const handleMouseMove = (e: MouseEvent) => {
        if (prefersReducedMotion.value) return;

        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();

        // Calculate mouse position relative to center of element
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        // Calculate rotation values (inverted X for natural feel)
        // Max rotation applies at the edges
        const rotateXValue = -1 * (mouseY / (rect.height / 2)) * max;
        const rotateYValue = (mouseX / (rect.width / 2)) * max;

        rotateX.value = rotateXValue;
        rotateY.value = rotateYValue;
    };

    const handleMouseEnter = () => {
        isHovered.value = true;
        scaleValue.value = scale;
    };

    const handleMouseLeave = () => {
        isHovered.value = false;
        rotateX.value = 0;
        rotateY.value = 0;
        scaleValue.value = 1;
    };

    return {
        tiltTransform,
        isHovered,
        handleMouseMove,
        handleMouseEnter,
        handleMouseLeave,
        rotateX,
        rotateY,
    };
}
