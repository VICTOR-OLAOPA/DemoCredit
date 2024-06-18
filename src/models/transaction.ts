import { Model } from 'objection';

class Transaction extends Model {
  static tableName = 'transactions';

  id!: number;
  wallet_id!: number;
  type!: string;
  amount!: number;

  static jsonSchema = {
    type: 'object',
    required: ['wallet_id', 'type', 'amount'],
    properties: {
      id: { type: 'integer' },
      walletId: { type: 'integer' },
      type: { type: 'string' },
      amount: { type: 'number' },
    },
  };
}

export default Transaction;
