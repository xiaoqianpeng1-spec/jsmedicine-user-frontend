import { defineComponent, computed, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
import { useRoute, useRouter } from 'vue-router';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

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
        title: "\u9996\u5C4A\u4E2D\u6FB3\u5168\u79D1\u533B\u5B66\u6559\u80B2\u4E0E\u57FA\u5C42\u533B\u7597\u5B9E\u8DF5\u7F51\u7EDC\u7814\u8BA8\u4F1A\u53EC\u5F00\u5728\u5373",
        tag: "\u65B0\u95FB\u8D44\u8BAF",
        tagClass: "tag-red",
        author: "\u4E2D\u533B\u5728\u7EBF",
        time: "2024-01-15",
        views: 435678,
        comments: 43,
        likes: 128,
        content: '\u672C\u6B21\u7814\u8BA8\u4F1A\u5C06\u6C47\u805A\u56FD\u5185\u5916\u5168\u79D1\u533B\u5B66\u9886\u57DF\u7684\u4E13\u5BB6\u5B66\u8005\uFF0C\u5171\u540C\u63A2\u8BA8\u5168\u79D1\u533B\u5B66\u6559\u80B2\u7684\u521B\u65B0\u6A21\u5F0F\u548C\u57FA\u5C42\u533B\u7597\u5B9E\u8DF5\u7684\u53D1\u5C55\u65B9\u5411\u3002\u4F1A\u8BAE\u65E8\u5728\u52A0\u5F3A\u4E2D\u6FB3\u4E24\u56FD\u5728\u5168\u79D1\u533B\u5B66\u9886\u57DF\u7684\u5B66\u672F\u4EA4\u6D41\u4E0E\u5408\u4F5C\uFF0C\u5206\u4EAB\u5148\u8FDB\u7684\u533B\u7597\u7406\u5FF5\u548C\u5B9E\u8DF5\u7ECF\u9A8C\u3002\n\n\u8FD1\u5E74\u6765\uFF0C\u5168\u79D1\u533B\u5B66\u5728\u5168\u7403\u8303\u56F4\u5185\u53D7\u5230\u8D8A\u6765\u8D8A\u591A\u7684\u5173\u6CE8\u3002\u968F\u7740\u4EBA\u53E3\u8001\u9F84\u5316\u548C\u6162\u6027\u75C5\u60A3\u75C5\u7387\u7684\u4E0A\u5347\uFF0C\u57FA\u5C42\u533B\u7597\u670D\u52A1\u7684\u91CD\u8981\u6027\u65E5\u76CA\u51F8\u663E\u3002\u5168\u79D1\u533B\u751F\u4F5C\u4E3A\u5C45\u6C11\u5065\u5EB7\u7684"\u5B88\u95E8\u4EBA"\uFF0C\u627F\u62C5\u7740\u9884\u9632\u3001\u6CBB\u7597\u3001\u5EB7\u590D\u7B49\u591A\u65B9\u9762\u7684\u804C\u8D23\u3002\n\n\u672C\u6B21\u7814\u8BA8\u4F1A\u5C06\u9080\u8BF7\u6765\u81EA\u4E2D\u56FD\u548C\u6FB3\u5927\u5229\u4E9A\u7684\u77E5\u540D\u4E13\u5BB6\u5B66\u8005\uFF0C\u56F4\u7ED5\u5168\u79D1\u533B\u5B66\u6559\u80B2\u4F53\u7CFB\u5EFA\u8BBE\u3001\u57FA\u5C42\u533B\u7597\u670D\u52A1\u6A21\u5F0F\u521B\u65B0\u3001\u4FE1\u606F\u5316\u6280\u672F\u5728\u533B\u7597\u4E2D\u7684\u5E94\u7528\u7B49\u8BAE\u9898\u5C55\u5F00\u6DF1\u5165\u8BA8\u8BBA\u3002\u53C2\u4F1A\u8005\u5C06\u6709\u673A\u4F1A\u4E0E\u56FD\u5185\u5916\u540C\u884C\u8FDB\u884C\u9762\u5BF9\u9762\u7684\u4EA4\u6D41\uFF0C\u62D3\u5BBD\u89C6\u91CE\uFF0C\u589E\u8FDB\u5408\u4F5C\u3002\n\n\u4F1A\u8BAE\u8FD8\u5C06\u8BBE\u7F6E\u4E13\u9898\u8BB2\u5EA7\u3001\u6848\u4F8B\u5206\u4EAB\u3001\u4E92\u52A8\u8BA8\u8BBA\u7B49\u73AF\u8282\uFF0C\u4E3A\u53C2\u4F1A\u8005\u63D0\u4F9B\u4E30\u5BCC\u591A\u6837\u7684\u5B66\u4E60\u548C\u4EA4\u6D41\u673A\u4F1A\u3002\u6211\u4EEC\u671F\u5F85\u901A\u8FC7\u672C\u6B21\u7814\u8BA8\u4F1A\uFF0C\u63A8\u52A8\u4E2D\u6FB3\u5168\u79D1\u533B\u5B66\u9886\u57DF\u7684\u5408\u4F5C\u4E0E\u53D1\u5C55\uFF0C\u4E3A\u63D0\u5347\u57FA\u5C42\u533B\u7597\u670D\u52A1\u6C34\u5E73\u505A\u51FA\u8D21\u732E\u3002',
        speakers: [
          {
            name: "\u5F20\u660E\u534E",
            title: "\u6559\u6388\u3001\u535A\u58EB\u751F\u5BFC\u5E08",
            institution: "\u5317\u4EAC\u4E2D\u533B\u836F\u5927\u5B66",
            avatar: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=professional%20chinese%20male%20professor%20portrait&image_size=square"
          },
          {
            name: "\u674E\u96EA\u6885",
            title: "\u4E3B\u4EFB\u533B\u5E08",
            institution: "\u4E2D\u56FD\u4E2D\u533B\u79D1\u5B66\u9662",
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
          title: "\u9996\u5C4A\u4E2D\u6FB3\u5168\u79D1\u533B\u5B66\u6559\u80B2\u4E0E\u57FA\u5C42\u533B\u7597\u5B9E\u8DF5\u7F51\u7EDC\u7814\u8BA8\u4F1A",
          date: "2024\u5E741\u670818\u65E5-20\u65E5",
          time: "\u4E0A\u53489:00-12:00\uFF0C\u4E0B\u534814:00-17:00\uFF08\u5317\u4EAC\u65F6\u95F4\uFF09",
          hosts: [
            "\u5317\u4EAC\u4E2D\u533B\u836F\u5927\u5B66",
            "\u6FB3\u5927\u5229\u4E9A\u6606\u58EB\u5170\u5927\u5B66",
            "\u6606\u58EB\u5170\u5DDE\u536B\u751F\u5385",
            "Professional Development Consortium"
          ],
          supporters: [
            "\u6FB3\u5927\u5229\u4E9A\u9A7B\u534E\u5927\u4F7F\u9986",
            "Trade and Investment Queensland",
            "Queensland China"
          ]
        },
        qrcode: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=QR%20code%20simple%20black%20and%20white%20clean%20background&image_size=square"
      },
      {
        id: 2,
        image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20research%20laboratory&image_size=landscape_4_3",
        title: "\u4E2D\u533B\u836F\u6570\u5B57\u5316\u8F6C\u578B\u7814\u8BA8\u4F1A\u6210\u529F\u4E3E\u529E",
        tag: "\u5B66\u672F\u4EA4\u6D41",
        tagClass: "tag-pink",
        author: "\u5B66\u672F\u90E8",
        time: "2024-01-14",
        views: 324567,
        comments: 38,
        likes: 95,
        content: "\u4E2D\u533B\u836F\u6570\u5B57\u5316\u8F6C\u578B\u7814\u8BA8\u4F1A\u4E8E\u8FD1\u65E5\u5728\u5317\u4EAC\u6210\u529F\u4E3E\u529E\u3002\u672C\u6B21\u4F1A\u8BAE\u56F4\u7ED5\u4E2D\u533B\u836F\u6570\u5B57\u5316\u8F6C\u578B\u7684\u524D\u6CBF\u6280\u672F\u3001\u5E94\u7528\u573A\u666F\u548C\u53D1\u5C55\u8D8B\u52BF\u8FDB\u884C\u4E86\u6DF1\u5165\u4EA4\u6D41\uFF0C\u5C55\u793A\u4E86\u591A\u9879\u521B\u65B0\u6210\u679C\u3002\n\n\u968F\u7740\u4FE1\u606F\u6280\u672F\u7684\u5FEB\u901F\u53D1\u5C55\uFF0C\u4E2D\u533B\u836F\u884C\u4E1A\u6B63\u9762\u4E34\u524D\u6240\u672A\u6709\u7684\u6570\u5B57\u5316\u8F6C\u578B\u673A\u9047\u3002\u4ECE\u4F20\u7EDF\u7684\u7EB8\u8D28\u5178\u7C4D\u5230\u6570\u5B57\u5316\u6570\u636E\u5E93\uFF0C\u4ECE\u4EBA\u5DE5\u8BCA\u65AD\u5230\u667A\u80FD\u8F85\u52A9\u8BCA\u7597\u7CFB\u7EDF\uFF0C\u4E2D\u533B\u836F\u6B63\u5728\u7ECF\u5386\u4E00\u573A\u6DF1\u523B\u7684\u53D8\u9769\u3002\n\n\u4F1A\u8BAE\u9080\u8BF7\u4E86\u6765\u81EA\u5168\u56FD\u5404\u5730\u7684\u4E2D\u533B\u836F\u4E13\u5BB6\u3001\u5B66\u8005\u548C\u4F01\u4E1A\u4EE3\u8868\uFF0C\u5171\u540C\u63A2\u8BA8\u4E2D\u533B\u836F\u6570\u5B57\u5316\u8F6C\u578B\u7684\u8DEF\u5F84\u548C\u65B9\u6CD5\u3002\u4E0E\u4F1A\u8005\u5C31\u4E2D\u533B\u836F\u5927\u6570\u636E\u5E73\u53F0\u5EFA\u8BBE\u3001\u4EBA\u5DE5\u667A\u80FD\u8F85\u52A9\u8BCA\u65AD\u3001\u4E2D\u533B\u836F\u77E5\u8BC6\u56FE\u8C31\u6784\u5EFA\u7B49\u8BAE\u9898\u5C55\u5F00\u4E86\u70ED\u70C8\u8BA8\u8BBA\u3002\n\n\u672C\u6B21\u7814\u8BA8\u4F1A\u7684\u6210\u529F\u4E3E\u529E\uFF0C\u4E3A\u4E2D\u533B\u836F\u6570\u5B57\u5316\u8F6C\u578B\u63D0\u4F9B\u4E86\u4E00\u4E2A\u826F\u597D\u7684\u4EA4\u6D41\u5E73\u53F0\uFF0C\u4FC3\u8FDB\u4E86\u4EA7\u5B66\u7814\u7528\u7684\u6DF1\u5EA6\u878D\u5408\uFF0C\u5C06\u6709\u529B\u63A8\u52A8\u4E2D\u533B\u836F\u4E8B\u4E1A\u7684\u73B0\u4EE3\u5316\u53D1\u5C55\u3002",
        speakers: [],
        eventInfo: null,
        qrcode: null
      },
      {
        id: 3,
        image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=traditional%20Chinese%20medicine%20education%20classroom&image_size=landscape_4_3",
        title: "\u4E2D\u533B\u836F\u9AD8\u7B49\u6559\u80B2\u521B\u65B0\u53D1\u5C55\u8BBA\u575B\u5706\u6EE1\u843D\u5E55",
        tag: "\u884C\u4E1A\u52A8\u6001",
        tagClass: "tag-blue",
        author: "\u6559\u80B2\u9891\u9053",
        time: "2024-01-13",
        views: 298765,
        comments: 52,
        likes: 88,
        content: "\u4E2D\u533B\u836F\u9AD8\u7B49\u6559\u80B2\u521B\u65B0\u53D1\u5C55\u8BBA\u575B\u4E8E\u8FD1\u65E5\u5728\u5357\u4EAC\u5706\u6EE1\u843D\u5E55\u3002\u6765\u81EA\u5168\u56FD\u5404\u5927\u4E2D\u533B\u836F\u9662\u6821\u7684\u4E13\u5BB6\u5B66\u8005\u9F50\u805A\u4E00\u5802\uFF0C\u5C31\u4E2D\u533B\u836F\u4EBA\u624D\u57F9\u517B\u3001\u8BFE\u7A0B\u6539\u9769\u7B49\u8BAE\u9898\u5C55\u5F00\u7814\u8BA8\u3002\n\n\u4E2D\u533B\u836F\u9AD8\u7B49\u6559\u80B2\u662F\u4E2D\u533B\u836F\u4E8B\u4E1A\u53D1\u5C55\u7684\u57FA\u77F3\u3002\u968F\u7740\u65F6\u4EE3\u7684\u53D1\u5C55\uFF0C\u4E2D\u533B\u836F\u6559\u80B2\u9762\u4E34\u7740\u65B0\u7684\u673A\u9047\u548C\u6311\u6218\u3002\u5982\u4F55\u57F9\u517B\u9002\u5E94\u65B0\u65F6\u4EE3\u9700\u6C42\u7684\u4E2D\u533B\u836F\u4EBA\u624D\uFF0C\u6210\u4E3A\u6446\u5728\u5404\u4E2D\u533B\u836F\u9662\u6821\u9762\u524D\u7684\u91CD\u8981\u8BFE\u9898\u3002\n\n\u8BBA\u575B\u671F\u95F4\uFF0C\u4E0E\u4F1A\u4E13\u5BB6\u56F4\u7ED5\u4E2D\u533B\u836F\u4EBA\u624D\u57F9\u517B\u6A21\u5F0F\u521B\u65B0\u3001\u8BFE\u7A0B\u4F53\u7CFB\u6539\u9769\u3001\u5B9E\u8DF5\u6559\u5B66\u5F3A\u5316\u7B49\u65B9\u9762\u8FDB\u884C\u4E86\u6DF1\u5165\u4EA4\u6D41\u3002\u5927\u5BB6\u4E00\u81F4\u8BA4\u4E3A\uFF0C\u4E2D\u533B\u836F\u6559\u80B2\u8981\u575A\u6301\u4F20\u627F\u7CBE\u534E\u3001\u5B88\u6B63\u521B\u65B0\uFF0C\u65E2\u8981\u4F20\u627F\u597D\u4E2D\u533B\u836F\u7684\u4F20\u7EDF\u7406\u8BBA\u548C\u6280\u827A\uFF0C\u53C8\u8981\u79EF\u6781\u5438\u6536\u73B0\u4EE3\u79D1\u5B66\u6280\u672F\u548C\u6559\u80B2\u7406\u5FF5\u3002\n\n\u672C\u6B21\u8BBA\u575B\u7684\u6210\u529F\u4E3E\u529E\uFF0C\u4E3A\u4E2D\u533B\u836F\u9AD8\u7B49\u6559\u80B2\u7684\u6539\u9769\u4E0E\u53D1\u5C55\u63D0\u4F9B\u4E86\u65B0\u601D\u8DEF\u3001\u65B0\u65B9\u6CD5\uFF0C\u5FC5\u5C06\u63A8\u52A8\u4E2D\u533B\u836F\u6559\u80B2\u4E8B\u4E1A\u8FC8\u4E0A\u65B0\u53F0\u9636\u3002",
        speakers: [],
        eventInfo: null,
        qrcode: null
      },
      {
        id: 4,
        image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20herbs%20research%20scientific&image_size=landscape_4_3",
        title: "\u4E2D\u533B\u836F\u9632\u6CBB\u65B0\u51A0\u75C5\u6BD2\u7814\u7A76\u53D6\u5F97\u65B0\u8FDB\u5C55",
        tag: "\u7814\u7A76\u6210\u679C",
        tagClass: "tag-green",
        author: "\u79D1\u7814\u4E2D\u5FC3",
        time: "2024-01-12",
        views: 567890,
        comments: 89,
        likes: 234,
        content: "\u6700\u65B0\u7814\u7A76\u8868\u660E\uFF0C\u4E2D\u533B\u836F\u5728\u65B0\u51A0\u75C5\u6BD2\u9632\u6CBB\u4E2D\u5177\u6709\u663E\u8457\u7597\u6548\uFF0C\u4E3A\u5168\u7403\u6297\u75AB\u63D0\u4F9B\u4E86\u4E2D\u56FD\u65B9\u6848\u3002\n\n\u81EA\u65B0\u51A0\u75AB\u60C5\u7206\u53D1\u4EE5\u6765\uFF0C\u4E2D\u533B\u836F\u79EF\u6781\u53C2\u4E0E\u75AB\u60C5\u9632\u63A7\uFF0C\u53D1\u6325\u4E86\u91CD\u8981\u4F5C\u7528\u3002\u7814\u7A76\u53D1\u73B0\uFF0C\u4E2D\u533B\u836F\u5728\u51CF\u8F7B\u60A3\u8005\u75C7\u72B6\u3001\u7F29\u77ED\u75C5\u7A0B\u3001\u964D\u4F4E\u91CD\u75C7\u7387\u7B49\u65B9\u9762\u5177\u6709\u660E\u663E\u4F18\u52BF\u3002\n\n\u79D1\u7814\u4EBA\u5458\u901A\u8FC7\u5927\u91CF\u7684\u4E34\u5E8A\u5B9E\u8DF5\u548C\u57FA\u7840\u7814\u7A76\uFF0C\u7B5B\u9009\u51FA\u4E86\u4E00\u6279\u6709\u6548\u7684\u4E2D\u836F\u65B9\u5242\u548C\u4E2D\u6210\u836F\u3002\u8FD9\u4E9B\u836F\u7269\u5728\u75AB\u60C5\u9632\u63A7\u4E2D\u5F97\u5230\u4E86\u5E7F\u6CDB\u5E94\u7528\uFF0C\u53D6\u5F97\u4E86\u826F\u597D\u7684\u4E34\u5E8A\u6548\u679C\u3002\n\n\u4E2D\u533B\u836F\u9632\u6CBB\u65B0\u51A0\u75C5\u6BD2\u7684\u7814\u7A76\u6210\u679C\uFF0C\u4E0D\u4EC5\u4E3A\u6211\u56FD\u7684\u75AB\u60C5\u9632\u63A7\u63D0\u4F9B\u4E86\u6709\u529B\u652F\u6491\uFF0C\u4E5F\u4E3A\u5168\u7403\u6297\u75AB\u8D21\u732E\u4E86\u4E2D\u56FD\u667A\u6167\u3002\u968F\u7740\u7814\u7A76\u7684\u4E0D\u65AD\u6DF1\u5165\uFF0C\u4E2D\u533B\u836F\u5728\u4F20\u67D3\u75C5\u9632\u6CBB\u9886\u57DF\u7684\u6F5C\u529B\u5C06\u5F97\u5230\u8FDB\u4E00\u6B65\u53D1\u6325\u3002",
        speakers: [],
        eventInfo: null,
        qrcode: null
      },
      {
        id: 5,
        image: "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20conference%20event&image_size=landscape_4_3",
        title: "2024\u5E74\u5168\u56FD\u4E2D\u533B\u836F\u5DE5\u4F5C\u4F1A\u8BAE\u5728\u5317\u4EAC\u53EC\u5F00",
        tag: "\u65B0\u95FB\u8D44\u8BAF",
        tagClass: "tag-red",
        author: "\u4E2D\u533B\u5728\u7EBF",
        time: "2024-01-11",
        views: 789012,
        comments: 120,
        likes: 312,
        content: "2024\u5E74\u5168\u56FD\u4E2D\u533B\u836F\u5DE5\u4F5C\u4F1A\u8BAE\u4E8E\u8FD1\u65E5\u5728\u5317\u4EAC\u53EC\u5F00\u3002\u4F1A\u8BAE\u603B\u7ED3\u4E86\u8FC7\u53BB\u4E00\u5E74\u4E2D\u533B\u836F\u4E8B\u4E1A\u53D1\u5C55\u53D6\u5F97\u7684\u6210\u5C31\uFF0C\u90E8\u7F72\u4E86\u65B0\u4E00\u5E74\u7684\u91CD\u70B9\u5DE5\u4F5C\u4EFB\u52A1\u3002\n\n\u8FC7\u53BB\u4E00\u5E74\uFF0C\u4E2D\u533B\u836F\u4E8B\u4E1A\u53D6\u5F97\u4E86\u663E\u8457\u8FDB\u5C55\u3002\u4E2D\u533B\u836F\u670D\u52A1\u4F53\u7CFB\u4E0D\u65AD\u5B8C\u5584\uFF0C\u4E2D\u533B\u836F\u4EBA\u624D\u961F\u4F0D\u5EFA\u8BBE\u7A33\u6B65\u63A8\u8FDB\uFF0C\u4E2D\u533B\u836F\u79D1\u6280\u521B\u65B0\u80FD\u529B\u6301\u7EED\u63D0\u5347\uFF0C\u4E2D\u533B\u836F\u56FD\u9645\u5F71\u54CD\u529B\u4E0D\u65AD\u6269\u5927\u3002\n\n\u4F1A\u8BAE\u5F3A\u8C03\uFF0C\u8981\u575A\u6301\u4EE5\u4E60\u8FD1\u5E73\u65B0\u65F6\u4EE3\u4E2D\u56FD\u7279\u8272\u793E\u4F1A\u4E3B\u4E49\u601D\u60F3\u4E3A\u6307\u5BFC\uFF0C\u6DF1\u5165\u8D2F\u5F7B\u843D\u5B9E\u515A\u4E2D\u592E\u5173\u4E8E\u4E2D\u533B\u836F\u5DE5\u4F5C\u7684\u51B3\u7B56\u90E8\u7F72\uFF0C\u63A8\u52A8\u4E2D\u533B\u836F\u4E8B\u4E1A\u9AD8\u8D28\u91CF\u53D1\u5C55\u3002\n\n\u65B0\u7684\u4E00\u5E74\uFF0C\u4E2D\u533B\u836F\u5DE5\u4F5C\u5C06\u91CD\u70B9\u56F4\u7ED5\u6DF1\u5316\u4E2D\u533B\u836F\u6539\u9769\u3001\u63D0\u5347\u4E2D\u533B\u836F\u670D\u52A1\u80FD\u529B\u3001\u52A0\u5F3A\u4E2D\u533B\u836F\u4EBA\u624D\u57F9\u517B\u3001\u63A8\u8FDB\u4E2D\u533B\u836F\u79D1\u6280\u521B\u65B0\u3001\u4FC3\u8FDB\u4E2D\u533B\u836F\u4F20\u627F\u521B\u65B0\u53D1\u5C55\u7B49\u65B9\u9762\u5C55\u5F00\u3002\u4F1A\u8BAE\u53F7\u53EC\u5E7F\u5927\u4E2D\u533B\u836F\u5DE5\u4F5C\u8005\u56E2\u7ED3\u594B\u6597\uFF0C\u4E3A\u5EFA\u8BBE\u5065\u5EB7\u4E2D\u56FD\u3001\u5B9E\u73B0\u4E2D\u534E\u6C11\u65CF\u4F1F\u5927\u590D\u5174\u7684\u4E2D\u56FD\u68A6\u8D21\u732E\u4E2D\u533B\u836F\u529B\u91CF\u3002",
        speakers: [],
        eventInfo: null,
        qrcode: null
      }
    ]);
    const article = computed(() => {
      return articles.value.find((a) => a.id === articleId.value) || articles.value[0];
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "article-detail-page" }, _attrs))} data-v-c4a86fae><div class="container" data-v-c4a86fae><div class="article-header" data-v-c4a86fae><span class="${ssrRenderClass([article.value.tagClass, "article-tag"])}" data-v-c4a86fae>${ssrInterpolate(article.value.tag)}</span><h1 class="article-title" data-v-c4a86fae>${ssrInterpolate(article.value.title)}</h1><div class="article-meta" data-v-c4a86fae><span class="article-author" data-v-c4a86fae>${ssrInterpolate(article.value.author)}</span><span class="article-time" data-v-c4a86fae>${ssrInterpolate(article.value.time)}</span><span class="article-views" data-v-c4a86fae>\u{1F441}\uFE0F ${ssrInterpolate(article.value.views)}</span></div></div><div class="article-main-image" data-v-c4a86fae><img${ssrRenderAttr("src", article.value.image)}${ssrRenderAttr("alt", article.value.title)} data-v-c4a86fae></div><div class="article-content" data-v-c4a86fae><p data-v-c4a86fae>${ssrInterpolate(article.value.content)}</p>`);
      if (article.value.speakers && article.value.speakers.length > 0) {
        _push(`<div class="speakers-section" data-v-c4a86fae><h3 class="section-title" data-v-c4a86fae>\u4E3B\u8BB2\u4E13\u5BB6 Speakers Bio</h3><div class="speakers-list" data-v-c4a86fae><!--[-->`);
        ssrRenderList(article.value.speakers, (speaker) => {
          _push(`<div class="speaker-item" data-v-c4a86fae><div class="speaker-avatar" data-v-c4a86fae><img${ssrRenderAttr("src", speaker.avatar)}${ssrRenderAttr("alt", speaker.name)} data-v-c4a86fae></div><div class="speaker-info" data-v-c4a86fae><h4 class="speaker-name" data-v-c4a86fae>${ssrInterpolate(speaker.name)}</h4><p class="speaker-title" data-v-c4a86fae>${ssrInterpolate(speaker.title)}</p><p class="speaker-institution" data-v-c4a86fae>${ssrInterpolate(speaker.institution)}</p></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (article.value.eventInfo) {
        _push(`<div class="event-info" data-v-c4a86fae><div class="event-card" data-v-c4a86fae><h3 class="event-title" data-v-c4a86fae>${ssrInterpolate(article.value.eventInfo.title)}</h3><p class="event-date" data-v-c4a86fae>${ssrInterpolate(article.value.eventInfo.date)}</p><p class="event-time" data-v-c4a86fae>${ssrInterpolate(article.value.eventInfo.time)}</p><div class="event-hosts" data-v-c4a86fae><h4 data-v-c4a86fae>\u4E3B\u529E\u5355\u4F4D HOSTS</h4><ul data-v-c4a86fae><!--[-->`);
        ssrRenderList(article.value.eventInfo.hosts, (host) => {
          _push(`<li data-v-c4a86fae>${ssrInterpolate(host)}</li>`);
        });
        _push(`<!--]--></ul></div><div class="event-supporters" data-v-c4a86fae><h4 data-v-c4a86fae>\u652F\u6301\u5355\u4F4D SUPPORTED BY</h4><ul data-v-c4a86fae><!--[-->`);
        ssrRenderList(article.value.eventInfo.supporters, (supporter) => {
          _push(`<li data-v-c4a86fae>${ssrInterpolate(supporter)}</li>`);
        });
        _push(`<!--]--></ul></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (article.value.qrcode) {
        _push(`<div class="qrcode-section" data-v-c4a86fae><div class="qrcode-card" data-v-c4a86fae><img${ssrRenderAttr("src", article.value.qrcode)} alt="\u4E8C\u7EF4\u7801" data-v-c4a86fae><p data-v-c4a86fae>\u626B\u7801\u4E86\u89E3\u66F4\u591A\u8BE6\u60C5</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="article-footer" data-v-c4a86fae><div class="article-stats" data-v-c4a86fae><span class="stat-item" data-v-c4a86fae>\u{1F441}\uFE0F ${ssrInterpolate(article.value.views)}</span><span class="stat-item" data-v-c4a86fae>\u{1F4AC} ${ssrInterpolate(article.value.comments)}</span><span class="stat-item" data-v-c4a86fae>\u2764\uFE0F ${ssrInterpolate(article.value.likes)}</span></div><button class="back-btn" data-v-c4a86fae>\u2190 \u8FD4\u56DE\u8D44\u8BAF\u5217\u8868</button></div></div></div>`);
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

export { _id_ as default };
//# sourceMappingURL=_id_-CMpjiNDF.mjs.map
