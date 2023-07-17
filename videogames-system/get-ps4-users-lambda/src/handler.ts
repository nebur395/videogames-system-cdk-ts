import { Domain, DomainOutput } from './domain';

export type HandlerOutput = DomainOutput;

export class Handler {
  private readonly domain: Domain;

  public constructor(domain: Domain) {
    this.domain = domain;
  }

  public async execute(): Promise<HandlerOutput> {
    console.log('Starting');

    // TODO

    console.info('Finishing');

    return [];
  }
}
