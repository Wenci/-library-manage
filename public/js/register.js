$(function(){

	//验证输入是否符合要求
	var isOk = [];
	isOk[0] = false;
	initInput();
	$("#account").blur(function(event) {
		/* Act on the event */
		var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        var account = this.value;
		if (!reg.test(account)) {
			$("#account-info").css({display:'block'});
			$("#account-info").text('邮箱格式错误');
			isOk[0] = false;
		}else{
			$("#account-info").css({display:'none'});
			isOk[0] = true;
			$.post('../queryAccount/',{
				account: $("#account").val()
			}, function(data, textStatus, xhr) {
				if(data === "error"){
					$("#account-info").css({display:'block'});
					$("#account-info").text('服务器错误');
					isOk[0] = false;
				}else if(data === "success"){
					$("#account-info").css({display:'block'});
					$("#account-info").text('该邮箱已注册');
					isOk[0] = false;
				}else if(data === "fail"){
					$("#account-info").css({display:'none'});
					isOk[0] = true;
				}
			});
		}

	});

	$("#password").blur(function(event) {
		/* Act on the event */
		var password = this.value;
		if(isSimple(password)=== 0){
			$("#password-info").css({display:'none'});
			isOk[1] = true;
		}else{
			isOk[1] = false;
			$("#password-info").css({display:'block'});
			$("#password-info").text('密码过于简单');
		}
	});
	
	$("#name").blur(function(event) {
		var name = this.value;
		if(name === ""|| name.length <2){
			$("#name-info").css({display:'block'});
			$("#name-info").text('姓名不对');
			isOk[2] = false;
		}else{
			$("#name-info").css({display:'none'});
			isOk[2] = true;
		}
	});

	$("#phone").blur(function(event) {
		var reg = /^1[3|4|5|8][0-9]\d{4,8}$/;
		var phone = this.value;
		if (!reg.test(phone)) {
			$("#phone-info").css({display:'block'});
			$("#phone-info").text('电话格式错误');
			isOk[3] = false;
		}else{
			$("#phone-info").css({display:'none'});
			isOk[3] = true;
		}
	});

	//表单提交
	$("#register-form").submit(function(event){
		blurAllInput();
		if(!formIsOk(isOk)){
			layer.msg("注册信息有错误，请完善后再注册");
		}else{
			$.post('register',{
				account: $("#account").val(),
				password: $("#password").val(),
				name: $("#name").val(),
				sex: $("input:radio:checked").val(),
				phone: $("#phone").val()
			}, function(data, textStatus, xhr) {
				/*optional stuff to do after success */
				layer.alert(data,function(){

						window.location.href = "../login";
					
				});
			});
		}
		return false;
	});

});


function isSimple(password) {
	var ls = 0;

	if(password.length<6){  
        ls++;  
    }

	return ls;  
}

function initInput(){
	$("#account").val("");
	$("#password").val("");
	$("#name").val("");
	$("#password").val("");
}

function formIsOk (isOk) {
	for (var i = 0; i < isOk.length; i++) {
		if(isOk[i] === false){
			return false;
		}
	};
	return true;
}

function blurAllInput(){
	$("#account").blur();
	$("#password").blur();
	$("#name").blur();
	$("#password").blur();
}

