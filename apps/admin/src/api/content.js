import { http } from './http'

export async function fetchPages(params = {}) {
  const { data } = await http.get('/admin/pages', { params })
  return data
}

export async function createPage(payload) {
  const { data } = await http.post('/admin/pages', payload)
  return data
}

export async function updatePage(id, payload) {
  const { data } = await http.put(`/admin/pages/${id}`, payload)
  return data
}

export async function fetchSections(params = {}) {
  const { data } = await http.get('/admin/page-sections', { params })
  return data
}

export async function createSection(payload) {
  const { data } = await http.post('/admin/page-sections', payload)
  return data
}

export async function updateSection(id, payload) {
  const { data } = await http.put(`/admin/page-sections/${id}`, payload)
  return data
}

export async function deleteSection(id) {
  await http.delete(`/admin/page-sections/${id}`)
}

export async function fetchNavigation(params = {}) {
  const { data } = await http.get('/admin/navigation-items', { params })
  return data
}

export async function createNavigation(payload) {
  const { data } = await http.post('/admin/navigation-items', payload)
  return data
}

export async function updateNavigation(id, payload) {
  const { data } = await http.put(`/admin/navigation-items/${id}`, payload)
  return data
}

export async function deleteNavigation(id) {
  await http.delete(`/admin/navigation-items/${id}`)
}

export async function fetchSetting(key) {
  const { data } = await http.get(`/admin/settings/${key}`)
  return data
}

export async function saveSetting(key, value) {
  const { data } = await http.post('/admin/settings', { key, value })
  return data
}

export async function fetchBlogPosts(params = {}) {
  const { data } = await http.get('/admin/blog-posts', { params })
  return data
}

export async function fetchBlogPost(id) {
  const { data } = await http.get(`/admin/blog-posts/${id}`)
  return data
}

export async function createBlogPost(payload) {
  const { data } = await http.post('/admin/blog-posts', payload)
  return data
}

export async function updateBlogPost(id, payload) {
  const { data } = await http.put(`/admin/blog-posts/${id}`, payload)
  return data
}

export async function deleteBlogPost(id) {
  await http.delete(`/admin/blog-posts/${id}`)
}

export async function fetchProviderPackages(providerId, params = {}) {
  const { data } = await http.get(`/admin/providers/${providerId}/packages`, { params })
  return data
}

export async function createProviderPackage(providerId, payload) {
  const { data } = await http.post(`/admin/providers/${providerId}/packages`, payload)
  return data
}

export async function updateProviderPackage(providerId, packageId, payload) {
  const { data } = await http.put(`/admin/providers/${providerId}/packages/${packageId}`, payload)
  return data
}

export async function deleteProviderPackage(providerId, packageId) {
  await http.delete(`/admin/providers/${providerId}/packages/${packageId}`)
}

export async function fetchPackageItems(packageId, params = {}) {
  const { data } = await http.get(`/admin/provider-packages/${packageId}/items`, { params })
  return data
}

export async function createPackageItem(packageId, payload) {
  const { data } = await http.post(`/admin/provider-packages/${packageId}/items`, payload)
  return data
}

export async function updatePackageItem(packageId, itemId, payload) {
  const { data } = await http.put(`/admin/provider-packages/${packageId}/items/${itemId}`, payload)
  return data
}

export async function deletePackageItem(packageId, itemId) {
  await http.delete(`/admin/provider-packages/${packageId}/items/${itemId}`)
}

export async function fetchReservationOptions(providerId, params = {}) {
  const { data } = await http.get(`/admin/providers/${providerId}/reservation-options`, { params })
  return data
}

export async function createReservationOption(providerId, payload) {
  const { data } = await http.post(`/admin/providers/${providerId}/reservation-options`, payload)
  return data
}

export async function updateReservationOption(providerId, optionId, payload) {
  const { data } = await http.put(`/admin/providers/${providerId}/reservation-options/${optionId}`, payload)
  return data
}

