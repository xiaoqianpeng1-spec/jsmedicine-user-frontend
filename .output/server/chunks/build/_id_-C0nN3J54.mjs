import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
import { useRouter, useRoute } from 'vue-router';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

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
        "video": "\u{1F3AC}",
        "audio": "\u{1F3B5}",
        "book": "\u{1F4D6}",
        "article": "\u{1F4C4}",
        "exam": "\u{1F4DD}",
        "default": "\u{1F4CE}"
      };
      return iconMap[itemType] || iconMap["default"];
    };
    const getResourceTypeName = (itemType) => {
      const typeMap = {
        "video": "\u89C6\u9891\u8BFE\u7A0B",
        "audio": "\u97F3\u9891\u8BFE\u7A0B",
        "book": "\u56FE\u4E66",
        "article": "\u6587\u7AE0",
        "exam": "\u8003\u8BD5",
        "default": "\u8D44\u6E90"
      };
      return typeMap[itemType] || typeMap["default"];
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "topic-detail-page" }, _attrs))} data-v-10a190fa><section class="page-banner" data-v-10a190fa><div class="container" data-v-10a190fa><h1 class="banner-title" data-v-10a190fa>\u4E13\u9898\u4E2D\u5FC3</h1><p class="banner-desc" data-v-10a190fa>\u7CBE\u9009\u4E13\u9898\uFF0C\u6DF1\u5165\u5B66\u4E60\u4E2D\u533B\u77E5\u8BC6\u4F53\u7CFB</p></div></section><div class="breadcrumb-section" data-v-10a190fa><div class="container" data-v-10a190fa><div class="breadcrumb" data-v-10a190fa><span class="breadcrumb-item" data-v-10a190fa>\u9996\u9875</span><span class="breadcrumb-separator" data-v-10a190fa>&gt;</span><span class="breadcrumb-item" data-v-10a190fa>\u4E13\u9898</span><span class="breadcrumb-separator" data-v-10a190fa>&gt;</span><span class="breadcrumb-item active" data-v-10a190fa>${ssrInterpolate(topicData.value.title || "\u4E13\u9898\u8BE6\u60C5")}</span></div></div></div><section class="topic-header-section" data-v-10a190fa><div class="container" data-v-10a190fa><div class="topic-header" data-v-10a190fa><span class="topic-tag" data-v-10a190fa>\u4E13\u9898\u8BE6\u60C5</span><h1 class="topic-title" data-v-10a190fa>${ssrInterpolate(topicData.value.title)}</h1></div></div></section><section class="topic-desc-section" data-v-10a190fa><div class="container" data-v-10a190fa><div class="topic-description" data-v-10a190fa><p data-v-10a190fa>${ssrInterpolate(topicData.value.summary)}</p></div>`);
      if (topicData.value.learningRequirements) {
        _push(`<div class="learning-requirements" data-v-10a190fa><div class="requirement-header" data-v-10a190fa><span class="requirement-icon" data-v-10a190fa>\u{1F4CB}</span><span class="requirement-title" data-v-10a190fa>\u5B66\u4E60\u8981\u6C42</span></div><div class="requirement-content" data-v-10a190fa><p data-v-10a190fa>${ssrInterpolate(topicData.value.learningRequirements)}</p></div><button class="start-learning-btn" data-v-10a190fa> \u5F00\u59CB\u5B66\u4E60 </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="topic-stats" data-v-10a190fa><div class="stat-item" data-v-10a190fa><span class="stat-value" data-v-10a190fa>${ssrInterpolate(topicData.value.viewCount)}</span><span class="stat-label" data-v-10a190fa>\u6D4F\u89C8\u91CF</span></div><div class="stat-item" data-v-10a190fa><span class="stat-value" data-v-10a190fa>${ssrInterpolate(topicData.value.favoriteCount)}</span><span class="stat-label" data-v-10a190fa>\u6536\u85CF\u6570</span></div><div class="stat-item" data-v-10a190fa><span class="stat-value" data-v-10a190fa>${ssrInterpolate(formatDate(topicData.value.publishedAt))}</span><span class="stat-label" data-v-10a190fa>\u53D1\u5E03\u65F6\u95F4</span></div><button class="${ssrRenderClass([{ active: topicData.value.favorited }, "favorite-btn"])}" data-v-10a190fa>${ssrInterpolate(topicData.value.favorited ? "\u2764\uFE0F \u5DF2\u6536\u85CF" : "\u{1F90D} \u6536\u85CF")}</button></div></div></section><section class="resources-section" data-v-10a190fa><div class="container" data-v-10a190fa><div class="section-header" data-v-10a190fa><h2 class="section-title" data-v-10a190fa>\u{1F4DA} \u4E13\u9898\u8D44\u6E90</h2><span class="resource-count" data-v-10a190fa>\u5171 ${ssrInterpolate(topicData.value.items.length)} \u4E2A\u8D44\u6E90</span></div><div class="resources-list" data-v-10a190fa><!--[-->`);
      ssrRenderList(topicData.value.items, (item, index) => {
        var _a, _b, _c;
        _push(`<div class="resource-item" data-v-10a190fa><div class="resource-number" data-v-10a190fa>${ssrInterpolate(index + 1)}</div><div class="resource-icon" data-v-10a190fa>${ssrInterpolate(getResourceIcon(item.itemType))}</div><div class="resource-info" data-v-10a190fa><h3 class="resource-title" data-v-10a190fa>${ssrInterpolate(((_a = item.resource) == null ? void 0 : _a.title) || ((_b = item.resource) == null ? void 0 : _b.bookName) || ((_c = item.resource) == null ? void 0 : _c.name) || "\u8D44\u6E90 " + item.itemId)}</h3><p class="resource-type" data-v-10a190fa>${ssrInterpolate(getResourceTypeName(item.itemType))}</p></div><div class="resource-arrow" data-v-10a190fa>\u2192</div></div>`);
      });
      _push(`<!--]-->`);
      if (topicData.value.items.length === 0) {
        _push(`<div class="empty-state" data-v-10a190fa><p data-v-10a190fa>\u6682\u65E0\u8D44\u6E90</p></div>`);
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

export { _id_ as default };
//# sourceMappingURL=_id_-C0nN3J54.mjs.map
