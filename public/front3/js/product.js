/**
 * Created by 赵春明 on 2018/4/10.
 */
$(function () {
  var id  = getSearch("id");
  $.ajax({
    type: "get",
    url: "/product/queryProductDetail",
    dataType: "json",
    data:{id:id},
    success: function ( info ) {
      console.log(info);
      $(".mui-scroll").html(template("tmp-product",info));
      var sizeStr = info.size;
      console.log(sizeStr);
      var arr = sizeStr.split("-");
      console.log(arr);
      var size = arr[1] - arr[0];
      var sizeStart = +arr[0];
      console.log(sizeStart);
      console.log(size);
      for(var i = 0; i <= size; i++) {
        $(".lt_size").append("<span>"+ (sizeStart + i) +"</span>");
      }

      //获取库存数
      var num = +info.num;
      console.log(num);
      //初始化数字增减控件
      mui(".mui-numbox").numbox().setValue(1);
      mui(".mui-numbox").numbox().setOption("max",num);
      mui(".mui-numbox").numbox().setOption("min",1);
      mui(".mui-numbox").numbox().setOption("step",1);

      //初始化轮播图
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
      });
    }
  })

  //选择尺码的功能
  $(".lt_main").on("click",".lt_size span",function () {
    $(this).addClass("current").siblings().removeClass("current");
  })

  //点击加入购物车进行ajax请求，需要产品id，产品数量，和产品尺码
  $("#add_cart").on("click",function () {
    var size = $(".lt_size span.current").text();
    //console.log(size);
    var num = $(".mui-numbox-input").val();

    if (!size) {
      mui.toast("请选择尺码");
      return;
    }

    $.ajax({
      type: "post",
      url: "/cart/addCart",
      dataType: "json",
      data:{
        productId:id,
        size: size,
        num: num
      },
      success: function ( info ) {
        console.log(info);
        if(info.error === 400) {
          location.href = "login.html?returnUrl="+ location.href;
        }
        if(info.success) {
          mui.confirm("添加成功","温馨提示",["去购物车","继续浏览"],function ( e ) {
            if(e.index === 0 ) {
              location.href = "cart.html";
            }
          })
        }
      }
    })
  })

})