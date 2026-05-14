# Figma 节点缓存 — 授权弹窗（默认态）

- 文件 fileKey：`f7bHkVNYG1X14LwsMgkPgx`
- 节点 nodeId：`0:6611`（图层名 `授权-默认态`）
- 来源链接：https://www.figma.com/design/f7bHkVNYG1X14LwsMgkPgx/...?node-id=0-6611
- 读取时间：2026-05-12
- 资源策略：按全局 Figma 约束，不缓存图片远程 URL，也不主动下载
- 触发场景：未登录 / 未授权用户启动 RecordFab，或在客户端内点击需要登录态的入口（如试用次数耗尽、付费状态校验）时弹出
- 关闭：右上角 X 关闭，**不登录**
- 主交互：
  - **Sign in with Google**（一键 Google OAuth）→ 浏览器外跳 Google OAuth
  - **邮箱 + 密码** 输入框 → 输入后点 **Authorize** 走账号密码登录
  - **here.**（蓝字超链）→ 打开注册页
  - **Forgot the Password?**（蓝字超链）→ 打开找回密码页

## 整体尺寸

- 弹窗：**480 × 550**
- 背景：底部还有更大底图节点（`0:6611` 内首个 `<img>` 即整张弹窗背景图），实际外层背景应为 `#202020` 风格的深色卡片，圆角 12（建议复用 setting 弹窗规格）

## 结构

```
授权弹窗-默认态 (480 × 550)
│
├── 顶部 logo 区
│   ├── DVDFab 12 圆形 logo  (72 × 72)        left 40, top 40
│   └── "RecordFab" 文字 logo (114 × 18)       left 124, top 67
│
├── 标题
│   "Authorize this computer with your account."
│   Arial Regular 14 / 20  #eee   left 40, top 130
│
├── Sign in with Google 按钮 (400 × 44)        left 40, top 174
│   ├── 左侧白色 G 图标块 (44 × 44, bg #fff, 边框 2px #475ffb, 左圆角 6)
│   │   └── Google G icon (20 × 20)  内左 12, 内上 12
│   ├── 渐变背景 (linear-gradient 270deg, from #4162fb to #7041fb, 圆角 6)
│   └── 文字 "Sign in with Google"
│       Arial Regular 16 / 24  #fff   居中
│
├── "or" 分隔行 (400 × 20)                      left 40, top 226
│   ├── 左半渐变 1px 线  #595b5f → rgba(89,91,95,0.16) 从右到左
│   ├── "or"  Arial Regular 14 / 20  #595b5f   居中
│   └── 右半渐变 1px 线  rgba(89,91,95,0.16) → #595b5f 从右到左
│
├── E-mail 输入框 (400 × 44, bg #242426, 圆角 6) left 40, top 254
│   ├── 左侧 icon_email (16 × 16)               内左 16, 内上 14
│   └── 占位符 "Enter your E-mail"
│       Arial Regular 14 / 20  #aeb1b6           内左 ~48
│
├── Password 输入框 (400 × 44, bg #242426, 圆角 6) left 40, top 306
│   ├── 左侧 icon_lock (16 × 16)                内左 16, 内上 14
│   ├── 占位符 "Enter your password"
│   │   Arial Regular 14 / 20  #aeb1b6          内左 ~48
│   └── 右侧 icon_eye  (16 × 16)                内右 16, 内上 14
│
├── 主按钮 Authorize (400 × 44, bg #4162fb, 圆角 8) left 40, top 410
│   文字 "Authorize"  Arial Regular 16 / 18  #fff   居中
│
├── 注册引导文案                                 left 109, top 462
│   "Don't have an account? Sign up free "     #7f8288 14 / 20
│   "here."                                     #4162fb 14 / 20（超链）
│
├── 忘记密码                                    left 172, top 490
│   "Forgot the Password?"   #4162fb 14 / 20（超链）
│
└── 右上角关闭 X (16 × 16)   right 20, top 20
```

## 关键样式 token

