# Figma 节点缓存 — 左侧导航 list

- 文件 fileKey：`f7bHkVNYG1X14LwsMgkPgx`
- 节点 nodeId：`0:6327`（图层名 `list`，类型：侧边栏导航）
- 来源链接：https://www.figma.com/design/f7bHkVNYG1X14LwsMgkPgx/...?node-id=0-6327
- 读取时间：2026-05-11
- 资源有效期：Figma asset URL 7 天后过期，超过需重新读取

## 结构概览

```
list (240 × 700, bg #161719)
├── logo  (28, 24 — 124 × 40)
│   ├── icon RecordFab（PNG asset）
│   ├── 文本 "RecordFab"（PNG asset）
│   └── 版本号 "v0.0.0.1"  Arial 14 / line 20 / #595b5f
├── Home (8, 88 — 232 × 40，选中态)
│   ├── 背景：线性渐变 rgba(0,115,255,0) → rgba(0,115,255,0.08)，左上左下 8px 圆角
│   ├── icon/Home  (蓝色)
│   └── 文字 "Home"  Arial 14 / line 20 / #4162fb
└── Recorded / My Files (8, 144 — 232 × 40)
    ├── icon/Recorded（灰色）
    ├── 文字 "My Files"  Arial 14 / line 20 / #aeb1b6
    └── tag（红色 badge）
        ├── 背景 #e02020，半径 8
        └── 数字 "3"  Arial 12 / #eee
```

## 关键样式 token

| 用途 | 值 |
|---|---|
| 侧边栏背景 | `#161719` |
| 选中项渐变背景 | `linear-gradient(to left, rgba(0,115,255,0) 0%, rgba(0,115,255,0.08) 100%)` + 左侧圆角 8 |
| 选中文字 / 图标蓝 | `#4162fb` |
| 普通项文字 | `#aeb1b6` |
| 副标文字（版本号） | `#595b5f` |
| Badge 背景 | `#e02020` |
| Badge 数字 | `#eee` |
| 主字体 | Arial Regular |
| 一级行高 | 14 / 20 |
| Badge 字号 | 12 |

## 图标 / 图片资源

- 按全局 Figma 约束，不缓存图片远程 URL，也不主动下载
- 涉及图标（仅记名）：`Home`、`Recorded/My Files`、`RecordFab logo 文本`、`RecordFab logo 图形`
- 实现优先用 `lucide-react` 或本地 SVG；如需对齐 Figma 原图，由用户单独确认后再读取

## 与当前实现的差异（src/components/Layout.tsx）

| 项 | 当前 | 设计稿 |
|---|---|---|
| 侧边栏宽 | w-56 (224) | 240 |
| 侧边栏背景 | 白 | `#161719` |
| Logo | 紫粉渐变字母 R 占位 | 真实 RecordFab logo + 文本 |
| 版本号 | "1.0.1.5" | "v0.0.0.1" |
| 菜单文案 | 中文（首页 / 我的文件） | 英文（Home / My Files） |
| 菜单图标 | lucide Home / Folder | Figma 内置 SVG/PNG |
| 选中态 | indigo-50 / indigo-600 | 蓝色渐变 + #4162fb |
| Badge | 无 | My Files 右侧红色 "3" |

## 注意

- 本节点只覆盖侧边栏，**不含**顶部状态栏与主工作区
- 顶部 / 主区域要对齐需另行提供 node-id
