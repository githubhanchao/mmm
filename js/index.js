$(function(){
  //获取首页菜单栏数据
  $.ajax({
    type:'get',
    url: 'http://127.0.0.1:9090/api/getindexmenu',
    dataType:'json',
    success: function(info){
      // console.log(info);
      var htmlStr = template('getindexmenu',info);
      $('.mmb_nav ul').html(htmlStr);

       //点击更多按钮，切换第三行导航栏数据的显示与隐藏
       var $more = $(".mmb_nav .nav.more");
      // E[att~="val"]选择具有att属性且属性值为一用空格分隔的字词列表，
      // 其中一个等于val的E元素。
      $hide = $(".mmb_nav .nav.more ~ .nav");
      //  var $hide = $('.mmb_nav .nav');
      $more.on("click",function(){
        $hide.toggleClass("hide");
      })
    }


  });


  //获取首页列表数据
  $.ajax({
    url: "http://127.0.0.1:9090/api/getmoneyctrl",
    success: function (data) {
      console.log(data);
      var str = template("getmoneyctrl", data);
      $(".recom_content ul").html(str);
    }
  })


   //当点击跳转链接后，回到页面顶部位置
   $(".toTop").click(function(){
    $('body,html').animate({scrollTop:0},1000);
    return false;
  });








})