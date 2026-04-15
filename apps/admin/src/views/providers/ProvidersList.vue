<template>
  <div class="panel-header">
    <h2 class="panel-title">{{ $t('providers') }}</h2>
    <el-button type="primary" @click="$router.push('/providers/new')">{{ $t('create') }}</el-button>
  </div>

  <el-card class="panel-card">
    <el-table :data="rows" v-loading="loading" style="width:100%;">
      <el-table-column prop="id" :label="$t('id')" width="80"/>
      <el-table-column :label="$t('name')">
        <template #default="{ row }">
          <div><strong>AR:</strong> {{ row.name?.ar }}</div>
          <div><strong>EN:</strong> {{ row.name?.en }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="type" :label="$t('type')" width="180"/>
      <el-table-column prop="status" :label="$t('status')" width="120"/>
    <el-table-column :label="$t('actions')" width="260" align="right">
        <template #default="{ row }">
          <div class="table-actions">
            <el-button type="primary" plain size="small" @click="$router.push(`/providers/${row.id}`)">
              <el-icon><Edit /></el-icon>
              {{ $t('edit') }}
            </el-button>
            <el-button size="small" @click="$router.push(`/providers/${row.id}/commerce`)">
              <el-icon><ShoppingBag /></el-icon>
              {{ $t('commerce') }}
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div style="margin-top:12px;display:flex;justify-content:flex-end;">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="perPage"
        v-model:current-page="page"
        @current-change="fetch"
      />
    </div>
  </el-card>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Edit, ShoppingBag } from '@element-plus/icons-vue'
import { http } from '../../api/http'

const rows = ref([])
const loading = ref(false)
const page = ref(1)
const perPage = 20
const total = ref(0)

async function fetch() {
  loading.value = true
  try {
    const { data } = await http.get('/admin/providers', {
      params: { page: page.value, per_page: perPage },
    })
    rows.value = data.data
    total.value = data.total
  } finally {
    loading.value = false
  }
}

onMounted(fetch)
watch(page, fetch)
</script>

