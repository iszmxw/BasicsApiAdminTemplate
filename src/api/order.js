import request from '@/utils/request'

export function getOrderList(query) {
  return request({
    url: '/order/order_list',
    method: 'get',
    params: query
  })
}

export function getOfficialUnusual(data) {
  return request({
    url: '/order/official_unusual',
    method: 'post',
    data
  })
}

