import { defineComponent, ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderClass } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const pageSize = 12;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const loading = ref(false);
    const error = ref("");
    const currentPage = ref(1);
    const total = ref(0);
    const podcasts = ref([]);
    const totalPages = computed(() => Math.ceil(total.value / pageSize));
    const displayPages = computed(() => {
      const pages = [];
      const start = Math.max(1, currentPage.value - 2);
      const end = Math.min(totalPages.value, currentPage.value + 2);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    });
    const formatNumber = (num) => {
      if (num >= 1e4) {
        return (num / 1e4).toFixed(1) + "w";
      }
      return num.toString();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "audio-page" }, _attrs))} data-v-36bb60e7><section class="page-banner" data-v-36bb60e7><div class="container" data-v-36bb60e7><h1 class="banner-title" data-v-36bb60e7>\u97F3\u9891\u8BFE\u7A0B</h1><p class="banner-desc" data-v-36bb60e7>\u968F\u65F6\u968F\u5730\uFF0C\u542C\u5B66\u4E2D\u533B\u77E5\u8BC6</p></div></section><div class="breadcrumb-section" data-v-36bb60e7><div class="container" data-v-36bb60e7><div class="breadcrumb" data-v-36bb60e7><span class="breadcrumb-item" data-v-36bb60e7>\u9996\u9875</span><span class="breadcrumb-separator" data-v-36bb60e7>&gt;</span><span class="breadcrumb-item active" data-v-36bb60e7>\u97F3\u9891</span></div></div></div>`);
      if (loading.value) {
        _push(`<div class="loading-state" data-v-36bb60e7><div class="spinner" data-v-36bb60e7></div><p data-v-36bb60e7>\u52A0\u8F7D\u4E2D...</p></div>`);
      } else if (error.value) {
        _push(`<div class="error-state" data-v-36bb60e7>`);
        if (error.value === "\u672A\u6388\u6743\uFF0C\u8BF7\u767B\u5F55") {
          _push(`<div class="login-prompt" data-v-36bb60e7><div class="login-icon" data-v-36bb60e7>\u{1F510}</div><h3 data-v-36bb60e7>\u9700\u8981\u767B\u5F55</h3><p data-v-36bb60e7>\u6536\u542C\u97F3\u9891\u8BFE\u7A0B\u9700\u8981\u5148\u767B\u5F55\u8D26\u53F7</p><button class="login-btn" data-v-36bb60e7>\u7ACB\u5373\u767B\u5F55</button></div>`);
        } else {
          _push(`<div data-v-36bb60e7><p data-v-36bb60e7>${ssrInterpolate(error.value)}</p><button class="retry-btn" data-v-36bb60e7>\u91CD\u8BD5</button></div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<section class="audio-section" data-v-36bb60e7><div class="container" data-v-36bb60e7><div class="audio-grid" data-v-36bb60e7><!--[-->`);
        ssrRenderList(podcasts.value, (podcast) => {
          _push(`<div class="audio-card" data-v-36bb60e7><div class="audio-cover" data-v-36bb60e7><img${ssrRenderAttr("src", podcast.coverUrl || "https://via.placeholder.com/300x200?text=\u97F3\u9891\u5C01\u9762")}${ssrRenderAttr("alt", podcast.title)} data-v-36bb60e7><div class="audio-play-overlay" data-v-36bb60e7><span class="play-btn" data-v-36bb60e7>\u{1F3B5}</span></div></div><h3 class="audio-title" data-v-36bb60e7>${ssrInterpolate(podcast.title)}</h3><p class="audio-desc" data-v-36bb60e7>${ssrInterpolate(podcast.summary)}</p><div class="audio-tags" data-v-36bb60e7><!--[-->`);
          ssrRenderList(podcast.tags, (tag) => {
            _push(`<span class="audio-tag tag-green" data-v-36bb60e7>${ssrInterpolate(tag)}</span>`);
          });
          _push(`<!--]--></div><div class="audio-stats" data-v-36bb60e7><span class="stat-views" data-v-36bb60e7>\u{1F441}\uFE0F ${ssrInterpolate(formatNumber(podcast.browseCount))}</span><span class="stat-likes" data-v-36bb60e7>\u2B50 ${ssrInterpolate(podcast.favoriteCount)}</span></div></div>`);
        });
        _push(`<!--]--></div>`);
        if (totalPages.value > 1) {
          _push(`<div class="pagination" data-v-36bb60e7><button class="page-btn prev"${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} data-v-36bb60e7>\u2039</button><!--[-->`);
          ssrRenderList(displayPages.value, (page) => {
            _push(`<button class="${ssrRenderClass([{ active: currentPage.value === page }, "page-btn"])}" data-v-36bb60e7>${ssrInterpolate(page)}</button>`);
          });
          _push(`<!--]--><button class="page-btn next"${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} data-v-36bb60e7>\u203A</button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></section>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/audio/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-36bb60e7"]]);

export { index as default };
//# sourceMappingURL=index-CFDiWAGd.mjs.map
