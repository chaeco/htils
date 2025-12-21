import htils from './dist/index.js'
console.log('✅ ES Module 导入成功')
console.log('导出模块数:', Object.keys(htils).length)
console.log('前10个模块:', Object.keys(htils).slice(0, 10).join(', '))
console.log('scformat:', typeof htils.scformat)
console.log('string:', typeof htils.string)
console.log('scformat.snakeToCamel:', typeof htils.scformat.snakeToCamel)
