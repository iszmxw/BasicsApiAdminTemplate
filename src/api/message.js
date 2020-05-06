import request from '@/utils/request'

export function getHifansQuestion(query) {
  return request({
    url: '/message/hifans_question_list',
    method: 'get',
    params: query
  })
}

export function getQuestionDetail(data) {
  return request({
    url: '/message/question_detail',
    method: 'post',
    data
  })
}

export function editHifansQuestionStatus(data) {
  return request({
    url: '/message/hifans_question_status',
    method: 'post',
    data
  })
}

export function getSuggestList(query) {
  return request({
    url: '/message/suggest_list',
    method: 'get',
    params: query
  })
}

// 合作消息列表
export function getCooperationList(query) {
  return request({
    url: '/message/cooperation_list',
    method: 'get',
    params: query
  })
}

export function editSuggestStatus(data) {
  return request({
    url: '/message/suggest_status',
    method: 'post',
    data
  })
}

export function editCooperationStatus(data) {
  return request({
    url: '/message/cooperation_status',
    method: 'post',
    data
  })
}
