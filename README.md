# 图标搜索工具 🔍

一个现代化的图标搜索和下载工具，集成了 240+ 精选图标，支持 6 大知名图标库，提供快速、高效的图标搜索体验。

## ✨ 特性

- � **智能搜索**: 实时搜索 240+ 精选图标，支持 Iconify API 扩展搜索
- 🎨 **6大图标库**: 集成 Lucide、Heroicons、Feather、Tabler、Material Design、Phosphor
- 📱 **响应式设计**: 完美适配桌面和移动设备
- � **直接链接**: 每个图标都提供可访问的 CDN 链接
- � **一键下载**: 支持 SVG 格式直接下载
- 🎯 **精准过滤**: 按分类、图标集合等多维度筛选
- ❤️ **收藏功能**: 保存喜欢的图标，方便后续使用
- 🚀 **极速加载**: 基于 Iconify API，全球 CDN 加速

## 🛠️ 技术栈

### 前端
- **React 18** + **TypeScript** - 现代化前端框架
- **Vite** - 快速构建工具
- **Iconify API** - 全球最大的图标库 API

### 部署
- **Cloudflare Pages** - 静态网站托管
- **Cloudflare CDN** - 全球内容分发网络

## 🚀 快速开始

### 📋 前置要求

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0
- **Git**

### 🛠️ 本地开发

1. **克隆项目**
   ```bash
   git clone https://github.com/your-username/icon-search-tool.git
   cd icon-search-tool
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   ```

4. **访问应用**
   打开浏览器访问 `http://localhost:3000`

### 🧪 本地测试

#### 功能测试
```bash
# 启动开发服务器
npm run dev

# 在浏览器中测试以下功能：
# 1. 搜索图标：输入 "home", "user", "mail" 等关键词
# 2. 分类过滤：点击不同的分类按钮
# 3. 图标集合：选择不同的图标库
# 4. 复制链接：点击 "📋 复制链接" 按钮
# 5. 下载图标：点击 "⬇️ 下载" 按钮
# 6. 收藏功能：点击心形按钮
```

#### 构建测试
```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview

# 访问 http://localhost:4173 测试构建版本
```

#### 图标链接测试
```bash
# 测试 Iconify API 连接
curl "https://api.iconify.design/lucide:home.svg"
curl "https://api.iconify.design/heroicons:user.svg"
curl "https://api.iconify.design/tabler:search.svg"

# 应该返回有效的 SVG 内容
```

## 📦 项目结构

```
icon-search-tool/
├── src/                    # 前端源代码
│   ├── App.tsx            # 主应用组件
│   ├── main.tsx           # 应用入口
│   └── index.css          # 全局样式
├── public/                # 静态资源
├── dist/                  # 构建输出目录
├── package.json           # 项目配置
├── vite.config.ts         # Vite 配置
├── tsconfig.json          # TypeScript 配置
├── README.md              # 项目说明
├── USAGE.md               # 使用指南
└── wrangler.toml          # Cloudflare 部署配置
```

## 🔧 配置

### Vite 配置

`vite.config.ts` 已配置：
- 开发服务器端口：3000
- 构建输出目录：dist
- TypeScript 支持
- React 热重载

### 图标数据

应用内置 240+ 精选图标：
- **Lucide**: 50+ 图标
- **Heroicons**: 42+ 图标
- **Feather**: 42+ 图标
- **Tabler**: 42+ 图标
- **Material Design**: 32+ 图标
- **Phosphor**: 32+ 图标

### API 集成

- **Iconify API**: `https://api.iconify.design/{collection}:{name}.svg`
- **搜索 API**: `https://api.iconify.design/search?query={keyword}`
- **全球 CDN**: 自动选择最近的服务器

## 📚 功能特性

### 🔍 智能搜索
- **实时搜索**: 300ms 防抖优化，即时显示结果
- **多源搜索**: 本地图标 + Iconify API 扩展搜索
- **标签匹配**: 支持图标名称和标签搜索
- **模糊匹配**: 智能匹配相关图标

### 🎨 图标管理
- **直接链接**: 每个图标提供可访问的 CDN 链接
- **SVG 下载**: 一键下载高质量矢量图标
- **多种风格**: 6 大图标库，不同设计风格
- **收藏功能**: 本地存储，持久化收藏列表

### ⚡ 性能优化
- **CDN 加速**: 基于 Iconify 全球 CDN
- **懒加载**: 图标按需加载，优化性能
- **缓存策略**: 浏览器缓存 + API 缓存
- **响应式**: 自适应不同设备尺寸

## 🏗️ 构建

### 开发构建
```bash
# 开发模式（热重载）
npm run dev

# 访问 http://localhost:3000
```

### 生产构建
```bash
# 构建生产版本
npm run build

# 构建输出到 dist/ 目录
# 包含优化后的 HTML、CSS、JS 文件
```

### 预览构建
```bash
# 本地预览生产构建
npm run preview

# 访问 http://localhost:4173
```

### 构建验证
```bash
# 检查构建文件
ls -la dist/

# 应该包含：
# - index.html (入口文件)
# - assets/ (CSS、JS、图片等资源)
# - vite.svg (图标文件)
```

## 🚀 Cloudflare 部署

### 方案一：Cloudflare Pages (推荐)

#### 1. 准备工作
```bash
# 安装 Wrangler CLI
npm install -g wrangler

# 登录 Cloudflare
wrangler login
```

#### 2. 构建项目
```bash
# 构建生产版本
npm run build

# 验证构建结果
npm run preview
```

