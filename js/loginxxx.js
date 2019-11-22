require.config({
    paths:{
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "login": "login"
    },
    shim: {
        "jquery-cookie": ["jquery"],
        "parabola": {
            exports: "_"
        }
    }
})
require(["login"], function(login){
    login.tab();//显示隐藏导航栏
    login.clear();//导航栏一直在顶部
    login.clear2();//导航栏下拉列表位置
    login.clicks();
    login.validation();
    login.download();//向服务器发送数据
    login.login1();
})