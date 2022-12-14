import express from 'express';
import { protect, authorize } from '../../middlewares/authMiddleware';
import { seller_role } from '../../utils/constants';
import {
  add__TaxationType,
  update__TaxationType,
  getAll__TaxationTypes,
  getOne__TaxationType,
  delete__TaxationType,
} from '../../controllers/refData/controller__TaxationType';

const router = express.Router();
router.use(protect);
router.use(authorize(seller_role));

router.route('/').get(getAll__TaxationTypes).post(add__TaxationType);

router
  .route('/:id')
  .get(getOne__TaxationType)
  .put(update__TaxationType)
  .delete(delete__TaxationType);

export default router;
