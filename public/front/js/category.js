/**
 * Created by 赵春明 on 2018/4/11.
 */
$(function () {
  $.ajax({
    type: "get",
    url: "/category/queryTopCategory",
    dataType: "json",
    success: function ( info ) {
      console.log(info);
      $(".category_left ul").html(template("tmp-cate",info));
      render(info.rows[0].id);
    }
  })

  //渲染右边内容
  function render( id ) {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategory",
      dataType: "json",
      data:{id:id},
      success: function ( info ) {
        console.log(info);
        $(".category_right").html(template("tmp-brand",info));
      }
    })
  }

  //注册事件委托 通过ajax进行数据请求
  $(".category_left ul").on("click","a",function () {
    $(this).addClass("current").parent().siblings().find("a").removeClass("current");
    var id = $(this).data("id");
    //console.log(id);
    render( id );
  })
})