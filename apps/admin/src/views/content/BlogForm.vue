<template>
  <div>
    <div class="panel-header">
      <h2 class="panel-title">{{ isEdit ? 'Edit Blog Post' : 'Create Blog Post' }}</h2>
      <el-button @click="router.push('/content/blog')">{{ $t('cancel') }}</el-button>
    </div>

    <el-card class="panel-card">
      <el-form label-position="top" class="admin-form" v-loading="loading">
        <el-row :gutter="12">
          <el-col :span="12">
            <el-form-item label="Slug">
              <el-input v-model="form.slug" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Category">
              <el-input v-model="form.category" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="12">
            <el-form-item label="Title (AR)">
              <el-input v-model="form.title.ar" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Title (EN)">
              <el-input v-model="form.title.en" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="12">
            <el-form-item label="Excerpt (AR)">
              <el-input v-model="form.excerpt.ar" type="textarea" :rows="2" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Excerpt (EN)">
              <el-input v-model="form.excerpt.en" type="textarea" :rows="2" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="Cover Image URL">
          <el-input v-model="form.cover_image" />
        </el-form-item>
        <el-row :gutter="12">
          <el-col :span="12">
            <el-form-item label="Body (AR)">
              <div class="blog-editor-wrap" dir="rtl">
                <div class="blog-editor-meta">
                  <span>{{ bodyWordCount(form.body_ar) }} words</span>
                </div>
                <QuillEditor
                  v-model:content="form.body_ar"
                  content-type="html"
                  theme="snow"
                  class="blog-editor"
                  :toolbar="toolbarOptions"
                />
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Body (EN)">
              <div class="blog-editor-wrap" dir="ltr">
                <div class="blog-editor-meta">
                  <span>{{ bodyWordCount(form.body_en) }} words</span>
                </div>
                <QuillEditor
                  v-model:content="form.body_en"
                  content-type="html"
                  theme="snow"
                  class="blog-editor"
                  :toolbar="toolbarOptions"
                />
              </div>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="page-form-footer">
          <el-button @click="router.push('/content/blog')">{{ $t('cancel') }}</el-button>
          <el-button type="primary" :loading="saving" @click="save">{{ $t('save') }}</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { createBlogPost, fetchBlogPost, updateBlogPost } from '../../api/content'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const loading = ref(false)
const saving = ref(false)
const isEdit = computed(() => !!route.params.id)

const toolbarOptions = [
  [{ header: [1, 2, 3, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ align: [] }],
  ['link', 'blockquote', 'code-block'],
  ['clean'],
]

const form = reactive(resetForm())

function resetForm() {
  return {
    id: null,
    slug: '',
    title: { ar: '', en: '' },
    excerpt: { ar: '', en: '' },
    body_ar: '',
    body_en: '',
    category: '',
    cover_image: '',
    status: 'draft',
    is_featured: false,
    published_at: null,
  }
}

function assignForm(payload) {
  Object.assign(form, resetForm(), payload)
}

function bodyWordCount(html) {
  const text = String(html || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .trim()
  return text ? text.split(/\s+/).length : 0
}

async function load() {
  if (!isEdit.value) return
  loading.value = true
  try {
    const data = await fetchBlogPost(route.params.id)
    assignForm(data)
  } finally {
    loading.value = false
  }
}

async function save() {
  saving.value = true
  try {
    const payload = {
      slug: form.slug,
      title: form.title,
      excerpt: form.excerpt,
      body_ar: form.body_ar,
      body_en: form.body_en,
      category: form.category,
      cover_image: form.cover_image,
      status: form.status || 'draft',
      is_featured: !!form.is_featured,
      published_at: form.status === 'published' ? new Date().toISOString() : null,
    }
    if (isEdit.value) await updateBlogPost(route.params.id, payload)
    else await createBlogPost(payload)
    ElMessage.success(t('saved'))
    router.push('/content/blog')
  } finally {
    saving.value = false
  }
}

onMounted(load)
</script>
