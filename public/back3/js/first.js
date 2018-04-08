/**
 * Created by 赵春明 on 2018/4/7.
 */
$(function () {
  var currentPage = 1;
  var pageSize = 5;
  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page:currentPage,
        pageSize:pageSize
      },
      success: function ( info ) {
        console.log(info);
        $(".table tbody").html(template("tmp-first",info));
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (a,b,c,page) {
            currentPage = page;
            render();
          }
        })
      }
    })
  }

  //点击添加分类功能
  $(".btn-add").on("click",function () {
    $("#addModal").modal("show");
  })

  //配置form表单验证
  $("#form").bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: "一级分类不能为空"
          }
        }
      }
    }
  })

  $("#form").on("success.form.bv",function () {
    $.ajax({
      type: "post",
      url: "/category/addTopCategory",
      data: $("#form").serialize(),
      success: function ( info ) {
          if (info.success) {
            currentPage = 1;
            render();
            $("#addModal").modal("hide");
            $("#form").data("bootstrapValidator").resetForm( true );
          }
      }
    })
  })
})