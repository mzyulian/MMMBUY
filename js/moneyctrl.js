$(function(){
    init();

    function init(){
        //需要执行的代码
        getmoneyctrl();
        eventGet();
    }
    //注册事件
    function eventGet(){
        //固定窗口 关闭按钮
        $(".close").on("tap",function(){
            $(".promotion_bar").fadeOut(1000);
        })
    }
    //获取商品列表的数据
    function getmoneyctrl(){
        //使用zepto发送请求
        //商品列表数据
        $.ajax({
            url:"http://193.112.55.79:9090/api/getmoneyctrl",
            // data:{"productId":id},
            dataType:"json",
            success:function(res){
                // console.log(res);
                //template(模板的id,要渲染的数据)
                var html = template("getTpl",{arr:res.result});
                //渲染
                $(".gools ul").html(html);
                var pageCount=res.totalCount
                var pageSize=res.pagesize
                var page=Math.ceil(pageCount/pageSize);
                var page_tmp=template('tmpSelect',{"data":page})
                $("#selectPage").html(page_tmp);
                changePage(page)
            }
        })
        
    }
     //点击 翻页
     function changePage(page){
         
        // var pageindex=1;
        // $('.next').tap(function(){
        //     pageindex++;
        //     if(pageindex>page){
        //         return false;
        //     }
        //     //渲染select
        //     $('#selectPage').val(pageindex);
        //     console.log(pageindex);
        //     //ajax
        //     $.ajax({
        //         type: "get",
        //         url: "http://193.112.55.79:9090/api/getmoneyctrl",
        //         data: {pageid:pageindex},
        //         dataType: "json",
        //         success: function (res) {
        //             // console.log(res);
        //             $(".gools ul").empty();
        //            var html1 = template("getTpl",{arr:res.result});      
        //             //渲染
        //             $(".gools ul").html(html1);

        //         }
        //     });
            
        // })
        //翻页减少
        // $('.pre').tap(function(){
        //     pageindex--;
        //     if(pageindex<1){
        //         return false;
        //     }
        //     $('#selectPage').val(pageindex);
        //     $.ajax({
        //         type: "get",
        //         url: "http://193.112.55.79:9090/api/getmoneyctrl",
        //         data: {pageid:pageindex},
        //         dataType: "json",
        //         success: function (res) {
        //             // console.log(res);
        //             $(".gools ul").empty();
        //            var html2 = template("getTpl",{arr:res.result});      
        //             //渲染
        //             $(".gools ul").html(html2);

        //         }
        //     });

        // })
        //选择翻页
        $('#selectPage').change(function(){
            var pageid=($(this).val());
            pageid=pageid-1;
            // console.log(pageid);
            $.get("http://193.112.55.79:9090/api/getmoneyctrl",{"pageid":pageid},function(res){
                // console.log(res);
                var htmlList = template("getTpl",{arr:res.result});
                $(".gools ul").html(htmlList);
            },"json")
        })
        $(".next").tap(function(){
            var selectPageChildren = $("#selectPage").children();

            var pageid=parseInt($("#selectPage").val());
            if(pageid == selectPageChildren.length){
                return false;
            }
            // pageid=pageid+1;
            // console.log(pageid);
            $.get("http://193.112.55.79:9090/api/getmoneyctrl",{"pageid":pageid},function(res){
                // console.log(res);
                var htmlList = template("getTpl",{arr:res.result});
                $(".gools ul").html(htmlList);
                $("#selectPage").val(pageid+1);
            },"json")
        })
        $(".pre").tap(function(){
            var pageid=parseInt($("#selectPage").val());
            if(pageid == 1){
                return false;
            }
            pageid=pageid-2;
            $.get("http://193.112.55.79:9090/api/getmoneyctrl",{"pageid":pageid},function(res){
                // console.log(res);
                var htmlList = template("getTpl",{arr:res.result});
                $(".gools ul").html(htmlList);
                $("#selectPage").val(pageid+1);
            },"json")
        })
     }
})