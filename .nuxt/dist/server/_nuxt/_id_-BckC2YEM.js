import { defineComponent, ref, reactive, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderStyle, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { useRouter } from "vue-router";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const activeTab = ref("intro");
    const progress = ref(1);
    const currentChapter = ref(0);
    const video = reactive({
      title: "实用针灸推拿学",
      fullTitle: "实用针灸推拿学-足太阳膀胱：膀胱俞",
      cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20acupuncture%20massage%20video%20cover%20traditional%20style&image_size=landscape_16_9",
      views: 435678,
      likes: 43,
      intro: "南京中医药大学朱世鹏副教授讲授-足太阳膀胱：膀胱俞",
      chapters: [
        { title: "足太阳膀胱-膀胱俞穴", duration: "02:00" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "video-detail-page" }, _attrs))} data-v-99221fc8><section class="page-banner" data-v-99221fc8><div class="container" data-v-99221fc8><h1 class="banner-title" data-v-99221fc8>视频课程</h1><p class="banner-desc" data-v-99221fc8>名师授课，随时随地学习中医知识</p></div></section><div class="breadcrumb-section" data-v-99221fc8><div class="container" data-v-99221fc8><div class="breadcrumb" data-v-99221fc8><span class="breadcrumb-item" data-v-99221fc8>首页</span><span class="breadcrumb-separator" data-v-99221fc8>&gt;</span><span class="breadcrumb-item" data-v-99221fc8>视频</span><span class="breadcrumb-separator" data-v-99221fc8>&gt;</span><span class="breadcrumb-item active" data-v-99221fc8>${ssrInterpolate(video.title)}</span></div></div></div><section class="video-content-section" data-v-99221fc8><div class="container" data-v-99221fc8><div class="video-player-wrapper" data-v-99221fc8><div class="video-player" data-v-99221fc8><img${ssrRenderAttr("src", video.cover)}${ssrRenderAttr("alt", video.title)} class="video-poster" data-v-99221fc8><div class="video-controls" data-v-99221fc8><button class="play-button" data-v-99221fc8>▶</button><div class="progress-bar" data-v-99221fc8><div class="progress-fill" style="${ssrRenderStyle({ width: progress.value + "%" })}" data-v-99221fc8></div><div class="progress-dot" style="${ssrRenderStyle({ left: progress.value + "%" })}" data-v-99221fc8></div></div><span class="time-display" data-v-99221fc8>00:02 / 02:00</span><button class="volume-button" data-v-99221fc8>🔊</button><button class="fullscreen-button" data-v-99221fc8>⛶</button></div></div></div><div class="tab-container" data-v-99221fc8><div class="tabs" data-v-99221fc8><button class="${ssrRenderClass([{ active: activeTab.value === "intro" }, "tab"])}" data-v-99221fc8> 简介 </button><button class="${ssrRenderClass([{ active: activeTab.value === "catalog" }, "tab"])}" data-v-99221fc8> 目录 </button></div>`);
      if (activeTab.value === "intro") {
        _push(`<div class="tab-content intro-content" data-v-99221fc8><h2 class="content-title" data-v-99221fc8>${ssrInterpolate(video.fullTitle)}</h2><div class="video-meta" data-v-99221fc8><span class="meta-item" data-v-99221fc8>👁️ ${ssrInterpolate(video.views)}</span><span class="meta-item" data-v-99221fc8>⭐ ${ssrInterpolate(video.likes)}</span></div><div class="intro-section" data-v-99221fc8><h3 class="section-title" data-v-99221fc8>视频介绍</h3><p class="intro-text" data-v-99221fc8>${ssrInterpolate(video.intro)}</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "catalog") {
        _push(`<div class="tab-content catalog-content" data-v-99221fc8><!--[-->`);
        ssrRenderList(video.chapters, (item, index) => {
          _push(`<div class="${ssrRenderClass([{ active: currentChapter.value === index }, "chapter-item"])}" data-v-99221fc8><span class="chapter-title" data-v-99221fc8>${ssrInterpolate(item.title)}</span><span class="chapter-duration" data-v-99221fc8>${ssrInterpolate(item.duration)}</span></div>`);
        });
        _push(`<!--]--></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/video/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-99221fc8"]]);
export {
  _id_ as default
};
//# sourceMappingURL=_id_-BckC2YEM.js.map
