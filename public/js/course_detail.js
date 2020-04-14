$(function(){
    main(function(){
        navText('全部课程')
    });
    //获取cid
    var str=window.location.href;
    var cid=str.substr(str.lastIndexOf("=")+1);
    var uid=sessionStorage.uid;
    //读取数据
    $.ajax({
        type:"post",
        url:"php/course_detail.php",
        data:{cid:cid},
        success:function(d){
            //console.log(d);
            $('.course_img>img').attr("src",d.pic);
            $('.course_info>h2').html(d.title);
            var listHtml=`<li>讲师：${d.tname}</li>
                        <li>课时：${d.cLength}</li>
                        <li>开课时间：${d.startTime}</li>
                        <li>上课地点：${d.address} <a href="address.html">查看各校区地址</a></li>`;
            $(".course_info>ul").html(listHtml);
            $("#price").append(d.price);
            $(".details").append(d.details);
        }
    });
    //是否收藏
    if(uid){
        $.ajax({
            type:"post",
            url:"php/favorite_select.php",
            data:{uid:uid,cid:cid},
            success:function(d){
                //console.log(d);
                if(d.code==1){
                    $('#favorite').text('取消收藏');
                }
            }
        });
    }
    //加入购物车
    $("#addCart").click(function(){
        if(uid){
            $.ajax({
                type:"post",
                url:"php/cart_add.php",
                data:{uid:uid,cid:cid},
                success:function(d){
                    //console.log(d);
                    cartUpdate();
                    alert("添加购物车成功！");
                }
            });
        }else{
            location.href="login.html";
        }
    });

    //收藏
    $('#favorite').click(function(e){
        e.preventDefault();
        if(uid){
            $.ajax({
                type:"post",
                url:"php/favorite_addOrDelete.php",
                data:{uid:uid,cid:cid},
                success:function(d){
                    //console.log(d);
                    if(d.code==1){
                        $('#favorite').text('取消收藏');
                    }else{
                        $('#favorite').text('加入收藏');
                    }
                }
            });
        }else{
            alert('请登录后收藏喜欢的课程！');
        }
    });
});




