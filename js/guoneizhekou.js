$(function () {
  console.log(location.search.split("=")[1])
  var id =location.search.split("=")[1];
  $.ajax({
    url:"http://193.112.55.79:9090/api/getdiscountproduct",
    type:"get",
    dataType: "json",
    data:{
      productid:id
    },
    success: function (res) {
      // console.log(res);
      var htmlStr = template("zhekou", {
          data: res.result
      })
      // console.log(htmlStr);
      
      // console.log(htmlStr); 
      $(".details").html(htmlStr);
    }
  })

  // .get("http://193.112.55.79:9090/api/getinlanddiscount",function(res){
  //   var htmlStr = template("zhekou", {data: res.result})
  //               console.log(htmlStr);$
                
          
//   })
})