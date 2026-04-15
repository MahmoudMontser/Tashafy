<template>
  <div>
    <div class="panel-header">
      <h2 class="panel-title">{{ $t('contentPages') }}</h2>
      <el-button type="primary" @click="openCreate">{{ $t('createPage') }}</el-button>
    </div>

    <el-card class="panel-card">
      <el-table :data="pages" style="width: 100%" v-loading="loading">
        <el-table-column prop="title" :label="$t('name')" />
        <el-table-column prop="slug" label="Slug" width="220" />
        <el-table-column prop="updatedAt" :label="$t('updatedAt')" width="180" />
        <el-table-column :label="$t('status')" width="130">
          <template #default="{ row }">
            <el-tag :type="row.status === 'published' ? 'success' : 'warning'">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('actions')" width="280" align="right">
          <template #default="{ row }">
            <div class="table-actions">
              <el-button size="small" @click="selectPage(row)">{{ $t('sections') }}</el-button>
              <el-button
                size="small"
                plain
                type="primary"
                :loading="isPending(`page-t-${row.id}`)"
                @click="toggleStatus(row)"
              >
                {{ row.status === 'published' ? $t('setDraft') : $t('publish') }}
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card class="panel-card" style="margin-top: 16px" v-if="selectedPage">
      <div class="panel-header">
        <h3 class="panel-title">Sections: {{ selectedPage.key }}</h3>
        <el-button type="primary" @click="addSection">Add Section</el-button>
      </div>
      <el-table :data="sections" style="width: 100%" v-loading="sectionsLoading">
        <el-table-column prop="key" label="Key" width="180" />
        <el-table-column prop="sort_order" label="Order" width="100" />
        <el-table-column label="Enabled" width="110">
          <template #default="{ row }">
            <el-switch :model-value="row.is_enabled" @change="(v) => patchSection(row, { is_enabled: v })" />
          </template>
        </el-table-column>
        <el-table-column label="Content">
          <template #default="{ row }">
            <el-input
              type="textarea"
              :rows="3"
              :model-value="JSON.stringify(row.content ?? {}, null, 2)"
              @change="(v) => onContentChange(row, v)"
            />
          </template>
        </el-table-column>
        <el-table-column :label="$t('actions')" width="260" align="right">
          <template #default="{ row }">
            <div class="table-actions">
              <el-button size="small" @click="openEditor(row)">{{ $t('edit') }}</el-button>
              <el-button
                size="small"
                type="primary"
                plain
                :loading="isPending(`sec-s-${row.id}`)"
                @click="saveSection(row)"
              >
                {{ $t('save') }}
              </el-button>
              <el-button
                size="small"
                type="danger"
                plain
                :loading="isPending(`sec-d-${row.id}`)"
                @click="removeSection(row)"
              >
                {{ $t('delete') }}
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      v-model="editorOpen"
      class="admin-dialog"
      width="760px"
      :title="`Edit Section: ${editorSection?.key || ''}`"
    >
      <template v-if="editorSection">
        <el-alert
          v-if="activeTemplate.fields.length"
          type="info"
          :closable="false"
          title="Using section template form for faster editing."
          style="margin-bottom: 12px"
        />
        <el-form label-position="top" class="admin-form" v-if="activeTemplate.fields.length">
          <el-form-item v-for="field in activeTemplate.fields" :key="field.path" :label="field.label">
            <el-input
              v-if="field.type === 'text'"
              :model-value="getFieldValue(field.path)"
              @update:model-value="(v) => setFieldValue(field.path, v)"
            />
            <el-input
              v-else
              type="textarea"
              :rows="field.rows || 4"
              :model-value="getFieldValue(field.path)"
              @update:model-value="(v) => setFieldValue(field.path, v)"
            />
          </el-form-item>
        </el-form>
        <el-divider />
        <el-form-item label="Raw JSON (advanced)">
          <el-input
            type="textarea"
            :rows="10"
            :model-value="editorJson"
            @change="onEditorJsonChange"
          />
        </el-form-item>
      </template>
      <template #footer>
        <div class="dialog-footer-actions">
          <el-button @click="editorOpen = false">{{ $t('cancel') }}</el-button>
          <el-button type="primary" :loading="savingEditor" @click="saveEditor">{{ $t('save') }}</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { createPage, createSection, deleteSection, fetchPages, fetchSections, updatePage, updateSection } from '../../api/content'
import { usePendingKeys } from '../../composables/usePendingKeys'

const { t } = useI18n()
const { isPending, run } = usePendingKeys()
const loading = ref(false)
const savingEditor = ref(false)
const pages = ref([])
const selectedPage = ref(null)
const sections = ref([])
const sectionsLoading = ref(false)
const editorOpen = ref(false)
const editorSection = ref(null)
const editorContent = ref({})

