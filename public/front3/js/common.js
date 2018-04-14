/**
 * Created by 赵春明 on 2018/4/9.
 */
$(function () {
  //初始化区域滚动
  mui('.mui-scroll-wrapper').scroll({
    indicators: false,
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });

  //设置自动轮播
  var gallery = mui('.mui-slider');
  gallery.slider({
    interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
  });
})

//获取地址后面拼接的数据
function getSearch(key) {
  var search = location.search;
  search = decodeURI(search);
  search = search.substr(1);
//    console.log(search);
  var arr = search.split("&");
//    console.log(arr);
  var obj = {};
  arr.forEach(function (value,index) {
    var k = value.split("=")[0];
    var v = value.split("=")[1];
    obj[ k ] = v;
  })
  return obj[ key ];
}

//1获取本地存储方法
function getHistory() {
  var history = localStorage.getItem("search_list") || '[]';
  var arr = JSON.parse( history );
  return arr;
}

//2.修改或设置本地存储方法
function setHistory( arr ) {
  localStorage.setItem("search_list",JSON.stringify( arr ));
}

//3.动态渲染
function render() {
  var arr = getHistory();
  $(".lt_history").html(template("tmp-search",{ list:arr }));
}