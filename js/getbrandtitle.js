$(function () {
    // 使用ajax请求数据
    $.ajax({
        url: 'http://193.112.55.79:9090/api/getbrandtitle',
        type: 'get',
        dateType: 'json',
        success: function (res) {
            var message = template('getbrandtitlemessage', {
                arr: res.result
            });
            console.log(message);

            //然后是渲染页面
            $('.branddetail').html(message);
        }
    })


})