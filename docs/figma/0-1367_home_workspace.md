# Figma 节点缓存 — 主工作区 "内容"

- 文件 fileKey：`f7bHkVNYG1X14LwsMgkPgx`
- 节点 nodeId：`0:1367`（图层名 `内容`，类型：主页主工作区）
- 来源链接：https://www.figma.com/design/f7bHkVNYG1X14LwsMgkPgx/...?node-id=0-1367
- 读取时间：2026-05-11
- 资源有效期：Figma asset URL 7 天后过期，超过需重新读取

## 结构概览（自上而下）

```
内容 (full canvas, bg #202020)
├── 顶部固定导航 (高 ~44px)            ← 窗口栏
│   ├── 标题栏背景（拖拽区域）
│   ├── Buy Now 按钮（蓝色渐变 #4162fb→#4465ff，圆角 14，含 icon_buy + 文字）
│   ├── icon_theme（圆角 6 方按钮）
│   ├── icon_menu
│   ├── icon_min
│   ├── icon_max
│   └── icon_close
├── 顶部 2 (Tab 栏)
│   ├── 选中 tab "Home"（蓝色高亮底，含 icon_home + Home 标签 + 关闭 icon）
│   ├── 未选中 tab "Netflix"（含 logo + 标签 + 关闭 icon）× 3
│   └── 分隔线 #292929
├── 二级导航 (高 ~88px, bg #202020)
│   ├── icon_left（后退）
│   ├── icon_right（前进，水平镜像）
│   ├── 编组 3（刷新图标）
│   ├── 搜索框 bg #161719 圆角 6，placeholder "search or visit a website" #595b5f
│   └── icon_history（右上角）
├── Hot Services 区
│   ├── 标题 "Hot Services"  Arial Bold 20 / line 28 / #eee
│   ├── 副标 "Record 1080p/720p videos..." + "More Info…" #4162fb
│   └── 5 卡片 横向：Netflix / Prime Video / HBO Max / Netflix / HBO Now
└── All Supported Sites 区
    ├── 标题 "All Supported Sites"  Arial Bold 20 / line 28 / #eee
    ├── 副标 "Securely and efficiently record videos from more than 1000 sites..."
    ├── A 组：A 标题 + 5 列网格（abc.com / abc7news.com / abc7ny.com / adult.noodlemagazine… / acfun.cn）
    ├── B 组：B 标题 + 5 列网格（b-ch.com / bateworld… / beeg.com / biosphere… / bobbysoul… / bild.de）
    └── 右侧 A–Z + # 字母锚定器（D / Q 高亮 #eee，其他 #aeb1b6）
+ 滚动条 #292929 圆角 3
```

## 关键样式 token

| 用途 | 值 |
|---|---|
| 主背景 | `#202020` |
| 分隔线 | `#292929` |
| 一级文字 | `#eee` |
| 二级文字 / 网站名 | `#aeb1b6` |
| placeholder / 弱信息 | `#595b5f` |
| 主蓝（链接 / Buy Now） | `#4162fb` → `#4465ff` |
| 搜索框 / 输入背景 | `#161719` |
| 字号 标题 | 20 / line 28（Arial Bold） |
| 字号 正文 | 14 / line 20（Arial Regular） |
| 字号 字母锚 | 12 / line 16 |
| 圆角 按钮 | 6 / 14 |

## 图标 / 图片资源

- 按全局 Figma 约束，不缓存图片远程 URL，也不主动下载
- 本次首版实现已将必需资源下载到 `public/figma/`（属于落地阶段一次性操作，非读取阶段）
- 资源清单见 `public/figma/` 目录，覆盖：窗口栏图标、Tab 背景与图标、地址栏图标、字母锚装饰、5 张 Hot Services 卡片背景
- 后续若设计稿换图，**不再默认重新下载**，由用户单独确认

## 与当前 HomePage 实现差异（src/pages/HomePage.tsx）

| 项 | 当前 | 设计稿 |
|---|---|---|
| 主题 | 浅色（白 + slate） | 深色 #202020 |
| 文案 | 中文 | 英文 |
| 浏览器壳 | 无 | 含窗口栏 + Tab 栏 + 地址栏 |
| Hot Services 卡片 | 渐变色块占位 | Figma 真实背景图 |
| All Sites 列表 | 单字母切换显示 | A–Z 全部连续显示 + 5 列网格 |
| 字母锚 | indigo 高亮按钮 | 细长字母列，仅文字色变化 |

## 不在本节点的内容

- 左侧导航 sidebar（见 `0-6327_sidebar.md`）
- Site 子页、Files、录制弹窗
