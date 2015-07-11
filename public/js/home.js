$(function(){
	//添加随机数字，防止缓存
	var random = +new Date();
	$("#random").val(random);
	var i = $("#drop>li.active").index();
	var ways = ['name','lib_id'];
	$("#inputway").val(ways[i]);


	$("#query").bind('input propertychange', function(event) {
		if($("#query").val() === ""){
			$("#search-hint>ul:first").css({display: 'none'})
			return;
		}
		postGetBook(0,5,addDataToHint,5);
	});



	//选择类型

	$("#drop>li").click(function(event) {
		$("#drop>li").removeClass('active');
		$(this).addClass('active');
		$("#search-way>span:first").text($(this).text());
		var i = $("#drop>li.active").index();
		var ways = ['name','lib_id'];
		$("#inputway").val(ways[i]);
	});

	$("#search-hint").bind('click', function(event) {
		
		if(event.target.nodeName.toLowerCase() === 'li'){
			$("#query").val(event.target.textContent);
			$("#search-hint>ul:first").css({display: 'none'})
		}
	});


	$("#go").click(function(event) {
		/* Act on the event */
		$("#search").submit();
	});
});




//pageNum 代表每页多少个记录
//page 代表第几页
function postGetBook(page,pageNum,callback){
	var i = $("#drop>li.active").index();
	var ways = ['name','lib_id'];
	$.post('/userfindbook', {
		keyName: $("#query").val(),
		way: ways[i],
		page: page,
		pageNum: pageNum
	}, function(data, textStatus, xhr) {
		if(callback){
			callback(data,ways[i]);
		}
	});
}

function addDataToHint(data,way){
	var ul = $("<ul></ul>")
	var book = data.book;
	for (var i = 0; i < book.length; i++) {
		ul.append(getLi(book[i][way]));
	};
	$("#search-hint>ul:first").replaceWith(ul);
	$("#search-hint>ul:first").css({
		display: 'block'});
}
function getLi(value){
	return $("<li>"+value+"</li>");
}