require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "list": "list"
    },
    shim: {
        "jquery-cookie": ["jquery"],
        "parabola": {
            exports: "_"
        }
    }
})

require(["list"], function(list){
    list.ajax();//获取导航数据
    list.tab();//显示隐藏导航栏
    list.clear();//导航栏一直在顶部
    list.clear2();//导航栏下拉列表位置
    list.update();
    list.cookies();
})