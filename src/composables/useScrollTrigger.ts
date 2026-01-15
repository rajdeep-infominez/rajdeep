/* ==================================================
   useScrollTrigger Composable
   ================================================== 
   Vue composable for managing GSAP ScrollTrigger
   animations with automatic cleanup on unmount.
   
   Usage:
   const { createTrigger, createTimeline } = useScrollTrigger()
*/

import { onMounted, onUnmounted, ref } from 'vue';
import { gsap, ScrollTrigger } from '@/animations/gsap';

export interface UseScrollTriggerOptions {
    /** Enable debug markers */
    markers?: boolean;
    /** Refresh triggers on mount */
    refreshOnMount?: boolean;
}

export function useScrollTrigger(options: UseScrollTriggerOptions = {}) {
    const { markers = false, refreshOnMount = true } = options;

    // Store all triggers created by this instance
    const triggers = ref<ScrollTrigger[]>([]);
    const timelines = ref<gsap.core.Timeline[]>([]);
    const isReady = ref(false);

    /**
     * Create a ScrollTrigger instance
     */
    const createTrigger = (config: ScrollTrigger.Vars): ScrollTrigger => {
        const trigger = ScrollTrigger.create({
            markers,
            ...config,
        });
        triggers.value.push(trigger);
        return trigger;
    };

    /**
     * Create a timeline with ScrollTrigger
     */
    const createTimeline = (
        scrollTriggerConfig: ScrollTrigger.Vars,
        timelineConfig: gsap.TimelineVars = {}
    ): gsap.core.Timeline => {
        const timeline = gsap.timeline({
            ...timelineConfig,
            scrollTrigger: {
                markers,
                ...scrollTriggerConfig,
            },
        });
        timelines.value.push(timeline);
        return timeline;
    };

    /**
     * Create a simple scroll-triggered animation
     */
    const createScrollAnimation = (
        target: gsap.TweenTarget,
        vars: gsap.TweenVars,
        scrollTriggerConfig: ScrollTrigger.Vars
    ): gsap.core.Tween => {
        return gsap.to(target, {
            ...vars,
            scrollTrigger: {
                markers,
                ...scrollTriggerConfig,
            },
        });
    };

    /**
     * Create a from-to scroll animation
     */
    const createScrollFromTo = (
        target: gsap.TweenTarget,
        fromVars: gsap.TweenVars,
        toVars: gsap.TweenVars,
        scrollTriggerConfig: ScrollTrigger.Vars
    ): gsap.core.Tween => {
        return gsap.fromTo(target, fromVars, {
            ...toVars,
            scrollTrigger: {
                markers,
                ...scrollTriggerConfig,
            },
        });
    };

    /**
     * Refresh all ScrollTrigger instances
     */
    const refresh = (): void => {
        ScrollTrigger.refresh();
    };

    /**
     * Kill all triggers created by this instance
     */
    const killAll = (): void => {
        triggers.value.forEach((trigger) => {
            trigger.kill();
        });
        timelines.value.forEach((timeline) => {
            timeline.kill();
        });
        triggers.value = [];
        timelines.value = [];
    };

    onMounted(() => {
        isReady.value = true;
        if (refreshOnMount) {
            // Delay refresh to ensure DOM is ready
            requestAnimationFrame(() => {
                ScrollTrigger.refresh();
            });
        }
    });

    onUnmounted(() => {
        // Clean up all triggers and timelines on unmount
        killAll();
    });

    return {
        // State
        isReady,
        triggers,
        timelines,

        // Methods
        createTrigger,
        createTimeline,
        createScrollAnimation,
        createScrollFromTo,
        refresh,
        killAll,

        // Direct access to GSAP and ScrollTrigger
        gsap,
        ScrollTrigger,
    };
}
