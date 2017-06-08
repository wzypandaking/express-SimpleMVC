/**
 * Created by pandaking on 16/9/9.
 */
var ccap = require('ccap');
var texts = [];
for(var i = 0; i <= 9; i ++) {
    texts.push(i);
}
for(var i = 97; i <= 122; i ++) {
    texts.push(String.fromCharCode(i));
}
for(var i = 65; i <= 90; i ++) {
    texts.push(String.fromCharCode(i));
}
module.exports = {
    build : function (width, height) {
        //generate captcha text here
        var codes = [];
        for(var i = 1; i <= 4; i ++) {
            var index = parseInt((texts.length - 1) * Math.random());
            codes.push(texts[index]);
        }
        return ccap({
            width: width ? height : 256,//set width,default is 256

            height: height ? height : 60,//set height,default is 60

            offset: 60,//set text spacing,default is 40

            quality: 100,//set pic quality,default is 50

            generate: function () {//Custom the function to generate captcha text
                return codes;
            }
        }).get();
    }
};