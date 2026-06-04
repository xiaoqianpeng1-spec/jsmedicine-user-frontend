import { defineComponent, ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

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
        title: "\u5B9E\u7528\u4E2D\u533B\u7406\u8BBA\u57FA\u7840",
        desc: "\u5947\u7ECF\u516B\u8109\u7684\u529F\u80FD\u548C\u5206\u5E03",
        tag: "\u4E2D\u533B",
        tagClass: "tag-red",
        views: 435678,
        likes: 43
      },
      {
        id: 2,
        thumbnail: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20video%20cover%20blue%20style%20traditional&image_size=landscape_4_3",
        title: "\u5B9E\u7528\u4E2D\u533B\u65B9\u836F\u5B66",
        desc: "\u5947\u7ECF\u516B\u8109\u7684\u529F\u80FD\u548C\u5206\u5E03",
        tag: "\u4E2D\u533B",
        tagClass: "tag-blue",
        views: 435678,
        likes: 43
      },
      {
        id: 3,
        thumbnail: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20video%20cover%20purple%20style%20traditional&image_size=landscape_4_3",
        title: "\u5B9E\u7528\u4E2D\u533B\u836F\u9002\u5B9C\u6280\u672F",
        desc: "\u5947\u7ECF\u516B\u8109\u7684\u529F\u80FD\u548C\u5206\u5E03",
        tag: "\u4E2D\u533B",
        tagClass: "tag-purple",
        views: 435678,
        likes: 43
      },
      {
        id: 4,
        thumbnail: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20video%20cover%20green%20style%20traditional&image_size=landscape_4_3",
        title: "\u5B9E\u7528\u9488\u7078\u63A8\u62FF\u5B66",
        desc: "\u5947\u7ECF\u516B\u8109\u7684\u529F\u80FD\u548C\u5206\u5E03",
        tag: "\u4E2D\u533B",
        tagClass: "tag-green",
        views: 435678,
        likes: 43
      },
      {
        id: 5,
        thumbnail: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20video%20cover%20gray%20style%20traditional&image_size=landscape_4_3",
        title: "\u5B9E\u7528\u4E2D\u533B\u7406\u8BBA\u57FA\u7840",
        desc: "\u5947\u7ECF\u516B\u8109\u7684\u529F\u80FD\u548C\u5206\u5E03",
        tag: "\u4E2D\u533B",
        tagClass: "tag-red",
        views: 435678,
        likes: 43
      },
      {
        id: 6,
        thumbnail: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20video%20cover%20blue%20style%20traditional&image_size=landscape_4_3",
        title: "\u5B9E\u7528\u4E2D\u533B\u65B9\u836F\u5B66",
        desc: "\u5947\u7ECF\u516B\u8109\u7684\u529F\u80FD\u548C\u5206\u5E03",
        tag: "\u4E2D\u533B",
        tagClass: "tag-blue",
        views: 435678,
        likes: 43
      },
      {
        id: 7,
        thumbnail: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20video%20cover%20purple%20style%20traditional&image_size=landscape_4_3",
        title: "\u5B9E\u7528\u4E2D\u533B\u836F\u9002\u5B9C\u6280\u672F",
        desc: "\u5947\u7ECF\u516B\u8109\u7684\u529F\u80FD\u548C\u5206\u5E03",
        tag: "\u4E2D\u533B",
        tagClass: "tag-purple",
        views: 435678,
        likes: 43
      },
      {
        id: 8,
        thumbnail: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20video%20cover%20green%20style%20traditional&image_size=landscape_4_3",
        title: "\u5B9E\u7528\u9488\u7078\u63A8\u62FF\u5B66",
        desc: "\u5947\u7ECF\u516B\u8109\u7684\u529F\u80FD\u548C\u5206\u5E03",
        tag: "\u4E2D\u533B",
        tagClass: "tag-green",
        views: 435678,
        likes: 43
      },
      {
        id: 9,
        thumbnail: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20video%20cover%20gray%20style%20traditional&image_size=landscape_4_3",
        title: "\u5B9E\u7528\u4E2D\u533B\u7406\u8BBA\u57FA\u7840",
        desc: "\u5947\u7ECF\u516B\u8109\u7684\u529F\u80FD\u548C\u5206\u5E03",
        tag: "\u4E2D\u533B",
        tagClass: "tag-red",
        views: 435678,
        likes: 43
      },
      {
        id: 10,
        thumbnail: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20video%20cover%20blue%20style%20traditional&image_size=landscape_4_3",
        title: "\u5B9E\u7528\u4E2D\u533B\u65B9\u836F\u5B66",
        desc: "\u5947\u7ECF\u516B\u8109\u7684\u529F\u80FD\u548C\u5206\u5E03",
        tag: "\u4E2D\u533B",
        tagClass: "tag-blue",
        views: 435678,
        likes: 43
      },
      {
        id: 11,
        thumbnail: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20video%20cover%20purple%20style%20traditional&image_size=landscape_4_3",
        title: "\u5B9E\u7528\u4E2D\u533B\u836F\u9002\u5B9C\u6280\u672F",
        desc: "\u5947\u7ECF\u516B\u8109\u7684\u529F\u80FD\u548C\u5206\u5E03",
        tag: "\u4E2D\u533B",
        tagClass: "tag-purple",
        views: 435678,
        likes: 43
      },
      {
        id: 12,
        thumbnail: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20video%20cover%20green%20style%20traditional&image_size=landscape_4_3",
        title: "\u5B9E\u7528\u9488\u7078\u63A8\u62FF\u5B66",
        desc: "\u5947\u7ECF\u516B\u8109\u7684\u529F\u80FD\u548C\u5206\u5E03",
        tag: "\u4E2D\u533B",
        tagClass: "tag-green",
        views: 435678,
        likes: 43
      }
    ]);
    const totalPages = computed(() => Math.ceil(videos.value.length / pageSize));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "video-page" }, _attrs))} data-v-ee484e75><section class="page-banner" data-v-ee484e75><div class="container" data-v-ee484e75><h1 class="banner-title" data-v-ee484e75>\u89C6\u9891\u8BFE\u7A0B</h1><p class="banner-desc" data-v-ee484e75>\u540D\u5E08\u6388\u8BFE\uFF0C\u968F\u65F6\u968F\u5730\u5B66\u4E60\u4E2D\u533B\u77E5\u8BC6</p></div></section><div class="breadcrumb-section" data-v-ee484e75><div class="container" data-v-ee484e75><div class="breadcrumb" data-v-ee484e75><span class="breadcrumb-item" data-v-ee484e75>\u9996\u9875</span><span class="breadcrumb-separator" data-v-ee484e75>&gt;</span><span class="breadcrumb-item active" data-v-ee484e75>\u89C6\u9891</span></div></div></div><section class="video-section" data-v-ee484e75><div class="container" data-v-ee484e75><div class="video-grid" data-v-ee484e75><!--[-->`);
      ssrRenderList(videos.value, (video) => {
        _push(`<div class="video-card" data-v-ee484e75><div class="video-thumbnail" data-v-ee484e75><img${ssrRenderAttr("src", video.thumbnail)}${ssrRenderAttr("alt", video.title)} data-v-ee484e75><div class="video-play-overlay" data-v-ee484e75><span class="play-btn" data-v-ee484e75>\u25B6</span></div></div><h3 class="video-title" data-v-ee484e75>${ssrInterpolate(video.title)}</h3><p class="video-desc" data-v-ee484e75>${ssrInterpolate(video.desc)}</p><div class="video-tags" data-v-ee484e75><span class="${ssrRenderClass([video.tagClass, "video-tag"])}" data-v-ee484e75>${ssrInterpolate(video.tag)}</span></div><div class="video-stats" data-v-ee484e75><span class="stat-views" data-v-ee484e75>\u{1F441}\uFE0F ${ssrInterpolate(video.views)}</span><span class="stat-likes" data-v-ee484e75>\u2B50 ${ssrInterpolate(video.likes)}</span></div></div>`);
      });
      _push(`<!--]--></div><div class="pagination" data-v-ee484e75><button class="page-btn prev" data-v-ee484e75>\u2039</button><!--[-->`);
      ssrRenderList(totalPages.value, (page) => {
        _push(`<button class="${ssrRenderClass([{ active: currentPage.value === page }, "page-btn"])}" data-v-ee484e75>${ssrInterpolate(page)}</button>`);
      });
      _push(`<!--]--><button class="page-btn next" data-v-ee484e75>\u203A</button></div></div></section></div>`);
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

export { index as default };
//# sourceMappingURL=index-D3XKEwHO.mjs.map
