import { defineComponent, computed, resolveComponent, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { _ as _imports_0 } from "./virtual_public-WrmrQ6Qb.js";
import { useRoute, useRouter } from "vue-router";
import { d as useUserStore, s as storeToRefs } from "../server.mjs";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "#internal/nuxt/paths";
import "D:/work/jsmedicine-user-frontend/node_modules/ofetch/dist/node.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/hookable/dist/index.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/unctx/dist/index.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/h3/dist/index.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/defu/dist/defu.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/ufo/dist/index.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/klona/dist/index.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/destr/dist/index.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/ohash/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useRouter();
    const userStore = useUserStore();
    const { userInfo } = storeToRefs(userStore);
    const topNavItems = [
      { path: "/home", label: "首页" },
      { path: "/articles", label: "资讯" },
      { path: "/topics", label: "专题" },
      { path: "/video", label: "视频" },
      { path: "/audio", label: "音频" },
      { path: "/books", label: "图书" },
      { path: "/consult", label: "咨询" },
      { path: "/exam", label: "考核" }
    ];
    const userAvatar = computed(() => {
      return userInfo.value.avatar || "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20cat%20avatar%20portrait%20simple&image_size=square";
    });
    const userName = computed(() => {
      return userInfo.value.nickname || userInfo.value.username || "用户";
    });
    computed(() => {
      return !["/"].includes(route.path);
    });
    const isActive = (path) => {
      return route.path === path;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-layout" }, _attrs))} data-v-6c91905f><header class="app-header" data-v-6c91905f><div class="header-container" data-v-6c91905f><div class="logo-section" data-v-6c91905f><img${ssrRenderAttr("src", _imports_0)} alt="江苏省中医药管理局" class="logo-image" data-v-6c91905f><span class="logo-text" data-v-6c91905f>中医在线</span></div><nav class="header-nav" data-v-6c91905f><!--[-->`);
      ssrRenderList(topNavItems, (item) => {
        _push(ssrRenderComponent(_component_router_link, {
          key: item.path,
          to: item.path,
          class: ["nav-link", { active: isActive(item.path) }]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item.label)}`);
            } else {
              return [
                createTextVNode(toDisplayString(item.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></nav><div class="header-right" data-v-6c91905f>`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "/profile",
        class: "user-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", userAvatar.value)} alt="用户头像" class="user-avatar" data-v-6c91905f${_scopeId}><span class="user-name" data-v-6c91905f${_scopeId}>${ssrInterpolate(userName.value)}</span>`);
          } else {
            return [
              createVNode("img", {
                src: userAvatar.value,
                alt: "用户头像",
                class: "user-avatar"
              }, null, 8, ["src"]),
              createVNode("span", { class: "user-name" }, toDisplayString(userName.value), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></header><main class="app-main" data-v-6c91905f>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><footer class="footer" data-v-6c91905f><div class="footer-container" data-v-6c91905f><div class="footer-content" data-v-6c91905f><div class="footer-info" data-v-6c91905f><h4 data-v-6c91905f>联系我们</h4><p data-v-6c91905f>微信公众号: wz123545</p><p data-v-6c91905f>QQ: 1235345</p><p data-v-6c91905f>QQ: 1235345</p><p data-v-6c91905f>Email: 1235345@163.com</p></div><div class="footer-qrcodes" data-v-6c91905f><div class="qrcode-item" data-v-6c91905f><img src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=QR%20code%20simple%20black%20white&amp;image_size=square_hd" alt="关注公众号" data-v-6c91905f><span data-v-6c91905f>关注公众号</span></div><div class="qrcode-item" data-v-6c91905f><img src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=QR%20code%20simple%20black%20white&amp;image_size=square_hd" alt="小程序" data-v-6c91905f><span data-v-6c91905f>江苏中医在线小程序</span></div></div></div><div class="footer-copyright" data-v-6c91905f><p data-v-6c91905f>Copyright@2013********苏ICP备12345678号</p></div></div></footer></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6c91905f"]]);
export {
  _default as default
};
//# sourceMappingURL=default-AA8FgiVH.js.map
