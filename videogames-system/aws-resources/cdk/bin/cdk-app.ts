import 'source-map-support/register';
import type { App, Environment } from 'aws-cdk-lib';
import { BasicStack } from '../lib/basic-stack.stack';

const buildStack = (app: App): App => {
  const BaseName = 'Basic-Account-Infrastructure';
  const region = 'eu-west-1';

  const stackEnv: Environment = {
    region,
    account: process.env.CDK_DEFAULT_ACCOUNT
  };

  new BasicStack(app, BaseName, {
    env: stackEnv,
    stackBaseName: BaseName
  });

  return app;
};

export default buildStack;
