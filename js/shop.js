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
    //获取购物车商品数量
    function num(){
        var cookieStr = $.cookie("goods");
        if(cookieStr){
            var cookieArr = JSON.parse(cookieStr);
            var sum = 0;
            for(var i = 0; i < cookieArr.length; i++){
                sum += cookieArr[i].num;
            }
            $(".titlenext .ul2 .ul2_p").html(sum);
        }else{
            $(".titlenext .ul2 .ul2_p").html(0);
        }
    }

    
    //将商品在cookie中的添加到购物车页面
    function upGoods(){
        $.ajax({
            url:"../data/shop.json",
            success: function(arr){
                var cookieStr = $.cookie("goods");
                if(cookieStr){
                    var cookieArr = JSON.parse(cookieStr);
                    var newArr = [];
                    for(var i = 0; i < arr.length; i++){
                        for(var j = 0; j < cookieArr.length; j++){
                            if(arr[i].id == cookieArr[j].id){
                                arr[i].num = cookieArr[j].num;
                                newArr.push(arr[i])
                            }
                        }
                    }
                    for(var i = 0; i < newArr.length; i++){
                        console.log(newArr[i].id);   
                        var node = $(`
                        <div class="shop_list" id="${newArr[i].id}">
                        <i></i>
                        <a class="a1" href=""><img src="${newArr[i].img}" alt=""></a>
                        <div class="shop_list_num1">
                            <a href="">
                                <p class="p1">${newArr[i].span}</p>
                                <p class="p2">${newArr[i].color}</p>
                            </a>
                            <p class="p3">
                            ￥${newArr[i].price}.00
                            </p>
                            <p class="p4">${newArr[i].price}</p>
                            <p class="p5">
                                <button>-</button><input type="text" value="${newArr[i].num}"><button>+</button>
                                <button class="btn3">删除</button>
                            </p>
                            <p class="p6">￥${newArr[i].price * newArr[i].num}.00</p>
                        </div>
                    </div>
                        `);
                        console.log(newArr[i].id);
                        node.appendTo($(".list_shop_title .shop_list_box"));
                    }
                }
                // var set3 = $(".shop_list_box").find(".shop_list_num1 .p6");

                $(".shop_list_box").on("click", "button", function(){
                    var id = $(this).closest(".shop_list").attr("id");
                    var cookieArr = JSON.parse($.cookie("goods"));
                    for(var i = 0; i < cookieArr.length; i++){
                        if(cookieArr[i].id == id){
                            if(this.innerHTML === "+"){
                                cookieArr[i].num++;
                            }else if(this.innerHTML === "-" && cookieArr[i].num == 1){
                                alert("商品数量不能少于一个")
                            }else{
                                cookieArr[i].num--;
                            }
                            $(this).siblings("input").val(cookieArr[i].num);
                            for(var k = 0; k < arr.length; k++){
                                if(arr[k].id == cookieArr[i].id){
                                    $(this).closest("div").find(".p6").html(`￥${cookieArr[i].num * arr[k].price}.00`)
                                }
                            }
                            $.cookie("goods", JSON.stringify(cookieArr), function(){
                                expires: 7
                            })
                        }
                    }
                    num();
                    total();
                })
                total();
            },
            error: function(msg){
                console.log(msg)
            }
        })
    }


    function del(){
        $(".shop_list_box").on("click", ".btn3", function(){
            total();
            var id = $(this).closest(".shop_list").remove().attr("id");
            var cookieArr = JSON.parse($.cookie("goods"));
            for(var i = 0; i < cookieArr.length; i++){
                if(id == cookieArr[i].id){
                    cookieArr.splice(i, 1);
                    break;
                }
            }
            if(!cookieArr.length){
                $.cookie("goods", null);
                // total();
            }else{
                $.cookie("goods", JSON.stringify(cookieArr),{
                    expires: 7
                })
            }
            num();
            total();
        })
       
    }



    //总计数量的改变
    function total(){
        $.ajax({
            url:"../data/shop.json",
            success: function(arr){
                var cookieStr = $.cookie("goods");
                if(cookieStr){
                    var cookieArr = JSON.parse(cookieStr);
                    var set1 = $(".bottom").find($(".div_box")).find($(".div1")).find($(".sp1"));
                    var set2 = $(".bottom").find($(".div_box")).find($(".div2")).find($(".sp2"));
                    var sum = 0;
                    for(var i = 0; i < arr.length; i++){  
                        for(var j = 0; j < cookieArr.length; j++){
                            if(arr[i].id == cookieArr[j].id){
                                arr[i].num = cookieArr[j].num;
                                sum += Number(arr[i].price * arr[i].num);
                            }
                        }
                    }
                    set1.html(`￥${sum}.00`);
                    set2.html(sum);
                }
            },
            error: function(msg){
                console.log(msg)
            }
        })
    }
    //+-进行增删商品
    function zs(){
        /* $(".shop_list_box").on("click", "button", function(){
            var id = $(this).closest(".shop_list").attr("id");
            var cookieArr = JSON.parse($.cookie("goods"));
            for(var i = 0; i < cookieArr.length; i++){
                if(cookieArr[i].id == id){
                    if(this.innerHTML === "+"){
                        cookieArr[i].num++;
                    }else if(this.innerHTML === "-" && cookieArr[i].num == 1){
                        alert("商品数量不能少于一个")
                    }else{
                        cookieArr[i].num--;
                    }
                    $(this).siblings("input").val(cookieArr[i].num);
                    $.cookie("goods", JSON.stringify(cookieArr), function(){
                        expires: 7
                    })
                }
            }
            num();
            total();
        }) */
    }
    return {
        tab:tab,
        ajax:ajax,
        clear2:clear2,
        clear:clear,
        num:num,
        upGoods:upGoods,
        del:del,
        zs:zs
    }
})