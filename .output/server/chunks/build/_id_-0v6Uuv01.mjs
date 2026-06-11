import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderStyle, ssrRenderList } from 'vue/server-renderer';
import { useRouter, useRoute } from 'vue-router';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    useRoute();
    const loading = ref(false);
    const error = ref("");
    const bookData = ref({
      id: 0,
      categoryId: 0,
      bookName: "",
      author: "",
      publisher: "",
      coverUrl: "",
      introduction: "",
      totalPages: 0,
      paperId: 0,
      publishedAt: "",
      browseCount: 0,
      favoriteCount: 0,
      favorited: false,
      progressPercent: 0,
      studySeconds: 0,
      chapters: []
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
    const formatStudyTime = (seconds) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor(seconds % 3600 / 60);
      if (hours > 0) {
        return `${hours}\u5C0F\u65F6${minutes}\u5206\u949F`;
      }
      return `${minutes}\u5206\u949F`;
    };
    const formatNumber = (num) => {
      if (num >= 1e4) {
        return (num / 1e4).toFixed(1) + "\u4E07";
      }
      return num.toString();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "book-detail-page" }, _attrs))} data-v-fbb773ea>`);
      if (loading.value) {
        _push(`<div class="loading-state" data-v-fbb773ea><div class="spinner" data-v-fbb773ea></div><p data-v-fbb773ea>\u52A0\u8F7D\u4E2D...</p></div>`);
      } else if (error.value) {
        _push(`<div class="error-state" data-v-fbb773ea><p data-v-fbb773ea>${ssrInterpolate(error.value)}</p><button class="retry-btn" data-v-fbb773ea>\u91CD\u8BD5</button></div>`);
      } else {
        _push(`<!--[--><section class="detail-header" data-v-fbb773ea><div class="container" data-v-fbb773ea><button class="back-btn" data-v-fbb773ea><span data-v-fbb773ea>\u2190</span> \u8FD4\u56DE </button></div></section><section class="book-info-section" data-v-fbb773ea><div class="container" data-v-fbb773ea><div class="book-info-card" data-v-fbb773ea><div class="book-cover-wrapper" data-v-fbb773ea><img${ssrRenderAttr("src", bookData.value.coverUrl)}${ssrRenderAttr("alt", bookData.value.bookName)} class="book-cover-large" data-v-fbb773ea>`);
        if (bookData.value.favorited) {
          _push(`<div class="favorite-badge" data-v-fbb773ea>\u2764\uFE0F</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="book-details" data-v-fbb773ea><h1 class="book-title" data-v-fbb773ea>${ssrInterpolate(bookData.value.bookName)}</h1><p class="book-author" data-v-fbb773ea>\u4F5C\u8005\uFF1A${ssrInterpolate(bookData.value.author)}</p><p class="book-publisher" data-v-fbb773ea>\u51FA\u7248\u793E\uFF1A${ssrInterpolate(bookData.value.publisher)}</p><p class="book-publish-date" data-v-fbb773ea>\u51FA\u7248\u65E5\u671F\uFF1A${ssrInterpolate(formatDate(bookData.value.publishedAt))}</p><div class="book-stats" data-v-fbb773ea><div class="stat-item" data-v-fbb773ea><span class="stat-value" data-v-fbb773ea>${ssrInterpolate(bookData.value.totalPages)}</span><span class="stat-label" data-v-fbb773ea>\u9875\u6570</span></div><div class="stat-item" data-v-fbb773ea><span class="stat-value" data-v-fbb773ea>${ssrInterpolate(formatNumber(bookData.value.browseCount))}</span><span class="stat-label" data-v-fbb773ea>\u6D4F\u89C8\u91CF</span></div><div class="stat-item" data-v-fbb773ea><span class="stat-value" data-v-fbb773ea>${ssrInterpolate(formatNumber(bookData.value.favoriteCount))}</span><span class="stat-label" data-v-fbb773ea>\u6536\u85CF\u6570</span></div></div><div class="book-intro" data-v-fbb773ea><h3 data-v-fbb773ea>\u5185\u5BB9\u7B80\u4ECB</h3><p data-v-fbb773ea>${ssrInterpolate(bookData.value.introduction)}</p></div><div class="action-buttons" data-v-fbb773ea><button class="btn btn-primary" data-v-fbb773ea> \u{1F4D6} \u5F00\u59CB\u9605\u8BFB </button><button class="${ssrRenderClass([{ active: bookData.value.favorited }, "btn btn-secondary"])}" data-v-fbb773ea>${ssrInterpolate(bookData.value.favorited ? "\u2764\uFE0F \u5DF2\u6536\u85CF" : "\u{1F90D} \u6536\u85CF")}</button></div></div></div></div></section>`);
        if (bookData.value.progressPercent > 0) {
          _push(`<section class="progress-section" data-v-fbb773ea><div class="container" data-v-fbb773ea><div class="progress-card" data-v-fbb773ea><div class="progress-header" data-v-fbb773ea><span class="progress-label" data-v-fbb773ea>\u9605\u8BFB\u8FDB\u5EA6</span><span class="progress-percent" data-v-fbb773ea>${ssrInterpolate(bookData.value.progressPercent)}%</span></div><div class="progress-bar" data-v-fbb773ea><div class="progress-fill" style="${ssrRenderStyle({ width: bookData.value.progressPercent + "%" })}" data-v-fbb773ea></div></div><div class="progress-info" data-v-fbb773ea><span data-v-fbb773ea>\u5DF2\u5B66\u4E60 ${ssrInterpolate(formatStudyTime(bookData.value.studySeconds))}</span></div></div></div></section>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<section class="chapters-section" data-v-fbb773ea><div class="container" data-v-fbb773ea><div class="section-header" data-v-fbb773ea><h2 class="section-title" data-v-fbb773ea>\u{1F4DA} \u7AE0\u8282\u76EE\u5F55</h2><span class="chapter-count" data-v-fbb773ea>\u5171 ${ssrInterpolate(bookData.value.chapters.length)} \u7AE0</span></div><div class="chapters-list" data-v-fbb773ea><!--[-->`);
        ssrRenderList(bookData.value.chapters, (chapter) => {
          _push(`<div class="chapter-item" data-v-fbb773ea><span class="chapter-number" data-v-fbb773ea>${ssrInterpolate(chapter.sortOrder)}</span><span class="chapter-title" data-v-fbb773ea>${ssrInterpolate(chapter.chapterTitle)}</span><span class="chapter-pages" data-v-fbb773ea>\u7B2C${ssrInterpolate(chapter.startPage)}-${ssrInterpolate(chapter.startPage + chapter.pageCount - 1)}\u9875</span></div>`);
        });
        _push(`<!--]-->`);
        if (bookData.value.chapters.length === 0) {
          _push(`<div class="empty-state" data-v-fbb773ea><p data-v-fbb773ea>\u6682\u65E0\u7AE0\u8282\u4FE1\u606F</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></section><!--]-->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/books/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fbb773ea"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-0v6Uuv01.mjs.map
