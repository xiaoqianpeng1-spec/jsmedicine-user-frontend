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
    const selectedType = ref("all");
    const consultTypes = [
      { id: "all", icon: "\u{1F3E5}", name: "\u5168\u90E8" },
      { id: "internal", icon: "\u{1FA7A}", name: "\u5185\u79D1" },
      { id: "gynecology", icon: "\u{1F338}", name: "\u5987\u79D1" },
      { id: "pediatrics", icon: "\u{1F476}", name: "\u513F\u79D1" },
      { id: "acupuncture", icon: "\u{1F489}", name: "\u9488\u7078" },
      { id: "massage", icon: "\u{1F486}", name: "\u63A8\u62FF" }
    ];
    const doctors = ref([
      {
        id: 1,
        avatar: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20doctor%20portrait%20professional&image_size=square",
        name: "\u5F20\u660E\u534E",
        title: "\u4E3B\u4EFB\u533B\u5E08",
        department: "\u4E2D\u533B\u5185\u79D1",
        specialty: "\u64C5\u957F\u6CBB\u7597\u6D88\u5316\u7CFB\u7EDF\u75BE\u75C5\u3001\u6162\u6027\u80C3\u708E\u3001\u80C3\u6E83\u75A1\u7B49",
        rating: 4.9,
        consultCount: 2580,
        responseTime: 15,
        status: "\u5728\u7EBF",
        statusClass: "online"
      },
      {
        id: 2,
        avatar: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20female%20doctor%20portrait&image_size=square",
        name: "\u674E\u79C0\u73CD",
        title: "\u526F\u4E3B\u4EFB\u533B\u5E08",
        department: "\u4E2D\u533B\u5987\u79D1",
        specialty: "\u64C5\u957F\u6CBB\u7597\u6708\u7ECF\u4E0D\u8C03\u3001\u75DB\u7ECF\u3001\u5987\u79D1\u708E\u75C7\u7B49",
        rating: 4.8,
        consultCount: 1890,
        responseTime: 20,
        status: "\u5728\u7EBF",
        statusClass: "online"
      },
      {
        id: 3,
        avatar: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20male%20doctor%20portrait&image_size=square",
        name: "\u738B\u5EFA\u56FD",
        title: "\u4E3B\u6CBB\u533B\u5E08",
        department: "\u9488\u7078\u79D1",
        specialty: "\u64C5\u957F\u6CBB\u7597\u9888\u690E\u75C5\u3001\u8170\u690E\u95F4\u76D8\u7A81\u51FA\u3001\u9762\u762B\u7B49",
        rating: 4.7,
        consultCount: 1250,
        responseTime: 25,
        status: "\u5FD9\u788C",
        statusClass: "busy"
      },
      {
        id: 4,
        avatar: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20senior%20doctor%20portrait&image_size=square",
        name: "\u9648\u7389\u534E",
        title: "\u4E3B\u4EFB\u533B\u5E08",
        department: "\u4E2D\u533B\u513F\u79D1",
        specialty: "\u64C5\u957F\u6CBB\u7597\u5C0F\u513F\u611F\u5192\u3001\u54B3\u55FD\u3001\u6D88\u5316\u4E0D\u826F\u7B49",
        rating: 4.9,
        consultCount: 3120,
        responseTime: 12,
        status: "\u5728\u7EBF",
        statusClass: "online"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "consult-page" }, _attrs))} data-v-8662d5e0><div class="container" data-v-8662d5e0><div class="page-header" data-v-8662d5e0><h1 class="page-title" data-v-8662d5e0>\u4E13\u5BB6\u54A8\u8BE2</h1><p class="page-desc" data-v-8662d5e0>\u4E13\u4E1A\u95EE\u9898\u54A8\u8BE2\uFF0C\u540D\u5E08\u5728\u7EBF\u89E3\u7B54</p></div><div class="consult-types" data-v-8662d5e0><!--[-->`);
      ssrRenderList(consultTypes, (type) => {
        _push(`<div class="${ssrRenderClass([{ active: selectedType.value === type.id }, "consult-type-card"])}" data-v-8662d5e0><span class="type-icon" data-v-8662d5e0>${ssrInterpolate(type.icon)}</span><span class="type-name" data-v-8662d5e0>${ssrInterpolate(type.name)}</span></div>`);
      });
      _push(`<!--]--></div><div class="doctors-list" data-v-8662d5e0><!--[-->`);
      ssrRenderList(doctors.value, (doctor) => {
        _push(`<div class="doctor-card" data-v-8662d5e0><div class="doctor-avatar" data-v-8662d5e0><img${ssrRenderAttr("src", doctor.avatar)}${ssrRenderAttr("alt", doctor.name)} data-v-8662d5e0><span class="${ssrRenderClass([doctor.statusClass, "doctor-status"])}" data-v-8662d5e0>${ssrInterpolate(doctor.status)}</span></div><div class="doctor-info" data-v-8662d5e0><div class="doctor-header" data-v-8662d5e0><h3 class="doctor-name" data-v-8662d5e0>${ssrInterpolate(doctor.name)}</h3><span class="doctor-title" data-v-8662d5e0>${ssrInterpolate(doctor.title)}</span></div><p class="doctor-department" data-v-8662d5e0>${ssrInterpolate(doctor.department)}</p><p class="doctor-specialty" data-v-8662d5e0>${ssrInterpolate(doctor.specialty)}</p><div class="doctor-stats" data-v-8662d5e0><span class="stat-item" data-v-8662d5e0>\u2B50 ${ssrInterpolate(doctor.rating)}</span><span class="stat-item" data-v-8662d5e0>\u{1F465} ${ssrInterpolate(doctor.consultCount)} \u6B21\u54A8\u8BE2</span><span class="stat-item" data-v-8662d5e0>\u23F1\uFE0F ${ssrInterpolate(doctor.responseTime)}\u5206\u949F</span></div></div><div class="consult-btn" data-v-8662d5e0><span data-v-8662d5e0>\u54A8\u8BE2</span></div></div>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/consult/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8662d5e0"]]);

export { index as default };
//# sourceMappingURL=index-BpjxhnF5.mjs.map
