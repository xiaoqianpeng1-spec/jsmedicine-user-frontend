import { defineComponent, ref, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrInterpolate } from "vue/server-renderer";
import { publicAssetsURL } from "#internal/nuxt/paths";
import { _ as _imports_0$1 } from "./virtual_public-WrmrQ6Qb.js";
import { b as useRouter, d as useUserStore } from "../server.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/hookable/dist/index.mjs";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "D:/work/jsmedicine-user-frontend/node_modules/ofetch/dist/node.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/unctx/dist/index.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "D:/work/jsmedicine-user-frontend/node_modules/defu/dist/defu.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/ufo/dist/index.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/klona/dist/index.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/destr/dist/index.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/ohash/dist/index.mjs";
const _imports_0 = publicAssetsURL("/login-page.png");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    useUserStore();
    const loginType = ref("phone");
    const loading = ref(false);
    const smsCountdown = ref(0);
    const form = ref({
      mobile: "",
      code: "",
      username: "",
      password: ""
    });
    const smsDisabled = computed(() => smsCountdown.value > 0 || !form.value.mobile || form.value.mobile.length !== 11);
    const smsText = computed(() => {
      if (smsCountdown.value > 0) {
        return `${smsCountdown.value}s`;
      }
      return "获取验证码";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "login-page" }, _attrs))} data-v-df7d9cfa><div class="background-decoration" data-v-df7d9cfa><div class="decor-circle circle-1" data-v-df7d9cfa></div><div class="decor-circle circle-2" data-v-df7d9cfa></div><div class="decor-circle circle-3" data-v-df7d9cfa></div><div class="decor-circle circle-4" data-v-df7d9cfa></div><div class="decor-wave wave-1" data-v-df7d9cfa></div><div class="decor-wave wave-2" data-v-df7d9cfa></div><div class="decor-wave wave-3" data-v-df7d9cfa></div><div class="decor-wave wave-4" data-v-df7d9cfa></div></div><div class="login-wrapper" data-v-df7d9cfa><div class="left-section" data-v-df7d9cfa><img${ssrRenderAttr("src", _imports_0)} alt="中医医师" class="login-illustration" data-v-df7d9cfa></div><div class="right-section" data-v-df7d9cfa><div class="login-box" data-v-df7d9cfa><div class="logo-section" data-v-df7d9cfa><img${ssrRenderAttr("src", _imports_0$1)} alt="中医在线" class="logo-image" data-v-df7d9cfa><h1 class="title" data-v-df7d9cfa>中医在线</h1></div><div class="login-tabs" data-v-df7d9cfa><button class="${ssrRenderClass([{ active: loginType.value === "phone" }, "tab-btn"])}" data-v-df7d9cfa> 手机号登录 </button><span class="tab-divider" data-v-df7d9cfa>|</span><button class="${ssrRenderClass([{ active: loginType.value === "password" }, "tab-btn"])}" data-v-df7d9cfa> 账号密码登录 </button><span class="tab-divider" data-v-df7d9cfa>|</span><button class="${ssrRenderClass([{ active: loginType.value === "qrcode" }, "tab-btn"])}" data-v-df7d9cfa> 二维码登录 </button></div>`);
      if (loginType.value === "phone") {
        _push(`<div class="login-form" data-v-df7d9cfa><div class="form-group" data-v-df7d9cfa><div class="input-wrapper" data-v-df7d9cfa><svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-df7d9cfa><rect x="3" y="4" width="18" height="18" rx="2" ry="2" data-v-df7d9cfa></rect><line x1="16" y1="2" x2="16" y2="6" data-v-df7d9cfa></line><line x1="8" y1="2" x2="8" y2="6" data-v-df7d9cfa></line><line x1="3" y1="10" x2="21" y2="10" data-v-df7d9cfa></line></svg><input${ssrRenderAttr("value", form.value.mobile)} type="tel" class="form-input" placeholder="请输入手机号" maxlength="11" data-v-df7d9cfa></div></div><div class="form-group" data-v-df7d9cfa><div class="input-wrapper" data-v-df7d9cfa><svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-df7d9cfa><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" data-v-df7d9cfa></path></svg><input${ssrRenderAttr("value", form.value.code)} type="text" class="form-input" placeholder="请输入验证码" maxlength="6" data-v-df7d9cfa><button type="button" class="sms-btn"${ssrIncludeBooleanAttr(smsDisabled.value) ? " disabled" : ""} data-v-df7d9cfa>${ssrInterpolate(smsText.value)}</button></div></div><button type="button" class="login-btn"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} data-v-df7d9cfa>`);
        if (loading.value) {
          _push(`<span data-v-df7d9cfa>登录中...</span>`);
        } else {
          _push(`<span data-v-df7d9cfa>登录</span>`);
        }
        _push(`</button></div>`);
      } else if (loginType.value === "password") {
        _push(`<div class="login-form" data-v-df7d9cfa><div class="form-group" data-v-df7d9cfa><div class="input-wrapper" data-v-df7d9cfa><svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-df7d9cfa><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" data-v-df7d9cfa></path><circle cx="12" cy="7" r="4" data-v-df7d9cfa></circle></svg><input${ssrRenderAttr("value", form.value.username)} type="text" class="form-input" placeholder="请输入用户名/手机号" data-v-df7d9cfa></div></div><div class="form-group" data-v-df7d9cfa><div class="input-wrapper" data-v-df7d9cfa><svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-df7d9cfa><rect x="3" y="11" width="18" height="11" rx="2" ry="2" data-v-df7d9cfa></rect><path d="M7 11V7a5 5 0 0 1 10 0v4" data-v-df7d9cfa></path></svg><input${ssrRenderAttr("value", form.value.password)} type="password" class="form-input" placeholder="请输入密码" data-v-df7d9cfa></div></div><button type="button" class="login-btn"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} data-v-df7d9cfa>`);
        if (loading.value) {
          _push(`<span data-v-df7d9cfa>登录中...</span>`);
        } else {
          _push(`<span data-v-df7d9cfa>登录</span>`);
        }
        _push(`</button></div>`);
      } else {
        _push(`<div class="qrcode-section" data-v-df7d9cfa><div class="qrcode-wrapper" data-v-df7d9cfa><img src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=QR%20code%20simple%20black%20and%20white%20clean%20background&amp;image_size=square" alt="登录二维码" data-v-df7d9cfa></div></div>`);
      }
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-df7d9cfa"]]);
export {
  index as default
};
//# sourceMappingURL=index-DGLcF7y7.js.map
