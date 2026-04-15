<template>
  <div>
    <div class="panel-header">
      <h2 class="panel-title">{{ $t('navigationMenu') }}</h2>
      <el-button type="primary" @click="addItem">{{ $t('addMenuItem') }}</el-button>
    </div>

    <el-card class="panel-card">
      <el-table :data="items" style="width: 100%" v-loading="loading">
        <el-table-column label="Label (AR)">
          <template #default="{ row }">
            <el-input v-model="row.label.ar" />
          </template>
        </el-table-column>
        <el-table-column label="Label (EN)">
          <template #default="{ row }">
            <el-input v-model="row.label.en" />
          </template>
        </el-table-column>
        <el-table-column prop="path" label="Path" />
        <el-table-column prop="sort_order" label="#" width="80" />
        <el-table-column :label="$t('actions')" width="240" align="right">
          <template #default="{ row }">
            <div class="table-actions">
              <el-button
                size="small"
                type="primary"
                plain
                :loading="isPending(`nav-s-${row.id}`)"
                @click="saveRow(row)"
              >
                {{ $t('save') }}
              </el-button>
              <el-button
                size="small"
                type="danger"
                plain
                :loading="isPending(`nav-d-${row.id}`)"
                @click="removeRow(row)"
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
import { ElMessage, ElMessageBox } from 'element-plus'
import { createNavigation, deleteNavigation, fetchNavigation, updateNavigation } from '../../api/content'
import { usePendingKeys } from '../../composables/usePendingKeys'

const { t } = useI18n()
const { isPending, run } = usePendingKeys()
const items = ref([])
const loading = ref(false)

async function loadItems() {
  loading.value = true
  try {
    const data = await fetchNavigation({ group: 'header', per_page: 100 })
    items.value = data.data || []
  } finally {
    loading.value = false
  }
}

async function addItem() {
  const path = await ElMessageBox.prompt('Path (example: /ar/about-us)', 'Add Menu Item').then((v) => v.value).catch(() => '')
  if (!path) return
  await createNavigation({
    group: 'header',
    label: { ar: 'عن تشافي', en: 'About' },
    path,
    sort_order: items.value.length + 1,
    is_enabled: true,
  })
  await loadItems()
}

async function saveRow(row) {
  await run(`nav-s-${row.id}`, async () => {
    await updateNavigation(row.id, {
      group: row.group || 'header',
      label: row.label,
      path: row.path,
      sort_order: row.sort_order ?? 0,
      is_enabled: row.is_enabled ?? true,
    })
    ElMessage.success(t('saved'))
  })
}

async function removeRow(row) {
  await run(`nav-d-${row.id}`, async () => {
    await deleteNavigation(row.id)
    await loadItems()
  })
}

onMounted(loadItems)
</script>
