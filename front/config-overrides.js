const path = require('path');

module.exports = {
  webpack: function (config) {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    config.resolve.alias['@api'] = path.resolve(__dirname, 'src/api');
    config.resolve.alias['@assets'] = path.resolve(__dirname, 'src/assets');
    config.resolve.alias['@components'] = path.resolve(__dirname, 'src/components');
    config.resolve.alias['@hooks'] = path.resolve(__dirname, 'src/hooks');
    config.resolve.alias['@layouts'] = path.resolve(__dirname, 'src/layouts');
    config.resolve.alias['@pages'] = path.resolve(__dirname, 'src/pages');
    config.resolve.alias['@store'] = path.resolve(__dirname, 'src/store');
    config.resolve.alias['@utils'] = path.resolve(__dirname, 'src/utils');
    return config;
  },
};