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
      { id: "classic", name: "\u7ECF\u5178\u8457\u4F5C" },
      { id: "modern", name: "\u73B0\u4EE3\u7814\u7A76" },
      { id: "clinical", name: "\u4E34\u5E8A\u5B9E\u8DF5" }
    ];
    const books = ref([
      {
        id: 1,
        cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20traditional%20medicine%20book%20cover%20ancient%20style&image_size=square",
        title: "\u9EC4\u5E1D\u5185\u7ECF",
        author: "\u4F5A\u540D",
        desc: "\u4E2D\u533B\u7ECF\u5178\u8457\u4F5C\uFF0C\u5960\u5B9A\u4E2D\u533B\u7406\u8BBA\u57FA\u7840",
        pages: 580,
        reads: 12580,
        isHot: true
      },
      {
        id: 2,
        cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20herbs%20book%20cover&image_size=square",
        title: "\u672C\u8349\u7EB2\u76EE",
        author: "\u674E\u65F6\u73CD",
        desc: "\u4E2D\u836F\u5B66\u5DE8\u8457\uFF0C\u6536\u5F551892\u79CD\u836F\u7269",
        pages: 1200,
        reads: 8960,
        isHot: true
      },
      {
        id: 3,
        cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20prescription%20book%20cover&image_size=square",
        title: "\u4F24\u5BD2\u8BBA",
        author: "\u5F20\u4EF2\u666F",
        desc: "\u4E2D\u533B\u4E34\u5E8A\u7ECF\u5178\uFF0C\u8FA8\u8BC1\u8BBA\u6CBB\u5178\u8303",
        pages: 320,
        reads: 6540,
        isHot: false
      },
      {
        id: 4,
        cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20diagnosis%20book%20cover&image_size=square",
        title: "\u4E2D\u533B\u8BCA\u65AD\u5B66",
        author: "\u9093\u94C1\u6D9B",
        desc: "\u73B0\u4EE3\u4E2D\u533B\u8BCA\u65AD\u5B66\u6559\u6750",
        pages: 450,
        reads: 10320,
        isHot: false
      },
      {
        id: 5,
        cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20acupuncture%20book%20cover&image_size=square",
        title: "\u9488\u7078\u5927\u6210",
        author: "\u6768\u7EE7\u6D32",
        desc: "\u9488\u7078\u5B66\u7ECF\u5178\u8457\u4F5C",
        pages: 680,
        reads: 7890,
        isHot: false
      },
      {
        id: 6,
        cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20modern%20book%20cover&image_size=square",
        title: "\u4E2D\u533B\u5185\u79D1\u5B66",
        author: "\u5F20\u4F2F\u793C",
        desc: "\u73B0\u4EE3\u4E2D\u533B\u5185\u79D1\u4E34\u5E8A\u6307\u5357",
        pages: 850,
        reads: 5670,
        isHot: false
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "books-page" }, _attrs))} data-v-2b5af381><div class="container" data-v-2b5af381><div class="page-header" data-v-2b5af381><h1 class="page-title" data-v-2b5af381>\u6570\u5B57\u56FE\u4E66\u9986</h1><p class="page-desc" data-v-2b5af381>\u6D77\u91CF\u4E2D\u533B\u7ECF\u5178\u8457\u4F5C\uFF0C\u968F\u65F6\u968F\u5730\u9605\u8BFB\u5B66\u4E60</p></div><div class="filter-bar" data-v-2b5af381><div class="filter-tabs" data-v-2b5af381><!--[-->`);
      ssrRenderList(filterTabs, (tab) => {
        _push(`<button class="${ssrRenderClass([{ active: activeTab.value === tab.id }, "filter-tab"])}" data-v-2b5af381>${ssrInterpolate(tab.name)}</button>`);
      });
      _push(`<!--]--></div></div><div class="books-grid" data-v-2b5af381><!--[-->`);
      ssrRenderList(books.value, (book) => {
        _push(`<div class="book-card" data-v-2b5af381><div class="book-cover" data-v-2b5af381><img${ssrRenderAttr("src", book.cover)}${ssrRenderAttr("alt", book.title)} data-v-2b5af381>`);
        if (book.isHot) {
          _push(`<div class="book-badge" data-v-2b5af381>\u70ED\u95E8</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="book-info" data-v-2b5af381><h3 class="book-title" data-v-2b5af381>${ssrInterpolate(book.title)}</h3><p class="book-author" data-v-2b5af381>${ssrInterpolate(book.author)}</p><p class="book-desc" data-v-2b5af381>${ssrInterpolate(book.desc)}</p><div class="book-meta" data-v-2b5af381><span class="book-pages" data-v-2b5af381>${ssrInterpolate(book.pages)} \u9875</span><span class="book-reads" data-v-2b5af381>\u{1F4D6} ${ssrInterpolate(book.reads)} \u4EBA\u5728\u8BFB</span></div></div></div>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/books/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2b5af381"]]);

export { index as default };
//# sourceMappingURL=index-CVIY3X_7.mjs.map
