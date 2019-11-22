define(["jquery", "jquery-cookie"], function($){
    num();
    function ajax(){
        $.ajax({
            type: "get",
            url: "../data/titles.json",
            success:function(obj){
                for(var i = 0; i < obj.length; i++){
                    var node = $(`<li class="ul1_li">
                    <a class="ul_a" href="list.html">${obj[i].titles}</a>
                    <div class="nav1_class" id="nav1_id${i}">
                    <ul class="nav1_ul1_class" id="nav1_ul1_id${i}"></ul>
                    <ul class="nav1_ul2_class" id="nav1_ul2_id${i}"></ul>
                    </div>
                    </li>
                    `);
                    $(node).appendTo($(".ul1"));
                    
                    var imgs = obj[i].childs;
                    for(var j = 0; j < imgs.length; j++){
                        var node2 = $(`
                        <li class="nav1_ul1_li_class">
                        <a href="#">
                            <img src="${imgs[j].img}" alt="1"><br>
                            ${imgs[j].title}
                        </a>
                    </li>
                        `);
                    node2.appendTo(node.find($(".nav1_ul1_class")));
                    }

                    if(obj[i].childss){
                        var childs1 = obj[i].childss;
                    for(var k = 0; k < childs1.length; k++){
                        var spacli = `<li><a href="">${childs1[k]}</a></li>`;
                        // alert(spacli);
                        $(spacli).appendTo(node.find($(".nav1_ul2_class")));
                    }
                    }
                }
            },
            error:function(msg){
                console.log(msg);
            }
        })
    }
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

    //加载详情物品图片
    function updata(){
        $.ajax({
            url:"../data/updata.json",
            success: function(obj){
                for(var i = 0; i < obj.length; i++){
                    var node1 = $(`
                    <img src="${obj[i].img1}" alt="">
                    `);
                    node1.appendTo(".rom");
                    var node2 = $(`
                    <img src="${obj[i].img2}" alt="">
                    `);
                    node2.appendTo(".img_find");
                    var node3 = $(`
                    <a href="#"><img src="${obj[i].img3}" alt=""></a>
                    `);
                    node3.appendTo(".img_size");
                }
                $(".img_size a:first").attr({class:"active_a"});
                $(".img_find img:first").attr({class:"img_zh"});
            },
            error: function(msg){
                console.log(msg)
            }
        })
    }
    //添加属性
    //设置图片的轮播
    function tabs(){
        var node = $(".rom");
        var btn = $(".img_size");
        var inow = 0;
        btn.on("click", "a", function(){
            inow = $(this).index();
            $(this).addClass("active_a").siblings().removeClass();
            node.animate({left: -inow * 400}, 200);
            return false;
        })
    }
    //放大镜
    function bag(){
        $(".imgs").mouseenter(function(){
            $(".img_find,.zz").css({display:"block"})
        });
        $(".imgs").mouseleave(function(){
            $(".img_find,.zz").css({display:"none"})
        });
        $(".imgs").mousemove(function(e){
            var X = e.pageX - $(this).offset().left - 100;
            var Y = e.pageY - $(this).offset().top -100;
            if(X <= 0){
                X = 0;
            }
            if(X >= 200){
                X = 200;
            }
            if(Y <= 0){
                Y = 0;
            }
            if(Y >= 200){
                Y = 200;
            }
            $(".zz").css({
                left: X,
                top: Y
            });
            var btn = $(".img_size");
            var img = $(".img_find");
            var num = 0;
            btn.on("click", "a", function(){
                num = $(this).index();
                img.find("img").eq(num).addClass("img_zh").siblings().removeClass();
            })
            $(".img_find img").css({
                left: 2 * -X,
                top: 2 * -Y
            });
        })
    }
    function cookies(){
        $(".shping").on("click", ".button_02", function(){
            var id = this.id;
            var first = $.cookie("goods") == null ? true : false;
            if(first){
                var obj = [{id: id, num: 1}];
                $.cookie("goods", JSON.stringify(obj), {
                    expires: 7
                })
            }else{
                var cookieStr = $.cookie("goods");
                var cookieArr = JSON.parse(cookieStr);
                var same = false;//如果列表没有该商品
                for(var i = 0; i < cookieArr.length; i++){
                    if(id == cookieArr[i].id){
                        cookieArr[i].num++;
                        same = true;
                        break;
                    }
                }
                if(!same){
                    var obj = {id: id, num: 1};
                    cookieArr.push(obj);
                }
                $.cookie("goods", JSON.stringify(cookieArr), {
                    expires: 7
                })
            }
            num();
        })
    }
    function num(){
        var cookieStr = $.cookie("goods");
        var cookieArr = JSON.parse(cookieStr);
        var sum = 0;
        if(cookieArr){
            for(var i = 0; i < cookieArr.length; i++){
                sum += cookieArr[i].num;
            }
            $(".titlenext .ul2 .ul2_p").html(sum);
        }else{
            $(".titlenext .ul2 .ul2_p").html(0);
        }
    }
    return {
        clear2: clear2,
        clear: clear,
        tab:tab,
        ajax:ajax,
        updata:updata,
        tabs:tabs,
        bag:bag,
        cookies:cookies
    }
});