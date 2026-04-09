import { Duration, RemovalPolicy, Stack, type StackProps } from 'aws-cdk-lib';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import type { Construct } from 'constructs';

export type StackBaseProps = StackProps & {
  readonly stackBaseName: string;
};

export class BasicStack extends Stack {
  /* AWS resources attached to this construct */
  public readonly getPs4UsersLambda: NodejsFunction;
  public readonly insertVideogameAdminLambda: NodejsFunction;
  public readonly dynamoTable: Table;

  public constructor(scope: Construct, id: string, stackProps: StackBaseProps) {
    super(scope, id, stackProps);

    const { stackBaseName } = stackProps;

    const dynamoTableNameId = 'dynamoTableName';

    this.dynamoTable = new Table(scope, dynamoTableNameId, {
      tableName: `${stackBaseName}-${dynamoTableNameId}`,
      partitionKey: {
        name: 'username',
        type: AttributeType.STRING
      },
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY
    });

    const getPs4UsersLambdaId = 'getPs4LambdaId';
    const timeoutSeconds = 10;

    this.getPs4UsersLambda = new NodejsFunction(this, getPs4UsersLambdaId, {
      bundling: {
        minify: true,
        sourceMap: true,
        externalModules: [
          '@aws-sdk/*',
          '@aws-lambda-powertools/commons',
          '@aws-lambda-powertools/logger',
          '@aws-lambda-powertools/metrics',
          '@aws-lambda-powertools/tracer'
        ]
      },
      runtime: Runtime.NODEJS_24_X,
      entry: './videogames-system/get-ps4-users/src/index.ts',
      handler: 'index.getPs4UsersHandler',
      description: 'Basic lambda description',
      timeout: Duration.seconds(timeoutSeconds),
      environment: {
        DYNAMODB_TABLE_NAME: this.dynamoTable.tableName
      },
      functionName: `${stackBaseName}-${getPs4UsersLambdaId}`,
      memorySize: 128,
      logRetention: 3
    });

    const insertVideogameAdminLambdaId = 'insertVideogameAdmin';

    this.insertVideogameAdminLambda = new NodejsFunction(this, insertVideogameAdminLambdaId, {
      bundling: {
        minify: true,
        sourceMap: true,
        externalModules: [
          '@aws-sdk/*',
          '@aws-lambda-powertools/commons',
          '@aws-lambda-powertools/logger',
          '@aws-lambda-powertools/metrics',
          '@aws-lambda-powertools/tracer'
        ]
      },
      runtime: Runtime.NODEJS_24_X,
      entry: './videogames-system/insert-videogame-admin-lambda/src/index.ts',
      handler: 'index.insertVideogameAdminHandler',
      description: 'Basic lambda description',
      timeout: Duration.seconds(timeoutSeconds),
      environment: {
        DYNAMODB_TABLE_NAME: this.dynamoTable.tableName
      },
      functionName: `${stackBaseName}-${insertVideogameAdminLambdaId}`,
      memorySize: 128,
      logRetention: 3
    });
  }
}
