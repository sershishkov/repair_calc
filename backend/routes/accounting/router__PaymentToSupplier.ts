import express from 'express';
import { protect, authorize } from '../../middlewares/authMiddleware';
import { accountant_role } from '../../utils/constants';
import {
  add__PaymentToSupplier,
  update__PaymentToSupplier,
  getAll__PaymentToSuppliers,
  getOne__PaymentToSupplier,
  delete__PaymentToSupplier,
} from '../../controllers/accounting/controller__PaymentToSupplier';

const router = express.Router();
router.use(protect);
router.use(authorize(accountant_role));

router.route('/').get(getAll__PaymentToSuppliers).post(add__PaymentToSupplier);

router
  .route('/:id')
  .get(getOne__PaymentToSupplier)
  .put(update__PaymentToSupplier)
  .delete(delete__PaymentToSupplier);

export default router;
