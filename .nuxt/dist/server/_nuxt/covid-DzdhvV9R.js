import { defineComponent, ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { useRouter } from "vue-router";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "covid",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const videos = ref([
      {
        id: 1,
        cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=covid%20medicine%20prevention%20video%20cover%20green%20style&image_size=landscape_4_3",
        title: "新冠肺炎中医药预防方案",
        desc: "中医药预防新冠的基本原则",
        tags: ["新冠"]
      },
      {
        id: 2,
        cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=covid%20TCM%20treatment%20video%20cover%20green%20style&image_size=landscape_4_3",
        title: "新冠肺炎中医诊疗方案",
        desc: "中医辨证论治新冠的方法",
        tags: ["新冠"]
      },
      {
        id: 3,
        cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=TCM%20herbs%20covid%20video%20cover%20green%20style&image_size=landscape_4_3",
        title: "中医药在新冠康复中的应用",
        desc: "新冠患者康复期的中医药调理",
        tags: ["新冠"]
      },
      {
        id: 4,
        cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=TCM%20immune%20covid%20video%20cover%20green%20style&image_size=landscape_4_3",
        title: "中医药提升免疫力",
        desc: "用中医药方法增强身体抵抗力",
        tags: ["新冠"]
      }
    ]);
    const audios = ref([
      {
        id: 1,
        cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=covid%20prevention%20audio%20cover%20gray%20style&image_size=landscape_4_3",
        title: "新冠肺炎防护知识讲座",
        desc: "日常防护中的中医药应用",
        tags: ["新冠"]
      },
      {
        id: 2,
        cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=TCM%20health%20audio%20cover%20gray%20style&image_size=landscape_4_3",
        title: "中医养生与疫情防控",
        desc: "疫情期间的中医养生建议",
        tags: ["新冠"]
      },
      {
        id: 3,
        cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=herbal%20medicine%20audio%20cover%20gray%20style&image_size=landscape_4_3",
        title: "中药在抗疫中的作用",
        desc: "解读中药对抗病毒的机理",
        tags: ["新冠"]
      },
      {
        id: 4,
        cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=TCM%20theory%20audio%20cover%20gray%20style&image_size=landscape_4_3",
        title: "中医经络与免疫调节",
        desc: "经络穴位提升免疫力",
        tags: ["新冠"]
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "topic-detail-page" }, _attrs))} data-v-f8fddfcd><section class="page-banner" data-v-f8fddfcd><div class="container" data-v-f8fddfcd><h1 class="banner-title" data-v-f8fddfcd>专题中心</h1><p class="banner-desc" data-v-f8fddfcd>精选专题，深入学习中医知识体系</p></div></section><div class="breadcrumb-section" data-v-f8fddfcd><div class="container" data-v-f8fddfcd><div class="breadcrumb" data-v-f8fddfcd><span class="breadcrumb-item" data-v-f8fddfcd>首页</span><span class="breadcrumb-separator" data-v-f8fddfcd>&gt;</span><span class="breadcrumb-item" data-v-f8fddfcd>专题</span><span class="breadcrumb-separator" data-v-f8fddfcd>&gt;</span><span class="breadcrumb-item active" data-v-f8fddfcd>新冠肺炎疫情中医药防控专题培训</span></div></div></div><section class="topic-header-section" data-v-f8fddfcd><div class="container" data-v-f8fddfcd><div class="topic-header" data-v-f8fddfcd><span class="topic-tag" data-v-f8fddfcd>学习要求</span><h1 class="topic-title" data-v-f8fddfcd>新冠肺炎疫情中医药防控专题培训</h1></div></div></section><section class="topic-desc-section" data-v-f8fddfcd><div class="container" data-v-f8fddfcd><div class="topic-description" data-v-f8fddfcd><p data-v-f8fddfcd>为有效应对新冠肺炎疫情，充分发挥中医药在疫情防控中的独特优势和作用，开展中医药防控知识专题培训。本专题旨在帮助基层卫生技术人员掌握中医药防控新冠肺炎的基本知识、预防措施和诊疗方案，提高中医药防控能力和水平。</p></div><div class="learning-requirements" data-v-f8fddfcd><div class="requirement-header" data-v-f8fddfcd><span class="requirement-icon" data-v-f8fddfcd>📋</span><span class="requirement-title" data-v-f8fddfcd>学习要求</span></div><div class="requirement-content" data-v-f8fddfcd><p data-v-f8fddfcd>培训周期内学员线上学习不少于32个学时，每个学时45分钟。完成全部课程学习并通过考核后，可获得中医药防控知识培训合格证书。</p></div><button class="start-learning-btn" data-v-f8fddfcd>学习</button></div></div></section><section class="courses-section" data-v-f8fddfcd><div class="container" data-v-f8fddfcd><div class="section-header" data-v-f8fddfcd><div class="section-title-wrapper" data-v-f8fddfcd><span class="section-icon video-icon" data-v-f8fddfcd>▶</span><h2 class="section-title" data-v-f8fddfcd>视频</h2></div><span class="more-link" data-v-f8fddfcd>更多 &gt;</span></div><div class="courses-grid" data-v-f8fddfcd><!--[-->`);
      ssrRenderList(videos.value, (video) => {
        _push(`<div class="course-card" data-v-f8fddfcd><div class="course-cover" data-v-f8fddfcd><img${ssrRenderAttr("src", video.cover)}${ssrRenderAttr("alt", video.title)} data-v-f8fddfcd><div class="play-overlay" data-v-f8fddfcd><span class="play-btn" data-v-f8fddfcd>▶</span></div></div><h3 class="course-title" data-v-f8fddfcd>${ssrInterpolate(video.title)}</h3><p class="course-desc" data-v-f8fddfcd>${ssrInterpolate(video.desc)}</p><div class="course-tags" data-v-f8fddfcd><!--[-->`);
        ssrRenderList(video.tags, (tag, index) => {
          _push(`<span class="course-tag" data-v-f8fddfcd>${ssrInterpolate(tag)}</span>`);
        });
        _push(`<!--]--></div></div>`);
      });
      _push(`<!--]--></div></div></section><section class="courses-section audio-section" data-v-f8fddfcd><div class="container" data-v-f8fddfcd><div class="section-header" data-v-f8fddfcd><div class="section-title-wrapper" data-v-f8fddfcd><span class="section-icon audio-icon" data-v-f8fddfcd>🎵</span><h2 class="section-title" data-v-f8fddfcd>音频</h2></div><span class="more-link" data-v-f8fddfcd>更多 &gt;</span></div><div class="courses-grid" data-v-f8fddfcd><!--[-->`);
      ssrRenderList(audios.value, (audio) => {
        _push(`<div class="course-card" data-v-f8fddfcd><div class="course-cover" data-v-f8fddfcd><img${ssrRenderAttr("src", audio.cover)}${ssrRenderAttr("alt", audio.title)} data-v-f8fddfcd><div class="audio-overlay" data-v-f8fddfcd><span class="audio-btn" data-v-f8fddfcd>🎵</span></div></div><h3 class="course-title" data-v-f8fddfcd>${ssrInterpolate(audio.title)}</h3><p class="course-desc" data-v-f8fddfcd>${ssrInterpolate(audio.desc)}</p><div class="course-tags" data-v-f8fddfcd><!--[-->`);
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
export {
  covid as default
};
//# sourceMappingURL=covid-DzdhvV9R.js.map
