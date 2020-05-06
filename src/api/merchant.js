import request from '@/utils/request'

export function add(data) {
  return request({
    url: '/merchant/add',
    method: 'post',
    data
  })
}

export function getList(data) {
  return request({
    url: '/merchant/list',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: '/merchant/edit',
    method: 'post',
    data
  })
}

export function lockStatus(data) {
  return request({
    url: '/merchant/status',
    method: 'post',
    data
  })
}
