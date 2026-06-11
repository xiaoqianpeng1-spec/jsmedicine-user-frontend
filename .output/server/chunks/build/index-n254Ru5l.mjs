import { b as useCookie, n as navigateTo } from './server.mjs';
import 'vue';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'vue/server-renderer';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import 'axios';

const BASE_URL = "";
function request(url, options = {}) {
  const token = useCookie("token");
  return $fetch(url, {
    baseURL: BASE_URL,
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      ...token.value ? { Authorization: `Bearer ${token.value}` } : {}
    },
    onResponse({ response }) {
      const { data } = response;
      if (data && data.success !== void 0) {
        if (data.success) {
          return data.data;
        }
        throw new Error(data.message || "\u8BF7\u6C42\u5931\u8D25");
      }
      return data;
    },
    onResponseError({ response }) {
      const { status } = response;
      switch (status) {
        case 401:
          const token2 = useCookie("token");
          token2.value = null;
          navigateTo("/");
          break;
        case 403:
          console.error("\u6CA1\u6709\u6743\u9650\u8BBF\u95EE");
          break;
        case 404:
          console.error("\u8BF7\u6C42\u7684\u8D44\u6E90\u4E0D\u5B58\u5728");
          break;
        case 500:
          console.error("\u670D\u52A1\u5668\u9519\u8BEF");
          break;
        default:
          console.error("\u8BF7\u6C42\u5931\u8D25:", response.statusText);
      }
    }
  });
}
function login(data) {
  return request("/app/auth/login", {
    method: "POST",
    body: data
  });
}
function sendSmsCode(data) {
  return request("/app/auth/sms-code", {
    method: "POST",
    body: data
  });
}
function smsLogin(data) {
  return request("/app/auth/sms-login", {
    method: "POST",
    body: data
  });
}
function wechatLogin(data) {
  return request("/app/auth/wechat-login", {
    method: "POST",
    body: data
  });
}
function wechatBindMobile(data) {
  return request("/app/auth/wechat-bind-mobile", {
    method: "POST",
    body: data
  });
}
function logout() {
  return request("/app/auth/logout", {
    method: "POST"
  });
}
function getCurrentUser() {
  return request("/app/auth/me", {
    method: "GET"
  });
}
function checkLoginStatus() {
  return request("/app/auth/status", {
    method: "GET"
  });
}
function getWechatWebQrConfig() {
  return request("/app/auth/wechat-web/qr-config", {
    method: "GET"
  });
}
function wechatWebLogin(data) {
  return request("/app/auth/wechat-web/login", {
    method: "POST",
    body: data
  });
}
function createQuestion(data) {
  return request({
    url: "/app/interaction/qa/questions",
    method: "POST",
    data
  });
}
function getMyQuestions(params) {
  return request({
    url: "/app/interaction/qa/questions",
    method: "GET",
    params
  });
}
function getQuestionDetail(id) {
  return request({
    url: `/app/interaction/qa/questions/${id}`,
    method: "GET"
  });
}
function submitFeedback(data) {
  return request({
    url: "/app/interaction/feedbacks",
    method: "POST",
    data
  });
}
function getKnowledgeCategoryTree() {
  return request({
    url: "/app/knowledge/categories/tree",
    method: "GET"
  });
}
function searchKnowledgeEntries(params) {
  return request({
    url: "/app/knowledge/entries",
    method: "GET",
    params
  });
}
function getKnowledgeEntryDetail(id) {
  return request({
    url: `/app/knowledge/entries/${id}`,
    method: "GET"
  });
}
function getLiveSessions(params) {
  return request({
    url: "/app/live-sessions",
    method: "GET",
    params
  });
}
function getLiveSessionDetail(id) {
  return request({
    url: `/app/live-sessions/${id}`,
    method: "GET"
  });
}
function getCourseList(params) {
  return request({
    url: "/app/learning/courses",
    method: "get",
    params
  });
}
function getCourseDetail(id) {
  return request({
    url: `/app/learning/courses/${id}`,
    method: "get"
  });
}
function getCourseVideo(courseId, videoId) {
  return request({
    url: `/app/learning/courses/${courseId}/videos/${videoId}`,
    method: "get"
  });
}
function getBookCategories() {
  return request({
    url: "/app/learning/book-categories",
    method: "get"
  });
}
function getBookList(params) {
  return request({
    url: "/app/learning/books",
    method: "get",
    params
  });
}
function getBookDetail(id) {
  return request({
    url: `/app/learning/books/${id}`,
    method: "get"
  });
}
function getBookChapter(bookId, chapterId) {
  return request({
    url: `/app/learning/books/${bookId}/chapters/${chapterId}`,
    method: "get"
  });
}
function getPodcastList(params) {
  return request({
    url: "/app/learning/podcasts",
    method: "get",
    params
  });
}
function getPodcastDetail(id) {
  return request({
    url: `/app/learning/podcasts/${id}`,
    method: "get"
  });
}
function getExamPapers(params) {
  return request({
    url: "/app/learning/exam-papers",
    method: "get",
    params
  });
}
function getExamPaperDetail(id) {
  return request({
    url: `/app/learning/exam-papers/${id}`,
    method: "get"
  });
}
function submitExam(data) {
  return request({
    url: "/app/learning/exam-submit",
    method: "post",
    data
  });
}
function getExamRecords(params) {
  return request({
    url: "/app/learning/exam-records",
    method: "get",
    params
  });
}
function getExamRecordDetail(id) {
  return request({
    url: `/app/learning/exam-records/${id}`,
    method: "get"
  });
}
function getTopicList(params) {
  return request({
    url: "/app/learning/topics",
    method: "get",
    params
  });
}
function getTopicDetail(id) {
  return request({
    url: `/app/learning/topics/${id}`,
    method: "get"
  });
}
function getLearningRecord(resourceType, resourceId) {
  return request({
    url: `/app/learning/records/${resourceType}/${resourceId}`,
    method: "get"
  });
}
function updateLearningRecord(data) {
  return request({
    url: "/app/learning/records",
    method: "post",
    data
  });
}
function getProfile() {
  return request({
    url: "/app/profile",
    method: "get"
  });
}
function updateProfile(data) {
  return request({
    url: "/app/profile",
    method: "put",
    data
  });
}
function getCertification() {
  return request({
    url: "/app/profile/certification",
    method: "get"
  });
}
function submitCertification(data) {
  return request({
    url: "/app/profile/certification",
    method: "post",
    data
  });
}
function getFavorites(params) {
  return request({
    url: "/app/profile/favorites",
    method: "get",
    params
  });
}
function addFavorite(data) {
  return request({
    url: "/app/profile/favorites",
    method: "post",
    data
  });
}
function removeFavorite(id) {
  return request({
    url: `/app/profile/favorites/${id}`,
    method: "delete"
  });
}
function getBrowseHistories(params) {
  return request({
    url: "/app/profile/browse-histories",
    method: "get",
    params
  });
}
function getProfileSummary() {
  return request({
    url: "/app/profile/summary",
    method: "get"
  });
}

export { addFavorite, checkLoginStatus, createQuestion, getBookCategories, getBookChapter, getBookDetail, getBookList, getBrowseHistories, getCertification, getCourseDetail, getCourseList, getCourseVideo, getCurrentUser, getExamPaperDetail, getExamPapers, getExamRecordDetail, getExamRecords, getFavorites, getKnowledgeCategoryTree, getKnowledgeEntryDetail, getLearningRecord, getLiveSessionDetail, getLiveSessions, getMyQuestions, getPodcastDetail, getPodcastList, getProfile, getProfileSummary, getQuestionDetail, getTopicDetail, getTopicList, getWechatWebQrConfig, login, logout, removeFavorite, searchKnowledgeEntries, sendSmsCode, smsLogin, submitCertification, submitExam, submitFeedback, updateLearningRecord, updateProfile, wechatBindMobile, wechatLogin, wechatWebLogin };
//# sourceMappingURL=index-n254Ru5l.mjs.map
