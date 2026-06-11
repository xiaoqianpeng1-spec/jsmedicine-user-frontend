import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
import { useRouter, useRoute } from 'vue-router';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[qaId]",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    useRoute();
    const detail = ref(null);
    const loading = ref(true);
    const errorMsg = ref("");
    const statusLabels = {
      PENDING: "\u5F85\u56DE\u590D",
      ANSWERED: "\u5DF2\u56DE\u590D",
      CLOSED: "\u5DF2\u5173\u95ED"
    };
    const formatTime = (dateStr) => {
      if (!dateStr) return "";
      try {
        const d = new Date(dateStr);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        const h = String(d.getHours()).padStart(2, "0");
        const min = String(d.getMinutes()).padStart(2, "0");
        return `${y}/${m}/${day} ${h}:${min}`;
      } catch {
        return dateStr;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "qa-detail-page" }, _attrs))} data-v-93c100f2><section class="page-banner" data-v-93c100f2><div class="container" data-v-93c100f2><h1 class="banner-title" data-v-93c100f2>\u4E13\u5BB6\u54A8\u8BE2</h1><p class="banner-desc" data-v-93c100f2>\u4E13\u4E1A\u95EE\u9898\u54A8\u8BE2\uFF0C\u540D\u5E08\u5728\u7EBF\u89E3\u7B54</p></div></section><div class="breadcrumb-section" data-v-93c100f2><div class="container" data-v-93c100f2><div class="breadcrumb" data-v-93c100f2><span class="breadcrumb-item" data-v-93c100f2>\u9996\u9875</span><span class="breadcrumb-separator" data-v-93c100f2>&gt;</span><span class="breadcrumb-item" data-v-93c100f2>\u54A8\u8BE2</span><span class="breadcrumb-separator" data-v-93c100f2>&gt;</span><span class="breadcrumb-item active" data-v-93c100f2>\u54A8\u8BE2\u8BE6\u60C5</span></div></div></div>`);
      if (loading.value) {
        _push(`<section class="qa-detail-section" data-v-93c100f2><div class="container" data-v-93c100f2><div class="loading-state" data-v-93c100f2>\u52A0\u8F7D\u4E2D...</div></div></section>`);
      } else if (detail.value) {
        _push(`<section class="qa-detail-section" data-v-93c100f2><div class="container" data-v-93c100f2><div class="qa-detail-card" data-v-93c100f2><h3 class="section-title" data-v-93c100f2><span class="title-text" data-v-93c100f2>${ssrInterpolate(detail.value.title)}</span><span class="${ssrRenderClass(["status-" + detail.value.status.toLowerCase(), "status-badge"])}" data-v-93c100f2>${ssrInterpolate(statusLabels[detail.value.status] || detail.value.status)}</span></h3><div class="qa-content" data-v-93c100f2><p class="question-text" data-v-93c100f2>${ssrInterpolate(detail.value.content)}</p><div class="question-footer" data-v-93c100f2><span class="question-id" data-v-93c100f2>\u54A8\u8BE2\u7F16\u53F7\uFF1A${ssrInterpolate(detail.value.id)}</span></div></div></div>`);
        if (detail.value.answers && detail.value.answers.length > 0) {
          _push(`<div class="answers-card" data-v-93c100f2><h3 class="section-title" data-v-93c100f2>\u4E13\u5BB6\u56DE\u590D (${ssrInterpolate(detail.value.answers.length)})</h3><!--[-->`);
          ssrRenderList(detail.value.answers, (answer, index) => {
            _push(`<div class="answer-item" data-v-93c100f2><div class="answer-header" data-v-93c100f2><span class="answer-label" data-v-93c100f2>\u56DE\u590D #${ssrInterpolate(index + 1)}</span>`);
            if (answer.answeredAt) {
              _push(`<span class="answer-time" data-v-93c100f2>${ssrInterpolate(formatTime(answer.answeredAt))}</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div><p class="answer-content" data-v-93c100f2>${ssrInterpolate(answer.content)}</p></div>`);
          });
          _push(`<!--]--></div>`);
        } else if (detail.value.status === "PENDING") {
          _push(`<div class="answers-card" data-v-93c100f2><h3 class="section-title" data-v-93c100f2>\u4E13\u5BB6\u56DE\u590D</h3><div class="no-answer" data-v-93c100f2><p data-v-93c100f2>\u60A8\u7684\u54A8\u8BE2\u5DF2\u63D0\u4EA4\uFF0C\u4E13\u5BB6\u6B63\u5728\u67E5\u770B\u4E2D\uFF0C\u8BF7\u8010\u5FC3\u7B49\u5F85\u56DE\u590D\u3002</p></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="back-section" data-v-93c100f2><button class="back-btn" data-v-93c100f2>\u8FD4\u56DE\u54A8\u8BE2\u5217\u8868</button></div></div></section>`);
      } else {
        _push(`<section class="qa-detail-section" data-v-93c100f2><div class="container" data-v-93c100f2><div class="error-state" data-v-93c100f2><p data-v-93c100f2>${ssrInterpolate(errorMsg.value || "\u54A8\u8BE2\u4E0D\u5B58\u5728\u6216\u5DF2\u88AB\u5220\u9664")}</p><button class="back-btn" data-v-93c100f2>\u8FD4\u56DE\u54A8\u8BE2\u5217\u8868</button></div></div></section>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/consult/[id]/qa/[qaId].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _qaId_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-93c100f2"]]);

export { _qaId_ as default };
//# sourceMappingURL=_qaId_-CnHYJh1s.mjs.map
