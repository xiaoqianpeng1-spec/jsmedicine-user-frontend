import { defineComponent, ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { useRouter, useRoute } from 'vue-router';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[chapterId]",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    useRoute();
    const loading = ref(false);
    const error = ref("");
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
    ref(0);
    ref(null);
    const prevChapter = computed(() => {
      const currentIndex = chapters.value.findIndex((c) => c.id === chapterData.value.id);
      return currentIndex > 0 ? chapters.value[currentIndex - 1] : null;
    });
    const nextChapter = computed(() => {
      const currentIndex = chapters.value.findIndex((c) => c.id === chapterData.value.id);
      return currentIndex < chapters.value.length - 1 ? chapters.value[currentIndex + 1] : null;
    });
    const renderContent = (content) => {
      if (!content) return "";
      let html = content.replace(/\n\n/g, "</p><p>");
      html = "<p>" + html + "</p>";
      html = html.replace(/##\s+(.+)/g, "<h2>$1</h2>");
      html = html.replace(/###\s+(.+)/g, "<h3>$1</h3>");
      html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
      html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
      return html;
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "chapter-detail-page" }, _attrs))} data-v-818d48bc>`);
      if (loading.value) {
        _push(`<div class="loading-state" data-v-818d48bc><div class="spinner" data-v-818d48bc></div><p data-v-818d48bc>\u52A0\u8F7D\u4E2D...</p></div>`);
      } else if (error.value) {
        _push(`<div class="error-state" data-v-818d48bc><p data-v-818d48bc>${ssrInterpolate(error.value)}</p><button class="retry-btn" data-v-818d48bc>\u91CD\u8BD5</button></div>`);
      } else {
        _push(`<!--[--><section class="chapter-header" data-v-818d48bc><div class="container" data-v-818d48bc><div class="header-content" data-v-818d48bc><button class="back-btn" data-v-818d48bc><span data-v-818d48bc>\u2190</span></button><div class="header-title" data-v-818d48bc><h2 class="book-title" data-v-818d48bc>${ssrInterpolate(bookTitle.value)}</h2><p class="chapter-label" data-v-818d48bc>\u7B2C ${ssrInterpolate(chapterData.value.sortOrder)} \u7AE0 \xB7 ${ssrInterpolate(chapterData.value.chapterTitle)}</p></div><button class="menu-btn" data-v-818d48bc> \u2630 </button></div></div></section>`);
        if (showMenu.value) {
          _push(`<div class="sidebar-overlay" data-v-818d48bc></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<aside class="${ssrRenderClass([{ show: showMenu.value }, "chapters-sidebar"])}" data-v-818d48bc><div class="sidebar-header" data-v-818d48bc><h3 data-v-818d48bc>\u7AE0\u8282\u76EE\u5F55</h3><button class="close-btn" data-v-818d48bc>\xD7</button></div><div class="sidebar-content" data-v-818d48bc><!--[-->`);
        ssrRenderList(chapters.value, (chapter) => {
          _push(`<div class="${ssrRenderClass([{ active: chapter.id === chapterData.value.id }, "sidebar-chapter"])}" data-v-818d48bc><span class="chapter-num" data-v-818d48bc>${ssrInterpolate(chapter.sortOrder)}</span><span class="chapter-name" data-v-818d48bc>${ssrInterpolate(chapter.chapterTitle)}</span></div>`);
        });
        _push(`<!--]--></div></aside><main class="chapter-content" data-v-818d48bc><div class="container" data-v-818d48bc><article class="content-article" data-v-818d48bc><h1 class="chapter-title" data-v-818d48bc>${ssrInterpolate(chapterData.value.chapterTitle)}</h1><div class="chapter-meta" data-v-818d48bc><span class="meta-item" data-v-818d48bc>\u8D77\u59CB\u9875\uFF1A${ssrInterpolate(chapterData.value.startPage)}</span><span class="meta-item" data-v-818d48bc>\u9875\u6570\uFF1A${ssrInterpolate(chapterData.value.pageCount)}</span></div><div class="content-body" data-v-818d48bc>${(_a = renderContent(chapterData.value.content)) != null ? _a : ""}</div></article></div></main><section class="chapter-nav" data-v-818d48bc><div class="container" data-v-818d48bc><div class="nav-buttons" data-v-818d48bc><button class="nav-btn prev-btn"${ssrIncludeBooleanAttr(!prevChapter.value) ? " disabled" : ""} data-v-818d48bc><span class="nav-icon" data-v-818d48bc>\u2190</span><span class="nav-text" data-v-818d48bc>\u4E0A\u4E00\u7AE0</span></button><button class="nav-btn toc-btn" data-v-818d48bc><span class="nav-icon" data-v-818d48bc>\u2630</span><span class="nav-text" data-v-818d48bc>\u76EE\u5F55</span></button><button class="nav-btn next-btn"${ssrIncludeBooleanAttr(!nextChapter.value) ? " disabled" : ""} data-v-818d48bc><span class="nav-text" data-v-818d48bc>\u4E0B\u4E00\u7AE0</span><span class="nav-icon" data-v-818d48bc>\u2192</span></button></div></div></section><!--]-->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/books/[id]/chapter/[chapterId].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _chapterId_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-818d48bc"]]);

export { _chapterId_ as default };
//# sourceMappingURL=_chapterId_-CWDwI79N.mjs.map
