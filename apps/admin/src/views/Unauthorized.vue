<template>
  <section class="unauthorized-page">
    <el-card shadow="never" class="unauthorized-card">
      <div class="unauthorized-glow unauthorized-glow-one" />
      <div class="unauthorized-glow unauthorized-glow-two" />

      <div class="unauthorized-content">
        <div class="unauthorized-badge">{{ $t('accessDeniedBadge') }}</div>
        <div class="unauthorized-icon-wrap">
          <el-icon><Lock /></el-icon>
        </div>
        <h1 class="unauthorized-title">{{ $t('accessDenied') }}</h1>
        <p class="unauthorized-lead">{{ $t('accessDeniedHelp') }}</p>
        <p class="unauthorized-sub">{{ $t('accessDeniedHint') }}</p>

        <div class="unauthorized-actions">
          <el-button type="primary" size="large" @click="goDashboard">
            {{ $t('backToDashboard') }}
          </el-button>
          <el-button size="large" @click="goBack">
            {{ $t('goBack') }}
          </el-button>
        </div>
      </div>
    </el-card>
  </section>
</template>

<script setup>
import { Lock } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function goDashboard() {
  router.push('/dashboard')
}

function goBack() {
  router.back()
}
</script>
