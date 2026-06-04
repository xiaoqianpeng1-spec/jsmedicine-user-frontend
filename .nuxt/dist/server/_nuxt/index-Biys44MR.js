import { defineComponent, ref, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "consult-page" }, _attrs))} data-v-79751378><section class="page-banner" data-v-79751378><div class="container" data-v-79751378><h1 class="banner-title" data-v-79751378>专家咨询</h1><p class="banner-desc" data-v-79751378>专业问题咨询，名师在线解答</p></div></section><div class="breadcrumb-section" data-v-79751378><div class="container" data-v-79751378><div class="breadcrumb" data-v-79751378><span class="breadcrumb-item" data-v-79751378>首页</span><span class="breadcrumb-separator" data-v-79751378>&gt;</span><span class="breadcrumb-item active" data-v-79751378>咨询</span></div></div></div><section class="search-section" data-v-79751378><div class="container" data-v-79751378><div class="search-box" data-v-79751378><input type="text"${ssrRenderAttr("value", keyword.value)} placeholder="搜索专家姓名..." class="search-input" data-v-79751378><button class="search-btn" data-v-79751378> 搜索 </button></div></div></section><section class="main-section" data-v-79751378><div class="container" data-v-79751378><div class="main-content" data-v-79751378><aside class="sidebar" data-v-79751378><div class="sidebar-title" data-v-79751378>科室分类</div><div class="department-tree" data-v-79751378><!--[-->`);
      ssrRenderList(departments.value, (department) => {
        _push(`<div class="department-item" data-v-79751378><div class="department-header" data-v-79751378><span class="expand-icon" data-v-79751378>${ssrInterpolate(expandedDepartments.value.includes(department.id) ? "▼" : "▶")}</span><span class="department-name" data-v-79751378>${ssrInterpolate(department.categoryName)}</span></div>`);
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
        _push(`<div class="empty-departments" data-v-79751378><p data-v-79751378>暂无科室分类</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></aside><main class="content-area" data-v-79751378><div class="doctors-grid" data-v-79751378><!--[-->`);
      ssrRenderList(experts.value, (doctor) => {
        _push(`<div class="doctor-card" data-v-79751378><div class="doctor-avatar-wrapper" data-v-79751378><img${ssrRenderAttr("src", doctor.avatarUrl)}${ssrRenderAttr("alt", doctor.realName)} class="doctor-avatar" data-v-79751378><span class="doctor-status online" data-v-79751378>在线</span></div><h3 class="doctor-name" data-v-79751378>${ssrInterpolate(doctor.realName)}</h3><p class="doctor-title" data-v-79751378>${ssrInterpolate(doctor.title)}</p><p class="doctor-organization" data-v-79751378>${ssrInterpolate(doctor.organization)}</p><p class="doctor-specialty" data-v-79751378>${ssrInterpolate(doctor.specialty)}</p></div>`);
      });
      _push(`<!--]--></div>`);
      if (experts.value.length === 0) {
        _push(`<div class="empty-state" data-v-79751378><p data-v-79751378>暂无专家</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (total.value > pageSize.value) {
        _push(`<section class="pagination-section" data-v-79751378><div class="pagination" data-v-79751378><button class="page-btn"${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} data-v-79751378> 上一页 </button><span class="page-info" data-v-79751378> 第 ${ssrInterpolate(currentPage.value)} / ${ssrInterpolate(totalPages.value)} 页 </span><button class="page-btn"${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} data-v-79751378> 下一页 </button></div></section>`);
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
export {
  index as default
};
//# sourceMappingURL=index-Biys44MR.js.map
