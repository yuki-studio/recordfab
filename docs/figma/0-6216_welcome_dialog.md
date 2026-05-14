# Figma 节点缓存 — 启动欢迎弹窗（Welcome）

- 文件 fileKey：`f7bHkVNYG1X14LwsMgkPgx`
- 节点 nodeId：`0:6216`（图层名 `welcome`）
- 来源链接：https://www.figma.com/design/f7bHkVNYG1X14LwsMgkPgx/...?node-id=0-6216
- 读取时间：2026-05-14（重读以补全垂直节奏）
- 弹窗尺寸：**740 × 482**，bg `#202020`，圆角 12
- 触发场景：客户端启动时首屏

## ⚠️ 实现易错点（必看）

| 易错点 | 正确做法 |
|---|---|
| 大标题位置 | 大标题 y=66, 高 36，**叠在 banner 内部**（banner 占 0~118），不是 banner 之外 |
| 营销正文行数 | width 660 + 文本长度 → 实际**渲染为 2 行**（高 40），不是 1 行；段落 `leading-[0]`，内部 `span` `leading-[20px]` |
| 副标题字号 | 副标题 16/20 **Bold**，与营销正文 14/20 不同 |
| 权益 icon 垂直对齐 | icon 中心 ≈ 文字中心（不是 baseline）；icon top=258 时文字 top=260（差 2，因为文字行高 20 中心 270 = icon 24 中心 270） |
| 按钮三按钮分组 | 左侧 Buy Now+Authorize 两个**等宽 88** 间距 8；右侧主按钮 **130** 距右 40，左右组间是**大块留白**（不是 3 等分） |
| 弹窗只展示一次 | 用本地状态记录"已看过"，下次启动直接进 Home |

## 垂直节奏速查表（从上到下，单位 px）

按这个表布局垂直绝对不会偏。

| 段落 | top | end y | 高 | 与上段末的间距 |
|---|---|---|---|---|
| 顶部 banner | 0 | 118 | 118 | — |
| 大标题（叠在 banner 内） | 66 | 102 | 36 | — |
| 营销正文（2 行） | 134 | 174 | 40 | banner 底→正文 = **16** |
| 副标题 "Benefits of Paid Version" | 214 | 234 | 20 | 正文末→副标题 = **40** |
| 权益行 1（icon top 258 / 文字 top 260） | 258 | 282 | 24 | 副标题末→icon = **24** |
| 权益行 2 | 306 | 330 | 24 | 行 1→行 2 = **48**（icon top 差） |
| 权益行 3 | 354 | 378 | 24 | 行 2→行 3 = **48** |
| 按钮组（高 32） | 410 | 442 | 32 | 行 3 末→按钮 = **34**（icon 末 378→按钮 410） |
| 弹窗底 | 482 | — | — | 按钮末→底 = **40** |

**校验**：(482-40)-(0+118) = 324 是中段（正文+副标题+权益+留白）的总垂直空间。

## 横向节奏速查表（弹窗宽 740）

| 元素 | left | width | right inset |
|---|---|---|---|
| 弹窗左右 padding | 40 | — | 40 |
| 大标题 | 居中（中心 370） | 324 | — |
| 营销正文 | 40 | 660 | 40 |
| 副标题 | 40 | hug | — |
| 权益列 1 icon | 40 | 24 | — |
| 权益列 1 文字 | 72 | 260 | — |
| 权益列 2 icon | 408 | 24 | — |
| 权益列 2 文字 | 440 | 260 | — |
| 列 1 → 列 2 间距 | — | — | 列 1 文字 end=332，列 2 icon=408，gap = **76** |
| icon → 文字 间距 | — | — | icon end=64/432，文字 start=72/440，gap = **8** |
| Buy Now | 40 | 88 | — |
| Authorize | 136 | 88 | — |
| 左侧两按钮间距 | — | — | 88+8=96，136-(40+88)=8 ✓ |
| Start Free Trail | 570 | 130 | 40 |

## 关键样式 token

