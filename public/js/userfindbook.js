$(function(){
	$("#drop>li").click(function(event) {
		$("#drop>li").removeClass('active');
		$(this).addClass('active');
		$("#search-way>span:first").html($(this).text()+"&nbsp;");
	});

	$("#search-key").bind('input propertychange', function(event) {
		/*console.log($("#search-key").val());
		if($("#search-key").val() === ""){
			return;
		}*/
		nowPageNum = 0;
		postGetBook(0,20,0);
	});

	$(window).scroll(function(event) {
		
		if(  $(document).height() -( $(window).height()+$(document).scrollTop() )<= 0 )
        {
            index = layer.load(0, {shade: false});
            postGetBook(nowPageNum,20,1);
        }

	});

	$("#results").click(function(event) {
		var target = event.target;
		if($(target).attr('data-disable')=="true"){
			return;
		}
		if(event.target.nodeName.toLowerCase()==='a'){
			$(target).attr('data-disable','true');
			$.post('/borrow',{
				bookId:event.target.getAttribute('data-id')
			}, function(data, textStatus, xhr) {
				$(target).attr('data-disable','false');
				if(data=="success"){
					layer.msg("借阅成功");
					var numTd = $(target).parent().prev();
					numTd.text(parseInt(numTd.text())-1);
					
				}else if(data=="error"){
					layer.msg("借阅失败");
				}else if(data == "notmore"){
					layer.msg("该书已经被借完");
				}else if(data =="5"){
					layer.msg("你已经借阅了五本图书,不能借阅更多");
				}else if(data == "login"){
					inputPassword(event.target.getAttribute('data-id'));
				}
			});
		}
	});



	//back to top
	// browser window scroll (in pixels) after which the "back to top" link is shown
	var offset = 300,
		//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
		offset_opacity = 1200,
		//duration of the top scrolling animation (in ms)
		scroll_top_duration = 700,
		//grab the "back to top" link
		$back_to_top = $('.cd-top');

	//hide or show the "back to top" link
	$(window).scroll(function(){
		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
		if( $(this).scrollTop() > offset_opacity ) { 
			$back_to_top.addClass('cd-fade-out');
		}
	});

	//smooth scroll to top
	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
		 	}, scroll_top_duration
		);
	});


	//输入密码

	$("#pass-form").submit(function(event) {
		

		$.post('/confirmpass',{
			password: $("#password").val()
		}, function(data, textStatus, xhr) {
			if(data=="success"){
				$("#confirm").css({display: 'none'});
				$("a[data-id="+$("#confirm").attr('data-id')+"]").click();
			}else{
				layer.msg("密码错误");
			}
		});
		return false;
	});




});
var index;//记录layer 弹窗名
var nowPageNum=0;

//pageNum 代表每页多少个记录
//page 代表第几页
function postGetBook(page,pageNum,type,callback){
	var i = $("#drop>li.active").index();
	var ways = ['name','lib_id'];
	$.post('/userfindbook', {
		keyName: $("#search-key").val(),
		way: ways[i],
		page: page,
		pageNum: pageNum
	}, function(data, textStatus, xhr) {
		//console.log(data.book.length);
		if(data.book.length === 0 && type === 1){
			layer.close(index);
			layer.msg("没有更多的了");
		}
		addDataToHtml(data,page,type,pageNum);
		if(callback){
			callback(data,page,pageNum);
		}
		nowPageNum++;
	});
}

function addDataToHtml(data, page,type, pageNum){

	var book = data.book;
	var tbody = $('<tbody></tbody>');
	if(type != 0){
		tbody = $("#results>tbody:first");
	}
	for(var i = 0;i<book.length;i++){

		tbody.append(getTr(book[i],page*pageNum+i+1));

	}
	if(type === 0){
		$("#results>tbody").replaceWith(tbody);
	}
	setTimeout(function(){
		layer.close(index);
	}, 1000);
}

function getTr(data,n){
	var tr = $('<tr></tr>');
	var td = [];
	td[0] = $('<td>'+n+'</td>');
	td[1] = $('<td>'+data.name+'</td>');
	td[2] = $('<td>'+data.author+'</td>');
	td[3] = $('<td>'+data.lib_id+'</td>');
	td[4] = $('<td>'+data.isbn+'</td>');
	td[5] = $('<td>'+(data.num-data.borr_num)+'</td>');
	td[6] = $("<td><a href='javascript:void(0)' class='btn btn-primary btn-xs'  data-id='"+ data.id +"'>借阅</a></td>");
	for (var i = 0; i < td.length; i++) {
		tr.append(td[i]);
	};
	return tr;
}



function inputPassword(id){
	$("#confirm").css({display: 'block'});
	$("#confirm").attr('data-id', id);
}