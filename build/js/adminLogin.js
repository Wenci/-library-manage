$(function(){
	$("#admin-form").submit(function(event) {
		console.log({
			account: $("#account").val(),
			password: $("#password").val()
		});
		$.post('/admin/login', {
			account: $("#account").val(),
			password: $("#password").val()
		}, function(data, textStatus, xhr) {
			/*optional stuff to do after success */

			if(data === 'error'){
				layer.msg('用户名或密码错误');
			}else if(data === 'success'){
				window.location.href = "/admin/panel";
			}
		});

		return false;
	});
});