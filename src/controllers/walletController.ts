import { Request, Response } from 'express';
import WalletService from '../services/walletService';

class WalletController {
  static async fundWallet(req: Request, res: Response) {
    try {
      const { userId, amount } = req.body;
      const updatedWallet = await WalletService.fundWallet(userId, amount);
      res.status(200).json({ message: 'Wallet funded successfully', wallet: updatedWallet });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  static async transferFunds(req: Request, res: Response) {
    try {
      const result = await WalletService.transferFunds(req.body);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  }

  static async withdrawFunds(req: Request, res: Response) {
    try {
      const result = await WalletService.withdrawFunds(req.body);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  }
}

export default WalletController;
