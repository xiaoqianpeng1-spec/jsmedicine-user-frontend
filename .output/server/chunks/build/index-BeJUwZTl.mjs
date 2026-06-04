import { defineComponent, ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const activeTab = ref("all");
    const searchKeyword = ref("");
    const currentPage = ref(1);
    const totalPages = ref(5);
    const filterTabs = [
      { id: "all", name: "\u5168\u90E8" },
      { id: "news", name: "\u65B0\u95FB\u8D44\u8BAF" },
      { id: "academic", name: "\u5B66\u672F\u4EA4\u6D41" },
      { id: "industry", name: "\u884C\u4E1A\u52A8\u6001" },
      { id: "research", name: "\u7814\u7A76\u6210\u679C" }
    ];
    const articles = ref([
      {
        id: 1,
        image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=medical%20conference%20professional%20news&image_size=landscape_4_3",
        title: "\u9996\u5C4A\u4E2D\u6FB3\u5168\u79D1\u533B\u5B66\u6559\u80B2\u4E0E\u57FA\u5C42\u533B\u7597\u5B9E\u8DF5\u7F51\u7EDC\u7814\u8BA8\u4F1A\u53EC\u5F00\u5728\u5373",
        summary: "\u672C\u6B21\u7814\u8BA8\u4F1A\u5C06\u6C47\u805A\u56FD\u5185\u5916\u5168\u79D1\u533B\u5B66\u9886\u57DF\u7684\u4E13\u5BB6\u5B66\u8005\uFF0C\u5171\u540C\u63A2\u8BA8\u5168\u79D1\u533B\u5B66\u6559\u80B2\u7684\u521B\u65B0\u6A21\u5F0F\u548C\u57FA\u5C42\u533B\u7597\u5B9E\u8DF5\u7684\u53D1\u5C55\u65B9\u5411...",
        tag: "\u65B0\u95FB\u8D44\u8BAF",
        tagClass: "tag-red",
        author: "\u4E2D\u533B\u5728\u7EBF",
        time: "2024-01-15",
        views: 435678,
        comments: 43
      },
      {
        id: 2,
        image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20research%20laboratory&image_size=landscape_4_3",
        title: "\u4E2D\u533B\u836F\u6570\u5B57\u5316\u8F6C\u578B\u7814\u8BA8\u4F1A\u6210\u529F\u4E3E\u529E",
        summary: "\u4F1A\u8BAE\u56F4\u7ED5\u4E2D\u533B\u836F\u6570\u5B57\u5316\u8F6C\u578B\u7684\u524D\u6CBF\u6280\u672F\u3001\u5E94\u7528\u573A\u666F\u548C\u53D1\u5C55\u8D8B\u52BF\u8FDB\u884C\u4E86\u6DF1\u5165\u4EA4\u6D41\uFF0C\u5C55\u793A\u4E86\u591A\u9879\u521B\u65B0\u6210\u679C...",
        tag: "\u5B66\u672F\u4EA4\u6D41",
        tagClass: "tag-pink",
        author: "\u5B66\u672F\u90E8",
        time: "2024-01-14",
        views: 324567,
        comments: 38
      },
      {
        id: 3,
        image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=traditional%20Chinese%20medicine%20education%20classroom&image_size=landscape_4_3",
        title: "\u4E2D\u533B\u836F\u9AD8\u7B49\u6559\u80B2\u521B\u65B0\u53D1\u5C55\u8BBA\u575B\u5706\u6EE1\u843D\u5E55",
        summary: "\u6765\u81EA\u5168\u56FD\u5404\u5927\u4E2D\u533B\u836F\u9662\u6821\u7684\u4E13\u5BB6\u5B66\u8005\u9F50\u805A\u4E00\u5802\uFF0C\u5C31\u4E2D\u533B\u836F\u4EBA\u624D\u57F9\u517B\u3001\u8BFE\u7A0B\u6539\u9769\u7B49\u8BAE\u9898\u5C55\u5F00\u7814\u8BA8...",
        tag: "\u884C\u4E1A\u52A8\u6001",
        tagClass: "tag-blue",
        author: "\u6559\u80B2\u9891\u9053",
        time: "2024-01-13",
        views: 298765,
        comments: 52
      },
      {
        id: 4,
        image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20herbs%20research%20scientific&image_size=landscape_4_3",
        title: "\u4E2D\u533B\u836F\u9632\u6CBB\u65B0\u51A0\u75C5\u6BD2\u7814\u7A76\u53D6\u5F97\u65B0\u8FDB\u5C55",
        summary: "\u6700\u65B0\u7814\u7A76\u8868\u660E\uFF0C\u4E2D\u533B\u836F\u5728\u65B0\u51A0\u75C5\u6BD2\u9632\u6CBB\u4E2D\u5177\u6709\u663E\u8457\u7597\u6548\uFF0C\u4E3A\u5168\u7403\u6297\u75AB\u63D0\u4F9B\u4E86\u4E2D\u56FD\u65B9\u6848...",
        tag: "\u7814\u7A76\u6210\u679C",
        tagClass: "tag-green",
        author: "\u79D1\u7814\u4E2D\u5FC3",
        time: "2024-01-12",
        views: 567890,
        comments: 89
      },
      {
        id: 5,
        image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20conference%20event&image_size=landscape_4_3",
        title: "2024\u5E74\u5168\u56FD\u4E2D\u533B\u836F\u5DE5\u4F5C\u4F1A\u8BAE\u5728\u5317\u4EAC\u53EC\u5F00",
        summary: "\u4F1A\u8BAE\u603B\u7ED3\u4E86\u8FC7\u53BB\u4E00\u5E74\u4E2D\u533B\u836F\u4E8B\u4E1A\u53D1\u5C55\u53D6\u5F97\u7684\u6210\u5C31\uFF0C\u90E8\u7F72\u4E86\u65B0\u4E00\u5E74\u7684\u91CD\u70B9\u5DE5\u4F5C\u4EFB\u52A1...",
        tag: "\u65B0\u95FB\u8D44\u8BAF",
        tagClass: "tag-red",
        author: "\u4E2D\u533B\u5728\u7EBF",
        time: "2024-01-11",
        views: 789012,
        comments: 120
      }
    ]);
    const pageNumbers = computed(() => {
      return Array.from({ length: totalPages.value }, (_, i) => i + 1);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "articles-page" }, _attrs))} data-v-27dfceb6><section class="page-banner" data-v-27dfceb6><div class="container" data-v-27dfceb6><h1 class="banner-title" data-v-27dfceb6>\u8D44\u8BAF\u4E2D\u5FC3</h1><p class="banner-desc" data-v-27dfceb6>\u83B7\u53D6\u6700\u65B0\u4E2D\u533B\u884C\u4E1A\u52A8\u6001\u4E0E\u5B66\u672F\u8D44\u8BAF</p></div></section><section class="filter-section" data-v-27dfceb6><div class="container" data-v-27dfceb6><div class="filter-tabs" data-v-27dfceb6><!--[-->`);
      ssrRenderList(filterTabs, (tab) => {
        _push(`<button class="${ssrRenderClass([{ active: activeTab.value === tab.id }, "filter-tab"])}" data-v-27dfceb6>${ssrInterpolate(tab.name)}</button>`);
      });
      _push(`<!--]--></div><div class="search-box" data-v-27dfceb6><input${ssrRenderAttr("value", searchKeyword.value)} type="text" placeholder="\u641C\u7D22\u8D44\u8BAF..." data-v-27dfceb6><button class="search-btn" data-v-27dfceb6><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-27dfceb6><circle cx="11" cy="11" r="8" data-v-27dfceb6></circle><path d="m21 21-4.35-4.35" data-v-27dfceb6></path></svg></button></div></div></section><section class="articles-section" data-v-27dfceb6><div class="container" data-v-27dfceb6><div class="articles-list" data-v-27dfceb6><!--[-->`);
      ssrRenderList(articles.value, (article) => {
        _push(`<div class="article-card" data-v-27dfceb6><div class="article-image" data-v-27dfceb6><img${ssrRenderAttr("src", article.image)}${ssrRenderAttr("alt", article.title)} data-v-27dfceb6></div><div class="article-content" data-v-27dfceb6><span class="${ssrRenderClass([article.tagClass, "article-tag"])}" data-v-27dfceb6>${ssrInterpolate(article.tag)}</span><h3 class="article-title" data-v-27dfceb6>${ssrInterpolate(article.title)}</h3><p class="article-summary" data-v-27dfceb6>${ssrInterpolate(article.summary)}</p><div class="article-footer" data-v-27dfceb6><span class="article-author" data-v-27dfceb6>${ssrInterpolate(article.author)}</span><span class="article-time" data-v-27dfceb6>${ssrInterpolate(article.time)}</span><span class="article-views" data-v-27dfceb6>\u{1F441}\uFE0F ${ssrInterpolate(article.views)}</span><span class="article-comments" data-v-27dfceb6>\u{1F4AC} ${ssrInterpolate(article.comments)}</span></div></div></div>`);
      });
      _push(`<!--]--></div><div class="pagination" data-v-27dfceb6><button class="pagination-btn"${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} data-v-27dfceb6> \u2190 \u4E0A\u4E00\u9875 </button><div class="page-numbers" data-v-27dfceb6><!--[-->`);
      ssrRenderList(pageNumbers.value, (page) => {
        _push(`<span class="${ssrRenderClass([{ active: currentPage.value === page }, "page-number"])}" data-v-27dfceb6>${ssrInterpolate(page)}</span>`);
      });
      _push(`<!--]--></div><button class="pagination-btn"${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} data-v-27dfceb6> \u4E0B\u4E00\u9875 \u2192 </button></div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/articles/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-27dfceb6"]]);

export { index as default };
//# sourceMappingURL=index-BeJUwZTl.mjs.map
