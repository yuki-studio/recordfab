# 资源管理约定（Demo 可运行 + 资源可复用）

目标：

- Demo 原型始终可运行（依赖可重建）
- 设计资源可长期沉淀并复用（不与运行时代码耦合）

## 目录职责

- `src/`：运行时代码
- `public/`：运行时静态资源（被浏览器直接访问）
  - `public/figma/`：Demo 实际使用的最小集合（图标/背景图/svg 等）
- `docs/`：面向人阅读的产品/设计说明
  - `docs/figma/`：Figma 节点缓存（结构、关键样式 token 摘要、与实现差异）
- `resources/`：设计资源库（默认不参与构建，只做复用）
  - `resources/figma/tokens/`：设计 token（颜色/字体/间距/组件样式等，权威来源）
  - `resources/figma/exports/`：设计导出资源（全量/备选）
  - `resources/figma/maps/`：映射与索引（token 来源、导出批次、对应组件/页面）

## 放置规则

- “Demo 要用的资源”放 `public/figma/`
- “将来可能用、但 Demo 暂时不用的资源”放 `resources/figma/exports/`
- “设计规范/结构解读/差异对比”放 `docs/figma/`
- “可复用 token”放 `resources/figma/tokens/`

## 全局 token（权威）

- 权威 token 文件：`resources/figma/tokens/recordfab.tokens.json`
- 来源映射：`resources/figma/maps/tokens.sources.json`

## node_modules 的处理

- `node_modules/` 是依赖安装结果，不需要长期保存到资源库语义里
- 如果磁盘占用过大，可以删除 `node_modules/`；需要运行时再 `npm install` 恢复
