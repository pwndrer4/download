$("div1.box").height($("li#fuck5h").height())
        fuck5hous.onload = function() {
        	$("div1.box").height($("li#fuck5h0").height())
            $("div1.box").height($("li#fuck5h").height())
        }
		window.onresize =function(){
			$("div1.box").height($("li#fuck5h").height())
		}
$("div1.box > ul > li").eq(0).show().siblings("li").hide();
$("div1.triggers > a").mouseover(function(){
            clearInterval(timer);
            var _index = $(this).index();
            $(this).addClass("current").siblings().removeClass("current");
            $("div1.box > ul > li").eq(_index).fadeIn(1000).siblings("li").fadeOut(1000);
    });
$("div1.triggers > a").mouseout(function(){
         autoplay();
        });
var _index = 0;
var timer = null;
function autoplay(){
    timer=setInterval(function(){
    _index++;
    if(_index<3){
      $("div1.triggers > a").eq(_index).addClass("current").siblings().removeClass("current");
      $("div1.box > ul > li").eq(_index).fadeIn(1000).siblings("li").fadeOut(1000);
      }else{_index=0;
	  $("div1.triggers > a").eq(_index).addClass("current").siblings().removeClass("current");
	  $("div1.box > ul > li").eq(_index).fadeIn(1000).siblings("li").fadeOut(1000);
	  }                 
    },3000); 
     };
autoplay();
//sina
