import type { AwsDynamoDB } from './data/aws-dynamodb';

type DomainConfig = {
  readonly awsDynamoDB: AwsDynamoDB;
};

export enum Platform {
  Ps4 = 'Ps4',
  Ps5 = 'Ps5'
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

    const validUsers = listOfUsers
      .map(({ username }) => username)
      .filter((username) => {
        const count = listOfUsers.reduce((previousCount, { username: candidate, platform }) => {
          if (username === candidate && platform === Platform.Ps5) {
            return previousCount + 1;
          }

          return previousCount + 0;
        }, 0);

        return count <= 1;
      });

    return [...new Set(validUsers)];
  }
}