#### 3. 部署到 Pages
```bash
# 直接部署
wrangler pages deploy dist

# 或指定项目名称
wrangler pages deploy dist --project-name icon-search-tool
```

#### 4. 配置自定义域名（可选）
```bash
# 在 Cloudflare Dashboard 中：
# 1. 进入 Pages 项目设置
# 2. 添加自定义域名
# 3. 配置 DNS 记录
```

### 方案二：GitHub + Cloudflare Pages

#### 1. 推送到 GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

#### 2. 连接 Cloudflare Pages
1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 进入 **Pages** 页面
3. 点击 **Create a project**
4. 选择 **Connect to Git**
5. 选择您的 GitHub 仓库

#### 3. 配置构建设置
```yaml
# 构建配置
Build command: npm run build
Build output directory: dist
Root directory: /
Node.js version: 18

# 环境变量（如需要）
NODE_VERSION: 18
```

#### 4. 自动部署
- 每次推送到 main 分支自动触发部署
- 支持预览部署（Pull Request）
- 构建日志和错误追踪

### 方案三：手动上传

#### 1. 构建项目
```bash
npm run build
```

#### 2. 压缩文件
```bash
# 创建部署包
cd dist
zip -r ../icon-search-tool.zip .
cd ..
```

#### 3. 上传到 Cloudflare Pages
1. 登录 Cloudflare Dashboard
2. 进入 Pages 页面
3. 选择 **Upload assets**
4. 上传 `icon-search-tool.zip`

### 🔧 部署配置

创建 `wrangler.toml` 文件：
```toml
name = "icon-search-tool"
compatibility_date = "2024-08-07"

[env.production]
name = "icon-search-tool"

[env.staging]
name = "icon-search-tool-staging"
```

### 📊 部署验证

部署完成后，验证以下功能：

```bash
# 测试部署的应用
curl -I https://your-domain.pages.dev

# 检查图标 API
curl "https://api.iconify.design/lucide:home.svg"

# 验证响应时间
curl -w "@curl-format.txt" -o /dev/null -s https://your-domain.pages.dev
```

### 🌐 域名配置

#### 自定义域名
1. 在 Cloudflare Pages 项目中添加自定义域名
2. 配置 DNS 记录：
   ```
   Type: CNAME
   Name: your-subdomain (或 @)
   Target: your-project.pages.dev
   ```

#### SSL/TLS 配置
- Cloudflare 自动提供 SSL 证书
- 支持 HTTP/2 和 HTTP/3
- 自动 HTTPS 重定向

## 📈 性能监控

### 构建分析
```bash
# 分析构建包大小
npm run build -- --analyze

# 检查依赖大小
npx vite-bundle-analyzer dist
```

### 性能指标
- **首屏加载**: < 2s
- **图标搜索**: < 300ms
- **图标加载**: < 100ms
- **构建大小**: < 500KB

## 🐛 故障排除

### 常见问题

#### 1. 图标不显示
```bash
# 检查网络连接
curl "https://api.iconify.design/lucide:home.svg"

# 检查浏览器控制台错误
# 确保没有 CORS 或网络错误
```

#### 2. 构建失败
```bash
# 清理缓存
rm -rf node_modules package-lock.json
npm install

# 检查 Node.js 版本
node --version  # 应该 >= 18.0.0
```

#### 3. 部署失败
```bash
# 检查构建输出
npm run build
ls -la dist/

# 验证 wrangler 配置
wrangler pages deploy dist --dry-run
```

## 🤝 贡献

欢迎贡献代码！请查看 [USAGE.md](./USAGE.md) 了解详细使用说明。

### 开发流程

1. **Fork 项目**
2. **创建功能分支**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **本地开发测试**
   ```bash
   npm run dev
   npm run build
   npm run preview
   ```
4. **提交更改**
   ```bash
   git commit -m 'Add amazing feature'
   ```
5. **推送并创建 Pull Request**
   ```bash
   git push origin feature/amazing-feature
   ```

### 代码规范
- 使用 TypeScript
- 遵循 React 最佳实践
- 保持代码简洁易读
- 添加必要的注释

## 📄 许可证

本项目采用 MIT 许可证。详见 [LICENSE](./LICENSE) 文件。

## 🙏 致谢

### 图标库
- [Iconify](https://iconify.design) - 全球最大的图标库 API
- [Lucide](https://lucide.dev) - 现代简洁的图标库
- [Heroicons](https://heroicons.com) - Tailwind CSS 团队的图标
- [Feather](https://feathericons.com) - 轻量级线条图标
- [Tabler Icons](https://tabler-icons.io) - 免费开源图标集
- [Material Design Icons](https://fonts.google.com/icons) - Google 官方图标
- [Phosphor Icons](https://phosphoricons.com) - 灵活多样的图标系统

### 技术栈
- [React](https://reactjs.org) - 用户界面库
- [Vite](https://vitejs.dev) - 快速构建工具
- [TypeScript](https://typescriptlang.org) - 类型安全的 JavaScript
- [Cloudflare](https://cloudflare.com) - 全球 CDN 和部署平台

---

## 🚀 快速链接

- **🌐 在线演示**: [https://your-domain.pages.dev](https://your-domain.pages.dev)
- **📖 使用指南**: [USAGE.md](./USAGE.md)
- **🐛 问题反馈**: [GitHub Issues](https://github.com/your-username/icon-search-tool/issues)
- **💬 讨论交流**: [GitHub Discussions](https://github.com/your-username/icon-search-tool/discussions)

⭐ **如果这个项目对您有帮助，请给我们一个星标！**
