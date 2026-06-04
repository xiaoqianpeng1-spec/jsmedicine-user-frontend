import { defineComponent, ref, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { useRouter, useRoute } from "vue-router";
import "../server.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/hookable/dist/index.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "D:/work/jsmedicine-user-frontend/node_modules/defu/dist/defu.mjs";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "D:/work/jsmedicine-user-frontend/node_modules/ofetch/dist/node.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/unctx/dist/index.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/h3/dist/index.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/ufo/dist/index.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/destr/dist/index.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/ohash/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    useRoute();
    const expert = ref({
      id: 0,
      realName: "",
      gender: "UNKNOWN",
      birthDate: "",
      mobile: "",
      avatarUrl: "",
      coverUrl: "",
      title: "",
      organization: "",
      specialty: "",
      introduction: "",
      consultationNotice: "",
      sortOrder: 0,
      categoryIds: [],
      experiences: []
    });
    const genderText = computed(() => {
      const map = {
        MALE: "男",
        FEMALE: "女",
        UNKNOWN: "未知"
      };
      return map[expert.value.gender] || "未知";
    });
    const educationExperiences = computed(() => {
      return expert.value.experiences.filter((exp) => exp.experienceType === "EDUCATION").sort((a, b) => a.sortOrder - b.sortOrder);
    });
    const workExperiences = computed(() => {
      return expert.value.experiences.filter((exp) => exp.experienceType === "WORK").sort((a, b) => a.sortOrder - b.sortOrder);
    });
    const achievementExperiences = computed(() => {
      return expert.value.experiences.filter((exp) => exp.experienceType === "ACHIEVEMENT").sort((a, b) => a.sortOrder - b.sortOrder);
    });
    const formatDate = (date) => {
      if (!date) return "至今";
      return date;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "expert-detail-page" }, _attrs))} data-v-57918678><section class="page-banner" style="${ssrRenderStyle({ backgroundImage: `url(${expert.value.coverUrl || "/images/default-cover.jpg"})` })}" data-v-57918678><div class="banner-overlay" data-v-57918678></div><div class="container" data-v-57918678><div class="banner-content" data-v-57918678><div class="expert-avatar-wrapper" data-v-57918678><img${ssrRenderAttr("src", expert.value.avatarUrl)}${ssrRenderAttr("alt", expert.value.realName)} class="expert-avatar" data-v-57918678><span class="online-status" data-v-57918678>在线</span></div><h1 class="expert-name" data-v-57918678>${ssrInterpolate(expert.value.realName)}</h1><p class="expert-title" data-v-57918678>${ssrInterpolate(expert.value.title)} | ${ssrInterpolate(expert.value.organization)}</p><p class="expert-specialty" data-v-57918678>${ssrInterpolate(expert.value.specialty)}</p><button class="consult-btn" data-v-57918678>立即咨询</button></div></div></section><div class="breadcrumb-section" data-v-57918678><div class="container" data-v-57918678><div class="breadcrumb" data-v-57918678><span class="breadcrumb-item" data-v-57918678>首页</span><span class="breadcrumb-separator" data-v-57918678>&gt;</span><span class="breadcrumb-item" data-v-57918678>咨询</span><span class="breadcrumb-separator" data-v-57918678>&gt;</span><span class="breadcrumb-item active" data-v-57918678>${ssrInterpolate(expert.value.realName)}</span></div></div></div><section class="main-section" data-v-57918678><div class="container" data-v-57918678><div class="main-content" data-v-57918678><aside class="sidebar" data-v-57918678><div class="info-card" data-v-57918678><h3 class="card-title" data-v-57918678>基本信息</h3><div class="info-list" data-v-57918678><div class="info-item" data-v-57918678><span class="info-label" data-v-57918678>性别</span><span class="info-value" data-v-57918678>${ssrInterpolate(genderText.value)}</span></div><div class="info-item" data-v-57918678><span class="info-label" data-v-57918678>出生日期</span><span class="info-value" data-v-57918678>${ssrInterpolate(expert.value.birthDate)}</span></div><div class="info-item" data-v-57918678><span class="info-label" data-v-57918678>联系电话</span><span class="info-value" data-v-57918678>${ssrInterpolate(expert.value.mobile)}</span></div><div class="info-item" data-v-57918678><span class="info-label" data-v-57918678>职称</span><span class="info-value" data-v-57918678>${ssrInterpolate(expert.value.title)}</span></div><div class="info-item" data-v-57918678><span class="info-label" data-v-57918678>所在机构</span><span class="info-value" data-v-57918678>${ssrInterpolate(expert.value.organization)}</span></div><div class="info-item" data-v-57918678><span class="info-label" data-v-57918678>专业领域</span><span class="info-value" data-v-57918678>${ssrInterpolate(expert.value.specialty)}</span></div></div></div><div class="info-card consultation-notice" data-v-57918678><h3 class="card-title" data-v-57918678>咨询须知</h3><div class="notice-content" data-v-57918678><p data-v-57918678>${ssrInterpolate(expert.value.consultationNotice || "暂无咨询须知")}</p></div></div></aside><main class="content-area" data-v-57918678><div class="content-card" data-v-57918678><h2 class="section-title" data-v-57918678>专家介绍</h2><div class="introduction-content" data-v-57918678><p data-v-57918678>${ssrInterpolate(expert.value.introduction || "暂无介绍")}</p></div></div>`);
      if (educationExperiences.value.length > 0) {
        _push(`<div class="content-card" data-v-57918678><h2 class="section-title" data-v-57918678>教育背景</h2><div class="experience-list" data-v-57918678><!--[-->`);
        ssrRenderList(educationExperiences.value, (exp) => {
          _push(`<div class="experience-item" data-v-57918678><div class="experience-header" data-v-57918678><span class="experience-title" data-v-57918678>${ssrInterpolate(exp.title)}</span><span class="experience-period" data-v-57918678>${ssrInterpolate(formatDate(exp.startDate))} - ${ssrInterpolate(formatDate(exp.endDate))}</span></div><p class="experience-desc" data-v-57918678>${ssrInterpolate(exp.description)}</p></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (workExperiences.value.length > 0) {
        _push(`<div class="content-card" data-v-57918678><h2 class="section-title" data-v-57918678>工作经历</h2><div class="experience-list" data-v-57918678><!--[-->`);
        ssrRenderList(workExperiences.value, (exp) => {
          _push(`<div class="experience-item" data-v-57918678><div class="experience-header" data-v-57918678><span class="experience-title" data-v-57918678>${ssrInterpolate(exp.title)}</span><span class="experience-period" data-v-57918678>${ssrInterpolate(formatDate(exp.startDate))} - ${ssrInterpolate(formatDate(exp.endDate))}</span></div><p class="experience-desc" data-v-57918678>${ssrInterpolate(exp.description)}</p></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (achievementExperiences.value.length > 0) {
        _push(`<div class="content-card" data-v-57918678><h2 class="section-title" data-v-57918678>成就荣誉</h2><div class="experience-list" data-v-57918678><!--[-->`);
        ssrRenderList(achievementExperiences.value, (exp) => {
          _push(`<div class="experience-item" data-v-57918678><div class="experience-header" data-v-57918678><span class="experience-title" data-v-57918678>${ssrInterpolate(exp.title)}</span><span class="experience-period" data-v-57918678>${ssrInterpolate(formatDate(exp.startDate))}</span></div><p class="experience-desc" data-v-57918678>${ssrInterpolate(exp.description)}</p></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</main></div></div></section><div class="bottom-bar" data-v-57918678><div class="container" data-v-57918678><button class="bottom-consult-btn" data-v-57918678>立即咨询专家</button></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/consult/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-57918678"]]);
export {
  _id_ as default
};
//# sourceMappingURL=_id_-CK1wGLuh.js.map
