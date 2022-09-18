import express from 'express';
import { protect, authorize } from '../../middlewares/authMiddleware';
import {
  add__ProductType,
  update__ProductType,
  getAll__ProductTypes,
  getOne__ProductType,
  delete__ProductType,
} from '../../controllers/refData/controller__ProductType';

const router = express.Router();
router.use(protect);
router.use(
  authorize('seller', 'engineer', 'accountant', 'manager', 'boss', 'admin')
);

router.route('/').get(getAll__ProductTypes).post(add__ProductType);

router
  .route('/:id')
  .get(getOne__ProductType)
  .put(update__ProductType)
  .delete(delete__ProductType);

export default router;
