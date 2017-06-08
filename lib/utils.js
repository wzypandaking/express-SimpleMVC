/**
 * Created by pandaking on 16/9/6.
 */
var fs = require("fs");
var path = require("path");
var config = require("./../config/config");
var log = log4js.get("system");
//获取文件数组
function processUtils(filepath) {
    var files = fs.readdirSync(filepath);
    files.forEach(function (filename) {
        var utils = path.join(filepath, filename);
        if(fs.statSync(utils).isFile()) {
            log.info("load util " + utils);
            global[filename.substr(0, filename.indexOf("."))] = require(utils);
        } else {
            processUtils(utils, app);
        }
    });
}
module.exports = function () {
    processUtils(config.utilsPath);
};