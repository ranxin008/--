	
			//鼠标滑过：
			function hove (obj) {
				obj.hover(function () {
						obj.css('border-color','lightgrey');
					},function () {
						obj.css('border-color','white');
					})
			}
		//楼梯返顶：
		(function () {
			$('.wrap').find('li').mouseover(function () {
				$(this).addClass('step-active').siblings('li').removeClass('step-active');				
			})
			$('.wrap').find('li').click(function () {
					var scolltop=$('#floor-step .floor').eq($(this).index()).offset().top;
					$('html,body').animate({scrollTop:scolltop});
			})
		})();
			
			//楼梯：
			(function () {
				$(window).on('scroll',function () {
					var $topf=$(this).scrollTop();
					var $top=$(this).height();
					if($topf>$('#floor-step').offset().top-400){
						$('#step').show();
						$('#returntop').show();
					}else{
						$('#step').hide();
						$('#returntop').hide();
					}
					//楼层遍历：
					$('#floor-step').find('.floor').each(function () {
						var $ltop=$(this).offset().top;
						if($ltop+400>$topf){
	                    $('#step li').removeClass('step-active');
	                    $('#step li').eq($(this).index()).addClass('step-active');
	                   	return false;  
	               		}
					})
				})
			})();
			
					
            //懒加载：
            (function () {
            	 $(window).on('scroll',function () {
           		var bstop=true;
            	var $topf=$(this).scrollTop();
				var $top=$(this).height();	
				$('#floor-step').find('.floor').each(function () {
					//alert($(this).index());
					var $ltop=$(this).offset().top;
					var _this=this;
					var $str='图片正在加载中';
					if(bstop){
	                if($ltop<$topf+$top){
		                	$.ajax({
		                		type:"get",
		                		url:"../json/goods.json",
		                		async:true,
		                		beforeSend:function () {
		                			//$(_this).css('background','url(../images/loading.gif) no-repeat center center');
		                			//$(_this).append($str);
		                		}
		                	}).done(function (data) {
								//$(_this).css('background','');   
								//$(_this).remove($str);
		                		$(_this).find('.item-img').find('img').attr('src',data.fool[$(_this).index()].srcl);
								$(_this).find('.f1-left-img').find('img').attr('src',data.foor[$(_this).index()].srcr);
		                			for(var j=0;j<data.firr[$(_this).index()].length;j++){
		                				$(_this).find('.f1-right').find('li').find('img').eq(j).attr('src',data.firr[$(_this).index()][j].src);
		                				$(_this).find('.f1-right').find('li').find('.name').find('a').eq(j).html(data.firr[$(_this).index()][j].name);
		                				$(_this).find('.f1-right').find('li').find('.price').eq(j).html(data.firr[$(_this).index()][j].price);
										hove($(_this).eq(j));
										bstop=false;
		                			}
		                	})
	                } 
	                }
	           })	
           	})	
            })();
          
			
			$('#returntop').click(function () {
				$('html,body').animate({scrollTop:0});
			})
				//请求头部：
				$('#head-wrap').load('../html/head.html',function () {
					var num1=parseInt($('.warning').find('p').width());
					var num2=parseInt($('.warning').width());
					function move() {
					$('.warning').find('p').animate({left:"-=5px"},100,function (){
					if(parseInt($('.warning').find('p').css('left'))<-(num1-num2)){
						$('.warning').find('p').css('left',-(num1/2-num2)+"px");
					}
						});						
					}					
					move();					
					var timer=setInterval(move,100);
					$('.warning').find('p').hover(function () {
						clearInterval(timer);
					},function () {
						timer=setInterval(move,100);
					})
					$('#shop').on('click',function () {
						javascript:window.open('cart.html','_blank');
					})
					$('#shop-num').html(getCookie('cartnum'));
					//用户名：
					if(getCookie('username')){
						$('#logo-in').find('a').html('Hi,'+getCookie('username')+'欢迎回嘉');
						$('#logo-up').find('a').html('退出');
						$('#logo-up').find('a').attr('href','login.html');
					}
				})
					//头部文字滚动：
				//请求尾部：
				$('#foot-wrap').load('../html/foot.html',function () {
					
				})
				$('a').attr('target','_blank');
				$('img').css('cursor','pointer');
				$('#close-fix').on('click',function () {
					$('#fix').remove();
				})
				//导航切换：
				$('#nav').find('.nav-ul').find('li').on('click',function () {
					$(this).addClass('nav-active').siblings('li').removeClass('nav-active');
				})
		
			//商品列表显示：
			$.ajax('../json/goods.json').done(function (data) {
					$('#goods-list').find('li').not('.li-one').each(function () {
						$(this).hover(function () {
							$('#goods-info').show();
							$('#goods-info').find('.info-text').eq($(this).index()-1).show().siblings('.info-text').hide();
						},function () {							
							$('#goods-info').hover(function () {
									$(this).show();
							},function () {
									$(this).hide();
							});	
							$('#goods-info').hide();
						})
						
					})
			/*上轮播图：：*/
				for(var i=0;len=data.banner.length,i<len;i++){
					$('.lunbo').find('img').eq(i).attr('src',data.banner[i].src);
				}
			//上直播图：
				$('#live-play').find('span').html(data.live[0].time);
				$('#live-img').find('img').attr('src',data.live[0].img);
				$('#live-play').find('.img-name').find('a').html(data.live[0].name);
				$('#live-play').find('.live-price').html(data.live[0].price);
			//上热播图：鼠标滑过：切换：
			//:函数：
			function liveimg (obj) {
				$('#live-right').find('li').each(function () {
					$(this).find('h4').html(obj[$(this).index()].time);
					$(this).find('.live-list').find('img').attr('src',obj[$(this).index()].src);
					$(this).find('.living-name').find('a').html(obj[$(this).index()].name);
					$(this).find('.living-price').html(obj[$(this).index()].price);
					hove($(this));
				})
			}
				$('#live-left').find('img').attr('src',data.livel[0].src);
				liveimg(data.liver);
				$('#tod-yes').find('.yestorday').on('click',function () {
					liveimg(data.liveye);
					$('#live-right').find('li').find('.living').hide();
				})
				$('#tod-yes').find('.today').on('click',function () {
					liveimg(data.liver);
					$('#live-right').find('li').find('.living').show();
				})
				$('#live-right').hover(function () {
					$('#left-click').show();
					$('#right-click').show();
				},function () {
					$('#left-click').hide();
					$('#right-click').hide();
				})
				var arr=[$('#tod-yes').find('.today'),$('#tod-yes').find('.yestorday')];
				var clicknum=0;
				$('#right-click').on('click',function () {
					clicknum++;
					if(clicknum>1){
						clicknum=0;
					}
					arr[clicknum].click();
				})
				$('#left-click').on('click',function () {
					clicknum--;
					if(clicknum<0){
						clicknum=1;
					}
					arr[clicknum].click();
				})
			//上热销图：鼠标滑过：
				$('#sale-left').find('img').attr('src',data.salel[0].src);
				$('#sale-right').find('li').each(function () {
					$(this).find('img').attr('src',data.saler[$(this).index()].src);
					$(this).find('.sale-name').find('a').html(data.saler[$(this).index()].name);
					$(this).find('.sale-price').html(data.saler[$(this).index()].price);
					$(this).find('.sale-num').find('em').html(data.saler[$(this).index()].num);
					hove($(this));
				})
				
			})
		
			//轮播：
			function change (num) {
				$('.clik').find('li').eq(num).css('background-position','-430px 0px').siblings('li').css('background-position','-325px 0px');
				$('.lunbo').find('li').eq(num).animate({opacity:1},500).siblings('li').css('opacity',0);
			}
			
			$('.clik').find('li').hover(function () {
				clearInterval(timer);
				change($(this).index());
			},function () {
				timer=setInterval(function () {
			 	if(autonum<$('.clik').find('li').length-1){
			 		autonum++;
			 	}else{
			 		autonum=0;
			 	}
			 	change(autonum);
			 	
			 },2500);
			})				
			var autonum=0;
			var timer=setInterval(function () {
			 	if(autonum<$('.clik').find('li').length-1){
			 		autonum++;
			 	}else{
			 		autonum=0;
			 	}
			 	change(autonum);
			 	
			 },2500);
		//热播：
	$('#tod-yes').find('li').on('click',function () {
		$(this).addClass('live-color').siblings('li').removeClass('live-color');
	})
	
	
	
	
