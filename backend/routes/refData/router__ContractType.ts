import express from 'express';
import { protect, authorize } from '../../middlewares/authMiddleware';
import {
  add__ContractType,
  update__ContractType,
  getAll__ContractTypes,
  getOne__ContractType,
  delete__ContractType,
} from '../../controllers/refData/controller__ContractType';

const router = express.Router();
router.use(protect);
router.use(
  authorize('seller', 'engineer', 'accountant', 'manager', 'boss', 'admin')
);

router.route('/').get(getAll__ContractTypes).post(add__ContractType);

router
  .route('/:id')
  .get(getOne__ContractType)
  .put(update__ContractType)
  .delete(delete__ContractType);

export default router;
