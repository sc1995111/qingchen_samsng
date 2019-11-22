define(["parabola", "jquery", "jquery-cookie"], function(parabola, $){
    function move(){
        $(".sc_right").mouseenter(function(){
            $(this).stop(true).animate({
                right : 0
            }, 500);
        })
        $(".sc_right").mouseleave(function(){
            $(this).stop(true).animate({
                right : -270
            }, 500)
        })
    }
    
    return {
        move: move
    }
});