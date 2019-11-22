require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "shop": "shop"
    },
    shim: {
        "jquery-cookie": ["jquery"],
        "parabola": {
            exports: "_"
        }
    }
})

require(["shop"], function(shop){
    shop.ajax();//获取导航数据
    shop.tab();//显示隐藏导航栏
    shop.clear();//导航栏一直在顶部
    shop.clear2();//导航栏下拉列表位置
    shop.num();
    shop.upGoods();
    shop.del();
    shop.zs();
})