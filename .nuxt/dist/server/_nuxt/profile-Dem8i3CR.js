import { defineComponent, ref, computed, watch, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { b as useRouter, d as useUserStore, s as storeToRefs } from "../server.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/hookable/dist/index.mjs";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "D:/work/jsmedicine-user-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "D:/work/jsmedicine-user-frontend/node_modules/unctx/dist/index.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "D:/work/jsmedicine-user-frontend/node_modules/defu/dist/defu.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/ufo/dist/index.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/klona/dist/index.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/destr/dist/index.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/ohash/dist/index.mjs";
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
          nickname: editForm.value.nickname || editForm.value.username || "未设置昵称",
          role: editForm.value.role || "学员",
          motto: editForm.value.motto || "学习口号：加油！！"
        };
      }
      return {
        avatar: userInfo.value.avatar || defaultAvatar,
        nickname: userInfo.value.nickname || userInfo.value.username || "未设置昵称",
        role: userInfo.value.role || "学员",
        motto: userInfo.value.motto || "学习口号：加油！！"
      };
    });
    watch(userInfo, () => {
      syncEditForm();
    }, { immediate: true, deep: true });
    const navList = ref([
      { id: "collect", icon: "icon-star", label: "我的收藏" },
      { id: "history", icon: "icon-eye", label: "浏览记录" },
      { id: "question", icon: "icon-chat", label: "我的问答" },
      { id: "exam", icon: "icon-file", label: "我的考核" },
      { id: "stat", icon: "icon-bar", label: "学习统计" },
      { id: "edit", icon: "icon-edit", label: "编辑资料" }
    ]);
    const collectList = ref([
      { id: 1, title: "中医基础理论精讲", type: "视频课程", image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=course1&image_size=square" },
      { id: 2, title: "针灸技法与临床应用", type: "专题课程", image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=course2&image_size=square" },
      { id: 3, title: "黄帝内经解读", type: "音频课程", image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=course3&image_size=square" }
    ]);
    const historyList = ref([
      { id: 1, title: "中医诊断学精要", time: "2024-01-15 14:30", image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=doc1&image_size=square" },
      { id: 2, title: "中药方剂学专题", time: "2024-01-14 10:00", image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=doc2&image_size=square" }
    ]);
    const questionList = ref([
      { id: 1, title: "中药配伍相关问题", desc: "请问十八反具体内容是什么？", status: "已回答", statusClass: "ok" },
      { id: 2, title: "针灸疗程咨询", desc: "面瘫针灸需要多久恢复？", status: "待回答", statusClass: "wait" }
    ]);
    const examList = ref([
      { id: 1, title: "中医基础理论考核", date: "2024-01-10", score: "92", grade: "优秀", gradeClass: "excellent" },
      { id: 2, title: "针灸学考核", date: "2024-01-15", score: "85", grade: "良好", gradeClass: "good" }
    ]);
    const statList = ref([
      { id: 1, icon: "▤", value: "48", label: "学习时长(小时)" },
      { id: 2, icon: "▢", value: "12", label: "完成课程" },
      { id: 3, icon: "✓", value: "6", label: "完成考核" },
      { id: 4, icon: "▣", value: "8", label: "提问次数" }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "profile-page" }, _attrs))} data-v-740f27b4><div class="container" data-v-740f27b4><div class="profile-layout" data-v-740f27b4><aside class="sidebar" data-v-740f27b4><div class="user-card" data-v-740f27b4><div class="avatar-box" data-v-740f27b4><img${ssrRenderAttr("src", displayInfo.value.avatar)} alt="头像" class="avatar" data-v-740f27b4><span class="role-tag" data-v-740f27b4>${ssrInterpolate(displayInfo.value.role)}</span></div><h2 class="username" data-v-740f27b4>${ssrInterpolate(displayInfo.value.nickname)}</h2><p class="motto" data-v-740f27b4>${ssrInterpolate(displayInfo.value.motto)}</p><div class="btn-group" data-v-740f27b4><button class="btn edit-btn" data-v-740f27b4>编辑资料</button><button class="btn logout-btn" data-v-740f27b4>退出登录</button></div></div><nav class="side-nav" data-v-740f27b4><ul data-v-740f27b4><!--[-->`);
      ssrRenderList(navList.value, (item) => {
        _push(`<li class="${ssrRenderClass([{ active: activeMenu.value === item.id }, "nav-item"])}" data-v-740f27b4><span class="${ssrRenderClass([item.icon, "icon-wrap"])}" data-v-740f27b4></span><span class="text" data-v-740f27b4>${ssrInterpolate(item.label)}</span></li>`);
      });
      _push(`<!--]--></ul></nav></aside><main class="main" data-v-740f27b4><div class="breadcrumb" data-v-740f27b4><span data-v-740f27b4>您的位置：首页 &gt; 个人中心</span></div>`);
      if (activeMenu.value === "collect") {
        _push(`<div class="content-card" data-v-740f27b4><div class="card-title" data-v-740f27b4>我的收藏</div><div class="list-wrap" data-v-740f27b4><!--[-->`);
        ssrRenderList(collectList.value, (item) => {
          _push(`<div class="list-item" data-v-740f27b4><img${ssrRenderAttr("src", item.image)} alt="" class="item-img" data-v-740f27b4><div class="item-info" data-v-740f27b4><div class="item-name" data-v-740f27b4>${ssrInterpolate(item.title)}</div><div class="item-desc" data-v-740f27b4>${ssrInterpolate(item.type)}</div></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else if (activeMenu.value === "history") {
        _push(`<div class="content-card" data-v-740f27b4><div class="card-title" data-v-740f27b4>浏览记录</div><div class="list-wrap" data-v-740f27b4><!--[-->`);
        ssrRenderList(historyList.value, (item) => {
          _push(`<div class="list-item" data-v-740f27b4><img${ssrRenderAttr("src", item.image)} alt="" class="item-img" data-v-740f27b4><div class="item-info" data-v-740f27b4><div class="item-name" data-v-740f27b4>${ssrInterpolate(item.title)}</div><div class="item-desc" data-v-740f27b4>${ssrInterpolate(item.time)}</div></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else if (activeMenu.value === "question") {
        _push(`<div class="content-card" data-v-740f27b4><div class="card-title" data-v-740f27b4>我的问答</div><div class="list-wrap" data-v-740f27b4><!--[-->`);
        ssrRenderList(questionList.value, (item) => {
          _push(`<div class="q-item" data-v-740f27b4><div class="q-left" data-v-740f27b4><div class="q-title" data-v-740f27b4>${ssrInterpolate(item.title)}</div><div class="q-desc" data-v-740f27b4>${ssrInterpolate(item.desc)}</div></div><span class="${ssrRenderClass([item.statusClass, "q-status"])}" data-v-740f27b4>${ssrInterpolate(item.status)}</span></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else if (activeMenu.value === "exam") {
        _push(`<div class="content-card" data-v-740f27b4><div class="card-title" data-v-740f27b4>我的考核</div><div class="list-wrap" data-v-740f27b4><!--[-->`);
        ssrRenderList(examList.value, (item) => {
          _push(`<div class="exam-item" data-v-740f27b4><div class="exam-left" data-v-740f27b4><div class="exam-title" data-v-740f27b4>${ssrInterpolate(item.title)}</div><div class="exam-date" data-v-740f27b4>${ssrInterpolate(item.date)}</div></div><div class="exam-right" data-v-740f27b4><span class="score" data-v-740f27b4>${ssrInterpolate(item.score)}</span><span class="${ssrRenderClass([item.gradeClass, "grade"])}" data-v-740f27b4>${ssrInterpolate(item.grade)}</span></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else if (activeMenu.value === "stat") {
        _push(`<div class="content-card" data-v-740f27b4><div class="card-title" data-v-740f27b4>学习统计</div><div class="stat-grid" data-v-740f27b4><!--[-->`);
        ssrRenderList(statList.value, (item) => {
          _push(`<div class="stat-item" data-v-740f27b4><span class="stat-icon" data-v-740f27b4>${ssrInterpolate(item.icon)}</span><div class="stat-num" data-v-740f27b4>${ssrInterpolate(item.value)}</div><div class="stat-text" data-v-740f27b4>${ssrInterpolate(item.label)}</div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else if (activeMenu.value === "edit") {
        _push(`<div class="content-card edit-card" data-v-740f27b4><div class="edit-header" data-v-740f27b4><h3 class="card-title" data-v-740f27b4>修改资料</h3><div class="edit-avatar-wrap" data-v-740f27b4><div class="avatar-box edit-avatar" data-v-740f27b4><img${ssrRenderAttr("src", editForm.value.avatar || defaultAvatar)} alt="头像" class="avatar" data-v-740f27b4><span class="edit-role-tag" data-v-740f27b4>${ssrInterpolate(editForm.value.role || "学员")}</span></div><input type="file" accept="image/*" class="file-input" data-v-740f27b4></div></div><form class="edit-form" data-v-740f27b4><div class="form-row" data-v-740f27b4><label class="form-label" data-v-740f27b4>性别</label><div class="form-value" data-v-740f27b4>${ssrInterpolate(editForm.value.gender || "男")} <span class="arrow" data-v-740f27b4>›</span></div>`);
        if (currentField.value === "gender") {
          _push(`<select class="form-select" data-v-740f27b4><option value="男" data-v-740f27b4${ssrIncludeBooleanAttr(Array.isArray(editForm.value.gender) ? ssrLooseContain(editForm.value.gender, "男") : ssrLooseEqual(editForm.value.gender, "男")) ? " selected" : ""}>男</option><option value="女" data-v-740f27b4${ssrIncludeBooleanAttr(Array.isArray(editForm.value.gender) ? ssrLooseContain(editForm.value.gender, "女") : ssrLooseEqual(editForm.value.gender, "女")) ? " selected" : ""}>女</option></select>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="form-row" data-v-740f27b4><label class="form-label" data-v-740f27b4>昵称</label><div class="form-value" data-v-740f27b4>${ssrInterpolate(editForm.value.nickname || "周某")} <span class="arrow" data-v-740f27b4>›</span></div>`);
        if (currentField.value === "nickname") {
          _push(`<input${ssrRenderAttr("value", editForm.value.nickname)} class="form-input" placeholder="请输入昵称" data-v-740f27b4>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="form-row" data-v-740f27b4><label class="form-label" data-v-740f27b4>电话</label><div class="form-value" data-v-740f27b4>${ssrInterpolate(editForm.value.mobile || "18812334561")} <span class="arrow" data-v-740f27b4>›</span></div>`);
        if (currentField.value === "mobile") {
          _push(`<input${ssrRenderAttr("value", editForm.value.mobile)} class="form-input" type="tel" placeholder="请输入手机号" data-v-740f27b4>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="form-row" data-v-740f27b4><label class="form-label" data-v-740f27b4>身份</label><div class="form-value" data-v-740f27b4>${ssrInterpolate(editForm.value.role || "学员")}</div></div><div class="form-row" data-v-740f27b4><label class="form-label" data-v-740f27b4>口号</label><div class="form-value" data-v-740f27b4>${ssrInterpolate(editForm.value.motto || "请输入口号(15字以内)")} <span class="arrow" data-v-740f27b4>›</span></div>`);
        if (currentField.value === "motto") {
          _push(`<input${ssrRenderAttr("value", editForm.value.motto)} class="form-input" maxlength="15" placeholder="请输入口号(15字以内)" data-v-740f27b4>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="form-row" data-v-740f27b4><label class="form-label" data-v-740f27b4>学历</label><div class="form-value" data-v-740f27b4>${ssrInterpolate(editForm.value.education || "专科")} <span class="arrow" data-v-740f27b4>›</span></div>`);
        if (currentField.value === "education") {
          _push(`<select class="form-select" data-v-740f27b4><option value="专科" data-v-740f27b4${ssrIncludeBooleanAttr(Array.isArray(editForm.value.education) ? ssrLooseContain(editForm.value.education, "专科") : ssrLooseEqual(editForm.value.education, "专科")) ? " selected" : ""}>专科</option><option value="本科" data-v-740f27b4${ssrIncludeBooleanAttr(Array.isArray(editForm.value.education) ? ssrLooseContain(editForm.value.education, "本科") : ssrLooseEqual(editForm.value.education, "本科")) ? " selected" : ""}>本科</option><option value="硕士" data-v-740f27b4${ssrIncludeBooleanAttr(Array.isArray(editForm.value.education) ? ssrLooseContain(editForm.value.education, "硕士") : ssrLooseEqual(editForm.value.education, "硕士")) ? " selected" : ""}>硕士</option><option value="博士" data-v-740f27b4${ssrIncludeBooleanAttr(Array.isArray(editForm.value.education) ? ssrLooseContain(editForm.value.education, "博士") : ssrLooseEqual(editForm.value.education, "博士")) ? " selected" : ""}>博士</option></select>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="form-row" data-v-740f27b4><label class="form-label" data-v-740f27b4>城市</label><div class="form-value" data-v-740f27b4>${ssrInterpolate(editForm.value.city || "江苏省南京市 市辖区")} <span class="arrow" data-v-740f27b4>›</span></div>`);
        if (currentField.value === "city") {
          _push(`<input${ssrRenderAttr("value", editForm.value.city)} class="form-input" placeholder="请输入城市" data-v-740f27b4>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="form-row" data-v-740f27b4><label class="form-label" data-v-740f27b4>单位</label><div class="form-value" data-v-740f27b4>${ssrInterpolate(editForm.value.company || "江苏凤凰科学科技出版社")} <span class="arrow" data-v-740f27b4>›</span></div>`);
        if (currentField.value === "company") {
          _push(`<input${ssrRenderAttr("value", editForm.value.company)} class="form-input" placeholder="请输入单位" data-v-740f27b4>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="form-actions" data-v-740f27b4><button type="submit" class="save-btn" data-v-740f27b4>保存修改</button></div></form></div>`);
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
export {
  profile as default
};
//# sourceMappingURL=profile-Dem8i3CR.js.map
