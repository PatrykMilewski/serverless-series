# serverless-iam-roles-per-function plugin example

### Pros

1. Really easy to define access for single lambda.
2. Automatically adds access to CloudWatch logs and stream events
3. If VPC is defined, then also adds `AWSLambdaVPCAccessExecutionRole`
4. Possibility to inherit access from global scope, example Xray access.
5. Simplifies the whole `serverless.yml` file
6. Matches good practice of the least privilege access.
7. If you have multiple lambdas in single stack, then it's must have! (Imagine having 10 lambdas).

Example of a role, that would be needed for each Lambda using CloudWatch logs and XRay:

```yaml
ReaderLambdaRole:
  Type: AWS::IAM::Role
  Properties:
    AssumeRolePolicyDocument:
      Version: "2012-10-17"
      Statement:
        - Effect: Allow
          Principal:
            Service:
              - lambda.amazonaws.com
          Action: sts:AssumeRole
    Policies:
      - PolicyName: ${self:custom.baseName}-cloudwatch-logs
        PolicyDocument:
          Version: "2012-10-17"
          Statement:
            - Effect: Allow
              Action:
                - logs:CreateLogGroup
                - logs:CreateLogStream
                - logs:PutLogEvents
              Resource: "arn:aws:logs:#{AWS::Region}:#{AWS::AccountId}:log-group:/aws/lambda/${self:custom.baseName}-reader:log-stream:*"
      - PolicyName: ${self:custom.baseName}-xray
        PolicyDocument:
          Version: "2012-10-17"
          Statement:
            - Effect: Allow
              Action:
                - xray:PutTraceSegments
                - xray:PutTelemetryRecords
              Resource: "*"
```

Additional 30 lines of boilerplate code, that we need to support!