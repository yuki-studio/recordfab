# Figma 节点缓存 — 历史记录弹窗（有数据态）

- 文件 fileKey：`f7bHkVNYG1X14LwsMgkPgx`
- 节点 nodeId：`0:2085`（图层名 `History-有数据`）
- 来源链接：https://www.figma.com/design/f7bHkVNYG1X14LwsMgkPgx/...?node-id=0-2085
- 读取时间：2026-05-13
- 同源空态：`0-2250_history_empty.md`
- 资源有效期：Figma asset URL 7 天后过期，超过需重新读取

## 触发与行为

- 同空态：CEF 顶栏右上角 history icon 点击触发；有历史记录时显示本态
- 列表按日期分组（"2024-09-18" / "2024-08-08" 等），最近日期在上
- 每条记录：站点 logo + 主标题 + URL + 时间 + 右侧删除按钮（hover 单条出现）
- 行 hover：背景从 `#242426` → `#2a2a2c`
- 右侧极细滚动条用于长列表纵向滚动

## 结构概览（自上而下）

```
弹窗 (0:2085)                      w 868 × h 574   bg #202020   radius 12   shadow.dialog
├── 背景矩形 (0:2087)
├── 顶栏 "History" (0:2248)        x≈32, y≈18   white   Arial 14/20
├── 顶栏 icon_close (0:2243)       16×16   距右 20, 距顶 20
├── 搜索栏区域 (0:2223 "编组 7")    与空态完全一致；x≈32, y≈70   804×32
│   ├── 输入框 (0:2224)            651×32   bg #161719   radius 6
│   │   ├── icon_search (0:2238)   14×14   左 inset
│   │   └── placeholder (0:2237)   "search or visit a website"   #595b5f
│   └── Clear History 按钮 (0:2225)  132×32   bg #2a2a2c   radius 6
├── 日期分组 #1 "2024-09-18" (0:2088 "编组 2")
│   │                                顶部 y≈126，组合卡 804×232
│   ├── 分组 header (0:2123)       804×40   bg #323234   顶部圆角 6
│   │   └── "2024-09-18" 文字      Arial 14/20   #aeb1b6   左 inset 16
│   ├── 行 #1 (0:2089) default     804×48   bg #242426
│   ├── 分割线 (0:2126)            772×1   bg #323234   左右内缩 16
│   ├── 行 #2 (0:2106) hover       804×48   bg #2a2a2c
│   ├── 分割线 (0:2164)            同上
│   ├── 行 #3 (0:2128) default     804×48   bg #242426
│   ├── 分割线 (0:2145)            同上
│   └── 行 #4 (0:2147) default     804×48   bg #242426   底部圆角 6
├── 日期分组 #2 "2024-08-08" (0:2165 "编组 2备份")
│   │                                顶部 y≈374，组合卡 804×184
│   ├── 分组 header (0:2200)       804×40   同上 顶圆角 6
│   ├── 行 #1 (0:2166)             804×48
│   ├── 分割线 (0:2203)            772×1
│   ├── 行 #2 (0:2183)             804×48
│   ├── 分割线 (0:2222)            772×1
│   └── 行 #3 (0:2205)             804×48   底部圆角 6
└── 滚动条 (0:2249)                 6×100 (示例长度)   bg #2a2a2c   radius 4   距右 8
                                    本节点示例 top ≈ 144, 与分组卡顶对齐起步
```

## 单条记录行内布局（行宽 804 × 高 48）

| 列 | 起点 x | 宽度 | 内容 / 样式 |
|---|---|---|---|
| logo | 16 | 24 | 椭圆形 + 站点位图 mask（24×24） |
| 主标题 | 52 | 308 | Arial Regular 14/20  `#eeeeee`  单行省略 |
| URL | 384 | 260 | Arial Regular 14/20  `#eeeeee` |
| 时间 | 668 | 80 | Arial Regular 14/20  `#eeeeee` |
| 删除 icon_close_circle | 772 | 16 | 16×16 圆形 close（与单条 hover 关联出现） |

列间距 24（标题→URL、URL→时间、时间→close 均为 24），左 inset 16，右 inset 16（close 距行右边 = 804-772-16 = 16）。

## 关键样式 token（→ 对照 recordfab.tokens.json）

