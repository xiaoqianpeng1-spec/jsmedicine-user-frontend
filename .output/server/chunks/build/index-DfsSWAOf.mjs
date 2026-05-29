import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { b as useRouter } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const activeTab = ref("all");
    const filterTabs = [
      { id: "all", name: "\u5168\u90E8" },
      { id: "basic", name: "\u57FA\u7840\u8BFE\u7A0B" },
      { id: "clinical", name: "\u4E34\u5E8A\u6280\u80FD" },
      { id: "specialty", name: "\u4E13\u79D1\u8BFE\u7A0B" }
    ];
    const videos = ref([
      {
        id: 1,
        thumbnail: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20video%20lecture%20classroom&image_size=landscape_16_9",
        title: "\u4E2D\u533B\u57FA\u7840\u7406\u8BBA - \u9634\u9633\u5B66\u8BF4",
        teacher: "\u738B\u6559\u6388",
        duration: "45:30",
        views: 12580,
        date: "2024-01-15"
      },
      {
        id: 2,
        thumbnail: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20acupuncture%20demonstration%20video&image_size=landscape_16_9",
        title: "\u9488\u7078\u5B9E\u64CD\u6559\u5B66 - \u5E38\u7528\u7A74\u4F4D\u7CBE\u8BB2",
        teacher: "\u674E\u533B\u5E08",
        duration: "52:15",
        views: 8960,
        date: "2024-01-14"
      },
      {
        id: 3,
        thumbnail: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20herbs%20preparation%20video&image_size=landscape_16_9",
        title: "\u4E2D\u836F\u70AE\u5236\u6280\u672F\u8BE6\u89E3",
        teacher: "\u5F20\u836F\u5E08",
        duration: "38:45",
        views: 6540,
        date: "2024-01-13"
      },
      {
        id: 4,
        thumbnail: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20diagnosis%20video&image_size=landscape_16_9",
        title: "\u4E2D\u533B\u56DB\u8BCA\u6CD5 - \u671B\u8BCA\u5165\u95E8",
        teacher: "\u9648\u6559\u6388",
        duration: "42:00",
        views: 10320,
        date: "2024-01-12"
      },
      {
        id: 5,
        thumbnail: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20massage%20therapy&image_size=landscape_16_9",
        title: "\u63A8\u62FF\u624B\u6CD5\u6559\u5B66 - \u57FA\u7840\u624B\u6CD5",
        teacher: "\u5218\u533B\u5E08",
        duration: "35:20",
        views: 7890,
        date: "2024-01-11"
      },
      {
        id: 6,
        thumbnail: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20prescription%20video&image_size=landscape_16_9",
        title: "\u65B9\u5242\u5B66 - \u7ECF\u5178\u65B9\u5242\u89E3\u6790",
        teacher: "\u8D75\u6559\u6388",
        duration: "58:30",
        views: 5670,
        date: "2024-01-10"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "video-page" }, _attrs))} data-v-85c6f431><div class="container" data-v-85c6f431><div class="page-header" data-v-85c6f431><h1 class="page-title" data-v-85c6f431>\u89C6\u9891\u8BFE\u7A0B</h1><p class="page-desc" data-v-85c6f431>\u540D\u5E08\u6388\u8BFE\uFF0C\u968F\u65F6\u968F\u5730\u5B66\u4E60\u4E2D\u533B\u77E5\u8BC6</p></div><div class="filter-bar" data-v-85c6f431><div class="filter-tabs" data-v-85c6f431><!--[-->`);
      ssrRenderList(filterTabs, (tab) => {
        _push(`<button class="${ssrRenderClass([{ active: activeTab.value === tab.id }, "filter-tab"])}" data-v-85c6f431>${ssrInterpolate(tab.name)}</button>`);
      });
      _push(`<!--]--></div></div><div class="video-grid" data-v-85c6f431><!--[-->`);
      ssrRenderList(videos.value, (video) => {
        _push(`<div class="video-card" data-v-85c6f431><div class="video-thumbnail" data-v-85c6f431><img${ssrRenderAttr("src", video.thumbnail)}${ssrRenderAttr("alt", video.title)} data-v-85c6f431><div class="video-duration" data-v-85c6f431>${ssrInterpolate(video.duration)}</div><div class="video-play-icon" data-v-85c6f431>\u25B6</div></div><div class="video-info" data-v-85c6f431><h3 class="video-title" data-v-85c6f431>${ssrInterpolate(video.title)}</h3><p class="video-teacher" data-v-85c6f431>${ssrInterpolate(video.teacher)}</p><div class="video-meta" data-v-85c6f431><span class="video-views" data-v-85c6f431>\u{1F441}\uFE0F ${ssrInterpolate(video.views)}</span><span class="video-date" data-v-85c6f431>${ssrInterpolate(video.date)}</span></div></div></div>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/video/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-85c6f431"]]);

export { index as default };
//# sourceMappingURL=index-DfsSWAOf.mjs.map
