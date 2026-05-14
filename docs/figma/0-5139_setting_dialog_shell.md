# Figma 节点缓存 — Setting 弹窗外壳

- 文件 fileKey：`f7bHkVNYG1X14LwsMgkPgx`
- 节点 nodeId：`0:5139`（图层名 `设置录制信息-多个`）
- 来源链接：https://www.figma.com/design/f7bHkVNYG1X14LwsMgkPgx/...?node-id=0-5139
- 读取时间：2026-05-12
- 资源策略：按全局 Figma 约束，不缓存图片远程 URL，也不主动下载
- 说明：本节点是 setting 弹窗的**外壳层**（标题栏 / 关闭按钮 / 底部按钮），中间表单内容（preference / proxy 等子页）在更内层的子节点上，本摘要不含表单本体

## 结构

```
设置弹窗外壳 (868 × 634, bg #202020, 圆角 12, 阴影)
├── 顶栏 (h=54, 底部 1px inset shadow #2a2a2c 当分隔线)
│   ├── 标题 "Setting"  Arial 14 / 20 / #eee   左内边距 ~32
│   └── icon_close      右上角 16×16 (内部图形 12×12)
├── 内容区 (上 54、下 ~80 之间, 弹窗中段) ← 由子页填充，本节点不含
└── 底部按钮区 (距下边 ~32, 右对齐)
    ├── 主按钮 OK     88 × 32, bg #4162fb, 圆角 6, 文字 white Arial 14/20
    └── 次按钮 Cancel 88 × 32, 边框 #7f8186, 圆角 6, 文字 #aeb1b6 14/20
        （Figma 文案误写为 "Canel"，落地时按 "Cancel"）
```

## 关键样式 token

| 用途 | 值 |
|---|---|
| 弹窗背景 | `#202020` |
| 弹窗圆角 | 12 |
| 弹窗阴影 | `0 12px 40px 0 rgba(15,16,17,0.2)` |
| 顶栏底部分隔线 | `inset 0 -1px 0 #2a2a2c` |
| 顶栏高度 | 54 |
| 标题文字 | `#eee` Arial 14 / line 20 |
| 关闭按钮区 | 16 × 16（内部图标 12 × 12） |
| 主按钮（OK）背景 | `#4162fb` |
| 主按钮文字 | `#ffffff` |
| 次按钮（Cancel）边框 | `#7f8186` |
| 次按钮文字 | `#aeb1b6` |
| 按钮尺寸 | 88 × 32 |
| 按钮圆角 | 6 |
| 按钮文字 | Arial 14 / line 20 |
| 主次按钮水平间距 | 8 |
| 按钮距弹窗右边距 | ~32 |
| 按钮距弹窗下边距 | ~32 |

## 复用范围

- 这套外壳（标题栏 + 关闭 + 底部 OK/Cancel）是 setting 弹窗所有子页共用
- 子页（preference / proxy / output / 等）只需关心**内容区**的差异

## 关于 checkbox 等子页元素

- 用户特别提示：Figma 设计稿里 **checkbox 内的对勾图标已损坏**，其余正常
- 实现 checkbox 时**直接用标准对勾**（如 lucide `Check`），不要按 Figma 损坏路径还原

## 不在本节点的内容

- preference / proxy / output 等子页的表单内容（输入框、checkbox、下拉、单选组等）
- 弹窗左侧设置项导航（如有）
- 遮罩背景层

## 下一步建议（给用户）

要读取 preference 内容，请在 Figma 里：
1. 双击进入 `设置录制信息-多个` 这个 Frame 内部
2. 选中表单内容区（标题 "Setting" 下方那块包含各项设置的 Frame/Group）
3. 把那个子节点的 node-id 给我，再单独缓存
