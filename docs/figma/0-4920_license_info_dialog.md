# Figma 节点缓存 — License Info 弹窗（lifetime 购买用户态）

- 文件 fileKey：`f7bHkVNYG1X14LwsMgkPgx`
- 节点 nodeId：`0:4920`（图层名 `购买用户（lifetime）`）
- 来源链接：https://www.figma.com/design/f7bHkVNYG1X14LwsMgkPgx/...?node-id=0-4920
- 读取时间：2026-05-12
- 资源策略：按全局 Figma 约束，不缓存图片远程 URL，也不主动下载
- 触发场景：客户端右上角"菜单 icon"展开菜单 → 点击其中的 **License Info / 关于** 项 → 弹出本弹窗
- 当前节点态：**lifetime 购买用户（永久授权）**

## 整体尺寸

- 弹窗：**480 × 274**
- 背景：`#202020`
- 圆角：12
- 阴影：`0 12px 40px 0 rgba(15,16,17,0.2)`（与 setting 弹窗外壳同规格）

## 结构

```
License Info 弹窗 (480 × 274)
│
├── 顶栏 (h ≈ 20)
│   └── 标题 "RecordFab"   Arial Regular 14 / 20  #eee   left 32, top 18
│
├── 右上关闭 X (16 × 16)   right 20, top 20
│
├── 品牌区
│   ├── 主 logo (`logo_main`, 72 × 72)        left 32, top 70
│   ├── RecordFab 文字 logo (114 × 18)         left 116, top 83
│   └── 版本号 "Version: 13.0.0.0 (28/2/2023)"
│       Arial Regular 14 / 20  #595b5f         left 116, top 109
│
└── 信息表格 (416 × 76, 三行)        left 32, top 166
    每行高 28，文字 Arial Regular 14 / 20  #eee
    │
    ├─ 行 1 (top 166)：
    │   "License Status：Authorized(Nora@gmail.com)"
    ├─ 行 2 (top 194)：
    │   左：  "License Edition：Paid version"
    │   右：  "Buy Now"  #4162fb 14/20（蓝字超链，右对齐到表格右边）
    └─ 行 3 (top 222)：
        "License Expiration Date：Never Expired"
```

## 关键样式 token

| 用途 | 值 |
|---|---|
| 弹窗宽 × 高 | 480 × 274 |
| 弹窗背景 | `#202020` |
| 弹窗圆角 | 12 |
| 弹窗阴影 | `0 12px 40px 0 rgba(15,16,17,0.2)` |
| 弹窗左右内边距 | 32 |
| 顶部标题 | `#eee`  Arial 14 / 20 |
| 主 logo 尺寸 | 72 × 72 |
| RecordFab 文字 logo | 114 × 18 |
| 版本号文字色 | `#595b5f`（灰，弱化处理） |
| 表格行高 | 28 |
| 表格文字 | `#eee`  Arial 14 / 20 |
| Buy Now 蓝字超链 | `#4162fb`  Arial 14 / 20，右对齐 |
| 关闭按钮 X | 16 × 16，右上 20 |
| 表格首行距 logo 底距 | 24 |

## 中文全角冒号 "：" 的使用

设计稿中 "License Status：…" / "License Edition：…" / "License Expiration Date：…" 均使用**中文全角冒号 `：`**，落地建议：

- 英文界面**改用半角 `:` + 空格**（如 `License Status: Authorized(...)`）
- 不要为了像素一致保留全角冒号，那是设计稿翻译遗留

## 字段语义（lifetime 态）

| 字段 | 值（设计稿示例） | 数据来源 |
|---|---|---|
| License Status | `Authorized(<邮箱>)` | 已授权 + 登录账号邮箱 |
| License Edition | `Paid version` | 付费版本 |
| License Expiration Date | `Never Expired` | 终身授权 |
| Buy Now 链接 | 跳转购买页 | lifetime 用户也保留入口（推测：升级 / 续费其他产品引导） |

## 其他用户态（设计稿可能还有，本节点未含）

| 推测态 | 区分点 | 已读 |
|---|---|---|
| 购买用户 lifetime | 当前节点 `0:4920` | ✅ |
| 购买用户 年付（订阅） | License Expiration Date 显示具体日期 | ❌ 未读 |
| 试用用户 | License Status 显示 "Trial"、License Edition "Trial version"、Expiration "N days left" 或类似 | ❌ 未读 |
| 未登录 / 未授权 | License Status "Unauthorized" + 主 CTA 改为 Authorize | ❌ 未读 |
| 授权过期 | License Status / Expiration 标红 + 主 CTA Renew | ❌ 未读 |

> 若设计稿里有这些态对应的节点 id，可单独缓存后做差异表，避免实现时遗漏分支。

## 图片 / 图标资源（按全局约束未下载）

| 名称 | 用途 | 尺寸 |
|---|---|---|
| `logo_main` | 主 logo（DVDFab 圆形 brand） | 72 × 72 |
| `recordfab`（文字 logo） | "RecordFab" 字样 logo | 114 × 18 |
| `icon_close` | 右上角关闭 X | 16 × 16 |

> 这 3 个资源与之前缓存的弹窗（授权弹窗 `0:6611`、试用弹窗 `0:7754`）中的同名资源**是同一组**，落地时复用即可。

## 不在本节点的内容

- 右上角菜单 icon + 菜单展开列表（含 License Info 项）的设计
- 购买页本身（点 Buy Now 跳转的外部网页）
- 其他用户态的弹窗变体（见上方"其他用户态"表）

## 落地建议

- 弹窗整体规格（圆角 12 / 阴影 / bg #202020 / 内边距 32）与 setting 弹窗外壳 `0:5139` 完全一致，可复用同一壳组件
- 数据字段建议从客户端用户态接口读取后渲染，不要把 "Authorized(...)" 这种拼接字符串直接写死，按 `License Status: ${state}(${email})` 模板化
- Version 字段日期格式 `28/2/2023` 是 d/m/yyyy，对英文界面建议改为 `Feb 28, 2023` 或 `2023-02-28`，与客户端其他地方的日期格式保持一致
- Buy Now 是右对齐到表格右边（距弹窗右 32），不是绝对定位到弹窗右下，落地用 flex `justify-between` 在第二行内排版
