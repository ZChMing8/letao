/**
 * Created by 赵春明 on 2018/4/7.
 */
//  <script src="lib/artTemplate/template-web.js"></script>
//  <script src="js/user.js"></script>

require(['jquery','template','bootstrap','bootstrapValidator','bootstrapPaginator','common'],function ($,template) {
  var currentPage = 1;
  var pageSize = 5;
  //渲染数据
  render();
  function render() {
    $.ajax({
      type:"get",
      url:"/user/queryUser",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function ( info ) {
        console.log(info);
        $(".table tbody").html(template("tmp-user",info));

        //设置分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage: info.page,
          totalPages: Math.ceil( info.total / info.size ),
          numberOfPages: 4,
          onPageClicked:function (event,originalEvent, type,page) {
            currentPage = page;
            render();
          }
        })
      }
    })
  }

  //点击禁用启用按钮，让模态框显示，然后进行操作
  $(".table tbody").on("click",".btn",function () {
    //让模态框显示
    $("#userModal").modal("show");

    //获取id值和isDelete值
    var id = $(this).parent().data("id");
    //console.log(id);
    var isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
    //console.log(isDelete);

    $("#btn-confirm").off("click").on("click",function () {
      $.ajax({
        type: "post",
        url: "/user/updateUser",
        data:{
          id:id,
          isDelete:isDelete
        },
        success:function ( info ) {
          //console.log(info);
          if ( info.success ) {
            //让模态框隐藏
            $("#userModal").modal("hide");
            //重新渲染页面
            render();
          }
        }
      })
    })
  })
})


