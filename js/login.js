define(["jquery", "jquery-cookie"], function(){
     //下拉菜单显示隐藏
     function tab(){
        $(".titlenext").on("mouseenter", ".ul1_li", function(){
            $(this).find($(".nav1_class")).stop(true).animate({
                height:230
            }, 400).css("display","block");
        })
        $(".titlenext").on("mouseleave", ".ul1_li", function(){
            $(this).find($(".nav1_class")).stop(true).animate({
                height:0
            }, 400).css("display","none");
        })
    }
    //导航栏一直在顶部显示
    function clear(){
        $(document).scroll(function(){
            var title = $(".titlenext");
            var ulli = $(".nav1_class")
            if(($(document).scrollTop()) >= 40){
                title.css({
                    position:"fixed",
                    // paddingLfet:10,
                    top:0,
                    width:1250,
                    zIndex:101
                });
                ulli.css({
                    width:1250,
                    marginLeft:0,
                    "zIndex": 100
                })
            }else if(($(document).scrollTop()) < 40){
                title.css({
                    position:"static",
                    // paddingLfet:30,
                });
                ulli.css({
                    width:1250,
                    marginLeft:49
                })
            }
        })
    }
    //导航栏下拉列表位置
    function clear2(){
        $(document).scroll(function(){
            var title = $(".nav1_class");
            var ulli = $(".nav1_class")
            if(($(document).scrollTop()) >= 40){
                title.css({
                    width:1250,
                    top:60,
                    
                });
                ulli.css({
                    width:1250,
                    left:0
                });
            }else if(($(document).scrollTop()) < 40){
                ulli.css({
                    width:1250,
                    top:102
                });
            }
        })
    }

    function clicks(){
        $(".p1").click(function(){
            $(".p1").css("borderBottom", "5px solid blue")
            $(".p2").css("borderBottom", "none")
            $(".child2").css("display", "block")
            $(".child3").css("display", "none")
            return false;
        })
        $(".p2").click(function(){
            $(".p2").css("borderBottom", "5px solid blue")
            $(".p1").css("borderBottom", "none")
            $(".child2").css("display", "none")
            $(".child3").css("display", "block")
            return false;
        })
    }
    function validation(){
        //账号判断
        $(".child3 #i1").blur(function(){
            oValue = $(this).val();
            if($(this).val() == ""){
                $(".div1").css("display", "block")
                $(".div1").find("p").html("*账号不能为空")
            }else if(/\W/.test(oValue)){
                $(".div1").css("display", "block")
                $(".div1").find("p").html("*账号不能为空1")
            }else if(oValue.length < 6 || oValue.length >= 12){
                $(".div1").css("display", "block")
                $(".div1").find("p").html("*账号长度请大于6小于12")
            }else if(!/[a-zA-Z]/.test(oValue[0])){
                $(".div1").css("display", "block")
                $(".div1").find("p").html("*第一位不能为数字")
            }else{
                $(".div1").css("display", "none")
                $(".child3").find(".sp1").html("✅")
            }
        })
        //判断密码
        $(".child3 #i2").blur(function(){
            var oValue = $(this).val();
            if(oValue.length < 6){
                $(".div2").css("display", "block")
                $(".div2").find("p").html("*密码长度不能小于6位")
            }else{
                $(".div2").css("display", "none")
                $(".child3").find(".sp2").html("✅")
            }
        })
        $(".child3 #i3").blur(function(){
            var oValue1 = $(this).val();
            var oValue2 = $("#i2").val();
            if(oValue1 == oValue2){
                $(".div3").css("display", "none")
                $(".child3").find(".sp3").html("✅")
            }else{
                $(".div3").css("display", "block")
                $(".div3").find("p").html("*两次密码输入不正确")
            }
        })
        $(".child3 #i4").blur(function(){
            var str = /^\d{17}(\d|X)$/;
            var oValue = $(this).val();
            if(str.test(oValue)){
                $(".div4").css("display", "none")
                $(".child3").find(".sp4").html("✅")
            }else{
                $(".div4").css("display", "block")
                $(".div4").find("p").html("*身份证号错误")
            }
        })
        $(".child3 #i5").blur(function(){
            var str = /^[1][3,4,5,7,8][0-9]{9}$/;
            var oValue = $(this).val();
            if(str.test(oValue)){
                $(".div5").css("display", "none")
                $(".child3").find(".sp5").html("✅")
            }else{
                $(".div5").css("display", "block")
                $(".div5").find("p").html("*手机号错误")
            }
        })
    }
    //注册
    function download(){
        var username = $(".child3 #i1").val();//用户名
        var password = $(".child3 #i2").val();//密码
        var repassword = $(".child3 #i3").val();//二次密码
        var idcard = $(".child3 #i4").val();//身份证
        var tel = $(".child3 #i5").val();//电话号码
        var btnReg = $(".child3 .btn2");//注册
        var warning1 = $(".div5").find("p");
        var warning2 = $(".div5");
        btnReg.click(function(){
            $.ajax({
                type: "post",
                url: "../login.php",
                data: {
                    username: username,
                    password: password,
                    repassword: repassword,
                    idcard: idcard,
                    tel: tel,
                    date: (new Date()).getTime()
                },
                success: function(result){
                    var obj = JSON.parse(result);
                    if(obj.code){
                        warning1.css("color","red")
                    }else{
                        warning1.css("color","green")
                    }
                    warning2.css("display", "block")
                    warning1.html(obj.message)
                },
                error: function(msg){
                    console.log(msg)
                }
            })
        })
    }
    //登录
    function login1(){
        var ovalue1 = $(".child2").find(".in1").val();
        var ovalue2 = $(".child2").find(".in2").val();
        var btn = $(".child2").find(".btn1");
        var w1 = $(".child2").find(".p_top").find("p");
        var w2 = $(".child2").find(".p_top");
        btn.click(function(){
            $.ajax({
                type: "post",
                url: "../login2.php",
                data: {
                    username: ovalue1,
                    password: ovalue2
                },
                success: function(result){
                    var obj = JSON.parse(result);
                    if(obj.code){
                        w1.css("display", "block")
                        w1.css("color","red")
                    }else{
                        w1.css("display", "block")
                        w1.css("color","green");
                    }
                    w1.css("display", "block")
                    w1.html(obj.message)
                },
                error: function(msg){
                    console.log(msg);
                }
            })
        })
    }
    return {
        clear2:clear2,
        clear:clear,
        tab:tab,
        clicks:clicks,
        validation:validation,
        download:download,
        login1:login1
    }
});