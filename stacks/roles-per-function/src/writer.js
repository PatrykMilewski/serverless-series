import 'source-map-support/register';
import s3 from '@serverless-series/utils/src/aws/s3';
import { v4 as uuidv4 } from "uuid";

const { BUCKET_NAME } = process.env;

export const handler = async (event, context) => {
  const params = {
    Body: 'Hello world from roles-per-function example!',
    Bucket: BUCKET_NAME,
    Key: `${uuidv4()}.txt`,
  }
  await s3.putObject(params).promise();

  return 'Great success!'
};

