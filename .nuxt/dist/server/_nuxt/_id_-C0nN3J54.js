import { defineComponent, ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
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
    const topicData = ref({
      id: 0,
      title: "",
      summary: "",
      learningRequirements: "",
      coverUrl: "",
      viewCount: 0,
      publishedAt: "",
      favoriteCount: 0,
      favorited: false,
      items: []
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
    const getResourceIcon = (itemType) => {
      const iconMap = {
        "video": "🎬",
        "audio": "🎵",
        "book": "📖",
        "article": "📄",
        "exam": "📝",
        "default": "📎"
      };
      return iconMap[itemType] || iconMap["default"];
    };
    const getResourceTypeName = (itemType) => {
      const typeMap = {
        "video": "视频课程",
        "audio": "音频课程",
        "book": "图书",
        "article": "文章",
        "exam": "考试",
        "default": "资源"
      };
      return typeMap[itemType] || typeMap["default"];
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "topic-detail-page" }, _attrs))} data-v-10a190fa><section class="page-banner" data-v-10a190fa><div class="container" data-v-10a190fa><h1 class="banner-title" data-v-10a190fa>专题中心</h1><p class="banner-desc" data-v-10a190fa>精选专题，深入学习中医知识体系</p></div></section><div class="breadcrumb-section" data-v-10a190fa><div class="container" data-v-10a190fa><div class="breadcrumb" data-v-10a190fa><span class="breadcrumb-item" data-v-10a190fa>首页</span><span class="breadcrumb-separator" data-v-10a190fa>&gt;</span><span class="breadcrumb-item" data-v-10a190fa>专题</span><span class="breadcrumb-separator" data-v-10a190fa>&gt;</span><span class="breadcrumb-item active" data-v-10a190fa>${ssrInterpolate(topicData.value.title || "专题详情")}</span></div></div></div><section class="topic-header-section" data-v-10a190fa><div class="container" data-v-10a190fa><div class="topic-header" data-v-10a190fa><span class="topic-tag" data-v-10a190fa>专题详情</span><h1 class="topic-title" data-v-10a190fa>${ssrInterpolate(topicData.value.title)}</h1></div></div></section><section class="topic-desc-section" data-v-10a190fa><div class="container" data-v-10a190fa><div class="topic-description" data-v-10a190fa><p data-v-10a190fa>${ssrInterpolate(topicData.value.summary)}</p></div>`);
      if (topicData.value.learningRequirements) {
        _push(`<div class="learning-requirements" data-v-10a190fa><div class="requirement-header" data-v-10a190fa><span class="requirement-icon" data-v-10a190fa>📋</span><span class="requirement-title" data-v-10a190fa>学习要求</span></div><div class="requirement-content" data-v-10a190fa><p data-v-10a190fa>${ssrInterpolate(topicData.value.learningRequirements)}</p></div><button class="start-learning-btn" data-v-10a190fa> 开始学习 </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="topic-stats" data-v-10a190fa><div class="stat-item" data-v-10a190fa><span class="stat-value" data-v-10a190fa>${ssrInterpolate(topicData.value.viewCount)}</span><span class="stat-label" data-v-10a190fa>浏览量</span></div><div class="stat-item" data-v-10a190fa><span class="stat-value" data-v-10a190fa>${ssrInterpolate(topicData.value.favoriteCount)}</span><span class="stat-label" data-v-10a190fa>收藏数</span></div><div class="stat-item" data-v-10a190fa><span class="stat-value" data-v-10a190fa>${ssrInterpolate(formatDate(topicData.value.publishedAt))}</span><span class="stat-label" data-v-10a190fa>发布时间</span></div><button class="${ssrRenderClass([{ active: topicData.value.favorited }, "favorite-btn"])}" data-v-10a190fa>${ssrInterpolate(topicData.value.favorited ? "❤️ 已收藏" : "🤍 收藏")}</button></div></div></section><section class="resources-section" data-v-10a190fa><div class="container" data-v-10a190fa><div class="section-header" data-v-10a190fa><h2 class="section-title" data-v-10a190fa>📚 专题资源</h2><span class="resource-count" data-v-10a190fa>共 ${ssrInterpolate(topicData.value.items.length)} 个资源</span></div><div class="resources-list" data-v-10a190fa><!--[-->`);
      ssrRenderList(topicData.value.items, (item, index) => {
        _push(`<div class="resource-item" data-v-10a190fa><div class="resource-number" data-v-10a190fa>${ssrInterpolate(index + 1)}</div><div class="resource-icon" data-v-10a190fa>${ssrInterpolate(getResourceIcon(item.itemType))}</div><div class="resource-info" data-v-10a190fa><h3 class="resource-title" data-v-10a190fa>${ssrInterpolate(item.resource?.title || item.resource?.bookName || item.resource?.name || "资源 " + item.itemId)}</h3><p class="resource-type" data-v-10a190fa>${ssrInterpolate(getResourceTypeName(item.itemType))}</p></div><div class="resource-arrow" data-v-10a190fa>→</div></div>`);
      });
      _push(`<!--]-->`);
      if (topicData.value.items.length === 0) {
        _push(`<div class="empty-state" data-v-10a190fa><p data-v-10a190fa>暂无资源</p></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/topics/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-10a190fa"]]);
export {
  _id_ as default
};
//# sourceMappingURL=_id_-C0nN3J54.js.map
