import { defineComponent, ref, computed, watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrInterpolate } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { _ as _imports_0$1 } from './virtual_public-WrmrQ6Qb.mjs';
import { g as useRouter, f as useRoute, i as useUserStore } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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
import 'vue-router';
import 'axios';

const _imports_0 = publicAssetsURL("/login-page.png");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    useRoute();
    useUserStore();
    const loginType = ref("phone");
    const loading = ref(false);
    const smsCountdown = ref(0);
    const qrLoading = ref(false);
    const qrError = ref("");
    ref(null);
    const qrCodeUrl = ref("");
    const qrExpiresIn = ref(0);
    const scanStatus = ref("waiting");
    const qrPollTimer = ref(null);
    const qrExpireTimer = ref(null);
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
      return "\u83B7\u53D6\u9A8C\u8BC1\u7801";
    });
    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    };
    const stopPollTimer = () => {
      if (qrPollTimer.value) {
        clearInterval(qrPollTimer.value);
        qrPollTimer.value = null;
      }
    };
    const fetchQrConfig = async () => {
      return;
    };
    watch(loginType, (newType) => {
      if (newType === "qrcode") {
        fetchQrConfig();
      } else {
        stopPollTimer();
        if (qrExpireTimer.value) {
          clearInterval(qrExpireTimer.value);
        }
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "login-page" }, _attrs))} data-v-4946a766><div class="background-decoration" data-v-4946a766><div class="decor-circle circle-1" data-v-4946a766></div><div class="decor-circle circle-2" data-v-4946a766></div><div class="decor-circle circle-3" data-v-4946a766></div><div class="decor-circle circle-4" data-v-4946a766></div><div class="decor-wave wave-1" data-v-4946a766></div><div class="decor-wave wave-2" data-v-4946a766></div><div class="decor-wave wave-3" data-v-4946a766></div><div class="decor-wave wave-4" data-v-4946a766></div></div><div class="login-wrapper" data-v-4946a766><div class="left-section" data-v-4946a766><img${ssrRenderAttr("src", _imports_0)} alt="\u4E2D\u533B\u533B\u5E08" class="login-illustration" data-v-4946a766></div><div class="right-section" data-v-4946a766><div class="login-box" data-v-4946a766><div class="logo-section" data-v-4946a766><img${ssrRenderAttr("src", _imports_0$1)} alt="\u4E2D\u533B\u5728\u7EBF" class="logo-image" data-v-4946a766><h1 class="title" data-v-4946a766>\u4E2D\u533B\u5728\u7EBF</h1></div><div class="login-tabs" data-v-4946a766><button class="${ssrRenderClass([{ active: loginType.value === "phone" }, "tab-btn"])}" data-v-4946a766> \u624B\u673A\u53F7\u767B\u5F55 </button><span class="tab-divider" data-v-4946a766>|</span><button class="${ssrRenderClass([{ active: loginType.value === "password" }, "tab-btn"])}" data-v-4946a766> \u8D26\u53F7\u5BC6\u7801\u767B\u5F55 </button><span class="tab-divider" data-v-4946a766>|</span><button class="${ssrRenderClass([{ active: loginType.value === "qrcode" }, "tab-btn"])}" data-v-4946a766> \u4E8C\u7EF4\u7801\u767B\u5F55 </button></div>`);
      if (loginType.value === "phone") {
        _push(`<div class="login-form" data-v-4946a766><div class="form-group" data-v-4946a766><div class="input-wrapper" data-v-4946a766><svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-4946a766><rect x="3" y="4" width="18" height="18" rx="2" ry="2" data-v-4946a766></rect><line x1="16" y1="2" x2="16" y2="6" data-v-4946a766></line><line x1="8" y1="2" x2="8" y2="6" data-v-4946a766></line><line x1="3" y1="10" x2="21" y2="10" data-v-4946a766></line></svg><input${ssrRenderAttr("value", form.value.mobile)} type="tel" class="form-input" placeholder="\u8BF7\u8F93\u5165\u624B\u673A\u53F7" maxlength="11" data-v-4946a766></div></div><div class="form-group" data-v-4946a766><div class="input-wrapper" data-v-4946a766><svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-4946a766><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" data-v-4946a766></path></svg><input${ssrRenderAttr("value", form.value.code)} type="text" class="form-input" placeholder="\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801" maxlength="6" data-v-4946a766><button type="button" class="sms-btn"${ssrIncludeBooleanAttr(smsDisabled.value) ? " disabled" : ""} data-v-4946a766>${ssrInterpolate(smsText.value)}</button></div></div><button type="button" class="login-btn"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} data-v-4946a766>`);
        if (loading.value) {
          _push(`<span data-v-4946a766>\u767B\u5F55\u4E2D...</span>`);
        } else {
          _push(`<span data-v-4946a766>\u767B\u5F55</span>`);
        }
        _push(`</button></div>`);
      } else if (loginType.value === "password") {
        _push(`<div class="login-form" data-v-4946a766><div class="form-group" data-v-4946a766><div class="input-wrapper" data-v-4946a766><svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-4946a766><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" data-v-4946a766></path><circle cx="12" cy="7" r="4" data-v-4946a766></circle></svg><input${ssrRenderAttr("value", form.value.username)} type="text" class="form-input" placeholder="\u8BF7\u8F93\u5165\u7528\u6237\u540D/\u624B\u673A\u53F7" data-v-4946a766></div></div><div class="form-group" data-v-4946a766><div class="input-wrapper" data-v-4946a766><svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-4946a766><rect x="3" y="11" width="18" height="11" rx="2" ry="2" data-v-4946a766></rect><path d="M7 11V7a5 5 0 0 1 10 0v4" data-v-4946a766></path></svg><input${ssrRenderAttr("value", form.value.password)} type="password" class="form-input" placeholder="\u8BF7\u8F93\u5165\u5BC6\u7801" data-v-4946a766></div></div><button type="button" class="login-btn"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} data-v-4946a766>`);
        if (loading.value) {
          _push(`<span data-v-4946a766>\u767B\u5F55\u4E2D...</span>`);
        } else {
          _push(`<span data-v-4946a766>\u767B\u5F55</span>`);
        }
        _push(`</button></div>`);
      } else {
        _push(`<div class="qrcode-section" data-v-4946a766><div class="qrcode-wrapper" data-v-4946a766>`);
        if (qrLoading.value) {
          _push(`<div class="qrcode-loading" data-v-4946a766><div class="spinner" data-v-4946a766></div><p data-v-4946a766>\u6B63\u5728\u83B7\u53D6\u4E8C\u7EF4\u7801...</p></div>`);
        } else if (qrError.value) {
          _push(`<div class="qrcode-error" data-v-4946a766><p data-v-4946a766>${ssrInterpolate(qrError.value)}</p><button class="retry-btn" data-v-4946a766>\u91CD\u65B0\u83B7\u53D6</button></div>`);
        } else {
          _push(`<div class="qrcode-content" data-v-4946a766>`);
          if (qrCodeUrl.value) {
            _push(`<div class="qrcode-display" data-v-4946a766><a${ssrRenderAttr("href", qrCodeUrl.value)} target="_blank" class="qrcode-link" data-v-4946a766><img${ssrRenderAttr("src", `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrCodeUrl.value)}`)} alt="\u5FAE\u4FE1\u626B\u7801\u767B\u5F55" class="qrcode-image" data-v-4946a766></a><p class="qrcode-hint" data-v-4946a766>\u70B9\u51FB\u4E8C\u7EF4\u7801\u5728\u65B0\u7A97\u53E3\u6253\u5F00\u5FAE\u4FE1\u767B\u5F55</p></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="qrcode-status" data-v-4946a766>`);
          if (scanStatus.value === "waiting") {
            _push(`<p class="status-waiting" data-v-4946a766><span class="icon" data-v-4946a766>\u{1F4F1}</span> \u8BF7\u4F7F\u7528\u5FAE\u4FE1\u626B\u63CF\u4E8C\u7EF4\u7801\u767B\u5F55 </p>`);
          } else if (scanStatus.value === "scanned") {
            _push(`<p class="status-scanned" data-v-4946a766><span class="icon" data-v-4946a766>\u2705</span> \u5DF2\u626B\u63CF\uFF0C\u8BF7\u5728\u624B\u673A\u4E0A\u786E\u8BA4\u767B\u5F55 </p>`);
          } else if (scanStatus.value === "expired") {
            _push(`<p class="status-expired" data-v-4946a766><span class="icon" data-v-4946a766>\u23F0</span> \u4E8C\u7EF4\u7801\u5DF2\u8FC7\u671F <button class="refresh-btn" data-v-4946a766>\u5237\u65B0\u4E8C\u7EF4\u7801</button></p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          if (scanStatus.value === "waiting" && qrExpiresIn.value > 0) {
            _push(`<div class="qrcode-timer" data-v-4946a766><span data-v-4946a766>\u6709\u6548\u671F\uFF1A</span><span class="timer-value" data-v-4946a766>${ssrInterpolate(formatTime(qrExpiresIn.value))}</span></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        }
        _push(`</div></div>`);
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
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4946a766"]]);

export { index as default };
//# sourceMappingURL=index-BzgFwKK0.mjs.map
