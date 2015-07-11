$(function(){
	var isSubmit = false;
	$("#book-form").submit(function(){
		if(isSubmit == true){
			return false;
		}
		isSubmit == true;
		if($(".wrong-info:visible").length>0){
			layer.msg("请输入满足要求的内容");
			isSubmit = false;
			return false;
		}
		var book = {
			name: $("#name").val(),
			author: $("#author").val(),
			sort: $("#sort").val(),
			num: $("#num").val(),
			press: $("#press").val(),
			libId:　$("#libId").val(),
			isbn: $("#isbn").val()
		};
		$.post('/admin/addbook',book, function(data, textStatus, xhr) {
			/*optional stuff to do after success */
			var content = ['请重新登录','添加失败','添加成功'];
			layer.msg(content[data.type]);
			if(data.type === 2 ){
				layer.msg('添加成功');
				//initInput();
			}else if(data.type == 1){
				layer.msg('添加失败');
			}else{
				layer.msg('添加失败');
				window.location.reload();
			}
			isSubmit = false;
		});
		return false;
	});

	//检查不能为空

	$("#book-form input").blur(function(event) {
		var value = $(this).val();
		if(value == ""){
			$(this).parent().next().text("*不能为空");
			$(this).parent().next().css('display', 'block');
		}else{
			$(this).parent().next().css('display', 'none');
		}
	});

	$("#num").blur(function () {
		var value = $(this).val();
		if(isNaN(value)){
			$(this).parent().next().text("*只能是数字");
			$(this).parent().next().css('display', 'block');
		}else{
			$(this).parent().next().css('display', 'none');
		}
	});

	$("#libId").blur(function(event) {
		var value = $(this).val();
		if(value == ""){
			return;
		}
		$.post('/fn/verifybook', {
			type: 'lib_id',
			value: value
		}, function(data, textStatus, xhr) {
			if(data == "error"){
				$("#libId").parent().next().text("服务器错误");
				$("#libId").parent().next().css('display', 'block');
			}else if(data == "has"){
				$("#libId").parent().next().text("书籍编号已经存在不能重复");
				$("#libId").parent().next().css('display', 'block');
			}else if(data == "nothave"){
				$("#libId").parent().next().css('display', 'none');
			}
		});

	});
	$("#isbn").blur(function(event) {
		var value = $(this).val();
		if(value == ""){
			return;
		}
		$.post('/fn/verifybook', {
			type: 'isbn',
			value: value
		}, function(data, textStatus, xhr) {
			console.log(data);
			if(data == "error"){
				$("#isbn").parent().next().text("服务器错误");
				$("#isbn").parent().next().css('display', 'block');
			}else if(data == "has"){
				$("#isbn").parent().next().text("标准书号已经存在不能重复");
				$("#isbn").parent().next().css('display', 'block');
			}else if(data == "nothave"){
				$("#isbn").parent().next().css('display', 'none');
			}
		});

	});
});

function initInput(){ 

	$("#name").val("");
	$("#author").val("");
	$("#sort").val("");
	$("#num").val("");
	$("#press").val("");
	$("#libId").val("");
	$("#isbn").val("");

}

