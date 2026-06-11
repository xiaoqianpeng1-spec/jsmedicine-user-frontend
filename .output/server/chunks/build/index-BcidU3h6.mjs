import { defineComponent, ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const assessments = ref([]);
    const currentPage = ref(1);
    const pageSize = ref(10);
    const total = ref(0);
    const loading = ref(false);
    const showDetailModal = ref(false);
    const detailLoading = ref(false);
    const currentAssessment = ref(null);
    const totalPages = computed(() => {
      return Math.ceil(total.value / pageSize.value);
    });
    const getAssessmentTypeLabel = (type) => {
      const labels = {
        FORMAL: "\u6B63\u5F0F\u8003\u6838",
        MAKEUP: "\u8865\u8003",
        MOCK: "\u6A21\u62DF\u8003\u6838"
      };
      return labels[type] || type;
    };
    const getStatusLabel = (status) => {
      const labels = {
        NOT_STARTED: "\u672A\u5F00\u59CB",
        IN_PROGRESS: "\u8FDB\u884C\u4E2D",
        ENDED: "\u5DF2\u7ED3\u675F",
        CANCELLED: "\u5DF2\u53D6\u6D88",
        ARCHIVED: "\u5DF2\u5F52\u6863"
      };
      return labels[status] || status;
    };
    const getParticipantStatusLabel = (status) => {
      const labels = {
        IN_PROGRESS: "\u7B54\u9898\u4E2D",
        SUBMITTED: "\u5DF2\u63D0\u4EA4",
        FORCED_SUBMITTED: "\u5F3A\u5236\u63D0\u4EA4",
        TIMED_OUT: "\u8D85\u65F6\u672A\u4EA4"
      };
      return labels[status] || status;
    };
    const formatDateRange = (startAt, endAt) => {
      const start = new Date(startAt);
      const end = new Date(endAt);
      return `${start.getMonth() + 1}/${start.getDate()} ${start.getHours()}:${String(start.getMinutes()).padStart(2, "0")} - ${end.getMonth() + 1}/${end.getDate()} ${end.getHours()}:${String(end.getMinutes()).padStart(2, "0")}`;
    };
    const formatDateTime = (dateStr) => {
      const date = new Date(dateStr);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
    };
    const formatCountdown = (seconds) => {
      const days = Math.floor(seconds / 86400);
      const hours = Math.floor(seconds % 86400 / 3600);
      const minutes = Math.floor(seconds % 3600 / 60);
      const secs = seconds % 60;
      if (days > 0) {
        return `${days}\u5929 ${hours}\u65F6 ${minutes}\u5206`;
      } else if (hours > 0) {
        return `${hours}\u65F6 ${minutes}\u5206 ${secs}\u79D2`;
      } else {
        return `${minutes}\u5206 ${secs}\u79D2`;
      }
    };
    const getCardClass = (assessment) => {
      const classes = [];
      if (assessment.status === "CANCELLED" || assessment.status === "ARCHIVED") {
        classes.push("disabled");
      }
      return classes.join(" ");
    };
    const canStartExam = (assessment) => {
      if (assessment.status !== "IN_PROGRESS") return false;
      if (assessment.participantStatus === "SUBMITTED" || assessment.participantStatus === "FORCED_SUBMITTED" || assessment.participantStatus === "TIMED_OUT") {
        return false;
      }
      return true;
    };
    const getButtonText = (assessment) => {
      if (assessment.status === "NOT_STARTED") {
        return "\u5C1A\u672A\u5F00\u59CB";
      }
      if (assessment.status === "ENDED" || assessment.status === "CANCELLED" || assessment.status === "ARCHIVED") {
        return "\u5DF2\u7ED3\u675F";
      }
      if (assessment.participantStatus === "SUBMITTED") {
        return "\u5DF2\u63D0\u4EA4";
      }
      if (assessment.participantStatus === "FORCED_SUBMITTED") {
        return "\u5F3A\u5236\u63D0\u4EA4";
      }
      if (assessment.participantStatus === "TIMED_OUT") {
        return "\u8D85\u65F6\u672A\u4EA4";
      }
      if (assessment.participantStatus === "IN_PROGRESS") {
        return "\u7EE7\u7EED\u7B54\u9898";
      }
      return "\u5F00\u59CB\u7B54\u9898";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "exam-page" }, _attrs))} data-v-7d4ecc60><section class="page-banner" data-v-7d4ecc60><div class="container" data-v-7d4ecc60><h1 class="banner-title" data-v-7d4ecc60>\u5728\u7EBF\u8003\u6838</h1><p class="banner-desc" data-v-7d4ecc60>\u68C0\u9A8C\u5B66\u4E60\u6210\u679C\uFF0C\u5DE9\u56FA\u77E5\u8BC6\u8981\u70B9</p></div></section><div class="breadcrumb-section" data-v-7d4ecc60><div class="container" data-v-7d4ecc60><div class="breadcrumb" data-v-7d4ecc60><span class="breadcrumb-item" data-v-7d4ecc60>\u9996\u9875</span><span class="breadcrumb-separator" data-v-7d4ecc60>&gt;</span><span class="breadcrumb-item active" data-v-7d4ecc60>\u8003\u6838</span></div></div></div><section class="search-section" data-v-7d4ecc60><div class="container" data-v-7d4ecc60><div class="search-actions" data-v-7d4ecc60><button class="records-btn" data-v-7d4ecc60> \u{1F4CB} \u8003\u8BD5\u8BB0\u5F55 </button></div></div></section><section class="exam-section" data-v-7d4ecc60><div class="container" data-v-7d4ecc60>`);
      if (loading.value) {
        _push(`<div class="loading-center" data-v-7d4ecc60><span class="spinner" data-v-7d4ecc60></span><span data-v-7d4ecc60>\u52A0\u8F7D\u8003\u6838\u573A\u6B21\u4E2D...</span></div>`);
      } else {
        _push(`<!--[--><div class="exam-list" data-v-7d4ecc60><!--[-->`);
        ssrRenderList(assessments.value, (assessment) => {
          _push(`<div class="${ssrRenderClass([getCardClass(assessment), "exam-card"])}" data-v-7d4ecc60><div class="exam-content" data-v-7d4ecc60><div class="exam-header" data-v-7d4ecc60><h3 class="exam-title" data-v-7d4ecc60>${ssrInterpolate(assessment.assessmentName)}</h3><span class="${ssrRenderClass([assessment.assessmentType.toLowerCase(), "type-tag"])}" data-v-7d4ecc60>${ssrInterpolate(getAssessmentTypeLabel(assessment.assessmentType))}</span><span class="${ssrRenderClass([assessment.status.toLowerCase().replace("_", "-"), "status-tag"])}" data-v-7d4ecc60>${ssrInterpolate(getStatusLabel(assessment.status))}</span></div><p class="exam-paper" data-v-7d4ecc60>\u8BD5\u5377\uFF1A${ssrInterpolate(assessment.paperName)}</p><div class="exam-meta" data-v-7d4ecc60><span class="meta-item" data-v-7d4ecc60><span class="meta-icon" data-v-7d4ecc60>\u23F1\uFE0F</span> \u65F6\u957F ${ssrInterpolate(assessment.durationMinutes)} \u5206\u949F </span><span class="meta-item" data-v-7d4ecc60><span class="meta-icon" data-v-7d4ecc60>\u{1F4C5}</span> ${ssrInterpolate(formatDateRange(assessment.startAt, assessment.endAt))}</span>`);
          if (assessment.countdownSeconds > 0) {
            _push(`<span class="meta-item countdown" data-v-7d4ecc60><span class="meta-icon" data-v-7d4ecc60>\u23F0</span> \u8DDD\u79BB\u5F00\u59CB\uFF1A${ssrInterpolate(formatCountdown(assessment.countdownSeconds))}</span>`);
          } else {
            _push(`<!---->`);
          }
          if (assessment.participantStatus) {
            _push(`<span class="meta-item" data-v-7d4ecc60><span class="meta-icon" data-v-7d4ecc60>\u{1F4DD}</span> ${ssrInterpolate(getParticipantStatusLabel(assessment.participantStatus))}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div><div class="exam-actions" data-v-7d4ecc60><button class="detail-btn" data-v-7d4ecc60> \u67E5\u770B\u8BE6\u60C5 </button><button class="exam-button"${ssrIncludeBooleanAttr(!canStartExam(assessment)) ? " disabled" : ""} data-v-7d4ecc60>${ssrInterpolate(getButtonText(assessment))}</button></div></div>`);
        });
        _push(`<!--]--></div>`);
        if (assessments.value.length === 0) {
          _push(`<div class="empty-state" data-v-7d4ecc60><p data-v-7d4ecc60>\u6682\u65E0\u8003\u6838\u573A\u6B21</p></div>`);
        } else {
          _push(`<!---->`);
        }
        if (total.value > pageSize.value) {
          _push(`<section class="pagination-section" data-v-7d4ecc60><div class="pagination" data-v-7d4ecc60><button class="page-btn"${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} data-v-7d4ecc60> \u4E0A\u4E00\u9875 </button><span class="page-info" data-v-7d4ecc60> \u7B2C ${ssrInterpolate(currentPage.value)} / ${ssrInterpolate(totalPages.value)} \u9875 </span><button class="page-btn"${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} data-v-7d4ecc60> \u4E0B\u4E00\u9875 </button></div></section>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      }
      _push(`</div></section>`);
      if (showDetailModal.value) {
        _push(`<div class="modal-overlay" data-v-7d4ecc60><div class="modal-content" data-v-7d4ecc60><div class="modal-header" data-v-7d4ecc60><h2 class="modal-title" data-v-7d4ecc60>\u8003\u6838\u573A\u6B21\u8BE6\u60C5</h2><button class="modal-close" data-v-7d4ecc60>\xD7</button></div>`);
        if (detailLoading.value) {
          _push(`<div class="modal-loading" data-v-7d4ecc60><span class="spinner" data-v-7d4ecc60></span><span data-v-7d4ecc60>\u52A0\u8F7D\u4E2D...</span></div>`);
        } else if (currentAssessment.value) {
          _push(`<div class="modal-body" data-v-7d4ecc60><div class="detail-section" data-v-7d4ecc60><h3 class="detail-section-title" data-v-7d4ecc60>\u57FA\u672C\u4FE1\u606F</h3><div class="detail-row" data-v-7d4ecc60><span class="detail-label" data-v-7d4ecc60>\u8003\u6838\u540D\u79F0\uFF1A</span><span class="detail-value" data-v-7d4ecc60>${ssrInterpolate(currentAssessment.value.assessmentName)}</span></div><div class="detail-row" data-v-7d4ecc60><span class="detail-label" data-v-7d4ecc60>\u8BD5\u5377\u540D\u79F0\uFF1A</span><span class="detail-value" data-v-7d4ecc60>${ssrInterpolate(currentAssessment.value.paperName)}</span></div><div class="detail-row" data-v-7d4ecc60><span class="detail-label" data-v-7d4ecc60>\u8003\u6838\u7C7B\u578B\uFF1A</span><span class="detail-value" data-v-7d4ecc60><span class="${ssrRenderClass([currentAssessment.value.assessmentType.toLowerCase(), "type-tag"])}" data-v-7d4ecc60>${ssrInterpolate(getAssessmentTypeLabel(currentAssessment.value.assessmentType))}</span></span></div><div class="detail-row" data-v-7d4ecc60><span class="detail-label" data-v-7d4ecc60>\u8003\u6838\u72B6\u6001\uFF1A</span><span class="detail-value" data-v-7d4ecc60><span class="${ssrRenderClass([currentAssessment.value.status.toLowerCase().replace("_", "-"), "status-tag"])}" data-v-7d4ecc60>${ssrInterpolate(getStatusLabel(currentAssessment.value.status))}</span></span></div></div><div class="detail-section" data-v-7d4ecc60><h3 class="detail-section-title" data-v-7d4ecc60>\u65F6\u95F4\u4FE1\u606F</h3><div class="detail-row" data-v-7d4ecc60><span class="detail-label" data-v-7d4ecc60>\u5F00\u59CB\u65F6\u95F4\uFF1A</span><span class="detail-value" data-v-7d4ecc60>${ssrInterpolate(formatDateTime(currentAssessment.value.startAt))}</span></div><div class="detail-row" data-v-7d4ecc60><span class="detail-label" data-v-7d4ecc60>\u7ED3\u675F\u65F6\u95F4\uFF1A</span><span class="detail-value" data-v-7d4ecc60>${ssrInterpolate(formatDateTime(currentAssessment.value.endAt))}</span></div><div class="detail-row" data-v-7d4ecc60><span class="detail-label" data-v-7d4ecc60>\u8003\u6838\u65F6\u957F\uFF1A</span><span class="detail-value" data-v-7d4ecc60>${ssrInterpolate(currentAssessment.value.durationMinutes)} \u5206\u949F</span></div>`);
          if (currentAssessment.value.countdownSeconds > 0) {
            _push(`<div class="detail-row" data-v-7d4ecc60><span class="detail-label" data-v-7d4ecc60>\u8DDD\u79BB\u5F00\u59CB\uFF1A</span><span class="detail-value countdown" data-v-7d4ecc60>${ssrInterpolate(formatCountdown(currentAssessment.value.countdownSeconds))}</span></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          if (currentAssessment.value.participantStatus) {
            _push(`<div class="detail-section" data-v-7d4ecc60><h3 class="detail-section-title" data-v-7d4ecc60>\u7B54\u9898\u72B6\u6001</h3><div class="detail-row" data-v-7d4ecc60><span class="detail-label" data-v-7d4ecc60>\u7B54\u9898\u72B6\u6001\uFF1A</span><span class="detail-value" data-v-7d4ecc60>${ssrInterpolate(getParticipantStatusLabel(currentAssessment.value.participantStatus))}</span></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="modal-footer" data-v-7d4ecc60><button class="modal-btn cancel-btn" data-v-7d4ecc60>\u5173\u95ED</button><button class="modal-btn primary-btn"${ssrIncludeBooleanAttr(!canStartExam(currentAssessment.value)) ? " disabled" : ""} data-v-7d4ecc60>${ssrInterpolate(getButtonText(currentAssessment.value))}</button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/exam/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7d4ecc60"]]);

export { index as default };
//# sourceMappingURL=index-BcidU3h6.mjs.map
