$(function(){

  //获取分类标题数据渲染到页面中
  $.ajax({
    url: 'http://127.0.0.1:9090/api/getcategorytitle',
    dataType: 'json',
    type: 'get',
    success: function(info){
      // console.log(info);
      var htmlStr = template("titleList", info);
      $('.itemBox').html(htmlStr);


       //点击分类标题获取标题对应的分类列表然后渲染到页面上
       $('.item').on('click','a',function(){
        var titleid = $(this).data("titleid");
        var $that = $(this);
        // console.log(titleId);
        // alert(11);
        $.ajax({
          type:'get',
          dataType: 'json',
          url: 'http://127.0.0.1:9090/api/getcategory',
          data: {
            titleid: titleid
          },
          success:function(info){
            // console.log(info);
            // console.log($that);
            var str  = template('cateList',info);
            $that.next().html(str);
            $that.next().slideToggle();


          }


        });


       });




    }



  });





});