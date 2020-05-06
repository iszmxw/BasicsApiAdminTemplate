import request from '@/utils/request'

export function coupon_add(data) {
  return request({
    url: '/activity/coupon_add',
    method: 'post',
    data
  })
}

export function coupon_edit(data) {
  return request({
    url: '/activity/coupon_edit',
    method: 'post',
    data
  })
}

export function editStatus(data) {
  return request({
    url: '/activity/coupon_status',
    method: 'post',
    data
  })
}

export function getList(data) {
  return request({
    url: '/activity/coupon_list',
    method: 'post',
    data
  })
}

export function receive_log(data) {
  return request({
    url: '/activity/receive_log',
    method: 'post',
    data
  })
}
