/**
 * Created by 赵春明 on 2018/4/11.
 */
$(function () {
  //根据本地存储，来渲染页面
  //var history = localStorage.getItem("search_list");
  //var arr = JSON.parse( history );
  //console.log(arr);
  //
  //$(".lt_history").html(template("tmp",{list:arr}));

  render();
  //设置获取本地存储的方法
  function getHistory() {
    var history = localStorage.getItem("search_list") || "[]";
    var arr = JSON.parse( history );
    return arr;
  }

  //设置渲染页面的方法
  function render() {
    var arr = getHistory();
    $(".lt_history").html(template("tmp",{list:arr}));
  }

  //设置存储本地存储的方法
  function setHistory( arr ) {
    localStorage.setItem("search_list",JSON.stringify( arr ));
  }

  //注册委托事件，点击删除，删除本条记录
  $(".lt_history").on("click",".delete",function () {
    var that = this;
    mui.confirm("你确定要删除本条记录吗？","温馨提示",["确认","取消"],function ( e ) {
      if(e.index === 0) {
        var index = $(that).data("index");
        var arr = getHistory();
        arr.splice(index, 1);//先删除数组中的对应项
        setHistory(arr);
        render();
      }
    })
  });

  //注册委托事件，完成清空历史功能
  $(".lt_history").on("click",".empty",function () {
    mui.confirm("你确定要全部删除吗？","温馨提示",["确认","取消"],function ( e ) {
      //console.log( e );
      if (e.index === 0 ) {
        localStorage.removeItem( "search_list" );
        render();
      }
    })
  })

  //注册搜索功能
  $(".lt_search button").on("click",function () {
    var key = $(".lt_search input").val().trim();
    if( key === "" ) {
      mui.toast("请输入搜索内容!",{
        duration: 1000
      });
      return;
    }
    var arr = getHistory();
    if(arr.indexOf(key) !== -1) {
      var index = arr.indexOf(key);
      arr.splice(index,1);
    }
    if(arr.length >= 10) {
      arr.pop();
    }
    arr.unshift( key );
    setHistory( arr );
    render();
    $(".lt_search input").val("");
    location.href = "searchList.html?key="+key;
  })


})