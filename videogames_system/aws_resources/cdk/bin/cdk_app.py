from aws_cdk import App, Environment

from videogames_system.aws_resources.cdk.lib.main_stack import MainStack, StackBaseProps


def build_stack(app: App) -> App:
    """
    Builds and returns a stack for the given app.

    Parameters:
        app (App): The app instance.

    Returns:
        App: The app instance with the stack built.
    """
    base_name = "Basic-CDK-Infrastructure"
    region = "eu-west-1"

    stack_env = Environment(region=region, account=app.account)
    stack_props = StackBaseProps(stack_base_name=base_name, env=stack_env)

    MainStack(app, base_name, props=stack_props)

    return app
