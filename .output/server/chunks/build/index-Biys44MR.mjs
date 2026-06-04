import { defineComponent, ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const expandedDepartments = ref([]);
    const selectedCategoryId = ref(null);
    const keyword = ref("");
    const categories = ref([]);
    const experts = ref([]);
    const currentPage = ref(1);
    const pageSize = ref(6);
    const total = ref(0);
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "consult-page" }, _attrs))} data-v-79751378><section class="page-banner" data-v-79751378><div class="container" data-v-79751378><h1 class="banner-title" data-v-79751378>\u4E13\u5BB6\u54A8\u8BE2</h1><p class="banner-desc" data-v-79751378>\u4E13\u4E1A\u95EE\u9898\u54A8\u8BE2\uFF0C\u540D\u5E08\u5728\u7EBF\u89E3\u7B54</p></div></section><div class="breadcrumb-section" data-v-79751378><div class="container" data-v-79751378><div class="breadcrumb" data-v-79751378><span class="breadcrumb-item" data-v-79751378>\u9996\u9875</span><span class="breadcrumb-separator" data-v-79751378>&gt;</span><span class="breadcrumb-item active" data-v-79751378>\u54A8\u8BE2</span></div></div></div><section class="search-section" data-v-79751378><div class="container" data-v-79751378><div class="search-box" data-v-79751378><input type="text"${ssrRenderAttr("value", keyword.value)} placeholder="\u641C\u7D22\u4E13\u5BB6\u59D3\u540D..." class="search-input" data-v-79751378><button class="search-btn" data-v-79751378> \u641C\u7D22 </button></div></div></section><section class="main-section" data-v-79751378><div class="container" data-v-79751378><div class="main-content" data-v-79751378><aside class="sidebar" data-v-79751378><div class="sidebar-title" data-v-79751378>\u79D1\u5BA4\u5206\u7C7B</div><div class="department-tree" data-v-79751378><!--[-->`);
      ssrRenderList(departments.value, (department) => {
        _push(`<div class="department-item" data-v-79751378><div class="department-header" data-v-79751378><span class="expand-icon" data-v-79751378>${ssrInterpolate(expandedDepartments.value.includes(department.id) ? "\u25BC" : "\u25B6")}</span><span class="department-name" data-v-79751378>${ssrInterpolate(department.categoryName)}</span></div>`);
        if (expandedDepartments.value.includes(department.id)) {
          _push(`<div class="sub-departments" data-v-79751378><!--[-->`);
          ssrRenderList(department.children, (sub) => {
            _push(`<div class="${ssrRenderClass([{ active: selectedCategoryId.value === sub.id }, "sub-department"])}" data-v-79751378>${ssrInterpolate(sub.categoryName)}</div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]-->`);
      if (departments.value.length === 0) {
        _push(`<div class="empty-departments" data-v-79751378><p data-v-79751378>\u6682\u65E0\u79D1\u5BA4\u5206\u7C7B</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></aside><main class="content-area" data-v-79751378><div class="doctors-grid" data-v-79751378><!--[-->`);
      ssrRenderList(experts.value, (doctor) => {
        _push(`<div class="doctor-card" data-v-79751378><div class="doctor-avatar-wrapper" data-v-79751378><img${ssrRenderAttr("src", doctor.avatarUrl)}${ssrRenderAttr("alt", doctor.realName)} class="doctor-avatar" data-v-79751378><span class="doctor-status online" data-v-79751378>\u5728\u7EBF</span></div><h3 class="doctor-name" data-v-79751378>${ssrInterpolate(doctor.realName)}</h3><p class="doctor-title" data-v-79751378>${ssrInterpolate(doctor.title)}</p><p class="doctor-organization" data-v-79751378>${ssrInterpolate(doctor.organization)}</p><p class="doctor-specialty" data-v-79751378>${ssrInterpolate(doctor.specialty)}</p></div>`);
      });
      _push(`<!--]--></div>`);
      if (experts.value.length === 0) {
        _push(`<div class="empty-state" data-v-79751378><p data-v-79751378>\u6682\u65E0\u4E13\u5BB6</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (total.value > pageSize.value) {
        _push(`<section class="pagination-section" data-v-79751378><div class="pagination" data-v-79751378><button class="page-btn"${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} data-v-79751378> \u4E0A\u4E00\u9875 </button><span class="page-info" data-v-79751378> \u7B2C ${ssrInterpolate(currentPage.value)} / ${ssrInterpolate(totalPages.value)} \u9875 </span><button class="page-btn"${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} data-v-79751378> \u4E0B\u4E00\u9875 </button></div></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</main></div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/consult/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-79751378"]]);

export { index as default };
//# sourceMappingURL=index-Biys44MR.mjs.map
