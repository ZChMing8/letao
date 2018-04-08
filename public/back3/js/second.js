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
      }
    })
  }

  //点击添加分类
    $(".btn-add").on("click",function () {
      $("#addModal").modal("show");
      $.ajax({
        type: "get",
        url: "/category/queryTopCategoryPaging",
        data: {
          page: 1,
          pageSize: 100
        },
        success: function ( info ) {
          console.log(info);
          $(".dropdown-menu").html(template("tmp-dropdown",info));
        }
      })
    })
  //点击下拉框，将文字显示至一级分类，并将id储存至hidden中，以备后面使用
  //事件委托
  $(".dropdown-menu").on("click","a",function () {
    var txt = $(this).text();
    $("#dropdownText").text(txt);
    var id = $(this).data("id");
    $('[name="categoryId"]').val(id);
    $("#form").data("bootstrapValidator").updateStatus("categoryId", "VALID")
  })

  //上传图片功能
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      console.log(data);
      var picAddr = data.result.picAddr;
      $("#imgBox img").attr("src",picAddr);
      $('[name="brandLogo"]').val(picAddr);
      $("#form").data("bootstrapValidator").updateStatus("brandLogo","VALID")
    }
  });

  //配置表单验证
  $("#form").bootstrapValidator({
    //将默认的排除，去除掉（disabled , hidden, :not:visibile）
    excluded: [],
    //指定校验时的图标显示，默认是bootstrap的风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //指定校验字段、
    fields: {
      //校验name值
      brandName: {
        //校验规则
        validators: {
          //不能为空
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      categoryId: {
        //校验规则
        validators: {
          //不能为空
          notEmpty: {
            message: "请输入二级分类名称"
          }
        },
      },
      brandLogo: {
        //校验规则
        validators: {
          //不能为空
          notEmpty: {
            message: "请上传图片"
          }
        }
      }
    }
  })

  //进行表单提交，并请求ajax请求
  $("#form").on("success.form.bv",function () {
    //console.log(1);
    $.ajax({
      type: "post",
      url: "/category/addSecondCategory",
      data: $("#form").serialize(),
      success: function ( info ) {
          if (info.success) {
            $("#addModal").modal("hide");
            currentPage = 1;
            render();
            //清空form表单和图标提示
            $("#form").data("bootstrapValidator").resetForm( true );
            //重置一级菜单栏
            $("#dropdownText").text("请选择一级分类");
            //重置图片
            $("#imgBox img").attr("src","images/none.png");
          }
      }
    })
  })
})