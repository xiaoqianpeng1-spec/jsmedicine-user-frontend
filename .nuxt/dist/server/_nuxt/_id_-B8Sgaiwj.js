import { defineComponent, ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderStyle, ssrRenderList } from "vue/server-renderer";
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
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    useRoute();
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
        return `${hours}小时${minutes}分钟`;
      }
      return `${minutes}分钟`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "book-detail-page" }, _attrs))} data-v-4e0e7718><section class="detail-header" data-v-4e0e7718><div class="container" data-v-4e0e7718><button class="back-btn" data-v-4e0e7718><span data-v-4e0e7718>←</span> 返回 </button></div></section><section class="book-info-section" data-v-4e0e7718><div class="container" data-v-4e0e7718><div class="book-info-card" data-v-4e0e7718><div class="book-cover-wrapper" data-v-4e0e7718><img${ssrRenderAttr("src", bookData.value.coverUrl)}${ssrRenderAttr("alt", bookData.value.bookName)} class="book-cover-large" data-v-4e0e7718></div><div class="book-details" data-v-4e0e7718><h1 class="book-title" data-v-4e0e7718>${ssrInterpolate(bookData.value.bookName)}</h1><p class="book-author" data-v-4e0e7718>作者：${ssrInterpolate(bookData.value.author)}</p><p class="book-publisher" data-v-4e0e7718>出版社：${ssrInterpolate(bookData.value.publisher)}</p><p class="book-publish-date" data-v-4e0e7718>出版日期：${ssrInterpolate(formatDate(bookData.value.publishedAt))}</p><div class="book-stats" data-v-4e0e7718><div class="stat-item" data-v-4e0e7718><span class="stat-value" data-v-4e0e7718>${ssrInterpolate(bookData.value.totalPages)}</span><span class="stat-label" data-v-4e0e7718>页数</span></div><div class="stat-item" data-v-4e0e7718><span class="stat-value" data-v-4e0e7718>${ssrInterpolate(bookData.value.browseCount)}</span><span class="stat-label" data-v-4e0e7718>浏览量</span></div><div class="stat-item" data-v-4e0e7718><span class="stat-value" data-v-4e0e7718>${ssrInterpolate(bookData.value.favoriteCount)}</span><span class="stat-label" data-v-4e0e7718>收藏数</span></div></div><div class="book-intro" data-v-4e0e7718><h3 data-v-4e0e7718>内容简介</h3><p data-v-4e0e7718>${ssrInterpolate(bookData.value.introduction)}</p></div><div class="action-buttons" data-v-4e0e7718><button class="btn btn-primary" data-v-4e0e7718> 📖 开始阅读 </button><button class="${ssrRenderClass([{ active: bookData.value.favorited }, "btn btn-secondary"])}" data-v-4e0e7718>${ssrInterpolate(bookData.value.favorited ? "❤️ 已收藏" : "🤍 收藏")}</button></div></div></div></div></section>`);
      if (bookData.value.progressPercent > 0) {
        _push(`<section class="progress-section" data-v-4e0e7718><div class="container" data-v-4e0e7718><div class="progress-card" data-v-4e0e7718><div class="progress-header" data-v-4e0e7718><span class="progress-label" data-v-4e0e7718>阅读进度</span><span class="progress-percent" data-v-4e0e7718>${ssrInterpolate(bookData.value.progressPercent)}%</span></div><div class="progress-bar" data-v-4e0e7718><div class="progress-fill" style="${ssrRenderStyle({ width: bookData.value.progressPercent + "%" })}" data-v-4e0e7718></div></div><div class="progress-info" data-v-4e0e7718><span data-v-4e0e7718>已学习 ${ssrInterpolate(formatStudyTime(bookData.value.studySeconds))}</span></div></div></div></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<section class="chapters-section" data-v-4e0e7718><div class="container" data-v-4e0e7718><h2 class="section-title" data-v-4e0e7718>📚 章节目录</h2><div class="chapters-list" data-v-4e0e7718><!--[-->`);
      ssrRenderList(bookData.value.chapters, (chapter) => {
        _push(`<div class="chapter-item" data-v-4e0e7718><span class="chapter-number" data-v-4e0e7718>${ssrInterpolate(chapter.sortOrder)}</span><span class="chapter-title" data-v-4e0e7718>${ssrInterpolate(chapter.chapterTitle)}</span><span class="chapter-pages" data-v-4e0e7718>${ssrInterpolate(chapter.pageCount)}页</span></div>`);
      });
      _push(`<!--]-->`);
      if (bookData.value.chapters.length === 0) {
        _push(`<div class="empty-state" data-v-4e0e7718><p data-v-4e0e7718>暂无章节信息</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/books/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4e0e7718"]]);
export {
  _id_ as default
};
//# sourceMappingURL=_id_-B8Sgaiwj.js.map
