import path from 'path';
import swPrecache from 'sw-precache';
import colors from 'colors/safe';

const packageJson = require('../package.json');

const buildDir = path.join(__dirname, '../build');

const generate = () => new Promise((resolve, reject) => {
  const callback = (err, res) => {
    console.log('service-worker generation done');
    if (err) {
      return reject(err);
    }
    resolve(res);
  };
  const HANDLE_FETCH = !global.WATCH;
  if (!HANDLE_FETCH) console.log(colors.red.bold('WARNING: '), 'Handle fetch is disabled');

  swPrecache.write(path.join(buildDir, 'service-worker.js'), {
    staticFileGlobs: [
      path.join(buildDir, '**.css'),
      path.join(buildDir, '**.html'),
      path.join(buildDir, 'img/**.*'),
      path.join(buildDir, '**.js')
    ],
    stripPrefix: buildDir,
    cacheId: packageJson.name,
    logger: console.log,
    verbose: true,
    handleFetch: HANDLE_FETCH,
  }, callback);
});

export default async () => {
  console.log('start generating precache');
  await generate();
};

