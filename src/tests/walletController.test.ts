import { Request, Response } from 'express';
import WalletController from '../controllers/walletController';
import WalletService from '../services/walletService';

jest.mock('../services/walletService');

describe('WalletController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    req = {};
    res = {
      status: statusMock,
    };
  });

  describe('fundWallet', () => {
    it('should fund a wallet and return 200 status', async () => {
      const updatedWallet = { id: 1, user_id: 1, balance: 100 };
      (WalletService.fundWallet as jest.Mock).mockResolvedValue(updatedWallet);

      req.body = { userId: 1, amount: 100 };

      await WalletController.fundWallet(req as Request, res as Response);

      expect(WalletService.fundWallet).toHaveBeenCalledWith(1, 100);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Wallet funded successfully', wallet: updatedWallet });
    });

    it('should return 400 status if an error occurs', async () => {
      const errorMessage = 'Failed to fund wallet';
      (WalletService.fundWallet as jest.Mock).mockRejectedValue(new Error(errorMessage));

      req.body = { userId: 1, amount: 100 };

      await WalletController.fundWallet(req as Request, res as Response);

      expect(WalletService.fundWallet).toHaveBeenCalledWith(1, 100);
      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('transferFunds', () => {
    it('should transfer funds and return 200 status', async () => {
      const transferResult = { fromWalletId: 1, toWalletId: 2, amount: 50 };
      (WalletService.transferFunds as jest.Mock).mockResolvedValue(transferResult);

      req.body = { fromWalletId: 1, toWalletId: 2, amount: 50 };

      await WalletController.transferFunds(req as Request, res as Response);

      expect(WalletService.transferFunds).toHaveBeenCalledWith(req.body);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(transferResult);
    });

    it('should return 400 status if an error occurs', async () => {
      const errorMessage = 'Failed to transfer funds';
      (WalletService.transferFunds as jest.Mock).mockRejectedValue(new Error(errorMessage));

      req.body = { fromWalletId: 1, toWalletId: 2, amount: 50 };

      await WalletController.transferFunds(req as Request, res as Response);

      expect(WalletService.transferFunds).toHaveBeenCalledWith(req.body);
      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('withdrawFunds', () => {
    it('should withdraw funds and return 200 status', async () => {
      const withdrawalResult = { walletId: 1, amount: 50 };
      (WalletService.withdrawFunds as jest.Mock).mockResolvedValue(withdrawalResult);

      req.body = { walletId: 1, amount: 50 };

      await WalletController.withdrawFunds(req as Request, res as Response);

      expect(WalletService.withdrawFunds).toHaveBeenCalledWith(req.body);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(withdrawalResult);
    });

    it('should return 400 status if an error occurs', async () => {
      const errorMessage = 'Failed to withdraw funds';
      (WalletService.withdrawFunds as jest.Mock).mockRejectedValue(new Error(errorMessage));

      req.body = { walletId: 1, amount: 50 };

      await WalletController.withdrawFunds(req as Request, res as Response);

      expect(WalletService.withdrawFunds).toHaveBeenCalledWith(req.body);
      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});
