import { defineComponent, ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { useRouter, useRoute } from "vue-router";
import "D:/work/jsmedicine-user-frontend/node_modules/hookable/dist/index.mjs";
import "../server.mjs";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "D:/work/jsmedicine-user-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "D:/work/jsmedicine-user-frontend/node_modules/unctx/dist/index.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/h3/dist/index.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/defu/dist/defu.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/ufo/dist/index.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/klona/dist/index.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/destr/dist/index.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/ohash/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "home",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    useRoute();
    const currentBanner = ref(0);
    const banners = ref([
      { image: "https://picsum.photos/seed/1/1920/600", title: "中医在线咨询", subtitle: "专业名师在线", button: "立即咨询" },
      { image: "https://picsum.photos/seed/2/1920/600", title: "在线学习平台", subtitle: "传承中医智慧", button: "开始学习" },
      { image: "https://picsum.photos/seed/3/1920/600", title: "专业考核认证", subtitle: "提升专业水平", button: "参加考核" }
    ]);
    const stats = ref([
      { value: "20000+", label: "用户同时在线学习" },
      { value: "3000+", label: "音视频资源免费提供" },
      { value: "数百本", label: "专业中医书籍轻松查阅" },
      { value: "5000+", label: "题库测试学习" },
      { value: "上百位", label: "专家在线答疑" }
    ]);
    const features = ref([
      { title: "资讯预览", desc: "实时展示中医相关的各类资讯、包括图文结合音频、资讯收藏、分享", path: "/articles" },
      { title: "在线学习", desc: "提供多种学习方式，包括图文、图书、视频、音频、直播等，同时对学习进行学习统计、追踪", path: "/video" },
      { title: "在线测评", desc: "自由组题、动态生成考卷、随机抽题题目、及时回馈评测结果", path: "/exam" },
      { title: "专家答疑", desc: "知名专家实时在线、一对一解答相关疑问、生成公开展示对回答记录", path: "/consult" },
      { title: "知识库", desc: "按中医基础理论、中医诊断学、中药学、方剂学、中医内科、中医外科、四大经典等分类", path: "/books" },
      { title: "专题整合", desc: "以专题形式、发布内容推送、或者学习内容，供学员随时随地学习。专题中可以自定整合资讯、电子书、视频及考试测评", path: "/topics" },
      { title: "个人中心", desc: "用于管理用户的登录名、个人基本信息、支持手机短信实名认证和证书用户申请", path: "/profile" },
      { title: "官网展示", desc: "支持在WEB浏览器端、浏览平台所发布的内容。在线学习及评价均在移动前端小程序端", path: "/" }
    ]);
    ref([
      { id: 1, image: "https://picsum.photos/seed/news1/400/220", title: "首届中澳全科医学教育与基层医疗实践网络研讨会召开在即", tag: "新闻资讯", tagClass: "red", time: "2024-01-15" },
      { id: 2, image: "https://picsum.photos/seed/news2/400/220", title: "中医数字化转型研讨会成功举办", tag: "学术交流", tagClass: "pink", time: "2024-01-14" },
      { id: 3, image: "https://picsum.photos/seed/news3/400/220", title: "中医药高等教育创新发展论坛圆满落幕", tag: "行业动态", tagClass: "blue", time: "2024-01-13" }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "home-page" }, _attrs))} data-v-d776a84e><section class="banner" data-v-d776a84e><div class="banner-list" style="${ssrRenderStyle({ transform: `translateX(-${currentBanner.value * 100}%)` })}" data-v-d776a84e><!--[-->`);
      ssrRenderList(banners.value, (b, i) => {
        _push(`<div class="banner-item" data-v-d776a84e><img${ssrRenderAttr("src", b.image)} alt="" data-v-d776a84e><div class="text" data-v-d776a84e><h1 data-v-d776a84e>${ssrInterpolate(b.title)}</h1><p data-v-d776a84e>${ssrInterpolate(b.subtitle)}</p><button data-v-d776a84e>${ssrInterpolate(b.button)}</button></div></div>`);
      });
      _push(`<!--]--></div><div class="dots" data-v-d776a84e><!--[-->`);
      ssrRenderList(banners.value, (_, i) => {
        _push(`<span class="${ssrRenderClass({ active: currentBanner.value === i })}" data-v-d776a84e></span>`);
      });
      _push(`<!--]--></div></section><section class="stats" data-v-d776a84e><div class="container" data-v-d776a84e><h2 data-v-d776a84e>知识服务云平台</h2><p class="desc" data-v-d776a84e>精准、及时、交互式、全天候、全程顾问式</p><div class="grid" data-v-d776a84e><!--[-->`);
      ssrRenderList(stats.value, (s, i) => {
        _push(`<div class="item" data-v-d776a84e><div class="val" data-v-d776a84e>${ssrInterpolate(s.value)}</div><div class="label" data-v-d776a84e>${ssrInterpolate(s.label)}</div></div>`);
      });
      _push(`<!--]--></div></div></section><section class="features" data-v-d776a84e><div class="container" data-v-d776a84e><h2 data-v-d776a84e>基础功能</h2><p class="desc" data-v-d776a84e>资讯预览、在线学习、在线测评、专家答疑、知识库、专题整合、个人中心、官网展示</p><div class="grid" data-v-d776a84e><!--[-->`);
      ssrRenderList(features.value, (f, i) => {
        _push(`<div class="card" data-v-d776a84e><h3 data-v-d776a84e>${ssrInterpolate(f.title)}</h3><p data-v-d776a84e>${ssrInterpolate(f.desc)}</p></div>`);
      });
      _push(`<!--]--></div></div></section><footer class="footer" data-v-d776a84e><div class="container" data-v-d776a84e></div></footer></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const home = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d776a84e"]]);
export {
  home as default
};
//# sourceMappingURL=home-DSz7C_YL.js.map
