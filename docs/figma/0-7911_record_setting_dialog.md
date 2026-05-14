# Figma 节点缓存 — Record Setting 录制配置弹窗

- 文件 fileKey：`f7bHkVNYG1X14LwsMgkPgx`
- 节点 nodeId：`0:7911`（图层名 `下载失败-数量大于2垂直滚动备份`，实际是 Record Setting 弹窗）
- 来源链接：https://www.figma.com/design/f7bHkVNYG1X14LwsMgkPgx/...?node-id=0-7911
- 读取时间：2026-05-12
- 资源策略：按全局 Figma 约束，不缓存图片远程 URL，也不主动下载
- 触发场景：录制工作区（`0:6354`）右下角 **Start** 按钮点击后弹出，确认本次录制的视频信息与录制参数
- 注意：与 `0:5139`（通用 Setting 外壳）不同，这是**录制启动前的一次性确认弹窗**，结构和按钮文案与设置项弹窗都不一样

## 整体尺寸

- 弹窗：**624 × 414**
- 背景：`#202020`
- 圆角：12
- 阴影：`0 12px 40px 0 rgba(15,16,17,0.2)`

## 结构

```
Record Setting 弹窗 (624 × 414)
├── 标题 "Record Setting"  Arial 14/20  #eee   left 32, top 18
├── 右上角关闭 X (16 × 16)   right 20, top 20
│
├── 视频信息卡片 (560 × 96, bg #242426, 圆角 8)
│   left 32, top ≈70
│   ├── 缩略图占位 (128 × 72, 圆角 4, bg #d8d8d8)  内左 12, 内上 12
│   ├── 标题  "The tittle of the video"  #eee 14/20    内左 ≈156, 内上 22
│   ├── 时长  "00:24:09"                  #aeb1b6 14/20  内左 156, 内上 54
│   ├── 1px 竖分隔  (1 × 12, #aeb1b6)     内左 223, 内上 58
│   └── 起点  "Start From the begining"   #aeb1b6 14/20  内左 236, 内上 54
│
├── 字段标签行 (top ≈192)
│   ├── "Output Resolution"  #aeb1b6 14/20    left 32
│   ├── ? icon (16 × 16)                       紧跟标签右
│   └── "Record Speed"        #aeb1b6 14/20    left ≈328
│
├── 下拉行 (top 218, 高 32)
│   ├── Output Resolution 下拉  (264 × 32, bg #242426, 圆角 4)
│   │   left 32   文字 "HD-720P" #eee 14/20  右侧 caret-down 12×10
│   └── Record Speed 下拉        (264 × 32, bg #242426, 圆角 4)
│       left 328  文字 "1x (Default)" #eee 14/20  右侧 caret-down
│
├── Custom Recording Length 开关行 (560 × 32, bg #242426, 顶部圆角 4)
│   left 32, top 266
│   ├── 标签 "Custom Recording Length"  #eee 14/20
│   ├── ? icon (16 × 16)        在标签右
│   └── Switch (开关) 已开启     行右内边 8
│
├── 1px 分隔线  (#292935, 宽 532, 高 1)
│   left 46, top ≈298（贴在两行之间）
│
├── Recording Stops 行 (560 × 32, bg #242426, 底部圆角 4)
│   left 32, top 298
│   ├── 文案 "Recording Stops when the video reaches"  #eee 14/20  内左 16
│   ├── 数字步进输入框 (72 × 24, bg #323234, 圆角 2)
│   │   内左 280   数字 "2" #eee 14/20   右侧上下小箭头 (icon_up_n / icon_down_n)
│   └── 单位 "minutes."   #eee 14/20  内左 360
│
└── 底部按钮组 (right 32, bottom 32)
    ├── 主按钮 OK     (88 × 32, bg #4162fb, 圆角 6)  文字 #fff 14/20
    └── 次按钮 Cancel (88 × 32, 边框 #7f8186, 圆角 6) 文字 #aeb1b6 14/20
    按钮水平间距：8
```

## 关键样式 token

