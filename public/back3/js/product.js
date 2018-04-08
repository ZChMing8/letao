/**
 * Created by 赵春明 on 2018/4/9.
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
        pageSize: pageSize
      },
      success: function ( info ) {
        console.log(info);
        $(".table tbody").html(template("tmp-product",info));
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage: info.page,
          totalPages: Math.ceil( info.total / info.size),
          numberOfPages: 3,
          onPageClicked: function (a,b,c,page) {
            currentPage = page;
            render();
          }
        })
      }
    })
  }
  
  //点击添加商品功能
  $(".btn-add").on("click",function () {
    $("#addModal").modal("show");
  })
})