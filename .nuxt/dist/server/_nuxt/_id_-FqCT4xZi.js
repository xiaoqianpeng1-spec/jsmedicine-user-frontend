import { defineComponent, ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { useRouter } from "vue-router";
import "../server.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/hookable/dist/index.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "D:/work/jsmedicine-user-frontend/node_modules/defu/dist/defu.mjs";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "D:/work/jsmedicine-user-frontend/node_modules/ofetch/dist/node.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/unctx/dist/index.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/h3/dist/index.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/ufo/dist/index.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/destr/dist/index.mjs";
import "D:/work/jsmedicine-user-frontend/node_modules/ohash/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const examRecord = ref({
      id: 0,
      studentId: 0,
      paperId: 0,
      paperName: "",
      sourceType: "",
      sourceId: 0,
      score: 0,
      passed: 0,
      startedAt: "",
      submittedAt: "",
      answers: []
    });
    const getQuestionTypeText = (type) => {
      const map = {
        SINGLE_CHOICE: "单选题",
        MULTIPLE_CHOICE: "多选题",
        TRUE_FALSE: "判断题",
        SHORT_ANSWER: "简答题"
      };
      return map[type] || type;
    };
    const isCorrectAnswer = (correctAnswer, optionKey) => {
      if (!correctAnswer) return false;
      return correctAnswer.includes(optionKey);
    };
    const isUserAnswer = (userAnswer, optionKey) => {
      if (!userAnswer) return false;
      return userAnswer.includes(optionKey);
    };
    const formatDate = (date) => {
      if (!date) return "";
      const d = new Date(date);
      return d.toLocaleString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "exam-record-detail-page" }, _attrs))} data-v-72cef0c1><section class="page-banner" data-v-72cef0c1><div class="container" data-v-72cef0c1><h1 class="banner-title" data-v-72cef0c1>${ssrInterpolate(examRecord.value.paperName)}</h1><p class="banner-desc" data-v-72cef0c1>考试结果与解析</p></div></section><div class="breadcrumb-section" data-v-72cef0c1><div class="container" data-v-72cef0c1><div class="breadcrumb" data-v-72cef0c1><span class="breadcrumb-item" data-v-72cef0c1>首页</span><span class="breadcrumb-separator" data-v-72cef0c1>&gt;</span><span class="breadcrumb-item" data-v-72cef0c1>考核</span><span class="breadcrumb-separator" data-v-72cef0c1>&gt;</span><span class="breadcrumb-item" data-v-72cef0c1>考试记录</span><span class="breadcrumb-separator" data-v-72cef0c1>&gt;</span><span class="breadcrumb-item active" data-v-72cef0c1>详情</span></div></div></div><section class="result-overview-section" data-v-72cef0c1><div class="container" data-v-72cef0c1><div class="result-overview-card" data-v-72cef0c1><div class="overview-item" data-v-72cef0c1><span class="overview-label" data-v-72cef0c1>考试时间</span><span class="overview-value" data-v-72cef0c1>${ssrInterpolate(formatDate(examRecord.value.submittedAt))}</span></div><div class="overview-item" data-v-72cef0c1><span class="overview-label" data-v-72cef0c1>得分</span><span class="overview-value score" data-v-72cef0c1>${ssrInterpolate(examRecord.value.score)}</span></div><div class="overview-item" data-v-72cef0c1><span class="overview-label" data-v-72cef0c1>考试状态</span><div class="${ssrRenderClass([{ passed: examRecord.value.passed === 1, failed: examRecord.value.passed === 0 }, "overview-value status"])}" data-v-72cef0c1>${ssrInterpolate(examRecord.value.passed === 1 ? "及格" : "不及格")}</div></div></div></div></section><section class="answers-section" data-v-72cef0c1><div class="container" data-v-72cef0c1><h2 class="section-title" data-v-72cef0c1>答题详情</h2><div class="answers-list" data-v-72cef0c1><!--[-->`);
      ssrRenderList(examRecord.value.answers, (answer, index) => {
        _push(`<div class="answer-card" data-v-72cef0c1><div class="answer-header" data-v-72cef0c1><span class="answer-index" data-v-72cef0c1>${ssrInterpolate(index + 1)}</span><span class="answer-type" data-v-72cef0c1>${ssrInterpolate(getQuestionTypeText(answer.questionType))}</span><span class="${ssrRenderClass([{ correct: answer.correct === 1, wrong: answer.correct === 0 }, "answer-correct"])}" data-v-72cef0c1>${ssrInterpolate(answer.correct === 1 ? "正确" : "错误")}</span><span class="answer-score" data-v-72cef0c1>${ssrInterpolate(answer.score)} 分</span></div><h4 class="answer-title" data-v-72cef0c1>${ssrInterpolate(answer.title)}</h4>`);
        if (answer.options && answer.options.length > 0) {
          _push(`<div class="answer-options" data-v-72cef0c1><!--[-->`);
          ssrRenderList(answer.options, (option) => {
            _push(`<div class="${ssrRenderClass([{
              "is-correct-answer": isCorrectAnswer(answer.correctAnswer, option.optionKey),
              "is-user-answer": isUserAnswer(answer.answerContent, option.optionKey)
            }, "option-item"])}" data-v-72cef0c1><span class="option-key" data-v-72cef0c1>${ssrInterpolate(option.optionKey)}.</span><span class="option-content" data-v-72cef0c1>${ssrInterpolate(option.optionContent)}</span></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="answer-content" data-v-72cef0c1><div class="answer-item" data-v-72cef0c1><span class="label" data-v-72cef0c1>您的答案：</span><span class="value" data-v-72cef0c1>${ssrInterpolate(answer.answerContent || "未作答")}</span></div><div class="answer-item" data-v-72cef0c1><span class="label" data-v-72cef0c1>正确答案：</span><span class="value correct-answer" data-v-72cef0c1>${ssrInterpolate(answer.correctAnswer)}</span></div>`);
        if (answer.analysis) {
          _push(`<div class="answer-item analysis" data-v-72cef0c1><span class="label" data-v-72cef0c1>解析：</span><p class="value" data-v-72cef0c1>${ssrInterpolate(answer.analysis)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      });
      _push(`<!--]--></div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/exam/records/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-72cef0c1"]]);
export {
  _id_ as default
};
//# sourceMappingURL=_id_-FqCT4xZi.js.map
