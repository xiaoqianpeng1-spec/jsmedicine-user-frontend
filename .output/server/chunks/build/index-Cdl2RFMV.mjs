import { n as navigateTo } from './server.mjs';
import { defineComponent, ref, resolveComponent, mergeProps, unref, withCtx, isRef, createTextVNode, createVNode, withKeys, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { Search, Right } from '@element-plus/icons-vue';
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
import 'vue-router';
import 'axios';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const keyword = ref("");
    const categories = ref([]);
    const entries = ref([]);
    const loading = ref(false);
    const currentPage = ref(1);
    const pageSize = ref(10);
    const total = ref(0);
    const activeCategory = ref("");
    const selectedCategory = ref(null);
    const fetchEntries = async () => {
      loading.value = true;
      try {
        const { searchKnowledgeEntries } = await import('./index-n254Ru5l.mjs');
        const result = await searchKnowledgeEntries({
          page: currentPage.value,
          size: pageSize.value,
          keyword: keyword.value || void 0,
          categoryId: selectedCategory.value || void 0
        });
        entries.value = result.records || [];
        total.value = result.total || 0;
      } catch (error) {
        console.error("\u83B7\u53D6\u77E5\u8BC6\u5E93\u6761\u76EE\u5931\u8D25:", error);
      } finally {
        loading.value = false;
      }
    };
    const handleSearch = () => {
      currentPage.value = 1;
      fetchEntries();
    };
    const handleSelectCategory = (index2) => {
      activeCategory.value = index2;
      selectedCategory.value = index2 ? Number(index2) : null;
      currentPage.value = 1;
      fetchEntries();
    };
    const handlePageChange = (page) => {
      currentPage.value = page;
      fetchEntries();
      (void 0).scrollTo({ top: 0, behavior: "smooth" });
    };
    const handleSizeChange = (size) => {
      pageSize.value = size;
      currentPage.value = 1;
      fetchEntries();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_page_header = resolveComponent("el-page-header");
      const _component_el_input = resolveComponent("el-input");
      const _component_el_button = resolveComponent("el-button");
      const _component_el_row = resolveComponent("el-row");
      const _component_el_col = resolveComponent("el-col");
      const _component_el_card = resolveComponent("el-card");
      const _component_el_menu = resolveComponent("el-menu");
      const _component_el_menu_item = resolveComponent("el-menu-item");
      const _component_el_skeleton = resolveComponent("el-skeleton");
      const _component_el_empty = resolveComponent("el-empty");
      const _component_el_tag = resolveComponent("el-tag");
      const _component_el_icon = resolveComponent("el-icon");
      const _component_el_pagination = resolveComponent("el-pagination");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "knowledge-page" }, _attrs))} data-v-91d292ff>`);
      _push(ssrRenderComponent(_component_el_page_header, {
        onBack: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/"),
        content: "\u77E5\u8BC6\u5E93",
        class: "page-header"
      }, {
        extra: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: unref(keyword),
              "onUpdate:modelValue": ($event) => isRef(keyword) ? keyword.value = $event : null,
              placeholder: "\u641C\u7D22\u77E5\u8BC6\u5E93...",
              class: "search-input",
              clearable: "",
              onKeyup: handleSearch
            }, {
              append: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_button, {
                    icon: unref(Search),
                    onClick: handleSearch
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`\u641C\u7D22`);
                      } else {
                        return [
                          createTextVNode("\u641C\u7D22")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_button, {
                      icon: unref(Search),
                      onClick: handleSearch
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u641C\u7D22")
                      ]),
                      _: 1
                    }, 8, ["icon"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_input, {
                modelValue: unref(keyword),
                "onUpdate:modelValue": ($event) => isRef(keyword) ? keyword.value = $event : null,
                placeholder: "\u641C\u7D22\u77E5\u8BC6\u5E93...",
                class: "search-input",
                clearable: "",
                onKeyup: withKeys(handleSearch, ["enter"])
              }, {
                append: withCtx(() => [
                  createVNode(_component_el_button, {
                    icon: unref(Search),
                    onClick: handleSearch
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u641C\u7D22")
                    ]),
                    _: 1
                  }, 8, ["icon"])
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="page-content" data-v-91d292ff>`);
      _push(ssrRenderComponent(_component_el_row, { gutter: 20 }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_col, {
              xs: 24,
              md: 6
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_card, { class: "category-sidebar" }, {
                    header: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="card-header" data-v-91d292ff${_scopeId3}><span data-v-91d292ff${_scopeId3}>\u5206\u7C7B</span></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "card-header" }, [
                            createVNode("span", null, "\u5206\u7C7B")
                          ])
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_menu, {
                          "default-active": unref(activeCategory),
                          onSelect: handleSelectCategory,
                          class: "category-menu"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_menu_item, { index: "" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`\u5168\u90E8`);
                                  } else {
                                    return [
                                      createTextVNode("\u5168\u90E8")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<!--[-->`);
                              ssrRenderList(unref(categories), (cat) => {
                                _push5(ssrRenderComponent(_component_el_menu_item, {
                                  key: cat.id,
                                  index: String(cat.id)
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(cat.categoryName)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(cat.categoryName), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                createVNode(_component_el_menu_item, { index: "" }, {
                                  default: withCtx(() => [
                                    createTextVNode("\u5168\u90E8")
                                  ]),
                                  _: 1
                                }),
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(categories), (cat) => {
                                  return openBlock(), createBlock(_component_el_menu_item, {
                                    key: cat.id,
                                    index: String(cat.id)
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(cat.categoryName), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["index"]);
                                }), 128))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_menu, {
                            "default-active": unref(activeCategory),
                            onSelect: handleSelectCategory,
                            class: "category-menu"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_menu_item, { index: "" }, {
                                default: withCtx(() => [
                                  createTextVNode("\u5168\u90E8")
                                ]),
                                _: 1
                              }),
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(categories), (cat) => {
                                return openBlock(), createBlock(_component_el_menu_item, {
                                  key: cat.id,
                                  index: String(cat.id)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(cat.categoryName), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["index"]);
                              }), 128))
                            ]),
                            _: 1
                          }, 8, ["default-active"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_card, { class: "category-sidebar" }, {
                      header: withCtx(() => [
                        createVNode("div", { class: "card-header" }, [
                          createVNode("span", null, "\u5206\u7C7B")
                        ])
                      ]),
                      default: withCtx(() => [
                        createVNode(_component_el_menu, {
                          "default-active": unref(activeCategory),
                          onSelect: handleSelectCategory,
                          class: "category-menu"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_menu_item, { index: "" }, {
                              default: withCtx(() => [
                                createTextVNode("\u5168\u90E8")
                              ]),
                              _: 1
                            }),
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(categories), (cat) => {
                              return openBlock(), createBlock(_component_el_menu_item, {
                                key: cat.id,
                                index: String(cat.id)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(cat.categoryName), 1)
                                ]),
                                _: 2
                              }, 1032, ["index"]);
                            }), 128))
                          ]),
                          _: 1
                        }, 8, ["default-active"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_col, {
              xs: 24,
              md: 18
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_skeleton, {
                    loading: unref(loading),
                    count: 5,
                    rows: 3,
                    animated: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (!unref(loading) && unref(entries).length === 0) {
                          _push4(ssrRenderComponent(_component_el_empty, { description: "\u6682\u65E0\u77E5\u8BC6\u5E93\u6761\u76EE" }, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!--[-->`);
                          ssrRenderList(unref(entries), (entry) => {
                            _push4(ssrRenderComponent(_component_el_card, {
                              key: entry.id,
                              class: "entry-card",
                              shadow: "hover",
                              onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/knowledge/detail/${entry.id}`)
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div class="entry-content" data-v-91d292ff${_scopeId4}><h3 class="entry-title" data-v-91d292ff${_scopeId4}>${ssrInterpolate(entry.title)}</h3><p class="entry-summary" data-v-91d292ff${_scopeId4}>${ssrInterpolate(entry.summary)}</p><div class="entry-meta" data-v-91d292ff${_scopeId4}>`);
                                  if (entry.categoryName) {
                                    _push5(ssrRenderComponent(_component_el_tag, {
                                      size: "small",
                                      type: "success"
                                    }, {
                                      default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(`${ssrInterpolate(entry.categoryName)}`);
                                        } else {
                                          return [
                                            createTextVNode(toDisplayString(entry.categoryName), 1)
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                  _push5(`<span class="entry-views" data-v-91d292ff${_scopeId4}>${ssrInterpolate(entry.viewCount)} \u9605\u8BFB</span></div></div><div class="entry-arrow" data-v-91d292ff${_scopeId4}>`);
                                  _push5(ssrRenderComponent(_component_el_icon, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(unref(Right), null, null, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(unref(Right))
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(`</div>`);
                                } else {
                                  return [
                                    createVNode("div", { class: "entry-content" }, [
                                      createVNode("h3", { class: "entry-title" }, toDisplayString(entry.title), 1),
                                      createVNode("p", { class: "entry-summary" }, toDisplayString(entry.summary), 1),
                                      createVNode("div", { class: "entry-meta" }, [
                                        entry.categoryName ? (openBlock(), createBlock(_component_el_tag, {
                                          key: 0,
                                          size: "small",
                                          type: "success"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(entry.categoryName), 1)
                                          ]),
                                          _: 2
                                        }, 1024)) : createCommentVNode("", true),
                                        createVNode("span", { class: "entry-views" }, toDisplayString(entry.viewCount) + " \u9605\u8BFB", 1)
                                      ])
                                    ]),
                                    createVNode("div", { class: "entry-arrow" }, [
                                      createVNode(_component_el_icon, null, {
                                        default: withCtx(() => [
                                          createVNode(unref(Right))
                                        ]),
                                        _: 1
                                      })
                                    ])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          });
                          _push4(`<!--]-->`);
                        }
                        if (unref(total) > 0) {
                          _push4(ssrRenderComponent(_component_el_pagination, {
                            "current-page": unref(currentPage),
                            "onUpdate:currentPage": ($event) => isRef(currentPage) ? currentPage.value = $event : null,
                            "page-size": unref(pageSize),
                            "onUpdate:pageSize": ($event) => isRef(pageSize) ? pageSize.value = $event : null,
                            "page-sizes": [10, 20, 40],
                            total: unref(total),
                            layout: "total, sizes, prev, pager, next, jumper",
                            onSizeChange: handleSizeChange,
                            onCurrentChange: handlePageChange,
                            class: "pagination"
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          !unref(loading) && unref(entries).length === 0 ? (openBlock(), createBlock(_component_el_empty, {
                            key: 0,
                            description: "\u6682\u65E0\u77E5\u8BC6\u5E93\u6761\u76EE"
                          })) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(unref(entries), (entry) => {
                            return openBlock(), createBlock(_component_el_card, {
                              key: entry.id,
                              class: "entry-card",
                              shadow: "hover",
                              onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/knowledge/detail/${entry.id}`)
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "entry-content" }, [
                                  createVNode("h3", { class: "entry-title" }, toDisplayString(entry.title), 1),
                                  createVNode("p", { class: "entry-summary" }, toDisplayString(entry.summary), 1),
                                  createVNode("div", { class: "entry-meta" }, [
                                    entry.categoryName ? (openBlock(), createBlock(_component_el_tag, {
                                      key: 0,
                                      size: "small",
                                      type: "success"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(entry.categoryName), 1)
                                      ]),
                                      _: 2
                                    }, 1024)) : createCommentVNode("", true),
                                    createVNode("span", { class: "entry-views" }, toDisplayString(entry.viewCount) + " \u9605\u8BFB", 1)
                                  ])
                                ]),
                                createVNode("div", { class: "entry-arrow" }, [
                                  createVNode(_component_el_icon, null, {
                                    default: withCtx(() => [
                                      createVNode(unref(Right))
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              _: 2
                            }, 1032, ["onClick"]);
                          }), 128)),
                          unref(total) > 0 ? (openBlock(), createBlock(_component_el_pagination, {
                            key: 2,
                            "current-page": unref(currentPage),
                            "onUpdate:currentPage": ($event) => isRef(currentPage) ? currentPage.value = $event : null,
                            "page-size": unref(pageSize),
                            "onUpdate:pageSize": ($event) => isRef(pageSize) ? pageSize.value = $event : null,
                            "page-sizes": [10, 20, 40],
                            total: unref(total),
                            layout: "total, sizes, prev, pager, next, jumper",
                            onSizeChange: handleSizeChange,
                            onCurrentChange: handlePageChange,
                            class: "pagination"
                          }, null, 8, ["current-page", "onUpdate:currentPage", "page-size", "onUpdate:pageSize", "total"])) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_skeleton, {
                      loading: unref(loading),
                      count: 5,
                      rows: 3,
                      animated: ""
                    }, {
                      default: withCtx(() => [
                        !unref(loading) && unref(entries).length === 0 ? (openBlock(), createBlock(_component_el_empty, {
                          key: 0,
                          description: "\u6682\u65E0\u77E5\u8BC6\u5E93\u6761\u76EE"
                        })) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(unref(entries), (entry) => {
                          return openBlock(), createBlock(_component_el_card, {
                            key: entry.id,
                            class: "entry-card",
                            shadow: "hover",
                            onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/knowledge/detail/${entry.id}`)
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "entry-content" }, [
                                createVNode("h3", { class: "entry-title" }, toDisplayString(entry.title), 1),
                                createVNode("p", { class: "entry-summary" }, toDisplayString(entry.summary), 1),
                                createVNode("div", { class: "entry-meta" }, [
                                  entry.categoryName ? (openBlock(), createBlock(_component_el_tag, {
                                    key: 0,
                                    size: "small",
                                    type: "success"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(entry.categoryName), 1)
                                    ]),
                                    _: 2
                                  }, 1024)) : createCommentVNode("", true),
                                  createVNode("span", { class: "entry-views" }, toDisplayString(entry.viewCount) + " \u9605\u8BFB", 1)
                                ])
                              ]),
                              createVNode("div", { class: "entry-arrow" }, [
                                createVNode(_component_el_icon, null, {
                                  default: withCtx(() => [
                                    createVNode(unref(Right))
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            _: 2
                          }, 1032, ["onClick"]);
                        }), 128)),
                        unref(total) > 0 ? (openBlock(), createBlock(_component_el_pagination, {
                          key: 2,
                          "current-page": unref(currentPage),
                          "onUpdate:currentPage": ($event) => isRef(currentPage) ? currentPage.value = $event : null,
                          "page-size": unref(pageSize),
                          "onUpdate:pageSize": ($event) => isRef(pageSize) ? pageSize.value = $event : null,
                          "page-sizes": [10, 20, 40],
                          total: unref(total),
                          layout: "total, sizes, prev, pager, next, jumper",
                          onSizeChange: handleSizeChange,
                          onCurrentChange: handlePageChange,
                          class: "pagination"
                        }, null, 8, ["current-page", "onUpdate:currentPage", "page-size", "onUpdate:pageSize", "total"])) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }, 8, ["loading"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_col, {
                xs: 24,
                md: 6
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_card, { class: "category-sidebar" }, {
                    header: withCtx(() => [
                      createVNode("div", { class: "card-header" }, [
                        createVNode("span", null, "\u5206\u7C7B")
                      ])
                    ]),
                    default: withCtx(() => [
                      createVNode(_component_el_menu, {
                        "default-active": unref(activeCategory),
                        onSelect: handleSelectCategory,
                        class: "category-menu"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_menu_item, { index: "" }, {
                            default: withCtx(() => [
                              createTextVNode("\u5168\u90E8")
                            ]),
                            _: 1
                          }),
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(categories), (cat) => {
                            return openBlock(), createBlock(_component_el_menu_item, {
                              key: cat.id,
                              index: String(cat.id)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(cat.categoryName), 1)
                              ]),
                              _: 2
                            }, 1032, ["index"]);
                          }), 128))
                        ]),
                        _: 1
                      }, 8, ["default-active"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_el_col, {
                xs: 24,
                md: 18
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_skeleton, {
                    loading: unref(loading),
                    count: 5,
                    rows: 3,
                    animated: ""
                  }, {
                    default: withCtx(() => [
                      !unref(loading) && unref(entries).length === 0 ? (openBlock(), createBlock(_component_el_empty, {
                        key: 0,
                        description: "\u6682\u65E0\u77E5\u8BC6\u5E93\u6761\u76EE"
                      })) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(unref(entries), (entry) => {
                        return openBlock(), createBlock(_component_el_card, {
                          key: entry.id,
                          class: "entry-card",
                          shadow: "hover",
                          onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/knowledge/detail/${entry.id}`)
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "entry-content" }, [
                              createVNode("h3", { class: "entry-title" }, toDisplayString(entry.title), 1),
                              createVNode("p", { class: "entry-summary" }, toDisplayString(entry.summary), 1),
                              createVNode("div", { class: "entry-meta" }, [
                                entry.categoryName ? (openBlock(), createBlock(_component_el_tag, {
                                  key: 0,
                                  size: "small",
                                  type: "success"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(entry.categoryName), 1)
                                  ]),
                                  _: 2
                                }, 1024)) : createCommentVNode("", true),
                                createVNode("span", { class: "entry-views" }, toDisplayString(entry.viewCount) + " \u9605\u8BFB", 1)
                              ])
                            ]),
                            createVNode("div", { class: "entry-arrow" }, [
                              createVNode(_component_el_icon, null, {
                                default: withCtx(() => [
                                  createVNode(unref(Right))
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          _: 2
                        }, 1032, ["onClick"]);
                      }), 128)),
                      unref(total) > 0 ? (openBlock(), createBlock(_component_el_pagination, {
                        key: 2,
                        "current-page": unref(currentPage),
                        "onUpdate:currentPage": ($event) => isRef(currentPage) ? currentPage.value = $event : null,
                        "page-size": unref(pageSize),
                        "onUpdate:pageSize": ($event) => isRef(pageSize) ? pageSize.value = $event : null,
                        "page-sizes": [10, 20, 40],
                        total: unref(total),
                        layout: "total, sizes, prev, pager, next, jumper",
                        onSizeChange: handleSizeChange,
                        onCurrentChange: handlePageChange,
                        class: "pagination"
                      }, null, 8, ["current-page", "onUpdate:currentPage", "page-size", "onUpdate:pageSize", "total"])) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }, 8, ["loading"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/knowledge/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-91d292ff"]]);

export { index as default };
//# sourceMappingURL=index-Cdl2RFMV.mjs.map
