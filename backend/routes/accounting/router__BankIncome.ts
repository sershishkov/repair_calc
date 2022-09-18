import express from 'express';
import { protect, authorize } from '../../middlewares/authMiddleware';
import {
  add__BankIncome,
  update__BankIncome,
  getAll__BankIncomes,
  getOne__BankIncome,
  delete__BankIncome,
} from '../../controllers/accounting/controller__BankIncome';

const router = express.Router();
router.use(protect);
router.use(
  authorize('seller', 'engineer', 'accountant', 'manager', 'boss', 'admin')
);

router.route('/').get(getAll__BankIncomes).post(add__BankIncome);

router
  .route('/:id')
  .get(getOne__BankIncome)
  .put(update__BankIncome)
  .delete(delete__BankIncome);

export default router;
