<template>
  <div class="panel-header">
    <h2 class="panel-title">{{ $t('reservations') }}</h2>
  </div>

  <el-card class="panel-card" style="margin-bottom: 16px">
    <el-form label-position="top" class="admin-form" @submit.prevent="saveWhatsappSettings">
      <el-row :gutter="12">
        <el-col :span="10">
          <el-form-item :label="$t('reservationWhatsappNumber')">
            <el-input v-model="settings.number" :placeholder="$t('reservationWhatsappNumberPlaceholder')" />
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item :label="$t('reservationWhatsappTemplate')">
            <el-input
              v-model="settings.default_message"
              type="textarea"
              :rows="3"
              :placeholder="$t('reservationWhatsappTemplatePlaceholder')"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="dialog-footer-actions">
        <el-button type="primary" :loading="settingsSaving" @click="saveWhatsappSettings">{{ $t('save') }}</el-button>
      </div>
    </el-form>
  </el-card>

  <el-card class="panel-card">
    <div class="table-actions" style="margin-bottom: 10px">
      <el-input
        v-model="filters.search"
        :placeholder="$t('search')"
        clearable
        style="max-width: 320px"
        @keyup.enter="fetchRows"
        @clear="fetchRows"
      />
      <el-select v-model="filters.status" style="width: 180px" @change="fetchRows">
        <el-option value="" :label="$t('all')" />
        <el-option value="new" :label="$t('reservationStatusNew')" />
        <el-option value="contacted" :label="$t('reservationStatusContacted')" />
        <el-option value="converted" :label="$t('reservationStatusConverted')" />
        <el-option value="cancelled" :label="$t('reservationStatusCancelled')" />
      </el-select>
      <el-button @click="fetchRows">{{ $t('actions') }}</el-button>
    </div>

    <el-table :data="rows" v-loading="loading" style="width: 100%">
      <el-table-column prop="id" :label="$t('id')" width="80" />
      <el-table-column :label="$t('name')">
        <template #default="{ row }">
          <div><strong>{{ row.item_name || '-' }}</strong></div>
          <small>{{ row.provider_name || row.provider?.name?.ar || row.provider?.name?.en || '-' }}</small>
        </template>
      </el-table-column>
      <el-table-column prop="source" :label="$t('reservationSource')" width="130" />
      <el-table-column prop="customer_name" :label="$t('reservationCustomer')" width="180" />
      <el-table-column prop="customer_phone" :label="$t('reservationPhone')" width="150" />
      <el-table-column :label="$t('status')" width="140">
        <template #default="{ row }">
          <el-tag :type="statusTagType(row.status)">{{ statusLabel(row.status) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('actions')" width="180" align="right">
        <template #default="{ row }">
          <div class="table-actions">
            <el-button type="primary" plain size="small" @click="openEdit(row)">{{ $t('edit') }}</el-button>
            <el-button
              size="small"
              :disabled="!row.whatsapp_url"
              @click="openWhatsapp(row.whatsapp_url)"
            >WhatsApp</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div style="margin-top: 12px; display: flex; justify-content: flex-end">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="perPage"
        v-model:current-page="page"
        @current-change="fetchRows"
      />
    </div>
  </el-card>

  <el-dialog v-model="editDialogOpen" :title="$t('edit')">
    <el-form label-position="top" class="admin-form">
      <el-form-item :label="$t('status')">
        <el-select v-model="editModel.status">
          <el-option value="new" :label="$t('reservationStatusNew')" />
          <el-option value="contacted" :label="$t('reservationStatusContacted')" />
          <el-option value="converted" :label="$t('reservationStatusConverted')" />
          <el-option value="cancelled" :label="$t('reservationStatusCancelled')" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('reservationCustomer')">
        <el-input v-model="editModel.customer_name" />
      </el-form-item>
      <el-form-item :label="$t('reservationPhone')">
        <el-input v-model="editModel.customer_phone" />
      </el-form-item>
      <el-form-item :label="$t('reservationAdminNotes')">
        <el-input v-model="editModel.admin_notes" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer-actions">
        <el-button @click="editDialogOpen = false">{{ $t('cancel') }}</el-button>
        <el-button type="primary" :loading="editSaving" @click="saveEdit">{{ $t('save') }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { fetchReservationAttempts, fetchSetting, saveSetting, updateReservationAttempt } from '../../api/content'
const { t } = useI18n()

const loading = ref(false)
const rows = ref([])
const page = ref(1)
const perPage = 20
const total = ref(0)

const filters = reactive({
  search: '',
  status: '',
})

const settings = reactive({
  number: '',
  default_message: '',
})
const settingsSaving = ref(false)

const editDialogOpen = ref(false)
const editSaving = ref(false)
const editId = ref(null)
const editModel = reactive({
  status: 'new',
  customer_name: '',
  customer_phone: '',
  admin_notes: '',
})

function statusTagType(status) {
  if (status === 'converted') return 'success'
  if (status === 'contacted') return 'warning'
  if (status === 'cancelled') return 'danger'
  return 'info'
}

function statusLabel(status) {
  if (status === 'contacted') return t('reservationStatusContacted')
  if (status === 'converted') return t('reservationStatusConverted')
  if (status === 'cancelled') return t('reservationStatusCancelled')
  return t('reservationStatusNew')
}

async function fetchRows() {
  loading.value = true
  try {
    const data = await fetchReservationAttempts({
      page: page.value,
      per_page: perPage,
      search: filters.search || undefined,
      status: filters.status || undefined,
    })
    rows.value = data.data
    total.value = data.total
  } finally {
    loading.value = false
  }
}

async function loadSettings() {
  try {
    const data = await fetchSetting('reservation.whatsapp')
    const val = data?.value || {}
    settings.number = val.number || ''
    settings.default_message = val.default_message || ''
  } catch {
    settings.number = ''
    settings.default_message = ''
  }
}

async function saveWhatsappSettings() {
  settingsSaving.value = true
  try {
    await saveSetting('reservation.whatsapp', {
      number: settings.number,
      default_message: settings.default_message,
    })
  } finally {
    settingsSaving.value = false
  }
}

function openEdit(row) {
  editId.value = row.id
  editModel.status = row.status || 'new'
  editModel.customer_name = row.customer_name || ''
  editModel.customer_phone = row.customer_phone || ''
  editModel.admin_notes = row.admin_notes || ''
  editDialogOpen.value = true
}

async function saveEdit() {
  if (!editId.value) return
  editSaving.value = true
  try {
    const updated = await updateReservationAttempt(editId.value, {
      status: editModel.status,
      customer_name: editModel.customer_name,
      customer_phone: editModel.customer_phone,
      admin_notes: editModel.admin_notes,
    })
    const idx = rows.value.findIndex((x) => x.id === updated.id)
    if (idx >= 0) rows.value[idx] = updated
    editDialogOpen.value = false
  } finally {
    editSaving.value = false
  }
}

function openWhatsapp(url) {
  if (!url || typeof window === 'undefined') return
  window.open(url, '_blank', 'noopener,noreferrer')
}

onMounted(async () => {
  await Promise.all([loadSettings(), fetchRows()])
})

watch(page, fetchRows)
</script>
