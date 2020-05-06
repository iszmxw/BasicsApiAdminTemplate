import request from '@/utils/request'

export function getUserList(query) {
  return request({
    url: '/hifans/user_list',
    method: 'get',
    params: query
  })
}

export function getOfficialList(query) {
  return request({
    url: '/hifans/official_list',
    method: 'get',
    params: query
  })
}

export function editStatus(data) {
  return request({
    url: '/hifans/status',
    method: 'post',
    data
  })
}

export function editUserInfo(data) {
  return request({
    url: '/hifans/edit_userinfo',
    method: 'post',
    data
  })
}

export function create_article(data) {
  return request({
    url: '/hifans/create_article',
    method: 'post',
    data
  })
}

export function article_delete(data) {
  return request({
    url: '/hifans/article_delete',
    method: 'post',
    data
  })
}

export function article_status(data) {
  return request({
    url: '/hifans/article_status',
    method: 'post',
    data
  })
}

export function article_edit(data) {
  return request({
    url: '/hifans/article_edit',
    method: 'post',
    data
  })
}

export function article_list(data) {
  return request({
    url: '/hifans/article_list',
    method: 'post',
    data
  })
}

export function fetchData(data) {
  return request({
    url: '/hifans/article_data',
    method: 'post',
    data
  })
}

export function getTaskList(data) {
  return request({
    url: '/hifans/task_list',
    method: 'post',
    data
  })
}

export function getOfficialUnusual(data) {
  return request({
    url: '/hifans/official_unusual',
    method: 'post',
    data
  })
}

export function editTaskStatus(data) {
  return request({
    url: '/hifans/task_status',
    method: 'post',
    data
  })
}

export function edit_price(data) {
  return request({
    url: '/hifans/task_price_edit',
    method: 'post',
    data
  })
}

export function getCategory(data) {
  return request({
    url: '/hifans/get_task_category',
    method: 'post',
    data
  })
}

export function edit_task_category(data) {
  return request({
    url: '/hifans/edit_task_category',
    method: 'post',
    data
  })
}
