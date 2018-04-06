/**
 * Created by 赵春明 on 2018/4/6.
 */


// 配置禁用小圆环
NProgress.configure({ showSpinner: false });

$(document).ajaxStart(function () {
    NProgress.start();
})

$(document).ajaxStop(function () {
    setInterval(function () {
      NProgress.done();
    },500)
})