import express from 'express';
import { protect, authorize } from '../../middlewares/authMiddleware';
import {
  add__Expense,
  update__Expense,
  getAll__Expenses,
  getOne__Expense,
  delete__Expense,
} from '../../controllers/accounting/controller__Expense';

const router = express.Router();
router.use(protect);
router.use(
  authorize('seller', 'engineer', 'accountant', 'manager', 'boss', 'admin')
);

router.route('/').get(getAll__Expenses).post(add__Expense);

router
  .route('/:id')
  .get(getOne__Expense)
  .put(update__Expense)
  .delete(delete__Expense);

export default router;
