import { defineComponent, ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { useRouter, useRoute } from 'vue-router';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[sectionType]",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    useRoute();
    const loading = ref(false);
    const error = ref("");
    const resources = ref([]);
    const currentPage = ref(1);
    const pageSize = ref(20);
    const total = ref(0);
    const topicTitle = ref("");
    const sectionLabel = ref("");
    const totalPages = computed(() => {
      return Math.ceil(total.value / pageSize.value);
    });
    const formatNumber = (num) => {
      if (num >= 1e4) {
        return (num / 1e4).toFixed(1) + "w";
      }
      return num.toString();
    };
    const formatStudyTime = (seconds) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor(seconds % 3600 / 60);
      if (hours > 0) {
        return `${hours}\u5C0F\u65F6${minutes}\u5206\u949F`;
      }
      return `${minutes}\u5206\u949F`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "topic-section-page" }, _attrs))} data-v-79f85cbe><section class="page-banner" data-v-79f85cbe><div class="container" data-v-79f85cbe><h1 class="banner-title" data-v-79f85cbe>${ssrInterpolate(sectionLabel.value || "\u4E13\u9898\u8D44\u6E90")}</h1><p class="banner-desc" data-v-79f85cbe>${ssrInterpolate(topicTitle.value)}</p></div></section><div class="breadcrumb-section" data-v-79f85cbe><div class="container" data-v-79f85cbe><div class="breadcrumb" data-v-79f85cbe><span class="breadcrumb-item" data-v-79f85cbe>\u9996\u9875</span><span class="breadcrumb-separator" data-v-79f85cbe>&gt;</span><span class="breadcrumb-item" data-v-79f85cbe>\u4E13\u9898</span><span class="breadcrumb-separator" data-v-79f85cbe>&gt;</span><span class="breadcrumb-item" data-v-79f85cbe>${ssrInterpolate(topicTitle.value)}</span><span class="breadcrumb-separator" data-v-79f85cbe>&gt;</span><span class="breadcrumb-item active" data-v-79f85cbe>${ssrInterpolate(sectionLabel.value)}</span></div></div></div><section class="resources-section" data-v-79f85cbe><div class="container" data-v-79f85cbe><div class="section-header" data-v-79f85cbe><h2 class="section-title" data-v-79f85cbe>${ssrInterpolate(sectionLabel.value)}</h2><span class="resource-count" data-v-79f85cbe>\u5171 ${ssrInterpolate(total.value)} \u4E2A\u8D44\u6E90</span></div>`);
      if (loading.value) {
        _push(`<div class="loading-state" data-v-79f85cbe><div class="spinner" data-v-79f85cbe></div><p data-v-79f85cbe>\u52A0\u8F7D\u4E2D...</p></div>`);
      } else if (error.value) {
        _push(`<div class="error-state" data-v-79f85cbe><p data-v-79f85cbe>${ssrInterpolate(error.value)}</p><button class="retry-btn" data-v-79f85cbe>\u91CD\u8BD5</button></div>`);
      } else {
        _push(`<div class="resources-grid" data-v-79f85cbe><!--[-->`);
        ssrRenderList(resources.value, (item) => {
          _push(`<div class="resource-card" data-v-79f85cbe><div class="resource-cover" data-v-79f85cbe><img${ssrRenderAttr("src", item.coverUrl)}${ssrRenderAttr("alt", item.title)} data-v-79f85cbe><div class="resource-type-badge" data-v-79f85cbe>${ssrInterpolate(item.resourceTypeLabel)}</div></div><div class="resource-content" data-v-79f85cbe><h3 class="resource-title" data-v-79f85cbe>${ssrInterpolate(item.title)}</h3><p class="resource-subtitle" data-v-79f85cbe>${ssrInterpolate(item.subtitle)}</p><div class="resource-tags" data-v-79f85cbe><!--[-->`);
          ssrRenderList(item.tags.slice(0, 2), (tag) => {
            _push(`<span class="resource-tag" data-v-79f85cbe>${ssrInterpolate(tag)}</span>`);
          });
          _push(`<!--]--></div><div class="resource-stats" data-v-79f85cbe><span class="stat-item" data-v-79f85cbe>\u{1F441}\uFE0F ${ssrInterpolate(formatNumber(item.browseCount))}</span><span class="stat-item" data-v-79f85cbe>${ssrInterpolate(item.favorited ? "\u2764\uFE0F" : "\u{1F90D}")} ${ssrInterpolate(item.favoriteCount)}</span>`);
          if (item.progressPercent > 0) {
            _push(`<span class="progress-text" data-v-79f85cbe>\u8FDB\u5EA6 ${ssrInterpolate(item.progressPercent)}%</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          if (item.studySeconds > 0) {
            _push(`<div class="study-time" data-v-79f85cbe> \u23F1\uFE0F \u5DF2\u5B66\u4E60 ${ssrInterpolate(formatStudyTime(item.studySeconds))}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]-->`);
        if (resources.value.length === 0) {
          _push(`<div class="empty-state" data-v-79f85cbe><p data-v-79f85cbe>\u6682\u65E0\u8D44\u6E90</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      if (total.value > pageSize.value && !loading.value) {
        _push(`<div class="pagination-section" data-v-79f85cbe><div class="pagination" data-v-79f85cbe><button class="page-btn"${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} data-v-79f85cbe> \u4E0A\u4E00\u9875 </button><span class="page-info" data-v-79f85cbe> \u7B2C ${ssrInterpolate(currentPage.value)} / ${ssrInterpolate(totalPages.value)} \u9875 </span><button class="page-btn"${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} data-v-79f85cbe> \u4E0B\u4E00\u9875 </button></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/topics/[id]/sections/[sectionType].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _sectionType_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-79f85cbe"]]);

export { _sectionType_ as default };
//# sourceMappingURL=_sectionType_-m9JpKd7j.mjs.map
