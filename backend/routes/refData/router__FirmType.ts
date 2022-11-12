import express from 'express';
import { protect, authorize } from '../../middlewares/authMiddleware';
import { seller_role } from '../../utils/constants';
import {
  add__FirmType,
  update__FirmType,
  getAll__FirmTypes,
  getOne__FirmType,
  delete__FirmType,
} from '../../controllers/refData/controller__FirmType';

const router = express.Router();
router.use(protect);
router.use(authorize(seller_role));

router.route('/').get(getAll__FirmTypes).post(add__FirmType);

router
  .route('/:id')
  .get(getOne__FirmType)
  .put(update__FirmType)
  .delete(delete__FirmType);

export default router;
