$(function(){
    init();

    function init(){
        //需要执行的代码
        getmoneyctrlproduct();
        eventGet();
    }
    function eventGet(){
        //固定窗口 关闭按钮
        $(".close").on("tap",function(){
            $(".promotion_bar").fadeOut(1000);
        })
    }


    //获取国内折扣商品详情的数据
    function getmoneyctrlproduct(){
        //获取id
        var productid=location.search;
        console.log(productid);
        
        
        $.ajax({
            url:"http://193.112.55.79:9090/api/getmoneyctrlproduct"+productid+"",
            dataType:"json",
            success:function(res){
                console.log(res);
                var html = template("productTpl",{data:res.result});
                //渲染
                $(".cu_content").html(html);
            }

        })
    }
})