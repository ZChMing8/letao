/**
 * Created by 赵春明 on 2018/4/10.
 */
$(function () {
  var currentPage = 1;
  var pageSize = 5;
  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/product/queryProductDetailList",
      dataType: "json",
      data:{
        page: currentPage,
        pageSize:pageSize
      },
      success: function ( info ) {
        console.log(info);
        $(".table tbody").html(template("tmp-product",info));
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:info.page,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function (a,b,c,page) {
            currentPage = page;
            render();
          }
        })
      }
    })
  }

  //点击添加分类
  $(".btn-add").on("click",function () {
    $("#addModal").modal("show");
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      dataType: "json",
      data:{
        page:1,
        pageSize:100
      },
      success: function ( info ) {
        console.log(info);
        $(".dropdown-menu").html(template("tmp-dropdown",info));
      }
    })
  })


})