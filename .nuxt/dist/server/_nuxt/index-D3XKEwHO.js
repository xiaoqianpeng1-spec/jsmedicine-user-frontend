import { defineComponent, ref, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { useRouter } from "vue-router";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const pageSize = 12;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const currentPage = ref(1);
    const videos = ref([
      {
        id: 1,
        thumbnail: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20video%20cover%20gray%20style%20traditional&image_size=landscape_4_3",
        title: "实用中医理论基础",
        desc: "奇经八脉的功能和分布",
        tag: "中医",
        tagClass: "tag-red",
        views: 435678,
        likes: 43
      },
      {
        id: 2,
        thumbnail: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20video%20cover%20blue%20style%20traditional&image_size=landscape_4_3",
        title: "实用中医方药学",
        desc: "奇经八脉的功能和分布",
        tag: "中医",
        tagClass: "tag-blue",
        views: 435678,
        likes: 43
      },
      {
        id: 3,
        thumbnail: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20video%20cover%20purple%20style%20traditional&image_size=landscape_4_3",
        title: "实用中医药适宜技术",
        desc: "奇经八脉的功能和分布",
        tag: "中医",
        tagClass: "tag-purple",
        views: 435678,
        likes: 43
      },
      {
        id: 4,
        thumbnail: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20video%20cover%20green%20style%20traditional&image_size=landscape_4_3",
        title: "实用针灸推拿学",
        desc: "奇经八脉的功能和分布",
        tag: "中医",
        tagClass: "tag-green",
        views: 435678,
        likes: 43
      },
      {
        id: 5,
        thumbnail: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20video%20cover%20gray%20style%20traditional&image_size=landscape_4_3",
        title: "实用中医理论基础",
        desc: "奇经八脉的功能和分布",
        tag: "中医",
        tagClass: "tag-red",
        views: 435678,
        likes: 43
      },
      {
        id: 6,
        thumbnail: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20video%20cover%20blue%20style%20traditional&image_size=landscape_4_3",
        title: "实用中医方药学",
        desc: "奇经八脉的功能和分布",
        tag: "中医",
        tagClass: "tag-blue",
        views: 435678,
        likes: 43
      },
      {
        id: 7,
        thumbnail: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20video%20cover%20purple%20style%20traditional&image_size=landscape_4_3",
        title: "实用中医药适宜技术",
        desc: "奇经八脉的功能和分布",
        tag: "中医",
        tagClass: "tag-purple",
        views: 435678,
        likes: 43
      },
      {
        id: 8,
        thumbnail: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20video%20cover%20green%20style%20traditional&image_size=landscape_4_3",
        title: "实用针灸推拿学",
        desc: "奇经八脉的功能和分布",
        tag: "中医",
        tagClass: "tag-green",
        views: 435678,
        likes: 43
      },
      {
        id: 9,
        thumbnail: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20video%20cover%20gray%20style%20traditional&image_size=landscape_4_3",
        title: "实用中医理论基础",
        desc: "奇经八脉的功能和分布",
        tag: "中医",
        tagClass: "tag-red",
        views: 435678,
        likes: 43
      },
      {
        id: 10,
        thumbnail: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20video%20cover%20blue%20style%20traditional&image_size=landscape_4_3",
        title: "实用中医方药学",
        desc: "奇经八脉的功能和分布",
        tag: "中医",
        tagClass: "tag-blue",
        views: 435678,
        likes: 43
      },
      {
        id: 11,
        thumbnail: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20video%20cover%20purple%20style%20traditional&image_size=landscape_4_3",
        title: "实用中医药适宜技术",
        desc: "奇经八脉的功能和分布",
        tag: "中医",
        tagClass: "tag-purple",
        views: 435678,
        likes: 43
      },
      {
        id: 12,
        thumbnail: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20video%20cover%20green%20style%20traditional&image_size=landscape_4_3",
        title: "实用针灸推拿学",
        desc: "奇经八脉的功能和分布",
        tag: "中医",
        tagClass: "tag-green",
        views: 435678,
        likes: 43
      }
    ]);
    const totalPages = computed(() => Math.ceil(videos.value.length / pageSize));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "video-page" }, _attrs))} data-v-ee484e75><section class="page-banner" data-v-ee484e75><div class="container" data-v-ee484e75><h1 class="banner-title" data-v-ee484e75>视频课程</h1><p class="banner-desc" data-v-ee484e75>名师授课，随时随地学习中医知识</p></div></section><div class="breadcrumb-section" data-v-ee484e75><div class="container" data-v-ee484e75><div class="breadcrumb" data-v-ee484e75><span class="breadcrumb-item" data-v-ee484e75>首页</span><span class="breadcrumb-separator" data-v-ee484e75>&gt;</span><span class="breadcrumb-item active" data-v-ee484e75>视频</span></div></div></div><section class="video-section" data-v-ee484e75><div class="container" data-v-ee484e75><div class="video-grid" data-v-ee484e75><!--[-->`);
      ssrRenderList(videos.value, (video) => {
        _push(`<div class="video-card" data-v-ee484e75><div class="video-thumbnail" data-v-ee484e75><img${ssrRenderAttr("src", video.thumbnail)}${ssrRenderAttr("alt", video.title)} data-v-ee484e75><div class="video-play-overlay" data-v-ee484e75><span class="play-btn" data-v-ee484e75>▶</span></div></div><h3 class="video-title" data-v-ee484e75>${ssrInterpolate(video.title)}</h3><p class="video-desc" data-v-ee484e75>${ssrInterpolate(video.desc)}</p><div class="video-tags" data-v-ee484e75><span class="${ssrRenderClass([video.tagClass, "video-tag"])}" data-v-ee484e75>${ssrInterpolate(video.tag)}</span></div><div class="video-stats" data-v-ee484e75><span class="stat-views" data-v-ee484e75>👁️ ${ssrInterpolate(video.views)}</span><span class="stat-likes" data-v-ee484e75>⭐ ${ssrInterpolate(video.likes)}</span></div></div>`);
      });
      _push(`<!--]--></div><div class="pagination" data-v-ee484e75><button class="page-btn prev" data-v-ee484e75>‹</button><!--[-->`);
      ssrRenderList(totalPages.value, (page) => {
        _push(`<button class="${ssrRenderClass([{ active: currentPage.value === page }, "page-btn"])}" data-v-ee484e75>${ssrInterpolate(page)}</button>`);
      });
      _push(`<!--]--><button class="page-btn next" data-v-ee484e75>›</button></div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/video/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ee484e75"]]);
export {
  index as default
};
//# sourceMappingURL=index-D3XKEwHO.js.map
