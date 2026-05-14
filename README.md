# recordfab-prototype

一个可运行的 Demo 原型（React + TypeScript + Vite），并在同一目录内维护一套可复用的设计资源库（Figma 节点缓存、设计 token、导出图片等）。

## 运行 Demo（Windows）

1) 安装依赖

```bash
npm install
```

2) 启动本地预览

```bash
npm run dev
```

如果你看到报错“找不到某个包/模块”，通常表示 `node_modules/` 不存在或不完整，重新执行 `npm install` 即可恢复。

## 目录结构（资源管理规则）

- `src/`：Demo 代码（页面、组件、状态、mock）
- `public/`：Demo 运行时静态资源（会被直接访问）
  - `public/figma/`：Demo 当前用到的最小子集（svg/png/icon 等）
- `docs/`：说明文档与设计解读
  - `docs/figma/`：Figma 节点缓存（结构、样式 token 摘要、差异对比）
- `resources/`：设计资源库（不默认参与构建，只做复用与沉淀）
  - `resources/figma/tokens/`：Figma token 资源（颜色/字体/间距/组件样式等）
  - `resources/figma/exports/`：Figma 导出资源（全量/备选，不一定被 Demo 使用）

更详细的约定见 [docs/resource-management.md](docs/resource-management.md)。

## 关于 node_modules/

- `node_modules/` 是依赖安装结果（体积大、文件多），不属于“设计资源库”
- 删除它不会丢失源码/文档/资源，但会导致 Demo 暂时无法运行
- 需要运行时，执行 `npm install` 可重新生成
