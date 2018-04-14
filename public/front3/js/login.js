/**
 * Created by 赵春明 on 2018/4/12.
 */
$(function () {
  $("#btn-login").on("click",function () {
    var username = $('[name="username"]').val().trim();
    var password = $('[name="password"]').val().trim();
    if(username === "") {
      mui.toast("请输入用户名");
      return;
    };
    if(password === "") {
      mui.toast("请输入密码");
      return;
    };
    $.ajax({
      type: "post",
      url: "/user/login",
      dataType: "json",
      data:{
        username: username,
        password: password
      },
      success: function ( info ) {
        console.log(info);
        if(info.error === 403) {
          mui.toast("用户名或者密码错误");
          return;
        }
        if(info.success) {
          //登录成功需要跳转，判断是不是拦截过来的
          if(location.search.indexOf("returnUrl") !== -1) {
            location.href = location.search.replace("?returnUrl=","");
          }else {
            location.href = "user.html";
          }
        }
      }
    })
  })
})