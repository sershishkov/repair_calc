import express from 'express';
import { protect, authorize } from '../../middlewares/authMiddleware';
import { seller_role } from '../../utils/constants';
import {
  add__ContractType,
  update__ContractType,
  getAll__ContractTypes,
  getOne__ContractType,
  delete__ContractType,
} from '../../controllers/refData/controller__ContractType';

const router = express.Router();
router.use(protect);
router.use(authorize(seller_role));

router.route('/').get(getAll__ContractTypes).post(add__ContractType);

router
  .route('/:id')
  .get(getOne__ContractType)
  .put(update__ContractType)
  .delete(delete__ContractType);

export default router;
