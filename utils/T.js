/**
 * Created by pandaking on 16/9/14.
 */
var pug = require('pug');
var fs = require("fs");
var config = require('../config/config');
var compiledCache = {};

var _404 = function (callback, error) {
    _error("error/404", callback, error);
};
var _500 = function (callback, error) {
    _error("error/500", callback, error);
};
var _error = function (template, callback, templateError) {
    var templateFile = _getTemplate(template);
    fs.stat(templateFile, function (error, status) {
        if(compiledCache [template] && status.mtime.getTime() < compiledCache [template]['time']) {
            var fn = compiledCache [template]['fn'];
            callback(fn({
                error : templateError
            }));
        }
        fs.readFile(templateFile, function (err, data) {
            if (err) {
                errorLog.error(err);
            }
            var fn = _compile(data);
            compiledCache [template] = {
                fn : fn,
                time : (new Date()).getTime()
            };
            callback(fn({
                error : templateError
            }));
        });
    });
};

var _compile = function (data) {
    return pug.compile(data, {
        basedir : config.templateConfig.templatePath
    });
};

var _getTemplate = function(template) {
    return config.templateConfig.templatePath + "/" + template + config.templateConfig.suffix;
};

var Template = {
    _404 : _404,
    display: function () {
        if(arguments.length == 0) {
            throw new Error("No Template File")
        }
        var template = arguments[0],
            callback = undefined,
            params = {};
        if (arguments.length == 3) {
            params = arguments[1];
            callback = arguments[2];
        } else if (arguments.length == 2) {
            callback = arguments[1];
        }

        var templateFile = _getTemplate(template);
        fs.stat(templateFile, function (error, status) {
            if (error) {
                _500(callback, error);
                return;
            }
            if(compiledCache [template] && status.mtime.getTime() < compiledCache [template]['time']) {
                var fn = compiledCache [template]['fn'];
                try {
                    callback(fn(params));
                } catch (e) {
                    errorLog.error("模板解析错误", "param=", params, e);
                    _500(callback, e);
                }
                return;
            }
            fs.readFile(templateFile, function (err, data) {
                if (err) {
                    _500(callback, err);
                    return;
                }
                try {
                    var fn = _compile(data);
                    compiledCache [template] = {
                        fn : fn,
                        time : (new Date()).getTime()
                    };
                    callback(fn(params));
                } catch (e) {
                    errorLog.error("模板解析错误", "param=", params, e);
                    _500(callback, e);
                }
            });
        });
    }
};
module.exports = Template;