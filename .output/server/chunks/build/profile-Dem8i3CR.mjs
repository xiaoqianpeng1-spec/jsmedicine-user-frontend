import { defineComponent, ref, computed, watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { b as useRouter, d as useUserStore, s as storeToRefs } from './server.mjs';
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

const defaultAvatar = "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20cat%20avatar%20portrait%20simple&image_size=square";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "profile",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const userStore = useUserStore();
    const { userInfo } = storeToRefs(userStore);
    userStore.loadFromCookie();
    userStore.initFromStorage();
    const activeMenu = ref("collect");
    const currentField = ref("");
    ref(null);
    const initEditForm = () => {
      return {
        avatar: userInfo.value.avatar || "",
        nickname: userInfo.value.nickname || userInfo.value.username || "",
        mobile: userInfo.value.mobile || "",
        role: userInfo.value.role || "",
        motto: userInfo.value.motto || "",
        gender: userInfo.value.gender || "",
        education: userInfo.value.education || "",
        city: userInfo.value.city || "",
        company: userInfo.value.company || ""
      };
    };
    const editForm = ref(initEditForm());
    const syncEditForm = () => {
      editForm.value = initEditForm();
    };
    const displayInfo = computed(() => {
      if (activeMenu.value === "edit") {
        return {
          avatar: editForm.value.avatar || defaultAvatar,
          nickname: editForm.value.nickname || editForm.value.username || "\u672A\u8BBE\u7F6E\u6635\u79F0",
          role: editForm.value.role || "\u5B66\u5458",
          motto: editForm.value.motto || "\u5B66\u4E60\u53E3\u53F7\uFF1A\u52A0\u6CB9\uFF01\uFF01"
        };
      }
      return {
        avatar: userInfo.value.avatar || defaultAvatar,
        nickname: userInfo.value.nickname || userInfo.value.username || "\u672A\u8BBE\u7F6E\u6635\u79F0",
        role: userInfo.value.role || "\u5B66\u5458",
        motto: userInfo.value.motto || "\u5B66\u4E60\u53E3\u53F7\uFF1A\u52A0\u6CB9\uFF01\uFF01"
      };
    });
    watch(userInfo, () => {
      syncEditForm();
    }, { immediate: true, deep: true });
    const navList = ref([
      { id: "collect", icon: "icon-star", label: "\u6211\u7684\u6536\u85CF" },
      { id: "history", icon: "icon-eye", label: "\u6D4F\u89C8\u8BB0\u5F55" },
      { id: "question", icon: "icon-chat", label: "\u6211\u7684\u95EE\u7B54" },
      { id: "exam", icon: "icon-file", label: "\u6211\u7684\u8003\u6838" },
      { id: "stat", icon: "icon-bar", label: "\u5B66\u4E60\u7EDF\u8BA1" },
      { id: "edit", icon: "icon-edit", label: "\u7F16\u8F91\u8D44\u6599" }
    ]);
    const collectList = ref([
      { id: 1, title: "\u4E2D\u533B\u57FA\u7840\u7406\u8BBA\u7CBE\u8BB2", type: "\u89C6\u9891\u8BFE\u7A0B", image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=course1&image_size=square" },
      { id: 2, title: "\u9488\u7078\u6280\u6CD5\u4E0E\u4E34\u5E8A\u5E94\u7528", type: "\u4E13\u9898\u8BFE\u7A0B", image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=course2&image_size=square" },
      { id: 3, title: "\u9EC4\u5E1D\u5185\u7ECF\u89E3\u8BFB", type: "\u97F3\u9891\u8BFE\u7A0B", image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=course3&image_size=square" }
    ]);
    const historyList = ref([
      { id: 1, title: "\u4E2D\u533B\u8BCA\u65AD\u5B66\u7CBE\u8981", time: "2024-01-15 14:30", image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=doc1&image_size=square" },
      { id: 2, title: "\u4E2D\u836F\u65B9\u5242\u5B66\u4E13\u9898", time: "2024-01-14 10:00", image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=doc2&image_size=square" }
    ]);
    const questionList = ref([
      { id: 1, title: "\u4E2D\u836F\u914D\u4F0D\u76F8\u5173\u95EE\u9898", desc: "\u8BF7\u95EE\u5341\u516B\u53CD\u5177\u4F53\u5185\u5BB9\u662F\u4EC0\u4E48\uFF1F", status: "\u5DF2\u56DE\u7B54", statusClass: "ok" },
      { id: 2, title: "\u9488\u7078\u7597\u7A0B\u54A8\u8BE2", desc: "\u9762\u762B\u9488\u7078\u9700\u8981\u591A\u4E45\u6062\u590D\uFF1F", status: "\u5F85\u56DE\u7B54", statusClass: "wait" }
    ]);
    const examList = ref([
      { id: 1, title: "\u4E2D\u533B\u57FA\u7840\u7406\u8BBA\u8003\u6838", date: "2024-01-10", score: "92", grade: "\u4F18\u79C0", gradeClass: "excellent" },
      { id: 2, title: "\u9488\u7078\u5B66\u8003\u6838", date: "2024-01-15", score: "85", grade: "\u826F\u597D", gradeClass: "good" }
    ]);
    const statList = ref([
      { id: 1, icon: "\u25A4", value: "48", label: "\u5B66\u4E60\u65F6\u957F(\u5C0F\u65F6)" },
      { id: 2, icon: "\u25A2", value: "12", label: "\u5B8C\u6210\u8BFE\u7A0B" },
      { id: 3, icon: "\u2713", value: "6", label: "\u5B8C\u6210\u8003\u6838" },
      { id: 4, icon: "\u25A3", value: "8", label: "\u63D0\u95EE\u6B21\u6570" }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "profile-page" }, _attrs))} data-v-740f27b4><div class="container" data-v-740f27b4><div class="profile-layout" data-v-740f27b4><aside class="sidebar" data-v-740f27b4><div class="user-card" data-v-740f27b4><div class="avatar-box" data-v-740f27b4><img${ssrRenderAttr("src", displayInfo.value.avatar)} alt="\u5934\u50CF" class="avatar" data-v-740f27b4><span class="role-tag" data-v-740f27b4>${ssrInterpolate(displayInfo.value.role)}</span></div><h2 class="username" data-v-740f27b4>${ssrInterpolate(displayInfo.value.nickname)}</h2><p class="motto" data-v-740f27b4>${ssrInterpolate(displayInfo.value.motto)}</p><div class="btn-group" data-v-740f27b4><button class="btn edit-btn" data-v-740f27b4>\u7F16\u8F91\u8D44\u6599</button><button class="btn logout-btn" data-v-740f27b4>\u9000\u51FA\u767B\u5F55</button></div></div><nav class="side-nav" data-v-740f27b4><ul data-v-740f27b4><!--[-->`);
      ssrRenderList(navList.value, (item) => {
        _push(`<li class="${ssrRenderClass([{ active: activeMenu.value === item.id }, "nav-item"])}" data-v-740f27b4><span class="${ssrRenderClass([item.icon, "icon-wrap"])}" data-v-740f27b4></span><span class="text" data-v-740f27b4>${ssrInterpolate(item.label)}</span></li>`);
      });
      _push(`<!--]--></ul></nav></aside><main class="main" data-v-740f27b4><div class="breadcrumb" data-v-740f27b4><span data-v-740f27b4>\u60A8\u7684\u4F4D\u7F6E\uFF1A\u9996\u9875 &gt; \u4E2A\u4EBA\u4E2D\u5FC3</span></div>`);
      if (activeMenu.value === "collect") {
        _push(`<div class="content-card" data-v-740f27b4><div class="card-title" data-v-740f27b4>\u6211\u7684\u6536\u85CF</div><div class="list-wrap" data-v-740f27b4><!--[-->`);
        ssrRenderList(collectList.value, (item) => {
          _push(`<div class="list-item" data-v-740f27b4><img${ssrRenderAttr("src", item.image)} alt="" class="item-img" data-v-740f27b4><div class="item-info" data-v-740f27b4><div class="item-name" data-v-740f27b4>${ssrInterpolate(item.title)}</div><div class="item-desc" data-v-740f27b4>${ssrInterpolate(item.type)}</div></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else if (activeMenu.value === "history") {
        _push(`<div class="content-card" data-v-740f27b4><div class="card-title" data-v-740f27b4>\u6D4F\u89C8\u8BB0\u5F55</div><div class="list-wrap" data-v-740f27b4><!--[-->`);
        ssrRenderList(historyList.value, (item) => {
          _push(`<div class="list-item" data-v-740f27b4><img${ssrRenderAttr("src", item.image)} alt="" class="item-img" data-v-740f27b4><div class="item-info" data-v-740f27b4><div class="item-name" data-v-740f27b4>${ssrInterpolate(item.title)}</div><div class="item-desc" data-v-740f27b4>${ssrInterpolate(item.time)}</div></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else if (activeMenu.value === "question") {
        _push(`<div class="content-card" data-v-740f27b4><div class="card-title" data-v-740f27b4>\u6211\u7684\u95EE\u7B54</div><div class="list-wrap" data-v-740f27b4><!--[-->`);
        ssrRenderList(questionList.value, (item) => {
          _push(`<div class="q-item" data-v-740f27b4><div class="q-left" data-v-740f27b4><div class="q-title" data-v-740f27b4>${ssrInterpolate(item.title)}</div><div class="q-desc" data-v-740f27b4>${ssrInterpolate(item.desc)}</div></div><span class="${ssrRenderClass([item.statusClass, "q-status"])}" data-v-740f27b4>${ssrInterpolate(item.status)}</span></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else if (activeMenu.value === "exam") {
        _push(`<div class="content-card" data-v-740f27b4><div class="card-title" data-v-740f27b4>\u6211\u7684\u8003\u6838</div><div class="list-wrap" data-v-740f27b4><!--[-->`);
        ssrRenderList(examList.value, (item) => {
          _push(`<div class="exam-item" data-v-740f27b4><div class="exam-left" data-v-740f27b4><div class="exam-title" data-v-740f27b4>${ssrInterpolate(item.title)}</div><div class="exam-date" data-v-740f27b4>${ssrInterpolate(item.date)}</div></div><div class="exam-right" data-v-740f27b4><span class="score" data-v-740f27b4>${ssrInterpolate(item.score)}</span><span class="${ssrRenderClass([item.gradeClass, "grade"])}" data-v-740f27b4>${ssrInterpolate(item.grade)}</span></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else if (activeMenu.value === "stat") {
        _push(`<div class="content-card" data-v-740f27b4><div class="card-title" data-v-740f27b4>\u5B66\u4E60\u7EDF\u8BA1</div><div class="stat-grid" data-v-740f27b4><!--[-->`);
        ssrRenderList(statList.value, (item) => {
          _push(`<div class="stat-item" data-v-740f27b4><span class="stat-icon" data-v-740f27b4>${ssrInterpolate(item.icon)}</span><div class="stat-num" data-v-740f27b4>${ssrInterpolate(item.value)}</div><div class="stat-text" data-v-740f27b4>${ssrInterpolate(item.label)}</div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else if (activeMenu.value === "edit") {
        _push(`<div class="content-card edit-card" data-v-740f27b4><div class="edit-header" data-v-740f27b4><h3 class="card-title" data-v-740f27b4>\u4FEE\u6539\u8D44\u6599</h3><div class="edit-avatar-wrap" data-v-740f27b4><div class="avatar-box edit-avatar" data-v-740f27b4><img${ssrRenderAttr("src", editForm.value.avatar || defaultAvatar)} alt="\u5934\u50CF" class="avatar" data-v-740f27b4><span class="edit-role-tag" data-v-740f27b4>${ssrInterpolate(editForm.value.role || "\u5B66\u5458")}</span></div><input type="file" accept="image/*" class="file-input" data-v-740f27b4></div></div><form class="edit-form" data-v-740f27b4><div class="form-row" data-v-740f27b4><label class="form-label" data-v-740f27b4>\u6027\u522B</label><div class="form-value" data-v-740f27b4>${ssrInterpolate(editForm.value.gender || "\u7537")} <span class="arrow" data-v-740f27b4>\u203A</span></div>`);
        if (currentField.value === "gender") {
          _push(`<select class="form-select" data-v-740f27b4><option value="\u7537" data-v-740f27b4${ssrIncludeBooleanAttr(Array.isArray(editForm.value.gender) ? ssrLooseContain(editForm.value.gender, "\u7537") : ssrLooseEqual(editForm.value.gender, "\u7537")) ? " selected" : ""}>\u7537</option><option value="\u5973" data-v-740f27b4${ssrIncludeBooleanAttr(Array.isArray(editForm.value.gender) ? ssrLooseContain(editForm.value.gender, "\u5973") : ssrLooseEqual(editForm.value.gender, "\u5973")) ? " selected" : ""}>\u5973</option></select>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="form-row" data-v-740f27b4><label class="form-label" data-v-740f27b4>\u6635\u79F0</label><div class="form-value" data-v-740f27b4>${ssrInterpolate(editForm.value.nickname || "\u5468\u67D0")} <span class="arrow" data-v-740f27b4>\u203A</span></div>`);
        if (currentField.value === "nickname") {
          _push(`<input${ssrRenderAttr("value", editForm.value.nickname)} class="form-input" placeholder="\u8BF7\u8F93\u5165\u6635\u79F0" data-v-740f27b4>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="form-row" data-v-740f27b4><label class="form-label" data-v-740f27b4>\u7535\u8BDD</label><div class="form-value" data-v-740f27b4>${ssrInterpolate(editForm.value.mobile || "18812334561")} <span class="arrow" data-v-740f27b4>\u203A</span></div>`);
        if (currentField.value === "mobile") {
          _push(`<input${ssrRenderAttr("value", editForm.value.mobile)} class="form-input" type="tel" placeholder="\u8BF7\u8F93\u5165\u624B\u673A\u53F7" data-v-740f27b4>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="form-row" data-v-740f27b4><label class="form-label" data-v-740f27b4>\u8EAB\u4EFD</label><div class="form-value" data-v-740f27b4>${ssrInterpolate(editForm.value.role || "\u5B66\u5458")}</div></div><div class="form-row" data-v-740f27b4><label class="form-label" data-v-740f27b4>\u53E3\u53F7</label><div class="form-value" data-v-740f27b4>${ssrInterpolate(editForm.value.motto || "\u8BF7\u8F93\u5165\u53E3\u53F7(15\u5B57\u4EE5\u5185)")} <span class="arrow" data-v-740f27b4>\u203A</span></div>`);
        if (currentField.value === "motto") {
          _push(`<input${ssrRenderAttr("value", editForm.value.motto)} class="form-input" maxlength="15" placeholder="\u8BF7\u8F93\u5165\u53E3\u53F7(15\u5B57\u4EE5\u5185)" data-v-740f27b4>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="form-row" data-v-740f27b4><label class="form-label" data-v-740f27b4>\u5B66\u5386</label><div class="form-value" data-v-740f27b4>${ssrInterpolate(editForm.value.education || "\u4E13\u79D1")} <span class="arrow" data-v-740f27b4>\u203A</span></div>`);
        if (currentField.value === "education") {
          _push(`<select class="form-select" data-v-740f27b4><option value="\u4E13\u79D1" data-v-740f27b4${ssrIncludeBooleanAttr(Array.isArray(editForm.value.education) ? ssrLooseContain(editForm.value.education, "\u4E13\u79D1") : ssrLooseEqual(editForm.value.education, "\u4E13\u79D1")) ? " selected" : ""}>\u4E13\u79D1</option><option value="\u672C\u79D1" data-v-740f27b4${ssrIncludeBooleanAttr(Array.isArray(editForm.value.education) ? ssrLooseContain(editForm.value.education, "\u672C\u79D1") : ssrLooseEqual(editForm.value.education, "\u672C\u79D1")) ? " selected" : ""}>\u672C\u79D1</option><option value="\u7855\u58EB" data-v-740f27b4${ssrIncludeBooleanAttr(Array.isArray(editForm.value.education) ? ssrLooseContain(editForm.value.education, "\u7855\u58EB") : ssrLooseEqual(editForm.value.education, "\u7855\u58EB")) ? " selected" : ""}>\u7855\u58EB</option><option value="\u535A\u58EB" data-v-740f27b4${ssrIncludeBooleanAttr(Array.isArray(editForm.value.education) ? ssrLooseContain(editForm.value.education, "\u535A\u58EB") : ssrLooseEqual(editForm.value.education, "\u535A\u58EB")) ? " selected" : ""}>\u535A\u58EB</option></select>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="form-row" data-v-740f27b4><label class="form-label" data-v-740f27b4>\u57CE\u5E02</label><div class="form-value" data-v-740f27b4>${ssrInterpolate(editForm.value.city || "\u6C5F\u82CF\u7701\u5357\u4EAC\u5E02 \u5E02\u8F96\u533A")} <span class="arrow" data-v-740f27b4>\u203A</span></div>`);
        if (currentField.value === "city") {
          _push(`<input${ssrRenderAttr("value", editForm.value.city)} class="form-input" placeholder="\u8BF7\u8F93\u5165\u57CE\u5E02" data-v-740f27b4>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="form-row" data-v-740f27b4><label class="form-label" data-v-740f27b4>\u5355\u4F4D</label><div class="form-value" data-v-740f27b4>${ssrInterpolate(editForm.value.company || "\u6C5F\u82CF\u51E4\u51F0\u79D1\u5B66\u79D1\u6280\u51FA\u7248\u793E")} <span class="arrow" data-v-740f27b4>\u203A</span></div>`);
        if (currentField.value === "company") {
          _push(`<input${ssrRenderAttr("value", editForm.value.company)} class="form-input" placeholder="\u8BF7\u8F93\u5165\u5355\u4F4D" data-v-740f27b4>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="form-actions" data-v-740f27b4><button type="submit" class="save-btn" data-v-740f27b4>\u4FDD\u5B58\u4FEE\u6539</button></div></form></div>`);
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
const profile = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-740f27b4"]]);

export { profile as default };
//# sourceMappingURL=profile-Dem8i3CR.mjs.map
