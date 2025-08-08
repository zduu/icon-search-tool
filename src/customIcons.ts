// 自定义图标库 - 第7个图标库
// 在这里添加您的自定义图标

import { type IconData } from './iconData'

// 自定义图标数据 - 您可以在这里添加任何 Iconify 支持的图标
// 注意：避免使用与主图标库重复的图标名称
export const customIcons: IconData[] = [
  // 示例自定义图标 - 使用不重复的图标名称
  { name: 'lucide:cog', category: 'custom', collection: 'custom', tags: ['配置', '项目', 'config', 'project'] },
  { name: 'lucide:file-code', category: 'custom', collection: 'custom', tags: ['文档', 'API', 'docs', 'documentation'] },
  { name: 'lucide:server', category: 'custom', collection: 'custom', tags: ['数据库', '服务器', 'database', 'server'] },
  { name: 'lucide:send', category: 'custom', collection: 'custom', tags: ['部署', '发布', 'deploy', 'release'] },
  { name: 'lucide:pulse', category: 'custom', collection: 'custom', tags: ['监控', '脉冲', 'monitor', 'pulse'] },
  { name: 'lucide:shield-check', category: 'custom', collection: 'custom', tags: ['安全', '保护', 'security', 'protection'] },
  { name: 'lucide:archive', category: 'custom', collection: 'custom', tags: ['备份', '归档', 'backup', 'archive'] },
  { name: 'lucide:git-pull-request', category: 'custom', collection: 'custom', tags: ['工作流', 'PR', 'workflow', 'pull-request'] },
  { name: 'lucide:layers', category: 'custom', collection: 'custom', tags: ['集成', '层级', 'integration', 'layers'] },
  { name: 'lucide:vial', category: 'custom', collection: 'custom', tags: ['测试', '实验', 'testing', 'experiment'] },
  
  // 您可以继续添加更多自定义图标...
  // 格式说明：
  // - name: 图标名称，建议使用 'custom:' 前缀
  // - category: 分类，使用 'custom' 或其他现有分类
  // - collection: 图标库，必须是 'custom'
  // - tags: 搜索标签，支持中英文
  
  // 更多示例：
  { name: 'lucide:user-check', category: 'custom', collection: 'custom', tags: ['用户管理', '验证', 'user', 'management'] },
  { name: 'lucide:search-code', category: 'custom', collection: 'custom', tags: ['日志分析', '代码搜索', 'log', 'analysis'] },
  { name: 'lucide:gauge', category: 'custom', collection: 'custom', tags: ['性能', '仪表', 'performance', 'gauge'] },
  { name: 'lucide:bell-ring', category: 'custom', collection: 'custom', tags: ['通知', '响铃', 'notification', 'alert'] },
  { name: 'lucide:panel-top', category: 'custom', collection: 'custom', tags: ['仪表板', '顶部面板', 'dashboard', 'panel'] },
]

// 自定义图标库信息
export const customIconCollection = {
  id: 'custom',
  name: '自定义图标',
  description: '项目专用的自定义图标库',
  count: customIcons.length
}
