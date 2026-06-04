import { defineComponent, ref, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useRouter } from "vue-router";
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
  __name: "records",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const records2 = ref([]);
    const currentPage = ref(1);
    const pageSize = ref(10);
    const total = ref(0);
    const totalPages = computed(() => {
      return Math.ceil(total.value / pageSize.value);
    });
    const formatDate = (date) => {
      if (!date) return "";
      const d = new Date(date);
      return d.toLocaleString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "exam-records-page" }, _attrs))} data-v-f7f6e5c2><section class="page-banner" data-v-f7f6e5c2><div class="container" data-v-f7f6e5c2><h1 class="banner-title" data-v-f7f6e5c2>考试记录</h1><p class="banner-desc" data-v-f7f6e5c2>查看历史考试记录与成绩</p></div></section><div class="breadcrumb-section" data-v-f7f6e5c2><div class="container" data-v-f7f6e5c2><div class="breadcrumb" data-v-f7f6e5c2><span class="breadcrumb-item" data-v-f7f6e5c2>首页</span><span class="breadcrumb-separator" data-v-f7f6e5c2>&gt;</span><span class="breadcrumb-item" data-v-f7f6e5c2>考核</span><span class="breadcrumb-separator" data-v-f7f6e5c2>&gt;</span><span class="breadcrumb-item active" data-v-f7f6e5c2>考试记录</span></div></div></div><section class="records-section" data-v-f7f6e5c2><div class="container" data-v-f7f6e5c2><div class="records-list" data-v-f7f6e5c2><!--[-->`);
      ssrRenderList(records2.value, (record) => {
        _push(`<div class="record-card" data-v-f7f6e5c2><div class="record-header" data-v-f7f6e5c2><h3 class="record-title" data-v-f7f6e5c2>${ssrInterpolate(record.paperName)}</h3><div class="${ssrRenderClass([{ passed: record.passed === 1, failed: record.passed === 0 }, "record-status"])}" data-v-f7f6e5c2>${ssrInterpolate(record.passed === 1 ? "及格" : "不及格")}</div></div><div class="record-meta" data-v-f7f6e5c2><span class="meta-item" data-v-f7f6e5c2><span class="meta-icon" data-v-f7f6e5c2>🏆</span> 得分：${ssrInterpolate(record.score)}</span><span class="meta-item" data-v-f7f6e5c2><span class="meta-icon" data-v-f7f6e5c2>📅</span> 考试时间：${ssrInterpolate(formatDate(record.submittedAt))}</span></div></div>`);
      });
      _push(`<!--]--></div>`);
      if (records2.value.length === 0) {
        _push(`<div class="empty-state" data-v-f7f6e5c2><p data-v-f7f6e5c2>暂无考试记录</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (total.value > pageSize.value) {
        _push(`<section class="pagination-section" data-v-f7f6e5c2><div class="pagination" data-v-f7f6e5c2><button class="page-btn"${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} data-v-f7f6e5c2> 上一页 </button><span class="page-info" data-v-f7f6e5c2> 第 ${ssrInterpolate(currentPage.value)} / ${ssrInterpolate(totalPages.value)} 页 </span><button class="page-btn"${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} data-v-f7f6e5c2> 下一页 </button></div></section>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/exam/records.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const records = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f7f6e5c2"]]);
export {
  records as default
};
//# sourceMappingURL=records-08WkVfSl.js.map
