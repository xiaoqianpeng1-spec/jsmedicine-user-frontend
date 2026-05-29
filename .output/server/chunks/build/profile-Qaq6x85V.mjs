import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
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
  __name: "profile",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    useUserStore();
    const activeNav = ref("favorites");
    const user = ref({
      name: "\u5468\u67D0",
      avatar: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20cat%20avatar%20portrait%20simple&image_size=square",
      role: "\u5B66\u5458",
      motto: "\u52A0\u6CB9\uFF01\uFF01",
      gender: "\u7537",
      phone: "18812334561",
      education: "\u4E13\u79D1",
      city: "\u6C5F\u82CF\u7701\u5357\u4EAC\u5E02\u5E02\u8F96\u533A",
      company: "\u6C5F\u82CF\u51E4\u51F0\u79D1\u5B66\u79D1\u6280\u51FA\u7248\u793E"
    });
    const navItems = [
      { id: "favorites", icon: "\u2B50", label: "\u6211\u7684\u6536\u85CF" },
      { id: "history", icon: "\u{1F441}\uFE0F", label: "\u6D4F\u89C8\u8BB0\u5F55" },
      { id: "questions", icon: "\u{1F4AC}", label: "\u6211\u7684\u95EE\u7B54" },
      { id: "exams", icon: "\u{1F4DD}", label: "\u6211\u7684\u8003\u6838" },
      { id: "stats", icon: "\u{1F4CA}", label: "\u5B66\u4E60\u7EDF\u8BA1" },
      { id: "edit", icon: "\u270F\uFE0F", label: "\u7F16\u8F91\u8D44\u6599" }
    ];
    const favorites = ref([
      { id: 1, title: "\u4E2D\u533B\u57FA\u7840\u7406\u8BBA\u7CBE\u8BB2", type: "\u89C6\u9891\u8BFE\u7A0B", image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20video%20thumbnail&image_size=square" },
      { id: 2, title: "\u9488\u7078\u6280\u6CD5\u4E0E\u4E34\u5E8A\u5E94\u7528", type: "\u4E13\u9898\u8BFE\u7A0B", image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=acupuncture%20video%20thumbnail&image_size=square" },
      { id: 3, title: "\u9EC4\u5E1D\u5185\u7ECF\u89E3\u8BFB", type: "\u97F3\u9891\u8BFE\u7A0B", image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20audio%20cover&image_size=square" }
    ]);
    const history = ref([
      { id: 1, title: "\u4E2D\u533B\u8BCA\u65AD\u5B66\u7CBE\u8981", time: "2024-01-15 14:30", image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20diagnosis&image_size=square" },
      { id: 2, title: "\u4E2D\u836F\u65B9\u5242\u5B66\u4E13\u9898", time: "2024-01-14 10:00", image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20herbs%20prescription&image_size=square" },
      { id: 3, title: "\u63A8\u62FF\u624B\u6CD5\u6559\u5B66", time: "2024-01-13 16:45", image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20massage%20therapy&image_size=square" }
    ]);
    const questions = ref([
      { id: 1, title: "\u5173\u4E8E\u4E2D\u836F\u914D\u4F0D\u7684\u7591\u95EE", desc: '\u8BF7\u95EE\u4E2D\u836F\u914D\u4F0D\u4E2D"\u5341\u516B\u53CD"\u7684\u5177\u4F53\u5185\u5BB9\u662F\u4EC0\u4E48\uFF1F', status: "\u5DF2\u56DE\u7B54", statusClass: "answered" },
      { id: 2, title: "\u9488\u7078\u6CBB\u7597\u9762\u762B\u7684\u7597\u7A0B", desc: "\u9762\u762B\u60A3\u8005\u9488\u7078\u6CBB\u7597\u4E00\u822C\u9700\u8981\u591A\u957F\u65F6\u95F4\uFF1F", status: "\u5F85\u56DE\u7B54", statusClass: "pending" },
      { id: 3, title: "\u4E2D\u533B\u5982\u4F55\u8C03\u7406\u813E\u80C3\u865A\u5F31", desc: "\u813E\u80C3\u865A\u5F31\u7684\u4EBA\u5E94\u8BE5\u5982\u4F55\u8FDB\u884C\u4E2D\u533B\u8C03\u7406\uFF1F", status: "\u56DE\u7B54\u4E2D", statusClass: "progress" }
    ]);
    const myExams = ref([
      { id: 1, title: "\u4E2D\u533B\u57FA\u7840\u7406\u8BBA\u8003\u6838", date: "2024-01-10", score: "92", grade: "\u4F18\u79C0", gradeClass: "excellent" },
      { id: 2, title: "\u9488\u7078\u5B66\u4E13\u4E1A\u8003\u6838", date: "2024-01-15", score: "85", grade: "\u826F\u597D", gradeClass: "good" },
      { id: 3, title: "\u4E2D\u836F\u5B66\u77E5\u8BC6\u8003\u6838", date: "2024-01-20", score: "78", grade: "\u53CA\u683C", gradeClass: "pass" }
    ]);
    const stats = ref({
      totalHours: "48",
      completedCourses: "12",
      completedExams: "6",
      questionsAsked: "8"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "profile-page" }, _attrs))} data-v-cdfee724><div class="container" data-v-cdfee724><div class="profile-layout" data-v-cdfee724><aside class="sidebar" data-v-cdfee724><div class="user-card" data-v-cdfee724><div class="avatar-wrapper" data-v-cdfee724><img${ssrRenderAttr("src", user.value.avatar)}${ssrRenderAttr("alt", user.value.name)} class="avatar" data-v-cdfee724><span class="role-badge" data-v-cdfee724>${ssrInterpolate(user.value.role)}</span></div><h2 class="user-name" data-v-cdfee724>${ssrInterpolate(user.value.name)}</h2><p class="user-motto" data-v-cdfee724>${ssrInterpolate(user.value.motto)}</p><div class="user-actions" data-v-cdfee724><button class="action-btn edit-btn" data-v-cdfee724>\u7F16\u8F91\u8D44\u6599</button><button class="action-btn logout-btn" data-v-cdfee724>\u9000\u51FA\u767B\u5F55</button></div></div><nav class="sidebar-nav" data-v-cdfee724><ul data-v-cdfee724><!--[-->`);
      ssrRenderList(navItems, (item) => {
        _push(`<li class="${ssrRenderClass([{ active: activeNav.value === item.id }, "nav-item"])}" data-v-cdfee724><span class="nav-icon" data-v-cdfee724>${ssrInterpolate(item.icon)}</span><span class="nav-label" data-v-cdfee724>${ssrInterpolate(item.label)}</span></li>`);
      });
      _push(`<!--]--></ul></nav></aside><main class="main-content" data-v-cdfee724><div class="breadcrumb" data-v-cdfee724><span data-v-cdfee724>\u60A8\u7684\u4F4D\u7F6E\uFF1A\u9996\u9875 &gt; \u4E2A\u4EBA\u4E2D\u5FC3</span></div>`);
      if (activeNav.value === "favorites") {
        _push(`<div class="content-section" data-v-cdfee724><h3 class="section-title" data-v-cdfee724>\u6211\u7684\u6536\u85CF</h3><div class="favorites-list" data-v-cdfee724><!--[-->`);
        ssrRenderList(favorites.value, (item) => {
          _push(`<div class="favorite-item" data-v-cdfee724><img${ssrRenderAttr("src", item.image)}${ssrRenderAttr("alt", item.title)} class="favorite-image" data-v-cdfee724><div class="favorite-info" data-v-cdfee724><h4 class="favorite-title" data-v-cdfee724>${ssrInterpolate(item.title)}</h4><span class="favorite-type" data-v-cdfee724>${ssrInterpolate(item.type)}</span></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else if (activeNav.value === "history") {
        _push(`<div class="content-section" data-v-cdfee724><h3 class="section-title" data-v-cdfee724>\u6D4F\u89C8\u8BB0\u5F55</h3><div class="history-list" data-v-cdfee724><!--[-->`);
        ssrRenderList(history.value, (item) => {
          _push(`<div class="history-item" data-v-cdfee724><img${ssrRenderAttr("src", item.image)}${ssrRenderAttr("alt", item.title)} class="history-image" data-v-cdfee724><div class="history-info" data-v-cdfee724><h4 class="history-title" data-v-cdfee724>${ssrInterpolate(item.title)}</h4><span class="history-time" data-v-cdfee724>${ssrInterpolate(item.time)}</span></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else if (activeNav.value === "questions") {
        _push(`<div class="content-section" data-v-cdfee724><h3 class="section-title" data-v-cdfee724>\u6211\u7684\u95EE\u7B54</h3><div class="questions-list" data-v-cdfee724><!--[-->`);
        ssrRenderList(questions.value, (item) => {
          _push(`<div class="question-item" data-v-cdfee724><div class="question-content" data-v-cdfee724><h4 class="question-title" data-v-cdfee724>${ssrInterpolate(item.title)}</h4><p class="question-desc" data-v-cdfee724>${ssrInterpolate(item.desc)}</p></div><div class="${ssrRenderClass([item.statusClass, "question-status"])}" data-v-cdfee724>${ssrInterpolate(item.status)}</div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else if (activeNav.value === "exams") {
        _push(`<div class="content-section" data-v-cdfee724><h3 class="section-title" data-v-cdfee724>\u6211\u7684\u8003\u6838</h3><div class="exams-list" data-v-cdfee724><!--[-->`);
        ssrRenderList(myExams.value, (item) => {
          _push(`<div class="exam-item" data-v-cdfee724><div class="exam-info" data-v-cdfee724><h4 class="exam-title" data-v-cdfee724>${ssrInterpolate(item.title)}</h4><span class="exam-date" data-v-cdfee724>${ssrInterpolate(item.date)}</span></div><div class="exam-result" data-v-cdfee724><span class="exam-score" data-v-cdfee724>${ssrInterpolate(item.score)}</span><span class="${ssrRenderClass([item.gradeClass, "exam-grade"])}" data-v-cdfee724>${ssrInterpolate(item.grade)}</span></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else if (activeNav.value === "stats") {
        _push(`<div class="content-section" data-v-cdfee724><h3 class="section-title" data-v-cdfee724>\u5B66\u4E60\u7EDF\u8BA1</h3><div class="stats-grid" data-v-cdfee724><div class="stat-item" data-v-cdfee724><span class="stat-icon" data-v-cdfee724>\u{1F4DA}</span><div class="stat-info" data-v-cdfee724><span class="stat-value" data-v-cdfee724>${ssrInterpolate(stats.value.totalHours)}</span><span class="stat-label" data-v-cdfee724>\u5B66\u4E60\u65F6\u957F(\u5C0F\u65F6)</span></div></div><div class="stat-item" data-v-cdfee724><span class="stat-icon" data-v-cdfee724>\u{1F3AC}</span><div class="stat-info" data-v-cdfee724><span class="stat-value" data-v-cdfee724>${ssrInterpolate(stats.value.completedCourses)}</span><span class="stat-label" data-v-cdfee724>\u5B8C\u6210\u8BFE\u7A0B</span></div></div><div class="stat-item" data-v-cdfee724><span class="stat-icon" data-v-cdfee724>\u2713</span><div class="stat-info" data-v-cdfee724><span class="stat-value" data-v-cdfee724>${ssrInterpolate(stats.value.completedExams)}</span><span class="stat-label" data-v-cdfee724>\u5B8C\u6210\u8003\u6838</span></div></div><div class="stat-item" data-v-cdfee724><span class="stat-icon" data-v-cdfee724>\u{1F4AC}</span><div class="stat-info" data-v-cdfee724><span class="stat-value" data-v-cdfee724>${ssrInterpolate(stats.value.questionsAsked)}</span><span class="stat-label" data-v-cdfee724>\u63D0\u95EE\u6B21\u6570</span></div></div></div></div>`);
      } else if (activeNav.value === "edit") {
        _push(`<div class="content-section" data-v-cdfee724><h3 class="section-title" data-v-cdfee724>\u4FEE\u6539\u8D44\u6599</h3><form class="edit-form" data-v-cdfee724><div class="form-group" data-v-cdfee724><label class="form-label" data-v-cdfee724>\u5934\u50CF</label><div class="avatar-upload" data-v-cdfee724><img${ssrRenderAttr("src", user.value.avatar)} class="upload-avatar" data-v-cdfee724><span class="upload-btn" data-v-cdfee724>\u{1F4F7}</span></div></div><div class="form-row" data-v-cdfee724><div class="form-group" data-v-cdfee724><label class="form-label" data-v-cdfee724>\u6027\u522B</label><span class="form-value" data-v-cdfee724>${ssrInterpolate(user.value.gender)}</span></div><div class="form-group" data-v-cdfee724><label class="form-label" data-v-cdfee724>\u6635\u79F0</label><span class="form-value" data-v-cdfee724>${ssrInterpolate(user.value.name)}</span></div></div><div class="form-group" data-v-cdfee724><label class="form-label" data-v-cdfee724>\u7535\u8BDD</label><span class="form-value" data-v-cdfee724>${ssrInterpolate(user.value.phone)}</span></div><div class="form-group" data-v-cdfee724><label class="form-label" data-v-cdfee724>\u8EAB\u4EFD</label><span class="form-value" data-v-cdfee724>${ssrInterpolate(user.value.role)}</span></div><div class="form-group" data-v-cdfee724><label class="form-label" data-v-cdfee724>\u53E3\u53F7</label><input${ssrRenderAttr("value", user.value.motto)} type="text" class="form-input" placeholder="\u8BF7\u8F93\u5165\u53E3\u53F7(15\u5B57\u4EE5\u5185)" maxlength="15" data-v-cdfee724></div><div class="form-row" data-v-cdfee724><div class="form-group" data-v-cdfee724><label class="form-label" data-v-cdfee724>\u5B66\u5386</label><span class="form-value" data-v-cdfee724>${ssrInterpolate(user.value.education)}</span></div><div class="form-group" data-v-cdfee724><label class="form-label" data-v-cdfee724>\u57CE\u5E02</label><span class="form-value" data-v-cdfee724>${ssrInterpolate(user.value.city)}</span></div></div><div class="form-group" data-v-cdfee724><label class="form-label" data-v-cdfee724>\u5355\u4F4D</label><span class="form-value" data-v-cdfee724>${ssrInterpolate(user.value.company)}</span></div><button type="submit" class="submit-btn" data-v-cdfee724>\u4FDD\u5B58\u4FEE\u6539</button></form></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</main></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const profile = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cdfee724"]]);

export { profile as default };
//# sourceMappingURL=profile-Qaq6x85V.mjs.map
