<template>
  <section class="page-form-wrap app-settings-wrap">
    <el-card shadow="never" class="admin-card">
      <template #header>
        <div class="admin-card-header access-control-header">
          <h3>{{ $t('accessControl') }}</h3>
        </div>
      </template>

      <el-tabs v-model="activeTab" class="access-control-tabs">
        <el-tab-pane :label="$t('roles')" name="roles">
          <div class="toolbar-row access-control-toolbar">
            <el-button type="primary" class="access-control-primary-btn" @click="openRoleDialog()">{{ $t('createRole') }}</el-button>
          </div>
          <el-table :data="roles" v-loading="loadingRoles">
            <el-table-column prop="name" :label="$t('name')" min-width="220" />
            <el-table-column :label="$t('permissions')" min-width="420">
              <template #default="{ row }">
                <div class="chip-row">
                  <el-tag v-for="perm in row.permissions" :key="perm" size="small">{{ perm }}</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('actions')" width="180">
              <template #default="{ row }">
                <el-button size="small" @click="openRoleDialog(row)">{{ $t('edit') }}</el-button>
                <el-button size="small" type="danger" @click="removeRole(row)">{{ $t('delete') }}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane :label="$t('adminUsers')" name="users">
          <div class="toolbar-row access-control-toolbar">
            <el-input v-model="userSearch" :placeholder="$t('search')" style="max-width: 320px" @keyup.enter="loadUsers" />
            <el-button @click="loadUsers">{{ $t('search') }}</el-button>
            <el-button type="primary" class="access-control-primary-btn" @click="openUserDialog()">{{ $t('createUser') }}</el-button>
          </div>
          <el-table :data="users" v-loading="loadingUsers">
            <el-table-column prop="name" :label="$t('name')" min-width="180" />
            <el-table-column prop="email" :label="$t('email')" min-width="260" />
            <el-table-column :label="$t('roles')" min-width="280">
              <template #default="{ row }">
                <div class="chip-row">
                  <el-tag v-for="role in row.roles || []" :key="role.id" size="small">{{ role.name }}</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('actions')" width="120">
              <template #default="{ row }">
                <el-button size="small" @click="openUserDialog(row)">{{ $t('edit') }}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <el-dialog v-model="roleDialogOpen" :title="roleForm.id ? $t('editRole') : $t('createRole')" width="700px">
      <el-form :model="roleForm" label-position="top">
        <el-form-item :label="$t('name')">
          <el-input v-model="roleForm.name" />
        </el-form-item>
        <el-form-item :label="$t('permissions')">
          <el-checkbox-group v-model="roleForm.permissions">
            <el-checkbox v-for="permission in allPermissions" :key="permission" :label="permission">{{ permission }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="roleDialogOpen = false">{{ $t('cancel') }}</el-button>
        <el-button type="primary" :loading="savingRole" @click="saveRole">{{ $t('save') }}</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="userDialogOpen" :title="userForm.id ? $t('editUser') : $t('createUser')" width="620px">
      <el-form :model="userForm" label-position="top">
        <el-form-item :label="$t('name')">
          <el-input v-model="userForm.name" />
        </el-form-item>
        <el-form-item :label="$t('email')">
          <el-input v-model="userForm.email" />
        </el-form-item>
        <el-form-item :label="$t('password')">
          <el-input v-model="userForm.password" type="password" show-password />
        </el-form-item>
        <el-form-item :label="$t('roles')">
          <el-select v-model="userForm.roles" multiple style="width: 100%">
            <el-option v-for="role in roles" :key="role.id" :label="role.name" :value="role.name" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="userDialogOpen = false">{{ $t('cancel') }}</el-button>
        <el-button type="primary" :loading="savingUser" @click="saveUser">{{ $t('save') }}</el-button>
      </template>
    </el-dialog>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  createAdminUser,
  createRole,
  deleteRole,
  fetchAdminUsers,
  fetchPermissions,
  fetchRoles,
  updateAdminUser,
  updateRole,
} from '../../api/content'

const activeTab = ref('roles')
const roles = ref([])
const allPermissions = ref([])
const users = ref([])
const userSearch = ref('')
const loadingRoles = ref(false)
const loadingUsers = ref(false)
const roleDialogOpen = ref(false)
const userDialogOpen = ref(false)
const savingRole = ref(false)
const savingUser = ref(false)

const roleForm = ref({ id: null, name: '', permissions: [] })
const userForm = ref({ id: null, name: '', email: '', password: '', roles: [] })

const roleNames = computed(() => roles.value.map((role) => role.name))

function resetRoleForm() {
  roleForm.value = { id: null, name: '', permissions: [] }
}

function resetUserForm() {
  userForm.value = { id: null, name: '', email: '', password: '', roles: [] }
}

async function loadPermissions() {
  const res = await fetchPermissions()
  allPermissions.value = (res.data || []).map((row) => row.name)
}

async function loadRoles() {
  loadingRoles.value = true
  try {
    const res = await fetchRoles()
    roles.value = res.data || []
  } finally {
    loadingRoles.value = false
  }
}

async function loadUsers() {
  loadingUsers.value = true
  try {
    const res = await fetchAdminUsers({ search: userSearch.value || undefined, per_page: 50 })
    users.value = res.data || []
  } finally {
    loadingUsers.value = false
  }
}

function openRoleDialog(role = null) {
  if (!role) {
    resetRoleForm()
  } else {
    roleForm.value = { id: role.id, name: role.name, permissions: [...(role.permissions || [])] }
  }
  roleDialogOpen.value = true
}

function openUserDialog(user = null) {
  if (!user) {
    resetUserForm()
  } else {
    userForm.value = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: '',
      roles: (user.roles || []).map((role) => role.name).filter((name) => roleNames.value.includes(name)),
    }
  }
  userDialogOpen.value = true
}

async function saveRole() {
  if (!roleForm.value.name.trim()) return
  savingRole.value = true
  try {
    const payload = { name: roleForm.value.name.trim(), permissions: roleForm.value.permissions }
    if (roleForm.value.id) await updateRole(roleForm.value.id, payload)
    else await createRole(payload)
    roleDialogOpen.value = false
    await loadRoles()
    ElMessage.success('Role saved')
  } finally {
    savingRole.value = false
  }
}

async function removeRole(role) {
  await ElMessageBox.confirm(`Delete role "${role.name}"?`, 'Confirm', { type: 'warning' })
  await deleteRole(role.id)
  await loadRoles()
  ElMessage.success('Role deleted')
}

async function saveUser() {
  if (!userForm.value.name.trim() || !userForm.value.email.trim()) return
  savingUser.value = true
  try {
    const payload = {
      name: userForm.value.name.trim(),
      email: userForm.value.email.trim(),
      roles: userForm.value.roles,
    }
    if (userForm.value.password) payload.password = userForm.value.password
    if (userForm.value.id) await updateAdminUser(userForm.value.id, payload)
    else await createAdminUser(payload)
    userDialogOpen.value = false
    await loadUsers()
    ElMessage.success('User saved')
  } finally {
    savingUser.value = false
  }
}

onMounted(async () => {
  await Promise.all([loadPermissions(), loadRoles(), loadUsers()])
})
</script>
