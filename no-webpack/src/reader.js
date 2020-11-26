require('source-map-support').install();
const S3 = require('aws-sdk/clients/s3');

const s3 = new S3({ apiVersion: '2006-03-01' });
const { BUCKET_NAME } = process.env;

module.exports.handler = async (event, context) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: 'example.txt',
  }
  const data = await s3.getObject(params).promise();

  return data.Body.toString();
};
