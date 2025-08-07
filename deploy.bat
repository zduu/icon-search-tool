@echo off
REM 图标搜索工具 - Cloudflare Pages 部署脚本 (Windows)
REM 使用方法: deploy.bat [production|staging|development]

setlocal enabledelayedexpansion

REM 设置环境参数
set ENVIRONMENT=%1
if "%ENVIRONMENT%"=="" set ENVIRONMENT=production

echo.
echo 🚀 开始部署图标搜索工具到 Cloudflare Pages
echo 📦 目标环境: %ENVIRONMENT%
echo.

REM 检查 Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js 未安装，请先安装 Node.js ^>= 18.0.0
    pause
    exit /b 1
)

REM 检查 npm
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm 未安装，请先安装 npm
    pause
    exit /b 1
)

REM 检查 wrangler
wrangler --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Wrangler CLI 未安装，正在安装...
    npm install -g wrangler
)

echo ✅ 环境检查通过
echo.

REM 安装依赖
echo 📦 安装依赖...
npm install
if errorlevel 1 (
    echo ❌ 依赖安装失败
    pause
    exit /b 1
)

REM 构建项目
echo 🏗️ 构建项目...
npm run build
if errorlevel 1 (
    echo ❌ 构建失败
    pause
    exit /b 1
)

REM 检查构建结果
if not exist "dist" (
    echo ❌ 构建失败，dist 目录不存在
    pause
    exit /b 1
)

echo ✅ 构建完成
echo.

REM 显示构建信息
echo 📊 构建信息:
echo 构建目录: %CD%\dist
echo 文件列表:
dir dist

REM 部署确认
echo.
echo 🤔 即将部署到 Cloudflare Pages (%ENVIRONMENT% 环境)
set /p CONFIRM=确认继续部署? (y/N): 
if /i not "%CONFIRM%"=="y" (
    echo ❌ 部署已取消
    pause
    exit /b 1
)

REM 部署到 Cloudflare Pages
echo.
echo 🚀 部署到 Cloudflare Pages...

if "%ENVIRONMENT%"=="production" (
    wrangler pages deploy dist --project-name icon-search-tool
) else if "%ENVIRONMENT%"=="staging" (
    wrangler pages deploy dist --project-name icon-search-tool-staging
) else if "%ENVIRONMENT%"=="development" (
    wrangler pages deploy dist --project-name icon-search-tool-dev
) else (
    echo ❌ 未知环境: %ENVIRONMENT%
    echo 支持的环境: production, staging, development
    pause
    exit /b 1
)

if errorlevel 1 (
    echo ❌ 部署失败
    pause
    exit /b 1
)

echo.
echo ✅ 部署完成!
echo 🌐 您的应用已部署到 Cloudflare Pages
echo.

REM 部署后验证
echo 🔍 部署验证...
echo 请在浏览器中访问您的应用并测试以下功能:
echo 1. 🔍 搜索图标功能
echo 2. 🎨 图标集合过滤
echo 3. 📋 复制图标链接
echo 4. ⬇️ 下载图标文件
echo 5. ❤️ 收藏功能
echo.
echo 🎉 部署流程完成!

pause
