/**
 * Created by pandaking on 16/9/7.
 */
var URL = require("url");
var queryString = require("querystring");
/**
 * URL组装 支持不同URL模式
 */
module.exports = function ($url, $vars) {
    // 解析URL
    $info   =  URL.parse($url);
    $url    =  $info.pathname;

    // 解析参数
    if ($vars) {
        if(typeof $vars === 'string') { // aaa=1&bbb=2 转换成数组
            console.log($vars);
            $vars = queryString.parse($vars);
        }
    }

    var $params;
    if($info.query) { // 解析地址里面参数 合并到vars
        $params = queryString.parse($info.query);
    }

    // URL组装
    if($url) {
        if($url.substr(0, 1) != '/') {
            $url = '/' + $url;
        }
        // 解析模块、控制器和操作
        if (/\/$/.test($url)) {
            $url        =   $url.substr(0, $url.length - 1);
        }
        $url    =   $url.toLowerCase();
        if (-1 === $url.indexOf("?") && ($vars || $params)) {
            $url += '?';
        }
        if($vars) {
            $url   +=   queryString.stringify($vars);
        }
        if ($params) {
            $url += '&' + queryString.stringify($params);
        }
    }
    return $url;
};