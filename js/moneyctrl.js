$(function () {
  var pageid = 0;
  var totalPage;
  var $next = $(".paging .next");
  var $prev = $(".paging .prev");
  var $curr = $(".paging .currPage");

  render();

  function render(pageid) {
    pageid = pageid || 0;
    $.ajax({
      url: "http://127.0.0.1:9090/api/getmoneyctrl",
      data: {
        pageid: pageid
      },
      success: function (data) {
        // console.log(data);
        //根据pageid获取数据渲染到页面中
        var str = template("moneyctrl", data);
        $(".mmb_moneyctrl .monCtrl").html(str);

        totalPage = Math.ceil(data.totalCount / data.pagesize);
        $(".paging .currPage span").text((pageid + 1) + "/" + totalPage);

        var page = template("pageCount", {
          pageCount: totalPage
        });
        $(".currPage .morePage").html(page);
      }
    })
  }


  $next.on("click", function () {
    pageid++;
    if (pageid >= totalPage) {
      pageid = totalPage;
    }
    render(pageid);
  })
  $prev.on("click", function () {
    pageid--;
    if (pageid <= 0) {
      pageid = 0;
    }
    render(pageid);
  })
  $curr.on("click", function () {
    $(this).find(".morePage").toggle();
  })
  $curr.on("click", ".morePage li", function () {
    pageid = $(this).index();
    render(pageid);
  })

});














// $(function(){

//     //获取首页列表数据
 

//      //实现三级菜单导航，根据分类id动态获取分类标题
//   var categoryid = categoryid || 1;

//     //封装函数，根据当前页数和分类id获取对应的商品列表
//   //根据商品列表总数，渲染分页标签的页数
//   function render(currentPage){
//     currentPage = currentPage || 0;

//     $.ajax({
//       url: "http://127.0.0.1:9090/api/getmoneyctrl",
//       data: {
//         categoryid: categoryid,
//         pageid: currentPage
//       },
//       success: function(info){
        
//         var str = template("getmoneyctrl", info);
//         $(".recom_content ul").html(str);
      
//         //计算总页数
//         pageCount = Math.ceil(info.totalCount/info.pagesize);
//         $('.currPage span').text((currentPage+1)+'/'+pageCount);

//          //将获取到的总页数包装成对象，结合模板引擎，动态渲染ul中li的个数
//          var page = template('pageCount', {
//            pageCount: pageCount
//          });
//          $('.paging .currPage .morePage').html(page);
//       }
//     });
//   }

//   //初始时即渲染
//   render();

//   var currentPage = 1;
//   var $next = $('.paging .next');
//   var $prev = $('.paging .prev');
//   var $curr = $('.paging .currPage');
//   var pageCount;

//   //点击下一页按钮，将当前页数+1，重新渲染页面
//   $next.on('click',function(){
//     currentPage++;
//     if(currentPage>=pageCount){
//       currentPage = 1;
//     }
   
    
//     render(currentPage-1);
    

//   });
//   //点击上一页按钮，将当前页数-1，重新渲染页面
//   $prev.on('click',function(){
//     currentPage--;
//     console.log(currentPage);
//     if(currentPage<=0){
//       currentPage = 0;
//     }
//     render(currentPage-1);

//   });

//   //点击当前页，切换分页标签
//   $curr.on('click',function(){
//     $(this).find('.morePage').toggle();

//   });

//   //点击分页标签，改变当前页数，重新渲染页面
//   $curr.on('click','.morePage li ', function(){
//     currentPage = $(this).index();
//     render(currentPage);

//   });




// })