/**
 * Created by Jepson on 2018/4/9.
 */

$(function() {
  // mui(".box") 相当于选择器
  // 初始化区域滚动
  mui('.mui-scroll-wrapper').scroll({
    indicators: false, //是否显示滚动条
  });

  // 配置轮播图自动轮播
  var gallery = mui('.mui-slider');
  gallery.slider({
    interval: 1000//自动轮播周期，若为0则不自动播放，默认为0；
  });

});

// 专门用于解析地址栏参数
function getSearch( key ) {
  var search = location.search;
  // 解码成中文
  search = decodeURI( search );
  // 去掉 ?
  search = search.slice(1);
  // 切割成数组
  var arr = search.split( "&" );

  var obj = {};
  arr.forEach(function( element, index ) {
    // 对数组的每一项, 进行切割  name=pp
    var k = element.split("=")[0];  // name
    var v = element.split("=")[1];  // pp
    // obj["name"] = "pp";
    obj[ k ] = v;
  });

  return obj[ key ];
}
