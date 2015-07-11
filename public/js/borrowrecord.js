$(function(){



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
	
	$.post('/user/borrowrecord', {
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

		tbody.append(getTr(book[i],data.borrow[i],page*pageNum+i+1));

	}

	$("#results>tbody").replaceWith(tbody);
}

function getTr(book,borrow,i){
	var tr = $('<tr></tr>');
	var td = [];

	td[0] = $('<td>'+i+'</td>');

	td[1] = $('<td>'+book.name+'</td>');

	td[2] = $('<td>'+book.author+'</td>');
	
	td[3] = $('<td>'+book.lib_id+'</td>');

	td[4] = $('<td>'+book.isbn+'</td>');

	td[5] = $('<td>'+borrow.borrow_date.substr(0,10)+'</td>');

	td[6] = $('<td>'+borrow.return_date.substr(0,10)+'</td>');



	for (var i = 0; i < td.length; i++) {
		td[i].appendTo(tr);
	};
	return tr;
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

