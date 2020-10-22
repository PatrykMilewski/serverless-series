import 'source-map-support/register';
import { logger } from '@serverless-series/utils/src/logger';

export const handler = async (event, context) => {

  throw new Error("Whoops")

  logger.info("Hello world!", event)

  return "All good!"

};

