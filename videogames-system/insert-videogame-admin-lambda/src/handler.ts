import type { Domain } from './domain';

export enum Platform {
  Ps4 = 'Ps4',
  Ps5 = 'Ps5'
}

export type VideogameAdmin = {
  readonly admin: string;
  readonly platform: Platform;
  readonly videogame: string;
};

export type Event = {
  readonly eventsList: Array<VideogameAdmin>;
};

export type HandlerOutput = Array<VideogameAdmin>;

export class Handler {
  private readonly domain: Domain;

  public constructor(domain: Domain) {
    this.domain = domain;
  }

  public async execute(event: Event): Promise<HandlerOutput> {
    console.log('Starting');

    Promise.all(event.eventsList.map(async (currentVideogame) => this.domain.execute(currentVideogame)));

    console.info('Finishing');

    return this.domain.getListOfVideogameAdmins();
  }
}
