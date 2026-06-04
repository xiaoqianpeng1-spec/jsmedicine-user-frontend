import { defineComponent, ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const activeCategoryId = ref(0);
    const categories = ref([
      { id: 0, parentId: 0, categoryName: "\u5168\u90E8", sortOrder: 0 }
    ]);
    const books = ref([]);
    const keyword = ref("");
    const currentPage = ref(1);
    const pageSize = ref(6);
    const total = ref(0);
    const totalPages = computed(() => {
      return Math.ceil(total.value / pageSize.value);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "books-page" }, _attrs))} data-v-452c13bd><section class="page-banner" data-v-452c13bd><div class="container" data-v-452c13bd><h1 class="banner-title" data-v-452c13bd>\u6570\u5B57\u56FE\u4E66\u9986</h1><p class="banner-desc" data-v-452c13bd>\u6D77\u91CF\u4E2D\u533B\u7ECF\u5178\u8457\u4F5C\uFF0C\u968F\u65F6\u968F\u5730\u9605\u8BFB\u5B66\u4E60</p></div></section><section class="filter-section" data-v-452c13bd><div class="container" data-v-452c13bd><div class="filter-tabs" data-v-452c13bd><!--[-->`);
      ssrRenderList(categories.value, (category) => {
        _push(`<button class="${ssrRenderClass([{ active: activeCategoryId.value === category.id }, "filter-tab"])}" data-v-452c13bd>${ssrInterpolate(category.categoryName)}</button>`);
      });
      _push(`<!--]--></div></div></section><section class="search-section" data-v-452c13bd><div class="container" data-v-452c13bd><div class="search-box" data-v-452c13bd><input type="text"${ssrRenderAttr("value", keyword.value)} placeholder="\u641C\u7D22\u56FE\u4E66\u540D\u79F0..." class="search-input" data-v-452c13bd><button class="search-btn" data-v-452c13bd> \u641C\u7D22 </button></div></div></section><section class="books-section" data-v-452c13bd><div class="container" data-v-452c13bd><div class="books-grid" data-v-452c13bd><!--[-->`);
      ssrRenderList(books.value, (book) => {
        _push(`<div class="book-card" data-v-452c13bd><div class="book-cover" data-v-452c13bd><img${ssrRenderAttr("src", book.coverUrl)}${ssrRenderAttr("alt", book.bookName)} data-v-452c13bd></div><div class="book-info" data-v-452c13bd><h3 class="book-title" data-v-452c13bd>${ssrInterpolate(book.bookName)}</h3><p class="book-author" data-v-452c13bd>${ssrInterpolate(book.author)}</p><p class="book-desc" data-v-452c13bd>${ssrInterpolate(book.introduction)}</p><div class="book-meta" data-v-452c13bd><span class="book-pages" data-v-452c13bd>${ssrInterpolate(book.totalPages)} \u9875</span><span class="book-reads" data-v-452c13bd>\u{1F4D6} ${ssrInterpolate(book.browseCount)} \u4EBA\u5728\u8BFB</span></div></div></div>`);
      });
      _push(`<!--]--></div>`);
      if (books.value.length === 0) {
        _push(`<div class="empty-state" data-v-452c13bd><p data-v-452c13bd>\u6682\u65E0\u56FE\u4E66</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section>`);
      if (total.value > pageSize.value) {
        _push(`<section class="pagination-section" data-v-452c13bd><div class="container" data-v-452c13bd><div class="pagination" data-v-452c13bd><button class="page-btn"${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} data-v-452c13bd> \u4E0A\u4E00\u9875 </button><span class="page-info" data-v-452c13bd> \u7B2C ${ssrInterpolate(currentPage.value)} / ${ssrInterpolate(totalPages.value)} \u9875 </span><button class="page-btn"${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} data-v-452c13bd> \u4E0B\u4E00\u9875 </button></div></div></section>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/books/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-452c13bd"]]);

export { index as default };
//# sourceMappingURL=index-BBpKEgAA.mjs.map
