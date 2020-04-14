function main(callback){
	$(".header_box").load("header.html",function(){
		//判断用户是否登录
		if(sessionStorage.uid){//已登录
			//生成个人中心入口及下拉菜单
			var userStr=`<a href="user/user.html"><em class="icon-user"></em>个人中心<em class="icon-triangle"></em></a>
						<div class="user_dropdown">
						<p><span>${sessionStorage.uname}</span>，您好~<br>您在i前端共购买了<span>6</span>门课程。</p>
						<div class="userlink_1 clearfloat">
						<a href="">我购买的课程</a>
						<a href="">我的收藏</a>
						</div>
						<div class="userlink_2 clearfloat">
						<a href="user/user.html">进入个人中心</a>
						<a href="" class="user_quit">退出登陆</a>
						</div>
						</div>`;
			$('.nav_user').html(userStr);
			//个人中心下拉菜单
			$(".nav_user").mouseover(function(){
				$(".user_dropdown").stop().slideDown(100);
			}).mouseout(function(){
				$(".user_dropdown").stop().slideUp(100);
			});
			//退出登录
			$(".user_quit").click(function(){
				sessionStorage.clear();
			});
			cartUpdate();//更新购物车
		}
		if(callback){
			callback();//调用回调函数
		}
	});
}

//购物车下拉菜单数据列表
function cartUpdate(){
	$.ajax({
		type:"post",
		url:"php/cart_select.php",
		data:{uid:sessionStorage.uid},
		success:function(d){
			//console.log(d);
			if(d.data.length==0){
				$(".cart_dropdown").html('<h3>您的购物车为空~</h3>');
			}else{
				var data= d.data;
				var count=0;
				var priceSum=0;
				var listHtml='<ul>';
				for(var i=0;i< data.length;i++){
					listHtml+='<li class="clearfloat" data-ctid="'+data[i].ctid+'">'
					+'<a href="course_detail.html?cid='+data[i].courseid+'"><img src="'+data[i].pic+'" alt=""/></a>'
					+'<dl>'
					+'<dt><a href="course_detail.html?cid='+data[i].courseid+'">'+data[i].title+'</a></dt>'
					+'<dd>¥'+data[i].price+' <span>x '+data[i].count+'</span></dd>'
					+'</dl>'
					+'<em class="icon-remove"></em>'
					+'</li>';
					count+=parseInt(data[i].count);
					priceSum+=data[i].price*data[i].count;
				}
				listHtml+='</ul>';
				listHtml+='<div class="sum clearfloat">'
				+'<p>共计：<span>¥'+priceSum.toFixed(2)+'</span></p>'
				+'<a href="cart.html">去结算</a>'
				+'</div>';
				$(".cart_dropdown").html(listHtml);
				$("#cart_sum").text(count);
			}
		}
	});
}
//删除购物车
$(".header_box").on('click','.icon-remove',function(){
	var $thisLi=$(this).parent();
	var ctid=$thisLi.attr("data-ctid");
	$.ajax({
		type:"post",
		url:"php/cart_delete.php",
		data:{ctid:ctid},
		success:function(d){
			if(d.code==1){
				$thisLi.remove();
				cartUpdate();//刷新头部购物车列表
			}
		}
	});
});
//导航高亮
function navText(text){
	//console.log(text);
	$(".nav>ul>li").each(function(){
		var thisText=$(this).children("a").text();
		if(thisText==text){
			//console.log(thisText);
			//$("nav li").removeClass("active");
			$(this).addClass("active");
		}
	});
}






