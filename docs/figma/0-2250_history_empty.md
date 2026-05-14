# Figma 节点缓存 — 历史记录弹窗（空态）

- 文件 fileKey：`f7bHkVNYG1X14LwsMgkPgx`
- 节点 nodeId：`0:2250`（图层名 `History-为空`）
- 来源链接：https://www.figma.com/design/f7bHkVNYG1X14LwsMgkPgx/...?node-id=0-2250
- 读取时间：2026-05-13
- 资源有效期：Figma asset URL 7 天后过期，超过需重新读取

## 触发与行为

- 触发入口：CEF 顶栏右上角 history icon（即 `0:2639 icon_history` toolbar 入口）
- 行为：弹出独立历史记录弹窗，覆盖在客户端内容层之上
- 空态：浏览历史为空时显示"No history yet" + 空状态插画
- 顶部关闭：右上角 icon_close 关闭弹窗
- 搜索栏：仍允许输入网址（"search or visit a website"），并提供 "Clear History" 按钮（空态下视觉同样存在，是否可交互见待核对项）

## 结构概览（自上而下）

```
弹窗 (0:2250)              w≈868 × h≈574   bg #202020   radius 12   shadow.dialog
├── 背景矩形 (0:2251)
├── 顶栏 "History" (0:2277)        x≈32, y≈18   Arial Regular 14/20   #ffffff
├── 顶栏 icon_close (0:2272)       16×16   距右 20, 距顶 20
├── 搜索栏区域 (0:2252 "编组 7")    x≈32, y≈70   w≈804 × h≈32
│   ├── 输入框矩形 (0:2253)        w≈651 × h≈32   bg #161719   radius 6
│   │   ├── icon_search (0:2267)   14×14   左侧 ~16 内边距
│   │   └── placeholder (0:2266)   "search or visit a website"
│   │                              Arial Regular 14/20   #595b5f
│   └── Clear History 按钮 (0:2254)  w≈132 × h≈32   bg #2a2a2c   radius 6
│       ├── icon_trash (0:2256)    16×16   左侧 icon
│       └── 文字 (0:2265)          "Clear History"   Arial 14/20   #aeb1b6
├── 空状态插画 img_null (0:2279)    100×80   居中 (top ≈ 238)
│   └── 由 椭圆/信封/纸1/纸2 多 mask 层合成
└── 空态文案 (0:2278)               "No history yet"   居中 (top ≈ 334)
                                    Arial Regular 14/20   #595b5f
```

## 关键样式 token（→ 对照 recordfab.tokens.json）

| 用途 | 值 | tokens.json 路径 |
|---|---|---|
| 弹窗背景 | `#202020` | `color.background.app` |
| 弹窗圆角 | 12 | `radius.dialog` |
| 弹窗阴影 | `0 12px 40px 0 rgba(15,16,17,0.2)` | `shadow.dialog` |
| 顶栏标题文字 | `#ffffff` | `color.text.primary` |
| placeholder / 空态文案 | `#595b5f` | `color.text.muted` |
| Clear History 按钮文字 | `#aeb1b6` | `color.text.secondary` |
| 输入框背景 | `#161719` | `color.surface.sidebar` |
| 按钮背景 | `#2a2a2c` | `color.surface.hover` |
| 输入框 / 按钮圆角 | 6 | `radius.button` |
| 输入框 / 按钮高度 | 32 | `size.field.h` |
| 顶栏关闭 / 按钮 icon 尺寸 | 16 | `size.icon.base` |
| 搜索 leading icon | 14 | `size.icon.searchLeading` |
| 正文字体 | Arial Regular 14 / 20 | `typography.fontSize.body` + `lineHeight.body` |
| 弹窗尺寸 | 868 × 574 (推算) | `size.dialog.history`（新增） |
| Clear History 按钮尺寸 | 132 × 32 (推算) | `size.button.clearHistory`（新增） |
| 空状态插画尺寸 | 100 × 80 | `size.illustration.empty`（新增） |
| 弹窗 X 内边距 | 32 | `spacing.dialogPadding.history`（新增） |
| 弹窗顶部内边距 | 18 | `spacing.dialog.history.paddingTop`（新增） |
| 顶栏标题→搜索栏垂直间距 | 32 | `spacing.dialog.history.titleToSearchbarGap`（新增） |
| 输入框→Clear 按钮水平间距 | 22 | `spacing.dialog.history.searchbarToButtonGap`（新增） |
| 插画→空态文案垂直间距 | 16 | `spacing.dialog.history.emptyImageToTextGap`（新增） |

## 状态枚举（本节点仅空态）

| 状态 | 表现 |
|---|---|
| 空态（本节点） | 中央显示插画 + "No history yet"，Clear History 按钮是否可点待定 |
| 有数据态 | 不在本节点（另行记录） |

## 待二次核对（推算项）

| 项 | 当前值 | 推算依据 |
|---|---|---|
| 弹窗宽度 | 868 | 顶栏 icon_close 16×16 / 1.85% 反推 ≈ 865~868；与 `size.dialog.setting.w` 一致 |
| 弹窗高度 | 574 | 顶栏 icon_close 16 / 2.79% 反推 ≈ 574 |
| 输入框宽 | 651 | 搜索栏宽 804 × 80.85% (inset right) |
| Clear History 按钮宽 | 132 | 搜索栏宽 804 × 16.42% (inset 1 - 83.58%) |
| 输入框 / 按钮间距 | 22 | 搜索栏宽 804 × (83.58% - 80.85%) = 22 |
| Clear History 按钮空态是否可交互 | — | 设计稿未呈现 disabled 态；可能需补 disabled variant |

## 图标 / 图片资源

按全局 Figma 约束，不主动下载。涉及资源：

| ref | node | 尺寸 | 用途 |
|---|---|---|---|
| imgIconClose | 0:2272 | 16×16 | 顶栏关闭 |
| icon_trash | 0:2256 / 0:2258 | 16×16 | Clear History 按钮左侧 icon |
| icon_search | 0:2267 (编组 5) | 14×14 | 输入框 leading 放大镜 |
| img_null (插画) | 0:2279 | 100×80 | 空状态插画（椭圆底 + 信封 + 纸1 + 纸2 多 mask 合成）|

## 不在本节点的内容

- 历史记录弹窗"有数据态"（列表行结构、分组、日期分隔等）
- 触发该弹窗的 toolbar icon_history 入口本身（见 `0-2627_search_dropdown.md` 中的 `0:2639`）
- "Clear History" 按钮的二次确认弹窗（如有，另行记录）
