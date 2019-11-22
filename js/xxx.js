require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "index": "index"
    },
    shim: {
        "jquery-cookie": ["jquery"],
        "parabola": {
            exports: "_"
        }
    }
})

require(["index"], function(index){
    index.ajax();//获取导航数据
    index.tab();//显示隐藏导航栏
    index.banner();//banner获取
    index.bannertab();//banner动画
    index.navleft();//侧边栏
    index.tab2();//侧边栏
    index.clear();
    index.goods();
    index.goodstab();
    index.clear2();
    index.content_2();
    index.tas1();
    index.tas2();
})