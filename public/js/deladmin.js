$(function(){
var isDel = false;

$("a[data-account]").click(function(event) {
	if(isDel == true){
		return;
	}
	isDel = true;
	var account = $(this).attr("data-account");
	
	var btn = this;

	$.post('/admin/deladmin', {
		account:account
	}, function(data, textStatus, xhr) {
		if(data=="your"){
			layer.msg("不能删除自己");
		}else if(data == "notright"){
			layer.msg("权限不够");

		}else if(data=="success"){
			layer.msg("删除成功");
			$(btn).closest('tr').remove();

		}
		isDel = false;
	});

});

});