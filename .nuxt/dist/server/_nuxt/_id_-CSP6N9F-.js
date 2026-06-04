import { defineComponent, ref, reactive, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderStyle, ssrRenderList } from "vue/server-renderer";
import { useRouter } from "vue-router";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
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
      title: "实用针灸推拿学",
      fullTitle: "实用针灸推拿学",
      cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20acupuncture%20massage%20audio%20cover%20traditional%20style&image_size=square",
      totalDuration: "13:57",
      views: 435678,
      likes: 43,
      intro: "南京中医药大学朱世鹏副教授讲授实用针灸推拿学课程",
      chapters: [
        { title: "第一章 经络总论", duration: "02:00" },
        { title: "第二章 腧穴总论", duration: "02:00" },
        { title: "第三章 经络腧穴总结(1)", duration: "02:00" },
        { title: "第四章 经络腧穴总结(2)", duration: "02:00" },
        { title: "第五章 经络腧穴总结(3)", duration: "02:00" },
        { title: "第六章 刺灸法总论", duration: "05:57" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "audio-detail-page" }, _attrs))} data-v-4fcadf92><section class="page-banner" data-v-4fcadf92><div class="container" data-v-4fcadf92><h1 class="banner-title" data-v-4fcadf92>音频课程</h1><p class="banner-desc" data-v-4fcadf92>随时随地，听学中医知识</p></div></section><div class="breadcrumb-section" data-v-4fcadf92><div class="container" data-v-4fcadf92><div class="breadcrumb" data-v-4fcadf92><span class="breadcrumb-item" data-v-4fcadf92>首页</span><span class="breadcrumb-separator" data-v-4fcadf92>&gt;</span><span class="breadcrumb-item" data-v-4fcadf92>音频</span><span class="breadcrumb-separator" data-v-4fcadf92>&gt;</span><span class="breadcrumb-item active" data-v-4fcadf92>${ssrInterpolate(audio.title)}</span></div></div></div><section class="audio-content-section" data-v-4fcadf92><div class="container" data-v-4fcadf92><div class="audio-player-wrapper" data-v-4fcadf92><div class="audio-player" data-v-4fcadf92><div class="player-inner" data-v-4fcadf92><div class="album-cover" data-v-4fcadf92><img${ssrRenderAttr("src", audio.cover)}${ssrRenderAttr("alt", audio.title)} data-v-4fcadf92><div class="cover-overlay" data-v-4fcadf92><div class="${ssrRenderClass([{ playing: isPlaying.value }, "disc-rotate"])}" data-v-4fcadf92><div class="disc-center" data-v-4fcadf92></div></div></div></div><div class="player-controls" data-v-4fcadf92><button class="play-button" data-v-4fcadf92>${ssrInterpolate(isPlaying.value ? "⏸" : "▶")}</button><div class="progress-bar" data-v-4fcadf92><div class="progress-fill" style="${ssrRenderStyle({ width: progress.value + "%" })}" data-v-4fcadf92></div><div class="progress-dot" style="${ssrRenderStyle({ left: progress.value + "%" })}" data-v-4fcadf92></div></div><span class="time-display" data-v-4fcadf92>00:00 / ${ssrInterpolate(audio.totalDuration)}</span><button class="volume-button" data-v-4fcadf92>🔊</button></div></div></div></div><div class="tab-container" data-v-4fcadf92><div class="tabs" data-v-4fcadf92><button class="${ssrRenderClass([{ active: activeTab.value === "intro" }, "tab"])}" data-v-4fcadf92> 简介 </button><button class="${ssrRenderClass([{ active: activeTab.value === "catalog" }, "tab"])}" data-v-4fcadf92> 目录 </button></div>`);
      if (activeTab.value === "intro") {
        _push(`<div class="tab-content intro-content" data-v-4fcadf92><h2 class="content-title" data-v-4fcadf92>${ssrInterpolate(audio.fullTitle)}</h2><div class="audio-meta" data-v-4fcadf92><span class="meta-item" data-v-4fcadf92>👁️ ${ssrInterpolate(audio.views)}</span><span class="meta-item" data-v-4fcadf92>⭐ ${ssrInterpolate(audio.likes)}</span></div><div class="intro-section" data-v-4fcadf92><h3 class="section-title" data-v-4fcadf92>音频介绍</h3><p class="intro-text" data-v-4fcadf92>${ssrInterpolate(audio.intro)}</p></div></div>`);
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
export {
  _id_ as default
};
//# sourceMappingURL=_id_-CSP6N9F-.js.map
