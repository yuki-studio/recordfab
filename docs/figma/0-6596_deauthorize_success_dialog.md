# Figma 节点缓存 — 取消授权成功弹窗

- 文件 fileKey：`f7bHkVNYG1X14LwsMgkPgx`
- 节点 nodeId：`0:6596`
- Figma 图层名：`删除录制中视频列表-二次确认备份 2`（命名沿用旧节点，实际内容为"取消授权成功"提示，是复用/备份节点）
- 来源链接：https://www.figma.com/design/f7bHkVNYG1X14LwsMgkPgx/?node-id=0-6596
- 读取时间：2026-05-12
- 截图：`resources/figma/exports/deauthorize-success-dialog.png`
- 资源有效期：Figma asset URL 7 天后过期，超过需重新读取

## 用途与文案

- 用途：用户在客户端解除当前设备授权后，弹出成功提示，告知已切换到免费版
- header（顶栏标题）：`RecordFab`
- title：`This computer is deauthorized successfully!`
- description：`Your RecordFab has switched to the free version, you may not be able to use the features that are only available to the paid version.`
- button：`OK`

## 结构概览（自上而下）

```
弹窗 (frame 0:6596)   w 560 × h 222   bg=TODO（design_context 返回栅格图）
├── 矩形背景 (0:6597)   覆盖整层，含模糊阴影
├── 顶栏 (0:6598)       relative x32 y18   w 508 × h 20
│   ├── 标题文字 "RecordFab" (0:6604)   Arial Regular 14/20  #ffffff
│   └── icon_close (0:6599)             16×16   顶栏右侧
├── icon_success (0:6609)   relative x32 y88   32×32   绿色对勾（色值 TODO）
├── 编组5 标题+描述 (0:6605)   relative x96 y70   w 432 × h 68
│   ├── 主标题 (0:6606)   Arial Bold 14/20   #eeeeee
│   └── 描述  (0:6607)    Arial Regular 14/20   #aeb1b6   y+28
└── Primary Button OK (0:6608)   relative x440 y158   w 88 × h 32
    bg #4162fb   radius 6   文字 #ffffff Arial Regular 14/20
```

## 关键样式 token（→ 对照 recordfab.tokens.json）

| 用途 | 值 | tokens.json 路径 |
|---|---|---|
| 顶栏标题文字 | `#ffffff` | `color.text.primary` |
| 主标题文字 | `#eeeeee` | `color.text.title` |
| 描述文字 | `#aeb1b6` | `color.text.secondary` |
| OK 按钮背景 | `#4162fb` | `color.brand.primary` |
| OK 按钮圆角 | 6 | `radius.button` |
| OK 按钮尺寸 | 88×32 | `size.button.default` |
| 关闭图标尺寸 | 16×16 | `size.icon.base` |
| 成功图标尺寸 | 32×32 | `size.icon.feedback`（新增） |
| 弹窗尺寸 | 560×222 | `size.dialog.deauthorizeSuccess`（新增） |
| 弹窗 X 内边距 | 32 | `spacing.dialogPadding.deauthorize`（新增） |
| 弹窗顶部内边距 | 18 | `spacing.dialog.deauthorize.paddingTop`（新增） |
| 弹窗底部内边距 | 32 | `spacing.dialog.deauthorize.paddingBottom`（新增） |
| icon→正文水平间距 | 32 | `spacing.dialog.deauthorize.iconToTextGap`（新增） |
| 主标题→描述垂直间距 | 8（实际位置差 28 = 行高 20 + 间距 8） | `spacing.dialog.deauthorize.titleToDescGap`（新增） |
| 内容区→按钮垂直间距 | 20 | `spacing.dialog.deauthorize.contentToButtonGap`（新增） |
| 正文字体 | Arial Regular 14 / 20 | `typography.fontSize.body` + `lineHeight.body` |
| 主标题字体 | Arial Bold 14 / 20 | （字号同 body，字重 Bold；与 typography 现有字号无新增） |

## 待二次核对（openIssues）

| key | 问题 | 影响 token |
|---|---|---|
| dialog_background | 弹窗背景色和模糊阴影：design_context 中以栅格图返回，需确认 RGB 与 shadow 参数 | `color.surface.dialogDeauthorizeBg` / `shadow.dialog` |
| dialog_radius | 弹窗整体圆角数值未在 design_context 中暴露，暂沿用 `radius.dialog`=12，需对照 Figma 确认 | `radius.dialog` |
| success_icon_color | icon_success 绿色 hex 值（图标为栅格资源，未提供色值） | `color.feedback.success` |
| header_alignment | 顶栏 `RecordFab` 文字在 design_context 中是 `left-[calc(50%-254px)]`（贴左），但视觉上像居中，需核对 | — |

## 图标 / 图片资源

按全局 Figma 约束，不主动下载。涉及资源：

| ref | node | 尺寸 | 用途 | 落地路径建议 |
|---|---|---|---|---|
| img (背景+阴影合成) | 0:6597 | 560×222 | 弹窗背景 | `public/figma/deauthorize-success/bg-with-shadow.png` |
| imgIconClose | 0:6599 | 16×16 | 关闭按钮 | `public/figma/deauthorize-success/icon-close.png` |
| imgIconSuccess | 0:6609 | 32×32 | 绿色对勾 | `public/figma/deauthorize-success/icon-success.png` |

## 不在本节点的内容

- 触发该弹窗的"取消授权"操作入口（在 setting/账号相关页面，另行记录）
- 通用 Primary Button 组件源：`1.General/Button/Primary/Normal-Default`
