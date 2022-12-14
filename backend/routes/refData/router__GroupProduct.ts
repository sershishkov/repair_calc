import express from 'express';
import { protect, authorize } from '../../middlewares/authMiddleware';
import { seller_role } from '../../utils/constants';
import {
  add__GroupProduct,
  update__GroupProduct,
  getAll__GroupProducts,
  getOne__GroupProduct,
  delete__GroupProduct,
} from '../../controllers/refData/controller__GroupProduct';

const router = express.Router();
router.use(protect);
router.use(authorize(seller_role));

router.route('/').get(getAll__GroupProducts).post(add__GroupProduct);

router
  .route('/:id')
  .get(getOne__GroupProduct)
  .put(update__GroupProduct)
  .delete(delete__GroupProduct);

export default router;
