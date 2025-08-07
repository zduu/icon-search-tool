# 图标搜索工具部署指南

本指南将帮助您将图标搜索工具部署到 Cloudflare Pages 和 Workers。

## 前置要求

1. **Cloudflare 账户**
   - 注册 [Cloudflare](https://cloudflare.com) 账户
   - 确保账户已验证

2. **Wrangler CLI**
   ```bash
   npm install -g wrangler
   wrangler login
   ```

3. **Node.js 和 npm**
   - Node.js 18+ 
   - npm 或 yarn

## 部署步骤

### 1. 设置 Cloudflare KV 存储

```bash
# 进入 workers 目录
cd workers

# 创建 KV 命名空间
wrangler kv:namespace create ICON_CACHE
wrangler kv:namespace create ICON_CACHE --preview

# 记录输出的 ID，更新 wrangler.toml
```

更新 `workers/wrangler.toml` 中的 KV 配置：

```toml
[[kv_namespaces]]
binding = "ICON_CACHE"
id = "your-production-kv-id"
preview_id = "your-preview-kv-id"
```

### 2. 部署 Workers API

```bash
# 在 workers 目录中
npm install

# 部署到生产环境
wrangler deploy --env production

# 记录 Workers URL，例如：
# https://icon-search-api.your-subdomain.workers.dev
```

### 3. 配置前端环境变量

创建 `.env.local` 文件：

```env
VITE_API_BASE_URL=https://icon-search-api.your-subdomain.workers.dev
VITE_ENVIRONMENT=production
```

### 4. 构建前端应用

```bash
# 在项目根目录
npm install
npm run build
```

### 5. 部署到 Cloudflare Pages

#### 方法 1: 通过 Git 自动部署（推荐）

1. 将代码推送到 GitHub/GitLab
2. 在 Cloudflare Dashboard 中：
   - 进入 Pages
   - 点击 "Create a project"
   - 连接 Git 仓库
   - 配置构建设置：
     - 构建命令: `npm run build`
     - 构建输出目录: `dist`
     - 环境变量: 添加 `VITE_API_BASE_URL`

#### 方法 2: 使用 Wrangler CLI

```bash
# 创建 Pages 项目
wrangler pages project create icon-search-tool

# 部署
wrangler pages deploy dist --project-name icon-search-tool
```

### 6. 配置自定义域名（可选）

1. 在 Cloudflare Dashboard 中添加域名
2. 在 Pages 项目中设置自定义域名
3. 更新 DNS 记录

## 环境配置

### 生产环境变量

在 Cloudflare Pages 中设置以下环境变量：

```
VITE_API_BASE_URL=https://icon-search-api.your-domain.workers.dev
VITE_ENVIRONMENT=production
```

### Workers 环境变量

在 `workers/wrangler.toml` 中配置：

```toml
[vars]
ENVIRONMENT = "production"
```

## 监控和维护

### 1. 查看日志

```bash
# Workers 日志
wrangler tail

# Pages 部署日志
# 在 Cloudflare Dashboard 中查看
```

### 2. 更新部署

```bash
# 更新 Workers
cd workers
wrangler deploy

# 更新 Pages（如果使用 Git 自动部署）
git push origin main
```

### 3. KV 数据管理

```bash
# 查看 KV 数据
wrangler kv:key list --binding ICON_CACHE

# 备份 KV 数据
node scripts/setup-kv.js backup

# 清理缓存
node scripts/setup-kv.js cleanup
```

## 性能优化

### 1. CDN 缓存

Cloudflare 自动提供全球 CDN 缓存，无需额外配置。

### 2. KV 缓存策略

- 图标数据缓存 1 小时
- 搜索结果缓存 5 分钟
- 热门图标缓存 30 分钟

### 3. 图像优化

使用 Cloudflare Images 或 Workers 进行图像格式转换和优化。

## 故障排除

### 常见问题

1. **Workers 部署失败**
   - 检查 wrangler.toml 配置
   - 确认 KV 命名空间 ID 正确

2. **Pages 构建失败**
   - 检查环境变量设置
   - 确认 Node.js 版本兼容性

3. **API 调用失败**
   - 检查 CORS 配置
   - 确认 Workers URL 正确

### 调试命令

```bash
# 本地开发 Workers
wrangler dev

# 本地开发前端
npm run dev

# 检查 Workers 健康状态
curl https://your-workers-url.workers.dev/health
```

## 安全考虑

1. **API 速率限制**
   - Workers 自带基本速率限制
   - 可在代码中添加自定义限制

2. **CORS 配置**
   - 仅允许特定域名访问 API
   - 在生产环境中更新 CORS 设置

3. **环境变量**
   - 不要在代码中硬编码敏感信息
   - 使用 Cloudflare 的环境变量管理

## 成本估算

- **Cloudflare Pages**: 免费（包含自定义域名和 SSL）
- **Cloudflare Workers**: 免费额度 100,000 请求/天
- **Cloudflare KV**: 免费额度 100,000 读取/天，1,000 写入/天

对于大多数用例，免费额度已经足够。

## 支持

如果遇到问题，请查看：
- [Cloudflare Workers 文档](https://developers.cloudflare.com/workers/)
- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [项目 GitHub Issues](https://github.com/your-repo/issues)
