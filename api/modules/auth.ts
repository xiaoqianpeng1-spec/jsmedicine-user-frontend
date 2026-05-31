import { request } from '../request'
import type {
  AppLoginRequest,
  AppSmsCodeRequest,
  AppSmsLoginRequest,
  AppWechatLoginRequest,
  AppWechatBindMobileRequest,
  AppLoginResponse,
  AppWechatLoginResponse,
  CurrentAppUserResponse,
} from '~/api/types'

export function login(data: AppLoginRequest) {
  return request<AppLoginResponse>({
    url: '/app/auth/login',
    method: 'POST',
    data,
  })
}

export function sendSmsCode(data: AppSmsCodeRequest) {
  return request<void>({
    url: '/app/auth/sms-code',
    method: 'POST',
    data,
  })
}

export function smsLogin(data: AppSmsLoginRequest) {
  return request<AppLoginResponse>({
    url: '/app/auth/sms-login',
    method: 'POST',
    data,
  })
}

export function wechatLogin(data: AppWechatLoginRequest) {
  return request<AppWechatLoginResponse>({
    url: '/app/auth/wechat-login',
    method: 'POST',
    data,
  })
}

export function wechatBindMobile(data: AppWechatBindMobileRequest) {
  return request<AppLoginResponse>({
    url: '/app/auth/wechat-bind-mobile',
    method: 'POST',
    data,
  })
}

export function logout() {
  return request<void>({
    url: '/app/auth/logout',
    method: 'POST',
  })
}

export function getCurrentUser() {
  return request<CurrentAppUserResponse>({
    url: '/app/auth/me',
    method: 'GET',
  })
}

export function checkLoginStatus() {
  return request<boolean>({
    url: '/app/auth/status',
    method: 'GET',
  })
}
