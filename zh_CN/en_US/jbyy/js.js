window.onscroll = function(){
  //回到顶部
  var sllTop = document.documentElement.scrollTop||document.body.scrollTop;
  if(sllTop>240){
    $('#get-top').css('display','block')
  }else{
    $('#get-top').css('display','none')
  }
}
$('#get-top').click(function(){ 
  $('body,html').animate({
    scrollTop: 0
  }, 800);//点击回到顶部按钮，缓懂回到顶部,数字越小越快
})
// 显示/隐藏二级菜单
$(".left-menu-btn").hover(function(){
  $('#tow-nav').fadeIn(200);
},function(){
  $("#tow-nav").hover(function(){
    $('#tow-nav').fadeIn(0);
  },function(){
    $('#tow-nav').fadeOut(0)
  });
  $('#tow-nav').fadeOut(0)
})
//设为首页
function setHome(obj,vrl){
  try{
    obj.style.behavior='url(#default#homepage)';obj.setHomePage(vrl);
  }
  catch(e){
    if(window.netscape) {
      try {
        netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
      }
      catch (e) {
        alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
      }
      var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
      prefs.setCharPref('browser.startup.homepage',vrl);
    }else{
      (new $.zui.ModalTrigger({
        custom: '<h3>您的浏览器不支持此操作，请手动将此页设为首页。</h3>'+
        '<blockquote>1.打开浏览器设置.<br />2.点击"设置"》"启动时》"打开特定网页"》"输入网址"》确定.</blockquote>'+
        '<p><a href="###"><i class="fa fa-link"></i>点击查看</a>详细教程</p>',
        title: '设为首页'
      })).show()
    }
  }
};
//初始化工具提示     
$('[data-toggle="tooltip"]').tooltip({
  tipClass: 'tooltip-info'
});

//检测本地是否存在localStorage，若存在则遍历localStorage的值到对应的元素内
if(localStorage.length != 0){
  for(var i=0; i<localStorage.length;i++){
    var linkId = localStorage.key(i);
    var data = localStorage.getItem(localStorage.key(i));
    data = data.split('|'); 
    var value1 = data[0], value2 = data[1];
    if(linkId.length <= 10 && linkId != "page_/"){
      var getID = $('#'+linkId);
      getID.html(value1).attr("href",value2);
    }
  }
  
  //加载设置好的主题
  function load_theme(){
    //获取当前页面是否可以更换主题
    var CustomThemeStatus = $("#content").attr("data-CustomTheme");
    var data = localStorage.getItem('theme');
    if(CustomThemeStatus === "true" && data != null){
      data = data.split('|'); 
      var value1 = data[0], value2 = data[1], value3 = data[2], imgUrl = data[3], change = data[4], titleColor = data[5], textColor = data[6], bgColor = data[7];
      $('.theme-panel-content ul li').removeClass('active');
      $(value3 + ' li').eq(value2).addClass('active').siblings().removeClass('active');
      $('#content').removeClass("bgid").addClass(value1);
      value1 == 'bg-diy' ? $('.' + value1).css({'background':'url(' + imgUrl + ') no-repeat center', 'background-size':'cover'}) : '';
      $('.image-url input').val(''||imgUrl)
      showTips(change);
      if(value3 === '.wrapper-two'){
        $('.link-list-tit').css('color', titleColor);
        $('.link-list-a').css({'color':textColor,'background':bgColor});
        $('#full').attr('value', titleColor);
        $('#full2').attr('value', textColor);
        $('#full3').attr('value', bgColor);
      }
    }
  }
  load_theme();
}

$(window).load(function () {
  CustomMode();
  CustomTheme();
  //SiteNotice();
});

