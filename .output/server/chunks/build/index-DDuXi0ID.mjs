import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
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
    const topics = ref([
      {
        id: 1,
        image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20traditional%20medicine%20herbs%20green%20theme&image_size=landscape_4_3",
        title: "\u4E2D\u533B\u57FA\u7840\u7406\u8BBA\u7CBE\u8BB2",
        desc: "\u7CFB\u7EDF\u5B66\u4E60\u4E2D\u533B\u57FA\u7840\u7406\u8BBA\uFF0C\u638C\u63E1\u9634\u9633\u4E94\u884C\u3001\u6C14\u8840\u6D25\u6DB2\u7B49\u6838\u5FC3\u6982\u5FF5",
        category: "\u57FA\u7840\u5165\u95E8",
        courseCount: 24,
        students: 12580,
        rating: 4.9
      },
      {
        id: 2,
        image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20acupuncture%20traditional%20medicine&image_size=landscape_4_3",
        title: "\u9488\u7078\u6280\u6CD5\u4E0E\u4E34\u5E8A\u5E94\u7528",
        desc: "\u6DF1\u5165\u5B66\u4E60\u9488\u7078\u7406\u8BBA\u4E0E\u5B9E\u64CD\u6280\u5DE7\uFF0C\u63D0\u5347\u4E34\u5E8A\u8BCA\u7597\u80FD\u529B",
        category: "\u6280\u80FD\u63D0\u5347",
        courseCount: 32,
        students: 8960,
        rating: 4.8
      },
      {
        id: 3,
        image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20herbal%20medicine%20preparation&image_size=landscape_4_3",
        title: "\u4E2D\u836F\u65B9\u5242\u5B66\u4E13\u9898",
        desc: "\u638C\u63E1\u7ECF\u5178\u65B9\u5242\u914D\u4F0D\u89C4\u5F8B\uFF0C\u63D0\u5347\u65B9\u5242\u5E94\u7528\u6C34\u5E73",
        category: "\u4E13\u4E1A\u8FDB\u9636",
        courseCount: 48,
        students: 6540,
        rating: 4.9
      },
      {
        id: 4,
        image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20diagnosis%20pulse%20diagnosis&image_size=landscape_4_3",
        title: "\u4E2D\u533B\u8BCA\u65AD\u5B66\u7CBE\u8981",
        desc: "\u7CFB\u7EDF\u5B66\u4E60\u671B\u95FB\u95EE\u5207\u56DB\u8BCA\u65B9\u6CD5\uFF0C\u63D0\u9AD8\u8FA8\u8BC1\u8BBA\u6CBB\u80FD\u529B",
        category: "\u6838\u5FC3\u8BFE\u7A0B",
        courseCount: 36,
        students: 10320,
        rating: 4.8
      },
      {
        id: 5,
        image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20gynecology%20healthcare&image_size=landscape_4_3",
        title: "\u4E2D\u533B\u5987\u79D1\u75BE\u75C5\u8BCA\u6CBB",
        desc: "\u6DF1\u5165\u5B66\u4E60\u5987\u79D1\u5E38\u89C1\u75C5\u7684\u4E2D\u533B\u8BCA\u7597\u65B9\u6CD5\u4E0E\u8C03\u7406\u65B9\u6848",
        category: "\u4E13\u79D1\u9886\u57DF",
        courseCount: 28,
        students: 7890,
        rating: 4.7
      },
      {
        id: 6,
        image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20pediatrics%20traditional&image_size=landscape_4_3",
        title: "\u4E2D\u533B\u513F\u79D1\u7279\u8272\u7597\u6CD5",
        desc: "\u638C\u63E1\u5C0F\u513F\u5E38\u89C1\u75C5\u7684\u4E2D\u533B\u6CBB\u7597\u4E0E\u4FDD\u5065\u65B9\u6CD5",
        category: "\u4E13\u79D1\u9886\u57DF",
        courseCount: 22,
        students: 5670,
        rating: 4.8
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "topics-page" }, _attrs))} data-v-0ed088b8><div class="container" data-v-0ed088b8><div class="page-header" data-v-0ed088b8><h1 class="page-title" data-v-0ed088b8>\u4E13\u9898\u4E2D\u5FC3</h1><p class="page-desc" data-v-0ed088b8>\u7CBE\u9009\u4E13\u9898\uFF0C\u6DF1\u5165\u5B66\u4E60\u4E2D\u533B\u77E5\u8BC6\u4F53\u7CFB</p></div><div class="topics-grid" data-v-0ed088b8><!--[-->`);
      ssrRenderList(topics.value, (topic) => {
        _push(`<div class="topic-card" data-v-0ed088b8><div class="topic-image" data-v-0ed088b8><img${ssrRenderAttr("src", topic.image)}${ssrRenderAttr("alt", topic.title)} data-v-0ed088b8><div class="topic-overlay" data-v-0ed088b8><span class="topic-count" data-v-0ed088b8>${ssrInterpolate(topic.courseCount)} \u8282\u8BFE</span></div></div><div class="topic-info" data-v-0ed088b8><span class="topic-category" data-v-0ed088b8>${ssrInterpolate(topic.category)}</span><h3 class="topic-title" data-v-0ed088b8>${ssrInterpolate(topic.title)}</h3><p class="topic-desc" data-v-0ed088b8>${ssrInterpolate(topic.desc)}</p><div class="topic-footer" data-v-0ed088b8><span class="topic-students" data-v-0ed088b8>\u{1F465} ${ssrInterpolate(topic.students)} \u4EBA\u5B66\u4E60</span><span class="topic-rating" data-v-0ed088b8>\u2B50 ${ssrInterpolate(topic.rating)}</span></div></div></div>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/topics/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0ed088b8"]]);

export { index as default };
//# sourceMappingURL=index-DDuXi0ID.mjs.map
