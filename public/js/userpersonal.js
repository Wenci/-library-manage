$(function(){

		$("#left_nav>li").click(function(event) {

			$("#left_nav>li.active").removeClass('active');

			$(this).addClass('active');
			if($(this).index() == 0){
				$("#person-data").css('display', 'block');
				$("#change-password").css('display', 'none');
				$("#person-title").text("个人信息");
			}else{
				$("#person-data").css('display', 'none');
				$("#change-password").css('display', 'block');
				$("#person-title").text("修改密码");
			}
			
		});
	$("a.edit").click(function(event) {
			
		$(this).closest("li").css('display', 'none');
		$(this).closest("li").next().css('display', 'block');
		

	});

	$("a[data-type=cancel]").click(function(event) {
		$(this).closest("li").css('display', 'none');
		$(this).closest("li").prev().css('display', 'block');
	});
	var isSubmit = false;

	$("a.submit").click(function(event) {
		if(isSubmit == true){
			return;
		}
		isSubmit = true;
		var type = $(this).attr('data-type');
		var value;
		if(type == "sex"){
			value = $("input:radio:checked").val();
		}else{
			value = $("#"+type).val();
		}
		if(value==""){
			layer.msg("请输入内容");
			isSubmit = false;
			return;
		}else{
			if(type=="phone"){
				var reg = /^1[3|4|5|8][0-9]\d{4,8}$/;
				if(!reg.test(value)){
					layer.msg("手机号码格式不正确");
					isSubmit = false
					return;
				}
			}
		}
		console.log({
			type:type,
			newValue: value
		});
		$.post('/user/personal',{
			type:type,
			newValue: value
		}, function(data, textStatus, xhr) {
			isSubmit = false;
			/*optional stuff to do after success */
			if(data == "error"){

				layer.msg("修改失败");
				window.location.reload();

			}else if(data =="success"){
				layer.msg("修改成功");
				window.location.reload();
			}
		});

	});






	var isChange = false;
	$("#submit-pass").click(function(event) {
		if(isChange==true){
			return;
		}
		isChange = true;
		var oldPass = $("#old-pass").val();
		var newPass = $("#new-pass").val();
		if(oldPass.length<6){
			layer.msg("请输入正确的当前密码");
			isChange = false;
			return;
		}
		if(newPass == ""){
			layer.msg("请输入新密码");
			isChange = false;
			return;
		}
		if(newPass.length<6){
			layer.msg("新密码过于简单");
			isChange = false;
			return;
		}
		if(oldPass == newPass){
			layer.msg("新密码和当前密码一样");
			isChange = false;
			return;
		}

		$.post('/user/personal',{
			type:"password",
			oldPassword: oldPass,
			newPassword: newPass
		}, function(data, textStatus, xhr) {
			isChange = false;
			if(data == "error"){

				layer.msg("修改失败");
				window.location.reload();

			}else if(data =="success"){
				layer.msg("修改成功");
				window.location.reload();
			}
		});

	});
});