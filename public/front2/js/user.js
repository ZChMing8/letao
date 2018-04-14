/**
 * Created by Jepson on 2018/4/12.
 */

$(function() {

  // 一进入页面, 应该请求当前用户信息, 进行页面渲染
  // (1) 登录了, 获取用户信息, 渲染
  // (2) 如果没登陆, 应该跳转到登录页
  $.ajax({
    url: "/user/queryUserMessage",
    type: "get",
    success: function( info ) {

      // 说明没登陆
      if( info.error === 400 ) {
        // 跳转到登录页面
        location.href = "login.html"
        return;
      }
      console.log( info )
      $('#userInfo').html( template( "userTpl", info ) );
    }
  });


  $('#logoutBtn').click(function() {
    // 发送退出 ajax 请求
    $.ajax({
      url: "/user/logout",
      type: "get",
      success: function( info ) {
        if ( info.success ) {
          // 退出成功, 跳转到登录页
          location.href = "login.html";
        }
      }
    })

  })




})
