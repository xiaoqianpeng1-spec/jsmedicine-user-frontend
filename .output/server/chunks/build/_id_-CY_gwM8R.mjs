import { defineComponent, ref, reactive, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderStyle, ssrRenderList } from 'vue/server-renderer';
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
    const loading = ref(false);
    const error = ref("");
    const activeTab = ref("intro");
    const progress = ref(0);
    const currentAudioIndex = ref(0);
    const isPlaying = ref(false);
    const isMuted = ref(false);
    const currentTime = ref(0);
    const duration = ref(0);
    ref(null);
    const podcast = reactive({
      id: 0,
      title: "",
      summary: "",
      coverUrl: "",
      speakerName: "",
      tags: [],
      publishedAt: "",
      browseCount: 0,
      favoriteCount: 0,
      favorited: false,
      progressPercent: 0,
      studySeconds: 0,
      audios: []
    });
    const currentAudio = computed(() => {
      if (podcast.audios && podcast.audios.length > 0 && currentAudioIndex.value < podcast.audios.length) {
        return podcast.audios[currentAudioIndex.value];
      }
      return null;
    });
    const getCurrentAudioUrl = computed(() => {
      if (!currentAudio.value) return null;
      const config = useRuntimeConfig();
      const baseUrl = config.public.apiBase || "";
      const audio = currentAudio.value;
      const possibleFields = ["audioUrl", "audio_url", "url", "src", "audioSrc"];
      for (const field of possibleFields) {
        if (audio[field]) {
          let audioUrl = audio[field];
          if (audioUrl.startsWith("http://") || audioUrl.startsWith("https://")) {
            return audioUrl;
          }
          if (audioUrl.startsWith("/api/v1")) {
            return audioUrl;
          }
          if (audioUrl.startsWith("/")) {
            audioUrl = baseUrl + audioUrl;
          } else {
            audioUrl = baseUrl + "/" + audioUrl;
          }
          return audioUrl;
        }
      }
      return null;
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
    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      try {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
      } catch {
        return dateStr;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "audio-detail-page" }, _attrs))} data-v-a3712f63><section class="page-banner" data-v-a3712f63><div class="container" data-v-a3712f63><h1 class="banner-title" data-v-a3712f63>\u97F3\u9891\u8BFE\u7A0B</h1><p class="banner-desc" data-v-a3712f63>\u968F\u65F6\u968F\u5730\uFF0C\u542C\u5B66\u4E2D\u533B\u77E5\u8BC6</p></div></section><div class="breadcrumb-section" data-v-a3712f63><div class="container" data-v-a3712f63><div class="breadcrumb" data-v-a3712f63><span class="breadcrumb-item" data-v-a3712f63>\u9996\u9875</span><span class="breadcrumb-separator" data-v-a3712f63>&gt;</span><span class="breadcrumb-item" data-v-a3712f63>\u97F3\u9891</span><span class="breadcrumb-separator" data-v-a3712f63>&gt;</span><span class="breadcrumb-item active" data-v-a3712f63>${ssrInterpolate(podcast.title)}</span></div></div></div>`);
      if (loading.value) {
        _push(`<div class="loading-state" data-v-a3712f63><div class="spinner" data-v-a3712f63></div><p data-v-a3712f63>\u52A0\u8F7D\u4E2D...</p></div>`);
      } else if (error.value) {
        _push(`<div class="error-state" data-v-a3712f63>`);
        if (error.value === "\u672A\u6388\u6743\uFF0C\u8BF7\u767B\u5F55") {
          _push(`<div class="login-prompt" data-v-a3712f63><div class="login-icon" data-v-a3712f63>\u{1F510}</div><h3 data-v-a3712f63>\u9700\u8981\u767B\u5F55</h3><p data-v-a3712f63>\u6536\u542C\u97F3\u9891\u8BFE\u7A0B\u9700\u8981\u5148\u767B\u5F55\u8D26\u53F7</p><button class="login-btn" data-v-a3712f63>\u7ACB\u5373\u767B\u5F55</button></div>`);
        } else {
          _push(`<div data-v-a3712f63><p data-v-a3712f63>${ssrInterpolate(error.value)}</p><button class="retry-btn" data-v-a3712f63>\u91CD\u8BD5</button></div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<section class="audio-content-section" data-v-a3712f63><div class="container" data-v-a3712f63><div class="audio-player-wrapper" data-v-a3712f63><div class="audio-player" data-v-a3712f63><div class="player-inner" data-v-a3712f63><div class="album-cover" data-v-a3712f63><img${ssrRenderAttr("src", podcast.coverUrl || "https://via.placeholder.com/200x200?text=\u97F3\u9891\u5C01\u9762")}${ssrRenderAttr("alt", podcast.title)} data-v-a3712f63><div class="cover-overlay" data-v-a3712f63><div class="${ssrRenderClass([{ playing: isPlaying.value }, "disc-rotate"])}" data-v-a3712f63><div class="disc-center" data-v-a3712f63></div></div></div></div><div class="player-controls" data-v-a3712f63><audio${ssrRenderAttr("src", getCurrentAudioUrl.value)} data-v-a3712f63></audio><button class="play-button" data-v-a3712f63>${ssrInterpolate(isPlaying.value ? "\u23F8" : "\u25B6")}</button><div class="progress-bar" data-v-a3712f63><div class="progress-fill" style="${ssrRenderStyle({ width: progress.value + "%" })}" data-v-a3712f63></div><div class="progress-dot" style="${ssrRenderStyle({ left: progress.value + "%" })}" data-v-a3712f63></div></div><span class="time-display" data-v-a3712f63>${ssrInterpolate(formatTime(currentTime.value))} / ${ssrInterpolate(formatTime(duration.value))}</span><button class="volume-button" data-v-a3712f63>${ssrInterpolate(isMuted.value ? "\u{1F507}" : "\u{1F50A}")}</button></div></div>`);
        if (currentAudio.value) {
          _push(`<div class="current-audio-info" data-v-a3712f63><h3 class="current-audio-title" data-v-a3712f63>${ssrInterpolate(currentAudio.value.title)}</h3><div class="current-audio-meta" data-v-a3712f63><span class="meta-duration" data-v-a3712f63>\u65F6\u957F\uFF1A${ssrInterpolate(formatDuration(currentAudio.value.durationSeconds))}</span></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="tab-container" data-v-a3712f63><div class="tabs" data-v-a3712f63><button class="${ssrRenderClass([{ active: activeTab.value === "intro" }, "tab"])}" data-v-a3712f63> \u7B80\u4ECB </button><button class="${ssrRenderClass([{ active: activeTab.value === "catalog" }, "tab"])}" data-v-a3712f63> \u76EE\u5F55 </button></div>`);
        if (activeTab.value === "intro") {
          _push(`<div class="tab-content intro-content" data-v-a3712f63><h2 class="content-title" data-v-a3712f63>${ssrInterpolate(podcast.title)}</h2><div class="audio-meta" data-v-a3712f63><span class="meta-item" data-v-a3712f63>\u4E3B\u8BB2\uFF1A${ssrInterpolate(podcast.speakerName)}</span><span class="meta-item" data-v-a3712f63>\u{1F4C5} ${ssrInterpolate(formatDate(podcast.publishedAt))}</span><span class="meta-item" data-v-a3712f63>\u{1F441}\uFE0F ${ssrInterpolate(formatNumber(podcast.browseCount))}</span><span class="meta-item" data-v-a3712f63>\u2B50 ${ssrInterpolate(formatNumber(podcast.favoriteCount))}</span></div><div class="intro-section" data-v-a3712f63><h3 class="section-title" data-v-a3712f63>\u97F3\u9891\u4ECB\u7ECD</h3><p class="intro-text" data-v-a3712f63>${ssrInterpolate(podcast.summary)}</p></div>`);
          if (podcast.tags && podcast.tags.length > 0) {
            _push(`<div class="tags-section" data-v-a3712f63><h3 class="section-title" data-v-a3712f63>\u6807\u7B7E</h3><div class="tags-list" data-v-a3712f63><!--[-->`);
            ssrRenderList(podcast.tags, (tag) => {
              _push(`<span class="tag-item" data-v-a3712f63>${ssrInterpolate(tag)}</span>`);
            });
            _push(`<!--]--></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="progress-section" data-v-a3712f63><h3 class="section-title" data-v-a3712f63>\u5B66\u4E60\u8FDB\u5EA6</h3><div class="progress-info" data-v-a3712f63><div class="progress-bar-wrapper" data-v-a3712f63><div class="progress-fill-full" style="${ssrRenderStyle({ width: podcast.progressPercent + "%" })}" data-v-a3712f63></div></div><div class="progress-stats" data-v-a3712f63><span class="progress-percent" data-v-a3712f63>\u5DF2\u5B66\u4E60 ${ssrInterpolate(podcast.progressPercent)}%</span><span class="progress-time" data-v-a3712f63>\u7D2F\u8BA1\u5B66\u4E60 ${ssrInterpolate(formatDuration(podcast.studySeconds))}</span></div></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (activeTab.value === "catalog") {
          _push(`<div class="tab-content catalog-content" data-v-a3712f63><!--[-->`);
          ssrRenderList(podcast.audios, (audio, index) => {
            _push(`<div class="${ssrRenderClass([{ active: currentAudioIndex.value === index }, "chapter-item"])}" data-v-a3712f63><span class="chapter-title" data-v-a3712f63>${ssrInterpolate(audio.title)}</span><span class="chapter-duration" data-v-a3712f63>${ssrInterpolate(formatDuration(audio.durationSeconds))}</span></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/audio/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a3712f63"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-CY_gwM8R.mjs.map
