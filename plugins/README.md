How to create a simple plugin, that creates 2 alarms for each DynamoDB table,
that raise when there is throttling on read/write operations.

1. Start with creating an empty template:
`sls create --template plugin --path serverless-dynamodb-throttling-alarms`
2. Go to `index.js`
3. Select correct hook, in this case `package:compileEvents`:
```javascript
this.hooks = {
  'package:compileEvents': this.addAlarms.bind(this),
};
```
4. Method `addAlarms` from class ServerlessPlugin will be called when the hook is called.
5. Implement your logic for `addAlarms`. Firstly filter resources by `AWS::DynamoDB::Table` 
CloudFormation resource type.
```javascript
addAlarms() {
    const allResources = this.serverless.service.resources.Resources;
    
    const dynamoTables = Object.values(allResources)
      .filter(resource => resource.Type === 'AWS::DynamoDB::Table');
}
```
6. Now let's create a generic CloudWatch alarm definition. It will accept tableProperties (Properties)
part of CloudFormation resource definition and metricName to monitor.
```javascript
createAlarm(tableProperties, metricName) {
    let alphaNumTableName = tableProperties.TableName.replace(/[^0-9a-z]/gi, '');
    return {
      [alphaNumTableName + metricName]: {
        Type: 'AWS::CloudWatch::Alarm',
        Properties: {
          AlarmDescription: `DynamoDB ${metricName} alarm for ${tableProperties.TableName}`,
          Namespace: 'AWS/DynamoDB',
          MetricName: metricName,
          Dimensions: [
            {
              Name: 'TableName',
              Value: tableProperties.TableName
            }
          ],
          Statistic: 'Maximum',
          Period: 60,
          EvaluationPeriods: 1,
          Threshold: 1,
          ComparisonOperator: 'GreaterThanOrEqualToThreshold',
          TreatMissingData: 'notBreaching',
          AlarmActions: [{ Ref: 'AlarmTopic' }],
          OKActions: [{ Ref: 'AlarmTopic' }]
        }
      }
    };
}
```
7. Make use of createAlarm method.
```javascript
addAlarms() {
    const allResources = this.serverless.service.resources.Resources;
    
    const dynamoTables = Object.values(allResources)
      .filter(resource => resource.Type === 'AWS::DynamoDB::Table');
    
    Object.values(dynamoTables)
          .forEach(table => {
            // Create alarms definitions in CloudFormation
            const readThrottleAlarm = this.createAlarm(table.Properties, 'ReadThrottleEvents');
            const writeThrottleAlarm = this.createAlarm(table.Properties, 'WriteThrottleEvents');
          })
}
```
8. And finally add alarms to output CloudFormation:
```javascript
addAlarms() {
    const allResources = this.serverless.service.resources.Resources;

    const dynamoTables = Object.values(allResources)
      .filter(resource => resource.Type === 'AWS::DynamoDB::Table');

    Object.values(dynamoTables)
      .forEach(table => {
        // Create alarms definitions in CloudFormation
        const readThrottleAlarm = this.createAlarm(table.Properties, 'ReadThrottleEvents');
        const writeThrottleAlarm = this.createAlarm(table.Properties, 'WriteThrottleEvents');

        // Add alarms to CloudFormation output
        merge(this.serverless.service.provider.compiledCloudFormationTemplate.Resources, readThrottleAlarm);
        merge(this.serverless.service.provider.compiledCloudFormationTemplate.Resources, writeThrottleAlarm);
      })
}
```

9. Now let's see how it works in [my-custom-plugin stack](../../stacks/my-custom-plugin/serverless.yml)