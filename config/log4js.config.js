/**
 * Created by pandaking on 16/9/3.
 */
var config = require("../config/config");
var log4jsConfig = {
    appenders: [
        {
            type: 'console',
            category: "debug"
        },
        {
            type: config.logType,
            filename: config.logPath + 'app.log',
            pattern: config.logPattern,
            backups: 4,
            alwaysIncludePattern: false,
            category: "system"
        },
        {
            type: config.logType,
            filename: config.logPath + 'access.log',
            pattern: config.logPattern,
            backups: 4,
            alwaysIncludePattern: false,
            category: "access"
        },
        {
            type: config.logType,
            filename: config.logPath + 'common.log',
            pattern: config.logPattern,
            backups: 4,
            alwaysIncludePattern: false,
            category: "common"
        },
        {
            type: config.logType,
            filename: config.logPath + 'error.log',
            pattern: config.logPattern,
            backups: 4,
            alwaysIncludePattern: false,
            category : 'error'
        }
    ],
    level : {
        common : 'common',
        error : 'error'
    },
    replaceConsole: true
};
module.exports = log4jsConfig;