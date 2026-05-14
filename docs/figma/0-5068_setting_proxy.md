# Figma 节点缓存 — Setting · Proxy 子页

- 文件 fileKey：`f7bHkVNYG1X14LwsMgkPgx`
- 节点 nodeId：`0:5068`（图层名 `编组`，Setting 弹窗 Proxy 子页完整态）
- 来源链接：https://www.figma.com/design/f7bHkVNYG1X14LwsMgkPgx/...?node-id=0-5068
- 读取时间：2026-05-12
- 资源策略：按全局 Figma 约束，不缓存图片远程 URL，也不主动下载
- 外壳样式（顶栏 / 关闭 / OK / Cancel）见 `0-5139_setting_dialog_shell.md`，本摘要只记 Proxy 子页特有内容

## 结构概览

```
Setting 弹窗 (868 × 634, bg #202020, 圆角 12, 阴影)
├── 顶栏 + 关闭 + 底部 OK/Cancel              ← 复用外壳（见 0:5139）
├── 左侧 导航 (宽 ~200, 高度撑满中段)
│   ├── 顶部分隔条 (#2a2a2c, 1px, 与顶栏底线对齐)
│   ├── General         Arial 14 / #eee  普通态
│   ├── Preferences     Arial 14 / #eee  普通态
│   └── Proxy           Arial 14 / #4162fb  ← 选中态
│       ├── 选中底：left→right 渐变 rgba(0,115,255,0) → rgba(0,115,255,0.08)
│       └── 右端 caret 三角（向右指，#4162fb）
└── 右侧 表单内容区 (Proxy)
    ├── Field "Proxy Protoco" (拼错的 Protocol → 落地写 "Proxy Protocol")
    │   └── 下拉框 (full width, bg #242426, 圆角 4, h≈32)
    ├── 同行：Field "Host" (左 ~58%宽) + Field "Port" (右 ~21%宽)
    │   ├── Host 输入框  bg #242426 圆角 4
    │   └── Port 输入框  bg #242426 圆角 4
    ├── Field "Username"  下拉框/输入框 (full width, bg #242426 圆角 4)
    └── Field "Password"  输入框 (full width, bg #242426 圆角 4)
```

## 关键样式 token

| 用途 | 值 |
|---|---|
| 左导航与右内容区分隔 | 隐性（靠左侧蓝色选中底色右边界） |
| 顶栏底分隔线 / 组间分隔条 | `#2a2a2c`  1px |
| 左导航选中底色 | linear-gradient(to left, rgba(0,115,255,0) 0%, rgba(0,115,255,0.08) 100%) |
| 左导航选中文字 / caret | `#4162fb` |
| 左导航默认文字 | `#eee`  Arial 14 / line 20 |
| 左导航项高度 | ≈ 40 |
| 表单标签文字 | `#aeb1b6`  Arial 14 / line 20 |
| 表单控件背景（输入框 / 下拉） | `#242426` |
| 表单控件圆角 | 4 |
| 表单控件高度 | ≈ 32（按 inset 比例估算） |
| 标签与控件垂直间距 | ≈ 8 |
| 表单组之间垂直间距 | ≈ 24（一行 label + 一行控件 + 间距） |
| 表单区左内边距 | ≈ 32（从内容区左边界） |
| 表单区右内边距 | ≈ 32 |

## Proxy 表单字段定义（按设计稿）

| 字段 | 控件类型 | 宽度 | 备注 |
|---|---|---|---|
| Proxy Protocol | 下拉框 | full | 设计稿拼错为 "Proxy Protoco"，落地修正为 "Proxy Protocol" |
| Host | 输入框 | 大半（≈ 58%） | 与 Port 同行 |
| Port | 输入框 | 小半（≈ 21%） | 与 Host 同行 |
| Username | 输入框 | full | 设计稿用了 Dropdown 类型节点名，但视觉与普通输入框相同；落地按文本输入框处理 |
| Password | 输入框 | full | 落地需 `type="password"` |

> 设计稿没有 placeholder、错误态、disabled 态、必填标记。落地时若需要，按通用规范补 token：placeholder 用 `#595b5f`。

## 左侧导航项清单（顺序 + 选中态）

| # | 文案 | 默认态 | 当前页选中态 |
|---|---|---|---|
| 1 | General | `#eee` | — |
| 2 | Preferences | `#eee` | — |
| 3 | Proxy | `#eee` | **当前选中**（蓝渐变底 + `#4162fb` 文字 + caret） |
| — | （组间 1px 分隔条 `#2a2a2c`） | | |
| 4 | Media Library | `#eee` | — |
| 5 | Post Processing | `#eee` | — |

## 图标 / 图片资源

- 不缓存远程 URL，不主动下载
- 涉及图标（仅记名）：
  - `icon_close`（弹窗右上 X，复用外壳）
  - `caret-down-filled`（左导航选中项右端三角，旋转 -90° 变成向右指）→ 落地用 lucide `ChevronRight`
  - 下拉框右端的下拉箭头（设计稿在 Proxy Protocol / Username 节点上未单独画出，落地按 `ChevronDown` 补）

## 业务语义

- Setting 弹窗的"Proxy"子页：配置出站代理
- Proxy Protocol 是下拉（典型可选项：HTTP / HTTPS / SOCKS5，设计稿未列出，落地按 RecordFab/StreamFab 常见代理协议）
- Host / Port / Username / Password 是文本输入
- 提交：右下 OK；放弃：Cancel（外壳层提供）

## 不在本节点的内容

- 其他 Setting 子页（General / Preferences / Media Library / Post Processing）
- 下拉框展开态、输入框 focus 态、错误提示
- 表单校验规则
