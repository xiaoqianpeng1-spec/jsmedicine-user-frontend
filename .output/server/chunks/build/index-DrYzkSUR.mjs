import { defineComponent, ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const topics = ref([]);
    const keyword = ref("");
    const currentPage = ref(1);
    const pageSize = ref(8);
    const total = ref(0);
    const totalPages = computed(() => {
      return Math.ceil(total.value / pageSize.value);
    });
    const formatDate = (dateStr) => {
      if (!dateStr) return "-";
      const date = new Date(dateStr);
      return date.toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "topics-page" }, _attrs))} data-v-c91886f5><section class="page-banner" data-v-c91886f5><div class="container" data-v-c91886f5><h1 class="banner-title" data-v-c91886f5>\u4E13\u9898\u4E2D\u5FC3</h1><p class="banner-desc" data-v-c91886f5>\u7CBE\u9009\u4E13\u9898\uFF0C\u6DF1\u5165\u5B66\u4E60\u4E2D\u533B\u77E5\u8BC6\u4F53\u7CFB</p></div></section><div class="breadcrumb-section" data-v-c91886f5><div class="container" data-v-c91886f5><div class="breadcrumb" data-v-c91886f5><span class="breadcrumb-item" data-v-c91886f5>\u9996\u9875</span><span class="breadcrumb-separator" data-v-c91886f5>&gt;</span><span class="breadcrumb-item active" data-v-c91886f5>\u4E13\u9898</span></div></div></div><section class="search-section" data-v-c91886f5><div class="container" data-v-c91886f5><div class="search-box" data-v-c91886f5><input type="text"${ssrRenderAttr("value", keyword.value)} placeholder="\u641C\u7D22\u4E13\u9898\u540D\u79F0..." class="search-input" data-v-c91886f5><button class="search-btn" data-v-c91886f5> \u641C\u7D22 </button></div></div></section><section class="topics-section" data-v-c91886f5><div class="container" data-v-c91886f5><div class="topics-grid" data-v-c91886f5><!--[-->`);
      ssrRenderList(topics.value, (topic) => {
        _push(`<div class="topic-card" data-v-c91886f5><div class="topic-image" data-v-c91886f5><img${ssrRenderAttr("src", topic.coverUrl)}${ssrRenderAttr("alt", topic.title)} data-v-c91886f5></div><div class="topic-info" data-v-c91886f5><h3 class="topic-title" data-v-c91886f5>${ssrInterpolate(topic.title)}</h3><p class="topic-summary" data-v-c91886f5>${ssrInterpolate(topic.summary)}</p><div class="topic-meta" data-v-c91886f5><span class="topic-date" data-v-c91886f5>${ssrInterpolate(formatDate(topic.publishedAt))}</span><div class="topic-stats" data-v-c91886f5><span class="stat-views" data-v-c91886f5>\u{1F441}\uFE0F ${ssrInterpolate(topic.viewCount)}</span><span class="stat-favorites" data-v-c91886f5>\u2764\uFE0F ${ssrInterpolate(topic.favoriteCount)}</span></div></div></div></div>`);
      });
      _push(`<!--]--></div>`);
      if (topics.value.length === 0) {
        _push(`<div class="empty-state" data-v-c91886f5><p data-v-c91886f5>\u6682\u65E0\u4E13\u9898</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section>`);
      if (total.value > pageSize.value) {
        _push(`<section class="pagination-section" data-v-c91886f5><div class="container" data-v-c91886f5><div class="pagination" data-v-c91886f5><button class="page-btn"${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} data-v-c91886f5> \u4E0A\u4E00\u9875 </button><span class="page-info" data-v-c91886f5> \u7B2C ${ssrInterpolate(currentPage.value)} / ${ssrInterpolate(totalPages.value)} \u9875 </span><button class="page-btn"${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} data-v-c91886f5> \u4E0B\u4E00\u9875 </button></div></div></section>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/topics/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c91886f5"]]);

export { index as default };
//# sourceMappingURL=index-DrYzkSUR.mjs.map
