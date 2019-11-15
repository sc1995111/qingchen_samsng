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
    index.ajax();
    index.tab();
    index.banner();
    index.bannertab();
    index.navleft();
    index.tab2();
    index.clear();
    index.goods();
    index.goodstab();
    index.clear2();
})