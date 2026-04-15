<template>
  <div>
    <div class="panel-header">
      <h2 class="panel-title">{{ $t('commerceTitle') }}</h2>
      <el-button plain @click="$router.push(`/providers/${providerId}`)">{{ $t('backToProvider') }}</el-button>
    </div>

    <el-tabs v-model="activeTab">
      <el-tab-pane :label="$t('tabPackages')" name="packages">
        <el-card class="panel-card">
      <div class="panel-header">
        <h3 class="panel-title">{{ $t('tabPackages') }}</h3>
        <el-button type="primary" :loading="isPending('create-package')" @click="createPackage">{{ $t('addPackage') }}</el-button>
      </div>
      <el-table :data="packages" v-loading="loadingPackages">
        <el-table-column :label="$t('nameAr')" min-width="220">
          <template #default="{ row }">
            <el-input v-model="row.name.ar" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('nameEn')" min-width="220">
          <template #default="{ row }">
            <el-input v-model="row.name.en" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('price')" width="120">
          <template #default="{ row }">
            <el-input v-model.number="row.price" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('currency')" width="110">
          <template #default="{ row }">
            <el-input v-model="row.currency" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('sessions')" width="100">
          <template #default="{ row }">
            <el-input v-model.number="row.sessions_count" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('order')" width="90">
          <template #default="{ row }">
            <el-input v-model.number="row.sort_order" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('highlighted')" width="110">
          <template #default="{ row }">
            <el-switch v-model="row.is_highlighted" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('status')" width="130">
          <template #default="{ row }">
            <el-select v-model="row.status">
              <el-option :label="$t('draft')" value="draft" />
              <el-option :label="$t('published')" value="published" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column :label="$t('actions')" width="320" fixed="right" align="right">
          <template #default="{ row }">
            <div class="table-actions">
              <el-button size="small" @click="openItems(row)">{{ $t('items') }}</el-button>
              <el-button
                size="small"
                type="primary"
                plain
                :loading="isPending(`pkg-s-${row.id}`)"
                @click="savePackage(row)"
              >
                {{ $t('saveLabel') }}
              </el-button>
              <el-button
                size="small"
                type="danger"
                plain
                :loading="isPending(`pkg-d-${row.id}`)"
                @click="removePackage(row)"
              >
                {{ $t('delete') }}
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
        </el-card>
      </el-tab-pane>

      <el-tab-pane :label="$t('tabBooking')" name="booking">
        <el-card class="panel-card">
      <div class="panel-header">
        <h3 class="panel-title">{{ $t('tabBooking') }}</h3>
        <el-button type="primary" :loading="isPending('create-res-option')" @click="createOption">{{ $t('addOption') }}</el-button>
      </div>
      <el-table :data="options" v-loading="loadingOptions">
        <el-table-column :label="$t('titleAr')" min-width="180">
          <template #default="{ row }">
            <el-input v-model="row.title.ar" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('titleEn')" min-width="180">
          <template #default="{ row }">
            <el-input v-model="row.title.en" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('type')" width="150">
          <template #default="{ row }">
            <el-select v-model="row.type">
              <el-option :label="$t('typeConsultation')" value="consultation" />
              <el-option :label="$t('typePackage')" value="package" />
              <el-option :label="$t('typeDirectBooking')" value="direct_booking" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column :label="$t('price')" width="120">
          <template #default="{ row }">
            <el-input v-model.number="row.base_price" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('currency')" width="100">
          <template #default="{ row }">
            <el-input v-model="row.currency" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('ctaType')" width="140">
          <template #default="{ row }">
            <el-select v-model="row.cta_type">
              <el-option :label="$t('ctaInternal')" value="internal" />
              <el-option :label="$t('ctaExternal')" value="external" />
              <el-option :label="$t('ctaWhatsapp')" value="whatsapp" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ctaTarget')" min-width="180">
          <template #default="{ row }">
            <el-input v-model="row.cta_target" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('enabled')" width="100">
          <template #default="{ row }">
            <el-switch v-model="row.is_enabled" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('order')" width="90">
          <template #default="{ row }">
            <el-input v-model.number="row.sort_order" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('actions')" width="240" fixed="right" align="right">
          <template #default="{ row }">
            <div class="table-actions">
              <el-button
                size="small"
                type="primary"
                plain
                :loading="isPending(`opt-s-${row.id}`)"
                @click="saveOption(row)"
              >
                {{ $t('saveLabel') }}
              </el-button>
              <el-button
                size="small"
                type="danger"
                plain
                :loading="isPending(`opt-d-${row.id}`)"
                @click="removeOption(row)"
              >
                {{ $t('delete') }}
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
        </el-card>
      </el-tab-pane>

      <el-tab-pane :label="$t('tabMedia')" name="media">
        <el-card class="panel-card">
      <div class="panel-header">
        <h3 class="panel-title">{{ $t('tabMedia') }}</h3>
        <el-button type="primary" :loading="isPending('create-media')" @click="createMediaItem">{{ $t('addMedia') }}</el-button>
      </div>
      <el-table :data="media" v-loading="loadingMedia">
        <el-table-column :label="$t('kind')" width="130">
          <template #default="{ row }">
            <el-select v-model="row.kind">
              <el-option :label="$t('kindGallery')" value="gallery" />
              <el-option :label="$t('kindCover')" value="cover" />
              <el-option :label="$t('kindLogo')" value="logo" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="URL" min-width="320">
          <template #default="{ row }">
            <el-input v-model="row.url" />
          </template>
        </el-table-column>
        <el-table-column label="Alt (AR)" min-width="180">
          <template #default="{ row }">
            <el-input v-model="row.alt.ar" />
          </template>
        </el-table-column>
        <el-table-column label="Alt (EN)" min-width="180">
          <template #default="{ row }">
            <el-input v-model="row.alt.en" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('order')" width="90">
          <template #default="{ row }">
            <el-input v-model.number="row.sort_order" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('actions')" width="220" fixed="right" align="right">
          <template #default="{ row }">
            <div class="table-actions">
              <el-button
                size="small"
                type="primary"
                plain
                :loading="isPending(`med-s-${row.id}`)"
                @click="saveMedia(row)"
              >
                {{ $t('saveLabel') }}
              </el-button>
              <el-button
                size="small"
                type="danger"
                plain
                :loading="isPending(`med-d-${row.id}`)"
                @click="removeMedia(row)"
              >
                {{ $t('delete') }}
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
        </el-card>
      </el-tab-pane>

      <el-tab-pane :label="$t('tabFacilities')" name="facilities">
        <el-card class="panel-card">
      <div class="panel-header">
        <h3 class="panel-title">{{ $t('tabFacilities') }}</h3>
        <el-button type="primary" :loading="isPending('create-facility')" @click="createFacility">{{ $t('addFacility') }}</el-button>
      </div>
      <el-table :data="facilities" v-loading="loadingFacilities">
        <el-table-column :label="$t('titleAr')" min-width="160">
          <template #default="{ row }"><el-input v-model="row.title.ar" /></template>
        </el-table-column>
        <el-table-column :label="$t('titleEn')" min-width="160">
          <template #default="{ row }"><el-input v-model="row.title.en" /></template>
        </el-table-column>
        <el-table-column :label="$t('descriptionAr')" min-width="220">
          <template #default="{ row }"><el-input v-model="row.description.ar" type="textarea" :rows="2" /></template>
        </el-table-column>
        <el-table-column :label="$t('icon')" width="140">
          <template #default="{ row }"><el-input v-model="row.icon" /></template>
        </el-table-column>
        <el-table-column :label="$t('order')" width="90">
          <template #default="{ row }"><el-input v-model.number="row.sort_order" /></template>
        </el-table-column>
        <el-table-column :label="$t('actions')" width="220" align="right">
          <template #default="{ row }">
            <div class="table-actions">
              <el-button
                size="small"
                type="primary"
                plain
                :loading="isPending(`fac-s-${row.id}`)"
                @click="saveFacility(row)"
              >
                {{ $t('saveLabel') }}
              </el-button>
              <el-button
                size="small"
                type="danger"
                plain
                :loading="isPending(`fac-d-${row.id}`)"
                @click="removeFacility(row)"
              >
                {{ $t('delete') }}
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
        </el-card>
      </el-tab-pane>

      <el-tab-pane :label="$t('tabDoctors')" name="doctors">
        <el-card class="panel-card">
      <div class="panel-header">
        <h3 class="panel-title">{{ $t('tabDoctors') }}</h3>
        <el-button type="primary" :loading="isPending('create-doctor')" @click="createDoctor">{{ $t('addDoctor') }}</el-button>
      </div>
      <el-table :data="doctors" v-loading="loadingDoctors">
        <el-table-column :label="$t('nameAr')" min-width="150">
          <template #default="{ row }"><el-input v-model="row.name.ar" /></template>
        </el-table-column>
        <el-table-column :label="$t('nameEn')" min-width="150">
          <template #default="{ row }"><el-input v-model="row.name.en" /></template>
        </el-table-column>
        <el-table-column label="Specialization (AR)" min-width="180">
          <template #default="{ row }"><el-input v-model="row.specialization.ar" /></template>
        </el-table-column>
        <el-table-column :label="$t('imageUrl')" min-width="220">
          <template #default="{ row }"><el-input v-model="row.image_url" /></template>
        </el-table-column>
        <el-table-column label="Exp." width="90">
          <template #default="{ row }"><el-input v-model="row.experience_years" /></template>
        </el-table-column>
        <el-table-column :label="$t('order')" width="90">
          <template #default="{ row }"><el-input v-model.number="row.sort_order" /></template>
        </el-table-column>
        <el-table-column :label="$t('actions')" width="220" align="right">
          <template #default="{ row }">
            <div class="table-actions">
              <el-button
                size="small"
                type="primary"
                plain
                :loading="isPending(`doc-s-${row.id}`)"
                @click="saveDoctor(row)"
              >
                {{ $t('saveLabel') }}
              </el-button>
              <el-button
                size="small"
                type="danger"
                plain
                :loading="isPending(`doc-d-${row.id}`)"
                @click="removeDoctor(row)"
              >
                {{ $t('delete') }}
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
        </el-card>
      </el-tab-pane>

      <el-tab-pane :label="$t('tabTestimonials')" name="testimonials">
        <el-card class="panel-card">
      <div class="panel-header">
        <h3 class="panel-title">{{ $t('tabTestimonials') }}</h3>
        <el-button type="primary" :loading="isPending('create-testimonial')" @click="createTestimonial">{{ $t('addTestimonial') }}</el-button>
      </div>
      <el-table :data="testimonials" v-loading="loadingTestimonials">
        <el-table-column :label="$t('nameAr')" min-width="140">
          <template #default="{ row }"><el-input v-model="row.name.ar" /></template>
        </el-table-column>
        <el-table-column :label="$t('quote')" min-width="220">
          <template #default="{ row }"><el-input v-model="row.quote.ar" type="textarea" :rows="2" /></template>
        </el-table-column>
        <el-table-column :label="$t('role')" min-width="140">
          <template #default="{ row }"><el-input v-model="row.role.ar" /></template>
        </el-table-column>
        <el-table-column :label="$t('rating')" width="90">
          <template #default="{ row }"><el-input v-model="row.rating" /></template>
        </el-table-column>
        <el-table-column label="Featured" width="90">
          <template #default="{ row }"><el-switch v-model="row.is_featured" /></template>
        </el-table-column>
        <el-table-column :label="$t('order')" width="90">
          <template #default="{ row }"><el-input v-model.number="row.sort_order" /></template>
        </el-table-column>
        <el-table-column :label="$t('actions')" width="220" align="right">
          <template #default="{ row }">
            <div class="table-actions">
              <el-button
                size="small"
                type="primary"
                plain
                :loading="isPending(`tst-s-${row.id}`)"
                @click="saveTestimonial(row)"
              >
                {{ $t('saveLabel') }}
              </el-button>
              <el-button
                size="small"
                type="danger"
                plain
                :loading="isPending(`tst-d-${row.id}`)"
                @click="removeTestimonial(row)"
              >
                {{ $t('delete') }}
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
        </el-card>
      </el-tab-pane>
    </el-tabs>

    <el-dialog v-model="itemsDialogOpen" width="720px" :title="$t('packageItems')" destroy-on-close>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <strong>{{ selectedPackage?.name?.ar || 'Package' }}</strong>
        <el-button type="primary" :loading="isPending('add-pkg-item')" @click="addPackageItem">{{ $t('addItem') }}</el-button>
      </div>
      <el-table :data="packageItems" v-loading="loadingItems">
        <el-table-column :label="$t('itemLabelAr')">
          <template #default="{ row }">
            <el-input v-model="row.label.ar" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('itemLabelEn')">
          <template #default="{ row }">
            <el-input v-model="row.label.en" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('order')" width="90">
          <template #default="{ row }">
            <el-input v-model.number="row.sort_order" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('actions')" width="230" align="right">
          <template #default="{ row }">
            <div class="table-actions">
              <el-button
                size="small"
                type="primary"
                plain
                :loading="isPending(`pit-s-${row.id}`)"
                @click="savePackageItem(row)"
              >
                {{ $t('saveLabel') }}
              </el-button>
              <el-button
                size="small"
                type="danger"
                plain
                :loading="isPending(`pit-d-${row.id}`)"
                @click="removePackageItem(row)"
              >
                {{ $t('delete') }}
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { usePendingKeys } from '../../composables/usePendingKeys'
import {
  createPackageItem,
  createProviderDoctor,
  createProviderFacility,
  createProviderMedia,
  createProviderPackage,
  createProviderTestimonial,
  createReservationOption,
  deletePackageItem,
  deleteProviderMedia,
  deleteProviderPackage,
  deleteProviderDoctor,
  deleteProviderFacility,
  deleteProviderTestimonial,
  deleteReservationOption,
  fetchPackageItems,
  fetchProviderMedia,
  fetchProviderPackages,
  fetchProviderDoctors,
  fetchProviderFacilities,
  fetchProviderTestimonials,
  fetchReservationOptions,
  updatePackageItem,
  updateProviderMedia,
  updateProviderPackage,
  updateProviderDoctor,
  updateProviderFacility,
  updateProviderTestimonial,
  updateReservationOption,
} from '../../api/content'

