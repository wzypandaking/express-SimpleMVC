define(function() {
    imports(function ($) {
        $('#carousel-example-generic').swipe({
            swipe : function (event, direction, distance, duration, fingerCount, fingerData) {
                if (direction == 'left') {
                    $('#carousel-example-generic').carousel("next");
                } else if (direction == 'right') {
                    $('#carousel-example-generic').carousel("prev");
                }

            }
        });
        $('#carousel-example-generic').carousel();
    });
});