export async function deleteReservationOption(providerId, optionId) {
  await http.delete(`/admin/providers/${providerId}/reservation-options/${optionId}`)
}

export async function fetchProviderMedia(providerId, params = {}) {
  const { data } = await http.get(`/admin/providers/${providerId}/media`, { params })
  return data
}

export async function createProviderMedia(providerId, payload) {
  const { data } = await http.post(`/admin/providers/${providerId}/media`, payload)
  return data
}

export async function updateProviderMedia(providerId, mediaId, payload) {
  const { data } = await http.put(`/admin/providers/${providerId}/media/${mediaId}`, payload)
  return data
}

export async function deleteProviderMedia(providerId, mediaId) {
  await http.delete(`/admin/providers/${providerId}/media/${mediaId}`)
}

export async function fetchProviderFacilities(providerId, params = {}) {
  const { data } = await http.get(`/admin/providers/${providerId}/facilities`, { params })
  return data
}

export async function createProviderFacility(providerId, payload) {
  const { data } = await http.post(`/admin/providers/${providerId}/facilities`, payload)
  return data
}

export async function updateProviderFacility(providerId, facilityId, payload) {
  const { data } = await http.put(`/admin/providers/${providerId}/facilities/${facilityId}`, payload)
  return data
}

export async function deleteProviderFacility(providerId, facilityId) {
  await http.delete(`/admin/providers/${providerId}/facilities/${facilityId}`)
}

export async function fetchProviderDoctors(providerId, params = {}) {
  const { data } = await http.get(`/admin/providers/${providerId}/doctors`, { params })
  return data
}

export async function createProviderDoctor(providerId, payload) {
  const { data } = await http.post(`/admin/providers/${providerId}/doctors`, payload)
  return data
}

export async function updateProviderDoctor(providerId, doctorId, payload) {
  const { data } = await http.put(`/admin/providers/${providerId}/doctors/${doctorId}`, payload)
  return data
}

export async function deleteProviderDoctor(providerId, doctorId) {
  await http.delete(`/admin/providers/${providerId}/doctors/${doctorId}`)
}

export async function fetchProviderTestimonials(providerId, params = {}) {
  const { data } = await http.get(`/admin/providers/${providerId}/testimonials`, { params })
  return data
}

export async function createProviderTestimonial(providerId, payload) {
  const { data } = await http.post(`/admin/providers/${providerId}/testimonials`, payload)
  return data
}

export async function updateProviderTestimonial(providerId, testimonialId, payload) {
  const { data } = await http.put(`/admin/providers/${providerId}/testimonials/${testimonialId}`, payload)
  return data
}

export async function deleteProviderTestimonial(providerId, testimonialId) {
  await http.delete(`/admin/providers/${providerId}/testimonials/${testimonialId}`)
}

export async function fetchReservationAttempts(params = {}) {
  const { data } = await http.get('/admin/reservation-attempts', { params })
  return data
}

export async function updateReservationAttempt(id, payload) {
  const { data } = await http.put(`/admin/reservation-attempts/${id}`, payload)
  return data
}

export async function fetchPermissions() {
  const { data } = await http.get('/admin/rbac/permissions')
  return data
}

export async function fetchRoles() {
  const { data } = await http.get('/admin/rbac/roles')
  return data
}

export async function createRole(payload) {
  const { data } = await http.post('/admin/rbac/roles', payload)
  return data
}

export async function updateRole(id, payload) {
  const { data } = await http.put(`/admin/rbac/roles/${id}`, payload)
  return data
}

export async function deleteRole(id) {
  await http.delete(`/admin/rbac/roles/${id}`)
}

export async function fetchAdminUsers(params = {}) {
  const { data } = await http.get('/admin/rbac/users', { params })
  return data
}

export async function createAdminUser(payload) {
  const { data } = await http.post('/admin/rbac/users', payload)
  return data
}

export async function updateAdminUser(id, payload) {
  const { data } = await http.put(`/admin/rbac/users/${id}`, payload)
  return data
}
