import { defineComponent, ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { useRouter, useRoute } from 'vue-router';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

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
        MALE: "\u7537",
        FEMALE: "\u5973",
        UNKNOWN: "\u672A\u77E5"
      };
      return map[expert.value.gender] || "\u672A\u77E5";
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
      if (!date) return "\u81F3\u4ECA";
      return date;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "expert-detail-page" }, _attrs))} data-v-57918678><section class="page-banner" style="${ssrRenderStyle({ backgroundImage: `url(${expert.value.coverUrl || "/images/default-cover.jpg"})` })}" data-v-57918678><div class="banner-overlay" data-v-57918678></div><div class="container" data-v-57918678><div class="banner-content" data-v-57918678><div class="expert-avatar-wrapper" data-v-57918678><img${ssrRenderAttr("src", expert.value.avatarUrl)}${ssrRenderAttr("alt", expert.value.realName)} class="expert-avatar" data-v-57918678><span class="online-status" data-v-57918678>\u5728\u7EBF</span></div><h1 class="expert-name" data-v-57918678>${ssrInterpolate(expert.value.realName)}</h1><p class="expert-title" data-v-57918678>${ssrInterpolate(expert.value.title)} | ${ssrInterpolate(expert.value.organization)}</p><p class="expert-specialty" data-v-57918678>${ssrInterpolate(expert.value.specialty)}</p><button class="consult-btn" data-v-57918678>\u7ACB\u5373\u54A8\u8BE2</button></div></div></section><div class="breadcrumb-section" data-v-57918678><div class="container" data-v-57918678><div class="breadcrumb" data-v-57918678><span class="breadcrumb-item" data-v-57918678>\u9996\u9875</span><span class="breadcrumb-separator" data-v-57918678>&gt;</span><span class="breadcrumb-item" data-v-57918678>\u54A8\u8BE2</span><span class="breadcrumb-separator" data-v-57918678>&gt;</span><span class="breadcrumb-item active" data-v-57918678>${ssrInterpolate(expert.value.realName)}</span></div></div></div><section class="main-section" data-v-57918678><div class="container" data-v-57918678><div class="main-content" data-v-57918678><aside class="sidebar" data-v-57918678><div class="info-card" data-v-57918678><h3 class="card-title" data-v-57918678>\u57FA\u672C\u4FE1\u606F</h3><div class="info-list" data-v-57918678><div class="info-item" data-v-57918678><span class="info-label" data-v-57918678>\u6027\u522B</span><span class="info-value" data-v-57918678>${ssrInterpolate(genderText.value)}</span></div><div class="info-item" data-v-57918678><span class="info-label" data-v-57918678>\u51FA\u751F\u65E5\u671F</span><span class="info-value" data-v-57918678>${ssrInterpolate(expert.value.birthDate)}</span></div><div class="info-item" data-v-57918678><span class="info-label" data-v-57918678>\u8054\u7CFB\u7535\u8BDD</span><span class="info-value" data-v-57918678>${ssrInterpolate(expert.value.mobile)}</span></div><div class="info-item" data-v-57918678><span class="info-label" data-v-57918678>\u804C\u79F0</span><span class="info-value" data-v-57918678>${ssrInterpolate(expert.value.title)}</span></div><div class="info-item" data-v-57918678><span class="info-label" data-v-57918678>\u6240\u5728\u673A\u6784</span><span class="info-value" data-v-57918678>${ssrInterpolate(expert.value.organization)}</span></div><div class="info-item" data-v-57918678><span class="info-label" data-v-57918678>\u4E13\u4E1A\u9886\u57DF</span><span class="info-value" data-v-57918678>${ssrInterpolate(expert.value.specialty)}</span></div></div></div><div class="info-card consultation-notice" data-v-57918678><h3 class="card-title" data-v-57918678>\u54A8\u8BE2\u987B\u77E5</h3><div class="notice-content" data-v-57918678><p data-v-57918678>${ssrInterpolate(expert.value.consultationNotice || "\u6682\u65E0\u54A8\u8BE2\u987B\u77E5")}</p></div></div></aside><main class="content-area" data-v-57918678><div class="content-card" data-v-57918678><h2 class="section-title" data-v-57918678>\u4E13\u5BB6\u4ECB\u7ECD</h2><div class="introduction-content" data-v-57918678><p data-v-57918678>${ssrInterpolate(expert.value.introduction || "\u6682\u65E0\u4ECB\u7ECD")}</p></div></div>`);
      if (educationExperiences.value.length > 0) {
        _push(`<div class="content-card" data-v-57918678><h2 class="section-title" data-v-57918678>\u6559\u80B2\u80CC\u666F</h2><div class="experience-list" data-v-57918678><!--[-->`);
        ssrRenderList(educationExperiences.value, (exp) => {
          _push(`<div class="experience-item" data-v-57918678><div class="experience-header" data-v-57918678><span class="experience-title" data-v-57918678>${ssrInterpolate(exp.title)}</span><span class="experience-period" data-v-57918678>${ssrInterpolate(formatDate(exp.startDate))} - ${ssrInterpolate(formatDate(exp.endDate))}</span></div><p class="experience-desc" data-v-57918678>${ssrInterpolate(exp.description)}</p></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (workExperiences.value.length > 0) {
        _push(`<div class="content-card" data-v-57918678><h2 class="section-title" data-v-57918678>\u5DE5\u4F5C\u7ECF\u5386</h2><div class="experience-list" data-v-57918678><!--[-->`);
        ssrRenderList(workExperiences.value, (exp) => {
          _push(`<div class="experience-item" data-v-57918678><div class="experience-header" data-v-57918678><span class="experience-title" data-v-57918678>${ssrInterpolate(exp.title)}</span><span class="experience-period" data-v-57918678>${ssrInterpolate(formatDate(exp.startDate))} - ${ssrInterpolate(formatDate(exp.endDate))}</span></div><p class="experience-desc" data-v-57918678>${ssrInterpolate(exp.description)}</p></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (achievementExperiences.value.length > 0) {
        _push(`<div class="content-card" data-v-57918678><h2 class="section-title" data-v-57918678>\u6210\u5C31\u8363\u8A89</h2><div class="experience-list" data-v-57918678><!--[-->`);
        ssrRenderList(achievementExperiences.value, (exp) => {
          _push(`<div class="experience-item" data-v-57918678><div class="experience-header" data-v-57918678><span class="experience-title" data-v-57918678>${ssrInterpolate(exp.title)}</span><span class="experience-period" data-v-57918678>${ssrInterpolate(formatDate(exp.startDate))}</span></div><p class="experience-desc" data-v-57918678>${ssrInterpolate(exp.description)}</p></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</main></div></div></section><div class="bottom-bar" data-v-57918678><div class="container" data-v-57918678><button class="bottom-consult-btn" data-v-57918678>\u7ACB\u5373\u54A8\u8BE2\u4E13\u5BB6</button></div></div></div>`);
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

export { _id_ as default };
//# sourceMappingURL=_id_-CK1wGLuh.mjs.map
