<template>
  <div>
    <div class="panel-header">
      <h2 class="panel-title">{{ $t('mediaLibrary') }}</h2>
      <el-button type="primary">{{ $t('uploadFiles') }}</el-button>
    </div>

    <el-card class="panel-card">
      <p class="dashboard-subtitle">{{ $t('mediaHelp') }}</p>
      <el-row :gutter="12">
        <el-col :span="6" v-for="item in assets" :key="item.name">
          <div class="media-thumb">
            <strong>{{ item.name }}</strong>
            <span>{{ item.type }}</span>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
const assets = [
  { name: 'hero-01.jpg', type: 'image/jpeg' },
  { name: 'doctor-team.png', type: 'image/png' },
  { name: 'brochure.pdf', type: 'application/pdf' },
  { name: 'center-tour.mp4', type: 'video/mp4' },
]
</script>
