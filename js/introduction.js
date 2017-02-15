		//头部文字滚动：	
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
					$('#shop').on('click',function () {						
						javascript:window.open('cart.html','_blank');
					})
					$('#shop-num').html(getCookie('cartnum'));
					$('.warning').find('p').hover(function () {
						clearInterval(timer);
					},function () {
						timer=setInterval(move,100);
					})
					if(getCookie('username')){
						$('#logo-in').find('a').html('Hi,'+getCookie('username')+'欢迎回嘉');
						$('#logo-up').find('a').html('退出');
						$('#logo-up').find('a').attr('href','login.html');
					}
			})
					
				//请求尾部：
				$('#foot-wrap').load('../html/foot.html',function () {
					
				})
				$('a').attr('target','_blank');
				$('img').css('cursor','pointer');
			//导航颜色切换：
			$('#nav').find('.nav-ul').find('li').on('mouseover',function () {
				$(this).addClass('nav-active').siblings('li').removeClass('nav-active');
			})
			//菜单下拉：
			$('#nav').find('.classify-list').find('h1').on('click',function () {
				$('.classify').slideToggle('slow');
			})
		//商品详情图：
		
		$.ajax({
			type:"get",
			url:"../json/introduction.json",
			async:true
		}).done(function (data) {
			//alert(data);
			$('#sale-hot').find('.hot-ul').find('li').each(function () {
				var $num=$(this).index();
				$(this).find('img').attr('src',data.hotsale[0].src[$num]);
				$(this).find('a').html(data.hotsale[0].title[$num]);
				$(this).find('p').html(data.hotsale[0].price[$num]);				
			})
			$('#goods-para').find('.ul-img').find('.liimg').find('img').each(function () {
				var $num1=$(this).index();
				$(this).attr('src',data.hotsale[0].intro[$num1]);
			})
			$('#goods-intro').find('.goods-name').html(data.goodsinfo[0].name);
			$('#apply-num').html(data.goodsinfo[0].num);
			$('#goods-intro').find('.price-single').html(data.goodsinfo[0].price);
		})
		
		//物品详情切换：
		$('#goods-para').find('.ul-list').find('li').on('click',function () {
			var $cnum=$(this).index();
			$('#goods-para').find('.ul-list').find('span').removeClass('red-bg');
			$(this).find('span').addClass('red-bg');
			$('#goods-para').find('.ul-img').find('li').eq($cnum).show('500').siblings('li').hide('500');
		})
		//放大镜：
		$('#magni').find('li').on('click',function () {			
			$('#goods-intro').find('.intro-bg').find('img').attr('src',$(this).find('img').attr('src'));			
		})
		$('#goods-intro').find('.intro-bg').hover(function () {
			$('#small').show();
			$('#big').show();						
		},function () {
			$('#small').hide();
			$('#big').hide();
		})
		$('#goods-intro').find('.intro-bg').on('mousemove',function (ev) {
			var mx=ev.pageX-$(this).offset().left-$('#small').width()/2;
			var my=ev.pageY-$(this).offset().top-$('#small').height()/2;
						
			if(mx<0){
				mx=0;
			}else if(mx>$(this).width()-$('#small').width()){
				mx=$(this).width()-$('#small').width();
			}
			if(my<0){
				my=0;
			}else if(my>$(this).height()-$('#small').height()){
				my=$(this).height()-$('#small').height();
			}
			var perl=mx/$(this).width();
			var pert=my/$(this).height();
			var bl=-perl*$('#big').find('img').width();
			var bt=-pert*$('#big').find('img').height();
			$('#big').find('img').css({left:bl,top:bt});
			$('#small').css({left:mx,top:my});
		})
	//详情页购物车：
		$('.count').find('.add').on('click',function () {
			var $num=$('#c-num').val();
			$num++;
			if($num>99){				
				$num=99;	
				alert('数量不能再多了呦亲~');
			}
			$('#c-num').val($num);			
		})
		$('.count').find('.down').on('click',function () {
			
			var $num=$('#c-num').val();			
			$num--;
			if($num<1){				
				$num=1;	
				alert('数量不能再少了呦亲~');
			}
			$('#c-num').val($num);			
		})
		$('#c-num').on('change',function () {
			var $num=$(this).val();
			if($num<1){				
				$num=1;	
			}
			if($num>99){				
				$num=99;	
			}
			$('#c-num').val($num);
		})
		//存储数量cookie:
		var sidarr=[];
		var numarr=[];
		function cookiearr(){//把cookie值转换成数组(思路：通过arrsearch函数判断对应的cookie值是否已经存在，而且cookie是一个数组)
	    if(getCookie('cartsid')){//cartindex 存放cookie的索引名称
	      sidarr=getCookie('cartsid').split(',');  
	    }else{
	      sidarr=[]; 
	    }
	    if(getCookie('cartnum')){//cartnum   存放数量的cookie名称
	      numarr=getCookie('cartnum').split(',');
	    }else{
	      numarr=[];
	    }
	}								
		//加入购物车：
		$('#buy').find('.addcart').on('click',function () {
			var $alpnum=parseInt($('#apply-num').html());
			var arr=[0,20,4,16,8,12];
			var $num=parseInt($('#shop-num').html());
			$num+=parseInt($('#c-num').val());
			$('#shop-num').html($num);
			for(var i=0,len=arr.length;i<len;i++){
				$('#shop-num').animate({left:arr[i]},50);
			}
			addCookie('cartsid',$alpnum,7);
			addCookie('cartnum',$num,7);
			
		})	
	
	
			