define(["jquery", "jquery-cookie"], function($){
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
    //加载商品列表的中的列表
    function update(){
        num();
        $.ajax({
            type: "get",
            url: "data/list_goods.json",
            success: function(obj){
                for(var i = 0; i < obj.length; i++){
                    var node = $(`
                    <li class="list_box_ul_li">
                    <a class="a1" href="goods_num.html" target="_blnk"><img src="${obj[i].img}" alt=""></a>
                    <a class="a2" href="">${obj[i].span}</a></br>
                    <span>${obj[i].price}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <del>${obj[i].overdue}</del></br>
                    <button class="btn" id="${obj[i].id}">加入购物车</button>
                </li>
                    `)
                    node.appendTo($(".list_box .list_box_ul"))
                }
            },
            error:function(msg){
                console.log(msg)
            }
        })        
    }

    //添加购物车
    function cookies(){
        $(".list_box_ul").on("click", ".btn", function(){
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
        ajax:ajax,
        tab:tab,
        clear:clear,
        clear2:clear2,
        update:update,
        cookies:cookies
    }
})