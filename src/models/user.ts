import { Model } from 'objection';

class User extends Model {
  static tableName = 'users';

  id!: number;
  name!: string;
  email!: string;

  static jsonSchema = {
    type: 'object',
    required: ['name', 'email'],
    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
      email: { type: 'string' }
    }
  }
}

export default User;