//自定义模式
function CustomMode(){
  //显示或隐藏左边菜单
  $('.bar-btn').on('click', function () {
    $('.left-bar').toggleClass('showBar');
    $('.mask').toggleClass('showMask');
    $(this).toggleClass('animated1');
    $("#tow-nav").toggleClass('show-tow-nav').css('display','')
  });
  $('.nav-btn').on('click', function () {
    $('.nav').toggleClass('showNav');
    $(this).toggleClass('animated2');
  });
  if(deviceVal == 'phone'){
    //点击锚链接时隐藏菜单
    $('#menu li a,.mask').click(function(){
      $('.left-bar').toggleClass('showBar');
      $('.mask').toggleClass('showMask');
      $('.bar-btn').toggleClass('animated1');
    })
  }
  
  //自定义模式下禁用链接跳转 - 使用遮罩层遮挡方式
  $('.customize').on('click', function () {
    //获取当前页面是否可以自定义
    var customizeStatus = $("#content").attr("data-customize");
    if(customizeStatus === "true"){
      $('.customize-mode-tips').toggleClass('shaow_tips');
      $('.linkList-item').toggleClass('customize_mode');
      $('.not_operational').toggleClass('shaow_tips');
    }else{
      new $.zui.Messager('当前页面不支持自定义模式，请前往首页设置', {
        icon: 'bell', // 定义消息图标
        type: 'danger',
        placement: 'top',
        close: false
      }).show();
    }
  });
  
  //在自定义模式下才能修改内容标题
  $('.link-list-tit').click(function(){
    var getCustomize = $('.shaow_tips')[0];
    if(getCustomize == null){
      return false
    }
    var getLink_tit = $(this);
    var getLink_id = $(this).attr("id");

      //给当前元素的兄弟元素添加显示类，获取标题内容赋值给输入框，并让其焦点聚焦同时选中文字
      $(this).siblings().addClass("shaow-edit-category").val(getLink_tit.html()).focus().select();
      
      //输入框焦点失去时将输入框内容写入到localStorage
      $(".shaow-edit-category").blur(function(){
        var inputVal = $(this).val();
        getLink_tit.html(inputVal);
        window.localStorage.setItem(getLink_id, inputVal);
        $(".shaow-edit-category").removeClass("shaow-edit-category");
      })
    });

  var idValue;
  var thisIink;
      //点击编辑按钮弹出对话框
      $('.bianji').click(function(){
        $('#myModal').modal({
          keyboard : false,
          show     : true
        });
        //获取当前点击元素的兄弟元素及值并传递给对应的全局变量
        thisIink = $(this).prev();
        idValue = $(this).prev().attr("id");
        var thisIink_con = $(this).prev().html();
        var thisIink_href = $(this).prev().attr("href");
        $('#inputAccountExample1').val(thisIink_con);
        $('#inputAccountExample2').val(thisIink_href);
      });
      
      //点击确认按钮后将输入框内容写入localStorage并更新页面中对应元素的内容
      $('.btn-primary').click(function(){
        var text = $('#inputAccountExample1').val();
        var text2 = $('#inputAccountExample2').val();
        window.localStorage.setItem(idValue, text+'|'+text2);
        var data = localStorage.getItem(idValue);
        data = data.split('|'); 
        var value1 = data[0], value2 = data[1];
        $(thisIink).html(value1).attr("href",value2);
      });
    }

