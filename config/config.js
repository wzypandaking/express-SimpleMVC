/**
 * Created by pandaking on 16/9/1.
 */
var log4js = require("log4js");
var config = {
    /**
     * log config
     */
    logType : 'console',        //  console : 将日志输出到控制台。dateFile:每天滚动日志
    logLevel : log4js.levels.DEBUG,  // DEBUG | INFO
    logPattern : "_yyyy-MM-dd",
    logPath : __ROOT__ + '/logs/',

    static : __ROOT__ + '/public',
    controllerPath : __ROOT__ + '/routes',
    utilsPath : __ROOT__ + '/utils',

    /**
     * 模板及引擎
     */
    templateConfig : {
        templatePath : __ROOT__ + '/views',
        viewEngine : 'pug',
        suffix : '.pug'
    },

    /**
     * cookie配置
     */
    cookieDomain : '127.0.0.1',
    cookieExpire : 3600,

    /**
     * reids 配置信息
     */
    redisHost : '127.0.0.1',
    redisPort : 6379,
    redisPasswd : '',
    reidsDb : 0,

    /**
     * api domain
     */
    serverDomain :  'http://app.360cec.com/'
};
module.exports = config;