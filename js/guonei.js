$(function () {
  $.ajax({
    url:"http://193.112.55.79:9090/api/getinlanddiscount",
    type:"get",
    dataType: "json",
    success: function (res) {
      console.log(res);
      var htmlStr = template("guoneizhekou", {
          data: res.result
      })
      // console.log(htmlStr);
      
      // console.log(htmlStr); 
      $(".hand ul").html(htmlStr);
    }
  })

  
})