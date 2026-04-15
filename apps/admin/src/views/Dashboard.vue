<template>
  <div class="dashboard-page">
    <div class="dashboard-head">
      <div>
        <h1 class="dashboard-title">{{ $t('dashboard') }}</h1>
        <p class="dashboard-subtitle">{{ $t('dashboardWelcome') }}</p>
      </div>
    </div>

    <el-row :gutter="16" class="dashboard-stats">
      <el-col :xs="24" :sm="12" :lg="6" v-for="item in stats" :key="item.key">
        <el-card class="panel-card stat-card" shadow="hover">
          <div class="stat-row">
            <div>
              <p class="stat-label">{{ item.label }}</p>
              <h3 class="stat-value">{{ item.value }}</h3>
            </div>
            <el-tag :type="item.tagType" effect="dark" round>{{ item.short }}</el-tag>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-card class="panel-card" shadow="never">
      <div class="panel-header">
        <h2 class="panel-title">{{ $t('recentProviders') }}</h2>
      </div>

      <el-table :data="rows" v-loading="loading" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column :label="$t('name')">
          <template #default="{ row }">
            <div>{{ row.name?.ar || row.name?.en || '-' }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="type" :label="$t('type')" width="180" />
        <el-table-column prop="status" :label="$t('status')" width="140" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { http } from '../api/http'

const { t } = useI18n()
const loading = ref(false)
const rows = ref([])

const stats = computed(() => [
  { key: 'all', label: t('totalCenters'), value: rows.value.length, short: t('all'), tagType: 'info' },
  {
    key: 'published',
    label: t('published'),
    value: rows.value.filter((r) => r.status === 'published').length,
    short: t('publishedShort'),
    tagType: 'success',
  },
  {
    key: 'draft',
    label: t('draft'),
    value: rows.value.filter((r) => r.status === 'draft').length,
    short: t('draftShort'),
    tagType: 'warning',
  },
  {
    key: 'featured',
    label: t('featured'),
    value: rows.value.filter((r) => r.is_featured).length,
    short: t('featuredShort'),
    tagType: 'primary',
  },
])

async function fetchRecent() {
  loading.value = true
  try {
    const { data } = await http.get('/admin/providers', { params: { page: 1, per_page: 5 } })
    rows.value = data.data || []
  } finally {
    loading.value = false
  }
}

onMounted(fetchRecent)
</script>