const route = useRoute()
const { t } = useI18n()
const { isPending, run } = usePendingKeys()
const providerId = computed(() => route.params.id)
const activeTab = ref('packages')
const packages = ref([])
const options = ref([])
const media = ref([])
const loadingPackages = ref(false)
const loadingOptions = ref(false)
const loadingMedia = ref(false)
const facilities = ref([])
const doctors = ref([])
const testimonials = ref([])
const loadingFacilities = ref(false)
const loadingDoctors = ref(false)
const loadingTestimonials = ref(false)
const itemsDialogOpen = ref(false)
const selectedPackage = ref(null)
const packageItems = ref([])
const loadingItems = ref(false)

async function loadAll() {
  await Promise.all([loadPackages(), loadOptions(), loadMedia(), loadFacilities(), loadDoctors(), loadTestimonials()])
}

async function loadPackages() {
  loadingPackages.value = true
  try {
    const data = await fetchProviderPackages(providerId.value, { per_page: 100 })
    packages.value = data.data || []
  } finally {
    loadingPackages.value = false
  }
}

async function loadOptions() {
  loadingOptions.value = true
  try {
    const data = await fetchReservationOptions(providerId.value, { per_page: 100 })
    options.value = data.data || []
  } finally {
    loadingOptions.value = false
  }
}

