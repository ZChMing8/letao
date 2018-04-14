/**
 * Created by 赵春明 on 2018/4/10.
 */
require(['jquery','template','bootstrap','bootstrapValidator','bootstrapPaginator','common','jqueryFileupload'],function ($,template) {
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

  //注册事件委托，设值二级分类
  $(".dropdown-menu").on("click","a",function () {
    $("#dropdownText").text($(this).text());
    $('[name="brandId"]').val($(this).data("id"));
  })

  //设值图片上传功能
  var picArr = [];
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      //console.log(data);
      var picObj = data.result;
      var picAddr = picObj.picAddr;
      picArr.unshift(picObj);
      $("#imgBox").prepend('<img src="'+ picAddr +'" width="100">');
      if(picArr.length > 3) {
        picArr.pop();
        $("#imgBox img:last-of-type").remove();
      }
      $("#form").data("bootstrapValidator").updateStatus("picStatus","VALID");
    }
  });

  //设值表单校验功能
  $("#form").bootstrapValidator({
    // 将默认的排除项, 重置掉 (默认会对 :hidden, :disabled等进行排除)
    excluded: [],

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //指定校验字段
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类名"
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: "请输入非0开头的数字"
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品尺码"
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: "请按照 xx-xx 的格式填写 x为数字"
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品现价"
          }
        }
      },
      picStatus: {
        validators: {
          notEmpty: {
            message: "请上传三张图片"
          }
        }
      }
    }
  })
  
  //进行表单成功的校验
  $("#form").on("success.form.bv",function ( e ) {
    e.preventDefault();
    //需要将表单的name值与图片详细信息进行拼接
    var dataStr = $(this).serialize();
    //需要在dataStr后面拼接 $picAddr=xx$picName=xx 这样形式的参数
    dataStr += "&picAddr1="+ picArr[0].picAddr +"&picName1="+ picArr[0].picName;
    dataStr += "&picAddr2="+ picArr[1].picAddr +"&picName2="+ picArr[1].picName;
    dataStr += "&picAddr3="+ picArr[2].picAddr +"&picName3="+ picArr[2].picName;
    console.log(dataStr);
    $.ajax({
      type: "post",
      url: "/product/addProduct",
      dataType: "json",
      data:dataStr,
      success: function ( info ) {
        console.log(info);
        if (info.success) {
          $("#addModal").modal("hide");
          currentPage = 1;
          render();
          $("#form").data("bootstrapValidator").resetForm( true );
          $("#dropdownText").text("请选择二级分类");
          picArr = [];
          $("#imgBox img").remove();
        }
      }
    })
  })
})