<template>
  <div class="provider-form-page">
    <div class="panel-header">
      <h2 class="panel-title">{{ isNew ? 'Create Center' : 'Edit Center' }}</h2>
    </div>
    <div class="editor-grid">
      <el-card class="panel-card">
        <el-form label-position="top" class="admin-form">
          <el-row :gutter="12" class="provider-meta-row">
            <el-col :span="12">
              <el-form-item :label="$t('type')">
                <el-select v-model="form.type">
                  <el-option :label="$t('providerTypeRehab')" value="rehab_center" />
                  <el-option :label="$t('providerTypeWellness')" value="wellness_center" />
                  <el-option :label="$t('providerTypeMedical')" value="medical_hospital" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('slug')">
                <el-input v-model="form.slug" :placeholder="$t('providerSlugPlaceholder')" />
              </el-form-item>
            </el-col>
          </el-row>

          <div class="provider-locale-tabs" dir="ltr">
            <el-tabs v-model="lang" class="provider-locale-tabs-inner">
              <el-tab-pane :label="$t('contentLangAr')" name="ar">
                <div class="provider-tab-fields" dir="rtl">
                  <el-form-item :label="$t('nameAr')">
                    <el-input v-model="form.name.ar" />
                  </el-form-item>
                  <el-form-item :label="$t('providerShortDescAr')">
                    <el-input type="textarea" v-model="form.short_description.ar" />
                  </el-form-item>
                  <el-form-item :label="$t('descriptionAr')">
                    <el-input type="textarea" :rows="6" v-model="form.description.ar" />
                  </el-form-item>
                  <el-form-item :label="$t('providerAddressAr')">
                    <el-input v-model="form.address.ar" />
                  </el-form-item>
                </div>
              </el-tab-pane>
              <el-tab-pane :label="$t('contentLangEn')" name="en">
                <div class="provider-tab-fields" dir="ltr">
                  <el-form-item :label="$t('nameEn')">
                    <el-input v-model="form.name.en" />
                  </el-form-item>
                  <el-form-item :label="$t('providerShortDescEn')">
                    <el-input type="textarea" v-model="form.short_description.en" />
                  </el-form-item>
                  <el-form-item :label="$t('descriptionEn')">
                    <el-input type="textarea" :rows="6" v-model="form.description.en" />
                  </el-form-item>
                  <el-form-item :label="$t('providerAddressEn')">
                    <el-input v-model="form.address.en" />
                  </el-form-item>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-form>
      </el-card>

      <el-card class="panel-card">
        <el-form label-position="top" class="admin-form">
          <el-form-item label="Status">
            <el-select v-model="form.status">
              <el-option label="Published" value="published" />
              <el-option label="Draft" value="draft" />
            </el-select>
          </el-form-item>
          <el-form-item label="Featured">
            <el-switch v-model="form.is_featured" />
          </el-form-item>
          <el-form-item label="Price From">
            <el-input v-model="form.price_from" placeholder="optional" />
          </el-form-item>
          <el-form-item label="Currency">
            <el-input v-model="form.currency" placeholder="SAR" />
          </el-form-item>
          <div class="provider-form-actions">
            <el-button type="primary" :loading="saving" @click="save">{{ $t('save') }}</el-button>
            <el-button @click="$router.push('/providers')">{{ $t('cancel') }}</el-button>
          </div>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { http } from '../../api/http'

const route = useRoute()
const router = useRouter()
const { locale } = useI18n()

const id = computed(() => route.params.id)
const isNew = computed(() => !id.value || id.value === 'new')
const lang = ref(locale.value === 'ar' ? 'ar' : 'en')
const saving = ref(false)

const form = reactive({
  type: 'rehab_center',
  slug: '',
  name: { ar: '', en: '' },
  short_description: { ar: '', en: '' },
  description: { ar: '', en: '' },
  address: { ar: '', en: '' },
  status: 'published',
  is_featured: false,
  price_from: null,
  currency: 'SAR',
})

onMounted(async () => {
  if (!isNew.value) {
    const { data } = await http.get(`/admin/providers/${id.value}`)
    Object.assign(form, {
      ...data,
      name: data.name ?? { ar: '', en: '' },
      short_description: data.short_description ?? { ar: '', en: '' },
      description: data.description ?? { ar: '', en: '' },
      address: data.address ?? { ar: '', en: '' },
    })
  }
})

async function save() {
  saving.value = true
  try {
    if (isNew.value) {
      await http.post('/admin/providers', form)
    } else {
      await http.put(`/admin/providers/${id.value}`, form)
    }
    router.push('/providers')
  } finally {
    saving.value = false
  }
}
</script>

