from dataclasses import asdict, dataclass

from aws_cdk import Duration, RemovalPolicy, Stack, StackProps
from aws_cdk.aws_dynamodb import Attribute, AttributeType, BillingMode, Table
from aws_cdk.aws_lambda import Code, Function, Runtime
from aws_cdk.aws_logs import RetentionDays
from constructs import Construct


@dataclass
class StackBaseProps(StackProps):
    def __init__(self, stack_base_name: str, **kwargs):
        super().__init__(**kwargs)
        self.stack_base_name = stack_base_name


class MainStack(Stack):
    # AWS resources attached to this construct
    @property
    def get_ps4_users_lambda(self) -> Function:
        return self._get_ps4_users_lambda

    @property
    def dynamo_table(self) -> Table:
        return self._dynamo_table

    def __init__(self, scope: Construct, stack_id: str, props: StackBaseProps):
        super().__init__(scope, stack_id, **asdict(props))

        stack_base_name = props.stack_base_name

        dynamo_table_id = "dynamo-table-name"
        self._dynamo_table = Table(
            scope,
            dynamo_table_id,
            table_name=f"{stack_base_name}-{dynamo_table_id}",
            partition_key=Attribute(name="username", type=AttributeType.STRING),
            billing_mode=BillingMode.PAY_PER_REQUEST,
            removal_policy=RemovalPolicy.DESTROY,
        )

        get_ps4_users_lambda_id = "get-ps4-lambda-id"
        timeout_seconds = 10

        self._get_ps4_users_lambda = Function(
            self,
            get_ps4_users_lambda_id,
            runtime=Runtime.PYTHON_3_10,
            function_name=f"{stack_base_name}-{get_ps4_users_lambda_id}",
            handler="index.handler",
            code=Code.from_asset("videogames_system/get_ps4_users/src"),
            description="Basic lambda description",
            timeout=Duration.seconds(timeout_seconds),
            environment={"DYNAMODB_TABLE_NAME": self._dynamo_table.table_name},
            memory_size=128,
            log_retention=RetentionDays.THREE_DAYS,
        )
