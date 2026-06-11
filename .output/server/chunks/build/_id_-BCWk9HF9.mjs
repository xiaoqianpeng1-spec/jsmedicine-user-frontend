import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
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
      tags: [],
      viewCount: 0,
      publishedAt: "",
      favoriteCount: 0,
      favorited: false,
      sections: []
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "topic-detail-page" }, _attrs))} data-v-d981614a><section class="page-banner" data-v-d981614a><div class="container" data-v-d981614a><h1 class="banner-title" data-v-d981614a>\u4E13\u9898\u4E2D\u5FC3</h1><p class="banner-desc" data-v-d981614a>\u7CBE\u9009\u4E13\u9898\uFF0C\u6DF1\u5165\u5B66\u4E60\u4E2D\u533B\u77E5\u8BC6\u4F53\u7CFB</p></div></section><div class="breadcrumb-section" data-v-d981614a><div class="container" data-v-d981614a><div class="breadcrumb" data-v-d981614a><span class="breadcrumb-item" data-v-d981614a>\u9996\u9875</span><span class="breadcrumb-separator" data-v-d981614a>&gt;</span><span class="breadcrumb-item" data-v-d981614a>\u4E13\u9898</span><span class="breadcrumb-separator" data-v-d981614a>&gt;</span><span class="breadcrumb-item active" data-v-d981614a>${ssrInterpolate(topicData.value.title || "\u4E13\u9898\u8BE6\u60C5")}</span></div></div></div><section class="topic-header-section" data-v-d981614a><div class="container" data-v-d981614a><div class="topic-header" data-v-d981614a><span class="topic-tag" data-v-d981614a>\u4E13\u9898\u8BE6\u60C5</span><h1 class="topic-title" data-v-d981614a>${ssrInterpolate(topicData.value.title)}</h1>`);
      if (topicData.value.tags.length > 0) {
        _push(`<div class="topic-tags" data-v-d981614a><!--[-->`);
        ssrRenderList(topicData.value.tags, (tag) => {
          _push(`<span class="topic-tag-item" data-v-d981614a>${ssrInterpolate(tag)}</span>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></section><section class="topic-desc-section" data-v-d981614a><div class="container" data-v-d981614a><div class="topic-description" data-v-d981614a><p data-v-d981614a>${ssrInterpolate(topicData.value.summary)}</p></div>`);
      if (topicData.value.learningRequirements) {
        _push(`<div class="learning-requirements" data-v-d981614a><div class="requirement-header" data-v-d981614a><span class="requirement-icon" data-v-d981614a>\u{1F4CB}</span><span class="requirement-title" data-v-d981614a>\u5B66\u4E60\u8981\u6C42</span></div><div class="requirement-content" data-v-d981614a><p data-v-d981614a>${ssrInterpolate(topicData.value.learningRequirements)}</p></div><button class="start-learning-btn" data-v-d981614a> \u5F00\u59CB\u5B66\u4E60 </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="topic-stats" data-v-d981614a><div class="stat-item" data-v-d981614a><span class="stat-value" data-v-d981614a>${ssrInterpolate(topicData.value.viewCount)}</span><span class="stat-label" data-v-d981614a>\u6D4F\u89C8\u91CF</span></div><div class="stat-item" data-v-d981614a><span class="stat-value" data-v-d981614a>${ssrInterpolate(topicData.value.favoriteCount)}</span><span class="stat-label" data-v-d981614a>\u6536\u85CF\u6570</span></div><div class="stat-item" data-v-d981614a><span class="stat-value" data-v-d981614a>${ssrInterpolate(formatDate(topicData.value.publishedAt))}</span><span class="stat-label" data-v-d981614a>\u53D1\u5E03\u65F6\u95F4</span></div><button class="${ssrRenderClass([{ active: topicData.value.favorited }, "favorite-btn"])}" data-v-d981614a>${ssrInterpolate(topicData.value.favorited ? "\u2764\uFE0F \u5DF2\u6536\u85CF" : "\u{1F90D} \u6536\u85CF")}</button></div></div></section><section class="resources-section" data-v-d981614a><div class="container" data-v-d981614a><!--[-->`);
      ssrRenderList(topicData.value.sections, (section) => {
        _push(`<div class="section-block" data-v-d981614a><div class="section-header" data-v-d981614a><h2 class="section-title" data-v-d981614a>${ssrInterpolate(section.sectionLabel)}</h2><span class="resource-count" data-v-d981614a>\u5171 ${ssrInterpolate(section.total)} \u4E2A\u8D44\u6E90</span></div><div class="resources-grid" data-v-d981614a><!--[-->`);
        ssrRenderList(section.items, (item, index) => {
          _push(`<div class="resource-card" data-v-d981614a><div class="resource-cover" data-v-d981614a><img${ssrRenderAttr("src", item.coverUrl)}${ssrRenderAttr("alt", item.title)} data-v-d981614a><div class="resource-type-badge" data-v-d981614a>${ssrInterpolate(item.resourceTypeLabel)}</div></div><div class="resource-content" data-v-d981614a><h3 class="resource-title" data-v-d981614a>${ssrInterpolate(item.title)}</h3><p class="resource-subtitle" data-v-d981614a>${ssrInterpolate(item.subtitle)}</p><div class="resource-tags" data-v-d981614a><!--[-->`);
          ssrRenderList(item.tags.slice(0, 2), (tag) => {
            _push(`<span class="resource-tag" data-v-d981614a>${ssrInterpolate(tag)}</span>`);
          });
          _push(`<!--]--></div><div class="resource-stats" data-v-d981614a><span class="stat-item" data-v-d981614a>\u{1F441}\uFE0F ${ssrInterpolate(item.browseCount)}</span><span class="stat-item" data-v-d981614a>${ssrInterpolate(item.favorited ? "\u2764\uFE0F" : "\u{1F90D}")} ${ssrInterpolate(item.favoriteCount)}</span>`);
          if (item.progressPercent > 0) {
            _push(`<span class="progress-text" data-v-d981614a>\u8FDB\u5EA6 ${ssrInterpolate(item.progressPercent)}%</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div></div>`);
        });
        _push(`<!--]-->`);
        if (section.items.length === 0) {
          _push(`<div class="empty-state" data-v-d981614a><p data-v-d981614a>\u8BE5\u5206\u533A\u6682\u65E0\u8D44\u6E90</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (section.hasMore) {
          _push(`<button class="load-more-btn" data-v-d981614a> \u67E5\u770B\u66F4\u591A \u2192 </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]-->`);
      if (topicData.value.sections.length === 0) {
        _push(`<div class="empty-state" data-v-d981614a><p data-v-d981614a>\u6682\u65E0\u8D44\u6E90</p></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/topics/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d981614a"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-BCWk9HF9.mjs.map
