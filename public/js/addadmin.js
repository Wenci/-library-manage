$(function(){
	var acIsOk = false;
	$("#account").blur(function(event) {
		acIsOk = false;
		var account = $(this).val();
		console.log(account.length<6);
		if(account == ""){
			$(this).parent().next().text("*不能为空");
			$(this).parent().next().css('display', 'block');
			return;
		}else if(account.length<6){
			$(this).parent().next().text("*管理员账号不能少于六位");
			$(this).parent().next().css('display', 'block');
			return;
		}
		$.post('/admin/queryadminaccount',{
			account:account
		}, function(data, textStatus, xhr) {
			console.log(data);
			if(data==="error"){
				$("#account-info").text('服务器错误');
				$("#account-info").css('display', 'block');
			}else if(data==="ok"){
				$("#account-info").css('display', 'none');
				acIsOk = true;
			}else if(data==="has"){
				$("#account-info").text('该管理员账号已经存在');
				$("#account-info").css('display', 'block');
			}
		});
	});
	var passIsOk = false;

	$("#password").blur(function(event) {
		passIsOk = false;
		var password = $(this).val();
		if(password == ""){
			$(this).parent().next().text("*不能为空");
			$(this).parent().next().css('display', 'block');
			return;
		}else if(password.length<6){
			$(this).parent().next().text("*密码太简单");
			$(this).parent().next().css('display', 'block');
			return;
		}
		passIsOk = true;
		$(this).parent().next().css('display', 'none');

	});
	var myPassIsOK = false;
	$("#mypassword").blur(function(event) {
		myPassIsOK = false;
		var mypassword = $(this).val();

		if(mypassword == ""){
			$(this).parent().next().text("*不能为空");
			$(this).parent().next().css('display', 'block');
			return;
		}
		myPassIsOK = true;
		$(this).parent().next().css('display', 'none');

	});


	var isSubmit = false;
	$("#user-form").submit(function(event) {
		if(isSubmit==true){
			return false;
		}
		isSubmit = true;
		if(acIsOk==false || passIsOk == false || myPassIsOK ==false){
			isSubmit = false;
			return false;
		}
		$.post('/admin/addadmin', {
			account:$("#account").val(),
			password: $("#password").val(),
			myPassword: $("#mypassword").val(),
			right: $("#right").val()
		}, function(data, textStatus, xhr) {
			/*optional stuff to do after success */
			if(data=="error"){
				layer.msg("添加失败");
			}else if(data=="success"){
				layer.msg("添加成功");
				window.location.reload();
			}else if(data=="passwrong"){
				layer.msg("密码错误");
			}
			isSubmit = false;
		});

		return false;
	});
});