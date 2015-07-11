$(function(){
	$("#book-form").submit(function(){
		var book = {
			id: $("#book-form").attr('data-id'),
			name: $("#name").val(),
			author: $("#author").val(),
			sort: $("#sort").val(),
			num: $("#num").val(),
			press: $("#press").val(),
			libId:　$("#libId").val(),
			isbn: $("#isbn").val()
		};

		$.post('/fn/editonebook',book, function(data, textStatus, xhr) {
			/*optional stuff to do after success */
			if(data === "error"){
				layer.msg("跟新失败");
			}else if(data === "success"){
				layer.msg("跟新成功",function(){
					window.location.reload();
				});
			}
		});
		return false;
	});

});