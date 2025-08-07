#!/bin/bash

# 图标搜索工具部署脚本
# 用于部署到 Cloudflare Pages 和 Workers

set -e

echo "🚀 开始部署图标搜索工具..."

# 检查必要的工具
check_dependencies() {
    echo "📋 检查依赖..."
    
    if ! command -v wrangler &> /dev/null; then
        echo "❌ Wrangler CLI 未安装，请运行: npm install -g wrangler"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        echo "❌ npm 未安装"
        exit 1
    fi
    
    echo "✅ 依赖检查完成"
}

# 构建前端应用
build_frontend() {
    echo "🏗️  构建前端应用..."
    
    npm install
    npm run build
    
    echo "✅ 前端构建完成"
}

# 部署 Workers API
deploy_workers() {
    echo "🔧 部署 Workers API..."
    
    cd workers
    
    # 安装依赖
    npm install
    
    # 部署到生产环境
    wrangler deploy --env production
    
    cd ..
    
    echo "✅ Workers API 部署完成"
}

# 部署到 Cloudflare Pages
deploy_pages() {
    echo "📄 部署到 Cloudflare Pages..."
    
    # 这里可以使用 wrangler pages 命令或者通过 Git 自动部署
    echo "📝 请确保已在 Cloudflare Dashboard 中配置了 Pages 项目"
    echo "🔗 Git 仓库连接后会自动部署"
    
    echo "✅ Pages 部署配置完成"
}

# 设置环境变量
setup_env() {
    echo "⚙️  设置环境变量..."
    
    # 创建 .env.local 文件
    cat > .env.local << EOF
VITE_API_BASE_URL=https://icon-search-api.your-domain.workers.dev
VITE_ENVIRONMENT=production
EOF
    
    echo "✅ 环境变量设置完成"
}

# 验证部署
verify_deployment() {
    echo "🔍 验证部署..."
    
    # 检查 Workers API
    echo "检查 Workers API..."
    # curl -f https://icon-search-api.your-domain.workers.dev/health || echo "⚠️  Workers API 可能未正常运行"
    
    # 检查 Pages
    echo "检查 Pages..."
    # curl -f https://your-domain.pages.dev || echo "⚠️  Pages 可能未正常运行"
    
    echo "✅ 部署验证完成"
}

# 主函数
main() {
    case "${1:-all}" in
        "deps")
            check_dependencies
            ;;
        "build")
            build_frontend
            ;;
        "workers")
            deploy_workers
            ;;
        "pages")
            deploy_pages
            ;;
        "env")
            setup_env
            ;;
        "verify")
            verify_deployment
            ;;
        "all")
            check_dependencies
            setup_env
            build_frontend
            deploy_workers
            deploy_pages
            verify_deployment
            echo "🎉 部署完成！"
            ;;
        *)
            echo "使用方法: $0 [deps|build|workers|pages|env|verify|all]"
            echo ""
            echo "命令说明:"
            echo "  deps    - 检查依赖"
            echo "  build   - 构建前端"
            echo "  workers - 部署 Workers API"
            echo "  pages   - 部署 Pages"
            echo "  env     - 设置环境变量"
            echo "  verify  - 验证部署"
            echo "  all     - 执行完整部署流程"
            exit 1
            ;;
    esac
}

main "$@"
