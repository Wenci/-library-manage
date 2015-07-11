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

		$.post('/admin/changepass',{
			oldPassword: oldPass,
			newPassword: newPass
		}, function(data, textStatus, xhr) {
			isChange = false;
			console.log(data);
			if(data == "error"){

				layer.msg("修改失败");
				window.location.reload();

			}else if(data =="success"){
				layer.msg("修改成功");
				window.location.reload();
			}else if(data == "passwrong"){
				layer.msg("密码错误");
				window.location.reload();
			}
		});

	});