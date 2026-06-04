import { useSSRContext, defineComponent, computed, resolveComponent, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-WrmrQ6Qb.mjs';
import { useRoute, useRouter } from 'vue-router';
import { d as useUserStore, s as storeToRefs } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useRouter();
    const userStore = useUserStore();
    const { userInfo } = storeToRefs(userStore);
    const topNavItems = [
      { path: "/home", label: "\u9996\u9875" },
      { path: "/articles", label: "\u8D44\u8BAF" },
      { path: "/topics", label: "\u4E13\u9898" },
      { path: "/video", label: "\u89C6\u9891" },
      { path: "/audio", label: "\u97F3\u9891" },
      { path: "/books", label: "\u56FE\u4E66" },
      { path: "/consult", label: "\u54A8\u8BE2" },
      { path: "/exam", label: "\u8003\u6838" }
    ];
    const userAvatar = computed(() => {
      return userInfo.value.avatar || "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20cat%20avatar%20portrait%20simple&image_size=square";
    });
    const userName = computed(() => {
      return userInfo.value.nickname || userInfo.value.username || "\u7528\u6237";
    });
    computed(() => {
      return !["/"].includes(route.path);
    });
    const isActive = (path) => {
      return route.path === path;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-layout" }, _attrs))} data-v-6c91905f><header class="app-header" data-v-6c91905f><div class="header-container" data-v-6c91905f><div class="logo-section" data-v-6c91905f><img${ssrRenderAttr("src", _imports_0)} alt="\u6C5F\u82CF\u7701\u4E2D\u533B\u836F\u7BA1\u7406\u5C40" class="logo-image" data-v-6c91905f><span class="logo-text" data-v-6c91905f>\u4E2D\u533B\u5728\u7EBF</span></div><nav class="header-nav" data-v-6c91905f><!--[-->`);
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
            _push2(`<img${ssrRenderAttr("src", userAvatar.value)} alt="\u7528\u6237\u5934\u50CF" class="user-avatar" data-v-6c91905f${_scopeId}><span class="user-name" data-v-6c91905f${_scopeId}>${ssrInterpolate(userName.value)}</span>`);
          } else {
            return [
              createVNode("img", {
                src: userAvatar.value,
                alt: "\u7528\u6237\u5934\u50CF",
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
      _push(`</main><footer class="footer" data-v-6c91905f><div class="footer-container" data-v-6c91905f><div class="footer-content" data-v-6c91905f><div class="footer-info" data-v-6c91905f><h4 data-v-6c91905f>\u8054\u7CFB\u6211\u4EEC</h4><p data-v-6c91905f>\u5FAE\u4FE1\u516C\u4F17\u53F7: wz123545</p><p data-v-6c91905f>QQ: 1235345</p><p data-v-6c91905f>QQ: 1235345</p><p data-v-6c91905f>Email: 1235345@163.com</p></div><div class="footer-qrcodes" data-v-6c91905f><div class="qrcode-item" data-v-6c91905f><img src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=QR%20code%20simple%20black%20white&amp;image_size=square_hd" alt="\u5173\u6CE8\u516C\u4F17\u53F7" data-v-6c91905f><span data-v-6c91905f>\u5173\u6CE8\u516C\u4F17\u53F7</span></div><div class="qrcode-item" data-v-6c91905f><img src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=QR%20code%20simple%20black%20white&amp;image_size=square_hd" alt="\u5C0F\u7A0B\u5E8F" data-v-6c91905f><span data-v-6c91905f>\u6C5F\u82CF\u4E2D\u533B\u5728\u7EBF\u5C0F\u7A0B\u5E8F</span></div></div></div><div class="footer-copyright" data-v-6c91905f><p data-v-6c91905f>Copyright@2013********\u82CFICP\u590712345678\u53F7</p></div></div></footer></div>`);
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

export { _default as default };
//# sourceMappingURL=default-AA8FgiVH.mjs.map
