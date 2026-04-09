import { insertVideogameAdminHandler } from '../../../src';
import { type Event, Platform, type VideogameAdmin } from '../../../src/handler';

jest.setTimeout(20000);

describe('# Handler', () => {
  afterAll(() => jest.restoreAllMocks());
  beforeEach(() => jest.clearAllMocks());

  it('Should execute the handler successfully', async () => {
    const videogameAdminA = {
      admin: 'Samuel Drake',
      platform: Platform.Ps4,
      videogame: 'The last of us part II'
    };
    const videogameAdminB = {
      admin: 'Chloe Frazer',
      platform: Platform.Ps4,
      videogame: 'Cyberpunk 2077'
    };
    const videogameAdminListA: Array<VideogameAdmin> = [...Array(5)].map(() => ({
      admin: '',
      platform: Platform.Ps4,
      videogame: 'The last of us part II'
    }));
    const videogameAdminListB: Array<VideogameAdmin> = [...Array(5)].map(() => ({
      admin: '',
      platform: Platform.Ps4,
      videogame: 'Cyberpunk 2077'
    }));

    const event: Event = {
      eventsList: [videogameAdminA, videogameAdminB, ...videogameAdminListA, ...videogameAdminListB]
    };

    const result = await insertVideogameAdminHandler(event);

    expect(result).toEqual([videogameAdminA, videogameAdminB]);
  });
});
