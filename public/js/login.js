$(function(){
    main();

	$("#uname").blur(unameCheck);
    $("#upwd").blur(pwdCheck);

    $("#login").click(function(){
        if(unameCheck()&&pwdCheck()){
            var uname=$.trim($("#uname").val());
            var upwd=$.trim($("#upwd").val());
            $.ajax({
                type:"post",
                url:"php/user_login.php",
                data:{unameOrPhone:uname,upwd:upwd},
                success:function(d){
                    // console.log(d);
                    if(d.code!=1){
                        $("#uname").parents('dl').find('.tips').show().text("用户名或密码不正确");
                    }else{
                        sessionStorage.uid= d.uid;
                        sessionStorage.uname= d.uname;
                        history.go(-1);
                    }
                }
            });
        }
    });
});

function unameCheck(){
    var uname= $.trim($("#uname").val());
    if(!uname){//用户名为空的时候
        $("#uname").parents('dl').find('.tips').show().text("用户名不能为空");
        $("#uname").siblings('i').show();
        return false;
    }else{
        $("#uname").parents('dl').find('.tips').hide();
        $("#uname").siblings('i').hide();
        return true;
    }
}
function pwdCheck(){
    var pwd= $.trim($("#upwd").val());
    if(!pwd){//密码为空的时候
        $("#upwd").parents('dl').find('.tips').show().text("密码不能为空");
        $("#upwd").siblings('i').show();
        return false;
    }else{
        $("#upwd").parents('dl').find('.tips').hide();
        $("#upwd").siblings('i').hide();
        return true;
    }
}










