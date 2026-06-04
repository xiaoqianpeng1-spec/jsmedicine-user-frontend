import { defineComponent, ref, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useRouter, useRoute } from "vue-router";
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
  __name: "[chapterId]",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    useRoute();
    const bookTitle = ref("");
    const chapterData = ref({
      id: 0,
      bookId: 0,
      parentId: 0,
      chapterTitle: "",
      content: "",
      startPage: 0,
      pageCount: 0,
      paperId: 0,
      sortOrder: 0
    });
    const chapters = ref([]);
    const showMenu = ref(false);
    const prevChapter = computed(() => {
      const currentIndex = chapters.value.findIndex((c) => c.id === chapterData.value.id);
      return currentIndex > 0 ? chapters.value[currentIndex - 1] : null;
    });
    const nextChapter = computed(() => {
      const currentIndex = chapters.value.findIndex((c) => c.id === chapterData.value.id);
      return currentIndex < chapters.value.length - 1 ? chapters.value[currentIndex + 1] : null;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "chapter-detail-page" }, _attrs))} data-v-fea0be03><section class="chapter-header" data-v-fea0be03><div class="container" data-v-fea0be03><div class="header-content" data-v-fea0be03><button class="back-btn" data-v-fea0be03><span data-v-fea0be03>←</span></button><div class="header-title" data-v-fea0be03><h2 class="book-title" data-v-fea0be03>${ssrInterpolate(bookTitle.value)}</h2><p class="chapter-label" data-v-fea0be03>第 ${ssrInterpolate(chapterData.value.sortOrder)} 章</p></div><button class="menu-btn" data-v-fea0be03> ☰ </button></div></div></section>`);
      if (showMenu.value) {
        _push(`<div class="sidebar-overlay" data-v-fea0be03></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<aside class="${ssrRenderClass([{ show: showMenu.value }, "chapters-sidebar"])}" data-v-fea0be03><div class="sidebar-header" data-v-fea0be03><h3 data-v-fea0be03>章节目录</h3><button class="close-btn" data-v-fea0be03>×</button></div><div class="sidebar-content" data-v-fea0be03><!--[-->`);
      ssrRenderList(chapters.value, (chapter) => {
        _push(`<div class="${ssrRenderClass([{ active: chapter.id === chapterData.value.id }, "sidebar-chapter"])}" data-v-fea0be03><span class="chapter-num" data-v-fea0be03>${ssrInterpolate(chapter.sortOrder)}</span><span class="chapter-name" data-v-fea0be03>${ssrInterpolate(chapter.chapterTitle)}</span></div>`);
      });
      _push(`<!--]--></div></aside><main class="chapter-content" data-v-fea0be03><div class="container" data-v-fea0be03><article class="content-article" data-v-fea0be03><h1 class="chapter-title" data-v-fea0be03>${ssrInterpolate(chapterData.value.chapterTitle)}</h1><div class="chapter-meta" data-v-fea0be03><span class="meta-item" data-v-fea0be03>起始页：${ssrInterpolate(chapterData.value.startPage)}</span><span class="meta-item" data-v-fea0be03>页数：${ssrInterpolate(chapterData.value.pageCount)}</span></div><div class="content-body" data-v-fea0be03>${chapterData.value.content ?? ""}</div></article></div></main><section class="chapter-nav" data-v-fea0be03><div class="container" data-v-fea0be03><div class="nav-buttons" data-v-fea0be03><button class="nav-btn prev-btn"${ssrIncludeBooleanAttr(!prevChapter.value) ? " disabled" : ""} data-v-fea0be03><span class="nav-icon" data-v-fea0be03>←</span><span class="nav-text" data-v-fea0be03>上一章</span></button><button class="nav-btn toc-btn" data-v-fea0be03><span class="nav-icon" data-v-fea0be03>☰</span><span class="nav-text" data-v-fea0be03>目录</span></button><button class="nav-btn next-btn"${ssrIncludeBooleanAttr(!nextChapter.value) ? " disabled" : ""} data-v-fea0be03><span class="nav-text" data-v-fea0be03>下一章</span><span class="nav-icon" data-v-fea0be03>→</span></button></div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/books/[id]/chapter/[chapterId].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _chapterId_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fea0be03"]]);
export {
  _chapterId_ as default
};
//# sourceMappingURL=_chapterId_-C5v8YAXB.js.map
