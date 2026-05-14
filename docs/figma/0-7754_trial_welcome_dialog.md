# Figma 节点缓存 — 试用提示弹窗（Trial Welcome）

- 文件 fileKey：`f7bHkVNYG1X14LwsMgkPgx`
- 节点 nodeId：`0:7754`（图层名 `welcome备份`）
- 来源链接：https://www.figma.com/design/f7bHkVNYG1X14LwsMgkPgx/...?node-id=0-7754
- 读取时间：2026-05-12
- 资源策略：按全局 Figma 约束，不缓存图片远程 URL，也不主动下载
- 触发场景：试用用户（3 次录制额度）在录制工作区点击右下角 **Start** 时**先弹出**本弹窗，确认后再进入 `0:7911` 录制配置弹窗
- 按钮行为：
  - 主按钮 **Upgrade Now**（蓝色）→ 打开网站购买页
  - 次按钮 **Continue** → 关闭本弹窗，打开 Record Setting 弹窗（`0:7911`）
  - 右上角 X → 关闭弹窗，**不继续录制**

> 注：Figma 设计稿上主按钮原文是 `Update Now`，本项目已统一为 `Upgrade Now`（与正文 "Upgrade to the paid version" 一致），落地按 `Upgrade Now` 实现。

## 整体尺寸

- 弹窗：**740 × 422**
- 背景：`#202020`
- 圆角：12
- （设计稿未给阴影，落地建议复用 setting 弹窗的 `0 12px 40px 0 rgba(15,16,17,0.2)`）

## 结构

```
Trial Welcome 弹窗 (740 × 422, bg #202020, 圆角 12)
│
├── 顶部 Banner 区 (740 × 134, 顶部圆角 12, 底部 1px inset shadow #2a2a2c)
│   ├── 大号 "RecordFab" 水印 logo  opacity 10%   位于右上角（740×135 范围，向右偏移）
│   ├── 从 60.4% 透明 → 100% #202020 80% 的纵向渐变，让水印底部自然过渡
│   └── 左上小 logo (114 × 18, "logo文字")  left 40, top 40
│
├── 关闭 X (16 × 16)  right 20, top 22
│
├── 试用说明文案 (w=500, 居左)  left 40, top 74
│   ├─ 第 1 行："You are in the trial version, 3 videos can be recorded."
│   │   - "You are in the"   Arial Regular 14/20  #aeb1b6
│   │   - "trial version"    Arial **Bold** 14/20  #eee
│   │   - ", 3 videos can be recorded."  Arial Regular 14/20  #aeb1b6
│   └─ 第 2 行："Upgrade to the paid version to enjoy all benefits."
│       Arial Regular 14/20  #aeb1b6
│
├── 副标题 "Benefits of Paid Version"
│   Arial Bold 16/20  #eee   left 40, top 154
│
├── 权益清单（2 列 × 3 行, icon 24×24 + 文案 14/20 #eee）
│   icon-文字间距 8, 行间距 48
│   列 1: icon left 40, 文字 left 72
│   列 2: icon left 408, 文字 left 440
│
│   行 1 (top 198): [features]    1000+ Supported Websites      │ [unlimited]   Customize recording duration
│   行 2 (top 246): [lightning]   High speed recording          │ [protection]  Privacy Protection
│   行 3 (top 294): [diamond]     Professional technical support│ [rocket]      Free updates within period of validity
│   （icon 文件: icon_features / icon_unlimited / icon_lightning / icon_protection / icon_diamond / icon_rocket）
│
└── 底部按钮组  top 350, bottom 40, right 40
    ├── 主按钮 Upgrade Now (104 × 32, bg #4162fb, 圆角 6)
    │   left 484   文字 #fff Arial 14/20 居中
    └── 次按钮 Continue   (104 × 32, 边框 #7f8186, 圆角 6)
        left 596   文字 #aeb1b6 Arial 14/20 居中
    按钮水平间距：8
```

## 关键样式 token

