$('#foot-wrap').load('foot.html',function () {
					
})
//注册验证：
function cookiearr(){
    if(getCookie('username')){
      namearr=getCookie('username').split(',');  
    }else{
      namearr=[]; 
    }
    if(getCookie('userpass')){//cartnum   存放数量的cookie名称
	    passarr=getCookie('userpass').split(',');
	}else{
	    passarr=[];
	}
}
	function wrong (str) {
		$('#int-text').find('.error').show().html(str);
	}
	function right () {
		$('#int-text').find('.error').hide();
	}
	var regname=/^1[34578]{1}[0-9]{9}$/g;
	var regemail=/.+@.+\.[a-zA-Z]{2,4}$/g;
	var namearr=[];
	var passarr=[];
	$('#uname').on('blur',function () {
		cookiearr();
		if($.inArray($(this).val(),namearr)!=-1){
			wrong('!该用户名已注册');		
		}else if(this.value==''||!regname.test(this.value)){
			wrong('!请输入正确的手机号码');		
		}else{
			right();
		}
	})
	
	$('#upass').on('blur',function () {
		if(this.value==''||this.value.length<6){
			wrong('!请输入正确的密码且长度不小于6');
		}else{
			right();
		}
	})
	$('#qpass').on('blur',function () {
		if(this.value==''||this.value!=$('#upass').val()){
			wrong('!请确保密码一致');
		}else{
			right();
		}
	})
//提交：
	$('#su-bto').on('click',function () {
		if($('#int-text').find('.error').css('display')=='block'){
			return false;
			
		}
		if($('#uname').val()==''||$('#upass').val()==''||$('#qpass').val()==''){
			return false;
			
		}
		addCookie('username',$('#uname').val(),10);
		addCookie('userpass',$('#upass').val(),10);
		window.location='index.html';
		
	})
	//登录：
	$('#username').val(getCookie('username'));
	$('#password').val(getCookie('userpass'));
	
	var arryan=["../images/ya1.png","../images/ya2.png","../images/ya3.png","../images/ya4.png","../images/ya5.png"];
	var arrval=["uwxe","4vfu","m299","g3jk","ggr9"];
	$('#click-code').on('click',function () {
		var _this=this;		
		$(_this).find('img').attr('src',arryan[Math.round(Math.random()*4)]);
	
	})
	$('#checkcode').on('blur',function () {
		if($(this).val()!=''){					
			if($.inArray($('#click-code').find('img').attr('src'),arryan)!=$.inArray($('#checkcode').val(),arrval)){
				alert('验证码错误');
			}
		}
	})
	$('#su-bt').on('click',function () {
		if($('#username').val()==''){
			return false;
		}
	 	if($('#userpass').val()==''){
			return false;
		}
		if($('#checkcode').val()==''||$.inArray($('#click-code').find('img').attr('src'),arryan)!=$.inArray($('#checkcode').val(),arrval)){
			return false;
		}
		window.location.href='index.html';
		
		
		
	})
	