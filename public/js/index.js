$(function(){
    main(function(){
        navText('首页');
    });

    carousel();//图片轮播
    //名师堂
    $.ajax({
        type:'post',
        url:'php/teachers_select.php',
        success:function(d){
            // console.log(d);
            var htmlStr='';
            for(var i=0;i<d.length;i++){
                htmlStr+='<li>'
                +'<a href=""><img src="'+d[i].tpic+'" alt=""/></a>'
                +'<p>讲师：'+d[i].tname+'</p>'
                +'<span>主讲：'+d[i].maincourse+'</span>'
                +'</li>';
            }
            $('.ind_teacher').html(htmlStr);
        }
    });
    //最新课程
    $.ajax({
        type:"post",
        url:"php/ind_new_course.php",
        success:function(data){
            var htmlStr="";
            //课程列表
            for(var i=0;i<4;i++){
                htmlStr+=`<li>
                        <a href="" class="a_img"><img src="${data[i].pic}" alt=""/></a>
                        <a href="" class="a_text">${data[i].title}</a>
                        <p>讲师：${data[i].tname}</p>
                        <strong>¥ ${data[i].price}</strong>
                        </li>`;
            }
            $(".ind_1 .course").html(htmlStr);
        }
    });
});


//banner图片轮播
function carousel(){
    var number=$(".banner ul li").size()-1;//图片的数量
    var cur=0;//当前显示的图片
    var timer=0;//定时器

    //下一个
    function slideNext(){
        if(cur<number){
            $(".banner ul li").eq(cur).css({'z-index':10}).stop().fadeOut();
            $(".banner ul li").eq(cur+1).css({'z-index':20}).stop().fadeIn();
            $(".indicator a").removeClass().eq(cur+1).addClass("cur");
            cur+=1;
        }else{
            $(".banner ul li").eq(cur).css({'z-index':10}).stop().fadeOut();
            $(".banner ul li").eq(0).css({'z-index':20}).stop().fadeIn();
            $(".indicator a").removeClass().eq(0).addClass("cur");
            cur=0;
        }
    }
    //上一个
    function slidePrev(){
        if(cur>0){
            $(".banner ul li").eq(cur).css({'z-index':10}).stop().fadeOut();
            $(".banner ul li").eq(cur-1).css({'z-index':20}).stop().fadeIn();
            $(".indicator a").removeClass().eq(cur-1).addClass("cur");
            cur-=1;
        }else{
            $(".banner ul li").eq(cur).css({'z-index':10}).stop().fadeOut();
            $(".banner ul li").eq(number).css({'z-index':20}).stop().fadeIn();
            $(".indicator a").removeClass().eq(number).addClass("cur");
            cur=number;
        }
    }

    timer=setInterval(slideNext,3000);

    //当鼠标移入banner时，清除定时器
    $(".banner").mouseover(function(){
        clearInterval(timer);
    });
    $(".banner").mouseout(function(){
        timer=setInterval(slideNext,3000)
    });

    //上一个、下一个
    $(".banner .prev").click(function(){
        slidePrev();
    });
    $(".banner .next").click(function(){
        slideNext();
    });

    //小圆点指示器
    $(".indicator>a").mouseover(function(){
        var now=$(this).index();//获取鼠标移入的是第几个a标记
        $(".indicator>a").removeClass();//删除a标记中的class=cur
        $(this).addClass("cur");//为此a标记添加cur样式
        $(".banner ul li").eq(cur).css({'z-index':10}).stop().fadeOut();//隐藏当前的图片
        $(".banner ul li").eq(now).css({'z-index':20}).stop().fadeIn();//显示和a序列号一样的图片
        cur=now;//为变量cur重新赋值，以便于再次启用定时器的时候，从当前显示的图片开始播放
    });
}
//banner图片轮播结束

//作业1：对图片轮播基础代码进行优化：
// 1.jquery选择器元素查找存到变量中；
// 2.上一个下一个函数整合；
// 3.指示器中增加是否当前显示的项的判断；
// 4.将图片轮播封装到对象中；
// 5.其它
//作业2：首页产品部分，改成横向无缝滚动