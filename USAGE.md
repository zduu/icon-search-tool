# 图标搜索工具使用指南 🔍

## 🎉 功能特性

### ✨ 完整的图标库
- **240+ 热门图标**：精选常用图标，涵盖各个分类和图标集合
- **Iconify API 集成**：搜索时自动从 100,000+ 图标库中查找
- **6大图标集合**：支持 Lucide、Heroicons、Feather、Tabler、Material Design、Phosphor 等知名图标库
- **实时搜索**：输入关键词即时显示匹配结果

### 🔗 图标链接访问
- **直接链接**：每个图标都有可访问的 CDN 链接
- **SVG 格式**：矢量图标，支持任意缩放
- **复制链接**：一键复制图标 URL 到剪贴板
- **下载功能**：直接下载 SVG 文件到本地

### 🎯 智能搜索
- **中英文支持**：支持中文界面，英文搜索
- **标签匹配**：根据图标标签智能匹配
- **防抖优化**：300ms 延迟，避免频繁请求
- **降级处理**：API 失败时自动使用本地图标

## 🚀 使用方法

### 1. 基础搜索
```
在搜索框中输入关键词：
- "home" - 查找首页相关图标
- "user" - 查找用户相关图标
- "mail" - 查找邮件相关图标
```

### 2. 分类过滤
点击分类按钮快速筛选：
- **通用** - 常用基础图标
- **箭头** - 各种方向箭头
- **通讯** - 邮件、电话等
- **设计** - 编辑、画笔等
- **文件** - 文档、文件夹等
- **社交** - 点赞、分享等

### 3. 图标集合
选择特定的图标库：
- **Lucide** - 现代简洁风格，50+ 图标
- **Heroicons** - Tailwind CSS 官方图标，42+ 图标
- **Feather** - 轻量级线条图标，42+ 图标
- **Tabler** - 免费开源图标集，42+ 图标
- **Material Design** - Google 官方设计图标，32+ 图标
- **Phosphor** - 灵活多样的图标系统，32+ 图标

### 4. 获取图标链接
每个图标卡片提供两种方式：

#### 复制链接
点击 "📋 复制链接" 按钮，图标的 CDN 链接将复制到剪贴板：
```
https://cdn.jsdelivr.net/npm/lucide@latest/icons/home.svg
```

#### 下载文件
点击 "⬇️ 下载" 按钮，直接下载 SVG 文件到本地。

## 🔧 技术实现

### API 集成
- **Iconify API**: `https://api.iconify.design/search?query={keyword}`
- **CDN 链接**: `https://cdn.jsdelivr.net/npm/{package}/icons/{name}.svg`

### 图标格式
所有图标均为 SVG 格式，具有以下优势：
- 矢量图形，无损缩放
- 文件体积小
- 支持 CSS 样式修改
- 兼容性好

### 使用示例

#### HTML 中使用
```html
<img src="https://cdn.jsdelivr.net/npm/lucide@latest/icons/home.svg" alt="Home" width="24" height="24">
```

#### CSS 背景图
```css
.icon-home {
  background-image: url('https://cdn.jsdelivr.net/npm/lucide@latest/icons/home.svg');
  width: 24px;
  height: 24px;
}
```

#### React 组件
```jsx
<img 
  src="https://cdn.jsdelivr.net/npm/lucide@latest/icons/home.svg" 
  alt="Home"
  style={{ width: 24, height: 24 }}
/>
```

## 📱 功能说明

### 收藏功能
- 点击图标右上角的心形按钮收藏图标
- 收藏状态会在页面刷新后保持
- 统计信息显示当前收藏数量

### 响应式设计
- 自适应不同屏幕尺寸
- 移动端友好的触摸操作
- 网格布局自动调整

### 性能优化
- 图标懒加载
- 搜索防抖
- 错误降级处理
- 缓存优化

## 🎨 自定义样式

### 修改图标颜色
SVG 图标支持 CSS 样式修改：
```css
.icon {
  filter: invert(1); /* 反色 */
  filter: hue-rotate(180deg); /* 色相旋转 */
  filter: brightness(0.5); /* 亮度调整 */
}
```

### 修改图标大小
```css
.icon-small { width: 16px; height: 16px; }
.icon-medium { width: 24px; height: 24px; }
.icon-large { width: 32px; height: 32px; }
```

## 🔍 搜索技巧

### 英文关键词
- 使用英文单词搜索效果更好
- 支持模糊匹配
- 可以搜索图标的功能描述

### 标签搜索
每个图标都有相关标签，例如：
- "home" 标签：house, main, start
- "user" 标签：person, profile, account
- "heart" 标签：love, like, favorite

### 组合搜索
- 先选择分类，再输入关键词
- 先选择图标集合，再搜索
- 多重过滤获得精确结果

## 🚀 开发集成

### 在项目中使用
1. 搜索并找到需要的图标
2. 复制图标链接
3. 在代码中引用该链接
4. 根据需要调整样式

### 批量使用
如果需要使用多个同系列图标，建议：
1. 选择统一的图标集合
2. 记录所需图标的名称
3. 使用相同的 CDN 基础路径
4. 保持视觉风格一致

---

🎯 **提示**: 这个工具完全免费使用，所有图标链接都是公开可访问的 CDN 资源，可以直接在生产环境中使用！
