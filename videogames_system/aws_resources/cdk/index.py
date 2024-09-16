from aws_cdk import App

from videogames_system.aws_resources.cdk.bin.cdk_app import build_stack


def main() -> None:
    app = build_stack(App())
    app.synth()


if __name__ == "__main__":
    main()
