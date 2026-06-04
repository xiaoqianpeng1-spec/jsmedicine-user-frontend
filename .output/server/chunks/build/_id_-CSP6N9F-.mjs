import { defineComponent, ref, reactive, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderStyle, ssrRenderList } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const activeTab = ref("intro");
    const progress = ref(0);
    const currentChapter = ref(0);
    const isPlaying = ref(false);
    const audio = reactive({
      title: "\u5B9E\u7528\u9488\u7078\u63A8\u62FF\u5B66",
      fullTitle: "\u5B9E\u7528\u9488\u7078\u63A8\u62FF\u5B66",
      cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20acupuncture%20massage%20audio%20cover%20traditional%20style&image_size=square",
      totalDuration: "13:57",
      views: 435678,
      likes: 43,
      intro: "\u5357\u4EAC\u4E2D\u533B\u836F\u5927\u5B66\u6731\u4E16\u9E4F\u526F\u6559\u6388\u8BB2\u6388\u5B9E\u7528\u9488\u7078\u63A8\u62FF\u5B66\u8BFE\u7A0B",
      chapters: [
        { title: "\u7B2C\u4E00\u7AE0 \u7ECF\u7EDC\u603B\u8BBA", duration: "02:00" },
        { title: "\u7B2C\u4E8C\u7AE0 \u8167\u7A74\u603B\u8BBA", duration: "02:00" },
        { title: "\u7B2C\u4E09\u7AE0 \u7ECF\u7EDC\u8167\u7A74\u603B\u7ED3(1)", duration: "02:00" },
        { title: "\u7B2C\u56DB\u7AE0 \u7ECF\u7EDC\u8167\u7A74\u603B\u7ED3(2)", duration: "02:00" },
        { title: "\u7B2C\u4E94\u7AE0 \u7ECF\u7EDC\u8167\u7A74\u603B\u7ED3(3)", duration: "02:00" },
        { title: "\u7B2C\u516D\u7AE0 \u523A\u7078\u6CD5\u603B\u8BBA", duration: "05:57" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "audio-detail-page" }, _attrs))} data-v-4fcadf92><section class="page-banner" data-v-4fcadf92><div class="container" data-v-4fcadf92><h1 class="banner-title" data-v-4fcadf92>\u97F3\u9891\u8BFE\u7A0B</h1><p class="banner-desc" data-v-4fcadf92>\u968F\u65F6\u968F\u5730\uFF0C\u542C\u5B66\u4E2D\u533B\u77E5\u8BC6</p></div></section><div class="breadcrumb-section" data-v-4fcadf92><div class="container" data-v-4fcadf92><div class="breadcrumb" data-v-4fcadf92><span class="breadcrumb-item" data-v-4fcadf92>\u9996\u9875</span><span class="breadcrumb-separator" data-v-4fcadf92>&gt;</span><span class="breadcrumb-item" data-v-4fcadf92>\u97F3\u9891</span><span class="breadcrumb-separator" data-v-4fcadf92>&gt;</span><span class="breadcrumb-item active" data-v-4fcadf92>${ssrInterpolate(audio.title)}</span></div></div></div><section class="audio-content-section" data-v-4fcadf92><div class="container" data-v-4fcadf92><div class="audio-player-wrapper" data-v-4fcadf92><div class="audio-player" data-v-4fcadf92><div class="player-inner" data-v-4fcadf92><div class="album-cover" data-v-4fcadf92><img${ssrRenderAttr("src", audio.cover)}${ssrRenderAttr("alt", audio.title)} data-v-4fcadf92><div class="cover-overlay" data-v-4fcadf92><div class="${ssrRenderClass([{ playing: isPlaying.value }, "disc-rotate"])}" data-v-4fcadf92><div class="disc-center" data-v-4fcadf92></div></div></div></div><div class="player-controls" data-v-4fcadf92><button class="play-button" data-v-4fcadf92>${ssrInterpolate(isPlaying.value ? "\u23F8" : "\u25B6")}</button><div class="progress-bar" data-v-4fcadf92><div class="progress-fill" style="${ssrRenderStyle({ width: progress.value + "%" })}" data-v-4fcadf92></div><div class="progress-dot" style="${ssrRenderStyle({ left: progress.value + "%" })}" data-v-4fcadf92></div></div><span class="time-display" data-v-4fcadf92>00:00 / ${ssrInterpolate(audio.totalDuration)}</span><button class="volume-button" data-v-4fcadf92>\u{1F50A}</button></div></div></div></div><div class="tab-container" data-v-4fcadf92><div class="tabs" data-v-4fcadf92><button class="${ssrRenderClass([{ active: activeTab.value === "intro" }, "tab"])}" data-v-4fcadf92> \u7B80\u4ECB </button><button class="${ssrRenderClass([{ active: activeTab.value === "catalog" }, "tab"])}" data-v-4fcadf92> \u76EE\u5F55 </button></div>`);
      if (activeTab.value === "intro") {
        _push(`<div class="tab-content intro-content" data-v-4fcadf92><h2 class="content-title" data-v-4fcadf92>${ssrInterpolate(audio.fullTitle)}</h2><div class="audio-meta" data-v-4fcadf92><span class="meta-item" data-v-4fcadf92>\u{1F441}\uFE0F ${ssrInterpolate(audio.views)}</span><span class="meta-item" data-v-4fcadf92>\u2B50 ${ssrInterpolate(audio.likes)}</span></div><div class="intro-section" data-v-4fcadf92><h3 class="section-title" data-v-4fcadf92>\u97F3\u9891\u4ECB\u7ECD</h3><p class="intro-text" data-v-4fcadf92>${ssrInterpolate(audio.intro)}</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "catalog") {
        _push(`<div class="tab-content catalog-content" data-v-4fcadf92><!--[-->`);
        ssrRenderList(audio.chapters, (chapter, index) => {
          _push(`<div class="${ssrRenderClass([{ active: currentChapter.value === index }, "chapter-item"])}" data-v-4fcadf92><span class="chapter-title" data-v-4fcadf92>${ssrInterpolate(chapter.title)}</span><span class="chapter-duration" data-v-4fcadf92>${ssrInterpolate(chapter.duration)}</span></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/audio/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4fcadf92"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-CSP6N9F-.mjs.map
