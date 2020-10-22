import log from 'lambda-log';

const lambdaLog = new log.LambdaLog();

lambdaLog.options.debug = process.env.DEBUG === 'true';

export const logger = {
  debug: (message, obj) => {
    lambdaLog.debug(message, { obj });
  },
  info: (message, obj) => {
    lambdaLog.info(message, { obj });
  },
  warn: (message, obj) => {
    lambdaLog.warn(message, { obj });
  },
  error: (message, obj) => {
    lambdaLog.error(message, { obj });
  },
};
