# 🎨 彩色图标搜索工具

一个现代化的图标搜索和下载工具，采用混合架构设计，结合本地硬编码图标和多API渠道实时搜索，**支持 23+ 图标库（包含 13 个彩色图标库）**，提供 1000+ 精选图标，**彩色图标优先显示**。

## ✨ 核心特性

- 🎨 **彩色图标优先**: 13个彩色图标库，包含表情、天气、国旗、加密货币等丰富彩色图标
- 🔍 **智能混合搜索**: 硬编码常用图标 + 多API渠道搜索，彩色优先排序
- 🌈 **23大图标库**: 10个单色库 + 13个彩色库，覆盖各种使用场景
- 📱 **响应式设计**: 完美适配桌面和移动设备，现代化毛玻璃UI
- 🔗 **直接链接**: 每个图标都提供可访问的 CDN 链接
- ⬇️ **一键下载**: 支持 SVG 格式直接下载
- ❤️ **收藏功能**: 保存喜欢的图标，本地存储
- 🎯 **仅彩色模式**: 一键切换只显示彩色图标
- 🚀 **多重保障**: 硬编码图标 + 3个API端点，高可用性设计
- 🌐 **中文优化**: 完全中文界面，支持中文标签搜索
- 🔔 **智能通知**: 自动消失的操作反馈，无需点击确认
- 💼 **专业软件**: 包含 Matlab、SolidWorks、Adobe 等专业软件图标

## 🎯 支持的图标库

### 🖤 单色图标库 (10个)
| 图标库 | 硬编码图标 | API总数 | 特色 |
|--------|------------|---------|------|
| **Lucide** | 56个 ✅ | 1000+ | 现代简洁，线条流畅 |
| **Heroicons** | 48个 ✅ | 1000+ | Tailwind CSS 官方，简洁现代 |
| **Feather** | 48个 ✅ | 300+ | 轻量级线条，极简设计 |
| **Tabler** | 64个 ✅ | 3000+ | 开源全面，覆盖面广 |
| **Material Design** | 72个 ✅ | 2000+ | Google 官方，扁平化设计 |
| **Phosphor** | 64个 ✅ | 1000+ | 灵活多样，表现力强 |
| **Carbon** | 64个 ✅ | 2000+ | IBM设计系统，企业级 |
| **Mingcute** | 56个 ✅ | 2000+ | 精美线条，视觉优雅 |
| **Solar** | 56个 ✅ | 1000+ | 现代化设计，时尚前卫 |
| **MDI** | 64个 ✅ | 7000+ | 社区版Material，数量庞大 |

### 🎨 彩色图标库 (13个) - **新增特色**
| 图标库 | 硬编码图标 | API总数 | 特色 |
|--------|------------|---------|------|
| **Fluent Emoji 扁平** | 40个 🎨 | 1000+ | Microsoft 彩色表情，扁平风格 |
| **Fluent Emoji** | 24个 🎨 | 1000+ | Microsoft 3D 表情图标 |
| **扁平彩色图标** | 27个 🎨 | 329个 | 多彩扁平设计，功能图标 |
| **OpenMoji** | 24个 🎨 | 4000+ | 开源彩色表情符号 |
| **Twemoji** | 24个 🎨 | 3000+ | Twitter 彩色表情 |
| **Noto Emoji** | 20个 🎨 | 3000+ | Google 彩色表情 |
| **EmojiOne** | 16个 🎨 | 2000+ | JoyPixels 彩色表情 |
| **加密货币彩色** | 30个 🎨 | 483个 | 比特币、以太坊等加密货币 |
| **Web3 品牌** | 20个 🎨 | 100+ | Web3 品牌彩色图标 |
| **天气彩色** | 28个 🎨 | 447个 | 彩色天气图标，动态效果 |
| **圆形国旗** | 30个 🎨 | 250+ | 圆形国旗彩色图标 |
| **矩形国旗** | 20个 🎨 | 250+ | 矩形国旗彩色图标 |
| **Flagpack** | 20个 🎨 | 200+ | Yummygum 国旗图标 |

### 🏢 专业软件图标库 (1个)
| 图标库 | 硬编码图标 | API总数 | 特色 |
|--------|------------|---------|------|
| **自定义软件** | 11个 ✅ | 11个 | 专业软件图标，工程设计 |

### 📊 图标统计
- **硬编码图标总数**: 1000+ 个 (其中 400+ 彩色图标)
- **API可访问图标**: 200,000+ 个 (其中 50,000+ 彩色图标)
- **彩色图标库**: 13 个专门的彩色图标库
- **专业软件图标**: Matlab、SolidWorks、AutoCAD、Adobe系列等
- **即时响应**: 所有硬编码图标无需网络，秒级加载
- **彩色优先**: 搜索结果自动优先显示彩色图标

