$(function(){

  // 获取所有的品牌标题
  $.ajax({
    url: 'http://127.0.0.1:9090/api/getbrandtitle',
    success: function(info){
      console.log(info);
      var str = template('titlelist',info);
      $('.titleBox').html(str);
    }
  });
})