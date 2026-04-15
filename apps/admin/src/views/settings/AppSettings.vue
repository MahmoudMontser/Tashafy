<template>
  <div class="page-form-wrap app-settings-wrap">
    <el-card class="panel-card" v-loading="loading">
      <div class="panel-header">
        <h2 class="panel-title">{{ $t('appSettings') }}</h2>
      </div>

      <el-form label-position="top" class="admin-form">
        <h3 class="settings-section-title">{{ $t('settingsBrand') }}</h3>
        <el-row :gutter="12">
          <el-col :span="12">
            <el-form-item :label="$t('settingsSiteName')">
              <el-input v-model="model.site_name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('settingsTagline')">
              <el-input v-model="model.tagline" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('settingsLogoAr')">
              <el-input v-model="model.logo_ar" placeholder="/logo_ar.svg" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('settingsLogoEn')">
              <el-input v-model="model.logo_en" placeholder="/logo_en.svg" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('settingsLogoNavAr')">
              <el-input v-model="model.logo_nav_ar" placeholder="/logo_white_ar.svg" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('settingsLogoNavEn')">
              <el-input v-model="model.logo_nav_en" placeholder="/logo_white_en.svg" />
            </el-form-item>
          </el-col>
        </el-row>

        <h3 class="settings-section-title">{{ $t('settingsContacts') }}</h3>
        <el-row :gutter="12">
          <el-col :span="8">
            <el-form-item :label="$t('email')">
              <el-input v-model="model.contact_email" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('settingsPhone')">
              <el-input v-model="model.contact_phone" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('settingsWhatsapp')">
              <el-input v-model="model.contact_whatsapp" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('settingsFacebook')">
              <el-input v-model="model.social_facebook" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('settingsX')">
              <el-input v-model="model.social_x" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('settingsInstagram')">
              <el-input v-model="model.social_instagram" />
            </el-form-item>
          </el-col>
        </el-row>

        <h3 class="settings-section-title">{{ $t('settingsSeo') }}</h3>
        <el-row :gutter="12">
          <el-col :span="12">
            <el-form-item :label="$t('settingsDomain')">
              <el-input v-model="model.site_domain" :placeholder="$t('settingsDomainPlaceholder')" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('defaultMetaTitle')">
              <el-input v-model="model.default_title" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('defaultMetaDescription')">
              <el-input v-model="model.default_description" />
            </el-form-item>
          </el-col>
        </el-row>

        <h3 class="settings-section-title">{{ $t('settingsMaintenance') }}</h3>
        <el-row :gutter="12">
          <el-col :span="8">
            <el-form-item :label="$t('settingsMaintenanceEnabled')">
              <el-switch v-model="model.maintenance_enabled" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('settingsMaintenanceTitleAr')">
              <el-input v-model="model.maintenance_title_ar" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('settingsMaintenanceTitleEn')">
              <el-input v-model="model.maintenance_title_en" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('settingsMaintenanceMessageAr')">
              <el-input v-model="model.maintenance_message_ar" type="textarea" :rows="3" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('settingsMaintenanceMessageEn')">
              <el-input v-model="model.maintenance_message_en" type="textarea" :rows="3" />
            </el-form-item>
          </el-col>
        </el-row>
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
const loading = ref(false)
const saving = ref(false)

const model = reactive({
  site_name: 'Tashafy',
  tagline: '',
  logo_ar: '/logo_ar.svg',
  logo_en: '/logo_en.svg',
  logo_nav_ar: '/logo_white_ar.svg',
  logo_nav_en: '/logo_white_en.svg',
  contact_email: '',
  contact_phone: '',
  contact_whatsapp: '',
  social_facebook: '',
  social_x: '',
  social_instagram: '',
  site_domain: '',
  default_title: 'Tashafy',
  default_description: 'Tashafy is a platform for managing your business.',
  maintenance_enabled: false,
  maintenance_title_ar: 'الموقع تحت الصيانة',
  maintenance_title_en: 'Site under maintenance',
  maintenance_message_ar: 'نعتذر، الموقع غير متاح حالياً.',
  maintenance_message_en: 'Sorry, the site is temporarily unavailable.',
})

async function load() {
  loading.value = true
  try {
    const res = await fetchSetting('app.frontend')
    if (res?.value && typeof res.value === 'object') {
      Object.assign(model, res.value)
    }
  } catch {
    // keep defaults
  } finally {
    loading.value = false
  }
}

async function save() {
  saving.value = true
  try {
    await saveSetting('app.frontend', { ...model })
    ElMessage.success(t('saved'))
  } finally {
    saving.value = false
  }
}

onMounted(load)
</script>
