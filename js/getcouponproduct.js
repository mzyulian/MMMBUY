$(function(){
    getid();
    lunbo();
    //裁剪不要的东西
    function getid(){
    //首先先获得请求行上的数据
    var searchStr = location.search;
    // console.log(searchStr);
    var flag;
    //获得是这句 ?id=0&name=%E8%82%AF%E5%BE%B7%E5%9F%BA
    var obj = {};
    //将他变成需要的id
    var itemArr = searchStr.substr(1).split("&");
    // console.log(itemArr);
    for(var i = 0;i<itemArr.length;i++){
        var item = itemArr[i].split("=");
        obj[item[0]] = item[1];
    }
    var id = obj["id"];
    // console.log(id);
    // 将一串十六进制的代码转换为汉子
    var tt = obj["name"];
    var flag = decodeURI(tt);
    // console.log(flag);
    //我们现在已经分隔好了数据了 发送ajax请求
    $.ajax({
        url:"http://193.112.55.79:9090/api/getcouponproduct",
        type:"get",
        data:{"couponid": id},
        dataType:"json",
        success:function(res){
            console.log(res);
            var data = res.result;
            // console.log(data);
            //连接模板
            var html = template("temp",{"data":data});
            //插入模板
            $(".info").html(html);
            //把title标签也要设置上
            $("header .title h1").html(flag + "优惠券");

            // 获取图片 轮播
            var imgList = template("imglast",{"data":data});
            // console.log(imgList);
            // 插入到页面上
            $('.carousel-inner').html(imgList);
        }
    })
    }
    //轮播图
    function lunbo(){
        
    // 模态框
    $('.modal').on('hide.bs.modal', function (e) {
        // 当模态框被隐藏的时候 同时也要关闭轮播图 免的太耗费性能同时也要恢复到第一个 每次关闭点开都这样
        $("#carousel-example-generic").carousel('pause');
        //现在可以停止了轮播 但是在一打开模态框 他也不动了 
        // console.log(123);
      })
      $('.modal').on('show.bs.modal', function (e) {
        // 当模态框被隐藏的时候 同时也要关闭轮播图 免的太耗费性能同时也要恢复到第一个 每次关闭点开都这样
        console.log(123);
        //一打开的时候从左默认往右
        $("#carousel-example-generic").carousel(0).carousel('cycle');
        setTimeout(function () {
            $(".carousel-inner").find(".item:first-of-type").addClass("active");
        }, 100)
      })

    }

})