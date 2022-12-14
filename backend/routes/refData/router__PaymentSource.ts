import express from 'express';
import { protect, authorize } from '../../middlewares/authMiddleware';
import { seller_role } from '../../utils/constants';
import {
  add__PaymentSource,
  update__PaymentSource,
  getAll__PaymentSources,
  getOne__PaymentSource,
  delete__PaymentSource,
} from '../../controllers/refData/controller__PaymentSource';

const router = express.Router();
router.use(protect);
router.use(authorize(seller_role));

router.route('/').get(getAll__PaymentSources).post(add__PaymentSource);

router
  .route('/:id')
  .get(getOne__PaymentSource)
  .put(update__PaymentSource)
  .delete(delete__PaymentSource);

export default router;
