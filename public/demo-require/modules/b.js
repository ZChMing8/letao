/**
 * Created by Jepson on 2018/4/12.
 */

//define('模块名', ['依赖项'], function() { ... })


define(function() {
  console.log( "加载执行了 b 模块" );

  function niuB() {
    console.log( "我很牛逼" );
  }

  // 导出模块的内容, 直接 return 即可
  return niuB;
})