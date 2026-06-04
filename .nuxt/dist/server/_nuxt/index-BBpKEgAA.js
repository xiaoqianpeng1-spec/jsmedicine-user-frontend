import { defineComponent, ref, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
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
    const activeCategoryId = ref(0);
    const categories = ref([
      { id: 0, parentId: 0, categoryName: "全部", sortOrder: 0 }
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "books-page" }, _attrs))} data-v-452c13bd><section class="page-banner" data-v-452c13bd><div class="container" data-v-452c13bd><h1 class="banner-title" data-v-452c13bd>数字图书馆</h1><p class="banner-desc" data-v-452c13bd>海量中医经典著作，随时随地阅读学习</p></div></section><section class="filter-section" data-v-452c13bd><div class="container" data-v-452c13bd><div class="filter-tabs" data-v-452c13bd><!--[-->`);
      ssrRenderList(categories.value, (category) => {
        _push(`<button class="${ssrRenderClass([{ active: activeCategoryId.value === category.id }, "filter-tab"])}" data-v-452c13bd>${ssrInterpolate(category.categoryName)}</button>`);
      });
      _push(`<!--]--></div></div></section><section class="search-section" data-v-452c13bd><div class="container" data-v-452c13bd><div class="search-box" data-v-452c13bd><input type="text"${ssrRenderAttr("value", keyword.value)} placeholder="搜索图书名称..." class="search-input" data-v-452c13bd><button class="search-btn" data-v-452c13bd> 搜索 </button></div></div></section><section class="books-section" data-v-452c13bd><div class="container" data-v-452c13bd><div class="books-grid" data-v-452c13bd><!--[-->`);
      ssrRenderList(books.value, (book) => {
        _push(`<div class="book-card" data-v-452c13bd><div class="book-cover" data-v-452c13bd><img${ssrRenderAttr("src", book.coverUrl)}${ssrRenderAttr("alt", book.bookName)} data-v-452c13bd></div><div class="book-info" data-v-452c13bd><h3 class="book-title" data-v-452c13bd>${ssrInterpolate(book.bookName)}</h3><p class="book-author" data-v-452c13bd>${ssrInterpolate(book.author)}</p><p class="book-desc" data-v-452c13bd>${ssrInterpolate(book.introduction)}</p><div class="book-meta" data-v-452c13bd><span class="book-pages" data-v-452c13bd>${ssrInterpolate(book.totalPages)} 页</span><span class="book-reads" data-v-452c13bd>📖 ${ssrInterpolate(book.browseCount)} 人在读</span></div></div></div>`);
      });
      _push(`<!--]--></div>`);
      if (books.value.length === 0) {
        _push(`<div class="empty-state" data-v-452c13bd><p data-v-452c13bd>暂无图书</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section>`);
      if (total.value > pageSize.value) {
        _push(`<section class="pagination-section" data-v-452c13bd><div class="container" data-v-452c13bd><div class="pagination" data-v-452c13bd><button class="page-btn"${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} data-v-452c13bd> 上一页 </button><span class="page-info" data-v-452c13bd> 第 ${ssrInterpolate(currentPage.value)} / ${ssrInterpolate(totalPages.value)} 页 </span><button class="page-btn"${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} data-v-452c13bd> 下一页 </button></div></div></section>`);
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
export {
  index as default
};
//# sourceMappingURL=index-BBpKEgAA.js.map
