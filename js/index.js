$(function(){
  beginDongHua();
  function beginDongHua(){
    var loadingWrapper = document.createElement('div');
    loadingWrapper.setAttribute('id','loadingWrapper');
    loadingWrapper.style.width=window.screen.width+'px';
    loadingWrapper.style.height=window.screen.height+'px';
    loadingWrapper.style.position='fixed';
    loadingWrapper.style.left= 0;
    loadingWrapper.style.top= 0;
    loadingWrapper.style.backgroundColor='rgba(0,0,0,0.4)';
    var loadingGIF = document.createElement('img');
    loadingGIF.src='./images/timg.gif';
    loadingGIF.setAttribute('class','loadingGIF');
    loadingWrapper.appendChild(loadingGIF);
    document.body.appendChild(loadingWrapper);
  }

  // 初始化函数
  setTimeout(function(){
    init();
  },1000)
  function init(){
    delLoading();
    getIndexMenu();
    eventList();
    getMoneyctrl();
  }
  // 清除动画
  function delLoading(){
    var loadingWrapper = document.getElementById('loadingWrapper');
    document.body.removeChild(loadingWrapper);
  }    
  // 获取首页导航菜单的数据
  function getIndexMenu(){
    // 发送ajax获取数据
    $.get("http://193.112.55.79:9090/api/getindexmenu","",function(res){
      // 调用模板引擎生成模板
      var htmlNav = template("navTmpl",{"res":res.result});
      //渲染页面
      $("nav").html(htmlNav);
    },'json');
  }

  // 绑定事件的函数
  function eventList(){


    //动态生成的元素，采用委托的方式绑定事件
    $("nav").on("tap","a:nth-child(8)",function(){
      // 选择后四个切换效果
      $("nav a:nth-last-child(-n+4)").fadeToggle();
    })
  }
  
  // 获取折扣列表数据
  function getMoneyctrl(){
    $.get("http://193.112.55.79:9090/api/getmoneyctrl","",function(res){
      // console.log(res);
      for(var i=0;i<res.result.length;i++){
        var comment = res.result[i].productComCount.substr(1).split("人")[0];
        // console.log(comment);
        res.result[i].productComCount = comment;
      }
      // 调用模板引擎
      var htmlListStr = template("listTmpl",{"res":res.result});
      // 渲染页面
      $(".list_Tmp").html(htmlListStr);
    },'json')
  }
})