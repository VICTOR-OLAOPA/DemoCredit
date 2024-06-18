import { Model } from 'objection';

class Wallet extends Model {
  static tableName = 'wallets';

  id!: number;
  user_id!: number;
  balance!: number;

  static jsonSchema = {
    type: 'object',
    required: ['user_id', 'balance'],
    properties: {
      id: { type: 'integer' },
      user_id: { type: 'integer' },
      balance: { type: 'number' }
    }
  }
}

export default Wallet;
