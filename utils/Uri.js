/**
 * Created by pandaking on 16/9/2.
 */
var URI = require("url");
var config = require("../config/config");

var URIUtils = {
    buildURI : function (path, param, host) {
        var url;
        if (host) {
            url = host + path;
        } else {
            url = config.serverDomain + path;
        }
        if (! param) {
            return url;
        }
        var requestParam = URI.parse(param).query;
        if(requestParam) {
            return url + "?" + requestParam;
        }
        return url;
    },
    parseURI : function (url) {
        return url.parse(url, true);
    }
};
module.exports = URIUtils;