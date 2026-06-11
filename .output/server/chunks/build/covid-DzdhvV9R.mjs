import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "covid",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const videos = ref([
      {
        id: 1,
        cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=covid%20medicine%20prevention%20video%20cover%20green%20style&image_size=landscape_4_3",
        title: "\u65B0\u51A0\u80BA\u708E\u4E2D\u533B\u836F\u9884\u9632\u65B9\u6848",
        desc: "\u4E2D\u533B\u836F\u9884\u9632\u65B0\u51A0\u7684\u57FA\u672C\u539F\u5219",
        tags: ["\u65B0\u51A0"]
      },
      {
        id: 2,
        cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=covid%20TCM%20treatment%20video%20cover%20green%20style&image_size=landscape_4_3",
        title: "\u65B0\u51A0\u80BA\u708E\u4E2D\u533B\u8BCA\u7597\u65B9\u6848",
        desc: "\u4E2D\u533B\u8FA8\u8BC1\u8BBA\u6CBB\u65B0\u51A0\u7684\u65B9\u6CD5",
        tags: ["\u65B0\u51A0"]
      },
      {
        id: 3,
        cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=TCM%20herbs%20covid%20video%20cover%20green%20style&image_size=landscape_4_3",
        title: "\u4E2D\u533B\u836F\u5728\u65B0\u51A0\u5EB7\u590D\u4E2D\u7684\u5E94\u7528",
        desc: "\u65B0\u51A0\u60A3\u8005\u5EB7\u590D\u671F\u7684\u4E2D\u533B\u836F\u8C03\u7406",
        tags: ["\u65B0\u51A0"]
      },
      {
        id: 4,
        cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=TCM%20immune%20covid%20video%20cover%20green%20style&image_size=landscape_4_3",
        title: "\u4E2D\u533B\u836F\u63D0\u5347\u514D\u75AB\u529B",
        desc: "\u7528\u4E2D\u533B\u836F\u65B9\u6CD5\u589E\u5F3A\u8EAB\u4F53\u62B5\u6297\u529B",
        tags: ["\u65B0\u51A0"]
      }
    ]);
    const audios = ref([
      {
        id: 1,
        cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=covid%20prevention%20audio%20cover%20gray%20style&image_size=landscape_4_3",
        title: "\u65B0\u51A0\u80BA\u708E\u9632\u62A4\u77E5\u8BC6\u8BB2\u5EA7",
        desc: "\u65E5\u5E38\u9632\u62A4\u4E2D\u7684\u4E2D\u533B\u836F\u5E94\u7528",
        tags: ["\u65B0\u51A0"]
      },
      {
        id: 2,
        cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=TCM%20health%20audio%20cover%20gray%20style&image_size=landscape_4_3",
        title: "\u4E2D\u533B\u517B\u751F\u4E0E\u75AB\u60C5\u9632\u63A7",
        desc: "\u75AB\u60C5\u671F\u95F4\u7684\u4E2D\u533B\u517B\u751F\u5EFA\u8BAE",
        tags: ["\u65B0\u51A0"]
      },
      {
        id: 3,
        cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=herbal%20medicine%20audio%20cover%20gray%20style&image_size=landscape_4_3",
        title: "\u4E2D\u836F\u5728\u6297\u75AB\u4E2D\u7684\u4F5C\u7528",
        desc: "\u89E3\u8BFB\u4E2D\u836F\u5BF9\u6297\u75C5\u6BD2\u7684\u673A\u7406",
        tags: ["\u65B0\u51A0"]
      },
      {
        id: 4,
        cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=TCM%20theory%20audio%20cover%20gray%20style&image_size=landscape_4_3",
        title: "\u4E2D\u533B\u7ECF\u7EDC\u4E0E\u514D\u75AB\u8C03\u8282",
        desc: "\u7ECF\u7EDC\u7A74\u4F4D\u63D0\u5347\u514D\u75AB\u529B",
        tags: ["\u65B0\u51A0"]
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "topic-detail-page" }, _attrs))} data-v-f8fddfcd><section class="page-banner" data-v-f8fddfcd><div class="container" data-v-f8fddfcd><h1 class="banner-title" data-v-f8fddfcd>\u4E13\u9898\u4E2D\u5FC3</h1><p class="banner-desc" data-v-f8fddfcd>\u7CBE\u9009\u4E13\u9898\uFF0C\u6DF1\u5165\u5B66\u4E60\u4E2D\u533B\u77E5\u8BC6\u4F53\u7CFB</p></div></section><div class="breadcrumb-section" data-v-f8fddfcd><div class="container" data-v-f8fddfcd><div class="breadcrumb" data-v-f8fddfcd><span class="breadcrumb-item" data-v-f8fddfcd>\u9996\u9875</span><span class="breadcrumb-separator" data-v-f8fddfcd>&gt;</span><span class="breadcrumb-item" data-v-f8fddfcd>\u4E13\u9898</span><span class="breadcrumb-separator" data-v-f8fddfcd>&gt;</span><span class="breadcrumb-item active" data-v-f8fddfcd>\u65B0\u51A0\u80BA\u708E\u75AB\u60C5\u4E2D\u533B\u836F\u9632\u63A7\u4E13\u9898\u57F9\u8BAD</span></div></div></div><section class="topic-header-section" data-v-f8fddfcd><div class="container" data-v-f8fddfcd><div class="topic-header" data-v-f8fddfcd><span class="topic-tag" data-v-f8fddfcd>\u5B66\u4E60\u8981\u6C42</span><h1 class="topic-title" data-v-f8fddfcd>\u65B0\u51A0\u80BA\u708E\u75AB\u60C5\u4E2D\u533B\u836F\u9632\u63A7\u4E13\u9898\u57F9\u8BAD</h1></div></div></section><section class="topic-desc-section" data-v-f8fddfcd><div class="container" data-v-f8fddfcd><div class="topic-description" data-v-f8fddfcd><p data-v-f8fddfcd>\u4E3A\u6709\u6548\u5E94\u5BF9\u65B0\u51A0\u80BA\u708E\u75AB\u60C5\uFF0C\u5145\u5206\u53D1\u6325\u4E2D\u533B\u836F\u5728\u75AB\u60C5\u9632\u63A7\u4E2D\u7684\u72EC\u7279\u4F18\u52BF\u548C\u4F5C\u7528\uFF0C\u5F00\u5C55\u4E2D\u533B\u836F\u9632\u63A7\u77E5\u8BC6\u4E13\u9898\u57F9\u8BAD\u3002\u672C\u4E13\u9898\u65E8\u5728\u5E2E\u52A9\u57FA\u5C42\u536B\u751F\u6280\u672F\u4EBA\u5458\u638C\u63E1\u4E2D\u533B\u836F\u9632\u63A7\u65B0\u51A0\u80BA\u708E\u7684\u57FA\u672C\u77E5\u8BC6\u3001\u9884\u9632\u63AA\u65BD\u548C\u8BCA\u7597\u65B9\u6848\uFF0C\u63D0\u9AD8\u4E2D\u533B\u836F\u9632\u63A7\u80FD\u529B\u548C\u6C34\u5E73\u3002</p></div><div class="learning-requirements" data-v-f8fddfcd><div class="requirement-header" data-v-f8fddfcd><span class="requirement-icon" data-v-f8fddfcd>\u{1F4CB}</span><span class="requirement-title" data-v-f8fddfcd>\u5B66\u4E60\u8981\u6C42</span></div><div class="requirement-content" data-v-f8fddfcd><p data-v-f8fddfcd>\u57F9\u8BAD\u5468\u671F\u5185\u5B66\u5458\u7EBF\u4E0A\u5B66\u4E60\u4E0D\u5C11\u4E8E32\u4E2A\u5B66\u65F6\uFF0C\u6BCF\u4E2A\u5B66\u65F645\u5206\u949F\u3002\u5B8C\u6210\u5168\u90E8\u8BFE\u7A0B\u5B66\u4E60\u5E76\u901A\u8FC7\u8003\u6838\u540E\uFF0C\u53EF\u83B7\u5F97\u4E2D\u533B\u836F\u9632\u63A7\u77E5\u8BC6\u57F9\u8BAD\u5408\u683C\u8BC1\u4E66\u3002</p></div><button class="start-learning-btn" data-v-f8fddfcd>\u5B66\u4E60</button></div></div></section><section class="courses-section" data-v-f8fddfcd><div class="container" data-v-f8fddfcd><div class="section-header" data-v-f8fddfcd><div class="section-title-wrapper" data-v-f8fddfcd><span class="section-icon video-icon" data-v-f8fddfcd>\u25B6</span><h2 class="section-title" data-v-f8fddfcd>\u89C6\u9891</h2></div><span class="more-link" data-v-f8fddfcd>\u66F4\u591A &gt;</span></div><div class="courses-grid" data-v-f8fddfcd><!--[-->`);
      ssrRenderList(videos.value, (video) => {
        _push(`<div class="course-card" data-v-f8fddfcd><div class="course-cover" data-v-f8fddfcd><img${ssrRenderAttr("src", video.cover)}${ssrRenderAttr("alt", video.title)} data-v-f8fddfcd><div class="play-overlay" data-v-f8fddfcd><span class="play-btn" data-v-f8fddfcd>\u25B6</span></div></div><h3 class="course-title" data-v-f8fddfcd>${ssrInterpolate(video.title)}</h3><p class="course-desc" data-v-f8fddfcd>${ssrInterpolate(video.desc)}</p><div class="course-tags" data-v-f8fddfcd><!--[-->`);
        ssrRenderList(video.tags, (tag, index) => {
          _push(`<span class="course-tag" data-v-f8fddfcd>${ssrInterpolate(tag)}</span>`);
        });
        _push(`<!--]--></div></div>`);
      });
      _push(`<!--]--></div></div></section><section class="courses-section audio-section" data-v-f8fddfcd><div class="container" data-v-f8fddfcd><div class="section-header" data-v-f8fddfcd><div class="section-title-wrapper" data-v-f8fddfcd><span class="section-icon audio-icon" data-v-f8fddfcd>\u{1F3B5}</span><h2 class="section-title" data-v-f8fddfcd>\u97F3\u9891</h2></div><span class="more-link" data-v-f8fddfcd>\u66F4\u591A &gt;</span></div><div class="courses-grid" data-v-f8fddfcd><!--[-->`);
      ssrRenderList(audios.value, (audio) => {
        _push(`<div class="course-card" data-v-f8fddfcd><div class="course-cover" data-v-f8fddfcd><img${ssrRenderAttr("src", audio.cover)}${ssrRenderAttr("alt", audio.title)} data-v-f8fddfcd><div class="audio-overlay" data-v-f8fddfcd><span class="audio-btn" data-v-f8fddfcd>\u{1F3B5}</span></div></div><h3 class="course-title" data-v-f8fddfcd>${ssrInterpolate(audio.title)}</h3><p class="course-desc" data-v-f8fddfcd>${ssrInterpolate(audio.desc)}</p><div class="course-tags" data-v-f8fddfcd><!--[-->`);
        ssrRenderList(audio.tags, (tag, index) => {
          _push(`<span class="course-tag" data-v-f8fddfcd>${ssrInterpolate(tag)}</span>`);
        });
        _push(`<!--]--></div></div>`);
      });
      _push(`<!--]--></div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/topics/covid.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const covid = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f8fddfcd"]]);

export { covid as default };
//# sourceMappingURL=covid-DzdhvV9R.mjs.map
