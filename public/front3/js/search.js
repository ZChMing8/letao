/**
 * Created by 赵春明 on 2018/4/10.
 */
$(function () {
  //获取本地存储历史，并转化成数组
  //var history = localStorage.getItem("search_list");
  //console.log(history);
  //var arr = JSON.parse( history );
  //console.log(arr);
  //
  ////根据获得的数组，动态渲染页面
  //$(".lt_history").html(template("tmp-search",{ list:arr }));


  //进入页面，先渲染一次
  render();
  //因为后面的操作都需要用到获取本地存储和动态渲染，所以封装一下


  //点击x,将对应的一行内容删除
  $(".lt_history").on("click",".delete",function () {
    var that = this;
    mui.confirm("你确定要删除本条记录吗？","温馨提示",["确认","取消"],function ( e ) {
      if(e.index === 0) {
        //1.获取点击的索引
        var index = $(that).data("index");
        //console.log(index);
        //2.获取本地存储数据
        var arr = getHistory();
        //3.删除index对应的数据
        arr.splice(index, 1);
        //修改search_list
        //localStorage.setItem("search_list",JSON.stringify( arr ));
        setHistory( arr );
        //重新渲染
        render();
      }
    })
  })

  //点击清空历史记录功能
  $(".lt_history").on("click",".clear",function () {
    mui.confirm("你确定要全部删除吗？","温馨提示",["确认","取消"],function ( e ) {
      console.log( e );
      if (e.index === 0 ) {
        localStorage.removeItem( "search_list" );
        render();
      }
    })
  })

  //点击搜索按钮，将input的值储存到本地，然后进行取值，渲染
  $(".lt_search button").on("click",function () {
    var key = $(".lt_search input").val().trim();
    //判断input是否为空
    if( key === "" ) {
      mui.toast("请输入搜索内容!",{
        duration: 1000
      });
      return;
    }
    var arr = getHistory();
    if (arr.indexOf( key ) !== -1) {
      //获取索引 indexOf()方法，如果原数组有这个值，则返回该索引
      var index = arr.indexOf( key );
      arr.splice(index, 1);
    }
    if (arr.length >= 10) {
      arr.pop();
    }
    arr.unshift( key );
    setHistory( arr );
    render();
    $(".lt_search input").val("");
    location.href = "searchList.html?key="+key;
  });


  //点击商品，直接跳转到商品搜索页
  $(".lt_history").on("click",".go_searchList",function () {
    var key = $(this).text();
    location.href = "searchList.html?key="+key;
  })
})