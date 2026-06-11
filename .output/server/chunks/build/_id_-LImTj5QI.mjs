import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

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
        SINGLE_CHOICE: "\u5355\u9009\u9898",
        MULTIPLE_CHOICE: "\u591A\u9009\u9898",
        TRUE_FALSE: "\u5224\u65AD\u9898",
        SHORT_ANSWER: "\u7B80\u7B54\u9898"
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "exam-record-detail-page" }, _attrs))} data-v-752420d6><section class="page-banner" data-v-752420d6><div class="container" data-v-752420d6><h1 class="banner-title" data-v-752420d6>${ssrInterpolate(examRecord.value.paperName)}</h1><p class="banner-desc" data-v-752420d6>\u8003\u8BD5\u7ED3\u679C\u4E0E\u89E3\u6790</p></div></section><div class="breadcrumb-section" data-v-752420d6><div class="container" data-v-752420d6><div class="breadcrumb" data-v-752420d6><span class="breadcrumb-item" data-v-752420d6>\u9996\u9875</span><span class="breadcrumb-separator" data-v-752420d6>&gt;</span><span class="breadcrumb-item" data-v-752420d6>\u8003\u6838</span><span class="breadcrumb-separator" data-v-752420d6>&gt;</span><span class="breadcrumb-item" data-v-752420d6>\u8003\u8BD5\u8BB0\u5F55</span><span class="breadcrumb-separator" data-v-752420d6>&gt;</span><span class="breadcrumb-item active" data-v-752420d6>\u8BE6\u60C5</span></div></div></div><section class="result-overview-section" data-v-752420d6><div class="container" data-v-752420d6><div class="result-overview-card" data-v-752420d6><div class="overview-item" data-v-752420d6><span class="overview-label" data-v-752420d6>\u8003\u8BD5\u65F6\u95F4</span><span class="overview-value" data-v-752420d6>${ssrInterpolate(formatDate(examRecord.value.submittedAt))}</span></div><div class="overview-item" data-v-752420d6><span class="overview-label" data-v-752420d6>\u5F97\u5206</span><span class="overview-value score" data-v-752420d6>${ssrInterpolate(examRecord.value.score)}</span></div><div class="overview-item" data-v-752420d6><span class="overview-label" data-v-752420d6>\u8003\u8BD5\u72B6\u6001</span><div class="${ssrRenderClass([{ passed: examRecord.value.passed === 1, failed: examRecord.value.passed === 0 }, "overview-value status"])}" data-v-752420d6>${ssrInterpolate(examRecord.value.passed === 1 ? "\u53CA\u683C" : "\u4E0D\u53CA\u683C")}</div></div></div></div></section><section class="answers-section" data-v-752420d6><div class="container" data-v-752420d6><h2 class="section-title" data-v-752420d6>\u7B54\u9898\u8BE6\u60C5</h2><div class="answers-list" data-v-752420d6><!--[-->`);
      ssrRenderList(examRecord.value.answers, (answer, index) => {
        _push(`<div class="answer-card" data-v-752420d6><div class="answer-header" data-v-752420d6><span class="answer-index" data-v-752420d6>${ssrInterpolate(index + 1)}</span><span class="answer-type" data-v-752420d6>${ssrInterpolate(getQuestionTypeText(answer.questionType))}</span><span class="${ssrRenderClass([{ correct: answer.correct === 1, wrong: answer.correct === 0 }, "answer-correct"])}" data-v-752420d6>${ssrInterpolate(answer.correct === 1 ? "\u6B63\u786E" : "\u9519\u8BEF")}</span><span class="answer-score" data-v-752420d6>${ssrInterpolate(answer.score)} \u5206</span></div><h4 class="answer-title" data-v-752420d6>${ssrInterpolate(answer.title)}</h4>`);
        if (answer.options && answer.options.length > 0) {
          _push(`<div class="answer-options" data-v-752420d6><!--[-->`);
          ssrRenderList(answer.options, (option) => {
            _push(`<div class="${ssrRenderClass([{
              "is-correct-answer": isCorrectAnswer(answer.correctAnswer, option.optionKey),
              "is-user-answer": isUserAnswer(answer.answerContent, option.optionKey)
            }, "option-item"])}" data-v-752420d6><span class="option-key" data-v-752420d6>${ssrInterpolate(option.optionKey)}.</span><span class="option-content" data-v-752420d6>${ssrInterpolate(option.optionContent)}</span></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="answer-content" data-v-752420d6><div class="answer-item" data-v-752420d6><span class="label" data-v-752420d6>\u60A8\u7684\u7B54\u6848\uFF1A</span><span class="value" data-v-752420d6>${ssrInterpolate(answer.answerContent || "\u672A\u4F5C\u7B54")}</span></div><div class="answer-item" data-v-752420d6><span class="label" data-v-752420d6>\u6B63\u786E\u7B54\u6848\uFF1A</span><span class="value correct-answer" data-v-752420d6>${ssrInterpolate(answer.correctAnswer)}</span></div>`);
        if (answer.analysis) {
          _push(`<div class="answer-item analysis" data-v-752420d6><span class="label" data-v-752420d6>\u89E3\u6790\uFF1A</span><p class="value" data-v-752420d6>${ssrInterpolate(answer.analysis)}</p></div>`);
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
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-752420d6"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-LImTj5QI.mjs.map
