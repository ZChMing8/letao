/**
 * Created by 赵春明 on 2018/4/6.
 */


// 配置禁用小圆环
NProgress.configure({ showSpinner: false });

$(document).ajaxStart(function () {
    NProgress.start();
})

$(document).ajaxStop(function () {
    setInterval(function () {
      NProgress.done();
    },500)
})

$(function () {
    $(".nav ul>li>a").each(function () {
        $(this).on("click",function () {
          $(this).addClass("current");
          $(this).parent().siblings().children("a").removeClass("current");
        })
    })
  $(".category").on("click",function () {
    $(this).next().stop().slideToggle();
  })
  
  //点击icon_menu 让侧边栏慢慢显示与隐藏
  $(".icon_menu").on("click",function () {
      
  })
  
  //模态框，点击使其显示
  $(".icon_logout").on("click",function () {
    console.log(1);
    $('#myModal').modal("show");
  })
})