| 用途 | 值 |
|---|---|
| 弹窗背景 | `#202020` |
| 弹窗圆角 | 12 |
| 弹窗阴影 | `0 12px 40px 0 rgba(15,16,17,0.2)` |
| 卡片/字段背景 | `#242426` |
| 卡片圆角（视频信息） | 8 |
| 下拉/字段圆角 | 4 |
| 数字步进框背景 | `#323234` |
| 数字步进框圆角 | 2 |
| 行间分隔线 | `#292935` 1px |
| 主文字 | `#eee`  Arial 14 / 20 |
| 弱文字 / 占位文字 / 标签 | `#aeb1b6`  Arial 14 / 20 |
| 缩略图占位底色 | `#d8d8d8` |
| 主按钮（OK）背景 | `#4162fb` |
| 主按钮文字 | `#ffffff` |
| 次按钮（Cancel）边框 | `#7f8186` |
| 次按钮文字 | `#aeb1b6` |
| 按钮尺寸 | 88 × 32，圆角 6 |
| 字段行高 | 32 |
| 字段左右内边距 | 16（含 ? icon 时间距 8） |
| 视频卡片尺寸 | 560 × 96 |
| 缩略图 | 128 × 72，圆角 4 |
| 弹窗左右内边距 | 32 |
| 弹窗顶部到标题 | 18 |
| 按钮距底部 | 32 |
| 关闭按钮 X | 16 × 16，距右上各 20 |
| ? icon | 16 × 16，跟在标签右，间距 ≈8 |

## 字段交互说明（来自设计稿可推断的语义）

| 字段 | 当前默认值 | 控件类型 |
|---|---|---|
| 视频信息卡 | 标题 + 时长 `00:24:09` + 起点 `Start From the begining` | 只读展示 |
| Output Resolution | `HD-720P` | 下拉（图标 caret-down） |
| Record Speed | `1x (Default)` | 下拉 |
| Custom Recording Length | 开（开关已打开） | Switch |
| Recording Stops when the video reaches | `2 minutes.` | 数字步进 (上下箭头 + 输入) |

## 图片 / 图标资源

按全局 Figma 约束，不缓存远程 URL，也不主动下载。本节点引用的资源（占位即可）：

- 视频缩略图（mask + 图）：实现时用 `#d8d8d8` 灰块 + 标注 `图片：视频缩略图 128×72` 占位
- `?` icon（icon/Comment/Normal）：16×16，可用现有 `info` 图标或问号 SVG 替代
- `caret-down-filled`：下拉箭头，12×10 三角，可用现有图标
- `icon_close`：右上角关闭 X，16×16
- `开关` 图：行内 Switch，可用现有 Switch 组件替代
- `icon_up_n` / `icon_down_n`：数字步进的上下小箭头

## 与 `0:5139` 通用 Setting 外壳的区别

| 项 | `0:5139` 通用 Setting | `0:7911` Record Setting |
|---|---|---|
| 弹窗宽 × 高 | 868 × 634 | 624 × 414 |
| 顶部 | 标题栏 + 1px 分隔线 (h=54) | 仅标题 + 右上 X，无分隔线 |
| 内容区 | 留空，由子页填充（preference / proxy） | 内置完整表单 |
| 按钮 | OK / Cancel（88×32, 4162fb / 边框 7f8186） | OK / Cancel（同样规格） |
| 用途 | 应用级设置入口 | 单次录制启动前的参数确认 |

## 不在本节点的内容

- 视频缩略图的真实图像（设计稿是示例图）
- 各下拉框展开后的选项列表
- 数字步进输入框的输入态、错误态、最小最大边界
- 弹窗的遮罩层 / 关闭动画

## 已知设计稿瑕疵（实现时按"正确"处理）

- `0:7929` 标题文案拼写 `tittle` → 实际应为 `title`（实现时按 `title` 落地，或保留占位变量）
- `0:7931` 文案 `Start From the begining` 拼写错误 → 实际应为 `Start From the beginning`
- `0:7981` 单位 `minutes.` 字体被设为 `PingFang_SC`（中英文混排误用），实现统一按 Arial
- 视频卡片中 "00:24:09 | Start From the beginning" 的小竖条用 `#aeb1b6` 1×12 矩形拼出，落地建议用 CSS border 或字符 `|`
