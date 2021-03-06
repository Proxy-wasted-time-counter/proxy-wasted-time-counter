import path from 'path';
import replace from 'replace';
import Promise from 'bluebird';
import watch from './lib/watch';
import colors from 'colors/safe';

/**
 * Copies static files such as robots.txt, favicon.ico to the
 * output (build) folder.
 */
async function copy() {
  const ncp = Promise.promisify(require('ncp'));

  const watchedPaths = new Map([
    ['src/index.html', 'build/index.html'],
    ['src/favicon.ico', 'build/favicon.ico'],
    ['src/img', 'build/img'],
    ['src/manifest.json', 'build/manifest.json'],
    ['package.json', 'build/package.json'],
  ]);
  const promises = [];
  watchedPaths.forEach((dest, source) => {
    console.log('Copy %s to %s', source, dest);
    promises.push(ncp(source, dest));
  });
  await Promise.all(promises);

  replace({
    regex: '"start".*',
    replacement: '"start": "node server.js"',
    paths: ['build/package.json'],
    recursive: false,
    silent: false,
  });

  if (global.WATCH) {
    const watchPattern = Array.from(watchedPaths.keys());
    console.log('[COPY] : Watch',  colors.green(watchPattern));
    const watcher = await watch(watchPattern);
    watcher.on('changed', async (file) => {
      console.log('[COPY] : File %s changed', file);
      ncp(file, `build/${path.basename(file)}`);
    });
  }
}

export default copy;
