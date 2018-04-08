/**
 * Created by 赵春明 on 2018/4/7.
 */
$(function () {
  var currentPage = 1;
  var pageSize = 5;
  render();
  function render() {
    $.ajax({
      url: "/user/queryUser",
      type:"get",
      data: {
        page:currentPage,
        pageSize:pageSize
      },
      success: function ( info ) {
        console.log(info);
        $(".table tbody").html(template("tmp-user",info));
        //渲染分页
        $("#paginator").bootstrapPaginator({
          //版本
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked:function (a,b,c,page) {
            currentPage = page;
            render();
          }
        })
      }
    })
  }

  //注册事件委托，点击操作按钮，进行切换
  $(".table tbody").on("click",".btn",function () {
    var id = $(this).parent().data("id");
    var isDelete = $(this).text() === "启用" ? 1 : 0;
    //console.log(isDelete);
    $.ajax({
      url:"/user/updateUser",
      type:"post",
      data:{
        id:id,
        isDelete:isDelete
      },
      success:function ( info ) {
        console.log(info);
        if(info.success) {
          render();
        }
      }
    })
  })
})