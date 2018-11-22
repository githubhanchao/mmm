$(function(){

  //实现三级菜单导航，根据分类id动态获取分类标题
  var categoryid = GetUrlParms().categoryid || 1;
  $.ajax({
    url: 'http://127.0.0.1:9090/api/getcategorybyid',
    data: {
      categoryid: categoryid
    },
    success: function(info){
      var str = template('getcategorybyid', info);
      $('.mmb_productlist .three').html(str);
      // console.log(info);
    }


  });


   //封装函数，根据当前页数和分类id获取对应的商品列表
  //根据商品列表总数，渲染分页标签的页数
  function render(currentPage){
    currentPage = currentPage || 1;

    $.ajax({
      url: 'http://127.0.0.1:9090/api/getproductlist',
      data: {
        categoryid: categoryid,
        pageid: currentPage
      },
      success: function(info){
        var str = template('productlist',info);
        $('.mmb_productlist .proItemBox').html(str);
        // console.log(info);
        //计算总页数
        pageCount = Math.ceil(info.totalCount/info.pagesize);
        $('.currPage span').text(currentPage+'/'+pageCount);

         //将获取到的总页数包装成对象，结合模板引擎，动态渲染ul中li的个数
         var page = template('pageCount', {
           pageCount: pageCount
         });
         $('.paging .currPage .morePage').html(page);
      }
    });
  }

  //初始时即渲染
  render();

  var currentPage = 1;
  var $next = $('.paging .next');
  var $prev = $('.paging .prev');
  var $curr = $('.paging .currPage');
  var pageCount;

  //点击下一页按钮，将当前页数+1，重新渲染页面
  $next.on('click',function(){
    currentPage++;
    if(currentPage>=pageCount){
      currentPage = pageCount;
    }
    render(currentPage);

  });
  //点击上一页按钮，将当前页数-1，重新渲染页面
  $prev.on('click',function(){
    currentPage--;
    if(currentPage<=0){
      currentPage = 1;
    }
    render(currentPage);

  });

  //点击当前页，切换分页标签
  $curr.on('click',function(){
    $(this).find('.morePage').toggle();

  });

  //点击分页标签，改变当前页数，重新渲染页面
  $curr.on('click','.morePage li ', function(){
    currentPage = $(this).index+1;
    render(currentPage);

  });





})