| 用途 | 值 | tokens.json 路径（如有） |
|---|---|---|
| 弹窗 | 740×482 / bg `#202020` / radius 12 | `size.dialog.welcome` / `color.background.app` / `radius.dialog` |
| 顶部 banner | 740×118，蓝紫泡泡装饰图 | — |
| 大标题 | Arial **Bold** 24 / 36  `#ffffff`  居中 | `color.text.primary` |
| 营销正文 | Arial Regular 14 / 20  `#eee` | `color.text.title` |
| More Info... 超链 | `#4162fb`  Arial 14 / 20 | `color.text.link` |
| 副标题 | Arial **Bold** 16 / 20  `#eee` | `typography.fontSize.h3` + `lineHeight.h3` |
| 权益文字 | Arial Regular 14 / 20  `#eee` | `typography.fontSize.body` + `lineHeight.body` |
| 权益 icon | 24×24 | `size.icon.benefit` |
| 主按钮 Start Free Trail | 130×32 / bg `#4162fb` / radius 6 / text `#ffffff` | `size.button.welcomePrimary` |
| 次按钮 Buy Now / Authorize | 88×32 / 边框 `#7f8186` / radius 6 / text `#aeb1b6` | `size.button.default` / `color.border.secondary` |
| 关闭 X | 16×16，右上 20 | `size.icon.base` |
| 弹窗 X 内边距 | 40 | `spacing.dialogPadding.welcome` |
| banner 底→正文 | 16 | `spacing.dialog.welcome.bannerToBody`（新增）|
| 正文末→副标题 | 40 | `spacing.dialog.welcome.bodyToSubtitle`（新增） |
| 副标题末→权益行 1 | 24 | `spacing.dialog.welcome.subtitleToBenefits`（新增） |
| 权益行间距（icon top 步距） | 48 | `spacing.dialog.welcome.benefitRowStep`（新增） |
| 权益 3 末→按钮 | 34 | `spacing.dialog.welcome.benefitsToButtons`（新增） |
| 按钮末→弹窗底 | 40 | `spacing.dialog.welcome.buttonsToBottom`（新增） |
| 大标题距弹窗顶 | 66 | `spacing.dialog.welcome.titleTop`（新增） |
| 营销正文距弹窗顶 | 134 | `spacing.dialog.welcome.bodyTop`（新增） |
| 副标题距弹窗顶 | 214 | `spacing.dialog.welcome.subtitleTop`（新增） |
| 权益行 1 icon 距弹窗顶 | 258 | `spacing.dialog.welcome.benefitRow1Top`（新增） |
| 按钮距弹窗顶 | 410 | `spacing.dialog.welcome.buttonsTop`（新增） |
| 列 1 → 列 2 横向间距 | 76（icon end→icon start，即两列文字 left 差 368）| `spacing.dialog.welcome.benefitColumnGap`（新增） |
| icon → 文字 | 8 | `spacing.dialog.welcome.benefitIconToText`（新增） |
| 左侧次按钮间距 | 8 | `spacing.dialog.welcome.secondaryBtnGap`（新增） |
| 营销正文宽 | 660 | `size.dialog.welcomeBodyW`（新增） |
| 权益文字列宽 | 260 | `size.dialog.welcomeBenefitTextW`（新增） |

## 营销正文文本（完整）

> Easily record any stream in up to 1080p at lightning-fast speed with the ultimate recording solution, and enjoy your offline videos anytime, anywhere.More Info...

**实现建议**：原稿 `anywhere.` 紧贴 `More Info...` 中间无空格 → 落地时加一个空格 `anywhere. More Info...`，且 More Info 是同段内的 inline 链接，不要单独换行。

## 权益清单（6 条）

```
列 1 (icon left 40)                       列 2 (icon left 408)
[features]  Access to all features         [unlimited]   Unlimited processing
[lightning] High speed batch processing    [protection]  Privacy Protection
[diamond]   Professional technical support [rocket]      Free updates within period of validity
```

> 设计稿 `vaildity` 是拼写错误，实现时改为 `validity`。
> 主按钮 `Start Free Trail` 也是拼写错误，实现时改为 `Start Free Trial`（宽度保持 130 即可）。

## 按钮 inset 推导（避免实现端误算）

- Buy Now: `inset[85.06% 82.7% 8.3% 5.41%]` → top 410 / left 40 / width 88 / height 32
- Authorize: `inset[85.06% 69.73% 8.3% 18.38%]` → top 410 / left 136 / width 88 / height 32
- Start Free Trail: `inset[85.06% 5.41% 8.3% 77.03%]` → top 410 / left 570 / width 130 / height 32
- 三按钮 top 一致 = 410；左侧两按钮间距 = 136-(40+88) = 8；主按钮距右 = 740-(570+130) = 40

## 图片 / 图标资源

### 权益图标（已下载，可直接复用）

`public/figma/` 下：
- `icon_features.svg`   `icon_unlimited.svg`   `icon_lightning.svg`   `icon_protection.svg`   `icon_diamond.svg`   `icon_rocket.svg`

### 待处理资源

| 名称 | 用途 | 尺寸 |
|---|---|---|
| 顶部 banner 背景 | 蓝紫泡泡装饰（满铺 740×118）| 740×118 |
| icon_close_n | 右上关闭 | 16×16 |

> 顶部 banner 建议用 CSS 渐变 + 几个 `filter: blur(40px)` 彩色圆点合成，而非切 PNG。

## 三按钮信息架构

| 按钮 | 视觉权重 | 目标用户 | 商业意图 |
|---|---|---|---|
| Start Free Trail | 主按钮，右下高亮蓝 | 多数新用户 | 转化为活跃用户 |
| Authorize | 次按钮，左下灰边框 | 已购买未登录的老用户 | 恢复授权 |
| Buy Now | 次按钮，左下灰边框 | 已决策付费 | 直接转化 |

## 与 trial welcome (`0:7754`) 的区别

见原表，结构相似但**两个独立组件**，文案/banner/按钮组合不能合并。

## 不在本节点的内容

- 顶部 banner 原始素材（按 CSS 实现）
- More Info... 跳转的更多介绍页
- Authorize 后的授权弹窗本体（见 `0:6611`）
- Buy Now 跳转的购买页（外部网页）
- 弹窗外的整屏蒙层
