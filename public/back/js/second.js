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
      url: "/category/querySecondCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function ( info ) {
        console.log(info);
        $(".table tbody").html(template("tmp-second",info));
        //进行分页初始化
        $("#paginator").bootstrapPaginator({
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
      $("#addModal").modal("show");
    //请求一级分类名称，渲染下拉菜单
    $.ajax({
      url: "/category/queryTopCategoryPaging",
      data: {
        page:1,
        pageSize:100
      },
      success:function ( info ) {
        console.log(info);
        $(".dropdown-menu").html(template("tmp-dropdown",info));
      }
    })
  })

  //注册委托事件 给a 添加点击事件
  $(".dropdown-menu").on("click","a",function () {
    var txt = $(this).text();
    $("#dropdownText").text(txt);
    var id = $(this).data("id");
    //console.log(id);
    $('[name="categoryId"]').val(id);
    //需要将验证状态给为VALID
    $("#form").data("bootstrapValidator").updateStatus("categoryId", "VALID");
  })

  //配置图片上传
  $("#fileupload").fileupload({
    dataType: "json",
    done: function ( e ,data ) {
      console.log(data);
      var picAddr = data.result.picAddr;
      $("#imgBox img").attr("src",picAddr);
      $('[name="brandLogo"]').val(picAddr);
      $("#form").data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }
  })

  //配置表单校验
  $("#form").bootstrapValidator({

    // 将默认的排除项, 重置掉 (默认会对 :hidden, :disabled等进行排除)
    excluded: [],

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //校验字段
    fields: {
      //品牌名称
      brandName: {
        //校验规则
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      categoryId: {
        validators: {
          notEmpty: {
            message: "请输入二级分类名称"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请上传图片"
          }
        }
      }
    }


  })

  //点击添加，获取表单的值，进行ajax请求，完成页面渲染
  $("#btn-add").on("click",function () {
    $.ajax({
      type: "post",
      url: "/category/addSecondCategory",
      data: $("#form").serialize(),
      success: function ( info ) {
        console.log(info);
        if ( info.success ) {
          $("#addModal").modal("hide");
          $("#form").data("bootstrapValidator").resetForm( true );
          currentPage = 1;
          render();
          $("#dropdownText").text("请选择一级分类");
          $("#imgBox img").attr("src","images/none.png");
        }
      }
    })
  })

})