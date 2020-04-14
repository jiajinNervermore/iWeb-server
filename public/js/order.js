$(function(){
  main(function(){
    $('.h_cart').remove();
  });
  orderList();//生成订单列表

  //地址选择
  $('.user_address>ul>li').click(function(){
    $('.user_address>ul>li').removeClass();
    $(this).addClass('active');
  });

  //订单列表
  function orderList(){
    $.ajax({
      type:"post",
      url:"php/cart_select.php",
      data:{uid:sessionStorage.uid},
      success:function(d){
        //console.log(d);
        var data= d.data;
        var listHtml="";
        var priceSum=0.00;//总金额
        for(var i=0;i< data.length;i++){
          listHtml+='<li>'
          +'<img src="'+data[i].pic+'" alt=""/>'
          +'<h4>'+data[i].title+'</h4>'
          +'<span>¥'+data[i].price+'</span>'
          +'<em>'+data[i].count+'</em>'
          +'<strong>¥'+(data[i].price*data[i].count).toFixed(2)+'</strong>'
          +'</li>';
          priceSum+=data[i].price*data[i].count;
        }
        $(".order_list ul").html(listHtml);
        $("#priceSum").append(priceSum.toFixed(2));
        $('#paySum').append((priceSum+12).toFixed(2));
      }
    });
  }

  $('.order_sum button').click(function(){
    $.ajax({
      type:"post",
      url:"php/order.php",
      data:{uid:sessionStorage.uid},
      success:function(d){
        //console.log(d);
        alert('生成订单成功!');
        location.href='index.html';
      }
    });
  });


});