| 用途 | 值 |
|---|---|
| 弹窗背景 | `#202020` |
| 弹窗圆角 | 12 |
| 顶部 banner 底部 1px 分隔 | `inset 0 -1px 0 #2a2a2c` |
| 顶部 banner 渐变 | `linear-gradient(180deg, rgba(32,32,32,0) 60.4%, rgba(32,32,32,0.8) 100%)` |
| 顶部 banner 水印 logo | `RecordFab` 大字, 740×135, opacity 0.10 |
| 顶部 banner 高 | 134 |
| 主文字 | `#eee`  Arial 14 / 20 |
| 弱文字（说明文案） | `#aeb1b6`  Arial 14 / 20 |
| 副标题 | `#eee`  Arial **Bold** 16 / 20 |
| Trial 强调字 | `#eee`  Arial **Bold** 14 / 20（"trial version" 加粗） |
| 权益 icon 尺寸 | 24 × 24 |
| 权益 icon-文字间距 | 8 |
| 权益行高（行间距） | 48 |
| 关闭按钮 X | 16 × 16，右上 20 |
| 弹窗左右内边距 | 40 |
| 副标题距上 | 154 |
| 主按钮 Upgrade Now | 104 × 32, bg `#4162fb`, 圆角 6, 文字 `#fff` |
| 次按钮 Continue | 104 × 32, 边框 `#7f8186`, 圆角 6, 文字 `#aeb1b6` |
| 按钮水平间距 | 8 |
| 按钮距右 / 距下 | 40 |

## 图片 / 图标资源

### 已下载的权益图标（6 个，已保存到 `public/figma/`）

| 文件 | 用途 | 尺寸 | Figma 节点 |
|---|---|---|---|
| `icon_features.svg`    | "1000+ Supported Websites"       | 24 × 24 | `0:7808` |
| `icon_unlimited.svg`   | "Customize recording duration"   | 24 × 24 | `0:7802` |
| `icon_lightning.svg`   | "High speed recording"           | 24 × 24 | `0:7828` |
| `icon_protection.svg`  | "Privacy Protection"             | 24 × 24 | `0:7836` |
| `icon_diamond.svg`     | "Professional technical support" | 24 × 24 | `0:7814` |
| `icon_rocket.svg`      | "Free updates within period..."  | 24 × 24 | `0:7820` |

所有图标主色 `#EEEEEE`，无描边，单色路径，可直接 `<img>` 或内联 `<svg>` 使用。

### 待处理资源（按全局 Figma 约束，未下载）

| 名称 | 用途 | 尺寸 |
|---|---|---|
| `logo文字`             | 左上小 logo（RecordFab 文字） | 114 × 18 |
| `RecordFab logo`（水印） | 顶部 banner 大字 logo，opacity 10% | 740 × 135 |
| `icon_close_n`         | 右上关闭 X | 16 × 16 |

实现时这 3 个仍用占位（`#d8d8d8` 灰块 + 节点名）。

## 业务语义 / 状态

- **触发**：仅试用用户、且仍有录制额度（剩余 1~3 次）时点击 Start 触发；首次试用是 3 次
- **关闭后状态**：关闭本弹窗后再次点 Start 仍会弹（每次启动录制都拦一次，直到购买）
- **额度耗尽态**：3 次额度用完后，点 Start 应弹**另一个弹窗**（限制提示/必须购买，设计稿暂未提供节点）
- **付费用户**：不显示本弹窗，点 Start 直接进 `0:7911` Record Setting

## 已知设计稿瑕疵（实现时按"正确"处理）

- `0:7795` 文案 `Free updates within period of vaildity` 拼写错误 → 应为 `Free updates within period of validity`
- 主按钮 Figma 文案 `Update Now` 与正文 `Upgrade to the paid version` 不一致 → 落地统一为 **`Upgrade Now`**

## 不在本节点的内容

- 额度耗尽（0 次剩余）的强制购买弹窗（暂未读取）
- 购买页本身（点 Upgrade Now 跳转的外部网页）
- 试用次数计数的来源 / 持久化逻辑
