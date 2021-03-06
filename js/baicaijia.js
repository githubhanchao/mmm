$(function(){

  //获取白菜价标题列表
  $.ajax({
    url: 'http://127.0.0.1:9090/api/getbaicaijiatitle',
    success: function(info){
      // console.log(info);
      
      var htmlStr = template('navList',info);
      $('.mmb_bcjNav .navBox').html(htmlStr);

      // 区域滚动
      new IScroll('.mmb_bcjNav',{
        scrollX: true,
        scrollY: false,
        
      });

      // 标题点击事件
      $('.mmb_bcjNav').on('click','.navList',function(){
        $(this).addClass('active').siblings().removeClass('active');
        //获取当前被点击的标题id
        var titleId = $(this).find('a').data('titleid');
        // console.log(tt);
        
        //点击白菜价标题获取对应标题的商品列表
        $.ajax({
          url: 'http://127.0.0.1:9090/api/getbaicaijiaproduct',
          data: {
            titleid: titleId
          },
          success: function(info){
            console.log(info);
            var bcj = template('bcjList',info);
            $('.mmb_bcjContent .bcjBox').html(bcj);

          }
        });
      });
      //页面第一次加载时触发第一个标题的点击事件
      $('.navList').eq(0).trigger('click');
    }

  });

});