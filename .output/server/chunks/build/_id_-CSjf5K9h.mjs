import { defineComponent, ref, reactive, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderStyle, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
import { useRouter, useRoute } from 'vue-router';
import { h as useRuntimeConfig } from './server.mjs';
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
import 'axios';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    useRoute();
    const config = useRuntimeConfig();
    const loading = ref(false);
    const error = ref("");
    const activeTab = ref("intro");
    const currentVideoIndex = ref(0);
    const progress = ref(0);
    const isPlaying = ref(false);
    const isMuted = ref(false);
    const currentTime = ref(0);
    const duration = ref(0);
    ref(null);
    const videoError = ref("");
    const course = reactive({
      id: 0,
      courseName: "",
      subtitle: "",
      coverUrl: "",
      lecturerName: "",
      introduction: "",
      paperId: 0,
      publishedAt: "",
      browseCount: 0,
      favoriteCount: 0,
      favorited: false,
      progressPercent: 0,
      studySeconds: 0,
      videos: []
    });
    const currentVideo = computed(() => {
      if (course.videos && course.videos.length > 0 && currentVideoIndex.value < course.videos.length) {
        return course.videos[currentVideoIndex.value];
      }
      return null;
    });
    const formatTotalDuration = computed(() => {
      if (!course.videos || course.videos.length === 0) return "0\u5206\u949F";
      const totalSeconds = course.videos.reduce((sum, video) => sum + (video.durationSeconds || 0), 0);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor(totalSeconds % 3600 / 60);
      if (hours > 0) {
        return `${hours}\u5C0F\u65F6${minutes}\u5206\u949F`;
      }
      return `${minutes}\u5206\u949F`;
    });
    const formatStudyTime = computed(() => {
      const seconds = course.studySeconds || 0;
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor(seconds % 3600 / 60);
      if (hours > 0) {
        return `${hours}\u5C0F\u65F6${minutes}\u5206\u949F`;
      }
      return `${minutes}\u5206\u949F`;
    });
    const formatDate = (dateStr) => {
      if (!dateStr) return "\u672A\u77E5";
      try {
        const date = new Date(dateStr);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      } catch {
        return dateStr;
      }
    };
    const getCurrentVideoUrl = computed(() => {
      if (!currentVideo.value) return null;
      const baseUrl = config.public.apiBase || "";
      const video = currentVideo.value;
      const possibleFields = ["videoUrl", "video_url", "url", "src", "videoSrc"];
      for (const field of possibleFields) {
        if (video[field]) {
          let videoUrl = video[field];
          if (videoUrl.startsWith("http://") || videoUrl.startsWith("https://")) {
            return videoUrl;
          }
          if (videoUrl.startsWith("/api/v1")) {
            return videoUrl;
          }
          if (videoUrl.startsWith("/")) {
            videoUrl = baseUrl + videoUrl;
          } else {
            videoUrl = baseUrl + "/" + videoUrl;
          }
          return videoUrl;
        }
      }
    });
    const formatNumber = (num) => {
      if (num >= 1e4) {
        return (num / 1e4).toFixed(1) + "w";
      }
      return num.toString();
    };
    const formatDuration = (seconds) => {
      if (!seconds) return "00:00";
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };
    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "video-detail-page" }, _attrs))} data-v-ff9d6b6d><section class="page-banner" data-v-ff9d6b6d><div class="container" data-v-ff9d6b6d><h1 class="banner-title" data-v-ff9d6b6d>\u89C6\u9891\u8BFE\u7A0B</h1><p class="banner-desc" data-v-ff9d6b6d>\u540D\u5E08\u6388\u8BFE\uFF0C\u968F\u65F6\u968F\u5730\u5B66\u4E60\u4E2D\u533B\u77E5\u8BC6</p></div></section><div class="breadcrumb-section" data-v-ff9d6b6d><div class="container" data-v-ff9d6b6d><div class="breadcrumb" data-v-ff9d6b6d><span class="breadcrumb-item" data-v-ff9d6b6d>\u9996\u9875</span><span class="breadcrumb-separator" data-v-ff9d6b6d>&gt;</span><span class="breadcrumb-item" data-v-ff9d6b6d>\u89C6\u9891</span><span class="breadcrumb-separator" data-v-ff9d6b6d>&gt;</span><span class="breadcrumb-item active" data-v-ff9d6b6d>${ssrInterpolate(course.courseName)}</span></div></div></div>`);
      if (loading.value) {
        _push(`<div class="loading-state" data-v-ff9d6b6d><div class="spinner" data-v-ff9d6b6d></div><p data-v-ff9d6b6d>\u52A0\u8F7D\u4E2D...</p></div>`);
      } else if (error.value) {
        _push(`<div class="error-state" data-v-ff9d6b6d>`);
        if (error.value === "\u672A\u6388\u6743\uFF0C\u8BF7\u767B\u5F55") {
          _push(`<div class="login-prompt" data-v-ff9d6b6d><div class="login-icon" data-v-ff9d6b6d>\u{1F510}</div><h3 data-v-ff9d6b6d>\u9700\u8981\u767B\u5F55</h3><p data-v-ff9d6b6d>\u89C2\u770B\u8BFE\u7A0B\u9700\u8981\u5148\u767B\u5F55\u8D26\u53F7</p><button class="login-btn" data-v-ff9d6b6d>\u7ACB\u5373\u767B\u5F55</button></div>`);
        } else {
          _push(`<div data-v-ff9d6b6d><p data-v-ff9d6b6d>${ssrInterpolate(error.value)}</p><button class="retry-btn" data-v-ff9d6b6d>\u91CD\u8BD5</button></div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<section class="video-content-section" data-v-ff9d6b6d><div class="container" data-v-ff9d6b6d><div class="video-player-wrapper" data-v-ff9d6b6d>`);
        if (currentVideo.value) {
          _push(`<div class="current-video-info" data-v-ff9d6b6d><h3 class="current-video-title" data-v-ff9d6b6d>${ssrInterpolate(currentVideo.value.title)}</h3><div class="current-video-meta" data-v-ff9d6b6d>`);
          if (currentVideo.value.paperId) {
            _push(`<span class="meta-tag" data-v-ff9d6b6d>\u5305\u542B\u4E60\u9898</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<span class="meta-duration" data-v-ff9d6b6d>\u65F6\u957F\uFF1A${ssrInterpolate(formatDuration(currentVideo.value.durationSeconds))}</span></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="video-player" data-v-ff9d6b6d>`);
        if (getCurrentVideoUrl.value) {
          _push(`<video${ssrRenderAttr("src", getCurrentVideoUrl.value)} class="video-element" data-v-ff9d6b6d></video>`);
        } else {
          _push(`<div class="video-poster-wrapper" data-v-ff9d6b6d><img${ssrRenderAttr("src", course.coverUrl || "https://via.placeholder.com/1280x720?text=\u8BFE\u7A0B\u5C01\u9762")}${ssrRenderAttr("alt", course.courseName)} class="video-poster" data-v-ff9d6b6d><div class="video-overlay" data-v-ff9d6b6d><span class="overlay-text" data-v-ff9d6b6d>\u6682\u65E0\u64AD\u653E\u6E90</span></div></div>`);
        }
        if (videoError.value) {
          _push(`<div class="video-error-overlay" data-v-ff9d6b6d><p data-v-ff9d6b6d>\u26A0\uFE0F ${ssrInterpolate(videoError.value)}</p><button class="retry-video-btn" data-v-ff9d6b6d>\u91CD\u65B0\u52A0\u8F7D</button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="video-controls" data-v-ff9d6b6d><button class="play-button" data-v-ff9d6b6d>${ssrInterpolate(isPlaying.value ? "\u23F8" : "\u25B6")}</button><div class="progress-bar" data-v-ff9d6b6d><div class="progress-fill" style="${ssrRenderStyle({ width: progress.value + "%" })}" data-v-ff9d6b6d></div><div class="progress-dot" style="${ssrRenderStyle({ left: progress.value + "%" })}" data-v-ff9d6b6d></div></div><span class="time-display" data-v-ff9d6b6d>${ssrInterpolate(formatTime(currentTime.value))} / ${ssrInterpolate(formatTime(duration.value))}</span><button class="volume-button" data-v-ff9d6b6d>${ssrInterpolate(isMuted.value ? "\u{1F507}" : "\u{1F50A}")}</button><button class="quality-button" data-v-ff9d6b6d>1080P</button><button class="fullscreen-button" data-v-ff9d6b6d>\u26F6</button></div></div></div><div class="tab-container" data-v-ff9d6b6d><div class="tabs" data-v-ff9d6b6d><button class="${ssrRenderClass([{ active: activeTab.value === "intro" }, "tab"])}" data-v-ff9d6b6d> \u7B80\u4ECB </button><button class="${ssrRenderClass([{ active: activeTab.value === "catalog" }, "tab"])}" data-v-ff9d6b6d> \u76EE\u5F55 (${ssrInterpolate(((_a = course.videos) == null ? void 0 : _a.length) || 0)}) </button></div>`);
        if (activeTab.value === "intro") {
          _push(`<div class="tab-content intro-content" data-v-ff9d6b6d><h2 class="content-title" data-v-ff9d6b6d>${ssrInterpolate(course.courseName)}</h2><p class="content-subtitle" data-v-ff9d6b6d>${ssrInterpolate(course.subtitle)}</p><div class="video-meta" data-v-ff9d6b6d><span class="meta-item" data-v-ff9d6b6d>\u{1F441}\uFE0F ${ssrInterpolate(formatNumber(course.browseCount || 0))}</span><span class="meta-item" data-v-ff9d6b6d>\u2B50 ${ssrInterpolate(formatNumber(course.favoriteCount || 0))}</span>`);
          if (course.progressPercent > 0) {
            _push(`<span class="meta-item" data-v-ff9d6b6d> \u{1F4CA} \u8FDB\u5EA6\uFF1A${ssrInterpolate(course.progressPercent)}% </span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="intro-section" data-v-ff9d6b6d><h3 class="section-title" data-v-ff9d6b6d>\u8BFE\u7A0B\u4ECB\u7ECD</h3><p class="intro-text" data-v-ff9d6b6d>${ssrInterpolate(course.introduction || "\u6682\u65E0\u4ECB\u7ECD")}</p></div><div class="lecturer-section" data-v-ff9d6b6d><h3 class="section-title" data-v-ff9d6b6d>\u8BB2\u5E08\u4ECB\u7ECD</h3><p class="lecturer-name" data-v-ff9d6b6d>${ssrInterpolate(course.lecturerName)}</p></div><div class="course-info" data-v-ff9d6b6d><h3 class="section-title" data-v-ff9d6b6d>\u8BFE\u7A0B\u4FE1\u606F</h3><div class="info-grid" data-v-ff9d6b6d><div class="info-item" data-v-ff9d6b6d><span class="info-label" data-v-ff9d6b6d>\u89C6\u9891\u6570\u91CF\uFF1A</span><span class="info-value" data-v-ff9d6b6d>${ssrInterpolate(((_b = course.videos) == null ? void 0 : _b.length) || 0)} \u4E2A</span></div><div class="info-item" data-v-ff9d6b6d><span class="info-label" data-v-ff9d6b6d>\u603B\u65F6\u957F\uFF1A</span><span class="info-value" data-v-ff9d6b6d>${ssrInterpolate(formatTotalDuration.value)}</span></div><div class="info-item" data-v-ff9d6b6d><span class="info-label" data-v-ff9d6b6d>\u53D1\u5E03\u65F6\u95F4\uFF1A</span><span class="info-value" data-v-ff9d6b6d>${ssrInterpolate(formatDate(course.publishedAt))}</span></div><div class="info-item" data-v-ff9d6b6d><span class="info-label" data-v-ff9d6b6d>\u5B66\u4E60\u65F6\u957F\uFF1A</span><span class="info-value" data-v-ff9d6b6d>${ssrInterpolate(formatStudyTime.value)}</span></div></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (activeTab.value === "catalog") {
          _push(`<div class="tab-content catalog-content" data-v-ff9d6b6d><!--[-->`);
          ssrRenderList(course.videos, (video, index) => {
            _push(`<div class="${ssrRenderClass([{ active: currentVideoIndex.value === index }, "chapter-item"])}" data-v-ff9d6b6d><div class="chapter-info" data-v-ff9d6b6d><span class="chapter-number" data-v-ff9d6b6d>${ssrInterpolate(index + 1)}</span><span class="chapter-title" data-v-ff9d6b6d>${ssrInterpolate(video.title)}</span></div><div class="chapter-actions" data-v-ff9d6b6d><span class="chapter-duration" data-v-ff9d6b6d>${ssrInterpolate(formatDuration(video.durationSeconds))}</span>`);
            if (video.paperId) {
              _push(`<span class="chapter-exam" data-v-ff9d6b6d>\u{1F4DD}</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></section>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/video/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ff9d6b6d"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-CSjf5K9h.mjs.map