//更换皮肤
function CustomTheme(){
  $('.theme, #cancel, #cancel-x').on('click',function (){
    //获取当前页面是否可以更换主题
    var CustomThemeStatus = $("#content").attr("data-CustomTheme");
    if(CustomThemeStatus === "true"){
      $('.theme-panel').toggleClass('show-theme-panel');
    }else{
      new $.zui.Messager('当前页面不支持更换主题，请前往首页设置', {
        icon: 'bell', // 定义消息图标
        type: 'danger',
        placement: 'top',
        close: false
      }).show();
    }
  });
  
  var theme_wrapper = localStorage.getItem("theme") ? localStorage.getItem("theme").split('|')[2] : '';
  var theme_index;
  var bgid;
  var change = localStorage.getItem("theme") ? localStorage.getItem("theme").split('|')[4] : '0';
  var imgUrl = localStorage.getItem("theme") ? localStorage.getItem("theme").split('|')[3] : '';
  $('.wrapper-one li').click(function (){
    theme_index = $(this).index();
    theme_wrapper = '.wrapper-one';
    bgid = $(this).attr('data-bgid');
    $(this).addClass('active').siblings().removeClass('active');
    $('#content').removeClass().addClass(bgid);
    $('.wrapper-two li').removeClass('active');
    $('.' + bgid).css('background', '');
    change = 0;
    showTips(change);
    $('.link-list-tit').css('color', '');
    $('.link-list-a').css({'color':'','background':''})
  });

  $('.image-url input').blur(function(){
    imgUrl = $(this).val();
    $('.bg-diy').css({'background':'url(' + imgUrl + ') no-repeat center', 'background-size':'cover'})
  });

  $('.wrapper-two li').click(function (){
    theme_index = $(this).index();
    bgid = $(this).attr('data-bgid');
    $('#content').removeClass().addClass(bgid);
    if(bgid == 'bg-diy'){
      change = 2
    }else{
      $('.' + bgid).css('background', '');
      change = 1
    }
    theme_wrapper = '.wrapper-two';
    $(this).addClass('active').siblings().removeClass('active');
    $('.wrapper-one li').removeClass('active');
    showTips(change);
    $('.link-list-tit').css('color', titleColor);
    $('.link-list-a').css({'color':textColor,'background':bgColor})
  });

  //点击保存，将主题参数写入本地缓存
  $('#okay').on('click',function (){
    console.log(titleColor);
    if(theme_index == null){
      theme_index = $('.theme-panel-content ul li.active').index();
      bgid = $('.theme-panel-content ul li.active').attr('data-bgid');
    }
    localStorage.theme = bgid + "|" + theme_index + "|" + theme_wrapper + "|" + imgUrl + "|" + change + "|" + titleColor + "|" + textColor + "|" + bgColor;
    $('.theme-panel').toggleClass('show-theme-panel');
    new $.zui.Messager('保存成功', {
      icon: 'ok-sign', // 定义消息图标
      type: 'success',
      placement: 'top',
      close: false,
      time: 2000
    }).show();
  });
}

//显示颜色面板tips的内容
function showTips(change){
  if(change == 0){
    $('.color-panel-tips').hide();
    $('.color-panel-tips')[change].style.display = "block"
  }else if(change == 1){
    $('.color-panel-tips').hide();
    $('.color-panel-tips')[change].style.display = "block"
  }else{
    $('.color-panel-tips').hide();
    $('.color-panel-tips')[change].style.display = "block"
  }
}

//网站推荐
$('#submit_URL').modalTrigger({
  type: 'iframe',
  iframe: 'http://webjike_com.mikecrm.com/uyDysw9',
  size: 'lg',
  height: '730px',
  title: '网站推荐'
})

//友链申请
$('#Links').modalTrigger({
  type: 'iframe',
  iframe: 'http://webjike_com.mikecrm.com/AKVslkN',
  size: 'fullscreen',
  title: '友链申请'
})

//判断用户使用的设备
var deviceVal  = browserRedirect();
function browserRedirect() {
  var sUserAgent = navigator.userAgent.toLowerCase();
  var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
  var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
  var bIsMidp = sUserAgent.match(/midp/i) == "midp";
  var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
  var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
  var bIsAndroid = sUserAgent.match(/android/i) == "android";
  var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
  var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
  if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
    return 'phone';
  } else {
    return 'pc';
  }
}

//网站全局通知，用户第一次访问网站时显示公告/
/*
function SiteNotice(){
  var _notice = localStorage.getItem('notice');
  if(_notice == null){
    //使用触发器对象直接显示
    (new $.zui.ModalTrigger({
      name: 'notice',
      icon: 'bullhorn',
      title: '通知',
      custom: '<h2>确认过眼神，你遇上对的网站</h2><br/>'+
      '<p>欢迎访问小呆导航，现在呈现在你面前的是全新V2.0版本的小呆导航，使用PC端访问网站可以获得更好的用户体验。另外原定于5月2号，小呆导航一周年才上线此次新版本网站，但是由于服务器到期的原因不得不提前上线，所以导致部分页面内容还没有完善好。</p>'+
      '本次推出新版本网站还处于测试阶段，欢迎各位到“<a href="http://webjike.com/channels/6.html" target="_blank">在线留言</a>”中提交反馈、建议、吐槽。</p>'+
      '<p><i class="fa fa-hand-o-right"></i>“<a href="http://webjike.com/channels/153.html" target="_blank">点击这里</a>”了解更多新版本网站功能介绍。</p>',
    })).show();
    //对话框关闭后触发的事件
    $('#notice').on('hidden.zui.modal', function() {
      localStorage.notice = "true";
    });
  }

}
*/    

