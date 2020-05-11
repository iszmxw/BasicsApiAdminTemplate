import request from '@/utils/request'

// 获取门店类型（场景）
export function get_scene(data) {
  return request({
    url: '/merchant/store/get_scene',
    method: 'post',
    data
  })
}

// 获取单条门店信息
export function get_store_info(data) {
  return request({
    url: '/merchant/store/get_store_info',
    method: 'post',
    data
  })
}

// 保存门店信息
export function save_store_info(data) {
  return request({
    url: '/merchant/store/save_store_info',
    method: 'post',
    data
  })
}
