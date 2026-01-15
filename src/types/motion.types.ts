/* ==================================================
   Motion Types
   ================================================== */

export interface MotionConfig {
    duration: MotionDuration;
    easing: MotionEasing;
    depth: MotionDepth;
    rotation: MotionRotation;
    scale: MotionScale;
}

export interface MotionDuration {
    instant: number;
    fast: number;
    base: number;
    slow: number;
    dramatic: number;
}

export interface MotionEasing {
    smooth: string;
    elastic: string;
    bounce: string;
    sharp: string;
}

export interface MotionDepth {
    subtle: number;
    hover: number;
    focus: number;
    modal: number;
}

export interface MotionRotation {
    subtle: number;
    tilt: number;
    flip: number;
}

export interface MotionScale {
    pressed: number;
    hover: number;
    focus: number;
    modal: number;
}

export interface ScrollTriggerConfig {
    trigger: string | Element;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    pin?: boolean;
    markers?: boolean;
    onEnter?: () => void;
    onLeave?: () => void;
    onEnterBack?: () => void;
    onLeaveBack?: () => void;
}

export interface AnimationState {
    isPlaying: boolean;
    progress: number;
    direction: 'forward' | 'reverse';
}

export type ClipPathShape = 'circle' | 'polygon' | 'inset' | 'ellipse';

export interface ClipRevealOptions {
    shape: ClipPathShape;
    duration: number;
    delay?: number;
    origin?: string;
    easing?: string;
}

export interface PerspectiveConfig {
    perspective: number;
    maxRotationX: number;
    maxRotationY: number;
    scale: number;
    smoothing: number;
}

/* ==================================================
   Default Motion Configuration
   ================================================== */
export const defaultMotionConfig: MotionConfig = {
    duration: {
        instant: 0.1,
        fast: 0.2,
        base: 0.4,
        slow: 0.8,
        dramatic: 1.2,
    },
    easing: {
        smooth: 'power3.out',
        elastic: 'elastic.out(1, 0.4)',
        bounce: 'bounce.out',
        sharp: 'power4.inOut',
    },
    depth: {
        subtle: 10,
        hover: 20,
        focus: 40,
        modal: 60,
    },
    rotation: {
        subtle: 2,
        tilt: 8,
        flip: 180,
    },
    scale: {
        pressed: 0.98,
        hover: 1.02,
        focus: 1.05,
        modal: 1.1,
    },
};
