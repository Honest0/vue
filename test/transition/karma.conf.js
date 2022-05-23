const featureFlags = require('../../scripts/feature-flags')
process.env.CHROME_BIN = require('puppeteer').executablePath()

const define = {
  'process.env.CI': !!process.env.CI
}

for (const key in featureFlags) {
  define[`process.env.${key}`] = featureFlags[key]
}

module.exports = function (config) {
  config.set({
    basePath: '.',
    frameworks: ['jasmine'],
    files: ['*.spec.ts'],
    preprocessors: {
      '*.spec.ts': ['esbuild']
    },
    esbuild: {
      define
    },
    browsers: ['ChromeHeadless'],
    plugins: ['karma-jasmine', 'karma-esbuild', 'karma-chrome-launcher'],
    singleRun: true
  })
}
