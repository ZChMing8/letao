/**
 * Created by 赵春明 on 2018/4/6.
 */


 require(['jquery','bootstrap','bootstrapValidator','common'],function () {
   // 1. 进行表单校验
   //    校验要求: (1) 用户名不能为空
   //             (2) 密码不能为空, 且必须是 6-12 位

   $("#form").bootstrapValidator({

     //配置图标
     feedbackIcons: {
       valid: 'glyphicon glyphicon-ok',
       invalid: 'glyphicon glyphicon-remove',
       validating: 'glyphicon glyphicon-refresh'
     },
     fields: {
       //验证用户名
       username: {
         validators: {
           notEmpty: {
             message: "用户名不能为空！"
           },
           stringLength: {
             min: 2,
             max: 6,
             message: "用户名必须是 2-6 位"
           },
           callback: {
             message: "用户名不存在"
           }
         }
       },
       //验证密码
       password: {
         validators: {
           notEmpty: {
             message: "密码不能为空！"
           },
           stringLength: {
             min: 6,
             max: 12,
             message: "密码必须是 6-12 位"
           },
           callback: {
             message: "密码错误"
           }
         }
       }
     }
   })

   var validator = $("#form").data("bootstrapValidator");//获取表单校验实例
   //通过ajax进行登录请求
   $("#form").on("success.form.bv",function ( e ) {
     e.preventDefault();
     $.ajax({
       type:"post",
       url:"/employee/employeeLogin",
       dataType:"json",
       data:$("#form").serialize(),
       success:function ( info ) {
         console.log(info);
         if (info.success) {
           //alert("登录成功");
           location.href = "index.html";
         }
         //设置提示文本
         if (info.error === 1000) {
           //1.参数1：字段名称 参数2：校验状态 参数3：校验规则，设置提示文本
           validator.updateStatus("username", "INVALID", "callback");
         }

         if(info.error === 1001) {
           validator.updateStatus("password", "INVALID", "callback");
         }
       }
     })
   })

   //重置功能实现
   $('[type="reset"]').on("click",function () {
     //console.log(1);
     validator.resetForm();
   })
 })
