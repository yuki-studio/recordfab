# Figma 节点缓存 — 视频录制界面 主工作区

- 文件 fileKey：`f7bHkVNYG1X14LwsMgkPgx`
- 节点 nodeId：`0:6354`（图层名 `内容`，类型：录制中工作区）
- 来源链接：https://www.figma.com/design/f7bHkVNYG1X14LwsMgkPgx/...?node-id=0-6354
- 读取时间：2026-05-12
- 资源有效期：Figma asset URL 7 天后过期，超过需重新读取
- 配套节点：`0:6470`（蒙层提示，见同目录 `0-6470_recording_overlay.md`）

## 整体结构（自上而下）

```
内容 (左 240 起，宽 960，高 700, bg #202020)
├── 顶部固定导航 (top=0, h=44)              ← 与 0:1367 浏览器壳相同
│   └── Buy Now / icon_theme / icon_menu / icon_min / icon_max / icon_close
├── 顶部 2 — Tab 栏 (top=44, h=44)
│   ├── 选中 tab "Home"（icon_home + 文字 #aeb1b6）  宽 200
│   ├── 未选中 tab "Stream ESPN+ Live Games"  宽 282（更长）
│   ├── 未选中 tab "Netflix"  宽 200
│   └── 未选中 tab "Netflix"  宽 200
├── 二级导航 (top=88, h=44, bg #202020)
│   └── icon_left / icon_right(镜像) / 刷新 / 搜索框(#161719) / icon_history
├── 视频画面区 (top=132, h=508)
│   ├── 底层 bg #494949
│   ├── 位图 (img7) — 已检测视频画面，带 alpha mask
│   └── 暗化遮罩 rgba(0,0,0,0.2) 覆盖
└── 底部录制状态栏 编组 4 (top=640, h=60, bg #202020)
    ├── 左侧 icon_loading（加载圈，36px 高比例）
    ├── 左侧文字 "Detecting Video..."  Arial 14/20 #aeb1b6
    ├── 右侧 Start 按钮 (#323234, 圆角 6, 文字 #595b5f, icon_Start + Start)  ← disabled 态
    └── 右侧 Stop 按钮  (#323234, 圆角 6, 文字 #595b5f, icon_stop + Stop)    ← disabled 态
```

## 关键样式 token

| 用途 | 值 |
|---|---|
| 主背景 | `#202020` |
| 视频画面占位 | `#494949` |
| 视频画面暗化遮罩 | `rgba(0,0,0,0.2)` |
| 录制按钮 bg（disabled） | `#323234` |
| 录制按钮文字（disabled） | `#595b5f` |
| 录制按钮圆角 | 6 |
| 状态栏文字 | `#aeb1b6` / Arial 14 / line 20 |
| Tab 栏 / 二级导航 | 与 0:1367 一致 |

## 与 0:1367（主页）的关系

- 浏览器壳（顶部固定导航 + Tab 栏 + 二级导航）**结构与样式完全一致**，可复用同一组件
- 区别：Tab 列表不同（含 ESPN+ Live Games 长 tab），主区从"内容列表"换成"视频画面 + 录制状态栏"

## 图标 / 图片资源

- 按全局 Figma 约束，本摘要**不缓存图片远程 URL**，也不主动下载
- 涉及的新增图标资源（仅记名，不留 URL）：`icon_Start`、`icon_stop`、`icon_loading`、`ESPN+ tab logo`、视频画面位图与 alpha mask
- 浏览器壳的窗口按钮 / Tab 背景 / 地址栏图标，**直接复用** `0:1367` 已落地到 `public/figma/` 的 PNG，不重复读取

## 状态语义推断（按 disabled 灰按钮 + "Detecting Video..." 判定）

- 当前状态：**视频检测中**（未检测到可录视频）→ Start/Stop 均不可用
- 后续状态（设计稿未给但可推断）：
  - 检测到 → Start 高亮可点 / Stop 仍 disabled
  - 录制中 → Start disabled / Stop 高亮可点，加遮罩蒙层（见 `0-6470_recording_overlay.md`）

## 不在本节点的内容

- 左侧 sidebar（属于 `0:6327`）
- 录制中蒙层提示（属于 `0:6470`）
- 检测成功态 / 录制中态的按钮高亮颜色（设计稿未提供）
