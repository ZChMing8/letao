/**
 * Created by Jepson on 2018/4/10.
 */

$(function() {

  // 表示当前页
  var currentPage = 1;
  // 每次加载多少条
  var pageSize = 4;

  // 一开始作用: 请求数据+渲染页面
  // 改造之后作用: 请求数据, 渲染页面的操作, 可以通过 callback 来进行配置了
  function render( callback ) {

    var obj = {};
    obj.proName = $('.lt_search input').val();
    obj.page = currentPage;
    obj.pageSize = pageSize;

    // 加上我们一些可传可不传的参数处理
    var $current = $('.lt_sort .current');

    if ( $current.length > 0 ) {
      console.log(111);
      // 有这个类, 说明需要排序, 需要加参数,
      // 参数名和参数值  （1升序，2降序）
      var sortName = $current.data("type");
      var sortValue = $current.find("i").hasClass("fa-angle-down") ? 2 : 1;
      obj[ sortName ] = sortValue;
    }

    setTimeout(function() {
      $.ajax({
        url: "/product/queryProduct",
        type: "get",
        data: obj,
        success: function( info ) {
          console.log(info);
          callback( info );
        }
      })
    }, 500)
  }

  //// 功能1: 页面一进来, 需要渲染一次, proName 来自于 input 框
  var key = getSearch( "key" );
  $('.lt_search input').val(key);

  // 配置上拉加载和下拉刷新
  mui.init({
    pullRefresh : {
      // 直接配置区域滚动容器, 为下拉刷新容器
      container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      // 下拉刷新
      down : {
        auto: true, // 表示一进入页面, 就进行一次下拉刷新
        callback : function() {

          // 重置当前页
          currentPage = 1;
          render(function( info ) {
            $('.lt_product').html( template( "productTpl", info ) );

            // 数据渲染完成之后, 需要停止下拉刷新
            // 注意: 文档中有问题, 需要调用 pullRefresh() 生成一个实例,
            // 这个实例可以访问到原型上的 endPulldownToRefresh 方法, 方法可以结束下拉刷新
            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();

            // 重新启用上拉加载
            mui('.mui-scroll-wrapper').pullRefresh().enablePullupToRefresh();
          });

          console.log( "下拉刷新完成时, 调用的回调函数, 这里面一般发送 ajax 请求, 获取数据, 重新渲染页面" )
        } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      },

      // 配置上拉加载更多
      up: {
        callback: function() {
          //// currentPage++, 请求下一页的数据, 并且追加到 lt_product 里面去
          currentPage++;
          render(function( info ) {

            if ( info.data.length > 0 ) {
              // 说明有数据
              // 将数据追加
              $('.lt_product').append( template( "productTpl", info ) );

              // 关闭上拉加载
              mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();

            } else {
              // 关闭上拉加载时, 让其显示没有更多数据的文本, 因为没有更多数据了,
              // 所以在内部会自动调用禁用上拉加载
              mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
            }

          });
        }
      }
    }
  });


  // 功能2: 点击搜索按钮, 需要渲染一次, 用户修改了proName
  $('.lt_search button').on('tap', function() {
    // 执行一次下拉刷新即可
    mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();

    var key = $('.lt_search input').val();
    var history = localStorage.getItem("search_list") || "[]";
    var arr = JSON.parse( history );
    var index = arr.indexOf( key );
    if ( index !== -1 ) {
      // 有这个key 需要删除
      arr.splice( index, 1 );
    }
    if ( arr.length >= 10 ) {
      arr.pop(); // 删掉最后面一个
    }
    arr.unshift( key );
    localStorage.setItem( "search_list", JSON.stringify(arr) );
  })


  // 功能3: 点击排序的时候, 需要渲染一次(传递更多的参数)
  // 天坑: click 事件有 300ms 延时, mui 认为在 下拉刷新和上拉加载中, 如果用 click 事件, 性能不好
  //       所以禁用了 click 事件, 他认为通过 tap 方法替代 click 方法

  // 需要通过 tap 来绑定点击事件, tap 表示轻触
  $('.lt_sort a[data-type]').on('tap', function() {
    console.log( 1111 );

    // 判断当前点击的 a 有没有 current 类
    // 如果有, 切换类
    if ( $(this).hasClass( "current") ) {
      $(this).find("i").toggleClass("fa-angle-up").toggleClass("fa-angle-down");
    } else {
      // 没有这个类 进行排他
      $(this).addClass("current").siblings().removeClass("current");
      // 需要重置所有的箭头, 向下
      $(".lt_sort a i").removeClass("fa-angle-up").addClass("fa-angle-down");
    }

    // 执行一次下拉刷新即可
    mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
  })

})