//百度统计代码
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?7397c22fedfaa11157d38143820e7330";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();

/*
 * 2018-6-12更新
 * 解决在低分辨率下首页内容过高导致滚动条出现，影响主题背景图片不全屏的问题
 * 解决方式：对于屏幕分辨率高度低于845px显示器，改变首页的内容为6块区域。
 */

 (function(){
  //当浏览器窗口被调整大小时触发
  window.onresize = function(){
    ShowHideElement("i-link-box","linkList-item",845);
  }
  window.onload = function(){
    ShowHideElement("i-link-box","linkList-item",845); 
  }
  function ShowHideElement(Element1, Element2, Vaule){
    var Person = document.getElementsByClassName(Element1);
    var BoxHeight = document.getElementsByClassName(Element2);
    var WindowHeight = window.innerHeight||document.body.clientHeight;
    //遍历获取到的元素
    for(var i=6; i<Person.length; i++){
      if(WindowHeight <= Vaule && deviceVal === "pc"){
        Person[i].style.display = "none";
        BoxHeight[0].style.marginTop="5px";
      }else{
        Person[i].style.display = "block";
        BoxHeight[0].style.marginTop="0px";
      }
    }
  }
  window.ShowHideElement = ShowHideElement;
}());
    
var now = -1;
var resLength = 0;
var thisSearch = 'https://www.baidu.com/s?wd=';
var thisSearchIcon = './logo.jpg';
var storage = window.localStorage;
if(!storage.stopHot){
    storage.stopHot = true
}
storage.stopHot == 'false' ? $('#hot-btn').addClass('off') : $('#hot-btn').removeClass('off');
var ssData = storage.searchEngine;
if(storage.searchEngine != undefined){
  ssData = ssData.split(','); 
  thisSearch = ssData[0];
  $('.search-icon').attr('src', ssData[1])
}

// 按键松开时执行
$('#txt').keyup(function(e){
  // 判断输入框是否有内容
  if($('#txt').val() != ''){
      $('.search-clear').css('display','block');
    $('.search-clear').click(function(){
      $('#txt').val('');
      $('#box ul').html('');
      $('.search-clear').css('display','none')
    })
  }else{
    $('.search-clear').css('display','none')
  }

  if(e.keyCode == 38 || e.keyCode == 40 || storage.stopHot != 'true'){
      return
  };
  var dat = {
      wd: $('#txt').val()
  };
  if($('#txt').val()!=''){
      $('#box ul').text('');
      $('#box').css('display','block');
        $.ajax({
          type: "GET",
          url: "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
          async: true,
          data: dat,
          dataType : 'jsonp',
          jsonp: 'cb',
          success: function(res){
              for(var i = 0; i < res.s.length; i++){
                  resLength = res.s.length;
                  oli_i = '<li>'+res.s[i]+'</li>';
                  $('#box ul').append(oli_i);
                  
                  $('#box ul li').eq(i).click(function(){
                      $('#txt').val(this.innerHTML);
                      window.open(thisSearch + this.innerHTML);
                      $('#box ul').html('');
                      $('#box').css('display','none')
                  })
              };
                    //$('#box ul').html() === '' ? $('#box').css('height','0px') : $('#box').css('height','auto');
          },
          error: function(res){
              console.log(res)  
          }
      });
  }else{
      $('#box ul').html('')
      //$('#box ul').html() === '' ? $('#box').css('height','0px') : $('#box').css('height','auto');
  };
});

$('#txt').keydown(function(ev){
    if(ev.keyCode==40){
      now++;
      if(now > resLength-1){   
        now = 0;
      }
      $('#box ul li').eq(now).addClass('current').siblings().removeClass('current')
      $('#txt').val($('#box ul li').eq(now).text())   
    };
    if(ev.keyCode==38){
        if(now == -1 || now == 0){
          now = resLength
        }
        now--
        $('#box ul li').eq(now).addClass('current').siblings().removeClass('current');
        $('#txt').val($('#box ul li').eq(now).text())
    };
    if(ev.keyCode==13){
        window.open(thisSearch + $('#txt').val())
        // $('#txt').val('');
        $('#box ul').html('')
    }
})

