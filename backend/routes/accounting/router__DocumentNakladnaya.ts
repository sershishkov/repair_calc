import express from 'express';
import { protect, authorize } from '../../middlewares/authMiddleware';
import { accountant_role } from '../../utils/constants';
import {
  add__BankIncome,
  update__BankIncome,
  getAll__BankIncomes,
  getOne__BankIncome,
  delete__BankIncome,
} from '../../controllers/accounting/controller__BankIncome';

const router = express.Router();
router.use(protect);
router.use(authorize(accountant_role));

router.route('/').get(getAll__BankIncomes).post(add__BankIncome);

router
  .route('/:id')
  .get(getOne__BankIncome)
  .put(update__BankIncome)
  .delete(delete__BankIncome);

export default router;