### 🏗️ 混合架构优势

- **硬编码图标**: 每个图标库都有精选常用图标，硬编码存储，秒级响应
- **彩色优先策略**: 搜索时优先分配 70% 额度给彩色图标库，30% 给单色图标库
- **多API渠道**: 3个API端点 (api.iconify.design, api.simplesvg.com, api.unisvg.com) 提供冗余保障
- **智能搜索**: 并行搜索彩色和单色图标库，彩色结果优先排序
- **高可用性**: 硬编码图标离线可用，API失败时自动降级到硬编码结果
- **负载均衡**: 随机选择API端点，分散请求负载
- **容错机制**: 单个API失败时自动切换到备用API
- **仅彩色模式**: 一键切换只显示彩色图标，提升彩色图标覆盖率

## 📂 图标分类

### 🎨 彩色图标分类
- **表情符号**: 😀 各种表情、手势、人物等彩色表情图标
- **天气图标**: 🌤️ 晴天、雨天、雪天、彩虹等彩色天气图标
- **国旗图标**: 🇺🇸 世界各国国旗，圆形和矩形两种风格
- **加密货币**: ₿ 比特币、以太坊、USDT 等加密货币彩色图标
- **Web3 品牌**: 🌐 区块链、DeFi 相关品牌彩色图标
- **功能彩色**: 🎯 彩色的功能性图标，如文件、设置、通知等

### 🖤 单色图标分类
- **软件工具**: SolidWorks、AutoCAD、Adobe、VS Code、Figma 等
- **教育学习**: 包含上海交通大学相关标签，学习、研究、实验等
- **运动健身**: 足球、篮球、游泳、瑜伽、健身等
- **食物饮品**: 咖啡、披萨、水果、饮料等
- **旅行出行**: 飞机、酒店、护照、地图等
- **娱乐休闲**: 游戏、音乐、电影、摄影等
- **商务办公**: 会议、图表、合同、财务等
- **科学研究**: 实验、显微镜、DNA、化学等

## 🚀 快速开始

### 本地运行

```bash
# 克隆项目
git clone https://github.com/zduu/icon-search-tool.git
cd icon-search-tool

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

### 构建部署

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

### Cloudflare Pages 部署

本项目已优化支持 Cloudflare Pages 部署：

#### 自动部署
1. Fork 本项目到您的 GitHub
2. 在 Cloudflare Dashboard 中创建新的 Pages 项目
3. 连接您的 GitHub 仓库
4. 设置构建配置：
   - **构建命令**: `npm run build`
   - **构建输出目录**: `dist`
   - **Node.js 版本**: `18` 或更高

#### 手动部署
```bash
# 构建项目
npm run build

# 上传 dist 目录到 Cloudflare Pages
```

#### 部署验证清单
- ✅ 静态资源构建正常
- ✅ 路由配置正确 (SPA)
- ✅ API 请求支持 CORS
- ✅ 硬编码图标离线可用
- ✅ 响应式设计适配
- ✅ 中文字体显示正常

## 🎯 使用方法

### 🔍 搜索图标
- 在搜索框输入关键词：`home`, `user`, `mail`, `play`, `bitcoin`, `weather` 等
- 支持英文关键词和标签搜索
- **彩色优先**: 搜索结果自动优先显示彩色图标
- **仅彩色模式**: 勾选"仅显示彩色"只显示彩色图标

### 🎨 过滤图标
- **按分类**: 软件、教育、运动、食物、旅行、娱乐、商务、科学等
- **按图标库**: 选择特定的图标集合（单色或彩色）
- **彩色筛选**: 使用"仅显示彩色"快速筛选彩色图标

### 📥 获取图标
- **复制链接**: 点击 "� 复制" 获取 CDN 地址
- **下载文件**: 点击 "📥 下载" 保存 SVG 文件
- **收藏图标**: 点击 ❤️ 按钮收藏常用图标
- **彩色标识**: 彩色图标有 🎨 标识和渐变边框

### 自定义图标库
- **第7个图标库**: 与其他6个图标库平等，可通过筛选器选择
- **代码配置**: 在 `src/customIcons.ts` 中手动添加图标
- **完全自定义**: 支持任何 Iconify 格式的图标
- **分类支持**: 可使用现有分类或创建新分类

#### 添加自定义图标示例
```typescript
// 在 src/customIcons.ts 中添加
export const customIcons: IconData[] = [
  {
    name: 'lucide:settings-2',  // 使用任何 Iconify 支持的图标
    category: 'custom',         // 分类
    collection: 'custom',       // 必须是 'custom'
    tags: ['配置', '设置', 'config', 'settings']  // 搜索标签
  },
  {
    name: 'heroicons:cog-6-tooth',
    category: 'custom',
    collection: 'custom',
    tags: ['齿轮', '配置', 'gear', 'config']
  },
  // 添加更多图标...
]
```

**注意**:
- `name` 必须是 Iconify 支持的真实图标名称
- `collection` 必须设置为 `'custom'`
- 可以使用任何现有分类或创建新分类
- 支持中英文搜索标签

### 图标链接格式
```
# 单色图标
https://api.iconify.design/lucide:home.svg
https://api.iconify.design/heroicons:user.svg
https://api.iconify.design/tabler:search.svg