async function loadMedia() {
  loadingMedia.value = true
  try {
    const data = await fetchProviderMedia(providerId.value, { per_page: 100 })
    media.value = data.data || []
  } finally {
    loadingMedia.value = false
  }
}

async function createPackage() {
  const nameAr = await ElMessageBox.prompt('Package name (AR)', 'Create Package').then((v) => v.value).catch(() => '')
  if (!nameAr) return
  await run('create-package', async () => {
    await createProviderPackage(providerId.value, {
      name: { ar: nameAr, en: nameAr },
      description: { ar: '', en: '' },
      price: 0,
      currency: 'SAR',
      duration_label: { ar: '', en: '' },
      sessions_count: 1,
      status: 'draft',
      sort_order: packages.value.length + 1,
    })
    ElMessage.success(t('saved'))
    await loadPackages()
  })
}

async function togglePackage(row) {
  await savePackage({
    ...row,
    status: row.status === 'published' ? 'draft' : 'published',
  })
}

async function savePackage(row) {
  await run(`pkg-s-${row.id}`, async () => {
    await updateProviderPackage(providerId.value, row.id, {
      name: row.name,
      description: row.description || { ar: '', en: '' },
      price: Number(row.price || 0),
      currency: row.currency || 'SAR',
      duration_label: row.duration_label || { ar: '', en: '' },
      sessions_count: row.sessions_count ? Number(row.sessions_count) : null,
      is_highlighted: !!row.is_highlighted,
      status: row.status || 'draft',
      sort_order: Number(row.sort_order || 0),
    })
    ElMessage.success(t('saved'))
    await loadPackages()
  })
}

