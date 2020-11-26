'use strict';

const merge = require('lodash.merge');

class ServerlessPlugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.hooks = {
      'package:compileEvents': this.addAlarms.bind(this),
    };
  }

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
}

module.exports = ServerlessPlugin;
