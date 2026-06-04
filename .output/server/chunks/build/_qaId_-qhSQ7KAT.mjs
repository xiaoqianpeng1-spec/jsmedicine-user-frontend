import { defineComponent, reactive, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[qaId]",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const qaDetail = reactive({
      question: "\u7B26\u4E3B\u4EFB\u4F60\u597D\uFF01\u8BF7\u95EE\u80F8\u95F7\u6C14\u77ED\u8DDF\u51A0\u5FC3\u75C5\u3001\u6709\u9AD8\u8840\u538B\u53E3\u670D\u7F8E\u6258\u6D1B\u5C14\u3001\u5229\u5C3F\u5242\uFF0C\u8840\u538B\uFF1A110/66,\u68C0\u67E5\uFF1A\u5FC3\u810F\u5F69\u8D85\u3001\u5FC3\u7535\u56FE\u3001\u80F8\u90E8CT\u3001\u80BA\u90E8\u80FD\u7B49\u6CA1\u6709\u4EC0\u4E48\u95EE\u9898\uFF01\u53EF\u4EE5\u4E2D\u836F\u8C03\u7406\u5417\uFF1F",
      time: "2022/12/02",
      status: "\u5DF2\u56DE\u7B54"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "qa-detail-page" }, _attrs))} data-v-f335b496><section class="page-banner" data-v-f335b496><div class="container" data-v-f335b496><h1 class="banner-title" data-v-f335b496>\u4E13\u5BB6\u54A8\u8BE2</h1><p class="banner-desc" data-v-f335b496>\u4E13\u4E1A\u95EE\u9898\u54A8\u8BE2\uFF0C\u540D\u5E08\u5728\u7EBF\u89E3\u7B54</p></div></section><div class="breadcrumb-section" data-v-f335b496><div class="container" data-v-f335b496><div class="breadcrumb" data-v-f335b496><span class="breadcrumb-item" data-v-f335b496>\u9996\u9875</span><span class="breadcrumb-separator" data-v-f335b496>&gt;</span><span class="breadcrumb-item" data-v-f335b496>\u54A8\u8BE2</span><span class="breadcrumb-separator" data-v-f335b496>&gt;</span><span class="breadcrumb-item" data-v-f335b496>\u7B26\u60E0\u5A1F</span><span class="breadcrumb-separator" data-v-f335b496>&gt;</span><span class="breadcrumb-item active" data-v-f335b496>\u4E13\u5BB6\u7B54\u7591</span></div></div></div><section class="qa-detail-section" data-v-f335b496><div class="container" data-v-f335b496><div class="qa-detail-card" data-v-f335b496><h3 class="section-title" data-v-f335b496>\u4E13\u5BB6\u7B54\u7591</h3><div class="qa-content" data-v-f335b496><p class="question-text" data-v-f335b496>${ssrInterpolate(qaDetail.question)}</p><div class="question-footer" data-v-f335b496><span class="question-time" data-v-f335b496>${ssrInterpolate(qaDetail.time)}</span><span class="question-status" data-v-f335b496>${ssrInterpolate(qaDetail.status)}</span></div></div></div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/consult/[id]/qa/[qaId].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _qaId_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f335b496"]]);

export { _qaId_ as default };
//# sourceMappingURL=_qaId_-qhSQ7KAT.mjs.map
