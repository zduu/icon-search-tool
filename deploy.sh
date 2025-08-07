#!/bin/bash

# 图标搜索工具 - Cloudflare Pages 部署脚本
# 使用方法: ./deploy.sh [production|staging|development]

set -e  # 遇到错误立即退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 打印带颜色的消息
print_message() {
    echo -e "${2}${1}${NC}"
}

# 检查环境参数
ENVIRONMENT=${1:-production}

print_message "🚀 开始部署图标搜索工具到 Cloudflare Pages" $BLUE
print_message "📦 目标环境: $ENVIRONMENT" $YELLOW

# 检查必要工具
print_message "🔍 检查必要工具..." $BLUE

if ! command -v node &> /dev/null; then
    print_message "❌ Node.js 未安装，请先安装 Node.js >= 18.0.0" $RED
    exit 1
fi

if ! command -v npm &> /dev/null; then
    print_message "❌ npm 未安装，请先安装 npm" $RED
    exit 1
fi

if ! command -v wrangler &> /dev/null; then
    print_message "❌ Wrangler CLI 未安装，正在安装..." $YELLOW
    npm install -g wrangler
fi

# 检查 Node.js 版本
NODE_VERSION=$(node --version | cut -d'v' -f2)
REQUIRED_VERSION="18.0.0"

if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
    print_message "❌ Node.js 版本过低，当前: $NODE_VERSION，要求: >= $REQUIRED_VERSION" $RED
    exit 1
fi

print_message "✅ Node.js 版本: $NODE_VERSION" $GREEN

# 安装依赖
print_message "📦 安装依赖..." $BLUE
npm install

# 运行测试（如果有）
if [ -f "package.json" ] && grep -q '"test"' package.json; then
    print_message "🧪 运行测试..." $BLUE
    npm test
fi

# 构建项目
print_message "🏗️ 构建项目..." $BLUE
npm run build

# 检查构建结果
if [ ! -d "dist" ]; then
    print_message "❌ 构建失败，dist 目录不存在" $RED
    exit 1
fi

print_message "✅ 构建完成" $GREEN

# 显示构建信息
print_message "📊 构建信息:" $BLUE
echo "构建目录: $(pwd)/dist"
echo "文件列表:"
ls -la dist/

# 计算构建大小
BUILD_SIZE=$(du -sh dist/ | cut -f1)
print_message "📦 构建大小: $BUILD_SIZE" $YELLOW

# 部署前确认
print_message "🤔 即将部署到 Cloudflare Pages ($ENVIRONMENT 环境)" $YELLOW
read -p "确认继续部署? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_message "❌ 部署已取消" $RED
    exit 1
fi

# 部署到 Cloudflare Pages
print_message "🚀 部署到 Cloudflare Pages..." $BLUE

case $ENVIRONMENT in
    production)
        wrangler pages deploy dist --project-name icon-search-tool
        ;;
    staging)
        wrangler pages deploy dist --project-name icon-search-tool-staging
        ;;
    development)
        wrangler pages deploy dist --project-name icon-search-tool-dev
        ;;
    *)
        print_message "❌ 未知环境: $ENVIRONMENT" $RED
        print_message "支持的环境: production, staging, development" $YELLOW
        exit 1
        ;;
esac

print_message "✅ 部署完成!" $GREEN
print_message "🌐 您的应用已部署到 Cloudflare Pages" $BLUE

# 部署后验证
print_message "🔍 部署验证..." $BLUE
print_message "请在浏览器中访问您的应用并测试以下功能:" $YELLOW
echo "1. 🔍 搜索图标功能"
echo "2. 🎨 图标集合过滤"
echo "3. 📋 复制图标链接"
echo "4. ⬇️ 下载图标文件"
echo "5. ❤️ 收藏功能"

print_message "🎉 部署流程完成!" $GREEN
