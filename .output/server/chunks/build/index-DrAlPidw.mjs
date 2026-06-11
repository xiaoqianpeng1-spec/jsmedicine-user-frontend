import { defineComponent, ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr, ssrRenderClass } from 'vue/server-renderer';
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
    const courses = ref([]);
    const currentPage = ref(1);
    const total = ref(0);
    const searchKeyword = ref("");
    const totalPages = computed(() => Math.ceil(total.value / pageSize));
    const visiblePages = computed(() => {
      const pages = [];
      const total2 = totalPages.value;
      const current = currentPage.value;
      if (total2 <= 5) {
        for (let i = 1; i <= total2; i++) {
          pages.push(i);
        }
      } else {
        if (current <= 3) {
          pages.push(1, 2, 3, 4, 5);
        } else if (current >= total2 - 2) {
          for (let i = total2 - 4; i <= total2; i++) {
            pages.push(i);
          }
        } else {
          for (let i = current - 2; i <= current + 2; i++) {
            pages.push(i);
          }
        }
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "video-page" }, _attrs))} data-v-d2f9d275><section class="page-banner" data-v-d2f9d275><div class="container" data-v-d2f9d275><h1 class="banner-title" data-v-d2f9d275>\u89C6\u9891\u8BFE\u7A0B</h1><p class="banner-desc" data-v-d2f9d275>\u540D\u5E08\u6388\u8BFE\uFF0C\u968F\u65F6\u968F\u5730\u5B66\u4E60\u4E2D\u533B\u77E5\u8BC6</p></div></section><div class="breadcrumb-section" data-v-d2f9d275><div class="container" data-v-d2f9d275><div class="breadcrumb" data-v-d2f9d275><span class="breadcrumb-item" data-v-d2f9d275>\u9996\u9875</span><span class="breadcrumb-separator" data-v-d2f9d275>&gt;</span><span class="breadcrumb-item active" data-v-d2f9d275>\u89C6\u9891</span></div></div></div><section class="video-section" data-v-d2f9d275><div class="container" data-v-d2f9d275><div class="search-box" data-v-d2f9d275><input${ssrRenderAttr("value", searchKeyword.value)} type="text" class="search-input" placeholder="\u641C\u7D22\u8BFE\u7A0B..." data-v-d2f9d275><button class="search-btn" data-v-d2f9d275>\u641C\u7D22</button></div>`);
      if (loading.value) {
        _push(`<div class="loading-state" data-v-d2f9d275><div class="spinner" data-v-d2f9d275></div><p data-v-d2f9d275>\u52A0\u8F7D\u4E2D...</p></div>`);
      } else if (error.value) {
        _push(`<div class="error-state" data-v-d2f9d275><p data-v-d2f9d275>${ssrInterpolate(error.value)}</p><button class="retry-btn" data-v-d2f9d275>\u91CD\u8BD5</button></div>`);
      } else {
        _push(`<div class="video-grid" data-v-d2f9d275><!--[-->`);
        ssrRenderList(courses.value, (video) => {
          _push(`<div class="video-card" data-v-d2f9d275><div class="video-thumbnail" data-v-d2f9d275><img${ssrRenderAttr("src", video.coverUrl)}${ssrRenderAttr("alt", video.courseName)} data-v-d2f9d275><div class="video-play-overlay" data-v-d2f9d275><span class="play-btn" data-v-d2f9d275>\u25B6</span></div>`);
          if (video.progressPercent > 0) {
            _push(`<div class="progress-badge" data-v-d2f9d275>${ssrInterpolate(video.progressPercent)}% </div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><h3 class="video-title" data-v-d2f9d275>${ssrInterpolate(video.courseName)}</h3><p class="video-subtitle" data-v-d2f9d275>${ssrInterpolate(video.subtitle)}</p><p class="video-lecturer" data-v-d2f9d275>\u8BB2\u5E08\uFF1A${ssrInterpolate(video.lecturerName)}</p><div class="video-stats" data-v-d2f9d275><span class="stat-views" data-v-d2f9d275>\u{1F441}\uFE0F ${ssrInterpolate(formatNumber(video.browseCount))}</span><span class="stat-likes" data-v-d2f9d275>\u2B50 ${ssrInterpolate(formatNumber(video.favoriteCount))}</span></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      if (!loading.value && !error.value && totalPages.value > 1) {
        _push(`<div class="pagination" data-v-d2f9d275><button class="page-btn prev"${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} data-v-d2f9d275> \u2039 </button><!--[-->`);
        ssrRenderList(visiblePages.value, (page) => {
          _push(`<button class="${ssrRenderClass([{ active: currentPage.value === page }, "page-btn"])}" data-v-d2f9d275>${ssrInterpolate(page)}</button>`);
        });
        _push(`<!--]--><button class="page-btn next"${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} data-v-d2f9d275> \u203A </button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!loading.value && !error.value && courses.value.length === 0) {
        _push(`<div class="empty-state" data-v-d2f9d275><p data-v-d2f9d275>\u6682\u65E0\u8BFE\u7A0B</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/video/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d2f9d275"]]);

export { index as default };
//# sourceMappingURL=index-DrAlPidw.mjs.map
