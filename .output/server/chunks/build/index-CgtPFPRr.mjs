import { defineComponent, ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderStyle } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const activeTab = ref("experts");
    const expandedDepartments = ref([]);
    const selectedCategoryId = ref(null);
    const keyword = ref("");
    const categoryKeyword = ref("");
    const categories = ref([]);
    const experts = ref([]);
    const currentPage = ref(1);
    const pageSize = ref(6);
    const total = ref(0);
    const categoriesLoading = ref(false);
    const expertsLoading = ref(false);
    ref("");
    const questions = ref([]);
    const questionPage = ref(1);
    const questionSize = ref(10);
    const questionTotal = ref(0);
    const statusLabelMap = {
      PENDING: "\u5F85\u56DE\u590D",
      ANSWERED: "\u5DF2\u56DE\u590D",
      CLOSED: "\u5DF2\u5173\u95ED"
    };
    const questionTotalPages = computed(() => Math.ceil(questionTotal.value / questionSize.value));
    const departments = computed(() => {
      const parentCategories = categories.value.filter((cat) => cat.parentId === 0);
      return parentCategories.map((parent) => ({
        ...parent,
        children: categories.value.filter((cat) => cat.parentId === parent.id)
      }));
    });
    const totalPages = computed(() => {
      return Math.ceil(total.value / pageSize.value);
    });
    const truncateText = (text, maxLen) => {
      if (!text) return "";
      return text.length > maxLen ? text.substring(0, maxLen) + "..." : text;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "consult-page" }, _attrs))} data-v-62b18e40><section class="page-banner" data-v-62b18e40><div class="container" data-v-62b18e40><h1 class="banner-title" data-v-62b18e40>\u4E13\u5BB6\u54A8\u8BE2</h1><p class="banner-desc" data-v-62b18e40>\u4E13\u4E1A\u95EE\u9898\u54A8\u8BE2\uFF0C\u540D\u5E08\u5728\u7EBF\u89E3\u7B54</p></div></section><div class="breadcrumb-section" data-v-62b18e40><div class="container" data-v-62b18e40><div class="breadcrumb" data-v-62b18e40><span class="breadcrumb-item" data-v-62b18e40>\u9996\u9875</span><span class="breadcrumb-separator" data-v-62b18e40>&gt;</span><span class="breadcrumb-item active" data-v-62b18e40>\u54A8\u8BE2</span></div></div></div><section class="search-section" data-v-62b18e40><div class="container" data-v-62b18e40><div class="search-box" data-v-62b18e40><input type="text"${ssrRenderAttr("value", keyword.value)} placeholder="\u641C\u7D22\u4E13\u5BB6\u59D3\u540D..." class="search-input" data-v-62b18e40><button class="search-btn" data-v-62b18e40> \u641C\u7D22 </button></div></div></section><section class="tab-section" data-v-62b18e40><div class="container" data-v-62b18e40><div class="tab-bar" data-v-62b18e40><div class="${ssrRenderClass([{ active: activeTab.value === "experts" }, "tab-item"])}" data-v-62b18e40>\u627E\u4E13\u5BB6</div><div class="${ssrRenderClass([{ active: activeTab.value === "myQuestions" }, "tab-item"])}" data-v-62b18e40>\u6211\u7684\u54A8\u8BE2</div></div></div></section>`);
      if (activeTab.value === "experts") {
        _push(`<section class="main-section" data-v-62b18e40><div class="container" data-v-62b18e40><div class="main-content" data-v-62b18e40><aside class="sidebar" data-v-62b18e40><div class="sidebar-title" data-v-62b18e40>\u79D1\u5BA4\u5206\u7C7B</div><div class="category-search" data-v-62b18e40><input type="text"${ssrRenderAttr("value", categoryKeyword.value)} placeholder="\u641C\u7D22\u79D1\u5BA4..." class="category-search-input" data-v-62b18e40></div><div class="department-tree" data-v-62b18e40>`);
        if (categoriesLoading.value) {
          _push(`<div class="loading-text" data-v-62b18e40><span class="spinner" data-v-62b18e40></span><span data-v-62b18e40>\u52A0\u8F7D\u4E2D...</span></div>`);
        } else {
          _push(`<!--[--><!--[-->`);
          ssrRenderList(departments.value, (department) => {
            _push(`<div class="department-item" data-v-62b18e40><div class="department-header" data-v-62b18e40><span class="expand-icon" data-v-62b18e40>${ssrInterpolate(expandedDepartments.value.includes(department.id) ? "\u25BC" : "\u25B6")}</span><span class="department-name" data-v-62b18e40>${ssrInterpolate(department.categoryName)}</span></div>`);
            if (expandedDepartments.value.includes(department.id)) {
              _push(`<div class="sub-departments" data-v-62b18e40><!--[-->`);
              ssrRenderList(department.children, (sub) => {
                _push(`<div class="${ssrRenderClass([{ active: selectedCategoryId.value === sub.id }, "sub-department"])}" data-v-62b18e40>${ssrInterpolate(sub.categoryName)}</div>`);
              });
              _push(`<!--]--></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          });
          _push(`<!--]-->`);
          if (departments.value.length === 0) {
            _push(`<div class="empty-departments" data-v-62b18e40><p data-v-62b18e40>\u6682\u65E0\u79D1\u5BA4\u5206\u7C7B</p></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        }
        _push(`</div></aside><main class="content-area" data-v-62b18e40>`);
        if (expertsLoading.value) {
          _push(`<div class="loading-center" data-v-62b18e40><span class="spinner" data-v-62b18e40></span><span data-v-62b18e40>\u52A0\u8F7D\u4E13\u5BB6\u5217\u8868\u4E2D...</span></div>`);
        } else {
          _push(`<!--[--><div class="doctors-grid" data-v-62b18e40><!--[-->`);
          ssrRenderList(experts.value, (doctor) => {
            _push(`<div class="doctor-card" data-v-62b18e40><div class="doctor-avatar-wrapper" data-v-62b18e40><img${ssrRenderAttr("src", doctor.avatarUrl)}${ssrRenderAttr("alt", doctor.realName)} class="doctor-avatar" data-v-62b18e40><span class="doctor-status online" data-v-62b18e40>\u5728\u7EBF</span></div><h3 class="doctor-name" data-v-62b18e40>${ssrInterpolate(doctor.realName)}</h3><p class="doctor-title" data-v-62b18e40>${ssrInterpolate(doctor.title)}</p><p class="doctor-organization" data-v-62b18e40>${ssrInterpolate(doctor.organization)}</p><p class="doctor-specialty" data-v-62b18e40>${ssrInterpolate(doctor.specialty)}</p></div>`);
          });
          _push(`<!--]--></div>`);
          if (experts.value.length === 0) {
            _push(`<div class="empty-state" data-v-62b18e40><p data-v-62b18e40>\u6682\u65E0\u4E13\u5BB6</p></div>`);
          } else {
            _push(`<!---->`);
          }
          if (total.value > pageSize.value) {
            _push(`<section class="pagination-section" data-v-62b18e40><div class="pagination" data-v-62b18e40><button class="page-btn"${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} data-v-62b18e40>\u4E0A\u4E00\u9875</button><span class="page-info" data-v-62b18e40>\u7B2C ${ssrInterpolate(currentPage.value)} / ${ssrInterpolate(totalPages.value)} \u9875</span><button class="page-btn"${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} data-v-62b18e40>\u4E0B\u4E00\u9875</button></div></section>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        }
        _push(`</main></div></div></section>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "myQuestions") {
        _push(`<section class="main-section" data-v-62b18e40><div class="container" data-v-62b18e40><div class="questions-table-wrapper" data-v-62b18e40>`);
        if (questions.value.length > 0) {
          _push(`<table class="questions-table" data-v-62b18e40><thead data-v-62b18e40><tr data-v-62b18e40><th style="${ssrRenderStyle({ "width": "60px" })}" data-v-62b18e40>\u5E8F\u53F7</th><th data-v-62b18e40>\u54A8\u8BE2\u6807\u9898</th><th style="${ssrRenderStyle({ "width": "100px" })}" data-v-62b18e40>\u72B6\u6001</th><th style="${ssrRenderStyle({ "width": "160px" })}" data-v-62b18e40>\u63D0\u4EA4\u65F6\u95F4</th><th style="${ssrRenderStyle({ "width": "100px" })}" data-v-62b18e40>\u64CD\u4F5C</th></tr></thead><tbody data-v-62b18e40><!--[-->`);
          ssrRenderList(questions.value, (q, index2) => {
            _push(`<tr class="question-row" data-v-62b18e40><td data-v-62b18e40>${ssrInterpolate((questionPage.value - 1) * questionSize.value + index2 + 1)}</td><td class="question-title-cell" data-v-62b18e40><span class="question-title" data-v-62b18e40>${ssrInterpolate(q.title)}</span><p class="question-desc" data-v-62b18e40>${ssrInterpolate(truncateText(q.content, 50))}</p></td><td data-v-62b18e40><span class="${ssrRenderClass(["status-" + q.status.toLowerCase(), "status-badge"])}" data-v-62b18e40>${ssrInterpolate(statusLabelMap[q.status] || q.status)}</span></td><td class="question-time" data-v-62b18e40>-</td><td data-v-62b18e40><button class="view-btn" data-v-62b18e40>\u67E5\u770B</button></td></tr>`);
          });
          _push(`<!--]--></tbody></table>`);
        } else {
          _push(`<div class="empty-state" data-v-62b18e40><p data-v-62b18e40>\u6682\u65E0\u54A8\u8BE2\u8BB0\u5F55</p></div>`);
        }
        if (questionTotal.value > questionSize.value) {
          _push(`<section class="pagination-section" data-v-62b18e40><div class="pagination" data-v-62b18e40><button class="page-btn"${ssrIncludeBooleanAttr(questionPage.value === 1) ? " disabled" : ""} data-v-62b18e40>\u4E0A\u4E00\u9875</button><span class="page-info" data-v-62b18e40>\u7B2C ${ssrInterpolate(questionPage.value)} / ${ssrInterpolate(questionTotalPages.value)} \u9875</span><button class="page-btn"${ssrIncludeBooleanAttr(questionPage.value === questionTotalPages.value) ? " disabled" : ""} data-v-62b18e40>\u4E0B\u4E00\u9875</button></div></section>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></section>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/consult/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-62b18e40"]]);

export { index as default };
//# sourceMappingURL=index-CgtPFPRr.mjs.map