| 用途 | 值 | tokens.json 路径 |
|---|---|---|
| 弹窗背景 / 圆角 / 阴影 | `#202020` / 12 / shadow.dialog | 沿用 |
| 行默认背景 | `#242426` | `color.surface.field` |
| 行 hover 背景 | `#2a2a2c` | `color.surface.hover` |
| 分组 header / 分割线背景 | `#323234` | `color.surface.stepper` |
| 滚动条背景 | `#2a2a2c` | `color.surface.hover` |
| 主标题 / URL / 时间文字 | `#eeeeee` | `color.text.title` |
| 日期 header 文字 | `#aeb1b6` | `color.text.secondary` |
| 分组卡顶/底圆角 | 6 | `radius.button`（复用 6） |
| 滚动条圆角 | 4 | `radius.inputSm`（复用 4） |
| 行删除 icon 尺寸 | 16 | `size.icon.base` |
| 行 logo 尺寸 | 24 | `size.history.logo`（新增） |
| 行高 | 48 | `size.history.rowH`（新增） |
| 分组 header 高 | 40 | `size.history.dateHeaderH`（新增） |
| 行宽（= 弹窗内宽） | 804 | 由 `spacing.dialogPadding.history` 32 左右 + 弹窗宽 868 推得 |
| 主标题列宽 | 308 | `size.history.columns.title`（新增） |
| URL 列宽 | 260 | `size.history.columns.url`（新增） |
| 时间列宽 | 80 | `size.history.columns.time`（新增） |
| 滚动条宽 | 6 | `size.history.scrollbarW`（新增） |
| 行内 left/right padding | 16 | `spacing.dialog.history.itemPaddingX`（新增） |
| 行内列间距 | 24 | `spacing.dialog.history.itemColumnGap`（新增） |
| 分割线左右内缩 | 16 | 等于 `spacing.dialog.history.itemPaddingX`（复用） |
| 行 hover→删除 icon 出现 | — | 交互逻辑，无 token |

## 交互状态

| 状态 | 表现 |
|---|---|
| default 行 | bg `#242426`，删除 icon 隐藏（按截图，hover 行才显示） |
| hover 行 | bg `#2a2a2c`，右侧删除 icon 显示 |
| 行内点击 | 打开对应 URL，关闭弹窗（行为约定，需 PM 确认） |
| 删除 icon 点击 | 删除该条记录，行内移除（无二次确认，单条粒度） |
| Clear History 点击 | 清空所有历史记录（是否二次确认弹窗未在本节点呈现） |

## 待二次核对

| 项 | 当前值 / 描述 | 备注 |
|---|---|---|
| default 行删除 icon 是否始终显示 | 截图看 hover 行才显示，default 行也都画了 close icon | 实现时按 hover 才显示更克制；需 PM 确认 |
| 滚动条长度 / 滑动条 padding | 滚动条 6×100 仅为示例长度，由内容驱动 | — |
| 单条点击行为 | 打开 URL 后是否关闭弹窗，是否在新 tab 中打开 | 与 toolbar 当前 tab 上下文交互逻辑相关 |
| 单条点击 vs Tab 是否打开新 tab | — | 取决于 CEF 行为约定 |
| 滚动条距右内边距 | 8 | 由 inset 推算 |

## 图标 / 图片资源

按规则不主动下载，涉及：

| ref | node | 尺寸 | 用途 |
|---|---|---|---|
| imgIconClose | 0:2243 | 16×16 | 顶栏关闭（与 0:2250 空态同款） |
| icon_close_circle | 0:2091 / 0:2108 / 0:2130 / 0:2149 / 0:2168 / 0:2185 / 0:2207 | 16×16 | 单条记录右侧删除（多份是因为按状态分别引用 imgIconCloseCircle/1/2/3/5）|
| icon_trash | 0:2229 | 16×16 | Clear History 按钮 icon（与 0:2250 空态同款） |
| icon_search | 0:2238 | 14×14 | 输入框 leading（同款，已下载 `nav_icon_search.svg`） |
| site_logo_circle_bg | 0:2101 等 | 24×24 | 行 logo 椭圆形背景 |
| site_logo_bitmap | 0:2102 等 | 24×24 | 行 logo 站点位图（本设计稿全部用 Netflix N 红色 logo 占位）|

## 不在本节点的内容

- 删除单条记录的具体交互动画（如行内淡出）
- Clear History 二次确认弹窗（如有）
- 搜索过滤态（输入关键字后列表过滤）
- 历史记录持久化方案（PM 侧约定）
