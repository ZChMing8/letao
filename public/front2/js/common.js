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
})