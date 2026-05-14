# Figma 节点缓存 — 顶栏搜索框 + 历史下拉

- 文件 fileKey：`f7bHkVNYG1X14LwsMgkPgx`
- 节点 nodeId：`0:2627`（图层名 `06`，主页顶栏搜索框点击触发态：历史搜索 / 最近打开网站下拉）
- 来源链接：https://www.figma.com/design/f7bHkVNYG1X14LwsMgkPgx/...?node-id=0-2627
- 读取时间：2026-05-13
- 资源有效期：Figma asset URL 7 天后过期，超过需重新读取

## 触发与行为

- 触发：点击顶栏搜索输入框
- 行为：在输入框正下方弹出下拉面板，列出 5 条历史/最近打开记录
- 点击项：打开对应网址
- hover 项：背景高亮 + 右侧出现关闭按钮（用于删除该条历史）

## 结构概览（自上而下）

```
06 (frame, 容纳顶栏整条)
├── toolbar 底色条 (id=0:2628)              bg #202020   w 960 × h 44   y 635
├── 左侧导航三连
│   ├── icon_left  (0:2629)   16×16   x 136
│   ├── icon_right (0:2632)   16×16   x 168   (= icon_left 翻转)
│   └── icon_renew (0:2635)   16×16   x 200
├── 右侧 icon_history (0:2639) 16×16   x 1048   (历史入口)
└── search 组 (0:2644)
    ├── input 矩形 (0:2645)             bg #161719  border 1px #4162fb  radius 6
    │                                    w 800 × h 28   x 232  y 643
    │   └── icon_search (0:2693/2697)   14×14   x 248
    └── dropdown (0:2646)               bg #242426  radius 8
        │                                w 800 × h 168   x 232  y 675
        ├── item active (0:2648)        文字 #4162fb  "netflix.com"     y 679
        ├── item default (0:2657)       文字 #eeeeee  "abcdef.com"      y 711
        ├── item hover (0:2665)         bg #2a2a2c  radius 4            y 743
        │                               文字 #eeeeee  "amazon.com"
        │                               右侧 close 16×16 (0:2667)
        ├── item default (0:2675)       文字 #eeeeee  "joyn.com"        y 775
        └── item default (0:2684)       文字 #eeeeee  "ABCdef.com"      y 807
```

## 关键样式 token（→ 对照 recordfab.tokens.json）

| 用途 | 值 | tokens.json 路径 |
|---|---|---|
| 顶栏底色 | `#202020` | `color.background.app` |
| 输入框背景 | `#161719` | `color.surface.sidebar`（同色复用） |
| 输入框聚焦边框 | `#4162fb` | `color.brand.primary` |
| 下拉面板背景 | `#242426` | `color.surface.field` |
| hover 项背景 | `#2a2a2c` | `color.surface.hover` |
| 默认项文字 | `#eeeeee` | `color.text.title` |
| active 项文字 | `#4162fb` | `color.text.link` |
| 正文字体 | Arial Regular 14 / 20 | `typography.fontSize.body` + `lineHeight.body` |
| 输入框圆角 | 6 | `radius.button`（同 6 复用） |
| 下拉面板圆角 | 8 | `radius.card`（同 8 复用） |
| 列表项圆角 | 4 | `radius.inputSm`（同 4 复用） |
| 顶栏高度 | 44 | `size.topbar.h`（新增） |
| 输入框尺寸 | 800×28 | `size.field.search` (新增) |
| 下拉面板尺寸 | 800×168 | `size.dropdown.searchHistory`（新增） |
| 列表项高度 | 32 | `size.dropdown.itemH`（新增） |
| 导航图标步距 | 32 | `spacing.toolbar.navIconStep`（新增） |
| 输入框前置 icon 左内边距 | 16 | `spacing.input.leadingIconPaddingLeft`（新增） |
| 下拉与输入框间距 | 4 | `spacing.dropdown.gapFromTrigger`（新增） |
| 下拉上下内边距 | 4 | `spacing.dropdown.topPadding`（新增） |
| 下拉左右内边距 | 4 | `spacing.dropdown.itemHorizontalInset`（新增） |
| 列表项 icon 左内边距 | 12 | `spacing.dropdown.itemIconPadding`（新增，由 1.52% × 792 折算） |

## 状态枚举

| 状态 | 背景 | 文字 | 尾部 |
|---|---|---|---|
| default | 透明 | `#eeeeee` | 无 |
| active（当前选中/首项默认聚焦） | 透明 | `#4162fb` | 无 |
| hover | `#2a2a2c` | `#eeeeee` | close icon 16×16 |

## 图标 / 图片资源

- 全部为 SVG icon，没有真实图片素材
- 按全局 Figma 约束：不主动下载，需要落地时由用户单独确认下载哪些
- 涉及 icon：icon_left / icon_right / icon_renew / icon_history(toolbar) / icon_search / icon_history(item active) / icon_history(item default) / icon_close(item hover)

## 待二次核对

- 列表项左/右 icon padding 来源为百分比 1.52% × 792 ≈ 12px，实现时若像素错位以 12 为初值微调
- 顶栏左侧最后一个 nav icon (0:2635 end=216) 到 input 起点 (x=232) 的几何距离 = 16，但视觉等距节奏是 32；实现时按 32 节奏更顺眼
- icon_history 入口（0:2639 x=1048）到 input end（x=1032）= 16

## 不在本节点的内容

- 输入框未点击的默认态（placeholder "search or visit a website"，见 `0-1367_home_workspace.md`）
- 输入框输入字符后的搜索建议态（非本节点）
