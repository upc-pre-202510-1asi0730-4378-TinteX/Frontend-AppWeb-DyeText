/**
 * @fileoverview Router configuration for the ACME Learning Center application
 * Defines all routes and navigation behavior for the application
 */

import { createRouter, createWebHistory } from "vue-router";

// Lazy-loaded components for route configuration
const HomeComponent = () => import('../public/pages/home.component.vue');
const AboutComponent = () => import('../public/pages/about.component.vue');
const NotificationManagementComponent = () => import('../alertSystem/pages/notification-management.component.vue');
const PageNotFoundComponent = () => import('../public/pages/page-not-found.component.vue');

/**
 * @type {import('vue-router').RouteRecordRaw[]}
 * @description Application route definitions.
 */
const routes = [
    { path: '/home',               name: 'home',       component: HomeComponent,                  meta: { title: 'Home' } },
    { path: '/about',              name: 'about',      component: AboutComponent,                 meta: { title: 'About us' } },
    { path: '/publishing/notifications', name: 'notifications', component: NotificationManagementComponent, meta: { title: 'Notifications' } },
    { path: '/',                   name: 'default',    redirect: { name: 'home' } },
    { path: '/:pathMatch(.*)*',    name: 'not-found',  component: PageNotFoundComponent,            meta: { title: 'Page not found' } },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

// Global navigation guard
router.beforeEach((to, from, next) => {
    console.log(`Navigating from ${from.name} to ${to.name}`);
    document.title = `ACME Learning Center | ${to.meta.title}`;
    next();
});

export default router;