import {createRouter, createWebHistory} from "vue-router";
import {authenticationGuard} from "../iam/services/authentication.guard.js";


/**
 * @description Lazy-loaded component imports for route configuration
 * Using dynamic imports to enable code splitting and improve initial load performance
 */

const HomeComponent = () => import('../public/pages/home.component.vue');
const NotificationManagementComponent = () => import('../alertSystem/pages/notification-management.component.vue');
const Monitoring = () => import('../monitoring/pages/textilMachine-management.component.vue');
const PageNotFoundComponent = () => import('../public/pages/page-not-found.component.vue');
const SignInComponent = () => import('../iam/pages/sign-in.component.vue');
const SignUpComponent = () => import('../iam/pages/sign-up.component.vue');
const AssignUsersManagementComponent = () => import('../assignUsers/pages/assign-user.management.component.vue');
const MaintenanceManagementComponent = () => import('../maintenance/pages/maintenance-management.component.vue');
const SubscriptionManagementComponent = () => import('../subscriptions-and-payments/pages/subscriptions-and-payments-management.component.vue');
const DataAnalyticsManagementComponent = () => import('../analytics/pages/data-analytics-management.vue');
const ConfigurationPage = () => import('../machine-configuration/pages/ConfigurationPage.vue');
const ProfileManagementComponent = () => import('../profiles/pages/profile-management.vue');
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
    {   path: '/home',                                                 name: 'home',                        component: HomeComponent,                           meta: {title: 'Home'}},
    {   path: '/machine/notifications',                                name: 'notifications',               component: NotificationManagementComponent,         meta: { title: 'Notifications' } },
    {   path: '/machine/monitoring',                                   name: 'Monitoring',                  component: Monitoring,                              meta: {title: 'Monitoring'}},
    {   path: '/machine/maintenance',                                  name: 'Maintenance',                 component: MaintenanceManagementComponent,          meta: {title: 'Maintenance'}},
    {   path: '/machine/monitoring/machine-configuration/:id',         name: 'machine-configuration',       component: ConfigurationPage,                       props: true},
    {   path: '/machine/data-analytics',                               name: 'Analytics',                   component: DataAnalyticsManagementComponent,        meta: { title: 'Data Analytics' } },
    {   path: '/user/subscription',                                    name: 'Subscription',                component: SubscriptionManagementComponent,         meta: {title: 'Subscription'}},
    {   path: '/user/assign-user',                                     name: 'assignUser',                  component: AssignUsersManagementComponent,          meta: {title: 'AssignUser'}},
    {   path: '/sign-in',                                              name: 'sign-in',                     component: SignInComponent,                         meta: {title: 'Sign-In'}},
    {   path: '/sign-up',                                              name: 'sign-up',                     component: SignUpComponent,                         meta: {title: 'Sign-Up'}},
    {   path: '/',                                                     name: 'default',                     redirect: {name: 'home'}},
    {   path: '/:pathMatch(.*)*',                                      name: 'not-found',                   component: PageNotFoundComponent,                   meta: {title: 'Page not found'}},
    {   path: '/user/profile',                                         name: 'profile',                     component: ProfileManagementComponent,              meta: {title: 'Profile' } }
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
    // Call the authentication guard
    authenticationGuard(to, from, next);
});

export default router;
