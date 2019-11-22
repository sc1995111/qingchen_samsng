require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "goods_num": "goods_num"
    },
    shim: {
        "jquery-cookie": ["jquery"],
        "parabola": {
            exports: "_"
        }
    }
})

require(["goods_num"], function(goods_num){
    goods_num.clear2();
    goods_num.clear();
    goods_num.tab();
    goods_num.ajax();
    goods_num.updata();
    goods_num.tabs();
    goods_num.bag();
    goods_num.cookies();
})