# 彩色图标
https://api.iconify.design/fluent-emoji-flat:grinning-face.svg
https://api.iconify.design/flat-color-icons:home.svg
https://api.iconify.design/cryptocurrency-color:btc.svg
https://api.iconify.design/meteocons:clear-day.svg
https://api.iconify.design/circle-flags:us.svg
```

## �️ 技术栈

- **React 18** + **TypeScript** - 现代化前端框架
- **Vite** - 快速构建工具，热重载支持
- **Iconify API** - 全球最大的图标库 API

## 🔧 技术架构

### 混合架构设计
- **硬编码优先**: 每个图标库硬编码精选常用图标，本地存储，秒级响应
- **彩色优先策略**: 搜索时优先分配 70% 额度给彩色图标库
- **多API补充**: 通过3个API端点扩展完整图标库，高可用性保障
- **智能搜索**: 硬编码搜索 + 多API搜索，彩色结果优先排序
- **容错降级**: 硬编码图标离线可用，API失败时自动降级

### 核心功能
- **彩色优先搜索**: 并行搜索彩色和单色图标库，彩色结果优先显示
- **仅彩色模式**: 一键切换只显示彩色图标，提升彩色覆盖率
- **图标库管理**: 23个图标库独立管理，支持按库浏览
- **多维搜索**: 支持关键词、标签、图标名称、中文搜索
- **防抖优化**: 500ms 搜索防抖，减少API调用
- **错误处理**: 完善的错误处理和多重降级策略
- **智能通知**: 自动消失的操作反馈，提升用户体验
- **彩色标识**: 自动识别和标记彩色图标，视觉区分明显

### 多API架构
```
主要API: https://api.iconify.design
备用API1: https://api.simplesvg.com
备用API2: https://api.unisvg.com

搜索: /search?query={keyword}&prefix={collection}
图标: /{collection}:{icon-name}.svg
```

### 性能优化
- **硬编码缓存**: 1000+常用图标硬编码存储，秒级响应
- **彩色优先加载**: 优先加载彩色图标，提升视觉体验
- **智能加载**: 按需加载，优先硬编码后API
- **浏览器缓存**: 图标资源自动缓存，减少重复请求
- **响应式设计**: 完美适配各种设备尺寸，搜索框自适应
- **负载均衡**: 随机选择API端点，分散请求负载
- **失效图标移除**: 加载失败的图标自动从UI中移除


## 🙏 致谢

感谢以下优秀的开源项目：

**图标库 API**
- [Iconify](https://iconify.design) - 全球最大的图标库 API，200,000+ 图标

**单色图标库**
- [Lucide](https://lucide.dev) - 现代简洁的图标库
- [Heroicons](https://heroicons.com) - Tailwind CSS 团队的图标
- [Feather](https://feathericons.com) - 轻量级线条图标
- [Tabler Icons](https://tabler-icons.io) - 免费开源图标集
- [Material Design Icons](https://fonts.google.com/icons) - Google 官方图标
- [Phosphor Icons](https://phosphoricons.com) - 灵活多样的图标系统

**彩色图标库**
- [Fluent Emoji](https://github.com/microsoft/fluentui-emoji) - Microsoft 彩色表情图标
- [Flat Color Icons](https://icons8.com/icons/color) - 扁平彩色功能图标
- [OpenMoji](https://openmoji.org) - 开源彩色表情符号
- [Twemoji](https://twemoji.twitter.com) - Twitter 彩色表情
- [Cryptocurrency Icons](https://cryptoicons.co) - 加密货币彩色图标
- [Circle Flags](https://github.com/HatScripts/circle-flags) - 圆形国旗图标

---

⭐ **如果这个项目对您有帮助，请给我一个星标！**
