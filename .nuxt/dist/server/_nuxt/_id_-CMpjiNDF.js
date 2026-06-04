import { defineComponent, computed, ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { useRoute, useRouter } from "vue-router";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useRouter();
    const articleId = computed(() => parseInt(route.params.id));
    const articles = ref([
      {
        id: 1,
        image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=medical%20conference%20professional%20news&image_size=landscape_4_3",
        title: "首届中澳全科医学教育与基层医疗实践网络研讨会召开在即",
        tag: "新闻资讯",
        tagClass: "tag-red",
        author: "中医在线",
        time: "2024-01-15",
        views: 435678,
        comments: 43,
        likes: 128,
        content: '本次研讨会将汇聚国内外全科医学领域的专家学者，共同探讨全科医学教育的创新模式和基层医疗实践的发展方向。会议旨在加强中澳两国在全科医学领域的学术交流与合作，分享先进的医疗理念和实践经验。\n\n近年来，全科医学在全球范围内受到越来越多的关注。随着人口老龄化和慢性病患病率的上升，基层医疗服务的重要性日益凸显。全科医生作为居民健康的"守门人"，承担着预防、治疗、康复等多方面的职责。\n\n本次研讨会将邀请来自中国和澳大利亚的知名专家学者，围绕全科医学教育体系建设、基层医疗服务模式创新、信息化技术在医疗中的应用等议题展开深入讨论。参会者将有机会与国内外同行进行面对面的交流，拓宽视野，增进合作。\n\n会议还将设置专题讲座、案例分享、互动讨论等环节，为参会者提供丰富多样的学习和交流机会。我们期待通过本次研讨会，推动中澳全科医学领域的合作与发展，为提升基层医疗服务水平做出贡献。',
        speakers: [
          {
            name: "张明华",
            title: "教授、博士生导师",
            institution: "北京中医药大学",
            avatar: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=professional%20chinese%20male%20professor%20portrait&image_size=square"
          },
          {
            name: "李雪梅",
            title: "主任医师",
            institution: "中国中医科学院",
            avatar: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=professional%20chinese%20female%20doctor%20portrait&image_size=square"
          },
          {
            name: "John Smith",
            title: "Professor",
            institution: "University of Queensland",
            avatar: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=professional%20australian%20male%20professor%20portrait&image_size=square"
          },
          {
            name: "Sarah Johnson",
            title: "Senior Research Fellow",
            institution: "Queensland Health",
            avatar: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=professional%20australian%20female%20researcher%20portrait&image_size=square"
          }
        ],
        eventInfo: {
          title: "首届中澳全科医学教育与基层医疗实践网络研讨会",
          date: "2024年1月18日-20日",
          time: "上午9:00-12:00，下午14:00-17:00（北京时间）",
          hosts: [
            "北京中医药大学",
            "澳大利亚昆士兰大学",
            "昆士兰州卫生厅",
            "Professional Development Consortium"
          ],
          supporters: [
            "澳大利亚驻华大使馆",
            "Trade and Investment Queensland",
            "Queensland China"
          ]
        },
        qrcode: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=QR%20code%20simple%20black%20and%20white%20clean%20background&image_size=square"
      },
      {
        id: 2,
        image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20research%20laboratory&image_size=landscape_4_3",
        title: "中医药数字化转型研讨会成功举办",
        tag: "学术交流",
        tagClass: "tag-pink",
        author: "学术部",
        time: "2024-01-14",
        views: 324567,
        comments: 38,
        likes: 95,
        content: "中医药数字化转型研讨会于近日在北京成功举办。本次会议围绕中医药数字化转型的前沿技术、应用场景和发展趋势进行了深入交流，展示了多项创新成果。\n\n随着信息技术的快速发展，中医药行业正面临前所未有的数字化转型机遇。从传统的纸质典籍到数字化数据库，从人工诊断到智能辅助诊疗系统，中医药正在经历一场深刻的变革。\n\n会议邀请了来自全国各地的中医药专家、学者和企业代表，共同探讨中医药数字化转型的路径和方法。与会者就中医药大数据平台建设、人工智能辅助诊断、中医药知识图谱构建等议题展开了热烈讨论。\n\n本次研讨会的成功举办，为中医药数字化转型提供了一个良好的交流平台，促进了产学研用的深度融合，将有力推动中医药事业的现代化发展。",
        speakers: [],
        eventInfo: null,
        qrcode: null
      },
      {
        id: 3,
        image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=traditional%20Chinese%20medicine%20education%20classroom&image_size=landscape_4_3",
        title: "中医药高等教育创新发展论坛圆满落幕",
        tag: "行业动态",
        tagClass: "tag-blue",
        author: "教育频道",
        time: "2024-01-13",
        views: 298765,
        comments: 52,
        likes: 88,
        content: "中医药高等教育创新发展论坛于近日在南京圆满落幕。来自全国各大中医药院校的专家学者齐聚一堂，就中医药人才培养、课程改革等议题展开研讨。\n\n中医药高等教育是中医药事业发展的基石。随着时代的发展，中医药教育面临着新的机遇和挑战。如何培养适应新时代需求的中医药人才，成为摆在各中医药院校面前的重要课题。\n\n论坛期间，与会专家围绕中医药人才培养模式创新、课程体系改革、实践教学强化等方面进行了深入交流。大家一致认为，中医药教育要坚持传承精华、守正创新，既要传承好中医药的传统理论和技艺，又要积极吸收现代科学技术和教育理念。\n\n本次论坛的成功举办，为中医药高等教育的改革与发展提供了新思路、新方法，必将推动中医药教育事业迈上新台阶。",
        speakers: [],
        eventInfo: null,
        qrcode: null
      },
      {
        id: 4,
        image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20herbs%20research%20scientific&image_size=landscape_4_3",
        title: "中医药防治新冠病毒研究取得新进展",
        tag: "研究成果",
        tagClass: "tag-green",
        author: "科研中心",
        time: "2024-01-12",
        views: 567890,
        comments: 89,
        likes: 234,
        content: "最新研究表明，中医药在新冠病毒防治中具有显著疗效，为全球抗疫提供了中国方案。\n\n自新冠疫情爆发以来，中医药积极参与疫情防控，发挥了重要作用。研究发现，中医药在减轻患者症状、缩短病程、降低重症率等方面具有明显优势。\n\n科研人员通过大量的临床实践和基础研究，筛选出了一批有效的中药方剂和中成药。这些药物在疫情防控中得到了广泛应用，取得了良好的临床效果。\n\n中医药防治新冠病毒的研究成果，不仅为我国的疫情防控提供了有力支撑，也为全球抗疫贡献了中国智慧。随着研究的不断深入，中医药在传染病防治领域的潜力将得到进一步发挥。",
        speakers: [],
        eventInfo: null,
        qrcode: null
      },
      {
        id: 5,
        image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20conference%20event&image_size=landscape_4_3",
        title: "2024年全国中医药工作会议在北京召开",
        tag: "新闻资讯",
        tagClass: "tag-red",
        author: "中医在线",
        time: "2024-01-11",
        views: 789012,
        comments: 120,
        likes: 312,
        content: "2024年全国中医药工作会议于近日在北京召开。会议总结了过去一年中医药事业发展取得的成就，部署了新一年的重点工作任务。\n\n过去一年，中医药事业取得了显著进展。中医药服务体系不断完善，中医药人才队伍建设稳步推进，中医药科技创新能力持续提升，中医药国际影响力不断扩大。\n\n会议强调，要坚持以习近平新时代中国特色社会主义思想为指导，深入贯彻落实党中央关于中医药工作的决策部署，推动中医药事业高质量发展。\n\n新的一年，中医药工作将重点围绕深化中医药改革、提升中医药服务能力、加强中医药人才培养、推进中医药科技创新、促进中医药传承创新发展等方面展开。会议号召广大中医药工作者团结奋斗，为建设健康中国、实现中华民族伟大复兴的中国梦贡献中医药力量。",
        speakers: [],
        eventInfo: null,
        qrcode: null
      }
    ]);
    const article = computed(() => {
      return articles.value.find((a) => a.id === articleId.value) || articles.value[0];
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "article-detail-page" }, _attrs))} data-v-c4a86fae><div class="container" data-v-c4a86fae><div class="article-header" data-v-c4a86fae><span class="${ssrRenderClass([article.value.tagClass, "article-tag"])}" data-v-c4a86fae>${ssrInterpolate(article.value.tag)}</span><h1 class="article-title" data-v-c4a86fae>${ssrInterpolate(article.value.title)}</h1><div class="article-meta" data-v-c4a86fae><span class="article-author" data-v-c4a86fae>${ssrInterpolate(article.value.author)}</span><span class="article-time" data-v-c4a86fae>${ssrInterpolate(article.value.time)}</span><span class="article-views" data-v-c4a86fae>👁️ ${ssrInterpolate(article.value.views)}</span></div></div><div class="article-main-image" data-v-c4a86fae><img${ssrRenderAttr("src", article.value.image)}${ssrRenderAttr("alt", article.value.title)} data-v-c4a86fae></div><div class="article-content" data-v-c4a86fae><p data-v-c4a86fae>${ssrInterpolate(article.value.content)}</p>`);
      if (article.value.speakers && article.value.speakers.length > 0) {
        _push(`<div class="speakers-section" data-v-c4a86fae><h3 class="section-title" data-v-c4a86fae>主讲专家 Speakers Bio</h3><div class="speakers-list" data-v-c4a86fae><!--[-->`);
        ssrRenderList(article.value.speakers, (speaker) => {
          _push(`<div class="speaker-item" data-v-c4a86fae><div class="speaker-avatar" data-v-c4a86fae><img${ssrRenderAttr("src", speaker.avatar)}${ssrRenderAttr("alt", speaker.name)} data-v-c4a86fae></div><div class="speaker-info" data-v-c4a86fae><h4 class="speaker-name" data-v-c4a86fae>${ssrInterpolate(speaker.name)}</h4><p class="speaker-title" data-v-c4a86fae>${ssrInterpolate(speaker.title)}</p><p class="speaker-institution" data-v-c4a86fae>${ssrInterpolate(speaker.institution)}</p></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (article.value.eventInfo) {
        _push(`<div class="event-info" data-v-c4a86fae><div class="event-card" data-v-c4a86fae><h3 class="event-title" data-v-c4a86fae>${ssrInterpolate(article.value.eventInfo.title)}</h3><p class="event-date" data-v-c4a86fae>${ssrInterpolate(article.value.eventInfo.date)}</p><p class="event-time" data-v-c4a86fae>${ssrInterpolate(article.value.eventInfo.time)}</p><div class="event-hosts" data-v-c4a86fae><h4 data-v-c4a86fae>主办单位 HOSTS</h4><ul data-v-c4a86fae><!--[-->`);
        ssrRenderList(article.value.eventInfo.hosts, (host) => {
          _push(`<li data-v-c4a86fae>${ssrInterpolate(host)}</li>`);
        });
        _push(`<!--]--></ul></div><div class="event-supporters" data-v-c4a86fae><h4 data-v-c4a86fae>支持单位 SUPPORTED BY</h4><ul data-v-c4a86fae><!--[-->`);
        ssrRenderList(article.value.eventInfo.supporters, (supporter) => {
          _push(`<li data-v-c4a86fae>${ssrInterpolate(supporter)}</li>`);
        });
        _push(`<!--]--></ul></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (article.value.qrcode) {
        _push(`<div class="qrcode-section" data-v-c4a86fae><div class="qrcode-card" data-v-c4a86fae><img${ssrRenderAttr("src", article.value.qrcode)} alt="二维码" data-v-c4a86fae><p data-v-c4a86fae>扫码了解更多详情</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="article-footer" data-v-c4a86fae><div class="article-stats" data-v-c4a86fae><span class="stat-item" data-v-c4a86fae>👁️ ${ssrInterpolate(article.value.views)}</span><span class="stat-item" data-v-c4a86fae>💬 ${ssrInterpolate(article.value.comments)}</span><span class="stat-item" data-v-c4a86fae>❤️ ${ssrInterpolate(article.value.likes)}</span></div><button class="back-btn" data-v-c4a86fae>← 返回资讯列表</button></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/articles/detail/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c4a86fae"]]);
export {
  _id_ as default
};
//# sourceMappingURL=_id_-CMpjiNDF.js.map
