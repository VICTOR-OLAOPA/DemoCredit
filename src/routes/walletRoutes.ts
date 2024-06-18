import { Router } from 'express';
import WalletController from '../controllers/walletController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/wallets/fund', authMiddleware, WalletController.fundWallet);
router.post('/wallets/transfer', authMiddleware, WalletController.transferFunds);
router.post('/wallets/withdraw', authMiddleware, WalletController.withdrawFunds);

export default router;
