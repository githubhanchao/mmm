$(function(){
  $.ajax({
    url: "http://127.0.0.1:9090/api/getinlanddiscount",
    success: function(info){
      // console.log(info);
      var htmlStr = template('inlanddiscount',info);
      $('.discountBox').html(htmlStr);

    }
  });
})