import 'source-map-support/register';
import { App, Environment } from 'aws-cdk-lib';
import { BasicStack } from '../lib/basic-stack.stack';

const buildStack = (app: App): App => {
  const BASE_NAME = 'Basic-Account-Infrastructure';
  const region = 'eu-west-1';

  const stackEnv: Environment = {
    region,
    account: process.env.CDK_DEFAULT_ACCOUNT
  };

  // eslint-disable-next-line no-new
  new BasicStack(
    app, BASE_NAME,
    {
      env: stackEnv,
      stackBaseName: BASE_NAME
    }
  );

  return app;
};

export default buildStack;
