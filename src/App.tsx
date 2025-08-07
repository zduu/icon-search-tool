import { useState, useEffect } from 'react'

// 图标数据接口
interface Icon {
  id: string
  name: string
  category: string
  collection: string
  svg: string
  url: string
  downloadUrl: string
  tags: string[]
}

// 图标集合配置 - 使用 Iconify API
const iconCollections = [
  { id: 'lucide', name: 'Lucide', prefix: 'lucide' },
  { id: 'heroicons', name: 'Heroicons', prefix: 'heroicons' },
  { id: 'feather', name: 'Feather', prefix: 'feather' },
  { id: 'tabler', name: 'Tabler', prefix: 'tabler' },
  { id: 'material', name: 'Material Design', prefix: 'material-symbols' },
  { id: 'phosphor', name: 'Phosphor', prefix: 'ph' }
]

// 分类中文映射
const categoryNames: { [key: string]: string } = {
  'all': '全部',
  'general': '通用',
  'arrows': '箭头',
  'communication': '通讯',
  'design': '设计',
  'development': '开发',
  'devices': '设备',
  'files': '文件',
  'finance': '金融',
  'health': '健康',
  'maps': '地图',
  'media': '媒体',
  'nature': '自然',
  'people': '人物',
  'security': '安全',
  'shopping': '购物',
  'social': '社交',
  'system': '系统',
  'text': '文本',
  'transport': '交通',
  'weather': '天气'
}

