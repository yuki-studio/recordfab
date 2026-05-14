# Figma 节点缓存 — 录制工作区 顶部 tab / 底部状态条 状态规格 v2

- 文件 fileKey：`f7bHkVNYG1X14LwsMgkPgx`
- 节点 nodeId：`0:7264`（图层名 `顶部/底部状态`）
- 来源链接：https://www.figma.com/design/f7bHkVNYG1X14LwsMgkPgx/...?node-id=0-7264
- 读取时间：2026-05-12
- 资源策略：按全局 Figma 约束，不缓存图片远程 URL，也不主动下载
- 节点性质：**状态规格汇总图 v2**，作为 `0:4480` 的**升级替代版**。落地以本节点为准

## 与 `0:4480` 的差异（落地必读）

| 项 | `0:4480` v1（旧） | `0:7264` v2（新，以此为准） |
|---|---|---|
| 底部按钮组 | **单按钮 Record** (88 × **32**) | **双按钮 Start + Stop** (各 88 × **28**, 间距 12) |
| 底部状态数 | 4 个 | **6 个**（新增"录制失败" + "取消录制"） |
| 按钮态对照 | 无 | **新增 Normal / Hover / Disabled 三态对照行** |
| Stop 按钮 Hover 文字色 | — | **`#f92f4f` 红色**（明确警示意） |

> 顶部 tab 栏 4 态完全不变，缓存可继续参考 `0:4480` 的"顶部 tab 栏"章节，本文件不重复。下方仅列底部状态条 v2 的新规格。

---

# 底部状态条 v2（6 态 + 按钮 3 态对照）

## 共通规格

| 项 | 值 |
|---|---|
| 容器尺寸 | 宽自适应（设计稿示意 961） × 高 **60** |
| 背景 | `#202020` |
| 左侧 状态 icon | 16 × 16，距左 32，垂直居中 (top 22) |
| 主文案 | left **60**, 垂直居中, `#aeb1b6` Arial 14 / 20 |
| 右侧按钮组 | Start + Stop **各 88 × 28**, 圆角 6 |
| 按钮间距 | 12 |
| Stop 按钮距右 | 32（按钮组右对齐到状态条右内边距 32）|
| Start 按钮距右 | 132（= 32 + 88 + 12）|
| 按钮内 icon | 16 × 16，内左 12 |
| 按钮内文字 | Arial 14 / 20，文字区 left 36, right 12 |
| 按钮 icon-文字间距 | 8 |

## Start / Stop 按钮 3 态色板（**核心规格**）

| 按钮 | 状态 | 背景 | 文字 | 备注 |
|---|---|---|---|---|
| **Start** | Normal | `#4162fb` 主蓝 | `#ffffff` | 可点 |
| **Start** | Hover / Press | `#3a54cf` 深蓝 | `#ffffff` | 鼠标悬停或按下 |
| **Start** | Disabled | `#323234` 深灰 | `#595b5f` 弱灰 | 不可点 |
| **Stop** | Normal | `#2a2a2c` 深灰 | `#aeb1b6` | 可点 |
| **Stop** | Hover | `#2a2a2c` 深灰 | **`#f92f4f` 红** | 悬停时文字变红 ⚠ |
| **Stop** | Disabled | `#323234` 深灰 | `#595b5f` 弱灰 | 不可点 |

> **重点**：Stop 的 Hover 文字色是 `#f92f4f` 红色，是终止录制的警示色——落地务必保留这个 hover 红字效果，不要按 Start 的逻辑做"蓝色 hover"。Stop 按钮背景在 Normal / Hover 之间不变，只有文字色变。

## 6 种底部状态规格

### 状态 1：未检测到视频（`0:7507`）

| 元素 | 值 |
|---|---|
| 左 icon | `icon_loading`（旋转环） |
| 文案 | `Detecting Video...` |
| Start | **Disabled** (`#323234` / `#595b5f`) |
| Stop | **Disabled** (`#323234` / `#595b5f`) |

### 状态 2：检测到视频 - 可录制（`0:7536`）

| 元素 | 值 |
|---|---|
| 左 icon | `icon/right`（实心圆 + 对勾） |
| 文案 | `Video Detected` |
| Start | **Normal** 主蓝 (`#4162fb` / `#fff`) |
| Stop | **Normal**（可录制但还没开始录，所以 Stop 是 Normal 不可有效作用的"待命"灰态，与 Disabled 视觉相近但**前者文字 #aeb1b6 后者 #595b5f**）|

### 状态 3：检测到视频 - 无法录制（`0:7563`）

| 元素 | 值 |
|---|---|
| 左 icon | `icon/right`（对勾，与状态 2 相同） |
| 文案 | `Video Detected`（与状态 2 相同） |
| Start | **`#3a54cf` 深蓝 + `#eee` 文字**（看起来是 Hover/Press 视觉，配合上方 264×28 浮窗 tooltip）|
| Stop | **Normal** (`#2a2a2c` / `#aeb1b6`) |
| 附加 | 上方浮窗 `Refresh the page or it is not supported` (264 × 28) |

> 此态 Start 用 Hover 色而非 Disabled，**视觉上看起来仍像可点**。落地建议：实际点击不触发录制，只浮 tooltip 提示"不支持"。是否要改成真正的 Disabled 由产品决定（设计稿当前不是 Disabled）。

### 状态 4：录制中（`0:7590`）

