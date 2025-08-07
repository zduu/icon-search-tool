#!/usr/bin/env node

/**
 * 部署验证脚本
 * 验证部署后的应用是否正常工作
 */

import https from 'https';
import http from 'http';

// 配置
const CONFIG = {
  // 部署的域名（请根据实际情况修改）
  domains: [
    'http://localhost:3000',  // 本地开发
    'http://localhost:4173',  // 本地预览
    // 'https://your-app.pages.dev',  // 生产环境
    // 'https://your-staging.pages.dev',  // 预发布环境
  ],
  
  // 测试的图标 API
  iconApis: [
    'https://api.iconify.design/lucide:home.svg',
    'https://api.iconify.design/heroicons:user.svg',
    'https://api.iconify.design/tabler:search.svg',
    'https://api.iconify.design/feather:heart.svg',
  ],
  
  // 超时时间（毫秒）
  timeout: 10000
};

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function colorLog(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// HTTP 请求函数
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https:') ? https : http;
    const startTime = Date.now();
    
    const req = client.get(url, (res) => {
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          responseTime,
          contentLength: data.length,
          headers: res.headers,
          data: data.substring(0, 200) // 只保留前200个字符
        });
      });
    });
    
    req.on('error', reject);
    req.setTimeout(CONFIG.timeout, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

// 验证应用主页
async function verifyApp(domain) {
  colorLog(`\n🔍 验证应用: ${domain}`, 'blue');
  
  try {
    const result = await makeRequest(domain);
    
    if (result.statusCode === 200) {
      colorLog(`✅ 状态码: ${result.statusCode}`, 'green');
      colorLog(`⏱️ 响应时间: ${result.responseTime}ms`, 'cyan');
      colorLog(`📦 内容大小: ${result.contentLength} bytes`, 'cyan');
      
      // 检查是否包含预期内容
      if (result.data.includes('图标搜索工具') || result.data.includes('icon-search') || result.data.includes('React')) {
        colorLog(`✅ 内容验证通过`, 'green');
      } else {
        colorLog(`⚠️ 内容验证失败，可能不是预期的应用`, 'yellow');
        colorLog(`📄 内容预览: ${result.data.substring(0, 100)}...`, 'cyan');
      }
      
      return true;
    } else {
      colorLog(`❌ 状态码错误: ${result.statusCode}`, 'red');
      return false;
    }
  } catch (error) {
    colorLog(`❌ 请求失败: ${error.message}`, 'red');
    return false;
  }
}

// 验证图标 API
async function verifyIconApi(apiUrl) {
  try {
    const result = await makeRequest(apiUrl);
    
    if (result.statusCode === 200) {
      // 检查是否是 SVG 内容
      if (result.data.includes('<svg') && result.data.includes('</svg>')) {
        colorLog(`✅ ${apiUrl} - SVG 内容正常`, 'green');
        return true;
      } else {
        colorLog(`⚠️ ${apiUrl} - 不是有效的 SVG 内容`, 'yellow');
        return false;
      }
    } else {
      colorLog(`❌ ${apiUrl} - 状态码: ${result.statusCode}`, 'red');
      return false;
    }
  } catch (error) {
    colorLog(`❌ ${apiUrl} - 请求失败: ${error.message}`, 'red');
    return false;
  }
}

// 主验证函数
async function runVerification() {
  colorLog('🚀 开始部署验证...', 'magenta');
  colorLog('='.repeat(50), 'cyan');
  
  let totalTests = 0;
  let passedTests = 0;
  
  // 验证应用
  colorLog('\n📱 验证应用可访问性:', 'blue');
  for (const domain of CONFIG.domains) {
    totalTests++;
    const success = await verifyApp(domain);
    if (success) passedTests++;
  }
  
  // 验证图标 API
  colorLog('\n🎨 验证图标 API:', 'blue');
  for (const apiUrl of CONFIG.iconApis) {
    totalTests++;
    const success = await verifyIconApi(apiUrl);
    if (success) passedTests++;
  }
  
  // 总结
  colorLog('\n' + '='.repeat(50), 'cyan');
  colorLog(`📊 验证结果: ${passedTests}/${totalTests} 通过`, 'magenta');
  
  if (passedTests === totalTests) {
    colorLog('🎉 所有验证通过！应用部署成功！', 'green');
    process.exit(0);
  } else {
    colorLog(`⚠️ 有 ${totalTests - passedTests} 项验证失败，请检查部署状态`, 'yellow');
    process.exit(1);
  }
}

// 显示使用说明
function showUsage() {
  colorLog('\n📖 使用说明:', 'blue');
  colorLog('1. 修改 CONFIG.domains 中的域名为您的实际部署地址', 'cyan');
  colorLog('2. 运行验证: node verify-deployment.js', 'cyan');
  colorLog('3. 查看验证结果', 'cyan');
  colorLog('\n💡 提示:', 'yellow');
  colorLog('- 确保应用已成功部署', 'cyan');
  colorLog('- 确保网络连接正常', 'cyan');
  colorLog('- 如有问题，请检查部署日志', 'cyan');
}

// 运行验证
// 检查是否需要显示帮助
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  showUsage();
  process.exit(0);
}

runVerification().catch(error => {
  colorLog(`💥 验证过程出错: ${error.message}`, 'red');
  process.exit(1);
});

export { verifyApp, verifyIconApi, runVerification };
