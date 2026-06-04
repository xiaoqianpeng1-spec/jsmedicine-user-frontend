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
    const audios = ref([
      {
        id: 1,
        cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20audio%20cover%20gray%20style%20traditional&image_size=landscape_4_3",
        title: "\u5B9E\u7528\u4E2D\u533B\u7406\u8BBA\u57FA\u7840",
        desc: "\u5947\u7ECF\u516B\u8109\u7684\u529F\u80FD\u548C\u5206\u5E03",
        tag: "\u4E2D\u533B",
        tagClass: "tag-red",
        views: 435678,
        likes: 43
      },
      {
        id: 2,
        cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20audio%20cover%20blue%20style%20traditional&image_size=landscape_4_3",
        title: "\u5B9E\u7528\u4E2D\u533B\u65B9\u836F\u5B66",
        desc: "\u5947\u7ECF\u516B\u8109\u7684\u529F\u80FD\u548C\u5206\u5E03",
        tag: "\u4E2D\u533B",
        tagClass: "tag-blue",
        views: 435678,
        likes: 43
      },
      {
        id: 3,
        cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20audio%20cover%20purple%20style%20traditional&image_size=landscape_4_3",
        title: "\u5B9E\u7528\u4E2D\u533B\u836F\u9002\u5B9C\u6280\u672F",
        desc: "\u5947\u7ECF\u516B\u8109\u7684\u529F\u80FD\u548C\u5206\u5E03",
        tag: "\u4E2D\u533B",
        tagClass: "tag-purple",
        views: 435678,
        likes: 43
      },
      {
        id: 4,
        cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20audio%20cover%20green%20style%20traditional&image_size=landscape_4_3",
        title: "\u5B9E\u7528\u9488\u7078\u63A8\u62FF\u5B66",
        desc: "\u5947\u7ECF\u516B\u8109\u7684\u529F\u80FD\u548C\u5206\u5E03",
        tag: "\u4E2D\u533B",
        tagClass: "tag-green",
        views: 435678,
        likes: 43
      },
      {
        id: 5,
        cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20audio%20cover%20gray%20style%20traditional&image_size=landscape_4_3",
        title: "\u5B9E\u7528\u4E2D\u533B\u7406\u8BBA\u57FA\u7840",
        desc: "\u5947\u7ECF\u516B\u8109\u7684\u529F\u80FD\u548C\u5206\u5E03",
        tag: "\u4E2D\u533B",
        tagClass: "tag-red",
        views: 435678,
        likes: 43
      },
      {
        id: 6,
        cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20audio%20cover%20blue%20style%20traditional&image_size=landscape_4_3",
        title: "\u5B9E\u7528\u4E2D\u533B\u65B9\u836F\u5B66",
        desc: "\u5947\u7ECF\u516B\u8109\u7684\u529F\u80FD\u548C\u5206\u5E03",
        tag: "\u4E2D\u533B",
        tagClass: "tag-blue",
        views: 435678,
        likes: 43
      },
      {
        id: 7,
        cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20audio%20cover%20purple%20style%20traditional&image_size=landscape_4_3",
        title: "\u5B9E\u7528\u4E2D\u533B\u836F\u9002\u5B9C\u6280\u672F",
        desc: "\u5947\u7ECF\u516B\u8109\u7684\u529F\u80FD\u548C\u5206\u5E03",
        tag: "\u4E2D\u533B",
        tagClass: "tag-purple",
        views: 435678,
        likes: 43
      },
      {
        id: 8,
        cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20audio%20cover%20green%20style%20traditional&image_size=landscape_4_3",
        title: "\u5B9E\u7528\u9488\u7078\u63A8\u62FF\u5B66",
        desc: "\u5947\u7ECF\u516B\u8109\u7684\u529F\u80FD\u548C\u5206\u5E03",
        tag: "\u4E2D\u533B",
        tagClass: "tag-green",
        views: 435678,
        likes: 43
      },
      {
        id: 9,
        cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20audio%20cover%20gray%20style%20traditional&image_size=landscape_4_3",
        title: "\u5B9E\u7528\u4E2D\u533B\u7406\u8BBA\u57FA\u7840",
        desc: "\u5947\u7ECF\u516B\u8109\u7684\u529F\u80FD\u548C\u5206\u5E03",
        tag: "\u4E2D\u533B",
        tagClass: "tag-red",
        views: 435678,
        likes: 43
      },
      {
        id: 10,
        cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20audio%20cover%20blue%20style%20traditional&image_size=landscape_4_3",
        title: "\u5B9E\u7528\u4E2D\u533B\u65B9\u836F\u5B66",
        desc: "\u5947\u7ECF\u516B\u8109\u7684\u529F\u80FD\u548C\u5206\u5E03",
        tag: "\u4E2D\u533B",
        tagClass: "tag-blue",
        views: 435678,
        likes: 43
      },
      {
        id: 11,
        cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20audio%20cover%20purple%20style%20traditional&image_size=landscape_4_3",
        title: "\u5B9E\u7528\u4E2D\u533B\u836F\u9002\u5B9C\u6280\u672F",
        desc: "\u5947\u7ECF\u516B\u8109\u7684\u529F\u80FD\u548C\u5206\u5E03",
        tag: "\u4E2D\u533B",
        tagClass: "tag-purple",
        views: 435678,
        likes: 43
      },
      {
        id: 12,
        cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20audio%20cover%20green%20style%20traditional&image_size=landscape_4_3",
        title: "\u5B9E\u7528\u9488\u7078\u63A8\u62FF\u5B66",
        desc: "\u5947\u7ECF\u516B\u8109\u7684\u529F\u80FD\u548C\u5206\u5E03",
        tag: "\u4E2D\u533B",
        tagClass: "tag-green",
        views: 435678,
        likes: 43
      }
    ]);
    const totalPages = computed(() => Math.ceil(audios.value.length / pageSize));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "audio-page" }, _attrs))} data-v-a398dd1a><section class="page-banner" data-v-a398dd1a><div class="container" data-v-a398dd1a><h1 class="banner-title" data-v-a398dd1a>\u97F3\u9891\u8BFE\u7A0B</h1><p class="banner-desc" data-v-a398dd1a>\u968F\u65F6\u968F\u5730\uFF0C\u542C\u5B66\u4E2D\u533B\u77E5\u8BC6</p></div></section><div class="breadcrumb-section" data-v-a398dd1a><div class="container" data-v-a398dd1a><div class="breadcrumb" data-v-a398dd1a><span class="breadcrumb-item" data-v-a398dd1a>\u9996\u9875</span><span class="breadcrumb-separator" data-v-a398dd1a>&gt;</span><span class="breadcrumb-item active" data-v-a398dd1a>\u97F3\u9891</span></div></div></div><section class="audio-section" data-v-a398dd1a><div class="container" data-v-a398dd1a><div class="audio-grid" data-v-a398dd1a><!--[-->`);
      ssrRenderList(audios.value, (audio) => {
        _push(`<div class="audio-card" data-v-a398dd1a><div class="audio-cover" data-v-a398dd1a><img${ssrRenderAttr("src", audio.cover)}${ssrRenderAttr("alt", audio.title)} data-v-a398dd1a><div class="audio-play-overlay" data-v-a398dd1a><span class="play-btn" data-v-a398dd1a>\u{1F3B5}</span></div></div><h3 class="audio-title" data-v-a398dd1a>${ssrInterpolate(audio.title)}</h3><p class="audio-desc" data-v-a398dd1a>${ssrInterpolate(audio.desc)}</p><div class="audio-tags" data-v-a398dd1a><span class="${ssrRenderClass([audio.tagClass, "audio-tag"])}" data-v-a398dd1a>${ssrInterpolate(audio.tag)}</span></div><div class="audio-stats" data-v-a398dd1a><span class="stat-views" data-v-a398dd1a>\u{1F441}\uFE0F ${ssrInterpolate(audio.views)}</span><span class="stat-likes" data-v-a398dd1a>\u2B50 ${ssrInterpolate(audio.likes)}</span></div></div>`);
      });
      _push(`<!--]--></div><div class="pagination" data-v-a398dd1a><button class="page-btn prev" data-v-a398dd1a>\u2039</button><!--[-->`);
      ssrRenderList(totalPages.value, (page) => {
        _push(`<button class="${ssrRenderClass([{ active: currentPage.value === page }, "page-btn"])}" data-v-a398dd1a>${ssrInterpolate(page)}</button>`);
      });
      _push(`<!--]--><button class="page-btn next" data-v-a398dd1a>\u203A</button></div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/audio/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a398dd1a"]]);

export { index as default };
//# sourceMappingURL=index-BENP0XAB.mjs.map
