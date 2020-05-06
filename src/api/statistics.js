import request from '@/utils/request'

export function getFansList(data) {
  return request({
    url: '/statistics/fans_list',
    method: 'post',
    data
  })
}

export function OfficialdayChart(query) {
  return request({
    url: '/statistics/official_day_chart',
    method: 'get',
    params: query
  })
}
