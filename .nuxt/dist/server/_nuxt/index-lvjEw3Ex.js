import { defineComponent, ref, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "exam-page" }, _attrs))} data-v-a819d651><section class="page-banner" data-v-a819d651><div class="container" data-v-a819d651><h1 class="banner-title" data-v-a819d651>在线考核</h1><p class="banner-desc" data-v-a819d651>检验学习成果，巩固知识要点</p></div></section><div class="breadcrumb-section" data-v-a819d651><div class="container" data-v-a819d651><div class="breadcrumb" data-v-a819d651><span class="breadcrumb-item" data-v-a819d651>首页</span><span class="breadcrumb-separator" data-v-a819d651>&gt;</span><span class="breadcrumb-item active" data-v-a819d651>考核</span></div></div></div><section class="search-section" data-v-a819d651><div class="container" data-v-a819d651><div class="search-actions" data-v-a819d651><div class="search-box" data-v-a819d651><input type="text"${ssrRenderAttr("value", keyword.value)} placeholder="搜索考卷名称..." class="search-input" data-v-a819d651><button class="search-btn" data-v-a819d651> 搜索 </button></div><button class="records-btn" data-v-a819d651> 📋 考试记录 </button></div></div></section><section class="exam-section" data-v-a819d651><div class="container" data-v-a819d651><div class="exam-list" data-v-a819d651><!--[-->`);
      ssrRenderList(exams.value, (exam) => {
        _push(`<div class="${ssrRenderClass([{ disabled: exam.status === "DISABLED" }, "exam-card"])}" data-v-a819d651><div class="exam-content" data-v-a819d651><div class="exam-header" data-v-a819d651><h3 class="exam-title" data-v-a819d651>${ssrInterpolate(exam.paperName)}</h3>`);
        if (exam.status === "ENABLED") {
          _push(`<span class="status-tag enabled" data-v-a819d651>已启用</span>`);
        } else {
          _push(`<span class="status-tag disabled" data-v-a819d651>已禁用</span>`);
        }
        _push(`</div><p class="exam-desc" data-v-a819d651>${ssrInterpolate(exam.description)}</p><div class="exam-meta" data-v-a819d651><span class="meta-item" data-v-a819d651><span class="meta-icon" data-v-a819d651>📝</span> ${ssrInterpolate(exam.questions.length)} 题 </span><span class="meta-item" data-v-a819d651><span class="meta-icon" data-v-a819d651>⏱️</span> ${ssrInterpolate(exam.durationMinutes)} 分钟 </span><span class="meta-item" data-v-a819d651><span class="meta-icon" data-v-a819d651>🏆</span> 满分 ${ssrInterpolate(exam.totalScore)} 分 </span><span class="meta-item" data-v-a819d651><span class="meta-icon" data-v-a819d651>✅</span> 及格线 ${ssrInterpolate(exam.passScore)} 分 </span></div></div><button class="exam-button"${ssrIncludeBooleanAttr(exam.status === "DISABLED") ? " disabled" : ""} data-v-a819d651>${ssrInterpolate(exam.status === "ENABLED" ? "立即答题" : "暂不可用")}</button></div>`);
      });
      _push(`<!--]--></div>`);
      if (exams.value.length === 0) {
        _push(`<div class="empty-state" data-v-a819d651><p data-v-a819d651>暂无考卷</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (total.value > pageSize.value) {
        _push(`<section class="pagination-section" data-v-a819d651><div class="pagination" data-v-a819d651><button class="page-btn"${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} data-v-a819d651> 上一页 </button><span class="page-info" data-v-a819d651> 第 ${ssrInterpolate(currentPage.value)} / ${ssrInterpolate(totalPages.value)} 页 </span><button class="page-btn"${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} data-v-a819d651> 下一页 </button></div></section>`);
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
export {
  index as default
};
//# sourceMappingURL=index-lvjEw3Ex.js.map
