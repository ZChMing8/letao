/**
 * Created by Jepson on 2018/4/12.
 */

// 相当于配置好了依赖项, 使用时, requirejs 会自动帮我们加载依赖项
define(['./a'], function() {

  console.log( "这是一个依赖于 a 模块的一个 need 模块")

})
