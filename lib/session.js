/**
 * Created by pandaking on 16/9/8.
 */
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var uuid = require('node-uuid');
var config = require('../config/config');
module.exports = function (app) {
    // 设置 Session
    app.use(session({
        genid: function(req) {
            return uuid.v4() + "-" + uuid.v1(); // use UUIDs for session IDs
        },
        store: new RedisStore({
            host: config.redisHost,
            port: config.redisPort,
            pass : config.redisPasswd,
            db: config.reidsDb
        }),
        resave : true,                      //强制 将 session 放到 store 中
        saveUninitialized : true,           //是否限制 session的数量
        secret: 'keyboard cat',

        cookie : {
            path: '/',
            domain : config.cookieDomain,
            expires : config.cookieExpire + Math.floor(Date.now() / 1000),
            httpOnly: true,
            secure: false
        }
    }));
    app.use(function(req, res, next){
        if(! req.session) {
            return next(new Error("session init faild"));
        }
        next();
    });
};