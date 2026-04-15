<template>
  <div class="page-form-wrap">
    <el-card class="panel-card seo-settings-card" v-loading="loading">
      <p class="page-form-lead">{{ $t('seoSettingsLead') }}</p>
      <el-form label-position="top" class="admin-form seo-settings-form">
        <el-form-item :label="$t('defaultMetaTitle')">
          <el-input v-model="model.title" :placeholder="$t('defaultMetaTitlePlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('defaultMetaDescription')">
          <el-input
            v-model="model.description"
            type="textarea"
            :rows="4"
            :placeholder="$t('defaultMetaDescriptionPlaceholder')"
          />
        </el-form-item>
        <el-form-item :label="$t('robotsLabel')">
          <el-select v-model="model.robots" class="seo-robots-select">
            <el-option :label="$t('robotsIndexFollow')" value="index, follow" />
            <el-option :label="$t('robotsNoindexNofollow')" value="noindex, nofollow" />
          </el-select>
        </el-form-item>
      </el-form>
      <div class="page-form-footer">
        <el-button type="primary" :loading="saving" @click="save">{{ $t('save') }}</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { fetchSetting, saveSetting } from '../../api/content'

const { t } = useI18n()

const model = reactive({
  title: 'Tashafy - Healthcare & Wellness',
  description: 'Multi-language healthcare platform focused on patient journey and discovery.',
  robots: 'index, follow',
})

const loading = ref(false)
const saving = ref(false)

async function load() {
  loading.value = true
  try {
    const res = await fetchSetting('seo.default')
    if (res?.value) {
      model.title = res.value.title || model.title
      model.description = res.value.description || model.description
      model.robots = res.value.robots || model.robots
    }
  } finally {
    loading.value = false
  }
}

async function save() {
  saving.value = true
  try {
    await saveSetting('seo.default', { ...model })
    ElMessage.success(t('seoSaved'))
  } finally {
    saving.value = false
  }
}

onMounted(load)
</script>
