/**
 * Created by Jepson on 2018/4/10.
 */

$(function() {
  // 进行本地存储操作
  // 约定: search_list 为键名

  // 功能1: 渲染搜索历史记录
  // 1. 读取本地历史记录里面的数组
  // 2. 结合模板引擎渲染

  // 一进入页面, 调用render()
  render();

  // 专门用于读取本地存储中的历史记录数组
  function getHistory() {
    // 保证将来处理的一定是一个数组
    var history = localStorage.getItem( "search_list" ) || '[]';
    var arr = JSON.parse( history );
    return arr;
  }

  // 专门用于读取数组, 进行页面渲染
  function render() {
    var arr = getHistory();
    // 由于template第二个参数, 必须是对象, 需要包装一下
    // 根据本地存储中的数组, 进行页面渲染
    $('.lt_history').html( template( "searchTpl", { arr: arr } ) )
  }


  // 功能2: 删除功能, 删除本地历史记录数组里面一项
  // 1. 给所有的删除按钮, 添加委托事件
  // 2. 获取索引
  // 3. 读取本地存储中的数组, 进行删除对应索引的那项
  // 4. 同步到本地存储中
  // 5. 页面也需要重新渲染
  $('.lt_history').on( "click", ".btn_delete", function() {
    var that = this;

    mui.confirm("你确认要删除么?", "温馨提示", ["确认", "取消"], function( e ) {
      // 点击了确认按钮
      if (e.index === 0) {
        // 索引
        var index = $(that).data( "index" );
        console.log(index);
        // 获取数组
        var arr = getHistory();
        // 删除数组中对应索引的项
        arr.splice( index, 1 );
        // 修改 search_list
        localStorage.setItem( "search_list", JSON.stringify( arr ) );
        // 重新渲染
        render();
        console.log(arr);
      }
    })
  });


  // 功能3: 清空功能
  // 1. 注册事件(事件委托做)
  // 2. 清掉本地存储中的search_list
  // 3. 页面重新渲染
  $('.lt_history').on("click", ".btn_empty", function() {
    // 参数1: 内容
    // 参数2: 标题
    // 参数3: 数组按钮
    // 参数4: 点击按钮后的回调
    mui.confirm("是否清空所有历史记录", "温馨提示", ["确认", "取消"], function( e ){
      console.log(e.index);
      if (e.index === 0) {
        // 点击了确认
        // 删掉了本地存储中的数据
        localStorage.removeItem( "search_list" );
        // 重新渲染
        render();
      }
    });
  });


  // 功能4: 添加功能
  // 1. 点击搜索按钮, 获取输入框的值
  // 2. 获取数组
  // 3. 将输入框的值, 添加到数组中的最前面
  // 4. 持久化到本地存储中, 修改 search_list
  // 5. 重新渲染页面
  $('.lt_search button').click( function() {
    // 获取搜索值
    var key = $('.lt_search input').val().trim();

    if ( key === "" ) {
      // 添加提示框
      mui.toast( "请输入搜索关键字" );
      return;
    }

    // 获取数组
    var arr = getHistory();

    // 需求:
    // 1. 不能重复
    // 2. 数组长度不超过 10 个

    // 不等于 -1, 说明在数组中可以找到 key, 说明重复了, 需要删除
    if ( arr.indexOf( key ) !== -1 ) {
      // 获取索引
      var index = arr.indexOf( key );
      // 删除
      arr.splice( index, 1 );
    }

    // 超过 10 个删除最后一项
    if ( arr.length >= 10 ) {
      arr.pop();
    }


    // 添加到数组最前面
    arr.unshift( key );

    // 持久化到本地存储中
    localStorage.setItem( "search_list", JSON.stringify( arr ) );
    // 重新渲染
    render();
    // 清空文本
    $('.lt_search input').val("");


    // 跳转到搜索列表页, 将搜索关键字传递到searchList.html
    location.href = "searchList.html?key=" + key;

  })


})
