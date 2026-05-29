import { defineComponent, ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate } from 'vue/server-renderer';
import { b as useRouter, d as useUserStore } from './server.mjs';
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
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    useUserStore();
    const loginType = ref("phone");
    const loading = ref(false);
    const smsCountdown = ref(0);
    const form = ref({
      mobile: "",
      code: ""
    });
    const smsDisabled = computed(() => smsCountdown.value > 0 || !form.value.mobile || form.value.mobile.length !== 11);
    const smsText = computed(() => {
      if (smsCountdown.value > 0) {
        return `${smsCountdown.value}s`;
      }
      return "\u83B7\u53D6\u9A8C\u8BC1\u7801";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "login-page" }, _attrs))} data-v-2eec9c37><div class="login-wrapper" data-v-2eec9c37><div class="left-section" data-v-2eec9c37><div class="illustration" data-v-2eec9c37><div class="decoration-circle" data-v-2eec9c37></div><div class="doctor-illustration" data-v-2eec9c37><img src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20traditional%20medicine%20doctor%20illustration%20with%20herbs%20and%20cabinet%20flat%20design%20green%20theme&amp;image_size=square" alt="\u4E2D\u533B\u533B\u5E08" data-v-2eec9c37></div><div class="herb-cabinet" data-v-2eec9c37><!--[-->`);
      ssrRenderList(12, (i) => {
        _push(`<div class="cabinet-item" data-v-2eec9c37></div>`);
      });
      _push(`<!--]--></div></div></div><div class="right-section" data-v-2eec9c37><div class="login-box" data-v-2eec9c37><div class="logo-section" data-v-2eec9c37><div class="logo" data-v-2eec9c37><svg width="48" height="48" viewBox="0 0 48 48" fill="none" data-v-2eec9c37><circle cx="24" cy="24" r="22" stroke="#2D5A27" stroke-width="2" data-v-2eec9c37></circle><path d="M24 12v24M12 24h24" stroke="#2D5A27" stroke-width="2" data-v-2eec9c37></path><circle cx="24" cy="24" r="8" fill="#4CAF50" data-v-2eec9c37></circle></svg></div><h1 class="title" data-v-2eec9c37>\u4E2D\u533B\u5728\u7EBF</h1></div><div class="login-tabs" data-v-2eec9c37><button class="${ssrRenderClass([{ active: loginType.value === "phone" }, "tab-btn"])}" data-v-2eec9c37> \u624B\u673A\u53F7\u767B\u5F55 </button><button class="${ssrRenderClass([{ active: loginType.value === "qrcode" }, "tab-btn"])}" data-v-2eec9c37> \u4E8C\u7EF4\u7801\u767B\u5F55 </button></div>`);
      if (loginType.value === "phone") {
        _push(`<div class="login-form" data-v-2eec9c37><div class="form-group" data-v-2eec9c37><div class="input-wrapper" data-v-2eec9c37><span class="input-icon" data-v-2eec9c37>\u{1F4F1}</span><input${ssrRenderAttr("value", form.value.mobile)} type="tel" class="form-input" placeholder="\u8BF7\u8F93\u5165\u624B\u673A\u53F7" maxlength="11" data-v-2eec9c37></div></div><div class="form-group" data-v-2eec9c37><div class="input-wrapper" data-v-2eec9c37><span class="input-icon" data-v-2eec9c37>\u{1F510}</span><input${ssrRenderAttr("value", form.value.code)} type="text" class="form-input" placeholder="\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801" maxlength="6" data-v-2eec9c37><button type="button" class="sms-btn"${ssrIncludeBooleanAttr(smsDisabled.value) ? " disabled" : ""} data-v-2eec9c37>${ssrInterpolate(smsText.value)}</button></div></div><button type="button" class="login-btn"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} data-v-2eec9c37>`);
        if (loading.value) {
          _push(`<span data-v-2eec9c37>\u767B\u5F55\u4E2D...</span>`);
        } else {
          _push(`<span data-v-2eec9c37>\u767B \u5F55</span>`);
        }
        _push(`</button></div>`);
      } else {
        _push(`<div class="qrcode-section" data-v-2eec9c37><div class="qrcode-wrapper" data-v-2eec9c37><img src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=QR%20code%20simple%20black%20and%20white&amp;image_size=square" alt="\u767B\u5F55\u4E8C\u7EF4\u7801" data-v-2eec9c37></div><p class="qrcode-tip" data-v-2eec9c37>\u4F7F\u7528\u5FAE\u4FE1\u626B\u7801\u767B\u5F55</p></div>`);
      }
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2eec9c37"]]);

export { login as default };
//# sourceMappingURL=login-u3PMK5m4.mjs.map
