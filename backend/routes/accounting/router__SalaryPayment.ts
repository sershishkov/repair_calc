import express from 'express';
import { protect, authorize } from '../../middlewares/authMiddleware';
import {
  add__SalaryPayment,
  update__SalaryPayment,
  getAll__SalaryPayments,
  getOne__SalaryPayment,
  delete__SalaryPayment,
} from '../../controllers/accounting/controller__SalaryPayment';

const router = express.Router();
router.use(protect);
router.use(
  authorize('seller', 'engineer', 'accountant', 'manager', 'boss', 'admin')
);

router.route('/').get(getAll__SalaryPayments).post(add__SalaryPayment);

router
  .route('/:id')
  .get(getOne__SalaryPayment)
  .put(update__SalaryPayment)
  .delete(delete__SalaryPayment);

export default router;
