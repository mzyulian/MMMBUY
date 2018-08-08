$(function(){
  innit();
  function innit(){
    getCateGoryById();
    getPageContent();
  }
  function getCateGoryById(){
    var cgId = location.search;
    $.ajax({
      "url":"http://193.112.55.79:9090/api/getcategorybyid"+cgId,
      "type":"get",
      "dataType":"json",
      success: function (res){
        // console.log(res);
        // 获取分类名称
        var htmlName = res.result[0].category;
        // console.log(htmlName);
        // 渲染页面
        $("#cateGoryName").html(htmlName);
        // 获取分类ID
        var categoryId = res.result[0].categoryId;
        // console.log(categoryId);
        var pageid = 1;
        $.get("http://193.112.55.79:9090/api/getproductlist",{"categoryid":categoryId,"pageid":pageid},function(res){
        // console.log(res);
        var htmlCategory = template("categoryListTmpl",{"res":res.result});
        $("#categoryList").html(htmlCategory);

        // 选择分页部分
        // 获取分页数
        var pageNum = Math.ceil(res.totalCount/res.pagesize);
        // console.log(pageNum);
        var htmlPage = template("selectPageTmpl",{"pageNum":pageNum});
        // console.log(htmlPage);
        $("#selectPage").html(htmlPage);
        },"json")
      }
    })
  }
  function getPageContent(){
    // 获取分类id
    var categoryId = location.search.substr(1).split("=")[1];
    // 转为数字类型
    categoryId = parseInt(categoryId);
    // 注册改变选择页码数时间
    $("#selectPage").change(function(){
      // 获取当前页码数
      var opt=parseInt($("#selectPage").val());
      // console.log(opt);
      // 发送请求获取数据
      $.get("http://193.112.55.79:9090/api/getproductlist",{"categoryid":categoryId,"pageid":opt},function(res){
        // console.log(res);
        // 渲染页面
        var htmlCategory = template("categoryListTmpl",{"res":res.result});
        $("#categoryList").html(htmlCategory);
      },"json")
    });
    //下一页部分
    $(".nextPage").tap(function(){
      // 获取总的选项数
      var selectPageChildren = $("#selectPage").children();
      // console.log(selectPageChildren.length);
      // console.log(123);
      // 转为数字类型
      var opt=parseInt($("#selectPage").val());
      // 大于页码数时候阻止执行
      if(opt == selectPageChildren.length){
        return false;
      }
      // 下一页
      opt+=1;
      $("#selectPage").val(opt);
      // console.log(opt);
      $.get("http://193.112.55.79:9090/api/getproductlist",{"categoryid":categoryId,"pageid":opt},function(res){
        // console.log(res);
        // 渲染页面
        var htmlCategory = template("categoryListTmpl",{"res":res.result});
        $("#categoryList").html(htmlCategory);
      },"json")
    })
    
    //上一页部分
     $(".upPage").tap(function(){
      //  获取当前页码
      var opt=parseInt($("#selectPage").val());
      if(opt == 1){
        return false;
      }
      opt-=1;
      $("#selectPage").val(opt);
      // console.log(opt);
      $.get("http://193.112.55.79:9090/api/getproductlist",{"categoryid":categoryId,"pageid":opt},function(res){
        // console.log(res);
        var htmlCategory = template("categoryListTmpl",{"res":res.result});
        $("#categoryList").html(htmlCategory);
      },"json")
    })
  }
})