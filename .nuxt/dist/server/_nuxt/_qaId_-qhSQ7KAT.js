import { defineComponent, reactive, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
import { useRouter } from "vue-router";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[qaId]",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const qaDetail = reactive({
      question: "符主任你好！请问胸闷气短跟冠心病、有高血压口服美托洛尔、利尿剂，血压：110/66,检查：心脏彩超、心电图、胸部CT、肺部能等没有什么问题！可以中药调理吗？",
      time: "2022/12/02",
      status: "已回答"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "qa-detail-page" }, _attrs))} data-v-f335b496><section class="page-banner" data-v-f335b496><div class="container" data-v-f335b496><h1 class="banner-title" data-v-f335b496>专家咨询</h1><p class="banner-desc" data-v-f335b496>专业问题咨询，名师在线解答</p></div></section><div class="breadcrumb-section" data-v-f335b496><div class="container" data-v-f335b496><div class="breadcrumb" data-v-f335b496><span class="breadcrumb-item" data-v-f335b496>首页</span><span class="breadcrumb-separator" data-v-f335b496>&gt;</span><span class="breadcrumb-item" data-v-f335b496>咨询</span><span class="breadcrumb-separator" data-v-f335b496>&gt;</span><span class="breadcrumb-item" data-v-f335b496>符惠娟</span><span class="breadcrumb-separator" data-v-f335b496>&gt;</span><span class="breadcrumb-item active" data-v-f335b496>专家答疑</span></div></div></div><section class="qa-detail-section" data-v-f335b496><div class="container" data-v-f335b496><div class="qa-detail-card" data-v-f335b496><h3 class="section-title" data-v-f335b496>专家答疑</h3><div class="qa-content" data-v-f335b496><p class="question-text" data-v-f335b496>${ssrInterpolate(qaDetail.question)}</p><div class="question-footer" data-v-f335b496><span class="question-time" data-v-f335b496>${ssrInterpolate(qaDetail.time)}</span><span class="question-status" data-v-f335b496>${ssrInterpolate(qaDetail.status)}</span></div></div></div></div></section></div>`);
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
export {
  _qaId_ as default
};
//# sourceMappingURL=_qaId_-qhSQ7KAT.js.map
