import { Model } from 'objection';
import Knex from 'knex';
import knexConfig from '../knexfile';

// Initialize Knex.
const knex = Knex(knexConfig.development);

// Bind all Models to a Knex instance.
Model.knex(knex);

export default knex;
