# Videogames System

In this project we have 3 npm workspaces to fix:
  1. `aws-resources` It contains the AWS CDK resources: 1 dynamodb table and a lambda.

  **Problem**: This workspace contains some build issues.

To test everything is fine, **you can run this command as many times as needed** `npx cdk synth "*" --ci --require-approval never -c region=eu-west-1`.
