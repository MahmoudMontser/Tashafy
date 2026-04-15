export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n'],
  i18n: {
    locales: [
      { code: 'ar', name: 'Arabic', dir: 'rtl' },
      { code: 'en', name: 'English', dir: 'ltr' },
    ],
    defaultLocale: 'ar',
    strategy: 'prefix_except_default',
  },
})

