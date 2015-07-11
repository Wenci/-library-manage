$(function(){

	//验证输入是否符合要求
	var isOk = [];
	initInput();
	$("#account").blur(function(event) {
		/* Act on the event */
		var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        var account = this.value;
        if(account===""){
        	$("#account-info").css({display:'block'});
			$("#account-info").text('请输入账户名');
			isOk[0] = false;
			return;
        }else if (!reg.test(account)) {
			$("#account-info").css({display:'block'});
			$("#account-info").text('邮箱格式错误');
			isOk[0] = false;
		}else{
			$("#account-info").css({display:'none'});
			isOk[0] = true;
			$.post('../queryAccount',{
				account: $("#account").val()
			}, function(data, textStatus, xhr) {
				if(data === "error"){
					$("#account-info").css({display:'block'});
					$("#account-info").text('服务器错误');
					isOk[0] = false;
				}else if(data === "fail"){
					$("#account-info").css({display:'block'});
					$("#account-info").text('该邮箱未注册');
					isOk[0] = false;
				}else if(data === "nActive"){
					$("#account-info").css({display:'block'});
					$("#account-info").text('该账号未激活');
					isOk[0] = false;
				}else if(data === "active"){
					$("#account-info").css({display:'none'});
					isOk[0] = true;
				}
			});
		}

	});

	$("#password").blur(function(event) {
		/* Act on the event */
		var password = this.value;
		if(password != 0){
			$("#password-info").css({display:'none'});
			isOk[1] = true;
		}else{
			isOk[1] = false;
			$("#password-info").css({display:'block'});
			$("#password-info").text('请输入密码');
		}
	});
	

	//表单提交
	$("#login-form").submit(function(event){
		blurAllInput();
		if(!formIsOk(isOk)){
			layer.msg("登陆信息有误");
		}else{
			$.post('/login',{
				account: $("#account").val(),
				password: $("#password").val()
			}, function(data, textStatus, xhr) {
				if(data === "error"){
					layer.mgs("用户名或密码错误")
				}else if(data === "success"){
					window.location.href = "../";
				}
			});
		}
		return false;
	});

});



function initInput(){
	$("#account").val("");
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
}