| 元素 | 值 |
|---|---|
| 左 icon | `icon_right`（实心圆刻度，"录制中"指示） |
| 文案 | `Video Recording` |
| Start | **Disabled** (`#323234` / `#595b5f`) |
| Stop | **Disabled** (`#323234` / `#595b5f`) — 注意 Stop 此处仍是 Disabled，实际的"停止"操作在录制蒙层 (`0:6470`) 上 |

### 状态 5：录制失败（`0:7628`，**新增**）

| 元素 | 值 |
|---|---|
| 左 icon | `icon_close`（红色 X 警示） |
| 文案 | `Recording Failed` |
| Start | **Normal** 主蓝 (`#4162fb` / `#fff`) — 允许立即重试 |
| Stop | **Normal** (`#2a2a2c` / `#aeb1b6`) |

### 状态 6：取消录制（`0:7658`，**新增**）

| 元素 | 值 |
|---|---|
| 左 icon | `icon_Canceled`（撤回/重置箭头） |
| 文案 | `Recording Canceled` |
| Start | **Normal** 主蓝 (`#4162fb` / `#fff`) — 允许重新开始 |
| Stop | **Normal** (`#2a2a2c` / `#aeb1b6`) |

## 状态机简图（v2）

```
                  进入 / 切换 tab
                        │
                        ▼
            ┌────────────────────────┐
            │ 1) Detecting Video...  │  Start/Stop 都 Disabled
            └─────────┬──────────────┘
                      │ 嗅探完成
          ┌───────────┼───────────┐
          ▼                       ▼
┌─────────────────┐   ┌──────────────────────────────┐
│ 2) Video        │   │ 3) Video Detected            │
│    Detected     │   │  + tooltip"Refresh..."        │
│ Start 主蓝可点  │   │ Start 显示 hover 色但不真录   │
│ Stop Normal     │   │ Stop Normal                  │
└────────┬────────┘   └──────────────────────────────┘
         │ 用户点 Start
         ▼
┌─────────────────────┐
│ 4) Video Recording  │ Start/Stop 都 Disabled（停止由蒙层 Stop 控制）
└─────────┬───────────┘
          │ 录制结束分支
   ┌──────┴────────┐
   ▼               ▼
┌─────────────┐  ┌──────────────────┐
│ 5) Failed   │  │ 6) Canceled      │
│ Start 可点  │  │ Start 可点       │
│ Stop Normal │  │ Stop Normal      │
└─────┬───────┘  └─────┬────────────┘
      └────────┬───────┘
               │ 用户点 Start
               ▼  回到 2 / 4 流程
```

## 图片 / 图标资源（按全局约束未下载）

### 顶部 tab 资源

与 `0:4480` 一致，参考其图标清单（`icon_home` / `icon_logo` / `icon_close` / `icon_right` / `icon_left` 等）。

### 底部状态左侧 icon

| 名称 | 出现状态 | 节点 id（首次出现）|
|---|---|---|
| `icon_loading` | 未检测到视频 | `0:7530` |
| `icon/right`（对勾 ✓） | 检测到视频-可录制 / 无法录制 | `0:7557` / `0:7584` |
| `icon_right`（录制中圆刻度，与顶部 tab 录制中 icon 同源）| 录制中 | `0:7611` |
| `icon_close`（红 X，警示）| 录制失败 | `0:7649` |
| `icon_Canceled`（撤回箭头）| 取消录制 | `0:7679` |

### 底部按钮内 icon（Start / Stop）

按 3 态各有变体，但实际可大幅简化：

| 用途 | 推荐做法 |
|---|---|
| Start icon | 一份"播放三角"SVG，颜色随按钮态变化（CSS `currentColor` 或 fill 切换）|
| Stop icon | 一份"方块停止"SVG，颜色随按钮态变化 |

> Figma 中切了 6 份（`icon_Start` / `icon_Start_n` / `icon_1` / `icon_2` / `icon_3` / `icon_4` / `icon_stop` / `icon_stop_n` / `icon_stop_h` 等），都是同一图形不同颜色。**落地用 1 份 SVG + `currentColor` 即可**，不要切 6 份。

## 不在本节点的内容

- 录制工作区的浏览器壳 / 视频画面（在 `0:6354`）
- 录制中视频画面的蒙层（在 `0:6470`）
- 点 Start 后弹出的 Trial / Record Setting 弹窗（`0:7754` / `0:7911`）
- "录制失败"具体错误原因弹窗（如有，需另读取）

## 落地建议

- **按钮统一为 88 × 28 圆角 6**，比 v1 的 32 高度更紧凑，整个录制条视觉更扁
- **3 态色板使用 CSS 变量管理**，避免每个状态条单独写颜色：
  ```css
  --btn-start-bg-normal: #4162fb;
  --btn-start-bg-hover:  #3a54cf;
  --btn-start-bg-disabled: #323234;
  --btn-stop-bg-any:     #2a2a2c;   /* Normal 和 Hover 相同 */
  --btn-stop-bg-disabled: #323234;
  --btn-text-on-blue:    #ffffff;
  --btn-text-stop-normal: #aeb1b6;
  --btn-text-stop-hover:  #f92f4f;
  --btn-text-disabled:    #595b5f;
  ```
- **Stop Hover 红字 `#f92f4f`** 是设计稿明确给出的"警示反馈"，不要省略
- **录制失败 / 取消录制**两个新态的左侧 icon 颜色都偏暖（红 X / 红橙箭头），与"可录制态"的蓝绿对勾形成情绪对比，落地保留颜色差异
- **状态 3（无法录制）Start 显示 Hover 色但不真录制**这个设计与产品语义略有冲突，落地前建议产品再确认：要么按设计照做、要么改成真 Disabled。本缓存按设计稿原样记录
