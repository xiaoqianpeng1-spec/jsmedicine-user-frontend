import { defineComponent, ref, computed, watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { g as useRouter, f as useRoute, i as useUserStore, s as storeToRefs, p as profileApi, u as useApi, h as useRuntimeConfig } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import 'axios';

const expertsApi = {
  async getExpertCategories(params) {
    const queryParams = new URLSearchParams();
    queryParams.append("page", params.page.toString());
    queryParams.append("size", params.size.toString());
    if (params.keyword) queryParams.append("keyword", params.keyword);
    if (params.parentId !== void 0) queryParams.append("parentId", params.parentId.toString());
    return useApi(`/api/v1/app/experts/categories?${queryParams.toString()}`, {
      method: "GET"
    });
  },
  async getExperts(params) {
    const queryParams = new URLSearchParams();
    queryParams.append("page", params.page.toString());
    queryParams.append("size", params.size.toString());
    if (params.keyword) queryParams.append("keyword", params.keyword);
    if (params.categoryId !== void 0) queryParams.append("categoryId", params.categoryId.toString());
    return useApi(`/api/v1/app/experts?${queryParams.toString()}`, {
      method: "GET"
    });
  },
  async getExpertDetail(id) {
    return useApi(`/api/v1/app/experts/${id}`, {
      method: "GET"
    });
  },
  // 发起咨询
  async createQuestion(data) {
    return useApi("/api/v1/app/interaction/qa/questions", {
      method: "POST",
      body: data
    });
  },
  // 我的咨询列表
  async getMyQuestions(params) {
    const queryParams = new URLSearchParams();
    queryParams.append("page", params.page.toString());
    queryParams.append("size", params.size.toString());
    return useApi(`/api/v1/app/interaction/qa/questions?${queryParams.toString()}`, {
      method: "GET"
    });
  },
  // 我的咨询详情
  async getQuestionDetail(id) {
    return useApi(`/api/v1/app/interaction/qa/questions/${id}`, {
      method: "GET"
    });
  },
  // 提交反馈
  async submitFeedback(data) {
    return useApi("/api/v1/app/interaction/feedbacks", {
      method: "POST",
      body: data
    });
  },
  // 收藏或取消收藏资源
  async toggleFavorite(data) {
    return useApi("/api/v1/app/interaction/favorites", {
      method: "POST",
      body: data
    });
  }
};
const defaultAvatar = "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20cat%20avatar%20portrait%20simple&image_size=square";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "profile",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const route = useRoute();
    const userStore = useUserStore();
    const { userInfo } = storeToRefs(userStore);
    const loading = ref(false);
    const error = ref("");
    const activeMenu = ref("collect");
    const currentField = ref("");
    ref(null);
    const profileData = ref({
      id: 0,
      username: "",
      mobile: "",
      email: "",
      nickname: "",
      profileSignature: "",
      avatarUrl: "",
      authProvider: "",
      gender: "UNKNOWN",
      status: "ENABLED",
      profileCompleted: false,
      studentId: 0,
      certificationStatus: "UNSUBMITTED"
    });
    const editForm = ref({
      gender: "UNKNOWN",
      certificationStatus: "UNSUBMITTED"
    });
    const certificationForm = ref({
      realName: "",
      mobile: "",
      idCardNo: "",
      province: "",
      provinceCode: "",
      city: "",
      cityCode: "",
      district: "",
      districtCode: "",
      organization: "",
      organizationId: void 0,
      positionTitle: "",
      practiceTypeId: void 0,
      certificationMaterials: "",
      certificationFiles: []
    });
    const certificationResult = ref(null);
    const certificationSubmitting = ref(false);
    const certificationError = ref("");
    const certificationLoading = ref(false);
    const fetchCertification = async () => {
      certificationLoading.value = true;
      certificationError.value = "";
      try {
        const response = await profileApi.getCertification();
        if (response.success) {
          certificationResult.value = response.data;
          if (response.data.certificationStatus) {
            profileData.value.certificationStatus = response.data.certificationStatus;
            editForm.value.certificationStatus = response.data.certificationStatus;
          }
        } else {
          certificationError.value = response.message || "\u67E5\u8BE2\u8BA4\u8BC1\u7ED3\u679C\u5931\u8D25";
        }
      } catch (err) {
        certificationError.value = err.message || "\u67E5\u8BE2\u8BA4\u8BC1\u7ED3\u679C\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5";
        console.error("\u67E5\u8BE2\u8BA4\u8BC1\u7ED3\u679C\u5931\u8D25:", err);
      } finally {
        certificationLoading.value = false;
      }
    };
    const genderLabels = {
      "UNKNOWN": "\u672A\u77E5",
      "MALE": "\u7537",
      "FEMALE": "\u5973"
    };
    const numToGender = {
      0: "UNKNOWN",
      1: "MALE",
      2: "FEMALE"
    };
    const certificationStatusLabels = {
      "UNSUBMITTED": "\u672A\u63D0\u4EA4",
      "PENDING": "\u5BA1\u6838\u4E2D",
      "APPROVED": "\u5DF2\u901A\u8FC7",
      "REJECTED": "\u5DF2\u62D2\u7EDD"
    };
    const numToCertStatus = {
      0: "UNSUBMITTED",
      1: "PENDING",
      2: "APPROVED",
      3: "REJECTED"
    };
    const genderLabel = computed(() => {
      const gender = editForm.value.gender;
      if (typeof gender === "number") {
        const genderStr = numToGender[gender] || "UNKNOWN";
        return genderLabels[genderStr] || "\u672A\u77E5";
      }
      return genderLabels[gender || "UNKNOWN"] || "\u672A\u77E5";
    });
    const certificationStatusLabel = computed(() => {
      return certificationStatusLabels[editForm.value.certificationStatus || "UNSUBMITTED"] || "\u672A\u63D0\u4EA4";
    });
    const syncEditForm = () => {
      const data = { ...profileData.value };
      if (typeof data.gender === "number") {
        data.gender = numToGender[data.gender] || "UNKNOWN";
      }
      if (typeof data.certificationStatus === "number") {
        data.certificationStatus = numToCertStatus[data.certificationStatus] || "UNSUBMITTED";
      }
      editForm.value = data;
    };
    const getFullAvatarUrl = (url) => {
      if (!url) return defaultAvatar;
      if (url.startsWith("http")) return url;
      if (url.startsWith("/api/v1")) {
        return url;
      }
      const config = useRuntimeConfig();
      const baseUrl = config.public.apiBase || "";
      return baseUrl + url;
    };
    const displayInfo = computed(() => {
      const data = activeMenu.value === "edit" ? editForm.value : profileData.value;
      return {
        avatar: getFullAvatarUrl(data.avatarUrl),
        nickname: data.nickname || data.username || "\u672A\u8BBE\u7F6E\u6635\u79F0",
        role: data.certificationStatus === "APPROVED" ? "\u5DF2\u8BA4\u8BC1\u5B66\u5458" : "\u5B66\u5458",
        motto: data.profileSignature || "\u5B66\u4E60\u53E3\u53F7\uFF1A\u52A0\u6CB9\uFF01\uFF01"
      };
    });
    watch(profileData, () => {
      syncEditForm();
    }, { immediate: true, deep: true });
    watch(activeMenu, (newMenu) => {
      if (newMenu === "certification") {
        fetchCertification();
      } else if (newMenu === "question") {
        fetchQuestions();
      }
    });
    const navList = ref([
      { id: "collect", icon: "icon-star", label: "\u6211\u7684\u6536\u85CF" },
      { id: "history", icon: "icon-eye", label: "\u6D4F\u89C8\u8BB0\u5F55" },
      { id: "question", icon: "icon-chat", label: "\u6211\u7684\u95EE\u7B54" },
      { id: "exam", icon: "icon-file", label: "\u6211\u7684\u8003\u6838" },
      { id: "stat", icon: "icon-bar", label: "\u5B66\u4E60\u7EDF\u8BA1" },
      { id: "certification", icon: "icon-cert", label: "\u5B66\u5458\u8BA4\u8BC1" },
      { id: "edit", icon: "icon-edit", label: "\u7F16\u8F91\u8D44\u6599" }
    ]);
    const collectList = ref([]);
    const favoritesPage = ref(null);
    const favoritesLoading = ref(false);
    const favoritesError = ref("");
    const fetchFavorites = async (page = 1, size = 20) => {
      favoritesLoading.value = true;
      favoritesError.value = "";
      try {
        const response = await profileApi.getFavorites(page, size);
        if (response.success) {
          favoritesPage.value = response.data;
          collectList.value = response.data.records;
        } else {
          favoritesError.value = response.message || "\u67E5\u8BE2\u6536\u85CF\u5931\u8D25";
        }
      } catch (err) {
        favoritesError.value = err.message || "\u67E5\u8BE2\u6536\u85CF\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5";
        console.error("\u67E5\u8BE2\u6536\u85CF\u5931\u8D25:", err);
      } finally {
        favoritesLoading.value = false;
      }
    };
    watch(activeMenu, (newMenu) => {
      if (newMenu === "collect") {
        fetchFavorites();
      }
    });
    const historyList = ref([]);
    const historyPage = ref(null);
    const historyLoading = ref(false);
    const historyError = ref("");
    const fetchHistory = async (page = 1, size = 20) => {
      historyLoading.value = true;
      historyError.value = "";
      try {
        const response = await profileApi.getBrowseHistories(page, size);
        if (response.success) {
          historyPage.value = response.data;
          historyList.value = response.data.records;
        } else {
          historyError.value = response.message || "\u67E5\u8BE2\u6D4F\u89C8\u8BB0\u5F55\u5931\u8D25";
        }
      } catch (err) {
        historyError.value = err.message || "\u67E5\u8BE2\u6D4F\u89C8\u8BB0\u5F55\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5";
        console.error("\u67E5\u8BE2\u6D4F\u89C8\u8BB0\u5F55\u5931\u8D25:", err);
      } finally {
        historyLoading.value = false;
      }
    };
    watch(activeMenu, (newMenu) => {
      if (newMenu === "history") {
        fetchHistory();
      }
    });
    const questionList = ref([]);
    const questionsLoading = ref(false);
    const questionsError = ref("");
    const examList = ref([
      { id: 1, title: "\u4E2D\u533B\u57FA\u7840\u7406\u8BBA\u8003\u6838", date: "2024-01-10", score: "92", grade: "\u4F18\u79C0", gradeClass: "excellent" },
      { id: 2, title: "\u9488\u7078\u5B66\u8003\u6838", date: "2024-01-15", score: "85", grade: "\u826F\u597D", gradeClass: "good" }
    ]);
    const statList = ref([
      { id: 1, icon: "\u25A4", value: "48", label: "\u5B66\u4E60\u65F6\u957F(\u5C0F\u65F6)" },
      { id: 2, icon: "\u25A2", value: "12", label: "\u5B8C\u6210\u8BFE\u7A0B" },
      { id: 3, icon: "\u2713", value: "6", label: "\u5B8C\u6210\u8003\u6838" },
      { id: 4, icon: "\u25A3", value: "8", label: "\u63D0\u95EE\u6B21\u6570" }
    ]);
    const fetchQuestions = async () => {
      questionsLoading.value = true;
      questionsError.value = "";
      try {
        const response = await expertsApi.getMyQuestions({
          page: 1,
          size: 20
        });
        if (response.success) {
          questionList.value = response.data.records;
        } else {
          questionsError.value = response.message || "\u67E5\u8BE2\u95EE\u7B54\u5931\u8D25";
        }
      } catch (err) {
        questionsError.value = err.message || "\u67E5\u8BE2\u95EE\u7B54\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5";
        console.error("\u67E5\u8BE2\u95EE\u7B54\u5931\u8D25:", err);
      } finally {
        questionsLoading.value = false;
      }
    };
    const getQuestionStatusLabel = (status) => {
      const map = {
        PENDING: "\u5F85\u56DE\u590D",
        ANSWERED: "\u5DF2\u56DE\u7B54",
        CLOSED: "\u5DF2\u5173\u95ED"
      };
      return map[status] || status;
    };
    const getQuestionStatusClass = (status) => {
      const map = {
        PENDING: "wait",
        ANSWERED: "ok",
        CLOSED: "closed"
      };
      return map[status] || "";
    };
    const truncateText = (text, maxLen) => {
      if (!text) return "";
      return text.length > maxLen ? text.substring(0, maxLen) + "..." : text;
    };
    const fetchProfile = async () => {
      loading.value = true;
      error.value = "";
      try {
        const response = await profileApi.getProfile();
        if (response.success) {
          profileData.value = response.data;
          const genderStr = typeof response.data.gender === "number" ? numToGender[response.data.gender] || "UNKNOWN" : response.data.gender || "UNKNOWN";
          userStore.updateUserInfo({
            id: response.data.id,
            username: response.data.username,
            nickname: response.data.nickname,
            avatar: getFullAvatarUrl(response.data.avatarUrl),
            mobile: response.data.mobile,
            gender: genderStr
          });
        } else {
          error.value = response.message || "\u83B7\u53D6\u4E2A\u4EBA\u8D44\u6599\u5931\u8D25";
        }
      } catch (err) {
        error.value = err.message || "\u7F51\u7EDC\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5";
        console.error("Failed to fetch profile:", err);
      } finally {
        loading.value = false;
      }
    };
    watch(() => route.path, (newPath) => {
      if (newPath === "/profile") {
        fetchProfile();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "profile-page" }, _attrs))} data-v-00c2b474>`);
      if (loading.value) {
        _push(`<div class="loading-state" data-v-00c2b474><div class="spinner" data-v-00c2b474></div><p data-v-00c2b474>\u52A0\u8F7D\u4E2D...</p></div>`);
      } else if (error.value) {
        _push(`<div class="error-state" data-v-00c2b474><p data-v-00c2b474>${ssrInterpolate(error.value)}</p><button class="retry-btn" data-v-00c2b474>\u91CD\u8BD5</button></div>`);
      } else {
        _push(`<div class="container" data-v-00c2b474><div class="profile-layout" data-v-00c2b474><aside class="sidebar" data-v-00c2b474><div class="user-card" data-v-00c2b474><div class="avatar-box" data-v-00c2b474><img${ssrRenderAttr("src", displayInfo.value.avatar)} alt="\u5934\u50CF" class="avatar" data-v-00c2b474><span class="role-tag" data-v-00c2b474>${ssrInterpolate(displayInfo.value.role)}</span></div><h2 class="username" data-v-00c2b474>${ssrInterpolate(displayInfo.value.nickname)}</h2><p class="motto" data-v-00c2b474>${ssrInterpolate(displayInfo.value.motto)}</p><div class="btn-group" data-v-00c2b474><button class="btn edit-btn" data-v-00c2b474>\u7F16\u8F91\u8D44\u6599</button><button class="btn logout-btn" data-v-00c2b474>\u9000\u51FA\u767B\u5F55</button></div></div><nav class="side-nav" data-v-00c2b474><ul data-v-00c2b474><!--[-->`);
        ssrRenderList(navList.value, (item) => {
          _push(`<li class="${ssrRenderClass([{ active: activeMenu.value === item.id }, "nav-item"])}" data-v-00c2b474><span class="${ssrRenderClass([item.icon, "icon-wrap"])}" data-v-00c2b474></span><span class="text" data-v-00c2b474>${ssrInterpolate(item.label)}</span></li>`);
        });
        _push(`<!--]--></ul></nav></aside><main class="main" data-v-00c2b474><div class="breadcrumb" data-v-00c2b474><span data-v-00c2b474>\u60A8\u7684\u4F4D\u7F6E\uFF1A\u9996\u9875 &gt; \u4E2A\u4EBA\u4E2D\u5FC3</span></div>`);
        if (activeMenu.value === "collect") {
          _push(`<div class="content-card" data-v-00c2b474><div class="card-title" data-v-00c2b474>\u6211\u7684\u6536\u85CF</div>`);
          if (favoritesLoading.value) {
            _push(`<div class="loading-state small" data-v-00c2b474><div class="spinner" data-v-00c2b474></div><p data-v-00c2b474>\u52A0\u8F7D\u4E2D...</p></div>`);
          } else if (favoritesError.value) {
            _push(`<div class="error-state small" data-v-00c2b474><p data-v-00c2b474>${ssrInterpolate(favoritesError.value)}</p><button class="retry-btn" data-v-00c2b474>\u91CD\u8BD5</button></div>`);
          } else if (collectList.value.length === 0) {
            _push(`<div class="empty-state" data-v-00c2b474><div class="empty-icon" data-v-00c2b474>\u2606</div><p data-v-00c2b474>\u6682\u65E0\u6536\u85CF\u5185\u5BB9</p></div>`);
          } else {
            _push(`<div class="list-wrap" data-v-00c2b474><!--[-->`);
            ssrRenderList(collectList.value, (item) => {
              _push(`<div class="list-item" data-v-00c2b474><div class="item-info" data-v-00c2b474><div class="item-name" data-v-00c2b474>${ssrInterpolate(item.source || "\u672A\u77E5\u8D44\u6E90")}</div><div class="item-desc" data-v-00c2b474><span data-v-00c2b474>\u7C7B\u578B: ${ssrInterpolate(item.resourceType)}</span><span class="divider" data-v-00c2b474>|</span><span data-v-00c2b474>\u6D4F\u89C8: ${ssrInterpolate(item.viewCount)}\u6B21</span><span class="divider" data-v-00c2b474>|</span><span data-v-00c2b474>${ssrInterpolate(item.occurredAt)}</span></div></div></div>`);
            });
            _push(`<!--]--></div>`);
          }
          _push(`</div>`);
        } else if (activeMenu.value === "history") {
          _push(`<div class="content-card" data-v-00c2b474><div class="card-title" data-v-00c2b474>\u6D4F\u89C8\u8BB0\u5F55</div>`);
          if (historyLoading.value) {
            _push(`<div class="loading-state small" data-v-00c2b474><div class="spinner" data-v-00c2b474></div><p data-v-00c2b474>\u52A0\u8F7D\u4E2D...</p></div>`);
          } else if (historyError.value) {
            _push(`<div class="error-state small" data-v-00c2b474><p data-v-00c2b474>${ssrInterpolate(historyError.value)}</p><button class="retry-btn" data-v-00c2b474>\u91CD\u8BD5</button></div>`);
          } else if (historyList.value.length === 0) {
            _push(`<div class="empty-state" data-v-00c2b474><div class="empty-icon" data-v-00c2b474>\u{1F441}\uFE0F</div><p data-v-00c2b474>\u6682\u65E0\u6D4F\u89C8\u8BB0\u5F55</p></div>`);
          } else {
            _push(`<div class="list-wrap" data-v-00c2b474><!--[-->`);
            ssrRenderList(historyList.value, (item) => {
              _push(`<div class="list-item" data-v-00c2b474><div class="item-info" data-v-00c2b474><div class="item-name" data-v-00c2b474>${ssrInterpolate(item.source || "\u672A\u77E5\u8D44\u6E90")}</div><div class="item-desc" data-v-00c2b474><span data-v-00c2b474>\u7C7B\u578B: ${ssrInterpolate(item.resourceType)}</span><span class="divider" data-v-00c2b474>|</span><span data-v-00c2b474>\u6D4F\u89C8: ${ssrInterpolate(item.viewCount)}\u6B21</span><span class="divider" data-v-00c2b474>|</span><span data-v-00c2b474>${ssrInterpolate(item.occurredAt)}</span></div></div></div>`);
            });
            _push(`<!--]--></div>`);
          }
          _push(`</div>`);
        } else if (activeMenu.value === "question") {
          _push(`<div class="content-card" data-v-00c2b474><div class="card-title" data-v-00c2b474>\u6211\u7684\u95EE\u7B54</div>`);
          if (questionsLoading.value) {
            _push(`<div class="loading-state small" data-v-00c2b474><p data-v-00c2b474>\u52A0\u8F7D\u4E2D...</p></div>`);
          } else if (questionsError.value) {
            _push(`<div class="error-state small" data-v-00c2b474><p data-v-00c2b474>${ssrInterpolate(questionsError.value)}</p><button class="retry-btn" data-v-00c2b474>\u91CD\u8BD5</button></div>`);
          } else if (questionList.value.length === 0) {
            _push(`<div class="empty-state" data-v-00c2b474><div class="empty-icon" data-v-00c2b474>\u{1F4AC}</div><p data-v-00c2b474>\u6682\u65E0\u95EE\u7B54\u8BB0\u5F55</p><button class="empty-btn" data-v-00c2b474>\u53BB\u54A8\u8BE2\u4E13\u5BB6</button></div>`);
          } else {
            _push(`<div class="list-wrap" data-v-00c2b474><!--[-->`);
            ssrRenderList(questionList.value, (item) => {
              _push(`<div class="q-item" data-v-00c2b474><div class="q-left" data-v-00c2b474><div class="q-title" data-v-00c2b474>${ssrInterpolate(item.title)}</div><div class="q-desc" data-v-00c2b474>${ssrInterpolate(truncateText(item.content, 50))}</div></div><span class="${ssrRenderClass([getQuestionStatusClass(item.status), "q-status"])}" data-v-00c2b474>${ssrInterpolate(getQuestionStatusLabel(item.status))}</span></div>`);
            });
            _push(`<!--]--></div>`);
          }
          _push(`</div>`);
        } else if (activeMenu.value === "exam") {
          _push(`<div class="content-card" data-v-00c2b474><div class="card-title" data-v-00c2b474>\u6211\u7684\u8003\u6838</div><div class="list-wrap" data-v-00c2b474><!--[-->`);
          ssrRenderList(examList.value, (item) => {
            _push(`<div class="exam-item" data-v-00c2b474><div class="exam-left" data-v-00c2b474><div class="exam-title" data-v-00c2b474>${ssrInterpolate(item.title)}</div><div class="exam-date" data-v-00c2b474>${ssrInterpolate(item.date)}</div></div><div class="exam-right" data-v-00c2b474><span class="score" data-v-00c2b474>${ssrInterpolate(item.score)}</span><span class="${ssrRenderClass([item.gradeClass, "grade"])}" data-v-00c2b474>${ssrInterpolate(item.grade)}</span></div></div>`);
          });
          _push(`<!--]--></div></div>`);
        } else if (activeMenu.value === "stat") {
          _push(`<div class="content-card" data-v-00c2b474><div class="card-title" data-v-00c2b474>\u5B66\u4E60\u7EDF\u8BA1</div><div class="stat-grid" data-v-00c2b474><!--[-->`);
          ssrRenderList(statList.value, (item) => {
            _push(`<div class="stat-item" data-v-00c2b474><span class="stat-icon" data-v-00c2b474>${ssrInterpolate(item.icon)}</span><div class="stat-num" data-v-00c2b474>${ssrInterpolate(item.value)}</div><div class="stat-text" data-v-00c2b474>${ssrInterpolate(item.label)}</div></div>`);
          });
          _push(`<!--]--></div></div>`);
        } else if (activeMenu.value === "certification") {
          _push(`<div class="content-card certification-card" data-v-00c2b474><div class="card-title" data-v-00c2b474>\u5B66\u5458\u8BA4\u8BC1</div>`);
          if (certificationLoading.value) {
            _push(`<div class="loading-state small" data-v-00c2b474><div class="spinner" data-v-00c2b474></div><p data-v-00c2b474>\u52A0\u8F7D\u4E2D...</p></div>`);
          } else {
            _push(`<!--[--><div class="cert-status-box" data-v-00c2b474><span class="cert-status-label" data-v-00c2b474>\u5F53\u524D\u72B6\u6001\uFF1A</span><span class="${ssrRenderClass([typeof editForm.value.certificationStatus === "string" ? editForm.value.certificationStatus.toLowerCase() : "", "cert-status-tag"])}" data-v-00c2b474>${ssrInterpolate(certificationStatusLabel.value)}</span></div>`);
            if (((_a = certificationResult.value) == null ? void 0 : _a.rejectReason) && editForm.value.certificationStatus === "REJECTED") {
              _push(`<div class="reject-reason" data-v-00c2b474><span class="reject-label" data-v-00c2b474>\u62D2\u7EDD\u539F\u56E0\uFF1A</span><span class="reject-text" data-v-00c2b474>${ssrInterpolate(certificationResult.value.rejectReason)}</span></div>`);
            } else {
              _push(`<!---->`);
            }
            if (certificationResult.value && (editForm.value.certificationStatus === "PENDING" || editForm.value.certificationStatus === "APPROVED")) {
              _push(`<div class="cert-result" data-v-00c2b474><h4 class="section-title" data-v-00c2b474>\u8BA4\u8BC1\u4FE1\u606F</h4><div class="result-grid" data-v-00c2b474><div class="result-item" data-v-00c2b474><span class="result-label" data-v-00c2b474>\u5B66\u5458\u7F16\u53F7</span><span class="result-value" data-v-00c2b474>${ssrInterpolate(certificationResult.value.studentNo || "\u6682\u65E0")}</span></div><div class="result-item" data-v-00c2b474><span class="result-label" data-v-00c2b474>\u771F\u5B9E\u59D3\u540D</span><span class="result-value" data-v-00c2b474>${ssrInterpolate(certificationResult.value.realName || "\u6682\u65E0")}</span></div><div class="result-item" data-v-00c2b474><span class="result-label" data-v-00c2b474>\u624B\u673A\u53F7\u7801</span><span class="result-value" data-v-00c2b474>${ssrInterpolate(certificationResult.value.mobile || "\u6682\u65E0")}</span></div><div class="result-item" data-v-00c2b474><span class="result-label" data-v-00c2b474>\u6240\u5728\u5730\u533A</span><span class="result-value" data-v-00c2b474>${ssrInterpolate(certificationResult.value.province)} ${ssrInterpolate(certificationResult.value.city)} ${ssrInterpolate(certificationResult.value.district)}</span></div><div class="result-item" data-v-00c2b474><span class="result-label" data-v-00c2b474>\u5DE5\u4F5C\u5355\u4F4D</span><span class="result-value" data-v-00c2b474>${ssrInterpolate(certificationResult.value.organization || "\u6682\u65E0")}</span></div><div class="result-item" data-v-00c2b474><span class="result-label" data-v-00c2b474>\u804C\u4F4D\u804C\u79F0</span><span class="result-value" data-v-00c2b474>${ssrInterpolate(certificationResult.value.positionTitle || "\u6682\u65E0")}</span></div><div class="result-item" data-v-00c2b474><span class="result-label" data-v-00c2b474>\u5B66\u5458\u72B6\u6001</span><span class="result-value" data-v-00c2b474>${ssrInterpolate(certificationResult.value.status === "ENABLED" ? "\u542F\u7528" : "\u7981\u7528")}</span></div><div class="result-item" data-v-00c2b474><span class="result-label" data-v-00c2b474>\u63D0\u4EA4\u65F6\u95F4</span><span class="result-value" data-v-00c2b474>${ssrInterpolate(certificationResult.value.certificationSubmittedAt || "\u6682\u65E0")}</span></div>`);
              if (certificationResult.value.certificationReviewedAt) {
                _push(`<div class="result-item" data-v-00c2b474><span class="result-label" data-v-00c2b474>\u5BA1\u6838\u65F6\u95F4</span><span class="result-value" data-v-00c2b474>${ssrInterpolate(certificationResult.value.certificationReviewedAt)}</span></div>`);
              } else {
                _push(`<!---->`);
              }
              if (certificationResult.value.enrolledAt) {
                _push(`<div class="result-item" data-v-00c2b474><span class="result-label" data-v-00c2b474>\u5165\u5B66\u65F6\u95F4</span><span class="result-value" data-v-00c2b474>${ssrInterpolate(certificationResult.value.enrolledAt)}</span></div>`);
              } else {
                _push(`<!---->`);
              }
              if (certificationResult.value.certificationMaterials) {
                _push(`<div class="result-item" data-v-00c2b474><span class="result-label" data-v-00c2b474>\u8865\u5145\u8BF4\u660E</span><span class="result-value" data-v-00c2b474>${ssrInterpolate(certificationResult.value.certificationMaterials)}</span></div>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</div>`);
              if (certificationResult.value.certificationFiles && certificationResult.value.certificationFiles.length > 0) {
                _push(`<div class="cert-files" data-v-00c2b474><h4 class="section-title" data-v-00c2b474>\u8BA4\u8BC1\u6750\u6599</h4><div class="file-list" data-v-00c2b474><!--[-->`);
                ssrRenderList(certificationResult.value.certificationFiles, (file) => {
                  _push(`<div class="file-item" data-v-00c2b474><span class="file-type" data-v-00c2b474>${ssrInterpolate(file.materialType || "\u9644\u4EF6")}</span><a${ssrRenderAttr("href", file.sourceUrl)} target="_blank" class="file-link" data-v-00c2b474>${ssrInterpolate(file.sourceUrl)}</a></div>`);
                });
                _push(`<!--]--></div></div>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</div>`);
            } else {
              _push(`<!---->`);
            }
            if (editForm.value.certificationStatus === "UNSUBMITTED" || editForm.value.certificationStatus === "REJECTED") {
              _push(`<form class="cert-form" data-v-00c2b474><div class="form-section" data-v-00c2b474><h4 class="section-title" data-v-00c2b474>\u57FA\u672C\u4FE1\u606F</h4><div class="form-row cert-row" data-v-00c2b474><label class="form-label" data-v-00c2b474>\u771F\u5B9E\u59D3\u540D <span class="required" data-v-00c2b474>*</span></label><input${ssrRenderAttr("value", certificationForm.value.realName)} class="form-input cert-input" placeholder="\u8BF7\u8F93\u5165\u771F\u5B9E\u59D3\u540D" maxlength="64" data-v-00c2b474></div><div class="form-row cert-row" data-v-00c2b474><label class="form-label" data-v-00c2b474>\u624B\u673A\u53F7\u7801</label><input${ssrRenderAttr("value", certificationForm.value.mobile)} class="form-input cert-input" type="tel" placeholder="\u8BF7\u8F93\u5165\u624B\u673A\u53F7\u7801" maxlength="32" data-v-00c2b474></div><div class="form-row cert-row" data-v-00c2b474><label class="form-label" data-v-00c2b474>\u8EAB\u4EFD\u8BC1\u53F7</label><input${ssrRenderAttr("value", certificationForm.value.idCardNo)} class="form-input cert-input" placeholder="\u8BF7\u8F93\u5165\u8EAB\u4EFD\u8BC1\u53F7\u7801" maxlength="32" data-v-00c2b474></div></div><div class="form-section" data-v-00c2b474><h4 class="section-title" data-v-00c2b474>\u6240\u5728\u5730\u533A</h4><div class="form-row cert-row" data-v-00c2b474><label class="form-label" data-v-00c2b474>\u7701\u4EFD</label><input${ssrRenderAttr("value", certificationForm.value.province)} class="form-input cert-input" placeholder="\u8BF7\u8F93\u5165\u7701\u4EFD" maxlength="64" data-v-00c2b474></div><div class="form-row cert-row" data-v-00c2b474><label class="form-label" data-v-00c2b474>\u7701\u4EFD\u7F16\u7801</label><input${ssrRenderAttr("value", certificationForm.value.provinceCode)} class="form-input cert-input" placeholder="\u8BF7\u8F93\u5165\u7701\u4EFD\u7F16\u7801" maxlength="32" data-v-00c2b474></div><div class="form-row cert-row" data-v-00c2b474><label class="form-label" data-v-00c2b474>\u57CE\u5E02</label><input${ssrRenderAttr("value", certificationForm.value.city)} class="form-input cert-input" placeholder="\u8BF7\u8F93\u5165\u57CE\u5E02" maxlength="64" data-v-00c2b474></div><div class="form-row cert-row" data-v-00c2b474><label class="form-label" data-v-00c2b474>\u57CE\u5E02\u7F16\u7801</label><input${ssrRenderAttr("value", certificationForm.value.cityCode)} class="form-input cert-input" placeholder="\u8BF7\u8F93\u5165\u57CE\u5E02\u7F16\u7801" maxlength="32" data-v-00c2b474></div><div class="form-row cert-row" data-v-00c2b474><label class="form-label" data-v-00c2b474>\u533A\u53BF</label><input${ssrRenderAttr("value", certificationForm.value.district)} class="form-input cert-input" placeholder="\u8BF7\u8F93\u5165\u533A\u53BF" maxlength="64" data-v-00c2b474></div><div class="form-row cert-row" data-v-00c2b474><label class="form-label" data-v-00c2b474>\u533A\u53BF\u7F16\u7801</label><input${ssrRenderAttr("value", certificationForm.value.districtCode)} class="form-input cert-input" placeholder="\u8BF7\u8F93\u5165\u533A\u53BF\u7F16\u7801" maxlength="32" data-v-00c2b474></div></div><div class="form-section" data-v-00c2b474><h4 class="section-title" data-v-00c2b474>\u5DE5\u4F5C\u4FE1\u606F</h4><div class="form-row cert-row" data-v-00c2b474><label class="form-label" data-v-00c2b474>\u5DE5\u4F5C\u5355\u4F4D</label><input${ssrRenderAttr("value", certificationForm.value.organization)} class="form-input cert-input" placeholder="\u8BF7\u8F93\u5165\u5DE5\u4F5C\u5355\u4F4D" maxlength="128" data-v-00c2b474></div><div class="form-row cert-row" data-v-00c2b474><label class="form-label" data-v-00c2b474>\u5355\u4F4DID</label><input${ssrRenderAttr("value", certificationForm.value.organizationId)} class="form-input cert-input" type="number" placeholder="\u8BF7\u8F93\u5165\u5355\u4F4DID" data-v-00c2b474></div><div class="form-row cert-row" data-v-00c2b474><label class="form-label" data-v-00c2b474>\u804C\u4F4D\u804C\u79F0</label><input${ssrRenderAttr("value", certificationForm.value.positionTitle)} class="form-input cert-input" placeholder="\u8BF7\u8F93\u5165\u804C\u4F4D\u804C\u79F0" maxlength="128" data-v-00c2b474></div><div class="form-row cert-row" data-v-00c2b474><label class="form-label" data-v-00c2b474>\u6267\u4E1A\u7C7B\u578BID</label><input${ssrRenderAttr("value", certificationForm.value.practiceTypeId)} class="form-input cert-input" type="number" placeholder="\u8BF7\u8F93\u5165\u6267\u4E1A\u7C7B\u578BID" data-v-00c2b474></div></div><div class="form-section" data-v-00c2b474><h4 class="section-title" data-v-00c2b474>\u8BA4\u8BC1\u6750\u6599</h4><div class="form-row cert-row" data-v-00c2b474><label class="form-label" data-v-00c2b474>\u8865\u5145\u8BF4\u660E</label><textarea class="form-textarea" placeholder="\u8BF7\u8F93\u5165\u5176\u4ED6\u9700\u8981\u8BF4\u660E\u7684\u4FE1\u606F" rows="4" data-v-00c2b474>${ssrInterpolate(certificationForm.value.certificationMaterials)}</textarea></div></div>`);
              if (certificationError.value) {
                _push(`<div class="error-message" data-v-00c2b474>${ssrInterpolate(certificationError.value)}</div>`);
              } else {
                _push(`<!---->`);
              }
              _push(`<div class="form-actions" data-v-00c2b474><button type="submit" class="save-btn cert-submit-btn"${ssrIncludeBooleanAttr(certificationSubmitting.value) ? " disabled" : ""} data-v-00c2b474>${ssrInterpolate(certificationSubmitting.value ? "\u63D0\u4EA4\u4E2D..." : editForm.value.certificationStatus === "REJECTED" ? "\u91CD\u65B0\u63D0\u4EA4\u8BA4\u8BC1" : "\u63D0\u4EA4\u8BA4\u8BC1\u7533\u8BF7")}</button></div></form>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<!--]-->`);
          }
          _push(`</div>`);
        } else if (activeMenu.value === "edit") {
          _push(`<div class="content-card edit-card" data-v-00c2b474><div class="edit-header" data-v-00c2b474><h3 class="card-title" data-v-00c2b474>\u4FEE\u6539\u8D44\u6599</h3><div class="edit-avatar-wrap" data-v-00c2b474><div class="avatar-box edit-avatar" data-v-00c2b474><img${ssrRenderAttr("src", getFullAvatarUrl(editForm.value.avatarUrl))} alt="\u5934\u50CF" class="avatar" data-v-00c2b474><span class="edit-role-tag" data-v-00c2b474>${ssrInterpolate(editForm.value.certificationStatus === "APPROVED" ? "\u5DF2\u8BA4\u8BC1\u5B66\u5458" : "\u5B66\u5458")}</span></div><input type="file" accept="image/*" class="file-input" data-v-00c2b474></div></div><form class="edit-form" data-v-00c2b474><div class="form-row" data-v-00c2b474><label class="form-label" data-v-00c2b474>\u6027\u522B</label><div class="form-value" data-v-00c2b474>${ssrInterpolate(genderLabel.value)} <span class="arrow" data-v-00c2b474>\u203A</span></div>`);
          if (currentField.value === "gender") {
            _push(`<select class="form-select" data-v-00c2b474><option value="UNKNOWN" data-v-00c2b474${ssrIncludeBooleanAttr(Array.isArray(editForm.value.gender) ? ssrLooseContain(editForm.value.gender, "UNKNOWN") : ssrLooseEqual(editForm.value.gender, "UNKNOWN")) ? " selected" : ""}>\u672A\u77E5</option><option value="MALE" data-v-00c2b474${ssrIncludeBooleanAttr(Array.isArray(editForm.value.gender) ? ssrLooseContain(editForm.value.gender, "MALE") : ssrLooseEqual(editForm.value.gender, "MALE")) ? " selected" : ""}>\u7537</option><option value="FEMALE" data-v-00c2b474${ssrIncludeBooleanAttr(Array.isArray(editForm.value.gender) ? ssrLooseContain(editForm.value.gender, "FEMALE") : ssrLooseEqual(editForm.value.gender, "FEMALE")) ? " selected" : ""}>\u5973</option></select>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="form-row" data-v-00c2b474><label class="form-label" data-v-00c2b474>\u6635\u79F0</label><div class="form-value" data-v-00c2b474>${ssrInterpolate(editForm.value.nickname || "\u672A\u8BBE\u7F6E")} <span class="arrow" data-v-00c2b474>\u203A</span></div>`);
          if (currentField.value === "nickname") {
            _push(`<input${ssrRenderAttr("value", editForm.value.nickname)} class="form-input" placeholder="\u8BF7\u8F93\u5165\u6635\u79F0"${ssrIncludeBooleanAttr(currentField.value === "nickname") ? " autofocus" : ""} data-v-00c2b474>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="form-row" data-v-00c2b474><label class="form-label" data-v-00c2b474>\u7535\u8BDD</label><div class="form-value" data-v-00c2b474>${ssrInterpolate(editForm.value.mobile || "\u672A\u7ED1\u5B9A")}</div></div><div class="form-row" data-v-00c2b474><label class="form-label" data-v-00c2b474>\u90AE\u7BB1</label><div class="form-value" data-v-00c2b474>${ssrInterpolate(editForm.value.email || "\u672A\u7ED1\u5B9A")} <span class="arrow" data-v-00c2b474>\u203A</span></div>`);
          if (currentField.value === "email") {
            _push(`<input${ssrRenderAttr("value", editForm.value.email)} class="form-input" type="email" placeholder="\u8BF7\u8F93\u5165\u90AE\u7BB1"${ssrIncludeBooleanAttr(currentField.value === "email") ? " autofocus" : ""} data-v-00c2b474>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="form-row" data-v-00c2b474><label class="form-label" data-v-00c2b474>\u8BA4\u8BC1\u72B6\u6001</label><div class="${ssrRenderClass([typeof editForm.value.certificationStatus === "string" ? editForm.value.certificationStatus.toLowerCase() : "", "form-value certification-status"])}" data-v-00c2b474>${ssrInterpolate(certificationStatusLabel.value)}</div></div><div class="form-row" data-v-00c2b474><label class="form-label" data-v-00c2b474>\u4E2A\u4EBA\u7B7E\u540D</label><div class="form-value" data-v-00c2b474>${ssrInterpolate(editForm.value.profileSignature || "\u8BF7\u8F93\u5165\u4E2A\u4EBA\u7B7E\u540D")} <span class="arrow" data-v-00c2b474>\u203A</span></div>`);
          if (currentField.value === "profileSignature") {
            _push(`<input${ssrRenderAttr("value", editForm.value.profileSignature)} class="form-input" maxlength="255" placeholder="\u8BF7\u8F93\u5165\u4E2A\u4EBA\u7B7E\u540D"${ssrIncludeBooleanAttr(currentField.value === "profileSignature") ? " autofocus" : ""} data-v-00c2b474>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="form-actions" data-v-00c2b474><button type="submit" class="save-btn" data-v-00c2b474>\u4FDD\u5B58\u4FEE\u6539</button></div></form></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</main></div></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const profile = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-00c2b474"]]);

export { profile as default };
//# sourceMappingURL=profile-GMFljAaL.mjs.map
