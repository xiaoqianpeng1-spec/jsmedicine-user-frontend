import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const currentAudio = ref(null);
    const progress = ref(35);
    const audios = ref([
      {
        id: 1,
        cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20podcast%20audio%20cover%20green%20theme&image_size=square",
        title: "\u4E2D\u533B\u517B\u751F\u4E4B\u9053 - \u56DB\u5B63\u517B\u751F\u6CD5",
        teacher: "\u738B\u6559\u6388",
        duration: "28:30"
      },
      {
        id: 2,
        cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20herbs%20audio%20cover&image_size=square",
        title: "\u4E2D\u836F\u5C0F\u6545\u4E8B - \u9EC4\u82AA\u7684\u4F20\u8BF4",
        teacher: "\u674E\u836F\u5E08",
        duration: "15:45"
      },
      {
        id: 3,
        cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20acupuncture%20audio%20cover%20green&image_size=square",
        title: "\u9488\u7078\u5165\u95E8 - \u7ECF\u7EDC\u5B66\u8BF4\u8BE6\u89E3",
        teacher: "\u5F20\u533B\u5E08",
        duration: "32:10"
      },
      {
        id: 4,
        cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20diagnosis%20audio%20cover&image_size=square",
        title: "\u4E2D\u533B\u56DB\u8BCA - \u8109\u8BCA\u5165\u95E8",
        teacher: "\u9648\u6559\u6388",
        duration: "25:55"
      },
      {
        id: 5,
        cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20health%20audio%20cover&image_size=square",
        title: "\u4E2D\u533B\u98DF\u7597 - \u836F\u81B3\u517B\u751F",
        teacher: "\u5218\u8425\u517B\u5E08",
        duration: "20:30"
      },
      {
        id: 6,
        cover: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20classics%20audio%20cover&image_size=square",
        title: "\u9EC4\u5E1D\u5185\u7ECF - \u7D20\u95EE\u89E3\u8BFB",
        teacher: "\u8D75\u6559\u6388",
        duration: "45:00"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "audio-page" }, _attrs))} data-v-dc01e564><div class="container" data-v-dc01e564><div class="page-header" data-v-dc01e564><h1 class="page-title" data-v-dc01e564>\u97F3\u9891\u8BFE\u7A0B</h1><p class="page-desc" data-v-dc01e564>\u968F\u65F6\u968F\u5730\uFF0C\u542C\u5B66\u4E2D\u533B\u77E5\u8BC6</p></div><div class="audio-list" data-v-dc01e564><!--[-->`);
      ssrRenderList(audios.value, (audio) => {
        _push(`<div class="${ssrRenderClass([{ playing: currentAudio.value === audio.id }, "audio-card"])}" data-v-dc01e564><div class="audio-cover" data-v-dc01e564><img${ssrRenderAttr("src", audio.cover)}${ssrRenderAttr("alt", audio.title)} data-v-dc01e564><div class="play-status" data-v-dc01e564>`);
        if (currentAudio.value === audio.id) {
          _push(`<span class="playing-icon" data-v-dc01e564>\u23F8</span>`);
        } else {
          _push(`<span class="play-icon" data-v-dc01e564>\u25B6</span>`);
        }
        _push(`</div></div><div class="audio-info" data-v-dc01e564><h3 class="audio-title" data-v-dc01e564>${ssrInterpolate(audio.title)}</h3><p class="audio-teacher" data-v-dc01e564>${ssrInterpolate(audio.teacher)}</p>`);
        if (currentAudio.value === audio.id) {
          _push(`<div class="audio-progress" data-v-dc01e564><div class="progress-bar" data-v-dc01e564><div class="progress-fill" style="${ssrRenderStyle({ width: progress.value + "%" })}" data-v-dc01e564></div></div><span class="progress-time" data-v-dc01e564>03:45 / ${ssrInterpolate(audio.duration)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="audio-duration" data-v-dc01e564>${ssrInterpolate(audio.duration)}</div></div>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/audio/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dc01e564"]]);

export { index as default };
//# sourceMappingURL=index-Bg-ZV1AT.mjs.map
