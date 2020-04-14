$(function(){
    main(function(){

        var type=0;//产品类型
        var pageNum=1;//当前页码
        var pageC=0;//总页数

        //获取type
        var str=window.location.href;
        if(str.lastIndexOf("=")==-1){
            type=0;
        }else{
            type=str.substr(str.lastIndexOf("=")+1);
        }
        navType(type);//导航高亮
        pList(type,pageNum);//显示列表

        //显示课程类型列表
        $.ajax({
            type:'post',
            url:'php/type_select.php',
            success:function(d){
                //console.log(d);
                var htmlStr='';
                for(var i=0;i<d.length;i++){
                    htmlStr+='<a href="" data-tpid="'+d[i].tpid+'">'+d[i].tpname+'</a>';
                }
                $('.course_tag').append(htmlStr);
                //填加高亮
                if(type!=0){
                    $('.course_tag a').eq(0).removeClass();
                    $('.course_tag a').each(function(){
                        if(type==$(this).attr("data-tpid")){
                            $(this).addClass("active");
                        }
                    });
                }
            }
        });

        //切换类型
        $(".course_tag").on('click','a',function(e){
            e.preventDefault();
            if(!$(this).is(".active")){
                $(".course_tag a").removeClass();
                $(this).addClass("active");
                type=$(this).attr("data-tpid")?$(this).attr("data-tpid"):0;
                pageNum=1;
                pList(type,pageNum);
                //导航高亮
                $('.nav>ul>li').removeClass();
                navType(type);
            }

        });

        //页码点击事件
        $(".pages").on('click','a',function(e){
            e.preventDefault();//清除a标记的默认行为
            var index=$(this).index();
            //console.log(index);
            if(index==0){//当点击的是“上一页”的时候
                if(pageNum==1) return;
                pageNum--;
            }else if(index==pageC+1){//当点击的是下一页”的时候
                if(pageNum==pageC) return;
                pageNum++;
            }else{
                pageNum=index;
            }
            pList(type,pageNum);
        });

        //课程列表
        function pList(type,pageNum){
            $.ajax({
                type:"post",
                url:"php/course_select.php",
                data:{type:type,pageNum:pageNum},
                success:function(d){
                    //console.log(d);
                    var data= d.data;
                    var htmlStr="";
                    //课程列表
                    for(var i=0;i<data.length;i++){
                        htmlStr+=`<li class="clearfloat">
                            <a href="course_detail.html?cid=${data[i].cid}" class="course_img"><img src="${data[i].pic}" alt=""/></a>
                            <div class="information">
                            <h2><a href="course_detail.html?cid=${data[i].cid}">${data[i].title}</a></h2>
                            <p>讲师：${data[i].tname}</p>
                            <p>课时：${data[i].cLength}</p>
                            <p>开课时间：${data[i].startTime}</p>
                            <p>上课地点：${data[i].address} <a href="">查看各校区地址</a></p>
                            </div>
                            <span>¥ ${data[i].price}</span>
                            <a href="course_detail.html?cid=${data[i].cid}" class="course_btn">查看详情</a>
                            </li>`;
                    }
                    $(".course_list>ul").html(htmlStr);

                    //页码
                    var pageHtml='<a href="prev">上一页</a>';
                    pageC=d.pageCount;
                    for(var i=1;i<pageC+1;i++){
                        pageHtml+='<a href="'+i+'">'+i+'</a>';
                    }
                    pageHtml+='<a href="next">下一页</a>';
                    $(".pages").html(pageHtml);
                    if(pageNum==1){
                        $(".pages a:first").addClass("default");
                    }
                    if(pageNum==pageC){
                        $(".pages a:last").addClass("default");
                    }
                    $(".pages a").eq(pageNum).addClass("cur");
                }
            });
        }

    });

});

//导航高亮
function navType(type){
    switch (type)
    {
        case '1':
            navText('基础课程');
            break;
        case '2':
            navText('核心课程');
            break;
        case '3':
            navText('进阶课程');
            break;
        default :
            navText('全部课程');
    }
}
