# 门户网站

## 🛠 技术栈
- Frontend: Vue 3 + TypeScript + Vite + Pinia
- UI Framework: Tailwind CSS
- Build Tool: Vite
- State Management: Pinia
- Router: Vue Router

## 🚀 启动指南 (How to Run)

### 使用 Docker（推荐）

1. 确保 Docker Desktop 已启动。
2. 在根目录执行：`docker compose up --build`
3. 等待容器启动完成...
4. 访问 http://localhost:3000

### 本地开发

1. 安装依赖：
   ```bash
   npm install
   ```

2. 启动开发服务器：
   ```bash
   npm run dev
   ```

3. 构建生产版本：
   ```bash
   npm run build
   ```

4. 预览生产版本：
   ```bash
   npm run preview
   ```

## 🔗 服务地址 (Services)
- Frontend: http://localhost:3000

## 📁 项目结构

```
src/
├── components/          # 公共组件
│   ├── Header.vue      # 头部导航
│   ├── Footer.vue      # 页脚
│   ├── LoadingSpinner.vue  # 加载动画
│   └── ErrorMessage.vue   # 错误提示
├── views/              # 页面组件
│   ├── Home.vue        # 首页
│   ├── About.vue       # 关于我们
│   ├── Services.vue    # 服务
│   └── Contact.vue     # 联系我们
├── stores/             # Pinia 状态管理
│   └── app.ts          # 应用全局状态
├── router/             # 路由配置
│   └── index.ts
├── utils/              # 工具函数
│   └── api.ts          # API 请求封装
├── App.vue             # 根组件
├── main.ts             # 入口文件
└── style.css           # 全局样式
```

## ✨ 特性

- ✅ 现代化 UI 设计，使用 Tailwind CSS
- ✅ 完全响应式布局，支持移动端和桌面端
- ✅ TypeScript 类型安全
- ✅ Pinia 状态管理
- ✅ Vue Router 路由管理
- ✅ 错误处理和加载状态
- ✅ Docker 容器化部署
- ✅ 优雅的交互效果和动画

## 🎨 UI/UX 特性

- 现代未来感设计风格
- 渐变背景和卡片阴影效果
- 流畅的悬停和点击反馈
- 加载状态提示（骨架屏/加载圈）
- 错误提示 Toast 通知
- 语义化 HTML 结构
- 完全响应式布局

## 🐳 Docker 配置

项目使用多阶段构建，减小镜像体积：
- 构建阶段：使用 `node:20-alpine` 进行构建
- 生产阶段：使用 `nginx:alpine` 提供静态文件服务

## 📝 开发规范

- 使用 TypeScript 进行类型检查
- 遵循 Vue 3 Composition API 最佳实践
- 使用 ESLint 进行代码检查
- 遵循 Tailwind CSS 工具类优先原则
