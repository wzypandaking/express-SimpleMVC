/**
 * Created by pandaking on 16/9/2.
 */
var async = require("async");
var request = require('request');
var config = require("../config/config");
request.defaults({
    baseUrl : config.serverDomain,
    encoding : 'utf-8',
    timeout : 3000
});

var HttpUtils = {
    /**
     * 串行执行 TASK
     * @param task
     * @param callback
     */
    series : function (task, callback) {
        async.series(buildTask(task), function(error, result){
            callback(result);
        });
    },

    /**
     * 并行执行 TASK
     * @param task
     * @param callback
     */
    parallel : function (task, callback) {
        async.parallel(buildTask(task), function(error, result){
            callback(result);
        });
    },

    /**
     *  处理二进制流
     */
    stream : function (from , target) {
        request(from).pipe(target());
    }
};

var requestCallback = function (error, response, result, requestParam, responseCallback) {
    debugLog.debug("请求参数===>", requestParam.param);
    debugLog.debug("返回结果===>", result);
    /**
     * 如果调用远程一次
     */
    if (error || response.statusCode != 200) {
        errorLog.error("调用 # ",
            requestParam.param.method ? requestParam.param.method.toUpperCase() : "GET ",
            response.statusCode,
            ' ',
            requestParam.param.uri,
            "失败",
            error ? error : '');
        var result = {
            code : '-1',
            message : '调用远程服务失败'
        };
        responseCallback(error, result);
        return;
    }

    var requestResult = result;
    if(requestParam.callback) {
        var callbackResult;
        try {
            callbackResult = requestParam.callback(error, result);
        } catch (e) {
            errorLog.error("请求参数===>", requestParam.param);
            errorLog.error("返回结果===>", result);
            errorLog.error("自定义处理结果异常", e);
        }
        if(callbackResult) {
            requestResult = callbackResult;
        }
    }
    try {
        responseCallback(error, requestResult);
    } catch (e) {
        errorLog.error("回调异常", e);
    }
};

/**
 * 构建任务
 * @param taskList
 * @returns {{}}
 */
function buildTask(taskList) {
    var taskObject = {};
    for(var taskKey in taskList) {
        var taskParam = taskList[taskKey];
        taskObject[taskKey] = (function(requestParam){
            return function(callback) {
                if(!requestParam.param) {
                    errorLog.error("参数没有配置");
                    throw new Error("配置错误");
                }
                request(requestParam.param, function (error, response, result) {
                    requestCallback(error, response, result, requestParam, callback);
                });
            };
        })(taskParam);
    }
    return taskObject;
}

/**
 * demo
 * @constructor
 */
function TaskExecuteDemo() {
    var requestTask = {
        /***
         * key  :   request模块的内容
         */
        banner : {
            param:{
                method : 'post',
                uri : "http://app.360cec.com/homepage/banner/" + param.GET['a']
            },
            /**
             * request 模块的回调方法
             * 在TaskExecute.series    保证依次执行,
             * 在TaskExecute.parallel  不保证依次执行,
             */
            callback : function(error, result) {
                console.log("1");
            }
        },
        category : {
            param : {
                uri : "http://app.360cec.com/homepage/category/brand/" + param.GET['a']
            },
            callback : function(error, result){
                return JSON.parse(result);

            }
        },
        category1 : {
            param : {
                uri : "http://app.360cec.com/homepage/banner/category/" + param.GET['a']
            }
        }
    };
    HttpUtils.parallel(requestTask, function(result){
        console.log(JSON.stringify(result));
    });
}

module.exports = HttpUtils;
