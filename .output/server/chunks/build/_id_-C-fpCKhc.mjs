import { defineComponent, ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { useRouter, useRoute } from 'vue-router';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    useRoute();
    const showConsultForm = ref(false);
    const formSubmitting = ref(false);
    const consultForm = ref({
      title: "",
      content: "",
      expertId: void 0,
      expertCategoryId: void 0
    });
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "expert-detail-page" }, _attrs))} data-v-d629f974><section class="page-banner" style="${ssrRenderStyle({ backgroundImage: `url(${expert.value.coverUrl || "/images/default-cover.jpg"})` })}" data-v-d629f974><div class="banner-overlay" data-v-d629f974></div><div class="container" data-v-d629f974><div class="banner-content" data-v-d629f974><div class="expert-avatar-wrapper" data-v-d629f974><img${ssrRenderAttr("src", expert.value.avatarUrl)}${ssrRenderAttr("alt", expert.value.realName)} class="expert-avatar" data-v-d629f974><span class="online-status" data-v-d629f974>\u5728\u7EBF</span></div><h1 class="expert-name" data-v-d629f974>${ssrInterpolate(expert.value.realName)}</h1><p class="expert-title" data-v-d629f974>${ssrInterpolate(expert.value.title)} | ${ssrInterpolate(expert.value.organization)}</p><p class="expert-specialty" data-v-d629f974>${ssrInterpolate(expert.value.specialty)}</p><button class="consult-btn" data-v-d629f974>\u7ACB\u5373\u54A8\u8BE2</button></div></div></section><div class="breadcrumb-section" data-v-d629f974><div class="container" data-v-d629f974><div class="breadcrumb" data-v-d629f974><span class="breadcrumb-item" data-v-d629f974>\u9996\u9875</span><span class="breadcrumb-separator" data-v-d629f974>&gt;</span><span class="breadcrumb-item" data-v-d629f974>\u54A8\u8BE2</span><span class="breadcrumb-separator" data-v-d629f974>&gt;</span><span class="breadcrumb-item active" data-v-d629f974>${ssrInterpolate(expert.value.realName)}</span></div></div></div><section class="main-section" data-v-d629f974><div class="container" data-v-d629f974><div class="main-content" data-v-d629f974><aside class="sidebar" data-v-d629f974><div class="info-card" data-v-d629f974><h3 class="card-title" data-v-d629f974>\u57FA\u672C\u4FE1\u606F</h3><div class="info-list" data-v-d629f974><div class="info-item" data-v-d629f974><span class="info-label" data-v-d629f974>\u6027\u522B</span><span class="info-value" data-v-d629f974>${ssrInterpolate(genderText.value)}</span></div><div class="info-item" data-v-d629f974><span class="info-label" data-v-d629f974>\u51FA\u751F\u65E5\u671F</span><span class="info-value" data-v-d629f974>${ssrInterpolate(expert.value.birthDate)}</span></div><div class="info-item" data-v-d629f974><span class="info-label" data-v-d629f974>\u8054\u7CFB\u7535\u8BDD</span><span class="info-value" data-v-d629f974>${ssrInterpolate(expert.value.mobile)}</span></div><div class="info-item" data-v-d629f974><span class="info-label" data-v-d629f974>\u804C\u79F0</span><span class="info-value" data-v-d629f974>${ssrInterpolate(expert.value.title)}</span></div><div class="info-item" data-v-d629f974><span class="info-label" data-v-d629f974>\u6240\u5728\u673A\u6784</span><span class="info-value" data-v-d629f974>${ssrInterpolate(expert.value.organization)}</span></div><div class="info-item" data-v-d629f974><span class="info-label" data-v-d629f974>\u4E13\u4E1A\u9886\u57DF</span><span class="info-value" data-v-d629f974>${ssrInterpolate(expert.value.specialty)}</span></div></div></div><div class="info-card consultation-notice" data-v-d629f974><h3 class="card-title" data-v-d629f974>\u54A8\u8BE2\u987B\u77E5</h3><div class="notice-content" data-v-d629f974><p data-v-d629f974>${ssrInterpolate(expert.value.consultationNotice || "\u6682\u65E0\u54A8\u8BE2\u987B\u77E5")}</p></div></div></aside><main class="content-area" data-v-d629f974><div class="content-card" data-v-d629f974><h2 class="section-title" data-v-d629f974>\u4E13\u5BB6\u4ECB\u7ECD</h2><div class="introduction-content" data-v-d629f974><p data-v-d629f974>${ssrInterpolate(expert.value.introduction || "\u6682\u65E0\u4ECB\u7ECD")}</p></div></div>`);
      if (educationExperiences.value.length > 0) {
        _push(`<div class="content-card" data-v-d629f974><h2 class="section-title" data-v-d629f974>\u6559\u80B2\u80CC\u666F</h2><div class="experience-list" data-v-d629f974><!--[-->`);
        ssrRenderList(educationExperiences.value, (exp) => {
          _push(`<div class="experience-item" data-v-d629f974><div class="experience-header" data-v-d629f974><span class="experience-title" data-v-d629f974>${ssrInterpolate(exp.title)}</span><span class="experience-period" data-v-d629f974>${ssrInterpolate(formatDate(exp.startDate))} - ${ssrInterpolate(formatDate(exp.endDate))}</span></div><p class="experience-desc" data-v-d629f974>${ssrInterpolate(exp.description)}</p></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (workExperiences.value.length > 0) {
        _push(`<div class="content-card" data-v-d629f974><h2 class="section-title" data-v-d629f974>\u5DE5\u4F5C\u7ECF\u5386</h2><div class="experience-list" data-v-d629f974><!--[-->`);
        ssrRenderList(workExperiences.value, (exp) => {
          _push(`<div class="experience-item" data-v-d629f974><div class="experience-header" data-v-d629f974><span class="experience-title" data-v-d629f974>${ssrInterpolate(exp.title)}</span><span class="experience-period" data-v-d629f974>${ssrInterpolate(formatDate(exp.startDate))} - ${ssrInterpolate(formatDate(exp.endDate))}</span></div><p class="experience-desc" data-v-d629f974>${ssrInterpolate(exp.description)}</p></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (achievementExperiences.value.length > 0) {
        _push(`<div class="content-card" data-v-d629f974><h2 class="section-title" data-v-d629f974>\u6210\u5C31\u8363\u8A89</h2><div class="experience-list" data-v-d629f974><!--[-->`);
        ssrRenderList(achievementExperiences.value, (exp) => {
          _push(`<div class="experience-item" data-v-d629f974><div class="experience-header" data-v-d629f974><span class="experience-title" data-v-d629f974>${ssrInterpolate(exp.title)}</span><span class="experience-period" data-v-d629f974>${ssrInterpolate(formatDate(exp.startDate))}</span></div><p class="experience-desc" data-v-d629f974>${ssrInterpolate(exp.description)}</p></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</main></div></div></section><div class="bottom-bar" data-v-d629f974><div class="container" data-v-d629f974><button class="bottom-consult-btn" data-v-d629f974>\u7ACB\u5373\u54A8\u8BE2\u4E13\u5BB6</button></div></div>`);
      if (showConsultForm.value) {
        _push(`<div class="consult-modal-overlay" data-v-d629f974><div class="consult-modal" data-v-d629f974><div class="modal-header" data-v-d629f974><h3 data-v-d629f974>\u53D1\u8D77\u54A8\u8BE2</h3><span class="modal-close" data-v-d629f974>\xD7</span></div><div class="modal-body" data-v-d629f974><div class="form-group" data-v-d629f974><label data-v-d629f974>\u54A8\u8BE2\u4E13\u5BB6</label><input type="text"${ssrRenderAttr("value", expert.value.realName)} disabled class="form-input readonly" data-v-d629f974></div><div class="form-group" data-v-d629f974><label data-v-d629f974>\u54A8\u8BE2\u6807\u9898 <span class="required" data-v-d629f974>*</span></label><input type="text"${ssrRenderAttr("value", consultForm.value.title)} placeholder="\u8BF7\u8F93\u5165\u54A8\u8BE2\u6807\u9898\uFF08\u9650128\u5B57\uFF09" maxlength="128" class="form-input" data-v-d629f974></div><div class="form-group" data-v-d629f974><label data-v-d629f974>\u54A8\u8BE2\u5185\u5BB9 <span class="required" data-v-d629f974>*</span></label><textarea placeholder="\u8BF7\u8BE6\u7EC6\u63CF\u8FF0\u60A8\u7684\u95EE\u9898..." rows="6" class="form-textarea" data-v-d629f974>${ssrInterpolate(consultForm.value.content)}</textarea></div></div><div class="modal-footer" data-v-d629f974><button class="btn-cancel" data-v-d629f974>\u53D6\u6D88</button><button class="btn-submit"${ssrIncludeBooleanAttr(formSubmitting.value) ? " disabled" : ""} data-v-d629f974>${ssrInterpolate(formSubmitting.value ? "\u63D0\u4EA4\u4E2D..." : "\u63D0\u4EA4\u54A8\u8BE2")}</button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/consult/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d629f974"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-C-fpCKhc.mjs.map
