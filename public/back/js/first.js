/**
 * Created by 赵春明 on 2018/4/7.
 */





require(['jquery','template','bootstrap','bootstrapValidator','bootstrapPaginator','common'],function ($,template) {
  var currentPage = 1;
  var pageSize = 5;
  render();
  function render() {
    $.ajax({
      url: "/category/queryTopCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function ( info ) {
        console.log(info);
        $(".table tbody").html(template("tmp-first",info));
        //分页初始化
        $("#paginator").bootstrapPaginator({
          //版本
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil( info.total / info.size ),
          onPageClicked: function (a,b,c,page) {
            currentPage = page;
            render();
          }
        })
      }
    })
  }

  //添加分类功能
  $(".btn-add").on("click",function () {
    //让模态框显示
    $("#addModal").modal("show");
  })

  //通过校验插件，添加校验功能
  $("#form").bootstrapValidator({

    //小图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: "请输入一级分类"
          }
        }
      }
    }
  })

  //点击确定按钮，进行表单提交，然后进行ajax请求，并渲染页面
  $("#form").on("success.form.bv",function () {
    $.ajax({
      type: "post",
      url: "/category/addTopCategory",
      data: $("#form").serialize(),
      success: function ( info ) {
        console.log(info);
        if ( info.success ) {
          //让模态框隐藏
          $("#addModal").modal("hide");
          currentPage = 1;
          render();
          $("#form").data("bootstrapValidator").resetForm( true );
        }
      }
    })
  })
})
