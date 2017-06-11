# SimpleMVC with express   快速开发,稳定运行    simple & stable
基于express的MVC框架

# 一、安装

npm install

npm install connect-redis

# 二、启动

方式1:    (可用于生成环境)
    cd bin
    ./startup.sh    即可启动
    ./stop.sh       即可停止

方式2:    (调试环境下使用)
    采用IDE的debug模式,选择 bin/www文件。即可运行

PS:
    该框架采用redis。请务必安装redis服务。


## 目录介绍
    |_bin
    |___www                 程序主入口
    |___process.json        pm2的指定启动文件,参数可以参考 http://pm2.keymetrics.io/docs/usage/application-declaration/#act-on-a-specific-process
    |___startup.sh          启动 pm2
    |___stop.sh             关闭 pm2
    |
    |_config
    |___config.js           全局配置文件
    |___log4js.config.js    日志配置文件
    |
    |_lib
    |___errors.js           处理 404/500
    |___logger.js           生成日志配置
    |___routes.js           加载路由文件
    |___session.js          配置session
    |___utils.js            加载工具
    |
    |_public                公共目录
    |
    |_routes                路由文件 (主开发目录)
    |
    |_utils
    |___Http.js             发起Http请求
    |___Page.js             分页工具类
    |___T.js                模板工具类
    |___U.js                生成链接
    |___Url.js              生成链接(估计未来会删除)
    |___VerifyCode.js       验证码生成
    |
    |_views                 模板目录(主开发目录)
    |
    |_app.js                应用主要入口


# pug    语法简洁
模板采用pug,它的前身是jade。使用这个也是为了学习,发现pug第一次编译比较耗时,但是使用编译通过的代码,效率很高,一个简单的页面相差7-8倍
还是值得学习一番的

# session
session采用redis的方式,从底层解决多应用的session的同步问题。


# pm2 cluster模式包装应用稳定运行

npm install pm2 -g

如果权限不足,需要在前边加上sudo