async function removePackage(row) {
  await run(`pkg-d-${row.id}`, async () => {
    await deleteProviderPackage(providerId.value, row.id)
    await loadPackages()
  })
}

async function openItems(row) {
  selectedPackage.value = row
  itemsDialogOpen.value = true
  await loadPackageItems()
}

async function loadPackageItems() {
  if (!selectedPackage.value) return
  loadingItems.value = true
  try {
    const res = await fetchPackageItems(selectedPackage.value.id, { per_page: 100 })
    packageItems.value = res.data || []
  } finally {
    loadingItems.value = false
  }
}

async function addPackageItem() {
  if (!selectedPackage.value) return
  await run('add-pkg-item', async () => {
    await createPackageItem(selectedPackage.value.id, {
      label: { ar: 'عنصر جديد', en: 'New item' },
      sort_order: packageItems.value.length + 1,
    })
    await loadPackageItems()
  })
}

async function savePackageItem(item) {
  if (!selectedPackage.value) return
  await run(`pit-s-${item.id}`, async () => {
    await updatePackageItem(selectedPackage.value.id, item.id, {
      label: item.label,
      sort_order: Number(item.sort_order || 0),
    })
    ElMessage.success(t('saved'))
  })
}

async function removePackageItem(item) {
  if (!selectedPackage.value) return
  await run(`pit-d-${item.id}`, async () => {
    await deletePackageItem(selectedPackage.value.id, item.id)
    await loadPackageItems()
  })
}

