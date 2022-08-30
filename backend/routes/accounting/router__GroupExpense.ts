import express from 'express';
import { protect, authorize } from '../../middlewares/authMiddleware';
import {
  add__GroupExpense,
  update__GroupExpense,
  getAll__GroupExpenses,
  getOne__GroupExpense,
  delete__GroupExpense,
} from '../../controllers/accounting/controller__GroupExpense';

const router = express.Router();
router.use(protect);
router.use(
  authorize('seller', 'engineer', 'accountant', 'manager', 'boss', 'admin')
);

router.route('/').get(getAll__GroupExpenses).post(add__GroupExpense);

router
  .route('/:id')
  .get(getOne__GroupExpense)
  .put(update__GroupExpense)
  .delete(delete__GroupExpense);

export default router;