$(function(){
  //$('#box ul').html() === '' ? $('#box').css('height','0px') : $('#box').css('height','auto');
  var search = {
    data: [{
      name: '百度',
      img: '/images/logo.jpg',
      url: 'https://www.baidu.com/s?wd='
    }, {
      name: '谷歌',
      img: '/images/logo_2.jpg',
      url: 'https://www.google.com/search?q='
    }, {
      name: '必应',
      img: '/images/logo_3.jpg',
      url: 'https://cn.bing.com/search?q='
    }, {
      name: '好搜',
      img: '/images/logo_4.jpg',
      url: 'https://www.so.com/s?q='
    }, {
      name: '搜狗',
      img: '/images/logo_5.jpg',
      url: 'https://www.sogou.com/web?query='
    }, {
      name: '淘宝',
      img: '/images/logo_6.jpg',
      url: 'https://s.taobao.com/search?q='
    }, {
      name: '京东',
      img: '/images/logo_7.jpg',
      url: 'http://search.jd.com/Search?keyword='
    }, {
      name: '天猫',
      img: '/images/logo_8.jpg',
      url: 'https://list.tmall.com/search_product.htm?q='
    }, {
      name: '1688',
      img: '/images/logo_9.jpg',
      url: 'https://s.1688.com/selloffer/offer_search.htm?keywords='
    }, {
      name: '知乎',
      img: '/images/logo_10.jpg',
      url: 'https://www.zhihu.com/search?type=content&q='
    }, {
      name: '微博',
      img: '/images/logo_11.jpg',
      url: 'https://s.weibo.com/weibo/'
    }, {
      name: 'B站',
      img: '/images/logo_12.jpg',
      url: 'http://search.bilibili.com/all?keyword='
    }, {
      name: '豆瓣',
      img: '/images/logo_13.jpg',
      url: 'https://www.douban.com/search?source=suggest&q='
    }, {
      name: '优酷',
      img: '/images/logo_14.jpg',
      url: 'https://so.youku.com/search_video/q_'
    }, {
      name: 'GitHub',
      img: '/images/logo_15.jpg',
      url: 'https://github.com/search?utf8=✓&q='
    }]
  }
  for(var i = 0; i < search.data.length; i++){
    var addList = '<li><img src="' + search.data[i].img + '"/>' + search.data[i].name + '</li>'
    $('.search-engine-list').append(addList);
  }

  $('.search-icon, .search-engine').hover(function() {
    $('.search-engine').css('display', 'block')
  }, function() {
    $('.search-engine').css('display', 'none')
  });

  $('#hot-btn').on('click', function() {
    $(this).toggleClass('off');
    if(storage.stopHot == 'true'){
      storage.stopHot = false
    }else{
      storage.stopHot = true
    }
    console.log(storage.stopHot)
  });

  $('.search-engine-list li').click(function() {
    var _index = $(this).index();
    var thisImg = $(this).children().attr('src');
    $('.search-icon').attr('src', thisImg)
    thisSearch = search.data[_index].url;
    $('.search-engine').css('display', 'none')

    storage.searchEngine = [thisSearch, thisImg]
  })
})
$("#search-btn").click(function(){
  var textValue = $('#txt').val();
  if(textValue != ''){
    $('body').attr('data-if') === 'true' ? window.location.href = '/utils/search.html?word=' + textValue : window.open('/utils/search.html?word=' + textValue)
  }else{
    new $.zui.Messager('请输入关键字', {
      icon: 'bell', // 定义消息图标
      type: 'danger',
      placement: 'top',
      close: false
    }).show();
  }
});

/*
* @Author: Marte
* @Date:   2018-05-20 09:03:53
* @Last Modified by:   Marte
* @Last Modified time: 2018-06-11 16:18:47
*/

'use strict';


