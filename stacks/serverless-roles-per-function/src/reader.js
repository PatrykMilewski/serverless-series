import 'source-map-support/register';
import s3 from '@serverless-series/utils/src/aws/s3';

const { BUCKET_NAME } = process.env;

export const handler = async (event, context) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: 'example.txt',
  }
  const data = await s3.getObject(params).promise();

  return data.Body.toString();
};

