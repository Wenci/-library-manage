$(function(){
	$("#drop>li").click(function(event) {
		$("#drop>li").removeClass('active');
		$(this).addClass('active');
		$("#search-way>span:first").html($(this).text()+"&nbsp;");
	});

	$("#search-key").bind('input propertychange', function(event) {
		postGetBook(0,10,initPagination);
	});

	$("#pre-page").click(function(){
		if($("#page-num>a").text() == 1){
			layer.msg("已经是第一页了");
			return;
		}
		var n = parseInt($("#page-num>a").text());
		$("#page-num>a").text(n-1);
		postGetBook(n-2,10,initPagination);

	});

	$("#next-page").click(function(event) {
		console.log(nowPageNum);
		if($("#page-num>a").text() == nowPageNum){
			layer.msg("已经是最后一页了");
			return;
		}
		var n = parseInt($("#page-num>a").text());
		$("#page-num>a").text(n+1);
		postGetBook(n,10,initPagination);
	});

	//初始化搜索结果
	postGetBook(0,10,initPagination);
});

var nowPageNum;

//pageNum 代表每页多少个记录
//page 代表第几页
function postGetBook(page,pageNum,callback){
	var i = $("#drop>li.active").index();
	var ways = ['name','lib_id'];
	$.post('/fn/findbook', {
		keyName: $("#search-key").val(),
		way: ways[i],
		page: page,
		pageNum: pageNum
	}, function(data, textStatus, xhr) {
		/*optional stuff to do after success */
		console.log(data);
		addDataToHtml(data,page,pageNum);
		if(callback){
			callback(data,page,pageNum);
		}
		nowPageNum = parseInt(data.num/pageNum)+1;
	});
}

function addDataToHtml(data, page, pageNum){

	var book = data.book;
	var tbody = $('<tbody></tbody>');
	for(var i = 0;i<book.length;i++){

		tbody.append(getTr(book[i],transSort(data.sort),page*pageNum+i+1));

	}

	$("#results>tbody").replaceWith(tbody);
}

function getTr(data,sort,i){
	var tr = $('<tr></tr>');
	var td = [];
	td[0] = $('<td>'+i+'</td>');
	td[1] = $('<td>'+data.name+'</td>');
	td[2] = $('<td>'+data.author+'</td>');
	td[3] = $('<td>'+sort[data.sort_id]+'</td>');
	td[4] = $('<td>'+data.lib_id+'</td>');
	td[5] = $('<td>'+data.num+'</td>');
	td[6] = $('<td>'+data.press+'</td>');
	td[7] = $('<td>'+data.isbn+'</td>');
	td[8] = $('<td>'+data.create_time.substr(0,10)+'</td>');
	td[9] = $('<td>'+(data.num-data.borr_num)+'</td>');
	for (var i = 0; i < td.length; i++) {
		td[i].appendTo(tr);
	};
	return tr;
}

function transSort (sort) {

	var newSort = {};
	for (var i = 0; i < sort.length; i++) {
		newSort[sort[i].id] = sort[i].name;
	};

	return newSort;
}

function initPagination(data,page,pageNum){

	if(data.num<pageNum){
		$("#page-row").css({
			display: 'none',
		});
		return;
	}else{
		$("#page-row").css({
			display: 'block',
		});
	}

}