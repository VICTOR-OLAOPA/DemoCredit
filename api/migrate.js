import { NextApiRequest, NextApiResponse } from 'next';
import knex from 'knex';

export default async function handler(req, res) {
  try {
    await knex.migrate.latest();
    res.status(200).json({ message: 'Migrations ran successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error running migrations' });
  }
}
