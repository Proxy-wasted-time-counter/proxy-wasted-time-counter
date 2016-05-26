import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import proxyMiddleware from 'http-proxy-middleware';

import task from './lib/task';
import build from './build';
import serve from './serve';
import webpackConfig from './webpack.config';

global.WATCH = !process.argv.includes('release');
const bundler = webpack(webpackConfig);

/**
 * Launches a development web server with "live reload" functionality -
 * synchronizing URLs, interactions and code changes across multiple devices.
 */
async function start() {
  await build();
  // await serve();

  browserSync({
    server: './build',
    // https: true,
    middleware: [
      proxyMiddleware('/couchdb', {target: 'https://pennarun-demo.io', changeOrigin: true})
    ]
  });
}

export default start;
