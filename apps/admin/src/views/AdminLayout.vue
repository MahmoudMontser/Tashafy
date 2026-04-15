<template>
  <div :dir="dir" class="admin-shell" :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
    <aside class="admin-sidebar">
      <div class="admin-brand-wrap">
        <button type="button" class="sidebar-toggle-btn" @click="toggleSidebar">
          <el-icon><component :is="isSidebarCollapsed ? Expand : Fold" /></el-icon>
        </button>
        <img
          class="admin-brand-logo"
          src="/branding/logo.png"
          alt="Tashafy"
          width="72"
          height="32"
        />
        <small v-if="!isSidebarCollapsed" class="admin-brand-sub">{{ $t('adminPanelShort') }}</small>
      </div>
      <el-menu class="admin-menu" router :default-active="route.path" :collapse="isSidebarCollapsed" :collapse-transition="false">
        <p v-if="!isSidebarCollapsed" class="menu-section-label">{{ $t('mainMenu') }}</p>
        <el-menu-item index="/dashboard">
          <el-icon><House /></el-icon>
          <span>{{ $t('dashboard') }}</span>
        </el-menu-item>
        <el-sub-menu v-if="canAccessContent" index="content">
          <template #title>
            <el-icon><Grid /></el-icon>
            <span>{{ $t('contentManagement') }}</span>
          </template>
          <el-menu-item v-if="canManagePages" index="/content/pages">
            <el-icon><Document /></el-icon>
            <span>{{ $t('contentPages') }}</span>
          </el-menu-item>
          <el-menu-item v-if="canManageNavigation" index="/content/navigation">
            <el-icon><Menu /></el-icon>
            <span>{{ $t('navigationMenu') }}</span>
          </el-menu-item>
          <el-menu-item v-if="canManageMedia" index="/content/media">
            <el-icon><Picture /></el-icon>
            <span>{{ $t('mediaLibrary') }}</span>
          </el-menu-item>
          <el-menu-item v-if="canManageSeo" index="/content/seo">
            <el-icon><DataAnalysis /></el-icon>
            <span>{{ $t('seoSettings') }}</span>
          </el-menu-item>
          <el-menu-item v-if="canManageBlog" index="/content/blog">
            <el-icon><EditPen /></el-icon>
            <span>{{ $t('blogManager') }}</span>
          </el-menu-item>
        </el-sub-menu>
        <p v-if="!isSidebarCollapsed" class="menu-section-label">{{ $t('operations') }}</p>
        <el-menu-item v-if="canViewProviders" index="/providers">
          <el-icon><OfficeBuilding /></el-icon>
          <span>{{ $t('providers') }}</span>
        </el-menu-item>
        <el-menu-item v-if="canViewReservations" index="/reservations">
          <el-icon><Calendar /></el-icon>
          <span>{{ $t('reservations') }}</span>
        </el-menu-item>
        <el-menu-item v-if="canManageSettings" index="/settings/app">
          <el-icon><Setting /></el-icon>
          <span>{{ $t('appSettings') }}</span>
        </el-menu-item>
        <el-menu-item v-if="canManageAccessControl" index="/settings/access-control">
          <el-icon><User /></el-icon>
          <span>{{ $t('accessControl') }}</span>
        </el-menu-item>
      </el-menu>

      <el-button v-if="!isSidebarCollapsed && canCreateProviders" class="admin-quick-btn" type="primary" @click="router.push('/providers/new')">
        + {{ $t('create') }}
      </el-button>
      <el-tooltip v-else-if="canCreateProviders" :content="$t('create')" placement="right">
        <el-button class="admin-quick-btn admin-quick-btn-icon" type="primary" @click="router.push('/providers/new')">
          <el-icon><Plus /></el-icon>
        </el-button>
      </el-tooltip>

      <div class="admin-user-card" :class="{ compact: isSidebarCollapsed }">
        <strong>{{ userName }}</strong>
        <small v-if="!isSidebarCollapsed">{{ userEmail }}</small>
      </div>

      <el-button v-if="!isSidebarCollapsed" class="admin-logout-btn" @click="logout">
        {{ $t('logout') }}
      </el-button>
      <el-tooltip v-else :content="$t('logout')" placement="right">
        <el-button class="admin-logout-btn admin-quick-btn-icon" @click="logout">
          <el-icon><SwitchButton /></el-icon>
        </el-button>
      </el-tooltip>
    </aside>

    <main class="admin-main">
      <div class="admin-header-shell">
        <header class="admin-topbar">
          <div class="topbar-main">
            <small class="topbar-kicker">TASHAFY ADMIN</small>
            <h1 class="topbar-title">{{ currentTitle }}</h1>
          </div>
          <div class="topbar-tools">
            <el-button class="topbar-action-btn" @click="toggleSidebar">
              <el-icon><component :is="isSidebarCollapsed ? Expand : Fold" /></el-icon>
            </el-button>
            <el-dropdown trigger="click" @command="setLocale">
              <el-button class="topbar-action-btn topbar-lang-trigger" type="default" :aria-label="$t('languageSwitcher')">
                <img class="topbar-lang-flag" :src="currentFlagSrc" alt="" width="20" height="14" draggable="false" />
                <el-icon class="topbar-lang-caret"><ArrowDown /></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="ar">
                    <span class="lang-option">
                      <img class="topbar-lang-flag-sm" src="/flags/sa.svg" alt="" width="22" height="15" draggable="false" />
                      {{ $t('localeArabicSaudi') }}
                    </span>
                  </el-dropdown-item>
                  <el-dropdown-item command="en">
                    <span class="lang-option">
                      <img class="topbar-lang-flag-sm" src="/flags/gb.svg" alt="" width="22" height="15" draggable="false" />
                      {{ $t('localeEnglishUK') }}
                    </span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-autocomplete
              v-model="searchText"
              class="topbar-search"
              :fetch-suggestions="querySearch"
              :placeholder="$t('topbarSearchPlaceholder')"
              clearable
              @select="handleSearchSelect"
            />
            <el-dropdown @command="handleQuickAction">
              <el-button class="topbar-action-btn">
                {{ $t('quickActions') }}
                <el-icon class="el-icon--right"><ArrowDown /></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item v-if="canViewProviders" command="/providers">{{ $t('openProviders') }}</el-dropdown-item>
                  <el-dropdown-item v-if="canManagePages" command="/content/pages">{{ $t('openPages') }}</el-dropdown-item>
                  <el-dropdown-item v-if="canManageBlog" command="/content/blog">{{ $t('openBlog') }}</el-dropdown-item>
                  <el-dropdown-item v-if="canManageNavigation" command="/content/navigation">{{ $t('openNavigation') }}</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-button v-if="canCreateProviders" type="primary" @click="router.push('/providers/new')">
              + {{ $t('addProvider') }}
            </el-button>
          </div>
        </header>
      </div>
      <div class="admin-breadcrumb-bar">
        <el-breadcrumb class="admin-breadcrumb" separator="/">
          <el-breadcrumb-item
            v-for="(item, index) in breadcrumbItems"
            :key="`${index}-${item.label}`"
            :to="item.path ? { path: item.path } : undefined"
          >
            {{ item.label }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { ArrowDown, Calendar, DataAnalysis, Document, EditPen, Expand, Fold, Grid, House, Menu, OfficeBuilding, Picture, Plus, Setting, SwitchButton, User } from '@element-plus/icons-vue'
import { clearSession, getCurrentUser, hasPermission } from '../composables/useAuth'

const router = useRouter()
const route = useRoute()
const { locale, t } = useI18n()
const user = getCurrentUser()

const dir = computed(() => (locale.value === 'ar' ? 'rtl' : 'ltr'))
const currentFlagSrc = computed(() => (locale.value === 'ar' ? '/flags/sa.svg' : '/flags/gb.svg'))
const searchText = ref('')
const isSidebarCollapsed = ref(localStorage.getItem('admin.sidebar.collapsed') === '1')
const userName = computed(() => user?.name || 'Admin')
const userEmail = computed(() => user?.email || 'admin@tashafy.com')
const canViewProviders = computed(() => hasPermission('providers.view'))
const canCreateProviders = computed(() => hasPermission('providers.create'))
const canViewReservations = computed(() => hasPermission('reservations.view'))
const canManageSettings = computed(() => hasPermission('settings.app.manage'))
const canManagePages = computed(() => hasPermission('content.pages.manage'))
const canManageNavigation = computed(() => hasPermission('content.navigation.manage'))
const canManageMedia = computed(() => hasPermission('content.media.manage'))
const canManageSeo = computed(() => hasPermission('content.seo.manage'))
const canManageBlog = computed(() => hasPermission('content.blog.manage'))
const canManageAccessControl = computed(() => hasPermission('users.view') || hasPermission('roles.view'))
const canAccessContent = computed(() => (
  canManagePages.value
  || canManageNavigation.value
  || canManageMedia.value
  || canManageSeo.value
  || canManageBlog.value
))
const currentTitle = computed(() => {
  if (route.path.startsWith('/providers')) return t('providers')
  if (route.path.startsWith('/content/pages')) return t('contentPages')
  if (route.path.startsWith('/content/navigation')) return t('navigationMenu')
  if (route.path.startsWith('/content/media')) return t('mediaLibrary')
  if (route.path.startsWith('/content/seo')) return t('seoSettings')
  if (route.path.startsWith('/content/blog')) return t('blogManager')
  if (route.path.startsWith('/reservations')) return t('reservations')
  if (route.path.startsWith('/settings/access-control')) return t('accessControl')
  if (route.path.startsWith('/settings')) return t('appSettings')
  return t('dashboard')
})

function dedupeBreadcrumb(items) {
  return items.filter((entry, i) => i === 0 || entry.label !== items[i - 1].label)
}

const breadcrumbItems = computed(() => {
  const path = route.path
  const items = [{ label: t('dashboard'), path: '/dashboard' }]

  if (path.startsWith('/providers')) {
    items.push({ label: t('providers'), path: '/providers' })
    if (path.endsWith('/new')) items.push({ label: t('create') })
    else if (path.includes('/commerce')) items.push({ label: t('commerceTitle') })
    else if (/^\/providers\/[^/]+$/.test(path)) items.push({ label: t('edit') })
    return dedupeBreadcrumb(items)
  }

  if (path.startsWith('/content/')) {
    items.push({ label: t('contentManagement'), path: '/content/pages' })
    if (path.startsWith('/content/pages')) items.push({ label: t('contentPages') })
    else if (path.startsWith('/content/navigation')) items.push({ label: t('navigationMenu') })
    else if (path.startsWith('/content/media')) items.push({ label: t('mediaLibrary') })
    else if (path.startsWith('/content/seo')) items.push({ label: t('seoSettings') })
    else if (path.startsWith('/content/blog')) items.push({ label: t('blogManager') })
    return dedupeBreadcrumb(items)
  }

  if (path.startsWith('/reservations')) {
    items.push({ label: t('reservations'), path: '/reservations' })
    return dedupeBreadcrumb(items)
  }

  if (path.startsWith('/settings/')) {
    if (path.startsWith('/settings/access-control')) items.push({ label: t('accessControl'), path: '/settings/access-control' })
    else items.push({ label: t('appSettings'), path: '/settings/app' })
    return dedupeBreadcrumb(items)
  }

  return dedupeBreadcrumb(items)
})

const quickLinks = computed(() => [
  { value: t('dashboard'), path: '/dashboard', allowed: true },
  { value: t('providers'), path: '/providers', allowed: canViewProviders.value },
  { value: t('contentPages'), path: '/content/pages', allowed: canManagePages.value },
  { value: t('navigationMenu'), path: '/content/navigation', allowed: canManageNavigation.value },
  { value: t('mediaLibrary'), path: '/content/media', allowed: canManageMedia.value },
  { value: t('seoSettings'), path: '/content/seo', allowed: canManageSeo.value },
  { value: t('blogManager'), path: '/content/blog', allowed: canManageBlog.value },
  { value: t('reservations'), path: '/reservations', allowed: canViewReservations.value },
  { value: t('appSettings'), path: '/settings/app', allowed: canManageSettings.value },
  { value: t('accessControl'), path: '/settings/access-control', allowed: canManageAccessControl.value },
].filter((item) => item.allowed))

function querySearch(queryString, cb) {
  const q = queryString.trim().toLowerCase()
  const items = q
    ? quickLinks.value.filter((item) => item.value.toLowerCase().includes(q))
    : quickLinks.value
  cb(items)
}

function handleSearchSelect(item) {
  if (item?.path) router.push(item.path)
  searchText.value = ''
}

function handleQuickAction(path) {
  if (path) router.push(path)
}

function toggleSidebar() {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
  localStorage.setItem('admin.sidebar.collapsed', isSidebarCollapsed.value ? '1' : '0')
}

function setLocale(code) {
  if (code === 'ar' || code === 'en') locale.value = code
}

function logout() {
  clearSession()
  router.push('/login')
}
</script>

