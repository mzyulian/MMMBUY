//入口函数
$(function() {
    // 通过正则表达式获取的id值
    var id = getUrlParam("brandtitleid");
    console.log(id);
  
  // 4种商品列表数据请求
    $.ajax({
      type: "get",
      url: "http://193.112.55.79:9090/api/getbrandproductlist",
      data: {"brandtitleid":id},
      dataType: "json",
      success: function(res) {
        var html=template('salebrand',{data:res.result});      
        $(".sale-details").html(html); 

        var pid = res.result[0].productId;
       $.get("http://193.112.55.79:9090/api/getproductcom",{"productid":pid},function(res){
         
          var message=template('commentmore',{arr:res.result});
          $('.commentdetail').html(message);
         
       },"json")
      }
    });
  
  
  
    // 获取传入参数的封装函数
    function getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    }
  });
  