import request from '@/utils/request'

export function getCompanyApplyList(query) {
  return request({
    url: '/settlement/company_apply_list',
    method: 'get',
    params: query
  })
}

export function getUserApplyList(query) {
  return request({
    url: '/settlement/user_apply_list',
    method: 'get',
    params: query
  })
}

export function getCompanyApplyListLog(query) {
  return request({
    url: '/settlement/company_apply_list_log',
    method: 'get',
    params: query
  })
}

export function getUserApplyListLog(query) {
  return request({
    url: '/settlement/user_apply_list_log',
    method: 'get',
    params: query
  })
}

export function getCompanyWithdrawalInfo(query) {
  return request({
    url: '/settlement/company_withdraw_info',
    method: 'get',
    params: query
  })
}

export function CompanyCheckWithdraw(data) {
  return request({
    url: '/settlement/company_check_withdraw',
    method: 'post',
    data
  })
}

export function UserCheckWithdraw(data) {
  return request({
    url: '/settlement/user_check_withdraw',
    method: 'post',
    data
  })
}

export function RechargeRecord(data) {
  return request({
    url: '/settlement/user_recharge_record',
    method: 'post',
    data
  })
}

export function company_apply_check(data) {
  return request({
    url: '/settlement/company_apply_check',
    method: 'post',
    data
  })
}

