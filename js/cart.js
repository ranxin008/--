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
//请求头部：
	$.ajax({
		type:"get",
		url:"../html/head.html",
		async:true
		}).done(function (data) {
			$('#head').append($(data).find('.head-list').html());
			$('#shop').on('click',function () {
						window.location.href='cart.html';
						
			})
			if(getCookie('username')){
						$('#logo-in').find('a').html('Hi,'+getCookie('username')+'欢迎回嘉');
						$('#logo-up').find('a').html('退出');
						$('#logo-up').find('a').attr('href','login.html');
					}
		})
		//引入尾部
		$('#foot-wrap').load('../html/foot.html',function () {			
		})
		cookiearr();
	//创建购物车：
	if(sidarr!=''){
		$.ajax({
			type:"get",
			url:"../json/introduction.json",
			async:true
		}).done(function (data) {
			//alert(data.goodsinfo[0].src);
			var $clo=$('#clone').clone(true);			
		   	$('#cart-list').find('.li-name').after($clo);
		    $clo.show();
		    $clo.find('li.cart-img').find('a').find('img').attr('src',data.goodsinfo[0].src);
		    $clo.find('.goods-name').find('a').html(data.goodsinfo[0].name);
		    $clo.find('.goods-num').html(getCookie('cartsid'));
		    $clo.find('.num').find('#goods-num').attr('value',getCookie('cartnum'));
		    $clo.find('.co-price').html(data.goodsinfo[0].price);
		    tol();
		})
	}
	//单选变色：
	function change () {
		if($('.check-single').is(':checked')){
			$('.check-bg').css('background','url("../images/checkbox.png")');
		}else{
			$('.check-bg').css('background','url("../images/check2.png")');
		}
	}
		//全选：
		$('#allcheck').on('click',function () {
			$('#clone').find('input:checkbox').prop('checked',$(this).prop('checked'));
			change();
			tol();
		});
		//单选按钮：
		$('.single-check').on('click',function () {
			change();
			tol();
		})
		
		//购物车：
		$('.add-down').find('.add').on('click',function () {
			var $num=$('#goods-num').val();
			$num++;
			if($num>99){
				$num=99;
			}
			$('#goods-num').val($num);
			tol();
		})
		$('.add-down').find('.down').on('click',function () {
			var $num=$('#goods-num').val();
			$num--;
			if($num<1){
				$num=1;
				alert('不能再少拉~~');
			}
			$('#goods-num').val($num);
			tol();
		})
		//手动改变数量：
		$('#goods-num').on('change',function () {
			var valone=$(this).val();
			var reg=/[0-9]{1,2}/g;
			if(valone<1){
				valone=1;
			}else if(valone>99){
				valone=99;
			}else if(!reg.test(valone)){
				valone=1;
			}
			$(this).val(valone);
			tol();
		})
		//计价函数：
		function tol () {
			$('#total-price').html(parseFloat($('#clone').find('.co-price').html())*parseInt($('#goods-num').val()));
		}
		//单删：
		$('#clone').find('.delete').on('click',function () {
			if(confirm('您确定要删除吗？')){
			$(this).parents('#clone').remove();
			tol();
			}
		})
		//删除选中：
		$('#deleteall').on('click',function () {
			if(confirm('您确定要删除选中产品吗？')){
			$('#clone').find('.check-single').each(function () {
				if($(this).is(':checked')){
					$(this).parents('#clone').remove();
				}
			})
			tol();
			}
		})
		//清空购物车：
		$('#alldelete').on('click',function () {
			if(confirm('您确定要清空购物车吗？')){
			$('#shopping').html('<div class="empty md"><p>购物车还是空的^_^</p></div>');
			delCookie('cartsid');
			delCookie('cartnum');
			}
		})
		
		$('.gue-content').find('button').on('click',function () {
			window.location.href='goods-introduction.html';
		})
	
	