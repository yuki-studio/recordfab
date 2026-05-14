# Figma 节点缓存 — 录制中蒙层提示

- 文件 fileKey：`f7bHkVNYG1X14LwsMgkPgx`
- 节点 nodeId：`0:6470`（图层名 `编组 7`，类型：录制中蒙层 / 覆盖在视频画面上）
- 来源链接：https://www.figma.com/design/f7bHkVNYG1X14LwsMgkPgx/...?node-id=0-6470
- 读取时间：2026-05-12
- 资源有效期：Figma asset URL 7 天后过期
- 配套节点：`0:6354`（录制工作区，本蒙层叠在其视频画面区上）

## 结构

```
编组 7 (蒙层组件, 700 × 112, 居中铺在视频画面上)
├── 横向渐变背景  (700 × 112)
│   linear-gradient(to right,
│     rgba(0,0,0,0) 0%,
│     #000 55.31%,    ← 中心纯黑
│     rgba(0,0,0,0) 100%)
└── 文字组 编组 6  (460 × 84, 居中)
    ├── 主文字 "Recording Duration: 00:10:25"
    │   Arial Bold 24 / line 36 / #eee
    └── 副文字（说明，多行居中）
        "To ensure smooth recording, other actions are disabled.
         You can click "Stop" to end the recording or simply close the webpage."
        Arial Regular 14 / line 20 / #aeb1b6
```

## 关键样式 token

| 用途 | 值 |
|---|---|
| 背景渐变（左右羽化中间黑） | `linear-gradient(to right, rgba(0,0,0,0) 0%, #000 50%, rgba(0,0,0,0) 100%)` |
| 主标题 | `#eee`  Arial Bold 24 / line 36 |
| 副文案 | `#aeb1b6`  Arial Regular 14 / line 20 |
| 文字水平对齐 | 居中 |
| 蒙层尺寸 | 700 × 112（视觉区） |
| 在录制画面中位置 | 视频画面区垂直靠中下 |

## 图标 / 图片资源

- 按全局 Figma 约束，不缓存图片远程 URL，也不主动下载
- 文字两端羽化效果在实现中**优先用 CSS 渐变** + `mask-image: linear-gradient(...)`，不依赖 Figma 的 mask PNG

## 业务语义

- 触发：进入"录制中"状态后，盖在视频画面上方
- 内容：实时录制时长（`Recording Duration: HH:MM:SS`）+ 锁屏说明（提示其他操作被禁用）
- 退出：点击 Stop 或关闭网页

## 与当前实现差异（src/components/RecordModal.tsx + SitePage 中的录制态）

| 项 | 当前 | 设计稿 |
|---|---|---|
| 蒙层风格 | 白色卡片 `bg-white/95` 圆角 2xl | 横向渐变黑遮罩（两端透明） |
| 录制时长字号 | text-4xl（≈36px） | 24px Bold |
| 说明文字 | 中文 + slate-400 | 英文 + #aeb1b6 |
| 中文文案 | "录制时长" + "为确保录制顺利..." | "Recording Duration: ..." + "To ensure smooth recording..." |

## 不在本节点的内容

- 录制工作区的浏览器壳 / 视频画面 / Start-Stop 按钮（见 `0-6354`）
- 录制开始前的确认弹窗（设计稿未提供节点）
