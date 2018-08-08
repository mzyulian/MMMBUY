$(function(){
  
$.ajax({
    type:'get',
    url:"http://193.112.55.79:9090/api/getsitenav",
    dateType:"json",
    success:function(res){
        var message=template('endmore',{arr:res.result});
        console.log(message);
        $('.brandmain-ul').html(message);
    }
})






})