define(function() {
    imports(function ($) {
        $('img').css({height:$(window).height(), width:$(window).width()});
        $('#carousel-example-generic').swipe({
            swipe : function (event, direction, distance, duration, fingerCount, fingerData) {
                if (direction == 'left') {
                    $('#carousel-example-generic').carousel("next");
                } else if (direction == 'right') {
                    $('#carousel-example-generic').carousel("prev");
                }
            }
        });
    });
});