// 热门图标数据 - 使用 Iconify 格式
const popularIcons = [
  { name: 'lucide:home', category: 'general', collection: 'lucide', tags: ['house', 'main', 'start'] },
  { name: 'lucide:search', category: 'general', collection: 'lucide', tags: ['find', 'look', 'magnify'] },
  { name: 'lucide:user', category: 'people', collection: 'lucide', tags: ['person', 'profile', 'account'] },
  { name: 'lucide:settings', category: 'system', collection: 'lucide', tags: ['config', 'gear', 'options'] },
  { name: 'lucide:heart', category: 'social', collection: 'lucide', tags: ['love', 'like', 'favorite'] },
  { name: 'lucide:star', category: 'social', collection: 'lucide', tags: ['rating', 'favorite', 'bookmark'] },
  { name: 'lucide:mail', category: 'communication', collection: 'lucide', tags: ['email', 'message', 'envelope'] },
  { name: 'lucide:phone', category: 'communication', collection: 'lucide', tags: ['call', 'telephone', 'mobile'] },
  { name: 'lucide:download', category: 'arrows', collection: 'lucide', tags: ['save', 'export', 'get'] },
  { name: 'lucide:upload', category: 'arrows', collection: 'lucide', tags: ['import', 'send', 'put'] },
  { name: 'lucide:edit', category: 'design', collection: 'lucide', tags: ['pencil', 'modify', 'change'] },
  { name: 'lucide:trash-2', category: 'general', collection: 'lucide', tags: ['delete', 'remove', 'bin'] },
  { name: 'lucide:copy', category: 'files', collection: 'lucide', tags: ['duplicate', 'clone', 'paste'] },
  { name: 'lucide:share-2', category: 'social', collection: 'lucide', tags: ['send', 'distribute', 'export'] },
  { name: 'lucide:lock', category: 'security', collection: 'lucide', tags: ['secure', 'private', 'protected'] },
  { name: 'lucide:unlock', category: 'security', collection: 'lucide', tags: ['open', 'access', 'public'] },
  { name: 'lucide:eye', category: 'general', collection: 'lucide', tags: ['view', 'see', 'visible'] },
  { name: 'lucide:eye-off', category: 'general', collection: 'lucide', tags: ['hide', 'invisible', 'hidden'] },
  { name: 'lucide:check', category: 'general', collection: 'lucide', tags: ['done', 'complete', 'success'] },
  { name: 'lucide:x', category: 'general', collection: 'lucide', tags: ['close', 'cancel', 'remove'] },
  { name: 'lucide:plus', category: 'general', collection: 'lucide', tags: ['add', 'create', 'new'] },
  { name: 'lucide:minus', category: 'general', collection: 'lucide', tags: ['subtract', 'remove', 'less'] },
  { name: 'lucide:arrow-right', category: 'arrows', collection: 'lucide', tags: ['next', 'forward', 'continue'] },
  { name: 'lucide:arrow-left', category: 'arrows', collection: 'lucide', tags: ['back', 'previous', 'return'] },
  { name: 'lucide:arrow-up', category: 'arrows', collection: 'lucide', tags: ['top', 'increase', 'rise'] },
  { name: 'lucide:arrow-down', category: 'arrows', collection: 'lucide', tags: ['bottom', 'decrease', 'fall'] },
  { name: 'lucide:menu', category: 'general', collection: 'lucide', tags: ['hamburger', 'navigation', 'list'] },
  { name: 'lucide:more-horizontal', category: 'general', collection: 'lucide', tags: ['options', 'dots', 'menu'] },
  { name: 'lucide:more-vertical', category: 'general', collection: 'lucide', tags: ['options', 'dots', 'menu'] },
  { name: 'lucide:calendar', category: 'general', collection: 'lucide', tags: ['date', 'schedule', 'time'] },
  { name: 'lucide:clock', category: 'general', collection: 'lucide', tags: ['time', 'schedule', 'hour'] },
  { name: 'lucide:bell', category: 'communication', collection: 'lucide', tags: ['notification', 'alert', 'ring'] },
  { name: 'lucide:bookmark', category: 'general', collection: 'lucide', tags: ['save', 'mark', 'favorite'] },
  { name: 'lucide:flag', category: 'general', collection: 'lucide', tags: ['mark', 'report', 'country'] },
  { name: 'lucide:folder', category: 'files', collection: 'lucide', tags: ['directory', 'storage', 'organize'] },
  { name: 'lucide:file', category: 'files', collection: 'lucide', tags: ['document', 'paper', 'text'] },
  { name: 'lucide:image', category: 'media', collection: 'lucide', tags: ['picture', 'photo', 'graphic'] },
  { name: 'lucide:video', category: 'media', collection: 'lucide', tags: ['movie', 'film', 'play'] },
  { name: 'lucide:music', category: 'media', collection: 'lucide', tags: ['audio', 'sound', 'song'] },
  { name: 'lucide:camera', category: 'media', collection: 'lucide', tags: ['photo', 'picture', 'capture'] },
  { name: 'lucide:wifi', category: 'devices', collection: 'lucide', tags: ['internet', 'connection', 'network'] },
  { name: 'lucide:bluetooth', category: 'devices', collection: 'lucide', tags: ['wireless', 'connection', 'pair'] },
  { name: 'lucide:battery', category: 'devices', collection: 'lucide', tags: ['power', 'charge', 'energy'] },
  { name: 'lucide:globe', category: 'general', collection: 'lucide', tags: ['world', 'earth', 'international'] },
  { name: 'lucide:map-pin', category: 'maps', collection: 'lucide', tags: ['location', 'place', 'marker'] },
  { name: 'lucide:navigation', category: 'maps', collection: 'lucide', tags: ['compass', 'direction', 'guide'] },
  { name: 'lucide:car', category: 'transport', collection: 'lucide', tags: ['vehicle', 'auto', 'drive'] },
  { name: 'lucide:plane', category: 'transport', collection: 'lucide', tags: ['airplane', 'flight', 'travel'] },
  { name: 'lucide:train', category: 'transport', collection: 'lucide', tags: ['railway', 'metro', 'subway'] },

  // Heroicons 图标 (40+ 图标)
  { name: 'heroicons:home', category: 'general', collection: 'heroicons', tags: ['house', 'main', 'start'] },
  { name: 'heroicons:user', category: 'people', collection: 'heroicons', tags: ['person', 'profile', 'account'] },
  { name: 'heroicons:magnifying-glass', category: 'general', collection: 'heroicons', tags: ['search', 'find', 'look'] },
  { name: 'heroicons:cog-6-tooth', category: 'system', collection: 'heroicons', tags: ['settings', 'config', 'gear'] },
  { name: 'heroicons:heart', category: 'social', collection: 'heroicons', tags: ['love', 'like', 'favorite'] },
  { name: 'heroicons:star', category: 'social', collection: 'heroicons', tags: ['rating', 'favorite', 'bookmark'] },
  { name: 'heroicons:envelope', category: 'communication', collection: 'heroicons', tags: ['mail', 'email', 'message'] },
  { name: 'heroicons:phone', category: 'communication', collection: 'heroicons', tags: ['call', 'telephone', 'mobile'] },
  { name: 'heroicons:arrow-down-tray', category: 'arrows', collection: 'heroicons', tags: ['download', 'save', 'export'] },
  { name: 'heroicons:arrow-up-tray', category: 'arrows', collection: 'heroicons', tags: ['upload', 'import', 'send'] },
  { name: 'heroicons:pencil', category: 'design', collection: 'heroicons', tags: ['edit', 'modify', 'write'] },
  { name: 'heroicons:trash', category: 'general', collection: 'heroicons', tags: ['delete', 'remove', 'bin'] },
  { name: 'heroicons:document-duplicate', category: 'files', collection: 'heroicons', tags: ['copy', 'duplicate', 'clone'] },
  { name: 'heroicons:share', category: 'social', collection: 'heroicons', tags: ['send', 'distribute', 'export'] },
  { name: 'heroicons:lock-closed', category: 'security', collection: 'heroicons', tags: ['secure', 'private', 'protected'] },
  { name: 'heroicons:lock-open', category: 'security', collection: 'heroicons', tags: ['unlock', 'open', 'access'] },
  { name: 'heroicons:eye', category: 'general', collection: 'heroicons', tags: ['view', 'see', 'visible'] },
  { name: 'heroicons:eye-slash', category: 'general', collection: 'heroicons', tags: ['hide', 'invisible', 'hidden'] },
  { name: 'heroicons:check', category: 'general', collection: 'heroicons', tags: ['done', 'complete', 'success'] },
  { name: 'heroicons:x-mark', category: 'general', collection: 'heroicons', tags: ['close', 'cancel', 'remove'] },
  { name: 'heroicons:plus', category: 'general', collection: 'heroicons', tags: ['add', 'create', 'new'] },
  { name: 'heroicons:minus', category: 'general', collection: 'heroicons', tags: ['subtract', 'remove', 'less'] },
  { name: 'heroicons:arrow-right', category: 'arrows', collection: 'heroicons', tags: ['next', 'forward', 'continue'] },
  { name: 'heroicons:arrow-left', category: 'arrows', collection: 'heroicons', tags: ['back', 'previous', 'return'] },
  { name: 'heroicons:arrow-up', category: 'arrows', collection: 'heroicons', tags: ['top', 'increase', 'rise'] },
  { name: 'heroicons:arrow-down', category: 'arrows', collection: 'heroicons', tags: ['bottom', 'decrease', 'fall'] },
  { name: 'heroicons:bars-3', category: 'general', collection: 'heroicons', tags: ['menu', 'hamburger', 'navigation'] },
  { name: 'heroicons:ellipsis-horizontal', category: 'general', collection: 'heroicons', tags: ['more', 'options', 'dots'] },
  { name: 'heroicons:calendar-days', category: 'general', collection: 'heroicons', tags: ['date', 'schedule', 'time'] },
  { name: 'heroicons:clock', category: 'general', collection: 'heroicons', tags: ['time', 'schedule', 'hour'] },
  { name: 'heroicons:bell', category: 'communication', collection: 'heroicons', tags: ['notification', 'alert', 'ring'] },
  { name: 'heroicons:bookmark', category: 'general', collection: 'heroicons', tags: ['save', 'mark', 'favorite'] },
  { name: 'heroicons:flag', category: 'general', collection: 'heroicons', tags: ['mark', 'report', 'country'] },
  { name: 'heroicons:folder', category: 'files', collection: 'heroicons', tags: ['directory', 'storage', 'organize'] },
  { name: 'heroicons:document', category: 'files', collection: 'heroicons', tags: ['file', 'paper', 'text'] },
  { name: 'heroicons:photo', category: 'media', collection: 'heroicons', tags: ['image', 'picture', 'graphic'] },
  { name: 'heroicons:video-camera', category: 'media', collection: 'heroicons', tags: ['video', 'film', 'record'] },
  { name: 'heroicons:musical-note', category: 'media', collection: 'heroicons', tags: ['music', 'audio', 'sound'] },
  { name: 'heroicons:camera', category: 'media', collection: 'heroicons', tags: ['photo', 'picture', 'capture'] },
  { name: 'heroicons:wifi', category: 'devices', collection: 'heroicons', tags: ['internet', 'connection', 'network'] },
  { name: 'heroicons:signal', category: 'devices', collection: 'heroicons', tags: ['connection', 'network', 'strength'] },
  { name: 'heroicons:battery-100', category: 'devices', collection: 'heroicons', tags: ['power', 'charge', 'energy'] },
  { name: 'heroicons:globe-alt', category: 'general', collection: 'heroicons', tags: ['world', 'earth', 'international'] },
  { name: 'heroicons:map-pin', category: 'maps', collection: 'heroicons', tags: ['location', 'place', 'marker'] },

  // Feather 图标 (40+ 图标)
  { name: 'feather:home', category: 'general', collection: 'feather', tags: ['house', 'main', 'start'] },
  { name: 'feather:user', category: 'people', collection: 'feather', tags: ['person', 'profile', 'account'] },
  { name: 'feather:search', category: 'general', collection: 'feather', tags: ['find', 'look', 'magnify'] },
  { name: 'feather:settings', category: 'system', collection: 'feather', tags: ['config', 'gear', 'options'] },
  { name: 'feather:heart', category: 'social', collection: 'feather', tags: ['love', 'like', 'favorite'] },
  { name: 'feather:star', category: 'social', collection: 'feather', tags: ['rating', 'favorite', 'bookmark'] },
  { name: 'feather:mail', category: 'communication', collection: 'feather', tags: ['email', 'message', 'envelope'] },
  { name: 'feather:phone', category: 'communication', collection: 'feather', tags: ['call', 'telephone', 'mobile'] },
  { name: 'feather:download', category: 'arrows', collection: 'feather', tags: ['save', 'export', 'get'] },
  { name: 'feather:upload', category: 'arrows', collection: 'feather', tags: ['import', 'send', 'put'] },
  { name: 'feather:edit', category: 'design', collection: 'feather', tags: ['pencil', 'modify', 'change'] },
  { name: 'feather:trash-2', category: 'general', collection: 'feather', tags: ['delete', 'remove', 'bin'] },
  { name: 'feather:copy', category: 'files', collection: 'feather', tags: ['duplicate', 'clone', 'paste'] },
  { name: 'feather:share-2', category: 'social', collection: 'feather', tags: ['send', 'distribute', 'export'] },
  { name: 'feather:lock', category: 'security', collection: 'feather', tags: ['secure', 'private', 'protected'] },
  { name: 'feather:unlock', category: 'security', collection: 'feather', tags: ['open', 'access', 'public'] },
  { name: 'feather:eye', category: 'general', collection: 'feather', tags: ['view', 'see', 'visible'] },
  { name: 'feather:eye-off', category: 'general', collection: 'feather', tags: ['hide', 'invisible', 'hidden'] },
  { name: 'feather:check', category: 'general', collection: 'feather', tags: ['done', 'complete', 'success'] },
  { name: 'feather:x', category: 'general', collection: 'feather', tags: ['close', 'cancel', 'remove'] },
  { name: 'feather:plus', category: 'general', collection: 'feather', tags: ['add', 'create', 'new'] },
  { name: 'feather:minus', category: 'general', collection: 'feather', tags: ['subtract', 'remove', 'less'] },
  { name: 'feather:arrow-right', category: 'arrows', collection: 'feather', tags: ['next', 'forward', 'continue'] },
  { name: 'feather:arrow-left', category: 'arrows', collection: 'feather', tags: ['back', 'previous', 'return'] },
  { name: 'feather:arrow-up', category: 'arrows', collection: 'feather', tags: ['top', 'increase', 'rise'] },
  { name: 'feather:arrow-down', category: 'arrows', collection: 'feather', tags: ['bottom', 'decrease', 'fall'] },
  { name: 'feather:menu', category: 'general', collection: 'feather', tags: ['hamburger', 'navigation', 'list'] },
  { name: 'feather:more-horizontal', category: 'general', collection: 'feather', tags: ['options', 'dots', 'menu'] },
  { name: 'feather:calendar', category: 'general', collection: 'feather', tags: ['date', 'schedule', 'time'] },
  { name: 'feather:clock', category: 'general', collection: 'feather', tags: ['time', 'schedule', 'hour'] },
  { name: 'feather:bell', category: 'communication', collection: 'feather', tags: ['notification', 'alert', 'ring'] },
  { name: 'feather:bookmark', category: 'general', collection: 'feather', tags: ['save', 'mark', 'favorite'] },
  { name: 'feather:flag', category: 'general', collection: 'feather', tags: ['mark', 'report', 'country'] },
  { name: 'feather:folder', category: 'files', collection: 'feather', tags: ['directory', 'storage', 'organize'] },
  { name: 'feather:file', category: 'files', collection: 'feather', tags: ['document', 'paper', 'text'] },
  { name: 'feather:image', category: 'media', collection: 'feather', tags: ['picture', 'photo', 'graphic'] },
  { name: 'feather:video', category: 'media', collection: 'feather', tags: ['movie', 'film', 'play'] },
  { name: 'feather:music', category: 'media', collection: 'feather', tags: ['audio', 'sound', 'song'] },
  { name: 'feather:camera', category: 'media', collection: 'feather', tags: ['photo', 'picture', 'capture'] },
  { name: 'feather:wifi', category: 'devices', collection: 'feather', tags: ['internet', 'connection', 'network'] },
  { name: 'feather:bluetooth', category: 'devices', collection: 'feather', tags: ['wireless', 'connection', 'pair'] },
  { name: 'feather:battery', category: 'devices', collection: 'feather', tags: ['power', 'charge', 'energy'] },
  { name: 'feather:globe', category: 'general', collection: 'feather', tags: ['world', 'earth', 'international'] },
  { name: 'feather:map-pin', category: 'maps', collection: 'feather', tags: ['location', 'place', 'marker'] },

  // Tabler 图标 (40+ 图标)
  { name: 'tabler:home', category: 'general', collection: 'tabler', tags: ['house', 'main', 'start'] },
  { name: 'tabler:user', category: 'people', collection: 'tabler', tags: ['person', 'profile', 'account'] },
  { name: 'tabler:search', category: 'general', collection: 'tabler', tags: ['find', 'look', 'magnify'] },
  { name: 'tabler:settings', category: 'system', collection: 'tabler', tags: ['config', 'gear', 'options'] },
  { name: 'tabler:heart', category: 'social', collection: 'tabler', tags: ['love', 'like', 'favorite'] },
  { name: 'tabler:star', category: 'social', collection: 'tabler', tags: ['rating', 'favorite', 'bookmark'] },
  { name: 'tabler:mail', category: 'communication', collection: 'tabler', tags: ['email', 'message', 'envelope'] },
  { name: 'tabler:phone', category: 'communication', collection: 'tabler', tags: ['call', 'telephone', 'mobile'] },
  { name: 'tabler:download', category: 'arrows', collection: 'tabler', tags: ['save', 'export', 'get'] },
  { name: 'tabler:upload', category: 'arrows', collection: 'tabler', tags: ['import', 'send', 'put'] },
  { name: 'tabler:edit', category: 'design', collection: 'tabler', tags: ['pencil', 'modify', 'change'] },
  { name: 'tabler:trash', category: 'general', collection: 'tabler', tags: ['delete', 'remove', 'bin'] },
  { name: 'tabler:copy', category: 'files', collection: 'tabler', tags: ['duplicate', 'clone', 'paste'] },
  { name: 'tabler:share', category: 'social', collection: 'tabler', tags: ['send', 'distribute', 'export'] },
  { name: 'tabler:lock', category: 'security', collection: 'tabler', tags: ['secure', 'private', 'protected'] },
  { name: 'tabler:lock-open', category: 'security', collection: 'tabler', tags: ['unlock', 'open', 'access'] },
  { name: 'tabler:eye', category: 'general', collection: 'tabler', tags: ['view', 'see', 'visible'] },
  { name: 'tabler:eye-off', category: 'general', collection: 'tabler', tags: ['hide', 'invisible', 'hidden'] },
  { name: 'tabler:check', category: 'general', collection: 'tabler', tags: ['done', 'complete', 'success'] },
  { name: 'tabler:x', category: 'general', collection: 'tabler', tags: ['close', 'cancel', 'remove'] },
  { name: 'tabler:plus', category: 'general', collection: 'tabler', tags: ['add', 'create', 'new'] },
  { name: 'tabler:minus', category: 'general', collection: 'tabler', tags: ['subtract', 'remove', 'less'] },
  { name: 'tabler:arrow-right', category: 'arrows', collection: 'tabler', tags: ['next', 'forward', 'continue'] },
  { name: 'tabler:arrow-left', category: 'arrows', collection: 'tabler', tags: ['back', 'previous', 'return'] },
  { name: 'tabler:arrow-up', category: 'arrows', collection: 'tabler', tags: ['top', 'increase', 'rise'] },
  { name: 'tabler:arrow-down', category: 'arrows', collection: 'tabler', tags: ['bottom', 'decrease', 'fall'] },
  { name: 'tabler:menu-2', category: 'general', collection: 'tabler', tags: ['hamburger', 'navigation', 'list'] },
  { name: 'tabler:dots', category: 'general', collection: 'tabler', tags: ['more', 'options', 'menu'] },
  { name: 'tabler:calendar', category: 'general', collection: 'tabler', tags: ['date', 'schedule', 'time'] },
  { name: 'tabler:clock', category: 'general', collection: 'tabler', tags: ['time', 'schedule', 'hour'] },
  { name: 'tabler:bell', category: 'communication', collection: 'tabler', tags: ['notification', 'alert', 'ring'] },
  { name: 'tabler:bookmark', category: 'general', collection: 'tabler', tags: ['save', 'mark', 'favorite'] },
  { name: 'tabler:flag', category: 'general', collection: 'tabler', tags: ['mark', 'report', 'country'] },
  { name: 'tabler:folder', category: 'files', collection: 'tabler', tags: ['directory', 'storage', 'organize'] },
  { name: 'tabler:file', category: 'files', collection: 'tabler', tags: ['document', 'paper', 'text'] },
  { name: 'tabler:photo', category: 'media', collection: 'tabler', tags: ['image', 'picture', 'graphic'] },
  { name: 'tabler:video', category: 'media', collection: 'tabler', tags: ['movie', 'film', 'play'] },
  { name: 'tabler:music', category: 'media', collection: 'tabler', tags: ['audio', 'sound', 'song'] },
  { name: 'tabler:camera', category: 'media', collection: 'tabler', tags: ['photo', 'picture', 'capture'] },
  { name: 'tabler:wifi', category: 'devices', collection: 'tabler', tags: ['internet', 'connection', 'network'] },
  { name: 'tabler:bluetooth', category: 'devices', collection: 'tabler', tags: ['wireless', 'connection', 'pair'] },
  { name: 'tabler:battery', category: 'devices', collection: 'tabler', tags: ['power', 'charge', 'energy'] },
  { name: 'tabler:world', category: 'general', collection: 'tabler', tags: ['globe', 'earth', 'international'] },
  { name: 'tabler:map-pin', category: 'maps', collection: 'tabler', tags: ['location', 'place', 'marker'] },
  { name: 'tabler:compass', category: 'maps', collection: 'tabler', tags: ['navigation', 'direction', 'guide'] },

  // Material Design 图标 (30+ 图标)
  { name: 'material-symbols:home', category: 'general', collection: 'material', tags: ['house', 'main', 'start'] },
  { name: 'material-symbols:person', category: 'people', collection: 'material', tags: ['user', 'profile', 'account'] },
  { name: 'material-symbols:search', category: 'general', collection: 'material', tags: ['find', 'look', 'magnify'] },
  { name: 'material-symbols:settings', category: 'system', collection: 'material', tags: ['config', 'gear', 'options'] },
  { name: 'material-symbols:favorite', category: 'social', collection: 'material', tags: ['heart', 'love', 'like'] },
  { name: 'material-symbols:star', category: 'social', collection: 'material', tags: ['rating', 'favorite', 'bookmark'] },
  { name: 'material-symbols:mail', category: 'communication', collection: 'material', tags: ['email', 'message', 'envelope'] },
  { name: 'material-symbols:phone', category: 'communication', collection: 'material', tags: ['call', 'telephone', 'mobile'] },
  { name: 'material-symbols:download', category: 'arrows', collection: 'material', tags: ['save', 'export', 'get'] },
  { name: 'material-symbols:upload', category: 'arrows', collection: 'material', tags: ['import', 'send', 'put'] },
  { name: 'material-symbols:edit', category: 'design', collection: 'material', tags: ['pencil', 'modify', 'change'] },
  { name: 'material-symbols:delete', category: 'general', collection: 'material', tags: ['trash', 'remove', 'bin'] },
  { name: 'material-symbols:visibility', category: 'general', collection: 'material', tags: ['eye', 'view', 'see'] },
  { name: 'material-symbols:visibility-off', category: 'general', collection: 'material', tags: ['eye-off', 'hide', 'invisible'] },
  { name: 'material-symbols:check', category: 'general', collection: 'material', tags: ['done', 'complete', 'success'] },
  { name: 'material-symbols:close', category: 'general', collection: 'material', tags: ['x', 'cancel', 'remove'] },
  { name: 'material-symbols:add', category: 'general', collection: 'material', tags: ['plus', 'create', 'new'] },
  { name: 'material-symbols:remove', category: 'general', collection: 'material', tags: ['minus', 'subtract', 'less'] },
  { name: 'material-symbols:arrow-forward', category: 'arrows', collection: 'material', tags: ['right', 'next', 'continue'] },
  { name: 'material-symbols:arrow-back', category: 'arrows', collection: 'material', tags: ['left', 'previous', 'return'] },
  { name: 'material-symbols:keyboard-arrow-up', category: 'arrows', collection: 'material', tags: ['up', 'increase', 'rise'] },
  { name: 'material-symbols:keyboard-arrow-down', category: 'arrows', collection: 'material', tags: ['down', 'decrease', 'fall'] },
  { name: 'material-symbols:menu', category: 'general', collection: 'material', tags: ['hamburger', 'navigation', 'list'] },
  { name: 'material-symbols:more-horiz', category: 'general', collection: 'material', tags: ['options', 'dots', 'menu'] },
  { name: 'material-symbols:calendar-today', category: 'general', collection: 'material', tags: ['date', 'schedule', 'time'] },
  { name: 'material-symbols:schedule', category: 'general', collection: 'material', tags: ['clock', 'time', 'hour'] },
  { name: 'material-symbols:notifications', category: 'communication', collection: 'material', tags: ['bell', 'alert', 'ring'] },
  { name: 'material-symbols:bookmark', category: 'general', collection: 'material', tags: ['save', 'mark', 'favorite'] },
  { name: 'material-symbols:flag', category: 'general', collection: 'material', tags: ['mark', 'report', 'country'] },
  { name: 'material-symbols:folder', category: 'files', collection: 'material', tags: ['directory', 'storage', 'organize'] },
  { name: 'material-symbols:description', category: 'files', collection: 'material', tags: ['file', 'document', 'text'] },
  { name: 'material-symbols:image', category: 'media', collection: 'material', tags: ['picture', 'photo', 'graphic'] },
  { name: 'material-symbols:videocam', category: 'media', collection: 'material', tags: ['video', 'camera', 'record'] },
  { name: 'material-symbols:music-note', category: 'media', collection: 'material', tags: ['music', 'audio', 'sound'] },

  // Phosphor 图标 (30+ 图标)
  { name: 'ph:house', category: 'general', collection: 'phosphor', tags: ['home', 'main', 'start'] },
  { name: 'ph:user', category: 'people', collection: 'phosphor', tags: ['person', 'profile', 'account'] },
  { name: 'ph:magnifying-glass', category: 'general', collection: 'phosphor', tags: ['search', 'find', 'look'] },
  { name: 'ph:gear', category: 'system', collection: 'phosphor', tags: ['settings', 'config', 'options'] },
  { name: 'ph:heart', category: 'social', collection: 'phosphor', tags: ['love', 'like', 'favorite'] },
  { name: 'ph:star', category: 'social', collection: 'phosphor', tags: ['rating', 'favorite', 'bookmark'] },
  { name: 'ph:envelope', category: 'communication', collection: 'phosphor', tags: ['mail', 'email', 'message'] },
  { name: 'ph:phone', category: 'communication', collection: 'phosphor', tags: ['call', 'telephone', 'mobile'] },
  { name: 'ph:download', category: 'arrows', collection: 'phosphor', tags: ['save', 'export', 'get'] },
  { name: 'ph:upload', category: 'arrows', collection: 'phosphor', tags: ['import', 'send', 'put'] },
  { name: 'ph:pencil', category: 'design', collection: 'phosphor', tags: ['edit', 'modify', 'change'] },
  { name: 'ph:trash', category: 'general', collection: 'phosphor', tags: ['delete', 'remove', 'bin'] },
  { name: 'ph:eye', category: 'general', collection: 'phosphor', tags: ['view', 'see', 'visible'] },
  { name: 'ph:eye-slash', category: 'general', collection: 'phosphor', tags: ['hide', 'invisible', 'hidden'] },
  { name: 'ph:check', category: 'general', collection: 'phosphor', tags: ['done', 'complete', 'success'] },
  { name: 'ph:x', category: 'general', collection: 'phosphor', tags: ['close', 'cancel', 'remove'] },
  { name: 'ph:plus', category: 'general', collection: 'phosphor', tags: ['add', 'create', 'new'] },
  { name: 'ph:minus', category: 'general', collection: 'phosphor', tags: ['subtract', 'remove', 'less'] },
  { name: 'ph:arrow-right', category: 'arrows', collection: 'phosphor', tags: ['next', 'forward', 'continue'] },
  { name: 'ph:arrow-left', category: 'arrows', collection: 'phosphor', tags: ['back', 'previous', 'return'] },
  { name: 'ph:arrow-up', category: 'arrows', collection: 'phosphor', tags: ['top', 'increase', 'rise'] },
  { name: 'ph:arrow-down', category: 'arrows', collection: 'phosphor', tags: ['bottom', 'decrease', 'fall'] },
  { name: 'ph:list', category: 'general', collection: 'phosphor', tags: ['menu', 'hamburger', 'navigation'] },
  { name: 'ph:dots-three', category: 'general', collection: 'phosphor', tags: ['more', 'options', 'menu'] },
  { name: 'ph:calendar', category: 'general', collection: 'phosphor', tags: ['date', 'schedule', 'time'] },
  { name: 'ph:clock', category: 'general', collection: 'phosphor', tags: ['time', 'schedule', 'hour'] },
  { name: 'ph:bell', category: 'communication', collection: 'phosphor', tags: ['notification', 'alert', 'ring'] },
  { name: 'ph:bookmark', category: 'general', collection: 'phosphor', tags: ['save', 'mark', 'favorite'] },
  { name: 'ph:flag', category: 'general', collection: 'phosphor', tags: ['mark', 'report', 'country'] },
  { name: 'ph:folder', category: 'files', collection: 'phosphor', tags: ['directory', 'storage', 'organize'] },
  { name: 'ph:file', category: 'files', collection: 'phosphor', tags: ['document', 'paper', 'text'] },
  { name: 'ph:image', category: 'media', collection: 'phosphor', tags: ['picture', 'photo', 'graphic'] },
  { name: 'ph:video', category: 'media', collection: 'phosphor', tags: ['movie', 'film', 'play'] },
  { name: 'ph:music-note', category: 'media', collection: 'phosphor', tags: ['music', 'audio', 'sound'] },
  { name: 'ph:camera', category: 'media', collection: 'phosphor', tags: ['photo', 'picture', 'capture'] },
  { name: 'ph:wifi-high', category: 'devices', collection: 'phosphor', tags: ['internet', 'connection', 'network'] },
  { name: 'ph:bluetooth', category: 'devices', collection: 'phosphor', tags: ['wireless', 'connection', 'pair'] },
  { name: 'ph:battery-full', category: 'devices', collection: 'phosphor', tags: ['power', 'charge', 'energy'] },
  { name: 'ph:globe', category: 'general', collection: 'phosphor', tags: ['world', 'earth', 'international'] },
  { name: 'ph:map-pin', category: 'maps', collection: 'phosphor', tags: ['location', 'place', 'marker'] }
]

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedCollection, setSelectedCollection] = useState('all')
  const [favorites, setFavorites] = useState<string[]>([])
  const [icons, setIcons] = useState<Icon[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 生成图标数据 - 使用 Iconify API
  const generateIconData = (iconData: typeof popularIcons[0]): Icon => {
    const iconUrl = `https://api.iconify.design/${iconData.name}.svg`
    const displayName = iconData.name.split(':')[1] || iconData.name

    return {
      id: iconData.name,
      name: displayName,
      category: iconData.category,
      collection: iconData.collection,
      svg: '', // 将通过API加载
      url: iconUrl,
      downloadUrl: iconUrl,
      tags: iconData.tags
    }
  }

  // 初始化图标数据
  useEffect(() => {
    const iconData = popularIcons.map(generateIconData)
    setIcons(iconData)
  }, [])

  // 搜索图标API
  const searchIcons = async (query: string) => {
    if (!query.trim()) {
      const iconData = popularIcons.map(generateIconData)
      setIcons(iconData)
      return
    }

    setLoading(true)
    setError(null)

    try {
      // 使用Iconify API搜索更多图标
      const response = await fetch(`https://api.iconify.design/search?query=${encodeURIComponent(query)}&limit=50`)
      const data = await response.json()

      if (data.icons && data.icons.length > 0) {
        const searchResults: Icon[] = data.icons.map((iconName: string) => ({
          id: `iconify-${iconName}`,
          name: iconName.split(':')[1] || iconName,
          category: 'general',
          collection: 'iconify',
          svg: '',
          url: `https://api.iconify.design/${iconName}.svg`,
          downloadUrl: `https://api.iconify.design/${iconName}.svg`,
          tags: [iconName]
        }))

        // 合并本地图标和搜索结果
        const localMatches = popularIcons
          .filter(icon =>
            icon.name.toLowerCase().includes(query.toLowerCase()) ||
            icon.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
          )
          .map(generateIconData)

        setIcons([...localMatches, ...searchResults])
      } else {
        // 只显示本地匹配的图标
        const localMatches = popularIcons
          .filter(icon =>
            icon.name.toLowerCase().includes(query.toLowerCase()) ||
            icon.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
          )
          .map(generateIconData)

        setIcons(localMatches)
      }
    } catch (err) {
      console.error('搜索图标失败:', err)
      setError('搜索失败，请稍后重试')

      // 降级到本地搜索
      const localMatches = popularIcons
        .filter(icon =>
          icon.name.toLowerCase().includes(query.toLowerCase()) ||
          icon.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        )
        .map(generateIconData)

      setIcons(localMatches)
    } finally {
      setLoading(false)
    }
  }

  // 防抖搜索
  useEffect(() => {
    const timer = setTimeout(() => {
      searchIcons(searchQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  // 过滤图标
  const filteredIcons = icons.filter(icon => {
    const matchesCategory = selectedCategory === 'all' || icon.category === selectedCategory
    const matchesCollection = selectedCollection === 'all' || icon.collection === selectedCollection
    return matchesCategory && matchesCollection
  })

  // 获取所有分类
  const categories = ['all', ...Array.from(new Set(popularIcons.map(icon => icon.category)))]

  // 获取所有图标集合
  const collections = ['all', ...iconCollections.map(c => c.id)]

  // 切换收藏
  const toggleFavorite = (iconId: string) => {
    setFavorites(prev =>
      prev.includes(iconId)
        ? prev.filter(id => id !== iconId)
        : [...prev, iconId]
    )
  }

  // 复制图标链接
  const copyIconUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
      alert('图标链接已复制到剪贴板！')
    } catch (err) {
      console.error('复制失败:', err)
      alert('复制失败，请手动复制链接')
    }
  }

  // 下载图标
  const downloadIcon = async (icon: Icon) => {
    try {
      const response = await fetch(icon.downloadUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${icon.name}.svg`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('下载失败:', err)
      alert('下载失败，请稍后重试')
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* 头部 */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '1rem 0',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <h1 style={{ 
            margin: 0, 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            color: '#333',
            textAlign: 'center'
          }}>
            🔍 图标搜索工具
          </h1>
          <p style={{ 
            margin: '0.5rem 0 0 0', 
            fontSize: '1rem', 
            color: '#666',
            textAlign: 'center'
          }}>
            快速搜索和收藏您喜欢的图标
          </p>
        </div>
      </header>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* 搜索和过滤区域 */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* 搜索框 */}
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索图标... (支持英文名称和标签)"
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 48px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
              <div style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#999',
                fontSize: '1.2rem'
              }}>
                🔍
              </div>
              {loading && (
                <div style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#667eea'
                }}>
                  ⏳
                </div>
              )}
            </div>

            {/* 图标集合过滤 */}
            <div>
              <label style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem', display: 'block' }}>
                图标集合:
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {collections.map(collection => (
                  <button
                    key={collection}
                    onClick={() => setSelectedCollection(collection)}
                    style={{
                      padding: '6px 12px',
                      border: 'none',
                      borderRadius: '16px',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      background: selectedCollection === collection ? '#4f46e5' : '#e5e7eb',
                      color: selectedCollection === collection ? 'white' : '#374151'
                    }}
                  >
                    {collection === 'all' ? '全部' : iconCollections.find(c => c.id === collection)?.name || collection}
                  </button>
                ))}
              </div>
            </div>

            {/* 分类过滤 */}
            <div>
              <label style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem', display: 'block' }}>
                分类:
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    style={{
                      padding: '8px 16px',
                      border: 'none',
                      borderRadius: '20px',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      background: selectedCategory === category ? '#667eea' : '#f0f0f0',
                      color: selectedCategory === category ? 'white' : '#333'
                    }}
                  >
                    {categoryNames[category] || category}
                  </button>
                ))}
              </div>
            </div>

            {/* 统计信息和错误提示 */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.875rem',
              color: '#666',
              borderTop: '1px solid #e0e0e0',
              paddingTop: '1rem'
            }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <span>找到 {filteredIcons.length} 个图标</span>
                <span>收藏 {favorites.length} 个图标</span>
              </div>
              {error && (
                <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>
                  {error}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 图标网格 */}
        {loading ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⏳</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#333', margin: '0 0 0.5rem 0' }}>
              正在搜索图标...
            </h3>
            <p style={{ color: '#666', margin: 0 }}>请稍候，正在为您查找最佳图标</p>
          </div>
        ) : filteredIcons.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#333', margin: '0 0 0.5rem 0' }}>
              未找到匹配的图标
            </h3>
            <p style={{ color: '#666', margin: 0 }}>尝试调整搜索关键词或选择不同的分类</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1rem'
          }}>
            {filteredIcons.map((icon) => (
              <div key={icon.id} style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '12px',
                padding: '1.5rem',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                position: 'relative',
                border: '1px solid transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)'
                e.currentTarget.style.borderColor = '#667eea'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)'
                e.currentTarget.style.borderColor = 'transparent'
              }}>
                {/* 收藏按钮 */}
                <button
                  onClick={() => toggleFavorite(icon.id)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'none',
                    border: 'none',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    opacity: favorites.includes(icon.id) ? 1 : 0.5,
                    transition: 'opacity 0.3s ease'
                  }}
                  title={favorites.includes(icon.id) ? '取消收藏' : '添加收藏'}
                >
                  {favorites.includes(icon.id) ? '❤️' : '🤍'}
                </button>

                {/* 图标显示 */}
                <div style={{
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  background: '#f8fafc',
                  borderRadius: '8px'
                }}>
                  <img
                    src={icon.url}
                    alt={icon.name}
                    style={{
                      width: '48px',
                      height: '48px',
                      filter: 'none'
                    }}
                    onError={(e) => {
                      // 如果图标加载失败，显示占位符
                      e.currentTarget.style.display = 'none'
                      const nextElement = e.currentTarget.nextElementSibling as HTMLElement
                      if (nextElement) {
                        nextElement.style.display = 'block'
                      }
                    }}
                  />
                  <div style={{
                    display: 'none',
                    fontSize: '2rem',
                    color: '#9ca3af'
                  }}>
                    📄
                  </div>
                </div>

                {/* 图标信息 */}
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#333',
                  margin: '0 0 0.5rem 0',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }} title={icon.name}>
                  {icon.name}
                </h3>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    background: '#e0e7ff',
                    color: '#3730a3'
                  }}>
                    {categoryNames[icon.category] || icon.category}
                  </span>

                  <span style={{
                    fontSize: '0.75rem',
                    color: '#6b7280',
                    background: '#f3f4f6',
                    padding: '2px 6px',
                    borderRadius: '8px'
                  }}>
                    {iconCollections.find(c => c.id === icon.collection)?.name || icon.collection}
                  </span>
                </div>

                {/* 操作按钮 */}
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                  <button
                    onClick={() => copyIconUrl(icon.url)}
                    style={{
                      padding: '6px 12px',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      background: '#f3f4f6',
                      color: '#374151',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#e5e7eb'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#f3f4f6'
                    }}
                    title="复制图标链接"
                  >
                    📋 复制链接
                  </button>

                  <button
                    onClick={() => downloadIcon(icon)}
                    style={{
                      padding: '6px 12px',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      background: '#667eea',
                      color: 'white',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#5a67d8'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#667eea'
                    }}
                    title="下载SVG文件"
                  >
                    ⬇️ 下载
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
