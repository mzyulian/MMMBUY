$(function(){
    init();
    //声明两个全局变量
    var shopId ;
    var areaId;
    //把需要执行的东西放到这里面来
    function init(){
        shop();
        ulclick();
    }  
    function shop(){
        //发送ajax请求 获得店铺信息
    $.get("http://193.112.55.79:9090/api/getgsshop",function(res){
        //通过ajax请求获得了7个数据
        // console.log(res);
        var data =res.result;
        // console.log(data);
        var html = template("shopList",{"data":data});
        // console.log(html);
        $(".getShop ul").html(html);
        area();
    },"json");
    }
    //发送ajax请求获得地区信息
    function area(){
        $.get("http://193.112.55.79:9090/api/getgsshoparea",function(res){
        //通过ajax请求获得了7个数据
        // console.log(res);
        var data =res.result;
        // console.log(data);
        var html = template("areaList",{"data":data});
        // console.log(html);
        $(".getArea ul").html(html);
        getlast(shopId,areaId);
        titleClick(shopId,areaId);
    },"json");
    }
    //最后根据两个的id来刷选数据
    function getlast(shopId,areaId){
        $.get("http://193.112.55.79:9090/api/getgsproduct",
        {"shopid": shopId || 0,
        "areaid": areaId || 0},
        function(res){
            // console.log(res);
            var html = template("goodsList",{"data":res.result});
            $(".goods ul").html(html);
        },'json')
    }
        //点击出现下拉菜单
        function ulclick(e){
            $(".find ul").on('click',">li",function(e){
                //获取到当前点击的是谁 然后他就显示出来 其他兄弟就隐藏
                var index = $(this).index();
                // console.log(index);
                $(".screen .xl:eq("+index+")").toggle().siblings('.xl').hide();
            })
        }
        //点击选中筛选
        function titleClick(shopId,areaId){
                //因为xl都是动态完成的 要委托给a标签才能搞定异步的问题
            $(".xl").on("click","a",function(){
                
                if($.isNumeric($(this).data("shopid"))) {
                    //传到全局变量中
                    shopId = $(this).data("shopid");
                    //同时修改名字
                    $(".jd>a").html($(this).html());
                }
                else if($.isNumeric($(this).data("areaid"))) {
                    //传到全局变量中
                    areaId = $(this).data("areaid");
                    // console.log(areaId);
                    //同时修改名字
                    $(".dy>a").html($.trim($(this).html()).substr(0,2));
                    // console.log($(this).html());
                } else {
                    return ;
                }
                //当选择完这两个属性的时候就隐藏菜单
                $(this).closest(".getShop,.getArea").hide();
                getlast(shopId,areaId);
            })
        }
})