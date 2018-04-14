/**
 * Created by 赵春明 on 2018/4/10.
 */
$(function () {

  var key = getSearch("key");
  $(".lt_search input").val(key);
  render();

  //点击搜索功能，渲染页面，将搜索记录储存值本地，并保存
  $(".lt_search button").on("click",function () {
    render();
    var key = $(".lt_search input").val().trim();
    if (key === "") {
      mui.toast("请输入搜索内容!",{
        duration: 1000
      });
      return;
    }
    var arr = getHistory();
    if (arr.indexOf( key ) !== -1) {
      var index = arr.indexOf( key );
      arr.splice(index, 1);
    }
    if (arr.length >= 10) {
      arr.pop();
    }
    arr.unshift( key );
    setHistory( arr );
    //$(".lt_search input").val( arr[0] );//重新设值input的值

  });


  //点击排序功能进行排序
  $(".lt_sort a[data-type]").on("click",function () {
    //判断是否有current这个类
    if ($(this).hasClass("current")) {
      $(this).find("i").toggleClass("fa-angle-up").toggleClass("fa-angle-down");
    }else {
      //说明没有这个类
      $(this).addClass("current").siblings().removeClass("current");
      $(".lt_sort a").find("i").addClass("fa-angle-down").removeClass("fa-angle-up");
    }
    render();
  })

  function render() {
    $(".lt_product").html('<div class="boxload"></div>');
    var params = {};
    params.proName = $(".lt_search input").val();
    params.page = 1;
    params.pageSize = 100;

    //判断是否被选中
    var $current = $(".lt_sort .current");
    if ($current.length > 0) {
      var sortName = $current.data("type");
      var sortValue = $current.find("i").hasClass("fa-angle-up") ? 1 : 2;
      params[ sortName ] = sortValue;
    }
    setTimeout(function () {
      $.ajax({
        type: "get",
        url: "/product/queryProduct",
        dataType: "json",
        data:params,
        success: function ( info ) {
          console.log(info);
          $(".lt_product").html(template("tmp-product",info));
        }
      })
    },400);
  }
})