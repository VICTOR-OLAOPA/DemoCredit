import express from 'express';
import KarmaService from '../services/karmaService';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/check-blacklist/:identity', authMiddleware, async (req, res) => {
  const { identity } = req.params;
  try {
    const result = await KarmaService.checkKarmaBlacklist(identity);
    res.json(result);
  } catch (error) {
    if (error instanceof Error) {
        res.status(500).json({ error: error.message });
    } else {
        res.status(500).json({ error: 'An unknown error occurred' });
    }

  }
});

export default router;
