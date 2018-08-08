//入口函数
$(function () {
  // 通过正则表达式获取的id值
  var id = getUrlParam("brandtitleid");


  // 十大商品列表数据请求
  $.ajax({
    type: "get",
    url: "http://193.112.55.79:9090/api/getbrand",
    data: {
      brandtitleid: id
    },
    dateType: "json",
    success: function (res) {
      var data = res.result;
      for (var j = 0; j < data.length; j++) {
        for (var i = 0; i < data.length - j-1; i++) {
            var num1=parseInt(data[i].brandInfo.substring(8));
            var num2=parseInt(data[i+1].brandInfo.substring(8));
            if (num1<num2) {
                var temp = data[i];
                data[i] = data[i + 1];
                data[i + 1] = temp;
            }
        }
    }
      var html = template('tenbrand', {
        data: data
      });

      $(".fontbrand").html(html);
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