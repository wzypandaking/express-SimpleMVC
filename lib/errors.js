/**
 * Created by pandaking on 16/9/6.
 */
module.exports = function (app) {
    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        next();
    });

    app.use("/*", function(req, res) {
        T._404(function(html){
            res.end(html);
        }, req.method + " " + req.originalUrl);
    });
};