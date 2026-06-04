import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseEqual, ssrLooseContain } from 'vue/server-renderer';
import { useRouter, useRoute } from 'vue-router';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    useRoute();
    const examPaper = ref({
      id: 0,
      paperName: "",
      description: "",
      totalScore: 0,
      passScore: 0,
      durationMinutes: 0,
      status: "DISABLED",
      questions: []
    });
    const answers = ref({});
    const multipleAnswers = ref({});
    const submitted = ref(false);
    const examResult = ref({
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
    const currentQuestionIndex = ref(0);
    const remainingTime = ref(0);
    const getQuestionTypeText = (type) => {
      const map = {
        SINGLE_CHOICE: "\u5355\u9009\u9898",
        MULTIPLE_CHOICE: "\u591A\u9009\u9898",
        TRUE_FALSE: "\u5224\u65AD\u9898",
        SHORT_ANSWER: "\u7B80\u7B54\u9898"
      };
      return map[type] || type;
    };
    const getDifficultyText = (difficulty) => {
      const map = {
        EASY: "\u7B80\u5355",
        MEDIUM: "\u4E2D\u7B49",
        HARD: "\u56F0\u96BE"
      };
      return map[difficulty] || difficulty;
    };
    const isQuestionAnswered = (questionId) => {
      return answers.value[questionId] || multipleAnswers.value[questionId] && multipleAnswers.value[questionId].length > 0;
    };
    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "exam-detail-page" }, _attrs))} data-v-c693d023><section class="page-banner" data-v-c693d023><div class="container" data-v-c693d023><div class="banner-content" data-v-c693d023><h1 class="banner-title" data-v-c693d023>${ssrInterpolate(examPaper.value.paperName)}</h1><p class="banner-desc" data-v-c693d023>${ssrInterpolate(examPaper.value.description)}</p><div class="exam-info" data-v-c693d023><span class="info-item" data-v-c693d023>\u{1F4DD} ${ssrInterpolate(examPaper.value.questions.length)} \u9898</span><span class="info-item" data-v-c693d023>\u23F1\uFE0F ${ssrInterpolate(examPaper.value.durationMinutes)} \u5206\u949F</span><span class="info-item" data-v-c693d023>\u{1F3C6} \u6EE1\u5206 ${ssrInterpolate(examPaper.value.totalScore)} \u5206</span><span class="info-item" data-v-c693d023>\u2705 \u53CA\u683C\u7EBF ${ssrInterpolate(examPaper.value.passScore)} \u5206</span></div></div></div></section><div class="breadcrumb-section" data-v-c693d023><div class="container" data-v-c693d023><div class="breadcrumb" data-v-c693d023><span class="breadcrumb-item" data-v-c693d023>\u9996\u9875</span><span class="breadcrumb-separator" data-v-c693d023>&gt;</span><span class="breadcrumb-item" data-v-c693d023>\u8003\u6838</span><span class="breadcrumb-separator" data-v-c693d023>&gt;</span><span class="breadcrumb-item active" data-v-c693d023>${ssrInterpolate(examPaper.value.paperName)}</span></div></div></div>`);
      if (!submitted.value) {
        _push(`<div class="timer-bar" data-v-c693d023><div class="container" data-v-c693d023><div class="timer-content" data-v-c693d023><span class="timer-label" data-v-c693d023>\u5269\u4F59\u65F6\u95F4\uFF1A</span><span class="timer-value" data-v-c693d023>${ssrInterpolate(formatTime(remainingTime.value))}</span></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<section class="main-section" data-v-c693d023><div class="container" data-v-c693d023><div class="main-content" data-v-c693d023><aside class="sidebar" data-v-c693d023><div class="sidebar-title" data-v-c693d023>\u9898\u76EE\u5BFC\u822A</div><div class="question-nav" data-v-c693d023><!--[-->`);
      ssrRenderList(examPaper.value.questions, (question, index) => {
        _push(`<div class="${ssrRenderClass([{
          active: currentQuestionIndex.value === index,
          answered: isQuestionAnswered(question.questionId)
        }, "question-nav-item"])}" data-v-c693d023>${ssrInterpolate(index + 1)}</div>`);
      });
      _push(`<!--]--></div></aside><main class="content-area" data-v-c693d023>`);
      if (!submitted.value) {
        _push(`<div data-v-c693d023><!--[-->`);
        ssrRenderList(examPaper.value.questions, (question, index) => {
          _push(`<div${ssrRenderAttr("id", `question-${index}`)} class="question-card" data-v-c693d023><div class="question-header" data-v-c693d023><span class="question-type" data-v-c693d023>${ssrInterpolate(getQuestionTypeText(question.questionType))}</span><span class="question-difficulty" data-v-c693d023>${ssrInterpolate(getDifficultyText(question.difficulty))}</span><span class="question-score" data-v-c693d023>${ssrInterpolate(question.score)} \u5206</span></div><h3 class="question-title" data-v-c693d023>${ssrInterpolate(index + 1)}. ${ssrInterpolate(question.title)}</h3>`);
          if (question.questionType === "SINGLE_CHOICE") {
            _push(`<div class="question-options" data-v-c693d023><!--[-->`);
            ssrRenderList(question.options, (option) => {
              _push(`<label class="option-item" data-v-c693d023><input type="radio"${ssrRenderAttr("name", `question-${question.questionId}`)}${ssrRenderAttr("value", option.optionKey)}${ssrIncludeBooleanAttr(ssrLooseEqual(answers.value[question.questionId], option.optionKey)) ? " checked" : ""} data-v-c693d023><span class="option-key" data-v-c693d023>${ssrInterpolate(option.optionKey)}.</span><span class="option-content" data-v-c693d023>${ssrInterpolate(option.optionContent)}</span></label>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          if (question.questionType === "MULTIPLE_CHOICE") {
            _push(`<div class="question-options" data-v-c693d023><!--[-->`);
            ssrRenderList(question.options, (option) => {
              _push(`<label class="option-item" data-v-c693d023><input type="checkbox"${ssrRenderAttr("value", option.optionKey)}${ssrIncludeBooleanAttr(Array.isArray(multipleAnswers.value[question.questionId]) ? ssrLooseContain(multipleAnswers.value[question.questionId], option.optionKey) : multipleAnswers.value[question.questionId]) ? " checked" : ""} data-v-c693d023><span class="option-key" data-v-c693d023>${ssrInterpolate(option.optionKey)}.</span><span class="option-content" data-v-c693d023>${ssrInterpolate(option.optionContent)}</span></label>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          if (question.questionType === "TRUE_FALSE") {
            _push(`<div class="question-options" data-v-c693d023><label class="option-item" data-v-c693d023><input type="radio"${ssrRenderAttr("name", `question-${question.questionId}`)} value="true"${ssrIncludeBooleanAttr(ssrLooseEqual(answers.value[question.questionId], "true")) ? " checked" : ""} data-v-c693d023><span class="option-content" data-v-c693d023>\u6B63\u786E</span></label><label class="option-item" data-v-c693d023><input type="radio"${ssrRenderAttr("name", `question-${question.questionId}`)} value="false"${ssrIncludeBooleanAttr(ssrLooseEqual(answers.value[question.questionId], "false")) ? " checked" : ""} data-v-c693d023><span class="option-content" data-v-c693d023>\u9519\u8BEF</span></label></div>`);
          } else {
            _push(`<!---->`);
          }
          if (question.questionType === "SHORT_ANSWER") {
            _push(`<div class="question-textarea" data-v-c693d023><textarea placeholder="\u8BF7\u8F93\u5165\u60A8\u7684\u7B54\u6848..." rows="4" data-v-c693d023>${ssrInterpolate(answers.value[question.questionId])}</textarea></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--><div class="submit-section" data-v-c693d023><button class="submit-btn" data-v-c693d023>\u63D0\u4EA4\u8BD5\u5377</button></div></div>`);
      } else {
        _push(`<div class="result-section" data-v-c693d023><div class="result-card" data-v-c693d023><div class="result-header" data-v-c693d023><h2 class="result-title" data-v-c693d023>\u8003\u8BD5\u7ED3\u679C</h2><div class="result-score" data-v-c693d023><span class="score-value" data-v-c693d023>${ssrInterpolate(examResult.value.score)}</span><span class="score-total" data-v-c693d023>/ ${ssrInterpolate(examPaper.value.totalScore)} \u5206</span></div><div class="${ssrRenderClass([{ passed: examResult.value.passed === 1, failed: examResult.value.passed === 0 }, "result-status"])}" data-v-c693d023>${ssrInterpolate(examResult.value.passed === 1 ? "\u53CA\u683C" : "\u4E0D\u53CA\u683C")}</div></div><div class="result-details" data-v-c693d023><!--[-->`);
        ssrRenderList(examResult.value.answers, (answer, index) => {
          _push(`<div class="answer-card" data-v-c693d023><div class="answer-header" data-v-c693d023><span class="answer-index" data-v-c693d023>${ssrInterpolate(index + 1)}</span><span class="answer-type" data-v-c693d023>${ssrInterpolate(getQuestionTypeText(answer.questionType))}</span><span class="${ssrRenderClass([{ correct: answer.correct === 1, wrong: answer.correct === 0 }, "answer-correct"])}" data-v-c693d023>${ssrInterpolate(answer.correct === 1 ? "\u6B63\u786E" : "\u9519\u8BEF")}</span><span class="answer-score" data-v-c693d023>${ssrInterpolate(answer.score)} \u5206</span></div><h4 class="answer-title" data-v-c693d023>${ssrInterpolate(answer.title)}</h4><div class="answer-content" data-v-c693d023><div class="answer-item" data-v-c693d023><span class="label" data-v-c693d023>\u60A8\u7684\u7B54\u6848\uFF1A</span><span class="value" data-v-c693d023>${ssrInterpolate(answer.answerContent || "\u672A\u4F5C\u7B54")}</span></div><div class="answer-item" data-v-c693d023><span class="label" data-v-c693d023>\u6B63\u786E\u7B54\u6848\uFF1A</span><span class="value correct-answer" data-v-c693d023>${ssrInterpolate(answer.correctAnswer)}</span></div>`);
          if (answer.analysis) {
            _push(`<div class="answer-item analysis" data-v-c693d023><span class="label" data-v-c693d023>\u89E3\u6790\uFF1A</span><p class="value" data-v-c693d023>${ssrInterpolate(answer.analysis)}</p></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]--></div><div class="result-actions" data-v-c693d023><button class="action-btn" data-v-c693d023>\u8FD4\u56DE\u8003\u8BD5\u5217\u8868</button></div></div></div>`);
      }
      _push(`</main></div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/exam/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c693d023"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-BqNhPFqp.mjs.map