// 在这里修改id，和速度
$(function(){
    if(deviceVal == 'phone'){
      $('#menu').css({'overflow':'hidden','overflow-y':'scroll'})
      return
    }
    var api1 = new myApi();
    api1.mouseScroll.inte($('#menu'),30);
})


//下面别动
function myApi(){

    this.mouseScroll = {

        inte : function(obj,value){
            this.OBJ = obj;
            this.addscroll(obj);



            var outH = obj.outerHeight(),
                oScrollcontent = obj.children(':first'),
                contentH = oScrollcontent.outerHeight(),
                oYscrollinnerH = outH/contentH*outH,
                oYscrollouter = obj.find('#Yscrollouter'),
                oYscrollinner = obj.find('#Yscrollinner');

            obj.css({'position': 'relative','overflow':'hidden'});
            oScrollcontent.css('position', 'absolute');

            if(contentH > outH){
                this.mousehover(obj, oYscrollouter, oYscrollinner);
                this.mousewheel(obj, value, oScrollcontent, oYscrollinner, outH, contentH, oYscrollinnerH );
                this.mousemoved(obj, oScrollcontent, oYscrollouter, oYscrollinner, outH, contentH, oYscrollinnerH );
            };
        },

        addscroll : function(obj,value){
            obj.append('<div id="Yscrollouter"><div id="Yscrollinner"></div></div>');
            $('#Yscrollinner').css('cursor','pointer');
        },

        mousehover : function(obj, outer, inner){

            obj.hover(function() {
                outer.fadeIn(400);
            }, function() {
                outer.fadeOut(400);
            });

            inner.hover(function() {
                $('body').css({
                    '-moz-user-select': 'none',
                    '-webkit-user-select': 'none',
                    '-ms-user-select': 'none',
                    '-khtml-user-select': 'none',
                    'user-select': 'none',});
            }, function() {
                $('body').css({
                    '-moz-user-select': 'auto',
                    '-webkit-user-select': 'auto',
                    '-ms-user-select': 'auto',
                    '-khtml-user-select': 'auto',
                    'user-select': 'auto',});
            });

        },

        mousewheel : function(obj, value, O, inner, H1, H2, H3){

            var oScrollcontentVal = value/(H1 - H3)*(H2 - H1);

                inner.height(H3);  //滚动条高度

            obj.on('mousewheel',function(event,delta ){  //绑定滚轮事件

                event.preventDefault();  //阻止浏览器默认为行

                var delta = event.originalEvent.wheelDelta;
                var oYscrollinnerTop = inner.position().top;

                var oScrollcontentTop = O.position().top;

                if(delta > 0){
                    if(oYscrollinnerTop - value < 0){
                        inner.css('top', 0);
                        O.css('top', 0);
                    }else{
                        inner.css('top', oYscrollinnerTop - value);
                        O.css('top', oScrollcontentTop + oScrollcontentVal);
                    }
                }else{
                    if(oYscrollinnerTop + value > H1 - H3){
                        inner.css('top', H1 - H3);
                        O.css('top', H1 - H2);
                    }else{
                        inner.css('top', oYscrollinnerTop + value);
                        O.css('top', oScrollcontentTop - oScrollcontentVal);
                    }
                };
            });

        },

        mousemoved : function(obj, O, outer, inner, H1, H2, H3){
            inner.on('mousedown',function(event){   //绑定鼠标事件

                var clientY = event.clientY,
                    oYscrollinnerTop = inner.position().top,
                    oScrollcontentTop = O.position().top,

                    moveY = 0;

                    $(document).on('mousemove',function(event){
                        moveY = event.clientY - clientY;
                        var oScrollcontentMove = moveY/(H1 - H3)*(H2 - H1);

                        if(oYscrollinnerTop + moveY < 0){
                            inner.css('top', 0);
                            O.css('top', 0);
                        }else if(oYscrollinnerTop + moveY > H1 - H3){
                            inner.css('top', H1 - H3);
                            O.css('top', H1 - H2);
                        }else{
                            inner.css('top', oYscrollinnerTop + moveY);
                            O.css('top', oScrollcontentTop - oScrollcontentMove);
                        }
                    });

                    $(document).on('mouseup',function(event){
                        $(document).off('mousemove');
                    })

            })
        }

    }
}

