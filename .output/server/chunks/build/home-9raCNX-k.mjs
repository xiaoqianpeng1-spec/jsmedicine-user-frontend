import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { useRouter, useRoute } from 'vue-router';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "home",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    useRoute();
    const currentBanner = ref(0);
    const banners = ref([
      {
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&h=600&fit=crop",
        title: "\u4E2D\u533B\u5728\u7EBF\u54A8\u8BE2",
        subtitle: "\u4E13\u4E1A\u540D\u5E08\u5728\u7EBF",
        button: "\u7ACB\u5373\u54A8\u8BE2",
        path: "/consult"
      },
      {
        image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1920&h=600&fit=crop",
        title: "\u5728\u7EBF\u5B66\u4E60\u5E73\u53F0",
        subtitle: "\u4F20\u627F\u4E2D\u533B\u667A\u6167",
        button: "\u5F00\u59CB\u5B66\u4E60",
        path: "/video"
      },
      {
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1920&h=600&fit=crop",
        title: "\u4E13\u4E1A\u8003\u6838\u8BA4\u8BC1",
        subtitle: "\u63D0\u5347\u4E13\u4E1A\u6C34\u5E73",
        button: "\u53C2\u52A0\u8003\u6838",
        path: "/exam"
      }
    ]);
    const stats = ref([
      { value: "20000+", label: "\u7528\u6237\u540C\u65F6\u5728\u7EBF\u5B66\u4E60" },
      { value: "3000+", label: "\u97F3\u89C6\u9891\u8D44\u6E90\u514D\u8D39\u63D0\u4F9B" },
      { value: "\u6570\u767E\u672C", label: "\u4E13\u4E1A\u4E2D\u533B\u4E66\u7C4D\u8F7B\u677E\u67E5\u9605" },
      { value: "5000+", label: "\u9898\u5E93\u6D4B\u8BD5\u5B66\u4E60" },
      { value: "\u4E0A\u767E\u4F4D", label: "\u4E13\u5BB6\u5728\u7EBF\u7B54\u7591" }
    ]);
    const features = ref([
      { title: "\u8D44\u8BAF\u9884\u89C8", desc: "\u5B9E\u65F6\u5C55\u793A\u4E2D\u533B\u76F8\u5173\u7684\u5404\u7C7B\u8D44\u8BAF\u3001\u5305\u62EC\u56FE\u6587\u7ED3\u5408\u97F3\u9891\u3001\u8D44\u8BAF\u6536\u85CF\u3001\u5206\u4EAB", path: "/articles" },
      { title: "\u5728\u7EBF\u5B66\u4E60", desc: "\u63D0\u4F9B\u591A\u79CD\u5B66\u4E60\u65B9\u5F0F\uFF0C\u5305\u62EC\u56FE\u6587\u3001\u56FE\u4E66\u3001\u89C6\u9891\u3001\u97F3\u9891\u3001\u76F4\u64AD\u7B49\uFF0C\u540C\u65F6\u5BF9\u5B66\u4E60\u8FDB\u884C\u5B66\u4E60\u7EDF\u8BA1\u3001\u8FFD\u8E2A", path: "/video" },
      { title: "\u5728\u7EBF\u6D4B\u8BC4", desc: "\u81EA\u7531\u7EC4\u9898\u3001\u52A8\u6001\u751F\u6210\u8003\u5377\u3001\u968F\u673A\u62BD\u9898\u9898\u76EE\u3001\u53CA\u65F6\u56DE\u9988\u8BC4\u6D4B\u7ED3\u679C", path: "/exam" },
      { title: "\u4E13\u5BB6\u7B54\u7591", desc: "\u77E5\u540D\u4E13\u5BB6\u5B9E\u65F6\u5728\u7EBF\u3001\u4E00\u5BF9\u4E00\u89E3\u7B54\u76F8\u5173\u7591\u95EE\u3001\u751F\u6210\u516C\u5F00\u5C55\u793A\u5BF9\u56DE\u7B54\u8BB0\u5F55", path: "/consult" },
      { title: "\u77E5\u8BC6\u5E93", desc: "\u6309\u4E2D\u533B\u57FA\u7840\u7406\u8BBA\u3001\u4E2D\u533B\u8BCA\u65AD\u5B66\u3001\u4E2D\u836F\u5B66\u3001\u65B9\u5242\u5B66\u3001\u4E2D\u533B\u5185\u79D1\u3001\u4E2D\u533B\u5916\u79D1\u3001\u56DB\u5927\u7ECF\u5178\u7B49\u5206\u7C7B", path: "/books" },
      { title: "\u4E13\u9898\u6574\u5408", desc: "\u4EE5\u4E13\u9898\u5F62\u5F0F\u3001\u53D1\u5E03\u5185\u5BB9\u63A8\u9001\u3001\u6216\u8005\u5B66\u4E60\u5185\u5BB9\uFF0C\u4F9B\u5B66\u5458\u968F\u65F6\u968F\u5730\u5B66\u4E60\u3002\u4E13\u9898\u4E2D\u53EF\u4EE5\u81EA\u5B9A\u6574\u5408\u8D44\u8BAF\u3001\u7535\u5B50\u4E66\u3001\u89C6\u9891\u53CA\u8003\u8BD5\u6D4B\u8BC4", path: "/topics" },
      { title: "\u4E2A\u4EBA\u4E2D\u5FC3", desc: "\u7528\u4E8E\u7BA1\u7406\u7528\u6237\u7684\u767B\u5F55\u540D\u3001\u4E2A\u4EBA\u57FA\u672C\u4FE1\u606F\u3001\u652F\u6301\u624B\u673A\u77ED\u4FE1\u5B9E\u540D\u8BA4\u8BC1\u548C\u8BC1\u4E66\u7528\u6237\u7533\u8BF7", path: "/profile" },
      { title: "\u5B98\u7F51\u5C55\u793A", desc: "\u652F\u6301\u5728WEB\u6D4F\u89C8\u5668\u7AEF\u3001\u6D4F\u89C8\u5E73\u53F0\u6240\u53D1\u5E03\u7684\u5185\u5BB9\u3002\u5728\u7EBF\u5B66\u4E60\u53CA\u8BC4\u4EF7\u5747\u5728\u79FB\u52A8\u524D\u7AEF\u5C0F\u7A0B\u5E8F\u7AEF", path: "/" }
    ]);
    ref([
      { id: 1, image: "https://picsum.photos/seed/news1/400/220", title: "\u9996\u5C4A\u4E2D\u6FB3\u5168\u79D1\u533B\u5B66\u6559\u80B2\u4E0E\u57FA\u5C42\u533B\u7597\u5B9E\u8DF5\u7F51\u7EDC\u7814\u8BA8\u4F1A\u53EC\u5F00\u5728\u5373", tag: "\u65B0\u95FB\u8D44\u8BAF", tagClass: "red", time: "2024-01-15" },
      { id: 2, image: "https://picsum.photos/seed/news2/400/220", title: "\u4E2D\u533B\u6570\u5B57\u5316\u8F6C\u578B\u7814\u8BA8\u4F1A\u6210\u529F\u4E3E\u529E", tag: "\u5B66\u672F\u4EA4\u6D41", tagClass: "pink", time: "2024-01-14" },
      { id: 3, image: "https://picsum.photos/seed/news3/400/220", title: "\u4E2D\u533B\u836F\u9AD8\u7B49\u6559\u80B2\u521B\u65B0\u53D1\u5C55\u8BBA\u575B\u5706\u6EE1\u843D\u5E55", tag: "\u884C\u4E1A\u52A8\u6001", tagClass: "blue", time: "2024-01-13" }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "home-page" }, _attrs))} data-v-25b84dc0><section class="banner" data-v-25b84dc0><div class="banner-list" style="${ssrRenderStyle({ transform: `translateX(-${currentBanner.value * 100}%)` })}" data-v-25b84dc0><!--[-->`);
      ssrRenderList(banners.value, (b, i) => {
        _push(`<div class="banner-item" data-v-25b84dc0><img${ssrRenderAttr("src", b.image)} alt="" data-v-25b84dc0><div class="text" data-v-25b84dc0><h1 data-v-25b84dc0>${ssrInterpolate(b.title)}</h1><p data-v-25b84dc0>${ssrInterpolate(b.subtitle)}</p><button data-v-25b84dc0>${ssrInterpolate(b.button)}</button></div></div>`);
      });
      _push(`<!--]--></div><div class="dots" data-v-25b84dc0><!--[-->`);
      ssrRenderList(banners.value, (_, i) => {
        _push(`<span class="${ssrRenderClass({ active: currentBanner.value === i })}" data-v-25b84dc0></span>`);
      });
      _push(`<!--]--></div></section><section class="stats" data-v-25b84dc0><div class="container" data-v-25b84dc0><h2 data-v-25b84dc0>\u77E5\u8BC6\u670D\u52A1\u4E91\u5E73\u53F0</h2><p class="desc" data-v-25b84dc0>\u7CBE\u51C6\u3001\u53CA\u65F6\u3001\u4EA4\u4E92\u5F0F\u3001\u5168\u5929\u5019\u3001\u5168\u7A0B\u987E\u95EE\u5F0F</p><div class="grid" data-v-25b84dc0><!--[-->`);
      ssrRenderList(stats.value, (s, i) => {
        _push(`<div class="item" data-v-25b84dc0><div class="val" data-v-25b84dc0>${ssrInterpolate(s.value)}</div><div class="label" data-v-25b84dc0>${ssrInterpolate(s.label)}</div></div>`);
      });
      _push(`<!--]--></div></div></section><section class="features" data-v-25b84dc0><div class="container" data-v-25b84dc0><h2 data-v-25b84dc0>\u57FA\u7840\u529F\u80FD</h2><p class="desc" data-v-25b84dc0>\u8D44\u8BAF\u9884\u89C8\u3001\u5728\u7EBF\u5B66\u4E60\u3001\u5728\u7EBF\u6D4B\u8BC4\u3001\u4E13\u5BB6\u7B54\u7591\u3001\u77E5\u8BC6\u5E93\u3001\u4E13\u9898\u6574\u5408\u3001\u4E2A\u4EBA\u4E2D\u5FC3\u3001\u5B98\u7F51\u5C55\u793A</p><div class="grid" data-v-25b84dc0><!--[-->`);
      ssrRenderList(features.value, (f, i) => {
        _push(`<div class="card" data-v-25b84dc0><h3 data-v-25b84dc0>${ssrInterpolate(f.title)}</h3><p data-v-25b84dc0>${ssrInterpolate(f.desc)}</p></div>`);
      });
      _push(`<!--]--></div></div></section><footer class="footer" data-v-25b84dc0><div class="container" data-v-25b84dc0></div></footer></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const home = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-25b84dc0"]]);

export { home as default };
//# sourceMappingURL=home-9raCNX-k.mjs.map
