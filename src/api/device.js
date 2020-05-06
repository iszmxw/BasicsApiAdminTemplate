import request from '@/utils/request'

export function get_device(query) {
  return request({
    url: '/device/get_device',
    method: 'get',
    params: query
  })
}

export function get_template(id) {
  return request({
    url: '/device/template_detail',
    method: 'post',
    data: { id }
  })
}

export function edit_price(data) {
  return request({
    url: '/device/edit_price',
    method: 'post',
    data
  })
}

