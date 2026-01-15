/* ==================================================
   Vue Router Configuration
   ================================================== */

import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/pages/HomePage.vue'),
        meta: {
            title: 'Vue Gallery - UI/UX Motion Experience',
            description: 'A UI/UX motion design laboratory showcasing advanced animations and interactions',
        },
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('@/pages/AboutPage.vue'),
        meta: {
            title: 'About - Vue Gallery',
            description: 'Learn about the design principles and motion philosophy',
        },
    },
    // Catch-all 404
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        redirect: '/',
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        if (to.hash) {
            return { el: to.hash, behavior: 'smooth' };
        }
        return { top: 0, behavior: 'smooth' };
    },
});

// Update document title on route change
router.beforeEach((to, from, next) => {
    const title = to.meta.title as string | undefined;
    if (title) {
        document.title = title;
    }
    next();
});

export default router;
