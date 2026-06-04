import { defineComponent, ref, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useRouter } from "vue-router";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const activeTab = ref("all");
    const searchKeyword = ref("");
    const currentPage = ref(1);
    const totalPages = ref(5);
    const filterTabs = [
      { id: "all", name: "全部" },
      { id: "news", name: "新闻资讯" },
      { id: "academic", name: "学术交流" },
      { id: "industry", name: "行业动态" },
      { id: "research", name: "研究成果" }
    ];
    const articles = ref([
      {
        id: 1,
        image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=medical%20conference%20professional%20news&image_size=landscape_4_3",
        title: "首届中澳全科医学教育与基层医疗实践网络研讨会召开在即",
        summary: "本次研讨会将汇聚国内外全科医学领域的专家学者，共同探讨全科医学教育的创新模式和基层医疗实践的发展方向...",
        tag: "新闻资讯",
        tagClass: "tag-red",
        author: "中医在线",
        time: "2024-01-15",
        views: 435678,
        comments: 43
      },
      {
        id: 2,
        image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20research%20laboratory&image_size=landscape_4_3",
        title: "中医药数字化转型研讨会成功举办",
        summary: "会议围绕中医药数字化转型的前沿技术、应用场景和发展趋势进行了深入交流，展示了多项创新成果...",
        tag: "学术交流",
        tagClass: "tag-pink",
        author: "学术部",
        time: "2024-01-14",
        views: 324567,
        comments: 38
      },
      {
        id: 3,
        image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=traditional%20Chinese%20medicine%20education%20classroom&image_size=landscape_4_3",
        title: "中医药高等教育创新发展论坛圆满落幕",
        summary: "来自全国各大中医药院校的专家学者齐聚一堂，就中医药人才培养、课程改革等议题展开研讨...",
        tag: "行业动态",
        tagClass: "tag-blue",
        author: "教育频道",
        time: "2024-01-13",
        views: 298765,
        comments: 52
      },
      {
        id: 4,
        image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20herbs%20research%20scientific&image_size=landscape_4_3",
        title: "中医药防治新冠病毒研究取得新进展",
        summary: "最新研究表明，中医药在新冠病毒防治中具有显著疗效，为全球抗疫提供了中国方案...",
        tag: "研究成果",
        tagClass: "tag-green",
        author: "科研中心",
        time: "2024-01-12",
        views: 567890,
        comments: 89
      },
      {
        id: 5,
        image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20conference%20event&image_size=landscape_4_3",
        title: "2024年全国中医药工作会议在北京召开",
        summary: "会议总结了过去一年中医药事业发展取得的成就，部署了新一年的重点工作任务...",
        tag: "新闻资讯",
        tagClass: "tag-red",
        author: "中医在线",
        time: "2024-01-11",
        views: 789012,
        comments: 120
      }
    ]);
    const pageNumbers = computed(() => {
      return Array.from({ length: totalPages.value }, (_, i) => i + 1);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "articles-page" }, _attrs))} data-v-27dfceb6><section class="page-banner" data-v-27dfceb6><div class="container" data-v-27dfceb6><h1 class="banner-title" data-v-27dfceb6>资讯中心</h1><p class="banner-desc" data-v-27dfceb6>获取最新中医行业动态与学术资讯</p></div></section><section class="filter-section" data-v-27dfceb6><div class="container" data-v-27dfceb6><div class="filter-tabs" data-v-27dfceb6><!--[-->`);
      ssrRenderList(filterTabs, (tab) => {
        _push(`<button class="${ssrRenderClass([{ active: activeTab.value === tab.id }, "filter-tab"])}" data-v-27dfceb6>${ssrInterpolate(tab.name)}</button>`);
      });
      _push(`<!--]--></div><div class="search-box" data-v-27dfceb6><input${ssrRenderAttr("value", searchKeyword.value)} type="text" placeholder="搜索资讯..." data-v-27dfceb6><button class="search-btn" data-v-27dfceb6><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-27dfceb6><circle cx="11" cy="11" r="8" data-v-27dfceb6></circle><path d="m21 21-4.35-4.35" data-v-27dfceb6></path></svg></button></div></div></section><section class="articles-section" data-v-27dfceb6><div class="container" data-v-27dfceb6><div class="articles-list" data-v-27dfceb6><!--[-->`);
      ssrRenderList(articles.value, (article) => {
        _push(`<div class="article-card" data-v-27dfceb6><div class="article-image" data-v-27dfceb6><img${ssrRenderAttr("src", article.image)}${ssrRenderAttr("alt", article.title)} data-v-27dfceb6></div><div class="article-content" data-v-27dfceb6><span class="${ssrRenderClass([article.tagClass, "article-tag"])}" data-v-27dfceb6>${ssrInterpolate(article.tag)}</span><h3 class="article-title" data-v-27dfceb6>${ssrInterpolate(article.title)}</h3><p class="article-summary" data-v-27dfceb6>${ssrInterpolate(article.summary)}</p><div class="article-footer" data-v-27dfceb6><span class="article-author" data-v-27dfceb6>${ssrInterpolate(article.author)}</span><span class="article-time" data-v-27dfceb6>${ssrInterpolate(article.time)}</span><span class="article-views" data-v-27dfceb6>👁️ ${ssrInterpolate(article.views)}</span><span class="article-comments" data-v-27dfceb6>💬 ${ssrInterpolate(article.comments)}</span></div></div></div>`);
      });
      _push(`<!--]--></div><div class="pagination" data-v-27dfceb6><button class="pagination-btn"${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} data-v-27dfceb6> ← 上一页 </button><div class="page-numbers" data-v-27dfceb6><!--[-->`);
      ssrRenderList(pageNumbers.value, (page) => {
        _push(`<span class="${ssrRenderClass([{ active: currentPage.value === page }, "page-number"])}" data-v-27dfceb6>${ssrInterpolate(page)}</span>`);
      });
      _push(`<!--]--></div><button class="pagination-btn"${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} data-v-27dfceb6> 下一页 → </button></div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/articles/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-27dfceb6"]]);
export {
  index as default
};
//# sourceMappingURL=index-BeJUwZTl.js.map
