import request from '@/utils/request'

export function getRoleRoutes(query) {
  return request({
    url: '/roles/routes',
    method: 'get',
    params: query
  })
}

export function getRoles() {
  return request({
    url: '/roles/list',
    method: 'get'
  })
}

export function updateRole(data) {
  return request({
    url: `/roles/edit`,
    method: 'post',
    data
  })
}
