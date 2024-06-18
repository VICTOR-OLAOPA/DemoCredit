import { transaction } from 'objection';
import Wallet from '../models/wallet';
import User from '../models/user';
import Transaction from '../models/transaction';

class WalletService {
  static async fundWallet(userId: number, amount: number) {
    // Check if the user with specified userId exists
    const user = await User.query().where({ id: userId }).first();
    if (!user) {
      throw new Error('User with the specified User ID does not exist');
    }

    // Check if wallet has been created for the specified user
    const wallet = await Wallet.query().where({ user_id: userId }).first();

    if (!wallet) {
      throw new Error('Wallet not found');
    }

    wallet.balance += amount;
    await wallet.$query().patch();

    return wallet;
  }

  static async transferFunds(data: { fromUserId: number, toUserId: number, amount: number }) {
    return transaction(Wallet.knex(), async (trx) => {
      const fromWallet = await Wallet.query(trx).where('user_id', data.fromUserId).first();
      const toWallet = await Wallet.query(trx).where('user_id', data.toUserId).first();
      if (!fromWallet || !toWallet) {
        throw new Error('Wallet not found');
      }
      if (fromWallet.balance < data.amount) {
        throw new Error('Insufficient funds');
      }
      fromWallet.balance -= data.amount;
      toWallet.balance += data.amount;
      await fromWallet.$query(trx).patch();
      await toWallet.$query(trx).patch();
      await Transaction.query(trx).insert({ wallet_id: fromWallet.id, type: 'transfer', amount: data.amount });
      await Transaction.query(trx).insert({ wallet_id: toWallet.id, type: 'transfer', amount: data.amount });
      return { fromWallet, toWallet };
    });
  }

  static async withdrawFunds(data: { userId: number, amount: number }) {
    return transaction(Wallet.knex(), async (trx) => {
      const wallet = await Wallet.query(trx).where('user_id', data.userId).first();
      if (!wallet) {
        throw new Error('Wallet not found');
      }
      if (wallet.balance < data.amount) {
        throw new Error('Insufficient funds');
      }
      wallet.balance -= data.amount;
      await wallet.$query(trx).patch();
      await Transaction.query(trx).insert({ wallet_id: wallet.id, type: 'withdraw', amount: data.amount });
      return wallet;
    });
  }
}

export default WalletService;
