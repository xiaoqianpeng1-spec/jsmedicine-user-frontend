import { defineComponent, ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrRenderStyle, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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
    const categoriesLoading = ref(false);
    const categoriesError = ref("");
    const books = ref([]);
    const keyword = ref("");
    const currentPage = ref(1);
    const pageSize = ref(6);
    const total = ref(0);
    const booksLoading = ref(false);
    const booksError = ref("");
    const totalPages = computed(() => {
      return Math.ceil(total.value / pageSize.value);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "books-page" }, _attrs))} data-v-47ba2508><section class="page-banner" data-v-47ba2508><div class="container" data-v-47ba2508><h1 class="banner-title" data-v-47ba2508>\u6570\u5B57\u56FE\u4E66\u9986</h1><p class="banner-desc" data-v-47ba2508>\u6D77\u91CF\u4E2D\u533B\u7ECF\u5178\u8457\u4F5C\uFF0C\u968F\u65F6\u968F\u5730\u9605\u8BFB\u5B66\u4E60</p></div></section><section class="filter-section" data-v-47ba2508><div class="container" data-v-47ba2508>`);
      if (categoriesLoading.value) {
        _push(`<div class="loading-tabs" data-v-47ba2508><div class="loading-tab" data-v-47ba2508></div><div class="loading-tab" data-v-47ba2508></div><div class="loading-tab" data-v-47ba2508></div></div>`);
      } else if (categoriesError.value) {
        _push(`<div class="error-message" data-v-47ba2508><p data-v-47ba2508>${ssrInterpolate(categoriesError.value)}</p><button class="retry-btn" data-v-47ba2508>\u91CD\u8BD5</button></div>`);
      } else {
        _push(`<div class="filter-tabs" data-v-47ba2508><!--[-->`);
        ssrRenderList(categories.value, (category) => {
          _push(`<button class="${ssrRenderClass([{ active: activeCategoryId.value === category.id }, "filter-tab"])}" data-v-47ba2508>${ssrInterpolate(category.categoryName)}</button>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></section><section class="search-section" data-v-47ba2508><div class="container" data-v-47ba2508><div class="search-box" data-v-47ba2508><input type="text"${ssrRenderAttr("value", keyword.value)} placeholder="\u641C\u7D22\u56FE\u4E66\u540D\u79F0..." class="search-input" data-v-47ba2508><button class="search-btn" data-v-47ba2508> \u641C\u7D22 </button></div></div></section><section class="books-section" data-v-47ba2508><div class="container" data-v-47ba2508>`);
      if (booksLoading.value) {
        _push(`<div class="loading-state" data-v-47ba2508><div class="spinner" data-v-47ba2508></div><p data-v-47ba2508>\u52A0\u8F7D\u4E2D...</p></div>`);
      } else if (booksError.value) {
        _push(`<div class="error-state" data-v-47ba2508><p data-v-47ba2508>${ssrInterpolate(booksError.value)}</p><button class="retry-btn" data-v-47ba2508>\u91CD\u8BD5</button></div>`);
      } else {
        _push(`<div class="books-grid" data-v-47ba2508><!--[-->`);
        ssrRenderList(books.value, (book) => {
          _push(`<div class="book-card" data-v-47ba2508><div class="book-cover" data-v-47ba2508><img${ssrRenderAttr("src", book.coverUrl)}${ssrRenderAttr("alt", book.bookName)} data-v-47ba2508>`);
          if (book.favorited) {
            _push(`<div class="favorite-badge" data-v-47ba2508>\u2764\uFE0F</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="book-info" data-v-47ba2508><h3 class="book-title" data-v-47ba2508>${ssrInterpolate(book.bookName)}</h3><p class="book-author" data-v-47ba2508>${ssrInterpolate(book.author)}</p><p class="book-publisher" data-v-47ba2508>${ssrInterpolate(book.publisher)}</p><p class="book-desc" data-v-47ba2508>${ssrInterpolate(book.introduction)}</p><div class="book-meta" data-v-47ba2508><span class="book-pages" data-v-47ba2508>${ssrInterpolate(book.totalPages)} \u9875</span><span class="book-reads" data-v-47ba2508>\u{1F4D6} ${ssrInterpolate(book.browseCount)} \u4EBA\u5728\u8BFB</span><span class="book-favorites" data-v-47ba2508>\u2764\uFE0F ${ssrInterpolate(book.favoriteCount)}</span></div>`);
          if (book.progressPercent > 0) {
            _push(`<div class="progress-bar" data-v-47ba2508><div class="progress-fill" style="${ssrRenderStyle({ width: book.progressPercent + "%" })}" data-v-47ba2508></div><span class="progress-text" data-v-47ba2508>\u5DF2\u8BFB ${ssrInterpolate(book.progressPercent)}%</span></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      if (!booksLoading.value && !booksError.value && books.value.length === 0) {
        _push(`<div class="empty-state" data-v-47ba2508><p data-v-47ba2508>\u6682\u65E0\u56FE\u4E66</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section>`);
      if (total.value > pageSize.value) {
        _push(`<section class="pagination-section" data-v-47ba2508><div class="container" data-v-47ba2508><div class="pagination" data-v-47ba2508><button class="page-btn"${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} data-v-47ba2508> \u4E0A\u4E00\u9875 </button><span class="page-info" data-v-47ba2508> \u7B2C ${ssrInterpolate(currentPage.value)} / ${ssrInterpolate(totalPages.value)} \u9875 </span><button class="page-btn"${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} data-v-47ba2508> \u4E0B\u4E00\u9875 </button></div></div></section>`);
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
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-47ba2508"]]);

export { index as default };
//# sourceMappingURL=index-RDrLXq2K.mjs.map
