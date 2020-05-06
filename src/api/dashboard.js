import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/dashboard/login_log',
    method: 'get',
    params: query
  })
}

export function operationLog(query) {
  return request({
    url: '/dashboard/operation_log',
    method: 'get',
    params: query
  })
}

export function statistics(query) {
  return request({
    url: '/dashboard/statistics',
    method: 'get',
    params: query
  })
}

export function reset_password(data) {
  return request({
    url: `/dashboard/reset_password`,
    method: 'post',
    data
  })
}
