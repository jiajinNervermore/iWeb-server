$(function(){
	main(function(){
		navText('名师堂')
	});

	$.ajax({
		type:'post',
		url:'php/teachers_select.php',
		success:function(d){
			// console.log(d);
			var htmlStr='';
			for(var i=0;i<d.length;i++){
				htmlStr+='<li class="clearfloat">'
			            +'<img src="'+d[i].tpic+'" alt=""/>'
		                +'<div>'
		                +'<h3>'+d[i].tname+'<span>'+d[i].maincourse+'</span></h3>'
		                +'<dl>'
		                +'<dt>工作经历：</dt>'
		                +'<dd>'+d[i].experience+'</dd>'
		                +'</dl>'
		                +'<dl>'
		                +'<dt>授课风格：</dt>'
		                +'<dd>'+d[i].style+'</dd>'
		                +'</dl>'
		                +'</div>'
		            	+'</li>';
			}
			$('.teacher_list>ul').html(htmlStr);
		}
	});
});





