import express from 'express';
import { protect, authorize } from '../../middlewares/authMiddleware';
import {
  add__PaymentToSupplier,
  update__PaymentToSupplier,
  getAll__PaymentToSuppliers,
  getOne__PaymentToSupplier,
  delete__PaymentToSupplier,
} from '../../controllers/accounting/controller__PaymentToSupplier';

const router = express.Router();
router.use(protect);
router.use(
  authorize('seller', 'engineer', 'accountant', 'manager', 'boss', 'admin')
);

router.route('/').get(getAll__PaymentToSuppliers).post(add__PaymentToSupplier);

router
  .route('/:id')
  .get(getOne__PaymentToSupplier)
  .put(update__PaymentToSupplier)
  .delete(delete__PaymentToSupplier);

export default router;
