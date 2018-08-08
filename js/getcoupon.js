$(function(){
    $(".bs-example-modal-sm").modal("show");
    $(".tip").on("click",function(){
        $(".bs-example-modal-sm").modal("hide")
    })
    $.ajax({
        url:"http://193.112.55.79:9090/api/getcoupon",
        type:"get",
        dataType:"json",
        success:function(res){
            console.log(res);
            var data = res.result;
            //控制模板
            var html = template('temp',{"data":data});
            console.log(html);
            $(".zuokeng").append(html);
        }
    })
})