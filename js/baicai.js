// table栏
onload = function () {
    bcjnav();

    function bcjnav() {
        var bcj_nav = document.querySelector('.bcj-nav ul');
        var myScroll = new IScroll('.bcj-nav', {
            eventPassthrough: true,
            scrollX: true,
            scrollY: false,
            preventDefault: false
        });
        itcast(bcj_nav).tap(function (e) {
            var liDom = e.target;
            myScroll.scrollToElement(liDom);
            activeLi(liDom);

            getInfo($(liDom).attr("data-titleidid"));
        });

        function activeLi(dom) {
            $(".bcj-nav-bar li a").removeClass("active");
            $(dom).addClass("active");
        }
    }
}

// table栏
// $.ajax({
//     url: "http://193.112.55.79:9090/api/getbaicaijiatitle",
//     type: 'get',
//     dataType: 'json',
//     success: function(res) {
//         // console.log(res);
//         var listIndex = res.result;
//         // console.log(listIndex);
//         var htmlStr = template("templateBaiList", { data: listIndex });
//         // console.log(htmlStr);
//         // 渲染页面
//         $(".bcj-nav ul").html(htmlStr);
//     }
// })



// 白菜导航栏模板主体内容部分
// $.ajax({
//     url: 'http://193.112.55.79:9090/api/getbaicaijiaproduct',
//     type: 'get',
//     dataType: 'json',
//     data: "titleid",
//     success: function(res) {
//         console.log(res);

//     }
// })

$(function () {
    init();
    // 初始化
    function init() {
        getbaicaijiatitle();
        getInfo(0);
        tap();
    }
})

function getbaicaijiatitle() {
    $.ajax({
        url: "http://193.112.55.79:9090/api/getbaicaijiatitle",
        type: 'get',
        dataType: 'json',
        success: function (data) {
            var listIndex = data.result;
            // console.log(listIndex);
            var htmlStr = template("templateBaiList", {
                arr: listIndex
            });
            // console.log(htmlStr);
            // 渲染页面
            $(".bcj-nav ul").html(htmlStr);

            var lis = $(".bcj-nav-bar").find('li');
            // console.log(lis);
            var ulWidth = 0;
            lis.each(function (index, value) {
                ulWidth += $(value).width();
                // console.log(ulWidth);

            })
            $(".ul").width(ulWidth);
            // console.log($(".bcj-nav-bar").width(ulWidth));

            // var myScroll = new IScroll('.bcj-nav', {
            //     scrollX: true,
            //     scrollY: false,
            //     click: true
            // })
        }
    })
}

function tap() {
    $(".ul").on("tap", function (e) {
        // console.log(e.target);

        var data = $(e.target);

        // var id = e.target.dataset.titleId;
        var id = data.attr('data-titleIdid');
        // console.log(id);

        getInfo(id);
    })
}

function getInfo(id) {
    // console.log(id);
    $.get("http://193.112.55.79:9090/api/getbaicaijiaproduct", {
        titleid: id
    }, function (res) {
        console.log(res);

        var html = template("listTemp", {
            list: res.result,
            id: id
        });
        // console.log(html);
        $('.bcj-connect').html(html);
    });
}