const { resolve } = require('path');

module.exports = function nuxtModule(moduleOptions) {
  const options = { ...this.options.modal, ...moduleOptions };

  this.addPlugin({
    ssr: true,
    src: resolve(__dirname, 'plugin.template.js'),
    fileName: 'vue-pro-modal.js',
    options,
  });
};

module.exports.meta = require('../package.json');
