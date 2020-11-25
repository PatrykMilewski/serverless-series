const baseConfig = require('@serverless-series/config/jest.config.js');

module.exports = {
  ...baseConfig.config,
};

process.env = Object.assign(process.env, {
  ...baseConfig.processEnv,
});
