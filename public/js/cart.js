$(function(){
    main(function(){
        $('.h_cart').remove();
    });
    if(sessionStorage.uid){
        cartList();
    }
    //购物车列表
    function cartList(){
        $.ajax({
            type:"post",
            url:"php/cart_select.php",
            data:{uid:sessionStorage.uid},
            success:function(d){
                //console.log(d);
                if(d.data.length==0){
                    $(".cartcon_list").html('<h2>购物车中没有任何课程！<a href="course.html">查看全部课程</a></h2>');
                    $(".cart_header em").text(0);
                    $(".cart_header strong").text("0.00");
                }else{
                    var data= d.data;
                    var listHtml="<ul>";
                    var count=0;//总数量
                    var priceSum=0.00;//总金额
                    for(var i=0;i< data.length;i++){
                        listHtml+='<li class="clearfloat" data-ctid="'+data[i].ctid+'">'
                                +'<span><input type="checkbox" class="cart_checkbox"/></span>'
                                +'<a href="course_detail.html?cid='+data[i].courseid+'" class="cart_img"><img src="'+data[i].pic+'" alt=""/></a>'
                                +'<a href="course_detail.html?cid='+data[i].courseid+'" class="cart_title">'+data[i].title+'</a>'
                                +'<i>'+data[i].price+'</i>'
                                +'<div class="operation"><span class="minus">-</span><input type="text" value="'+data[i].count+'"/><span class="add">+</span></div>'
                                +'<strong>¥'+(data[i].price*data[i].count).toFixed(2)+'</strong>'
                                +'<em class="remove"></em>'
                                +'</li>';
                        count+=parseInt(data[i].count);
                        priceSum+=data[i].price*data[i].count;
                    }
                    listHtml+='</ul>';
                    $(".cartcon_list").html(listHtml);
                    $(".cart_header em").text(count);
                    $(".cart_header strong").text(priceSum.toFixed(2));
                }
            }
        });
    }

    //删除
    $(".cartcon_list").on("click",".remove",function(){
        var $thisLi=$(this).parent();
        var ctid=$thisLi.attr("data-ctid");
        $.ajax({
            type:"post",
            url:"php/cart_delete.php",
            data:{ctid:ctid},
            success:function(d){
                if(d.code==1){
                    $thisLi.remove();
                    cartList();
                }
            }
        });
    });

    //批量删除
    $(".cart_delete").click(function(e){
        e.preventDefault();
        var ctids=[];
        $('.cart_checkbox:checked').each(function(index){
            ctids[index]=$(this).parents('li').attr('data-ctid');
        });
        $.ajax({
            type:"post",
            url:"php/cart_delete_more.php",
            data:{ctids:ctids},
            success:function(d){
                //console.log(d);
                if(d.code==1){
                    cartList();
                }
            }
        });
    });

    //清空
    $(".cart_clear").click(function(e){
        e.preventDefault();
        $.ajax({
            type:"post",
            url:"php/cart_empty.php",
            data:{uid:sessionStorage.uid},
            success:function(d){
                //console.log(d);
                if(d.code==1){
                    cartList();
                }
            }
        });
    });

    //更新数量
    $(".cartcon_list").on("click",".operation span",function(e){
        var ctid=$(this).parents("li").attr("data-ctid");
        var n;
        if($(this).is(".minus")){
            n=$(this).siblings("input").val();
            if(n==1) return;
            n--;
        }else{
            n=parseInt($(this).siblings("input").val())+1;
        }
        $.ajax({
            type:"post",
            url:"php/cart_detail_update.php",
            data:{ctid:ctid,count:n},
            success:function(d){
                //console.log(d);
                if(d.code==1){
                    cartList();
                }
            }
        });
    });

    //全选&全不选
    $('.cartcon_list').on('click','.cart_checkbox',function(){
        if($(this).is(":checked")){
            var numC=$('.cartcon_list .cart_checkbox:checked').size();
            var numL=$('.cartcon_list .cart_checkbox').size();
            if(numC==numL){
                $(".checkbox_all").prop("checked",true);
            }
        }else{
            $(".checkbox_all").prop("checked",false);
        }
    });
    $(".checkbox_all").click(function(){
        if($(this).is(":checked")){
            $('.cart_checkbox').prop("checked",true);
        }else{
            $('.cart_checkbox').prop("checked",false);
        }
    });

    //结算
    $('.pay').click(function(){
        location.href="order.html";
    });

});

