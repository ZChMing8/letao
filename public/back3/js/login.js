/**
 * Created by 赵春明 on 2018/4/6.
 */
$(function () {
  // 1. 进行表单校验
  //    校验要求: (1) 用户名不能为空
  //             (2) 密码不能为空, 且必须是 6-12 位

  $("#form").bootstrapValidator({

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //指定校验字段
    fields: {
      username: {
        validators: {
          notEmpty: {
            message: "用户名不能为空"
          },
          stringLength: {
            min: 2,
            max: 6,
            message: "请输入 2-6 个字符"
          },
          callback: {
            message: "用户名错误"
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: "密码不能为空"
          },
          stringLength: {
            min: 6,
            max: 12,
            message: "请输入 6-12 个字符"
          },
          callback: {
            message: "密码错误"
          }
        }
      }
    }
  })

  $("#form").on("success.form.bv",function ( e ) {
    e.preventDefault();
    //console.log(1);
    $.ajax({
      type: "post",
      url : "/employee/employeeLogin",
      dataType: "json",
      data: $("#form").serialize(),
      success: function ( info ) {
        console.log(info);
        if(info.error === 1000) {
          $("#form").data("bootstrapValidator").updateStatus("username","INVALID","callback");
        }
        if(info.error === 1001) {
          $("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback");
        }
        if(info.success) {
          location.href = "index.html";
        }
      }
    })
  })
  
  //重置功能
  $('[type="reset"]').on("click",function () {
    $("#form").data("bootstrapValidator").resetForm();
  })
})