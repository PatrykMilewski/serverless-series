# serverless-plugin-aws-alerts example

This plugin is very useful for creating alarms for your Lambda functions.
It simplifies the creation of alarms, so it's no longer huge wall of code with definitions.

### Pros
1. Default Lambda alarms definitions, that can be used out of the box.
2. Possibility to overwrite default definitions.
3. You can specify your custom alarms and easily attach it to any lambda definition.
4. Integrates with existing SNS topic or creates a new one.
5. You can specify different topics for different alarm levels (non-critical, critical etc.)
6. You can specify different topics for OK state recovery.
7. Ability to move alarms definitions to another stack.

And much much more. Checkout docs: https://github.com/ACloudGuru/serverless-plugin-aws-alerts 


### Default definitions:

```yaml
definitions:
  functionInvocations:
    namespace: 'AWS/Lambda'
    metric: Invocations
    threshold: 100
    statistic: Sum
    period: 60
    evaluationPeriods: 1
    datapointsToAlarm: 1
    comparisonOperator: GreaterThanOrEqualToThreshold
    treatMissingData: missing
  functionErrors:
    namespace: 'AWS/Lambda'
    metric: Errors
    threshold: 1
    statistic: Sum
    period: 60
    evaluationPeriods: 1
    datapointsToAlarm: 1
    comparisonOperator: GreaterThanOrEqualToThreshold
    treatMissingData: missing
  functionDuration:
    namespace: 'AWS/Lambda'
    metric: Duration
    threshold: 500
    statistic: Average
    period: 60
    evaluationPeriods: 1
    comparisonOperator: GreaterThanOrEqualToThreshold
    treatMissingData: missing
  functionThrottles:
    namespace: 'AWS/Lambda'
    metric: Throttles
    threshold: 1
    statistic: Sum
    period: 60
    evaluationPeriods: 1
    datapointsToAlarm: 1
    comparisonOperator: GreaterThanOrEqualToThreshold
    treatMissingData: missing
```
Source: https://github.com/ACloudGuru/serverless-plugin-aws-alerts