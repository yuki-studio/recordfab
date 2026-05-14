# Figma Tokens（设计资源）

这里用于存放从 Figma 或设计系统导出的 token（颜色/字体/间距/圆角/阴影/组件样式等），用于后续新功能迭代时复用。

本项目里：

- `docs/figma/` 是“节点缓存文档”（面向人阅读），会包含 token 摘要，但它是按页面/弹窗分散记录的快照
- `resources/figma/tokens/` 是“可复用的全局 token 源文件”（面向复用/结构化），作为长期维护的权威来源

当前权威 token 文件：`resources/figma/tokens/recordfab.tokens.json`。

建议约定：

- 单次导出放到独立文件（例如 `tokens.2026-05-12.json`）
- 如果有多个来源（不同 fileKey / 不同团队），按子目录区分
- 保留导出来源信息（fileKey、导出时间、导出方式），写在同目录下的一个 `manifest.json`（后续需要时再补）

注意：

- 这里的 token 属于“设计资源”，不等同于环境变量或鉴权 token
