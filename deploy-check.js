#!/usr/bin/env node

/**
 * Cloudflare Pages 部署前检查脚本
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 开始 Cloudflare Pages 部署前检查...\n');

// 检查构建产物
function checkBuildOutput() {
  console.log('📦 检查构建产物...');
  
  const distPath = path.join(__dirname, 'dist');
  const indexPath = path.join(distPath, 'index.html');
  const assetsPath = path.join(distPath, 'assets');
  
  if (!fs.existsSync(distPath)) {
    console.error('❌ dist 目录不存在，请先运行 npm run build');
    return false;
  }
  
  if (!fs.existsSync(indexPath)) {
    console.error('❌ index.html 不存在');
    return false;
  }
  
  if (!fs.existsSync(assetsPath)) {
    console.error('❌ assets 目录不存在');
    return false;
  }
  
  console.log('✅ 构建产物检查通过');
  return true;
}

// 检查HTML内容
function checkHtmlContent() {
  console.log('📄 检查HTML内容...');
  
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  const content = fs.readFileSync(indexPath, 'utf8');
  
  if (!content.includes('图标搜索工具')) {
    console.error('❌ HTML标题未正确设置');
    return false;
  }
  
  if (!content.includes('lang="zh-CN"')) {
    console.error('❌ HTML语言未设置为中文');
    return false;
  }
  
  if (!content.includes('meta name="description"')) {
    console.error('❌ 缺少meta描述');
    return false;
  }
  
  console.log('✅ HTML内容检查通过');
  return true;
}

// 检查文件大小
function checkFileSize() {
  console.log('📊 检查文件大小...');
  
  const assetsPath = path.join(__dirname, 'dist', 'assets');
  const files = fs.readdirSync(assetsPath);
  
  let jsSize = 0;
  let cssSize = 0;
  
  files.forEach(file => {
    const filePath = path.join(assetsPath, file);
    const stats = fs.statSync(filePath);
    
    if (file.endsWith('.js')) {
      jsSize = stats.size;
    } else if (file.endsWith('.css')) {
      cssSize = stats.size;
    }
  });
  
  console.log(`📦 JS文件大小: ${(jsSize / 1024).toFixed(2)} KB`);
  console.log(`🎨 CSS文件大小: ${(cssSize / 1024).toFixed(2)} KB`);
  
  if (jsSize > 500 * 1024) {
    console.warn('⚠️  JS文件较大，可能影响加载速度');
  }
  
  console.log('✅ 文件大小检查通过');
  return true;
}

// 检查配置文件
function checkConfigFiles() {
  console.log('⚙️  检查配置文件...');

  const redirectsPath = path.join(__dirname, 'dist', '_redirects');

  if (!fs.existsSync(redirectsPath)) {
    console.error('❌ dist/_redirects 文件不存在');
    return false;
  }

  const redirectsContent = fs.readFileSync(redirectsPath, 'utf8');
  if (!redirectsContent.includes('/*    /index.html   200')) {
    console.error('❌ _redirects 配置不正确');
    return false;
  }

  console.log('✅ 配置文件检查通过');
  return true;
}

// 主检查函数
function runChecks() {
  const checks = [
    checkBuildOutput,
    checkHtmlContent,
    checkFileSize,
    checkConfigFiles
  ];
  
  let allPassed = true;
  
  for (const check of checks) {
    if (!check()) {
      allPassed = false;
    }
    console.log('');
  }
  
  if (allPassed) {
    console.log('🎉 所有检查通过！项目已准备好部署到 Cloudflare Pages');
    console.log('\n📋 部署步骤:');
    console.log('1. 将代码推送到 GitHub');
    console.log('2. 在 Cloudflare Dashboard 创建 Pages 项目');
    console.log('3. 连接 GitHub 仓库');
    console.log('4. 设置构建命令: npm run build');
    console.log('5. 设置输出目录: dist');
    console.log('6. 部署完成！');
  } else {
    console.log('❌ 检查失败，请修复问题后重新检查');
    process.exit(1);
  }
}

runChecks();
