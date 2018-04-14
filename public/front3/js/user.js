/**
 * Created by 赵春明 on 2018/4/10.
 */
$(function () {
  $.ajax({
    type: "get",
    url: "/user/queryUserMessage",
    dataType: "json",
    success: function ( info ) {
      if(info.error === 400) {
        //说明没有登录
        location.href = "login.html";
      }
      console.log(info);
      $("#userInfo").html(template("tmp-user",info));
    }
  })

  //点击退出功能，回到登录页
  $("#logoutBtn").on("click",function () {
    $.ajax({
      type: "get",
      url: "/user/logout",
      dataType: "json",
      success: function ( info ) {
        console.log(info);
        location.href = "login.html";
      }
    })
  })
})