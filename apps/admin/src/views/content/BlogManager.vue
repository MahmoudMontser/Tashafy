<template>
  <div>
    <div class="panel-header">
      <h2 class="panel-title">{{ $t('blogManager') }}</h2>
      <el-button type="primary" @click="$router.push('/content/blog/new')">{{ $t('create') }}</el-button>
    </div>

    <el-card class="panel-card">
      <el-table :data="rows" style="width: 100%" v-loading="loading">
        <el-table-column prop="title.ar" label="Title (AR)" />
        <el-table-column prop="slug" label="Slug" width="200" />
        <el-table-column prop="category" label="Category" width="140" />
        <el-table-column prop="status" :label="$t('status')" width="120" />
        <el-table-column :label="$t('actions')" width="380" align="right">
          <template #default="{ row }">
            <div class="table-actions">
              <el-button size="small" @click="openEdit(row)">{{ $t('edit') }}</el-button>
              <el-button size="small" type="success" plain @click="preview(row)">{{ $t('preview') }}</el-button>
              <el-button
                size="small"
                plain
                type="primary"
                :loading="isPending(`blog-t-${row.id}`)"
                @click="toggleStatus(row)"
              >
                {{ row.status === 'published' ? $t('setDraft') : $t('publish') }}
              </el-button>
              <el-button
                size="small"
                type="danger"
                plain
                :loading="isPending(`blog-d-${row.id}`)"
                @click="remove(row)"
              >
                {{ $t('delete') }}
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { deleteBlogPost, fetchBlogPosts, fetchSetting, updateBlogPost } from '../../api/content'
import { usePendingKeys } from '../../composables/usePendingKeys'

const { locale, t } = useI18n()
const router = useRouter()
const { isPending, run } = usePendingKeys()
const loading = ref(false)
const rows = ref([])
const siteDomain = ref('')

async function load() {
  loading.value = true
  try {
    const [data, settings] = await Promise.all([
      fetchBlogPosts({ per_page: 100 }),
      fetchSetting('app.frontend').catch(() => null),
    ])
    rows.value = data.data || []
    siteDomain.value = settings?.value?.site_domain || ''
  } finally {
    loading.value = false
  }
}

function openEdit(row) {
  router.push(`/content/blog/${row.id}`)
}

function preview(row) {
  if (!row?.slug || typeof window === 'undefined') {
    ElMessage.warning(t('blogPreviewUnavailable'))
    return
  }
  const domain = String(siteDomain.value || '').trim()
  const normalizedBase = domain
    ? /^https?:\/\//i.test(domain) ? domain : `https://${domain}`
    : `http://${window.location.hostname || 'localhost'}:3000`
  const siteUrl = `${normalizedBase.replace(/\/$/, '')}/${locale.value || 'ar'}/blog/${encodeURIComponent(row.slug)}`
  window.open(siteUrl, '_blank', 'noopener,noreferrer')
}

async function toggleStatus(row) {
  await run(`blog-t-${row.id}`, async () => {
    await updateBlogPost(row.id, {
      ...row,
      status: row.status === 'published' ? 'draft' : 'published',
      published_at: row.status === 'published' ? null : new Date().toISOString(),
    })
    await load()
  })
}

async function remove(row) {
  await run(`blog-d-${row.id}`, async () => {
    await deleteBlogPost(row.id)
    await load()
  })
}

onMounted(load)
</script>
