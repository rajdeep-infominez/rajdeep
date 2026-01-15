/* ==================================================
   GSAP Animation Utilities
   ================================================== 
   Centralized GSAP and ScrollTrigger initialization
   and helper functions for the application.
*/

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Export gsap and ScrollTrigger for use in components
export { gsap, ScrollTrigger };

/* ==================================================
   Default Animation Configurations
   ================================================== */

export const defaultEasing = {
    smooth: 'power3.out',
    smoothInOut: 'power3.inOut',
    elastic: 'elastic.out(1, 0.4)',
    bounce: 'bounce.out',
    sharp: 'power4.inOut',
    expo: 'expo.out',
};

export const defaultDurations = {
    instant: 0.1,
    fast: 0.3,
    base: 0.6,
    slow: 1.0,
    dramatic: 1.5,
};

/* ==================================================
   ScrollTrigger Helpers
   ================================================== */

export interface ScrollTriggerConfig {
    trigger: string | Element;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    pin?: boolean;
    pinSpacing?: boolean;
    markers?: boolean;
    toggleActions?: string;
    onEnter?: () => void;
    onLeave?: () => void;
    onEnterBack?: () => void;
    onLeaveBack?: () => void;
    onUpdate?: (self: ScrollTrigger) => void;
}

/**
 * Create a scroll-triggered animation
 */
export function createScrollAnimation(
    target: gsap.TweenTarget,
    animation: gsap.TweenVars,
    triggerConfig: ScrollTriggerConfig
): gsap.core.Tween {
    return gsap.to(target, {
        ...animation,
        scrollTrigger: {
            ...triggerConfig,
        },
    });
}

/**
 * Create a scroll-triggered timeline
 */
export function createScrollTimeline(
    triggerConfig: ScrollTriggerConfig
): gsap.core.Timeline {
    return gsap.timeline({
        scrollTrigger: {
            ...triggerConfig,
        },
    });
}

/**
 * Create a pinned section animation
 */
export function createPinnedSection(
    trigger: string | Element,
    options: {
        start?: string;
        end?: string;
        pinSpacing?: boolean;
        markers?: boolean;
    } = {}
): ScrollTrigger {
    return ScrollTrigger.create({
        trigger,
        start: options.start || 'top top',
        end: options.end || '+=100%',
        pin: true,
        pinSpacing: options.pinSpacing ?? true,
        markers: options.markers ?? false,
    });
}

/**
 * Create a scrub animation that follows scroll position
 */
export function createScrubAnimation(
    target: gsap.TweenTarget,
    fromVars: gsap.TweenVars,
    toVars: gsap.TweenVars,
    triggerConfig: Omit<ScrollTriggerConfig, 'scrub'>
): gsap.core.Tween {
    return gsap.fromTo(target, fromVars, {
        ...toVars,
        scrollTrigger: {
            ...triggerConfig,
            scrub: 1,
        },
    });
}

/* ==================================================
   Cleanup Utilities
   ================================================== */

/**
 * Kill all ScrollTrigger instances
 */
export function killAllScrollTriggers(): void {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}

/**
 * Refresh all ScrollTrigger instances
 */
export function refreshScrollTriggers(): void {
    ScrollTrigger.refresh();
}

/**
 * Kill a specific ScrollTrigger by id
 */
export function killScrollTrigger(id: string): void {
    const trigger = ScrollTrigger.getById(id);
    if (trigger) {
        trigger.kill();
    }
}

/* ==================================================
   Common Animation Presets
   ================================================== */

export const animationPresets = {
    fadeIn: {
        from: { opacity: 0 },
        to: { opacity: 1 },
    },
    fadeInUp: {
        from: { opacity: 0, y: 50 },
        to: { opacity: 1, y: 0 },
    },
    fadeInDown: {
        from: { opacity: 0, y: -50 },
        to: { opacity: 1, y: 0 },
    },
    fadeInLeft: {
        from: { opacity: 0, x: -50 },
        to: { opacity: 1, x: 0 },
    },
    fadeInRight: {
        from: { opacity: 0, x: 50 },
        to: { opacity: 1, x: 0 },
    },
    scaleIn: {
        from: { opacity: 0, scale: 0.8 },
        to: { opacity: 1, scale: 1 },
    },
    slideUp: {
        from: { y: '100%' },
        to: { y: '0%' },
    },
    slideDown: {
        from: { y: '-100%' },
        to: { y: '0%' },
    },
};
