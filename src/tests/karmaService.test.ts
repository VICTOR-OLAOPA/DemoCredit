import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import KarmaService from '../services/karmaService';

describe('KarmaService', () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  it('should return data if identity is not blacklisted', async () => {
    const identity = 'john@example.com';
    const mockResponse = {
      karma_identity: 'john@example.com',
      amount_in_contention: '0.00',
      reason: null,
      default_date: null,
      karma_type: { karma: 'None' },
      karma_identity_type: { identity_type: 'Email' },
      reporting_entity: { name: 'Lendsqr', email: 'support@lendsqr.com' },
    };

    mock.onGet(`${process.env.KARMA_API_BASE_URL}/verification/karma/:identity?identity=${identity}`)
        .reply(200, mockResponse);

    const result = await KarmaService.checkKarmaBlacklist(identity);

    expect(result).toEqual(mockResponse);
  });

  it('should handle errors gracefully', async () => {
    const identity = 'john@example.com';
    
    mock.onGet(`${process.env.KARMA_API_BASE_URL}/verification/karma/:identity?identity=${identity}`)
        .reply(500);

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    const result = await KarmaService.checkKarmaBlacklist(identity);

    expect(consoleSpy).toHaveBeenCalledWith('Error checking Karma blacklist', expect.any(Error));
    expect(result).toBeUndefined();

    consoleSpy.mockRestore();
  });
});
