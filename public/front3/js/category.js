/**
 * Created by 赵春明 on 2018/4/9.
 */
$(function () {
  $.ajax({
    type: "get",
    url: "/category/queryTopCategory",
    dataType: "json",
    success: function ( info ) {
      console.log(info);
      $(".category_left ul").html(template("tmp-category",info));
      renderByid(info.rows[0].id);
    }
  })


  //点击左侧a 注册委托事件，获取id 渲染页面
  $(".category_left ul").on("click","a",function () {
    var id = $(this).data("id");
    renderByid( id );
    $(this).addClass("current").parent().siblings().find("a").removeClass("current");
  })

  function renderByid( id ) {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategory",
      dataType: "json",
      data:{id:id},
      success: function ( info ) {
        console.log(info);
        $(".category_right ul").html(template("tmp-categoryid",info));
      }
    })
  }
})