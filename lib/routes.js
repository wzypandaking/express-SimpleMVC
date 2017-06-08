/**
 * Created by pandaking on 16/9/1.
 */
var fs = require("fs");
var path = require("path");
var config = require("./../config/config");
var log = log4js.get("system");
//获取文件数组
function processController(filepath, app) {
    var files = fs.readdirSync(filepath);
    files.forEach(function (filename) {
        var controller = path.join(filepath, filename);
        if(fs.statSync(controller).isFile()) {
            var routerConfig = require(controller);
            for (var item in routerConfig.paths) {
                log.info("bind", routerConfig.paths[item], 'on', controller);
                app.use(routerConfig.paths[item], routerConfig.router);
            }
        } else {
            processController(controller, app);
        }
    });
}
module.exports = function (app) {
    processController(config.controllerPath, app);
};