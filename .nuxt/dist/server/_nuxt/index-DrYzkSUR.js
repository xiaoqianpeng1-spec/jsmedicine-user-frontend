import { defineComponent, ref, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
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
    const topics = ref([]);
    const keyword = ref("");
    const currentPage = ref(1);
    const pageSize = ref(8);
    const total = ref(0);
    const totalPages = computed(() => {
      return Math.ceil(total.value / pageSize.value);
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "topics-page" }, _attrs))} data-v-c91886f5><section class="page-banner" data-v-c91886f5><div class="container" data-v-c91886f5><h1 class="banner-title" data-v-c91886f5>专题中心</h1><p class="banner-desc" data-v-c91886f5>精选专题，深入学习中医知识体系</p></div></section><div class="breadcrumb-section" data-v-c91886f5><div class="container" data-v-c91886f5><div class="breadcrumb" data-v-c91886f5><span class="breadcrumb-item" data-v-c91886f5>首页</span><span class="breadcrumb-separator" data-v-c91886f5>&gt;</span><span class="breadcrumb-item active" data-v-c91886f5>专题</span></div></div></div><section class="search-section" data-v-c91886f5><div class="container" data-v-c91886f5><div class="search-box" data-v-c91886f5><input type="text"${ssrRenderAttr("value", keyword.value)} placeholder="搜索专题名称..." class="search-input" data-v-c91886f5><button class="search-btn" data-v-c91886f5> 搜索 </button></div></div></section><section class="topics-section" data-v-c91886f5><div class="container" data-v-c91886f5><div class="topics-grid" data-v-c91886f5><!--[-->`);
      ssrRenderList(topics.value, (topic) => {
        _push(`<div class="topic-card" data-v-c91886f5><div class="topic-image" data-v-c91886f5><img${ssrRenderAttr("src", topic.coverUrl)}${ssrRenderAttr("alt", topic.title)} data-v-c91886f5></div><div class="topic-info" data-v-c91886f5><h3 class="topic-title" data-v-c91886f5>${ssrInterpolate(topic.title)}</h3><p class="topic-summary" data-v-c91886f5>${ssrInterpolate(topic.summary)}</p><div class="topic-meta" data-v-c91886f5><span class="topic-date" data-v-c91886f5>${ssrInterpolate(formatDate(topic.publishedAt))}</span><div class="topic-stats" data-v-c91886f5><span class="stat-views" data-v-c91886f5>👁️ ${ssrInterpolate(topic.viewCount)}</span><span class="stat-favorites" data-v-c91886f5>❤️ ${ssrInterpolate(topic.favoriteCount)}</span></div></div></div></div>`);
      });
      _push(`<!--]--></div>`);
      if (topics.value.length === 0) {
        _push(`<div class="empty-state" data-v-c91886f5><p data-v-c91886f5>暂无专题</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section>`);
      if (total.value > pageSize.value) {
        _push(`<section class="pagination-section" data-v-c91886f5><div class="container" data-v-c91886f5><div class="pagination" data-v-c91886f5><button class="page-btn"${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} data-v-c91886f5> 上一页 </button><span class="page-info" data-v-c91886f5> 第 ${ssrInterpolate(currentPage.value)} / ${ssrInterpolate(totalPages.value)} 页 </span><button class="page-btn"${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} data-v-c91886f5> 下一页 </button></div></div></section>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/topics/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c91886f5"]]);
export {
  index as default
};
//# sourceMappingURL=index-DrYzkSUR.js.map
