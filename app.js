var express = require('express');
var cookieParser = require("cookie-parser");
var bodyParser = require('body-parser');
global.__ROOT__ = __dirname;

//  开始创建APP
var app = express();

//  注册基本信息
app.use(cookieParser('keyboard cat'));
//  设置 session
require("./lib/session")(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//  放到log前边, 不记录 访问静态资源的log
var config = require("./config/config");
app.use(express.static(config.static));

//  设置全局 log
require("./lib/logger");
log4js.use(app);


//  加载工具类
require("./lib/utils")();
//  加载路由规则
require("./lib/routes")(app);
//  注册错误处理
require("./lib/errors")(app);

module.exports = app;
