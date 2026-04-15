<template>
  <div class="login-shell" :dir="isRtl ? 'rtl' : 'ltr'">
    <el-card class="login-card panel-card">
      <div class="login-layout">
        <section class="login-hero">
          <div class="login-brand-mark">
            <img class="login-brand-logo" src="/branding/logo.png" alt="Tashafy" width="72" height="32" />
          </div>
          <p class="login-brand-admin">{{ $t('adminWorkspace') }}</p>
          <h1 class="login-hero-title">{{ $t('loginWelcomeTitle') }}</h1>
          <p class="login-help">{{ $t('loginSubtitle') }}</p>
          <ul class="login-feature-list">
            <li>{{ $t('loginFeatureContent') }}</li>
            <li>{{ $t('loginFeatureProviders') }}</li>
            <li>{{ $t('loginFeaturePublishing') }}</li>
          </ul>
        </section>

        <section class="login-form-area">
          <h2 class="login-form-title">{{ $t('login') }}</h2>
          <p class="login-form-subtitle">{{ $t('loginFormLead') }}</p>
          <el-form @submit.prevent="submit" label-position="top" class="login-form">
            <el-form-item :label="$t('email')">
              <el-input
                v-model="email"
                class="login-input"
                size="large"
                autocomplete="username"
                :placeholder="$t('loginEmailPlaceholder')"
              >
                <template #prefix>
                  <el-icon class="login-input-icon"><Message /></el-icon>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item :label="$t('password')">
              <el-input
                v-model="password"
                class="login-input"
                type="password"
                show-password
                size="large"
                autocomplete="current-password"
                :placeholder="$t('loginPasswordPlaceholder')"
              >
                <template #prefix>
                  <el-icon class="login-input-icon"><Lock /></el-icon>
                </template>
              </el-input>
            </el-form-item>

            <el-alert v-if="error" :title="error" type="error" :closable="false" class="login-error" />
            <el-button type="primary" native-type="submit" :loading="loading" class="login-submit">
              {{ $t('login') }}
            </el-button>
          </el-form>
        </section>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Lock, Message } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { http } from '../api/http'
import { setSession } from '../composables/useAuth'

const router = useRouter()
const { locale } = useI18n()
const email = ref('admin@tashafy.com')
const password = ref('Password123!')
const loading = ref(false)
const error = ref('')
const isRtl = computed(() => locale.value === 'ar')

async function submit() {
  loading.value = true
  error.value = ''
  try {
    const { data } = await http.post('/admin/login', {
      email: email.value,
      password: password.value,
    })
    setSession(data.token, data.user ?? null)
    router.push('/dashboard')
  } catch {
    error.value = 'Login failed. Please check credentials or API availability.'
  } finally {
    loading.value = false
  }
}
</script>