async function createOption() {
  const titleAr = await ElMessageBox.prompt('Option title (AR)', 'Add Reservation Option').then((v) => v.value).catch(() => '')
  if (!titleAr) return
  await run('create-res-option', async () => {
    await createReservationOption(providerId.value, {
      title: { ar: titleAr, en: titleAr },
      type: 'consultation',
      base_price: 0,
      currency: 'SAR',
      cta_type: 'internal',
      cta_target: '',
      is_enabled: true,
      sort_order: options.value.length + 1,
    })
    await loadOptions()
  })
}

async function toggleOption(row) {
  await saveOption({
    ...row,
    is_enabled: !row.is_enabled,
  })
}

async function saveOption(row) {
  await run(`opt-s-${row.id}`, async () => {
    await updateReservationOption(providerId.value, row.id, {
      title: row.title,
      type: row.type,
      base_price: row.base_price !== null && row.base_price !== '' ? Number(row.base_price) : null,
      currency: row.currency || 'SAR',
      cta_type: row.cta_type || 'internal',
      cta_target: row.cta_target || '',
      is_enabled: !!row.is_enabled,
      sort_order: Number(row.sort_order || 0),
    })
    ElMessage.success(t('saved'))
    await loadOptions()
  })
}

async function removeOption(row) {
  await run(`opt-d-${row.id}`, async () => {
    await deleteReservationOption(providerId.value, row.id)
    await loadOptions()
  })
}

async function createMediaItem() {
  const url = await ElMessageBox.prompt('Media URL', 'Add Media').then((v) => v.value).catch(() => '')
  if (!url) return
  await run('create-media', async () => {
    await createProviderMedia(providerId.value, {
      kind: 'gallery',
      url,
      alt: { ar: '', en: '' },
      sort_order: media.value.length + 1,
    })
    await loadMedia()
  })
}

