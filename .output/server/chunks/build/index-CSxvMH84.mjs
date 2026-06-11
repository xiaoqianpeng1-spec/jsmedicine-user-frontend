import { defineComponent, ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const pageSize = 10;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const activeTab = ref("all");
    const searchKeyword = ref("");
    const currentPage = ref(1);
    const total = ref(0);
    const loading = ref(false);
    const error = ref("");
    const articles = ref([]);
    const filterTabs = [
      { id: "all", name: "\u5168\u90E8" },
      { id: "news", name: "\u65B0\u95FB\u8D44\u8BAF" },
      { id: "academic", name: "\u5B66\u672F\u4EA4\u6D41" },
      { id: "industry", name: "\u884C\u4E1A\u52A8\u6001" },
      { id: "research", name: "\u7814\u7A76\u6210\u679C" }
    ];
    const totalPages = computed(() => {
      return Math.ceil(total.value / pageSize);
    });
    const pageNumbers = computed(() => {
      return Array.from({ length: Math.min(totalPages.value, 10) }, (_, i) => i + 1);
    });
    const formatNumber = (num) => {
      if (num >= 1e4) {
        return (num / 1e4).toFixed(1) + "w";
      }
      return num.toString();
    };
    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      try {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
      } catch {
        return dateStr;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "articles-page" }, _attrs))} data-v-93e36c89><section class="page-banner" data-v-93e36c89><div class="container" data-v-93e36c89><h1 class="banner-title" data-v-93e36c89>\u8D44\u8BAF\u4E2D\u5FC3</h1><p class="banner-desc" data-v-93e36c89>\u83B7\u53D6\u6700\u65B0\u4E2D\u533B\u884C\u4E1A\u52A8\u6001\u4E0E\u5B66\u672F\u8D44\u8BAF</p></div></section><section class="filter-section" data-v-93e36c89><div class="container" data-v-93e36c89><div class="filter-tabs" data-v-93e36c89><!--[-->`);
      ssrRenderList(filterTabs, (tab) => {
        _push(`<button class="${ssrRenderClass([{ active: activeTab.value === tab.id }, "filter-tab"])}" data-v-93e36c89>${ssrInterpolate(tab.name)}</button>`);
      });
      _push(`<!--]--></div><div class="search-box" data-v-93e36c89><input${ssrRenderAttr("value", searchKeyword.value)} type="text" placeholder="\u641C\u7D22\u8D44\u8BAF..." data-v-93e36c89><button class="search-btn" data-v-93e36c89><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-93e36c89><circle cx="11" cy="11" r="8" data-v-93e36c89></circle><path d="m21 21-4.35-4.35" data-v-93e36c89></path></svg></button></div></div></section>`);
      if (loading.value) {
        _push(`<div class="loading-state" data-v-93e36c89><div class="spinner" data-v-93e36c89></div><p data-v-93e36c89>\u52A0\u8F7D\u4E2D...</p></div>`);
      } else if (error.value) {
        _push(`<div class="error-state" data-v-93e36c89>`);
        if (error.value === "\u672A\u6388\u6743\uFF0C\u8BF7\u767B\u5F55") {
          _push(`<div class="login-prompt" data-v-93e36c89><div class="login-icon" data-v-93e36c89>\u{1F510}</div><h3 data-v-93e36c89>\u9700\u8981\u767B\u5F55</h3><p data-v-93e36c89>\u6D4F\u89C8\u8D44\u8BAF\u9700\u8981\u5148\u767B\u5F55\u8D26\u53F7</p><button class="login-btn" data-v-93e36c89>\u7ACB\u5373\u767B\u5F55</button></div>`);
        } else {
          _push(`<div data-v-93e36c89><p data-v-93e36c89>${ssrInterpolate(error.value)}</p><button class="retry-btn" data-v-93e36c89>\u91CD\u8BD5</button></div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<section class="articles-section" data-v-93e36c89><div class="container" data-v-93e36c89><div class="articles-list" data-v-93e36c89><!--[-->`);
        ssrRenderList(articles.value, (article) => {
          _push(`<div class="article-card" data-v-93e36c89><div class="article-image" data-v-93e36c89><img${ssrRenderAttr("src", article.coverUrl || "https://via.placeholder.com/200x140?text=\u8D44\u8BAF\u5C01\u9762")}${ssrRenderAttr("alt", article.title)} data-v-93e36c89></div><div class="article-content" data-v-93e36c89><div class="article-tags" data-v-93e36c89><!--[-->`);
          ssrRenderList(article.tags.slice(0, 2), (tag) => {
            _push(`<span class="article-tag" data-v-93e36c89>${ssrInterpolate(tag)}</span>`);
          });
          _push(`<!--]--></div><h3 class="article-title" data-v-93e36c89>${ssrInterpolate(article.title)}</h3><p class="article-summary" data-v-93e36c89>${ssrInterpolate(article.summary)}</p><div class="article-footer" data-v-93e36c89><span class="article-author" data-v-93e36c89>${ssrInterpolate(article.authorName || article.source)}</span><span class="article-time" data-v-93e36c89>${ssrInterpolate(formatDate(article.publishedAt))}</span><span class="article-views" data-v-93e36c89>\u{1F441}\uFE0F ${ssrInterpolate(formatNumber(article.viewCount))}</span><span class="article-likes" data-v-93e36c89>\u2764\uFE0F ${ssrInterpolate(article.favoriteCount)}</span></div></div></div>`);
        });
        _push(`<!--]--></div><div class="pagination" data-v-93e36c89><button class="pagination-btn"${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} data-v-93e36c89> \u2190 \u4E0A\u4E00\u9875 </button><div class="page-numbers" data-v-93e36c89><!--[-->`);
        ssrRenderList(pageNumbers.value, (page) => {
          _push(`<span class="${ssrRenderClass([{ active: currentPage.value === page }, "page-number"])}" data-v-93e36c89>${ssrInterpolate(page)}</span>`);
        });
        _push(`<!--]--></div><button class="pagination-btn"${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} data-v-93e36c89> \u4E0B\u4E00\u9875 \u2192 </button></div></div></section>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/articles/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-93e36c89"]]);

export { index as default };
//# sourceMappingURL=index-CSxvMH84.mjs.map
