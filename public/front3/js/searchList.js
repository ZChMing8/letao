/**
 * Created by 赵春明 on 2018/4/10.
 */
$(function () {

  var key = getSearch("key");
  $(".lt_search input").val(key);



  //把每次加载的数量和页数重新定义
  var currentPage = 1;
  var pageSize = 4;

  render(function (info) {
    $(".lt_product").append(template("tmp-product",info));
  })

  function render( callback ) {
    var params = {};
    params.proName = $(".lt_search input").val();
    params.page = currentPage;
    params.pageSize = pageSize;

    //判断是否被选中
    var $current = $(".lt_sort .current");
    if ($current.length > 0) {
      var sortName = $current.data("type");
      var sortValue = $current.find("i").hasClass("fa-angle-up") ? 1 : 2;
      params[ sortName ] = sortValue;
    }
      $.ajax({
        type: "get",
        url: "/product/queryProduct",
        dataType: "json",
        data:params,
        success: function ( info ) {
          console.log(info);
          callback( info );
        }
      })
  }



  mui.init({
    pullRefresh : {
      container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等

      //初始化上拉刷新
      up : {
        height:50,//可选.默认50.触发上拉加载拖动距离
        auto:false,//可选,默认false.自动上拉加载一次
        callback :function() {
          currentPage++;
          render(function( info ) {
            if( info.data.length <= 0 ) {
              mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh( true );
            } else {
              $(".lt_product").append(template("tmp-product",info));
              //没有数据了，关闭上拉加载
              console.log(mui('.mui-scroll-wrapper').pullRefresh());
              mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
            }
          })
        } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      },
      //初始化下拉刷新
      down : {
        height:50,//可选,默认50.触发下拉刷新拖动距离,
        auto: false,//可选,默认false.首次加载自动下拉刷新一次
        callback :function () {
          //重置当前页
          currentPage = 1;
          render(function ( info ) {

            $(".lt_product").html(template("tmp-product",info));
            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();

            //还需要重新启用上拉加载
            console.log(mui('.mui-scroll-wrapper').pullRefresh());
            mui('.mui-scroll-wrapper').pullRefresh().enablePullupToRefresh();
          });
        } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      }



    }
  });


  //点击搜索功能，渲染页面，将搜索记录储存值本地，并保存
  $(".lt_search button").on("tap",function () {
    // 执行一次下拉刷新即可
    mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
    var key = $(".lt_search input").val().trim();
    if (key === "") {
      mui.toast("请输入搜索内容!",{
        duration: 1000
      });
      return;
    }
    var arr = getHistory();
    if (arr.indexOf( key ) !== -1) {
      var index = arr.indexOf( key );
      arr.splice(index, 1);
    }
    if (arr.length >= 10) {
      arr.pop();
    }
    arr.unshift( key );
    setHistory( arr );
    //$(".lt_search input").val( arr[0] );//重新设值input的值

  });


  //点击排序功能进行排序
  $(".lt_sort a[data-type]").on("tap",function () {
    //判断是否有current这个类
    if ($(this).hasClass("current")) {
      $(this).find("i").toggleClass("fa-angle-up").toggleClass("fa-angle-down");
    }else {
      //说明没有这个类
      $(this).addClass("current").siblings().removeClass("current");
      $(".lt_sort a").find("i").addClass("fa-angle-down").removeClass("fa-angle-up");
    }
    // 执行一次下拉刷新即可
    mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
  })
})