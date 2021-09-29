
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {

    app.use(
        '/api/user',
        createProxyMiddleware({
            target: process.env.CHALLENGE_REACT_API_TARGET,
            pathRewrite: {
                "^/api/user": ""
            },
            changeOrigin: true
        })
    );
    app.use(
        '/api/hero',
        createProxyMiddleware({
            target: process.env.SUPERHERO_API_TARGET,
            pathRewrite: {
                "^/api/hero": ""
            },
            changeOrigin: true
        })
    );

}