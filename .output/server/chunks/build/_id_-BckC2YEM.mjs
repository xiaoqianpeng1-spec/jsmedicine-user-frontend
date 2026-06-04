import { defineComponent, ref, reactive, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderStyle, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const activeTab = ref("intro");
    const progress = ref(1);
    const currentChapter = ref(0);
    const video = reactive({
      title: "\u5B9E\u7528\u9488\u7078\u63A8\u62FF\u5B66",
      fullTitle: "\u5B9E\u7528\u9488\u7078\u63A8\u62FF\u5B66-\u8DB3\u592A\u9633\u8180\u80F1\uFF1A\u8180\u80F1\u4FDE",
      cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20acupuncture%20massage%20video%20cover%20traditional%20style&image_size=landscape_16_9",
      views: 435678,
      likes: 43,
      intro: "\u5357\u4EAC\u4E2D\u533B\u836F\u5927\u5B66\u6731\u4E16\u9E4F\u526F\u6559\u6388\u8BB2\u6388-\u8DB3\u592A\u9633\u8180\u80F1\uFF1A\u8180\u80F1\u4FDE",
      chapters: [
        { title: "\u8DB3\u592A\u9633\u8180\u80F1-\u8180\u80F1\u4FDE\u7A74", duration: "02:00" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "video-detail-page" }, _attrs))} data-v-99221fc8><section class="page-banner" data-v-99221fc8><div class="container" data-v-99221fc8><h1 class="banner-title" data-v-99221fc8>\u89C6\u9891\u8BFE\u7A0B</h1><p class="banner-desc" data-v-99221fc8>\u540D\u5E08\u6388\u8BFE\uFF0C\u968F\u65F6\u968F\u5730\u5B66\u4E60\u4E2D\u533B\u77E5\u8BC6</p></div></section><div class="breadcrumb-section" data-v-99221fc8><div class="container" data-v-99221fc8><div class="breadcrumb" data-v-99221fc8><span class="breadcrumb-item" data-v-99221fc8>\u9996\u9875</span><span class="breadcrumb-separator" data-v-99221fc8>&gt;</span><span class="breadcrumb-item" data-v-99221fc8>\u89C6\u9891</span><span class="breadcrumb-separator" data-v-99221fc8>&gt;</span><span class="breadcrumb-item active" data-v-99221fc8>${ssrInterpolate(video.title)}</span></div></div></div><section class="video-content-section" data-v-99221fc8><div class="container" data-v-99221fc8><div class="video-player-wrapper" data-v-99221fc8><div class="video-player" data-v-99221fc8><img${ssrRenderAttr("src", video.cover)}${ssrRenderAttr("alt", video.title)} class="video-poster" data-v-99221fc8><div class="video-controls" data-v-99221fc8><button class="play-button" data-v-99221fc8>\u25B6</button><div class="progress-bar" data-v-99221fc8><div class="progress-fill" style="${ssrRenderStyle({ width: progress.value + "%" })}" data-v-99221fc8></div><div class="progress-dot" style="${ssrRenderStyle({ left: progress.value + "%" })}" data-v-99221fc8></div></div><span class="time-display" data-v-99221fc8>00:02 / 02:00</span><button class="volume-button" data-v-99221fc8>\u{1F50A}</button><button class="fullscreen-button" data-v-99221fc8>\u26F6</button></div></div></div><div class="tab-container" data-v-99221fc8><div class="tabs" data-v-99221fc8><button class="${ssrRenderClass([{ active: activeTab.value === "intro" }, "tab"])}" data-v-99221fc8> \u7B80\u4ECB </button><button class="${ssrRenderClass([{ active: activeTab.value === "catalog" }, "tab"])}" data-v-99221fc8> \u76EE\u5F55 </button></div>`);
      if (activeTab.value === "intro") {
        _push(`<div class="tab-content intro-content" data-v-99221fc8><h2 class="content-title" data-v-99221fc8>${ssrInterpolate(video.fullTitle)}</h2><div class="video-meta" data-v-99221fc8><span class="meta-item" data-v-99221fc8>\u{1F441}\uFE0F ${ssrInterpolate(video.views)}</span><span class="meta-item" data-v-99221fc8>\u2B50 ${ssrInterpolate(video.likes)}</span></div><div class="intro-section" data-v-99221fc8><h3 class="section-title" data-v-99221fc8>\u89C6\u9891\u4ECB\u7ECD</h3><p class="intro-text" data-v-99221fc8>${ssrInterpolate(video.intro)}</p></div></div>`);
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

export { _id_ as default };
//# sourceMappingURL=_id_-BckC2YEM.mjs.map