| 用途 | 值 |
|---|---|
| 弹窗宽 × 高 | 480 × 550 |
| 弹窗左右内边距 | 40 |
| 标题文字 | `#eee`  Arial 14 / 20 |
| 占位符 / 次要文字 | `#aeb1b6`  Arial 14 / 20 |
| 注册文案灰字 | `#7f8288`  Arial 14 / 20 |
| 超链文字 | `#4162fb`  Arial 14 / 20 |
| "or" 分隔灰 | `#595b5f` |
| 输入框 / Google 按钮高度 | 44 |
| 输入框 / Google 按钮宽度 | 400 |
| 输入框圆角 | 6 |
| 输入框背景 | `#242426` |
| 输入框内 icon 尺寸 | 16 × 16，距左 / 距右 16 |
| Google 按钮渐变 | `linear-gradient(270deg, #4162fb 0%, #7041fb 100%)`（参考 from-#7041fb to-#4162fb，方向从右到左） |
| Google 按钮 G 标识块 | 44 × 44，bg `#fff`，边框 2px `#475ffb`，左圆角 6 |
| 主按钮 Authorize | bg `#4162fb`，圆角 8，44 高，文字 #fff Arial 16 / 18 |
| 输入框间距 | 上下两个输入框之间 8 |
| 主按钮与上方密码框间距 | 60（含视觉留白） |
| 主按钮与下方注册行间距 | 8 |
| 注册行与忘记密码间距 | 28 |
| 关闭按钮 X | 16 × 16，右上各 20 |
| DVDFab 圆形 logo | 72 × 72 |
| RecordFab 文字 logo | 114 × 18 |

## 图片 / 图标资源

按全局 Figma 约束未下载，落地时用占位 + 节点名标注：

| 名称 | 用途 | 尺寸 |
|---|---|---|
| `DVDFab 12 Logo` | 顶部圆形 DVDFab 品牌 logo | 72 × 72 |
| `recordfab` | RecordFab 文字 logo（产品名样式） | 114 × 18 |
| `google` | Google G 多色图标 | 20 × 20 |
| `icon_email` | E-mail 输入框左侧 | 16 × 16 |
| `icon_lock` | Password 输入框左侧 | 16 × 16 |
| `icon_eye` | Password 输入框右侧（显示/隐藏密码切换） | 16 × 16 |
| `icon_close_n` | 右上关闭 X | 16 × 16 |

注：`icon_close_n` 与试用弹窗（`0:7754`）的同名 icon 是同一资源，可复用。

## 状态约定（设计稿仅给出默认态，其他态需另外读取）

| 状态 | 区分点 | 已读 |
|---|---|---|
| 默认态 | 当前节点 `0:6611` | ✅ |
| 输入获焦态 | 输入框边框 / 描边变化 | ❌ 未读 |
| 校验错误态（邮箱格式 / 密码错） | 输入框红框 + 错误文案 | ❌ 未读 |
| 提交 loading 态 | Authorize 按钮 spinner | ❌ 未读 |
| 授权成功态 | 关闭弹窗或显示成功提示 | ❌ 未读 |
| 网络异常 / 服务端错误 | 顶部 toast 或行内文案 | ❌ 未读 |

## 不在本节点的内容

- 注册页 / 忘记密码页（弹窗外跳的独立页面）
- Google OAuth 浏览器授权流程的 UI（外部）
- 授权成功后客户端跳转的目标页
- 弹窗背景遮罩层（弹窗外的整屏蒙层）

## 落地建议

- 主按钮 Authorize 与 Google 按钮宽度一致（400），主按钮高度 44 与上面所有输入框/Google 按钮统一
- 注意主按钮圆角 **8**，而 Google 按钮 / 输入框圆角 **6**，按设计稿落地不要统一成同一个值
- Google 按钮左侧 44×44 白色块带 2px `#475ffb` 边框（看上去像"印章"内嵌），落地时不要把边框去掉
- Forgot 行的 top 488–490 区，距离主按钮的距离比注册行更远，是设计稿故意留的视觉层级（注册引导优先，忘记密码次级）
- E-mail / Password 输入框 left/right icon 内边距均为 16，文字 left 内边距 ~48（icon 16 + gap 16 + 留白），落地时保持 48 内边距
