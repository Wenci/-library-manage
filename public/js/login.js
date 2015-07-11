$(function(){

	//验证输入是否符合要求
	$("#account").blur(function(event) {
		/* Act on the event */
		var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        var account = this.value;
       
        if(account===""){
        	$("#account-info").css({display:'block'});
			$("#account-info").text('请输入账户名');
			
			return;
        }else if (!reg.test(account)) {
			$("#account-info").css({display:'block'});
			$("#account-info").text('邮箱格式错误');
			
		}else{
			$("#account-info").css({display:'none'});
			console.log(5);
						$.post('../queryAccount',{
				account: $("#account").val()
			}, function(data, textStatus, xhr) {
				if(data === "error"){
					$("#account-info").css({display:'block'});
					$("#account-info").text('服务器错误');
					
				}else if(data === "fail"){
					$("#account-info").css({display:'block'});
					$("#account-info").text('该邮箱未注册');
					
				}else if(data === "nActive"){
					$("#account-info").css({display:'block'});
					$("#account-info").text('该账号未激活');
					console.log(2);
					
				}else if(data === "active"){
					$("#account-info").css({display:'none'});
					console.log(3);
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
		var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        var account = $("#account").val();
       
        if(account===""){
        	$("#account-info").css({display:'block'});
			layer.msg('请输入账户名');
			
			return false;
        }else if (!reg.test(account)) {
			$("#account-info").css({display:'block'});
			layer.msg('邮箱格式错误');
			return false;
		}else{
			$("#account-info").css({display:'none'});
			$.post('../queryAccount',{
				account: $("#account").val()
			}, function(data, textStatus, xhr) {
				if(data === "error"){
					//$("#account-info").css({display:'block'});
					layer.msg('服务器错误');
					return;
					
				}else if(data === "fail"){
					//$("#account-info").css({display:'block'});
					layer.msg('该邮箱未注册');
					return;
				}else if(data === "nActive"){
					//$("#account-info").css({display:'block'});
					layer.msg('该账号未激活');
					return;
					
				}else if(data === "active"){
					$("#account-info").css({display:'none'});
				}



				$.post('/login',{
					account: $("#account").val(),
					password: $("#password").val()
				}, function(data, textStatus, xhr) {
					if(data === "error"){
						layer.msg("用户名或密码错误")
					}else if(data === "success"){
						window.location.href = "../";
					}
				});
			});
		}
	
		
		
		return false;
	});


	var isOk = [];
	function formIsOk (isOk) {
		console.log(isOk);
		for (var i = 0; i < isOk.length; i++) {
			if(isOk[i] === false){
				console.log(isOk[i]);
				return false;
			}
		};
		return true;
	}

	

});



function initInput(){

	$("#account").val("");
	$("#password").val("");

}

function blurAllInput(){

	$("#account").blur();
	$("#password").blur();
	
}