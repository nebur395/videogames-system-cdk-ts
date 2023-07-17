import { StackProps, Stack, Duration, RemovalPolicy } from 'aws-cdk-lib';
import { Function as LambdaFunction, Code, Runtime } from 'aws-cdk-lib/aws-lambda';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export type StackBaseProps = StackProps & {
  readonly stackBaseName: string;
};

export class BasicStack extends Stack {
  /* AWS resources attached to this construct */
  public readonly getPs4UsersLambda: LambdaFunction;
  public readonly insertVideogameAdminLambda: LambdaFunction;
  public readonly dynamoTable: Table;

  public constructor(scope: Construct, id: string, stackProps: StackBaseProps) {
    super(scope, id, stackProps);

    const { stackBaseName } = stackProps;

    const dynamoTableNameId = 'dynamoTableName';

    this.dynamoTable = new Table(scope, dynamoTableNameId, {
      tableName: `${ stackBaseName }-${ dynamoTableNameId }`,
      partitionKey: {
        name: 'username',
        type: AttributeType.STRING
      },
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY
    });

    const getPs4UsersLambdaId = 'getPs4LambdaId';
    const timeoutSeconds = 10;

    this.getPs4UsersLambda = new LambdaFunction(this, getPs4UsersLambdaId, {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset('./videogames-system/get-ps4-users/dist'),
      handler: 'index.getPs4UsersHandler',
      description: 'Basic lambda description',
      timeout: Duration.seconds(timeoutSeconds),
      environment: {
        DYNAMODB_TABLE_NAME: this.dynamoTable.tableName
      },
      functionName: `${ stackBaseName }-${ getPs4UsersLambdaId }`,
      memorySize: 128,
      logRetention: 3
    });

    const insertVideogameAdminLambdaId = 'insertVideogameAdmin';

    this.insertVideogameAdminLambda = new LambdaFunction(this, insertVideogameAdminLambdaId, {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset('./videogames-system/insert-videogame-admin-lambda/dist'),
      handler: 'index.insertVideogameAdminHandler',
      description: 'Basic lambda description',
      timeout: Duration.seconds(timeoutSeconds),
      environment: {
        DYNAMODB_TABLE_NAME: this.dynamoTable.tableName
      },
      functionName: `${ stackBaseName }-${ insertVideogameAdminLambdaId }`,
      memorySize: 128,
      logRetention: 3
    });
  }
}
