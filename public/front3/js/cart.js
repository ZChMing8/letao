/**
 * Created by 赵春明 on 2018/4/11.
 */
$(function () {

  function render() {
    $("#total").text("00:00");
    setTimeout(function () {
      $.ajax({
        type: "get",
        url: "/cart/queryCart",
        dataType: "json",
        success: function ( info ) {
          console.log(info);
          $(".mui-table-view").html(template("tmp-cart",{list:info}));

          // 需要手动结束下拉刷新
          mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
        }
      })
    },500)
  }

  // 配置下拉刷新
  mui.init({
    pullRefresh : {
      container:".mui-scroll-wrapper",//下拉刷新容器标识
      down : {
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        callback : function() {
          render();
        } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      }
    }
  });

  $(".mui-table-view").on("tap",".btn_delete",function () {
    var id = $(this).data("id");
    mui.confirm( "你是否要删除该商品", "温馨提示", ["确认", "取消"], function( e ) {
      if (e.index === 0) {

        $.ajax({
          type: "get",
          url: "/cart/deleteCart",
          dataType: "json",
          data:{id:[id]},
          success: function ( info ) {
            console.log(info);
            if(info.success) {
              mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
            }
          }
        })

      }
    })
  })
  
  //设置编辑功能
  $(".mui-table-view").on("tap",".btn_edit",function () {
    var dataobj = this.dataset;
    console.log(dataobj);
    var id = dataobj.id;
    var htmlStr = template("tmp-edit",dataobj);
    htmlStr = htmlStr.replace(/\n/g,"");
    console.log(htmlStr);

    mui.confirm(htmlStr,"编辑商品",["确定","取消"],function ( e ) {
      if(e.index === 0) {
        var size = $(".lt_size span.current").text();
        console.log(size);
        var num = $(".lt_num .mui-numbox-input").val();
        $.ajax({
          type: "post",
          url: "/cart/updateCart",
          dataType: "json",
          data:{
            id:id,
            size:size,
            num:num
          },
          success: function ( info ) {
            console.log(info);
            if(info.success) {
              mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
            }
          }
        })
      }
    })


    // 进行input数字框初始化
    mui('.mui-numbox').numbox();
  })

  //选择尺码，注册委托事件
  $("body").on("tap",".lt_size span",function () {
    $(this).addClass("current").siblings().removeClass("current");
  })

  //注册事件委托，获取选中框的价格数量
  $(".mui-table-view").on("change",".ck",function () {
    var $checkeds = $(".ck:checked");
    var total = 0;
    $checkeds.each(function () {
      var price = $(this).data("price");
      var num = $(this).data("num");
      total += price * num;
    })
      total =total.toFixed(2);
      $("#total").text(total);
  })
})