import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
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
    const totalExams = ref(8);
    const avgScore = ref("85\u5206");
    const passedCount = ref(6);
    const certification = ref("3\u9879");
    const exams = ref([
      {
        id: 1,
        icon: "\u{1F4DD}",
        title: "\u4E2D\u533B\u57FA\u7840\u7406\u8BBA\u8003\u6838",
        desc: "\u8003\u6838\u4E2D\u533B\u57FA\u7840\u7406\u8BBA\u77E5\u8BC6\u638C\u63E1\u7A0B\u5EA6",
        duration: 60,
        questions: 50,
        passScore: 60,
        status: "completed"
      },
      {
        id: 2,
        icon: "\u{1F489}",
        title: "\u9488\u7078\u5B66\u4E13\u4E1A\u8003\u6838",
        desc: "\u8003\u6838\u9488\u7078\u5B66\u7406\u8BBA\u4E0E\u5B9E\u64CD\u77E5\u8BC6",
        duration: 90,
        questions: 60,
        passScore: 60,
        status: "completed"
      },
      {
        id: 3,
        icon: "\u{1F33F}",
        title: "\u4E2D\u836F\u5B66\u77E5\u8BC6\u8003\u6838",
        desc: "\u8003\u6838\u4E2D\u836F\u57FA\u7840\u77E5\u8BC6\u4E0E\u65B9\u5242\u914D\u4F0D",
        duration: 60,
        questions: 40,
        passScore: 60,
        status: "in-progress"
      },
      {
        id: 4,
        icon: "\u{1F469}\u2695\uFE0F",
        title: "\u4E2D\u533B\u8BCA\u65AD\u5B66\u8003\u6838",
        desc: "\u8003\u6838\u671B\u95FB\u95EE\u5207\u56DB\u8BCA\u65B9\u6CD5\u4E0E\u8FA8\u8BC1\u8BBA\u6CBB",
        duration: 90,
        questions: 50,
        passScore: 60,
        status: "pending"
      },
      {
        id: 5,
        icon: "\u{1F4DA}",
        title: "\u4E2D\u533B\u7ECF\u5178\u8457\u4F5C\u8003\u6838",
        desc: "\u8003\u6838\u9EC4\u5E1D\u5185\u7ECF\u3001\u4F24\u5BD2\u8BBA\u7B49\u7ECF\u5178\u77E5\u8BC6",
        duration: 120,
        questions: 80,
        passScore: 60,
        status: "pending"
      }
    ]);
    const certifications = ref([
      { id: 1, icon: "\u{1F3C6}", title: "\u4E2D\u533B\u57FA\u7840\u7406\u8BBA\u8BC1\u4E66", date: "2024-01-10" },
      { id: 2, icon: "\u{1F396}\uFE0F", title: "\u9488\u7078\u5B66\u4E13\u4E1A\u8BC1\u4E66", date: "2024-01-15" },
      { id: 3, icon: "\u2B50", title: "\u4F18\u79C0\u5B66\u5458\u8BC1\u4E66", date: "2024-01-20" }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "exam-page" }, _attrs))} data-v-a04f789d><div class="container" data-v-a04f789d><div class="page-header" data-v-a04f789d><h1 class="page-title" data-v-a04f789d>\u5728\u7EBF\u8003\u6838</h1><p class="page-desc" data-v-a04f789d>\u68C0\u9A8C\u5B66\u4E60\u6210\u679C\uFF0C\u5DE9\u56FA\u77E5\u8BC6\u8981\u70B9</p></div><div class="exam-stats" data-v-a04f789d><div class="stat-card" data-v-a04f789d><span class="stat-value" data-v-a04f789d>${ssrInterpolate(totalExams.value)}</span><span class="stat-label" data-v-a04f789d>\u5DF2\u53C2\u52A0\u8003\u6838</span></div><div class="stat-card" data-v-a04f789d><span class="stat-value" data-v-a04f789d>${ssrInterpolate(avgScore.value)}</span><span class="stat-label" data-v-a04f789d>\u5E73\u5747\u6210\u7EE9</span></div><div class="stat-card" data-v-a04f789d><span class="stat-value" data-v-a04f789d>${ssrInterpolate(passedCount.value)}</span><span class="stat-label" data-v-a04f789d>\u901A\u8FC7\u8003\u6838</span></div><div class="stat-card" data-v-a04f789d><span class="stat-value" data-v-a04f789d>${ssrInterpolate(certification.value)}</span><span class="stat-label" data-v-a04f789d>\u83B7\u5F97\u8BC1\u4E66</span></div></div><div class="exam-list" data-v-a04f789d><!--[-->`);
      ssrRenderList(exams.value, (exam) => {
        _push(`<div class="exam-card" data-v-a04f789d><div class="exam-icon" data-v-a04f789d>${ssrInterpolate(exam.icon)}</div><div class="exam-info" data-v-a04f789d><h3 class="exam-title" data-v-a04f789d>${ssrInterpolate(exam.title)}</h3><p class="exam-desc" data-v-a04f789d>${ssrInterpolate(exam.desc)}</p><div class="exam-meta" data-v-a04f789d><span class="exam-duration" data-v-a04f789d>${ssrInterpolate(exam.duration)}\u5206\u949F</span><span class="exam-questions" data-v-a04f789d>${ssrInterpolate(exam.questions)}\u9053\u9898</span><span class="exam-pass" data-v-a04f789d>\u53CA\u683C\u7EBF: ${ssrInterpolate(exam.passScore)}\u5206</span></div></div><div class="exam-status" data-v-a04f789d>`);
        if (exam.status === "completed") {
          _push(`<span class="status-completed" data-v-a04f789d>\u5DF2\u5B8C\u6210</span>`);
        } else if (exam.status === "in-progress") {
          _push(`<span class="status-progress" data-v-a04f789d>\u8FDB\u884C\u4E2D</span>`);
        } else {
          _push(`<span class="status-pending" data-v-a04f789d>\u5F85\u5F00\u59CB</span>`);
        }
        _push(`</div></div>`);
      });
      _push(`<!--]--></div><div class="certification-section" data-v-a04f789d><h3 class="section-title" data-v-a04f789d>\u6211\u7684\u8BC1\u4E66</h3><div class="cert-list" data-v-a04f789d><!--[-->`);
      ssrRenderList(certifications.value, (cert) => {
        _push(`<div class="cert-card" data-v-a04f789d><div class="cert-badge" data-v-a04f789d>${ssrInterpolate(cert.icon)}</div><div class="cert-info" data-v-a04f789d><h4 class="cert-title" data-v-a04f789d>${ssrInterpolate(cert.title)}</h4><span class="cert-date" data-v-a04f789d>${ssrInterpolate(cert.date)}</span></div></div>`);
      });
      _push(`<!--]--></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/exam/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a04f789d"]]);

export { index as default };
//# sourceMappingURL=index-D628xTKR.mjs.map
