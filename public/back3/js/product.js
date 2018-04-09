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
          },
          itemTexts: function (  type, page, current ) {
            //console.log(type, page, current);
            //next下一页 last尾页 first首页 prev上一页 page 当前页
            //page是当前按钮指向第几页，current是当前第几页（相对于整个分页）
            switch ( type ) {
              case "next" :
                return "下一页";
              case "last" :
                return "尾页";
              case "first" :
                return "首页";
              case "prev" :
                return "上一页";
              case "page" :
                return page;
            }
          },
          tooltipTitles: function (  type, page, current ) {
            //console.log(type, page, current);
            //next下一页 last尾页 first首页 prev上一页 page 当前页
            //page是当前按钮指向第几页，current是当前第几页（相对于整个分页）
            switch ( type ) {
              case "next" :
                return "下一页";
              case "last" :
                return "尾页";
              case "first" :
                return "首页";
              case "prev" :
                return "上一页";
              case "page" :
                return "前往第"+page+"页";
            }
          },
          useBootstrapTooltip: true
        })
      }
    })
  }
  
  //点击添加商品功能
  $(".btn-add").on("click",function () {
    $("#addModal").modal("show");
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      dataType: "json",
      data:{
        page: 1,
        pageSize: 100
      },
      success: function ( info ) {
        console.log(info);
        $(".dropdown-menu").html(template("tmp-dropdown",info));
      }
    })
  })

  //注册事件委托，点击下拉菜单每一项
   $(".dropdown-menu").on("click","a",function () {
     $("#dropdownText").text( $(this).text() );
     var id = $(this).data("id");
     $('[name="brandId"]').val(id);
     $("#form").data("bootstrapValidator").updateStatus("brandId","VALID");
   })

  var picArr = [];//储存文件对象
  //设置文件上传
  $("#fileupload").fileupload({
    dataType: "json",
    done: function ( e,data ) {
      console.log(data);
      //获得的data.result是一个对象，包含了图片地址和名字
      var picObj = data.result;
      var picAddr = picObj.picAddr;
      picArr.unshift(picObj);
      $("#imgBox").prepend('<img src="'+ picAddr +'" width="100">');
      if( picArr.length > 3 ) {
        picArr.pop();//删除数组的最后一项
        $("#imgBox img:last-of-type").remove();
      }
      $("#form").data("bootstrapValidator").updateStatus("picStatus","VALID");
    }
  })

  //进行form表单的校验功能
  $("#form").bootstrapValidator({
    // 将默认的排除项, 重置掉 (默认会对 :hidden, :disabled等进行排除)
    excluded: [],

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      //二级分类
      brandId: {
        validators: {
          notEmpty: {
            message: "二级分类不能为空"
          }
        }
      },
      //商品名称
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      //商品描述
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      //商品库存
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: "商品库存格式，必须是非零的数字"
          }
        }
      },
      //商品尺寸
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品尺码"
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: "商品尺寸格式，必须是 数字且 xx-xx"
          }
        }
      },
      //商品原价
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
      //商品现价
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品现价"
          }
        }
      },
      //教研图片是否为3张
      picStatus: {
        validators: {
          notEmpty: {
            message: "请上传三张图片"
          }
        }
      },
    }
  })

  //设置表单上传功能，请求ajax
  $("#form").on("success.form.bv",function ( e ) {
    e.preventDefault();
    var dataStr = $(this).serialize();
    //console.log(dataStr);
    //需要在dataStr后面继续拼接参数
    //&picName1=xx&picAddr1=xx
    dataStr += "&picName1="+ picArr[0].picName +"&picAddr1="+ picArr[0].picAddr;
    dataStr += "&picName2="+ picArr[1].picName +"&picAddr2="+ picArr[1].picAddr;
    dataStr += "&picName3="+ picArr[2].picName +"&picAddr3="+ picArr[2].picAddr;
    $.ajax({
      type: "post",
      url: "/product/addProduct",
      dataType: "json",
      data:dataStr,
      success: function ( info ) {
        console.log(info);
        //关闭模态框
        $("#addModal").modal("hide");
        //清空表单数据
        $("#form").data("bootstrapValidator").resetForm( true );
        //重新渲染页面，第一页
        currentPage = 1;
        render();
        //重置二级分类
        $("#dropdownText").text("请选择二级分类");
        //删除图片，并清空数组
        $("#imgBox img").remove();
        picArr = [];
      }
    })
  })
})