import { defineComponent, ref, reactive, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { useRoute, useRouter } from 'vue-router';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    useRouter();
    const loading = ref(false);
    const error = ref("");
    const article = reactive({
      id: 0,
      title: "",
      summary: "",
      coverUrl: "",
      content: "",
      authorName: "",
      source: "",
      tags: [],
      viewCount: 0,
      favoriteCount: 0,
      favorited: false,
      publishedAt: ""
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "article-detail-page" }, _attrs))} data-v-ab6e0839><div class="breadcrumb-section" data-v-ab6e0839><div class="container" data-v-ab6e0839><div class="breadcrumb" data-v-ab6e0839><span class="breadcrumb-item" data-v-ab6e0839>\u9996\u9875</span><span class="breadcrumb-separator" data-v-ab6e0839>&gt;</span><span class="breadcrumb-item" data-v-ab6e0839>\u8D44\u8BAF</span><span class="breadcrumb-separator" data-v-ab6e0839>&gt;</span><span class="breadcrumb-item active" data-v-ab6e0839>${ssrInterpolate(article.title)}</span></div></div></div>`);
      if (loading.value) {
        _push(`<div class="loading-state" data-v-ab6e0839><div class="spinner" data-v-ab6e0839></div><p data-v-ab6e0839>\u52A0\u8F7D\u4E2D...</p></div>`);
      } else if (error.value) {
        _push(`<div class="error-state" data-v-ab6e0839>`);
        if (error.value === "\u672A\u6388\u6743\uFF0C\u8BF7\u767B\u5F55") {
          _push(`<div class="login-prompt" data-v-ab6e0839><div class="login-icon" data-v-ab6e0839>\u{1F510}</div><h3 data-v-ab6e0839>\u9700\u8981\u767B\u5F55</h3><p data-v-ab6e0839>\u6D4F\u89C8\u8D44\u8BAF\u8BE6\u60C5\u9700\u8981\u5148\u767B\u5F55\u8D26\u53F7</p><button class="login-btn" data-v-ab6e0839>\u7ACB\u5373\u767B\u5F55</button></div>`);
        } else {
          _push(`<div data-v-ab6e0839><p data-v-ab6e0839>${ssrInterpolate(error.value)}</p><button class="retry-btn" data-v-ab6e0839>\u91CD\u8BD5</button></div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<div class="article-content-wrapper" data-v-ab6e0839><div class="container" data-v-ab6e0839><div class="article-header" data-v-ab6e0839><div class="article-tags" data-v-ab6e0839><!--[-->`);
        ssrRenderList(article.tags, (tag) => {
          _push(`<span class="article-tag" data-v-ab6e0839>${ssrInterpolate(tag)}</span>`);
        });
        _push(`<!--]--></div><h1 class="article-title" data-v-ab6e0839>${ssrInterpolate(article.title)}</h1><div class="article-meta" data-v-ab6e0839><span class="article-author" data-v-ab6e0839>${ssrInterpolate(article.authorName)}</span><span class="article-source" data-v-ab6e0839>${ssrInterpolate(article.source)}</span><span class="article-time" data-v-ab6e0839>${ssrInterpolate(formatDate(article.publishedAt))}</span><span class="article-views" data-v-ab6e0839>\u{1F441}\uFE0F ${ssrInterpolate(formatNumber(article.viewCount))}</span></div></div>`);
        if (article.coverUrl) {
          _push(`<div class="article-main-image" data-v-ab6e0839><img${ssrRenderAttr("src", article.coverUrl)}${ssrRenderAttr("alt", article.title)} data-v-ab6e0839></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="article-body" data-v-ab6e0839><div class="article-summary-box" data-v-ab6e0839><h3 class="summary-title" data-v-ab6e0839>\u{1F4CB} \u5185\u5BB9\u6458\u8981</h3><p class="summary-text" data-v-ab6e0839>${ssrInterpolate(article.summary)}</p></div><div class="article-text" data-v-ab6e0839><p data-v-ab6e0839>${ssrInterpolate(article.content)}</p></div></div><div class="article-footer" data-v-ab6e0839><div class="article-actions" data-v-ab6e0839><button class="${ssrRenderClass([{ favorited: article.favorited }, "action-btn favorite-btn"])}" data-v-ab6e0839><span class="action-icon" data-v-ab6e0839>${ssrInterpolate(article.favorited ? "\u2764\uFE0F" : "\u{1F90D}")}</span><span class="action-text" data-v-ab6e0839>${ssrInterpolate(article.favoriteCount)}</span></button><div class="article-stats" data-v-ab6e0839><span class="stat-item" data-v-ab6e0839>\u{1F441}\uFE0F ${ssrInterpolate(formatNumber(article.viewCount))}</span></div></div><button class="back-btn" data-v-ab6e0839>\u2190 \u8FD4\u56DE\u8D44\u8BAF\u5217\u8868</button></div></div></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/articles/detail/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ab6e0839"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-CJ1Cc9ia.mjs.map
