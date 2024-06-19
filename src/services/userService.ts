import bcrypt from 'bcryptjs';
import User from '../models/user';
import Wallet from '../models/wallet';
import KarmaService from './karmaService';
import { transaction } from 'objection';

class UserService {
  static async createUser(data: { name: string, email: string, password: string }) {
    return transaction(User.knex(), async (trx) => {
      // Check Karma blacklist
      const isBlacklisted = await KarmaService.checkKarmaBlacklist(data.email);
      if (isBlacklisted) {
        throw new Error('User is blacklisted');
      }
      // // Create new useruna
      // Check if user already exists
      const existingUser = await User.query(trx).where({ email: data.email }).first();
      if (existingUser) {
        throw new Error('User already exists with this email.');
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const hashedData = {
        name: data.name,
        email: data.email,
        password: hashedPassword
      };

      // Create new user with the hashed password
      const user = await User.query(trx).insert(hashedData);

      // Create wallet with 0 balance for the new user
      const wallet = await Wallet.query(trx).insert({user_id: user.id, balance: 0});
      console.log(`User ${user.name} Registered. Wallet created for ${user.name}`)
      return {isBlacklisted, user, wallet};
    });
  }

  static async getUser(id: number) {
    const user = await User.query().findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  static async getUserByEmail(email: string) {
    const user = await User.query().where('email', email).first();
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}

export default UserService;