const sectionTemplates = {
  hero: {
    fields: [
      { path: 'title', label: 'Title', type: 'text' },
      { path: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 3 },
      { path: 'ctaLabel', label: 'CTA Label', type: 'text' },
      { path: 'ctaHref', label: 'CTA URL', type: 'text' },
    ],
  },
  journey: {
    fields: [
      { path: 'title', label: 'Title', type: 'text' },
      { path: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 3 },
      { path: 'buttonHref', label: 'Button URL', type: 'text' },
    ],
  },
  services: {
    fields: [
      { path: 'title', label: 'Title', type: 'text' },
      { path: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 3 },
    ],
  },
  vision: {
    fields: [
      { path: 'title', label: 'Title', type: 'text' },
      { path: 'description', label: 'Description', type: 'textarea', rows: 4 },
    ],
  },
  mission: {
    fields: [
      { path: 'title', label: 'Title', type: 'text' },
      { path: 'description', label: 'Description', type: 'textarea', rows: 4 },
      { path: 'ctaHref', label: 'CTA URL', type: 'text' },
    ],
  },
  why: {
    fields: [
      { path: 'title', label: 'Title', type: 'text' },
      { path: 'description', label: 'Description', type: 'textarea', rows: 4 },
    ],
  },
}

const activeTemplate = computed(() => {
  const key = editorSection.value?.key || ''
  return sectionTemplates[key] || { fields: [] }
})

const editorJson = computed(() => JSON.stringify(editorContent.value ?? {}, null, 2))

async function loadPages() {
  loading.value = true
  try {
    const data = await fetchPages({ per_page: 100 })
    pages.value = (data.data || []).map((p) => ({
      ...p,
      title_i18n: p.title || { ar: p.key, en: p.key },
      title: p.title?.ar || p.title?.en || p.key,
      updatedAt: p.updated_at?.slice(0, 10),
    }))
  } finally {
    loading.value = false
  }
}

async function openCreate() {
  const key = await ElMessageBox.prompt('Page key (example: home)', 'Create Page').then((v) => v.value).catch(() => '')
  if (!key) return
  await createPage({
    key,
    slug: key === 'home' ? '/' : `/${key}`,
    title: { ar: key, en: key },
    status: 'draft',
  })
  ElMessage.success('Page created')
  await loadPages()
}

async function toggleStatus(row) {
  await run(`page-t-${row.id}`, async () => {
    await updatePage(row.id, {
      key: row.key,
      slug: row.slug,
      title: row.title_i18n || { ar: row.title, en: row.title },
      status: row.status === 'published' ? 'draft' : 'published',
    })
    await loadPages()
  })
}

async function selectPage(row) {
  selectedPage.value = row
  sectionsLoading.value = true
  try {
    const data = await fetchSections({ page_id: row.id, per_page: 100 })
    sections.value = data.data || []
  } finally {
    sectionsLoading.value = false
  }
}

async function addSection() {
  if (!selectedPage.value) return
  const key = await ElMessageBox.prompt('Section key (example: hero)', 'Add Section').then((v) => v.value).catch(() => '')
  if (!key) return
  await createSection({
    page_id: selectedPage.value.id,
    key,
    sort_order: sections.value.length + 1,
    is_enabled: true,
    content: {},
  })
  await selectPage(selectedPage.value)
}

function onContentChange(row, value) {
  try {
    row.content = JSON.parse(value)
  } catch {
    ElMessage.error('Invalid JSON content')
  }
}

function getByPath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc && typeof acc === 'object' ? acc[key] : ''), obj) ?? ''
}

function setByPath(obj, path, value) {
  const keys = path.split('.')
  let cur = obj
  for (let i = 0; i < keys.length - 1; i += 1) {
    const k = keys[i]
    if (!cur[k] || typeof cur[k] !== 'object') cur[k] = {}
    cur = cur[k]
  }
  cur[keys[keys.length - 1]] = value
}

function getFieldValue(path) {
  return getByPath(editorContent.value, path)
}

function setFieldValue(path, value) {
  const next = JSON.parse(JSON.stringify(editorContent.value || {}))
  setByPath(next, path, value)
  editorContent.value = next
}

function openEditor(row) {
  editorSection.value = row
  editorContent.value = JSON.parse(JSON.stringify(row.content || {}))
  editorOpen.value = true
}

function onEditorJsonChange(value) {
  try {
    editorContent.value = JSON.parse(value)
  } catch {
    ElMessage.error('Invalid JSON content')
  }
}

async function patchSection(row, patch) {
  await updateSection(row.id, {
    page_id: row.page_id,
    key: row.key,
    sort_order: row.sort_order,
    is_enabled: row.is_enabled,
    content: row.content || {},
    ...patch,
  })
}

async function saveSection(row) {
  await run(`sec-s-${row.id}`, async () => {
    await patchSection(row, {})
    ElMessage.success(t('saved'))
  })
}

async function saveEditor() {
  if (!editorSection.value) return
  savingEditor.value = true
  try {
    await patchSection(editorSection.value, { content: editorContent.value || {} })
    editorSection.value.content = editorContent.value
    editorOpen.value = false
    ElMessage.success(t('saved'))
  } finally {
    savingEditor.value = false
  }
}

async function removeSection(row) {
  await run(`sec-d-${row.id}`, async () => {
    await deleteSection(row.id)
    await selectPage(selectedPage.value)
  })
}

onMounted(loadPages)
</script>
