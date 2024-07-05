import { Application } from 'express';
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app: Application) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: `${process.env.REACT_APP_BESERVERURI}`,
      changeOrigin: true,
    })
  );
};
