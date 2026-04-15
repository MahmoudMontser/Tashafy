import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import AdminLayout from '../views/AdminLayout.vue'
import Dashboard from '../views/Dashboard.vue'
import ProvidersList from '../views/providers/ProvidersList.vue'
import ProviderForm from '../views/providers/ProviderForm.vue'
import ProviderCommerceManager from '../views/providers/ProviderCommerceManager.vue'
import PagesManager from '../views/content/PagesManager.vue'
import NavigationManager from '../views/content/NavigationManager.vue'
import MediaLibrary from '../views/content/MediaLibrary.vue'
import SeoSettings from '../views/content/SeoSettings.vue'
import BlogManager from '../views/content/BlogManager.vue'
import BlogForm from '../views/content/BlogForm.vue'
import ReservationsManager from '../views/reservations/ReservationsManager.vue'
import AppSettings from '../views/settings/AppSettings.vue'
import AccessControl from '../views/settings/AccessControl.vue'
import Unauthorized from '../views/Unauthorized.vue'
import { getToken, hasAnyPermission } from '../composables/useAuth'

const routes = [
  { path: '/login', component: Login, meta: { guestOnly: true } },
  { path: '/unauthorized', component: Unauthorized, meta: { requiresAuth: true } },
  {
    path: '/',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', redirect: '/dashboard' },
      { path: 'dashboard', component: Dashboard, meta: { permissions: ['dashboard.view'] } },
      { path: 'providers', component: ProvidersList, meta: { permissions: ['providers.view'] } },
      { path: 'providers/new', component: ProviderForm, meta: { permissions: ['providers.create'] } },
      { path: 'providers/:id', component: ProviderForm, meta: { permissions: ['providers.update'] } },
      { path: 'providers/:id/commerce', component: ProviderCommerceManager, meta: { permissions: ['providers.commerce.manage'] } },
      { path: 'content/pages', component: PagesManager, meta: { permissions: ['content.pages.manage'] } },
      { path: 'content/navigation', component: NavigationManager, meta: { permissions: ['content.navigation.manage'] } },
      { path: 'content/media', component: MediaLibrary, meta: { permissions: ['content.media.manage'] } },
      { path: 'content/seo', component: SeoSettings, meta: { permissions: ['content.seo.manage'] } },
      { path: 'content/blog', component: BlogManager, meta: { permissions: ['content.blog.manage'] } },
      { path: 'content/blog/new', component: BlogForm, meta: { permissions: ['content.blog.manage'] } },
      { path: 'content/blog/:id', component: BlogForm, meta: { permissions: ['content.blog.manage'] } },
      { path: 'reservations', component: ReservationsManager, meta: { permissions: ['reservations.view'] } },
      { path: 'settings/app', component: AppSettings, meta: { permissions: ['settings.app.manage'] } },
      { path: 'settings/access-control', component: AccessControl, meta: { permissions: ['users.view', 'roles.view'] } },
    ],
  },
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to) => {
  const token = getToken()
  if (to.meta.requiresAuth && !token) return '/login'
  if (to.meta.guestOnly && token) return '/dashboard'
  const requiredPermissions = to.meta.permissions ?? []
  if (requiredPermissions.length && !hasAnyPermission(requiredPermissions)) {
    return '/unauthorized'
  }
  return true
})

export default router

