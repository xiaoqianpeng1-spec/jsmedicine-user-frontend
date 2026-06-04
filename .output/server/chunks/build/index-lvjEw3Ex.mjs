import { defineComponent, ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const keyword = ref("");
    const exams = ref([]);
    const currentPage = ref(1);
    const pageSize = ref(10);
    const total = ref(0);
    const totalPages = computed(() => {
      return Math.ceil(total.value / pageSize.value);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "exam-page" }, _attrs))} data-v-a819d651><section class="page-banner" data-v-a819d651><div class="container" data-v-a819d651><h1 class="banner-title" data-v-a819d651>\u5728\u7EBF\u8003\u6838</h1><p class="banner-desc" data-v-a819d651>\u68C0\u9A8C\u5B66\u4E60\u6210\u679C\uFF0C\u5DE9\u56FA\u77E5\u8BC6\u8981\u70B9</p></div></section><div class="breadcrumb-section" data-v-a819d651><div class="container" data-v-a819d651><div class="breadcrumb" data-v-a819d651><span class="breadcrumb-item" data-v-a819d651>\u9996\u9875</span><span class="breadcrumb-separator" data-v-a819d651>&gt;</span><span class="breadcrumb-item active" data-v-a819d651>\u8003\u6838</span></div></div></div><section class="search-section" data-v-a819d651><div class="container" data-v-a819d651><div class="search-actions" data-v-a819d651><div class="search-box" data-v-a819d651><input type="text"${ssrRenderAttr("value", keyword.value)} placeholder="\u641C\u7D22\u8003\u5377\u540D\u79F0..." class="search-input" data-v-a819d651><button class="search-btn" data-v-a819d651> \u641C\u7D22 </button></div><button class="records-btn" data-v-a819d651> \u{1F4CB} \u8003\u8BD5\u8BB0\u5F55 </button></div></div></section><section class="exam-section" data-v-a819d651><div class="container" data-v-a819d651><div class="exam-list" data-v-a819d651><!--[-->`);
      ssrRenderList(exams.value, (exam) => {
        _push(`<div class="${ssrRenderClass([{ disabled: exam.status === "DISABLED" }, "exam-card"])}" data-v-a819d651><div class="exam-content" data-v-a819d651><div class="exam-header" data-v-a819d651><h3 class="exam-title" data-v-a819d651>${ssrInterpolate(exam.paperName)}</h3>`);
        if (exam.status === "ENABLED") {
          _push(`<span class="status-tag enabled" data-v-a819d651>\u5DF2\u542F\u7528</span>`);
        } else {
          _push(`<span class="status-tag disabled" data-v-a819d651>\u5DF2\u7981\u7528</span>`);
        }
        _push(`</div><p class="exam-desc" data-v-a819d651>${ssrInterpolate(exam.description)}</p><div class="exam-meta" data-v-a819d651><span class="meta-item" data-v-a819d651><span class="meta-icon" data-v-a819d651>\u{1F4DD}</span> ${ssrInterpolate(exam.questions.length)} \u9898 </span><span class="meta-item" data-v-a819d651><span class="meta-icon" data-v-a819d651>\u23F1\uFE0F</span> ${ssrInterpolate(exam.durationMinutes)} \u5206\u949F </span><span class="meta-item" data-v-a819d651><span class="meta-icon" data-v-a819d651>\u{1F3C6}</span> \u6EE1\u5206 ${ssrInterpolate(exam.totalScore)} \u5206 </span><span class="meta-item" data-v-a819d651><span class="meta-icon" data-v-a819d651>\u2705</span> \u53CA\u683C\u7EBF ${ssrInterpolate(exam.passScore)} \u5206 </span></div></div><button class="exam-button"${ssrIncludeBooleanAttr(exam.status === "DISABLED") ? " disabled" : ""} data-v-a819d651>${ssrInterpolate(exam.status === "ENABLED" ? "\u7ACB\u5373\u7B54\u9898" : "\u6682\u4E0D\u53EF\u7528")}</button></div>`);
      });
      _push(`<!--]--></div>`);
      if (exams.value.length === 0) {
        _push(`<div class="empty-state" data-v-a819d651><p data-v-a819d651>\u6682\u65E0\u8003\u5377</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (total.value > pageSize.value) {
        _push(`<section class="pagination-section" data-v-a819d651><div class="pagination" data-v-a819d651><button class="page-btn"${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} data-v-a819d651> \u4E0A\u4E00\u9875 </button><span class="page-info" data-v-a819d651> \u7B2C ${ssrInterpolate(currentPage.value)} / ${ssrInterpolate(totalPages.value)} \u9875 </span><button class="page-btn"${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} data-v-a819d651> \u4E0B\u4E00\u9875 </button></div></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/exam/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a819d651"]]);

export { index as default };
//# sourceMappingURL=index-lvjEw3Ex.mjs.map
