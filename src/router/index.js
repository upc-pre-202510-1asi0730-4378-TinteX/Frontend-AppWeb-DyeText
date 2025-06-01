import {createRouter, createWebHistory} from "vue-router";


/**
 * @description Lazy-loaded component imports for route configuration
 * Using dynamic imports to enable code splitting and improve initial load performance
 */

const HomeComponent = () => import('../public/pages/home.component.vue');
const NotificationManagementComponent = () => import('../alertSystem/pages/notification-management.component.vue');
const Monitoring = () => import('../monitoring/pages/textilMachine-management.component.vue');
const PageNotFoundComponent = () => import('../public/pages/page-not-found.component.vue');
const AssignUsersManagementComponent = () => import('../assignUsers/pages/assign-user.management.component.vue');
const MaintenanceManagementComponent = () => import('../maintenance/pages/maintenance-management.component.vue');
const SubscriptionManagementComponent = () => import('../subscriptions-and-payments/pages/subscriptions-and-payments-management.component.vue');


/**
 * @type {import('vue-router').RouteRecordRaw[]}
 * @description Application route definitions.
 * Each route object contains:
 * - path: URL path for the route
 * - name: Unique identifier for the route
 * - component: Vue component to render
 * - meta: Additional metadata including page title
 */


const routes = [
    {   path: '/home',                  name: 'home',               component: HomeComponent,               meta: {title: 'Home'}},
    {   path: '/publishing/notifications', name: 'notifications', component: NotificationManagementComponent, meta: { title: 'Notifications' } },
    {   path: '/monitoring',                  name: 'Monitoring',               component: Monitoring,               meta: {title: 'Monitoring'}},
    {   path: '/maintenance',                  name: 'Maintenance',               component: MaintenanceManagementComponent,               meta: {title: 'Maintenance'}},
    {   path: '/subscription',  name: 'Subscription',  component: SubscriptionManagementComponent,               meta: {title: 'Subscription'}},
    {   path: '/assignUser',            name: 'assignUser',         component: AssignUsersManagementComponent, meta: {title: 'AssignUser'}},
    {   path: '/',                      name: 'default',            redirect: {name: 'home'}},
    {   path: '/:pathMatch(.*)*',       name: 'not-found',          component: PageNotFoundComponent,       meta: {title: 'Page not found'}},
]


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,

});

/**
 * @description Global navigation guard that runs before each route change
 * Handles:
 * - Navigation logging
 * - Dynamic page title updates based on route metadata
 *
 * @param {import('vue-router').RouteLocationNormalized} to - Target route
 * @param {import('vue-router').RouteLocationNormalized} from - Current route
 * @param {import('vue-router').NavigationGuardNext} next - Function to resolve the navigation
 */

router.beforeEach((to, from, next) => {
    console.log(`Navigating from ${from.name} to ${to.name}`);
    // Set the page title
    let baseTitle = 'DyeTex';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
});

export default router;
