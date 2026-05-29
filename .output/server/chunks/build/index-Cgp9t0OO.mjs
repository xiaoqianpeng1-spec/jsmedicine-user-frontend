import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
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
    const currentBanner = ref(0);
    const banners = ref([
      {
        image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20traditional%20medicine%20consultation%20banner%20green%20theme%20medical%20illustration%20health&image_size=landscape_16_9",
        title: "\u4E2D\u533B\u5728\u7EBF\u54A8\u8BE2",
        subtitle: "\u4E13\u4E1A\u540D\u5E08\u5728\u7EBF",
        button: "\u7ACB\u5373\u54A8\u8BE2"
      },
      {
        image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20herbal%20medicine%20education%20banner%20green%20theme%20learning%20healthcare&image_size=landscape_16_9",
        title: "\u5728\u7EBF\u5B66\u4E60\u5E73\u53F0",
        subtitle: "\u4F20\u627F\u4E2D\u533B\u667A\u6167",
        button: "\u5F00\u59CB\u5B66\u4E60"
      },
      {
        image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20examination%20banner%20green%20theme%20certification%20professional&image_size=landscape_16_9",
        title: "\u4E13\u4E1A\u8003\u6838\u8BA4\u8BC1",
        subtitle: "\u63D0\u5347\u4E13\u4E1A\u6C34\u5E73",
        button: "\u53C2\u52A0\u8003\u6838"
      }
    ]);
    const stats = ref([
      { icon: "\u{1F4DA}", value: "20000+", label: "\u6D77\u91CF\u4F18\u8D28\u8BFE\u7A0B" },
      { icon: "\u{1F468}\u200D\u2695\uFE0F", value: "3000+", label: "\u4E13\u5BB6\u540D\u5E08\u8D44\u6E90" },
      { icon: "\u{1F4D6}", value: "\u6570\u767E\u672C", label: "\u4E2D\u533B\u7ECF\u5178\u8457\u4F5C" },
      { icon: "\u{1F4A1}", value: "5000+", label: "\u4E34\u5E8A\u7ECF\u9A8C\u5206\u4EAB" },
      { icon: "\u{1F3C6}", value: "\u4E0A\u767E\u4F4D", label: "\u4E13\u4E1A\u8BA4\u8BC1\u8BB2\u5E08" }
    ]);
    const features = ref([
      { icon: "\u{1F4F0}", title: "\u8D44\u8BAF\u6D4F\u89C8", desc: "\u53CA\u65F6\u83B7\u53D6\u884C\u4E1A\u52A8\u6001\uFF0C\u4E86\u89E3\u524D\u6CBF\u8D44\u8BAF", path: "/articles" },
      { icon: "\u{1F393}", title: "\u5728\u7EBF\u5B66\u4E60", desc: "\u540D\u5E08\u6388\u8BFE\uFF0C\u968F\u65F6\u968F\u5730\uFF0C\u63D0\u5347\u4E13\u4E1A", path: "/video" },
      { icon: "\u2713", title: "\u5728\u7EBF\u6D4B\u8BC4", desc: "\u68C0\u9A8C\u5B66\u4E60\u6210\u679C\uFF0C\u5DE9\u56FA\u77E5\u8BC6\u8981\u70B9", path: "/exam" },
      { icon: "\u{1F4AC}", title: "\u4E13\u5BB6\u7B54\u7591", desc: "\u4E13\u4E1A\u95EE\u9898\u54A8\u8BE2\uFF0C\u540D\u5E08\u5728\u7EBF\u89E3\u7B54", path: "/consult" },
      { icon: "\u{1F4DA}", title: "\u77E5\u8BC6\u5E93", desc: "\u4E30\u5BCC\u7684\u77E5\u8BC6\u50A8\u5907\uFF0C\u6743\u5A01\u8D44\u6599\u67E5\u8BE2", path: "/knowledge" },
      { icon: "\u{1F9E0}", title: "\u667A\u80FD\u6574\u5408", desc: "\u4E2A\u6027\u5316\u5B66\u4E60\u8DEF\u5F84\uFF0C\u667A\u80FD\u63A8\u8350\u5185\u5BB9", path: "/topics" },
      { icon: "\u{1F464}", title: "\u4E2A\u4EBA\u4E2D\u5FC3", desc: "\u5B66\u4E60\u8FDB\u5EA6\u7BA1\u7406\uFF0C\u6536\u85CF\u5B66\u4E60\u8BB0\u5F55", path: "/profile" },
      { icon: "\u{1F310}", title: "\u5B98\u7F51\u5C55\u793A", desc: "\u5E73\u53F0\u4ECB\u7ECD\uFF0C\u673A\u6784\u5C55\u793A\uFF0C\u8054\u7CFB\u6211\u4EEC", path: "/discover" }
    ]);
    const newsList = ref([
      {
        id: 1,
        image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=medical%20conference%20news%20banner%20professional&image_size=landscape_4_3",
        title: "\u9996\u5C4A\u4E2D\u6FB3\u5168\u79D1\u533B\u5B66\u6559\u80B2\u4E0E\u57FA\u5C42\u533B\u7597\u5B9E\u8DF5\u7F51\u7EDC\u7814\u8BA8\u4F1A\u53EC\u5F00\u5728\u5373",
        tag: "\u65B0\u95FB\u8D44\u8BAF",
        tagClass: "tag-red",
        time: "2024-01-15",
        views: 435678,
        likes: 43
      },
      {
        id: 2,
        image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20research%20news%20professional&image_size=landscape_4_3",
        title: "\u4E2D\u533B\u6570\u5B57\u5316\u8F6C\u578B\u7814\u8BA8\u4F1A\u6210\u529F\u4E3E\u529E",
        tag: "\u5B66\u672F\u4EA4\u6D41",
        tagClass: "tag-pink",
        time: "2024-01-14",
        views: 324567,
        likes: 38
      },
      {
        id: 3,
        image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=traditional%20Chinese%20medicine%20education%20news&image_size=landscape_4_3",
        title: "\u4E2D\u533B\u836F\u9AD8\u7B49\u6559\u80B2\u521B\u65B0\u53D1\u5C55\u8BBA\u575B\u5706\u6EE1\u843D\u5E55",
        tag: "\u884C\u4E1A\u52A8\u6001",
        tagClass: "tag-blue",
        time: "2024-01-13",
        views: 298765,
        likes: 52
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "home-page" }, _attrs))} data-v-60806434><section class="banner-section" data-v-60806434><div class="banner-carousel" data-v-60806434><div class="banner-track" style="${ssrRenderStyle({ transform: `translateX(-${currentBanner.value * 100}%)` })}" data-v-60806434><!--[-->`);
      ssrRenderList(banners.value, (banner, index2) => {
        _push(`<div class="banner-item" data-v-60806434><img${ssrRenderAttr("src", banner.image)}${ssrRenderAttr("alt", banner.title)} data-v-60806434><div class="banner-content" data-v-60806434><h2 data-v-60806434>${ssrInterpolate(banner.title)}</h2><p data-v-60806434>${ssrInterpolate(banner.subtitle)}</p><button class="banner-btn" data-v-60806434>\u7ACB\u5373\u54A8\u8BE2</button></div></div>`);
      });
      _push(`<!--]--></div><div class="banner-dots" data-v-60806434><!--[-->`);
      ssrRenderList(banners.value, (_, index2) => {
        _push(`<span class="${ssrRenderClass([{ active: currentBanner.value === index2 }, "dot"])}" data-v-60806434></span>`);
      });
      _push(`<!--]--></div></div></section><section class="stats-section" data-v-60806434><div class="container" data-v-60806434><h3 class="section-title" data-v-60806434>\u77E5\u8BC6\u670D\u52A1\u4E91\u5E73\u53F0</h3><p class="section-subtitle" data-v-60806434>\u96C6\u9053\u3001\u6CD5\u3001\u672F\u3001\u5668\u3001\u52BF\uFF0C\u521B\u65B0\u878D\u667A\u6A21\u5F0F</p><div class="stats-grid" data-v-60806434><!--[-->`);
      ssrRenderList(stats.value, (stat, index2) => {
        _push(`<div class="stat-item" data-v-60806434><span class="stat-icon" data-v-60806434>${ssrInterpolate(stat.icon)}</span><div class="stat-info" data-v-60806434><span class="stat-value" data-v-60806434>${ssrInterpolate(stat.value)}</span><span class="stat-label" data-v-60806434>${ssrInterpolate(stat.label)}</span></div></div>`);
      });
      _push(`<!--]--></div></div></section><section class="features-section" data-v-60806434><div class="container" data-v-60806434><h3 class="section-title" data-v-60806434>\u57FA\u7840\u529F\u80FD</h3><p class="section-subtitle" data-v-60806434>\u8D44\u8BAF\u6D4F\u89C8\u3001\u5728\u7EBF\u5B66\u4E60\u3001\u5728\u7EBF\u6D4B\u8BC4\u3001\u4E13\u5BB6\u7B54\u7591\u3001\u77E5\u8BC6\u5E93\u3001\u667A\u80FD\u6574\u5408\u3001\u4E2A\u4EBA\u4E2D\u5FC3\u3001\u5B98\u7F51\u5C55\u793A</p><div class="features-grid" data-v-60806434><!--[-->`);
      ssrRenderList(features.value, (feature, index2) => {
        _push(`<div class="feature-card" data-v-60806434><div class="feature-icon" data-v-60806434>${ssrInterpolate(feature.icon)}</div><h4 class="feature-title" data-v-60806434>${ssrInterpolate(feature.title)}</h4><p class="feature-desc" data-v-60806434>${ssrInterpolate(feature.desc)}</p></div>`);
      });
      _push(`<!--]--></div></div></section><section class="news-section" data-v-60806434><div class="container" data-v-60806434><div class="section-header" data-v-60806434><h3 class="section-title" data-v-60806434>\u6700\u65B0\u8D44\u8BAF</h3><a href="/articles" class="more-link" data-v-60806434>\u67E5\u770B\u66F4\u591A \u2192</a></div><div class="news-list" data-v-60806434><!--[-->`);
      ssrRenderList(newsList.value, (news, index2) => {
        _push(`<div class="news-item" data-v-60806434><div class="news-image" data-v-60806434><img${ssrRenderAttr("src", news.image)}${ssrRenderAttr("alt", news.title)} data-v-60806434></div><div class="news-content" data-v-60806434><h4 class="news-title" data-v-60806434>${ssrInterpolate(news.title)}</h4><div class="news-meta" data-v-60806434><span class="${ssrRenderClass([news.tagClass, "news-tag"])}" data-v-60806434>${ssrInterpolate(news.tag)}</span><span class="news-time" data-v-60806434>${ssrInterpolate(news.time)}</span></div><div class="news-stats" data-v-60806434><span data-v-60806434>\u{1F441}\uFE0F ${ssrInterpolate(news.views)}</span><span data-v-60806434>\u2764\uFE0F ${ssrInterpolate(news.likes)}</span></div></div></div>`);
      });
      _push(`<!--]--></div></div></section><footer class="footer" data-v-60806434><div class="container" data-v-60806434><div class="footer-content" data-v-60806434><div class="footer-info" data-v-60806434><h4 data-v-60806434>\u8054\u7CFB\u6211\u4EEC</h4><p data-v-60806434>\u5FAE\u4FE1\u516C\u4F17\u53F7: wz123545</p><p data-v-60806434>QQ: 1235345</p><p data-v-60806434>QQ: 1235345</p><p data-v-60806434>Email: 1235345@163.com</p></div><div class="footer-qrcodes" data-v-60806434><div class="qrcode-item" data-v-60806434><img src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=QR%20code%20simple%20black%20white&amp;image_size=square_hd" alt="\u5173\u6CE8\u516C\u4F17\u53F7" data-v-60806434><span data-v-60806434>\u5173\u6CE8\u516C\u4F17\u53F7</span></div><div class="qrcode-item" data-v-60806434><img src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=QR%20code%20simple%20black%20white&amp;image_size=square_hd" alt="\u5C0F\u7A0B\u5E8F" data-v-60806434><span data-v-60806434>\u6C5F\u82CF\u4E2D\u533B\u5728\u7EBF\u5C0F\u7A0B\u5E8F</span></div></div></div><div class="footer-copyright" data-v-60806434><p data-v-60806434>Copyright@2013********\u82CFICP\u590712345678\u53F7</p></div></div></footer></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-60806434"]]);

export { index as default };
//# sourceMappingURL=index-Cgp9t0OO.mjs.map
