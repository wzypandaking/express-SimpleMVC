/**
 * Created by pandaking on 16/9/3.
 */
var log4js = require('log4js');
var config = require("./../config/config");
var log4jsConfig = require("./../config/log4js.config");

log4js.configure(log4jsConfig);


global.log4js = {
    use : function (app) {
        var dateFileLog = log4js.getLogger("access");
        dateFileLog.setLevel(config.logLevel);
        app.use(log4js.connectLogger(dateFileLog));
    },
    get : function (categoryName) {
        var log = log4js.getLogger(categoryName);
        log.setLevel(config.logLevel);
        return log;
    }
};
global.debugLog = global.log4js.get('debug');
global.commonLog = global.log4js.get("common");
global.errorLog = global.log4js.get("error");