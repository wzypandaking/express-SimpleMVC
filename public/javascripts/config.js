/**
 * Created by pandaking on 16/9/20.
 */
var config = {
    baseUrl : '/javascripts',
    shim : {
        bootstrap : {
            deps : ['jquery'],
            exports : "bootstrap"
        }
    },
    paths : {
        /**
         * plugins
         */
        bootstrap : '../bootstrap/js/bootstrap.min',
        jquery : 'plugins/jquery-3.1.0',
        touch : 'plugins/jquery.touchSwipe'
    }
};
require.config(config);
var extraDeps = ['bootstrap', 'touch'];
var baseDeps = ['jquery'];
function imports() {
    var deps = [],
        dependence = [],
        callback = function(){};

    if(arguments.length == 2) {
        deps = arguments[0];
        callback = arguments[1];
    } else if (arguments.length == 1) {
        callback = arguments[0];
    }
    dependence = dependence.concat(extraDeps).concat(baseDeps).concat(deps);
    require(dependence, function ($) {
        var args = [];
        for (var k in arguments) {
            if (k < extraDeps.length) {
                continue;
            }
            args.push(arguments[k]);
        }
        callback.apply(callback, args);
    });
}