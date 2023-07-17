import { AwsDynamoDB } from './data/aws-dynamodb';

type DomainConfig = {
  readonly awsDynamoDB: AwsDynamoDB;
};

export enum Platform {
  ps4 = 'ps4',
  ps5 = 'ps5'
}

export type User = {
  readonly username: string;
  readonly platform: Platform;
  readonly videogame: string;
};

export type DomainOutput = Array<string>;

export class Domain {
  private readonly awsDynamoDB: AwsDynamoDB;

  public constructor({ awsDynamoDB }: DomainConfig) {
    this.awsDynamoDB = awsDynamoDB;
  }

  public async execute(): Promise<DomainOutput> {
    const listOfUsers = await this.awsDynamoDB.getListOfUsers();

    // TODO

    return [];
  }
}
