define(["jquery", "jquery-cookie"], function($){
    //获取下拉菜单
    function ajax(){
        $.ajax({
            type: "get",
            url: "../data/titles.json",
            success:function(obj){
                for(var i = 0; i < obj.length; i++){
                    var node = $(`<li class="ul1_li">
                    <a class="ul_a" href="#">${obj[i].titles}</a>
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
    //图片下载
    function banner(){
        $.ajax({
            type:"get",
            url:"../data/banner.json",
            success:function(obj){
                for(var i = 0; i < obj.length; i++){
                    var arr = obj[i].img;
                    for(var j = 0; j < arr.length; j++){
                        
                        var node = $(`
                        <a href="#"><img src="${arr[j].imgs}" alt="banner01"></a> 
                        `);
                        node.appendTo(".banner_div");
                    }
                }
                // bannertab();
            },
            error:function(msg){
                console.log(msg);
            }
        })
    }
    //图片轮播
    function bannertab(){
        $(function(){
            var btn = $(".banner").find(".banner_div_btn a");
            var banner = $(".banner").find(".banner_div");//获取装图片的div
            var btn2 = $(".banner").find(".banner_div_btn2");
            var btn3 = $(".banner").find(".banner_div_btn3");
            var timer = null;//定时器
            var iNow = 0;//代表第几张图片

            btn.click(function(){
                clearInterval(timer);
                iNow = $(this).index();
                tabs();
                return false;
            });
            
            timer = setInterval(function(){
                iNow++;
                tabs();
            },4000);
            
            function tabs(){
                btn.removeClass("active").eq(iNow).addClass("active");
                if(btn.size() == iNow){
                    btn.eq(0).addClass("active");
                }
                banner.animate({left: -iNow * 1250}, 200, function(){
                    if(iNow == btn.size()){
                        iNow = 0;
                        banner.css("left", 0);
                    }
                })
            }

            $(banner).mouseenter(function(){
                clearInterval(timer);
            });
            $(banner).mouseleave(function(){
                timer = setInterval(function(){
                    iNow++;
                    tabs();
                },3000);
            });
            
        });
    }
    function navleft(){
        $.ajax({
            url:"../data/titles2.json",
            success: function(obj){
                for(var i = 0; i < obj.length; i++){
                    var node = $(`
                    <li class="nav_left_ul1_li">
                    <a class="nav_left_ul1_li_a" href="#">${obj[i].titles}<span class="nav_left_ul1_li_span">&gt;</span></a>
                    <div class="nav_left_ul_div">
                        <ul class="nav_left_ul_div_ul">

                        </ul>
                    </div>
                </li>
                    `);
                    node.appendTo(".nav_left .nav_left_ul1");
                    var imgs = obj[i].childs;
                    for(var j = 0; j < imgs.length; j++){
                        var node2 = $(`
                        <li class="nav_left_ul_div_ul_li">
                        <a class="nav_left_ul_div_ul_li_a" href="#">
                            <img src="${imgs[j].img}" alt="">
                            <span>${imgs[j].title}</span>
                            </a>
                        </li>
                        `);
                        node2.appendTo(node.find(".nav_left_ul_div_ul"));
                    }
                }
            },
            error: function(msg){
                console.log(msg);
            }
        });
    }
    function tab2(){
        $(".nav_left_ul1").on("mouseenter", ".nav_left_ul1_li", function(){
            $(this).find($(".nav_left_ul_div")).show();
        });
        $(".nav_left_ul1").on("mouseleave", ".nav_left_ul1_li", function(){
            $(this).find($(".nav_left_ul_div")).hide();
        });
    }
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
                    marginLeft:0
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

    //取出商品列表的数据
    function goods(){
        $.ajax({
            type:"get",
            url:"../data/goods.json",
            success:function(obj){
                for(var i = 0; i < obj.length; i++){
                    var node1 = $(`
                    <li class="content_ul_li" id="content_ul_li${i}">
                    <a href="#">${obj[i].title}</a>
                    <ul class="content_ul_li_ul" id = "ul${i}">
                        </ul>
                    </li>
                    `);
                    node1.appendTo(".contentlist .content_ul");
                    var child = obj[i].childs;
                    for(var j = 0; j < child.length; j++){
                        var node2 = $(`
                        <li class="content_list_li" id="li${j}">
                                <a href="#"><img src="${child[j].img}" alt=""></a>
                                <span class="title">${child[j].titles}</span>
                                <span class="price">${child[j].price}</span>
                                <del class="overdue">${child[j].overdue}</del>
                            </li>
                        `);
                        node2.appendTo(node1.find(".content_ul_li_ul"));
                    }
                }
            },
            error:function(msg){
                console.log(msg);
            }
        })
    }
    //商品列表渐入淡出
    function goodstab(){
        var content_ul = $(".content_ul")
        var goods_right = $(".content_right");
        var goods_left = $(".content_left");
        var goods_ul = $(".content_ul");
        var items = null;
        var inow = 0;
        //向右运动
        goods_right.click(function(){
            clearInterval(items);
            inow++;
            if(inow >= 2){
                inow = -1;
            }
            tab();
            items = setInterval(function(){
                inow++;
                tab();
            }, 2000)
            return false;
        });
        //向左运动
        goods_left.click(function(){
            clearInterval(items);
            inow--;
            if(inow <= -1){
                inow = 2;
            }
            items = setInterval(function(){
                inow++;
                tab();
            }, 2000)
            tab();
            return false;
        });
        //点击 li 进行转换
        goods_ul.on("click", ".content_ul_li", function(){
            clearInterval(items);
            inow = $(this).index();
            tab();
            items = setInterval(function(){
                inow++;
                tab();
            }, 2000)
            return false;
        })
        //定时自动运动
        items = setInterval(function(){
            inow++;
            tab();
        }, 2000)
        //渐入函数
        function tab(){
            var ulbtn = $(".content_ul").find($(".content_ul_li .content_ul_li_ul"));
            var libtn = $(".content_ul").find($(".content_ul_li"));
            ulbtn.css("opacity", 0.2).hide().eq(inow).show().animate({
                opacity:1   
            }, 800, function(){
                if(inow >= libtn.size() - 1){
                    inow = -1;
                }
            });
            libtn.css("border", "none").eq(inow).css("borderBottom", "2px solid blue")
            // ulbtn.eq(inow).css("display","block");
        }
        content_ul.on("mouseenter", ".content_ul_li_ul", function(){
            clearInterval(items)
        })
        content_ul.on("mouseleave", ".content_ul_li_ul", function(){
            items = setInterval(function(){
                inow++;
                tab();
            }, 2000)
        })
    }
    return{
        ajax: ajax,
        tab: tab,
        tab2: tab2,
        banner: banner,
        bannertab: bannertab,
        navleft: navleft,
        clear:clear,
        goods:goods,
        goodstab:goodstab,
        clear2:clear2
    }
})