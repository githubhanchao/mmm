$(function () {

  //定义全局变量记录id
  var $shopid;
  var $areaid;

  $.ajax({
    url: 'http://127.0.0.1:9090/api/getgsshop',
    success: function (info) {
      // console.log(info);
      var htmlStr = template('shoplist', info);
      $('.shopBox').html(htmlStr);
    }
  });


  $.ajax({
    url: 'http://127.0.0.1:9090/api/getgsshoparea',
    success: function (info) {
      console.log(info);
      var str = template('arealist', info);
      $('.areaBox').html(str);

    }
  });

  //给导航栏按钮注册点击事件，点击时，对应下标的ul显示，其他ul隐藏
  $('.gsnavBox').on('click', '.gsnavList', function () {
    var $index = $(this).index();

    $('.select ul').eq($index).toggle();
    if ($('.select ul').eq($index).css('display') === "block") {
      $('.select ul').eq($index).siblings().hide();
    }


  });


  function render(shopid,areaid) {
    var shopid = shopid || 0;
    var areaid = areaid || 0;

    $.ajax({
      url: 'http://127.0.0.1:9090/api/getgsproduct',
      data: {
        shopid: shopid,
        areaid: areaid
      },
      success: function (info) {
        console.log(info);

        var htmlStr = template('conlist', info);
        $('.conBox').html(htmlStr);

      }



    });

  }

  render();


  //给下拉框中li注册点击事件，记录shopid和areaid。点击之后即发送ajax请求，获取对应的数据渲染到页面中
  $('.shopBox').on('click','li',function(){
    $shopid = $(this).data('shopid');
    $('.shopBox').hide();
    $('.gsnavBox .gsnavList').eq(0).find('span').text($(this).text());
    render($shopid,$areaid);
  });

  $('.areaBox').on('click','li',function(){
    $areaid = $(this).data('areaid');
    $('.areaBox').hide();
    var a = $(this).text().trim().slice(0,2);
    $('.gsnavBox .gsnavList').eq(1).find('span').text(a);
    render($shopid,$areaid);
  });

  $('.priceBox').on('click','li',function(){
    $('.priceBox').hide();
    render(0,0);

  });







});