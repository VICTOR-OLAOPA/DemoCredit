import UserService from '../services/userService';
import User from '../models/user';
import Wallet from '../models/wallet';
import KarmaService from '../services/karmaService';
import { transaction } from 'objection';

jest.mock('../models/user');
jest.mock('../models/wallet');
jest.mock('../services/karmaService');
jest.mock('objection', () => ({
  ...jest.requireActual('objection'),
  transaction: jest.fn()
}));

describe('UserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a new user if not blacklisted and user does not exist', async () => {
      const data = { name: 'John Doe', email: 'john.doe@example.com', password: 'password' };

      (KarmaService.checkKarmaBlacklist as jest.Mock).mockResolvedValue(false);

      // Mock the query and its chainable methods
      const mockWhere = jest.fn().mockReturnValue({
        first: jest.fn().mockResolvedValue(null)
      });
      (User.query as jest.Mock).mockReturnValue({
        where: mockWhere,
        insert: jest.fn().mockResolvedValue({ id: 1, name: data.name, email: data.email, password: data.password })
      });

      (Wallet.query as jest.Mock).mockReturnValue({
        insert: jest.fn().mockResolvedValue({ id: 1, user_id: 1, balance: 0 })
      });

      (transaction as unknown as jest.Mock).mockImplementation((knex, callback) => callback({ commit: jest.fn(), rollback: jest.fn() }));

      const result = await UserService.createUser(data);

      expect(result.user).toEqual({ id: 1, name: data.name, email: data.email, password: data.password });
      expect(result.wallet).toEqual({ id: 1, user_id: 1, balance: 0 });
    });

    it('should throw an error if the user is blacklisted', async () => {
      const data = { name: 'John Doe', email: 'john.doe@example.com', password: 'password' };

      (KarmaService.checkKarmaBlacklist as jest.Mock).mockResolvedValue(true);

      await expect(UserService.createUser(data)).rejects.toThrow('User is blacklisted');
    });

    it('should throw an error if the user already exists', async () => {
      const data = { name: 'John Doe', email: 'john.doe@example.com', password: 'password' };

      (KarmaService.checkKarmaBlacklist as jest.Mock).mockResolvedValue(false);

      // Mock the query and its chainable methods
      const mockFirst = jest.fn().mockResolvedValue({ id: 1, name: data.name, email: data.email, password: data.password });
      (User.query as jest.Mock).mockReturnValue({
        where: jest.fn().mockReturnValue({ first: mockFirst })
      });

      await expect(UserService.createUser(data)).rejects.toThrow('User already exists with this email.');
    });
  });

  describe('getUser', () => {
    it('should return a user if the user exists', async () => {
      const user = { id: 1, name: 'John Doe', email: 'john.doe@example.com', password: 'password' };

      const mockFindById = jest.fn().mockResolvedValue(user);
      (User.query as jest.Mock).mockReturnValue({
        findById: mockFindById
      });

      const result = await UserService.getUser(1);

      expect(result).toEqual(user);
    });

    it('should throw an error if the user does not exist', async () => {
      const mockFindById = jest.fn().mockResolvedValue(null);
      (User.query as jest.Mock).mockReturnValue({
        findById: mockFindById
      });

      await expect(UserService.getUser(1)).rejects.toThrow('User not found');
    });
  });

  describe('getUserByEmail', () => {
    it('should return a user if the user exists', async () => {
      const user = { id: 1, name: 'John Doe', email: 'john.doe@example.com', password: 'password' };

      const mockFirst = jest.fn().mockResolvedValue(user);
      (User.query as jest.Mock).mockReturnValue({
        where: jest.fn().mockReturnValue({ first: mockFirst })
      });

      const result = await UserService.getUserByEmail('john.doe@example.com');

      expect(result).toEqual(user);
    });

    it('should throw an error if the user does not exist', async () => {
      const mockFirst = jest.fn().mockResolvedValue(null);
      (User.query as jest.Mock).mockReturnValue({
        where: jest.fn().mockReturnValue({ first: mockFirst })
      });

      await expect(UserService.getUserByEmail('john.doe@example.com')).rejects.toThrow('User not found');
    });
  });
});
