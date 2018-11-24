$(function(){
  var brandtitleid = GetUrlParms().brandtitleid || 1;
  //根据品牌id获取品牌标题
  $.ajax({
    url: 'http://127.0.0.1:9090/api/getbrand',
    data: {
      brandtitleid: brandtitleid
    },
    success: function(info){
      // console.log(info);
      var htmlStr = template('brandlist',info);
      $('.brandBox').html(htmlStr);

    }
  });

  //根据品牌id获取对应的商品列表
  $.ajax({
    url: 'http://127.0.0.1:9090/api/getbrandproductlist',
    data: {
      brandtitleid: brandtitleid
    },
    success: function(info){
      // console.log(info);
      var htmlStr = template('salelist',info);
      $('.saleBox').html(htmlStr);

    }



  });


  //根据商品id获取对应商品的评论
  $.ajax({
    url: 'http://127.0.0.1:9090/api/getproductcom',
    data: {
      productid: 0
    },
    success: function(info){
      console.log(info);
      
      var str = template('comlist',info);
      $('.comBox').html(str);

    }

  });





});