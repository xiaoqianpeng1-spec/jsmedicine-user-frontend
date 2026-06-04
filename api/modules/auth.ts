import request from '../request'
import type {
  AppLoginRequest,
  AppSmsCodeRequest,
  AppSmsLoginRequest,
  AppWechatLoginRequest,
  AppWechatBindMobileRequest,
  AppLoginResponse,
  AppWechatLoginResponse,
  CurrentAppUserResponse,
  AppWechatWebQrConfigResponse,
  AppWechatWebLoginRequest,
} from '~/api/types'

export function login(data: AppLoginRequest) {
  return request<AppLoginResponse>('/app/auth/login', {
    method: 'POST',
    body: data,
  })
}

export function sendSmsCode(data: AppSmsCodeRequest) {
  return request<void>('/app/auth/sms-code', {
    method: 'POST',
    body: data,
  })
}

export function smsLogin(data: AppSmsLoginRequest) {
  return request<AppLoginResponse>('/app/auth/sms-login', {
    method: 'POST',
    body: data,
  })
}

export function wechatLogin(data: AppWechatLoginRequest) {
  return request<AppWechatLoginResponse>('/app/auth/wechat-login', {
    method: 'POST',
    body: data,
  })
}

export function wechatBindMobile(data: AppWechatBindMobileRequest) {
  return request<AppLoginResponse>('/app/auth/wechat-bind-mobile', {
    method: 'POST',
    body: data,
  })
}

export function logout() {
  return request<void>('/app/auth/logout', {
    method: 'POST',
  })
}

export function getCurrentUser() {
  return request<CurrentAppUserResponse>('/app/auth/me', {
    method: 'GET',
  })
}

export function checkLoginStatus() {
  return request<boolean>('/app/auth/status', {
    method: 'GET',
  })
}

export function getWechatWebQrConfig() {
  return request<AppWechatWebQrConfigResponse>('/app/auth/wechat-web/qr-config', {
    method: 'GET',
  })
}

export function wechatWebLogin(data: AppWechatWebLoginRequest) {
  return request<AppWechatLoginResponse>('/app/auth/wechat-web/login', {
    method: 'POST',
    body: data,
  })
}