async function saveMedia(row) {
  await run(`med-s-${row.id}`, async () => {
    await updateProviderMedia(providerId.value, row.id, {
      kind: row.kind,
      url: row.url,
      alt: row.alt || { ar: '', en: '' },
      sort_order: Number(row.sort_order || 0),
    })
    ElMessage.success(t('saved'))
    await loadMedia()
  })
}

async function removeMedia(row) {
  await run(`med-d-${row.id}`, async () => {
    await deleteProviderMedia(providerId.value, row.id)
    await loadMedia()
  })
}

async function loadFacilities() {
  loadingFacilities.value = true
  try {
    const data = await fetchProviderFacilities(providerId.value, { per_page: 100 })
    facilities.value = data.data || []
  } finally {
    loadingFacilities.value = false
  }
}

async function createFacility() {
  await run('create-facility', async () => {
    await createProviderFacility(providerId.value, {
      title: { ar: 'مرفق', en: 'Facility' },
      description: { ar: '', en: '' },
      icon: '',
      sort_order: facilities.value.length + 1,
    })
    await loadFacilities()
  })
}

async function saveFacility(row) {
  await run(`fac-s-${row.id}`, async () => {
    await updateProviderFacility(providerId.value, row.id, {
      title: row.title,
      description: row.description || { ar: '', en: '' },
      icon: row.icon || '',
      sort_order: Number(row.sort_order || 0),
    })
    ElMessage.success(t('saved'))
    await loadFacilities()
  })
}

async function removeFacility(row) {
  await run(`fac-d-${row.id}`, async () => {
    await deleteProviderFacility(providerId.value, row.id)
    await loadFacilities()
  })
}

async function loadDoctors() {
  loadingDoctors.value = true
  try {
    const data = await fetchProviderDoctors(providerId.value, { per_page: 100 })
    doctors.value = data.data || []
  } finally {
    loadingDoctors.value = false
  }
}

async function createDoctor() {
  await run('create-doctor', async () => {
    await createProviderDoctor(providerId.value, {
      name: { ar: 'طبيب', en: 'Doctor' },
      specialization: { ar: '', en: '' },
      bio: { ar: '', en: '' },
      image_url: '',
      experience_years: '',
      sort_order: doctors.value.length + 1,
    })
    await loadDoctors()
  })
}

async function saveDoctor(row) {
  await run(`doc-s-${row.id}`, async () => {
    await updateProviderDoctor(providerId.value, row.id, {
      name: row.name,
      specialization: row.specialization || { ar: '', en: '' },
      bio: row.bio || { ar: '', en: '' },
      image_url: row.image_url || '',
      experience_years: row.experience_years || '',
      sort_order: Number(row.sort_order || 0),
    })
    ElMessage.success(t('saved'))
    await loadDoctors()
  })
}

async function removeDoctor(row) {
  await run(`doc-d-${row.id}`, async () => {
    await deleteProviderDoctor(providerId.value, row.id)
    await loadDoctors()
  })
}

async function loadTestimonials() {
  loadingTestimonials.value = true
  try {
    const data = await fetchProviderTestimonials(providerId.value, { per_page: 100 })
    testimonials.value = data.data || []
  } finally {
    loadingTestimonials.value = false
  }
}

async function createTestimonial() {
  await run('create-testimonial', async () => {
    await createProviderTestimonial(providerId.value, {
      name: { ar: 'عميل', en: 'Client' },
      role: { ar: '', en: '' },
      quote: { ar: '', en: '' },
      avatar_url: '',
      rating: '',
      is_featured: false,
      sort_order: testimonials.value.length + 1,
    })
    await loadTestimonials()
  })
}

async function saveTestimonial(row) {
  await run(`tst-s-${row.id}`, async () => {
    await updateProviderTestimonial(providerId.value, row.id, {
      name: row.name,
      role: row.role || { ar: '', en: '' },
      quote: row.quote,
      avatar_url: row.avatar_url || '',
      rating: row.rating || '',
      is_featured: !!row.is_featured,
      sort_order: Number(row.sort_order || 0),
    })
    ElMessage.success(t('saved'))
    await loadTestimonials()
  })
}

async function removeTestimonial(row) {
  await run(`tst-d-${row.id}`, async () => {
    await deleteProviderTestimonial(providerId.value, row.id)
    await loadTestimonials()
  })
}

onMounted(loadAll)
</script>
