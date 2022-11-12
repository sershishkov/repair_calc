import express from 'express';
import { protect, authorize } from '../../middlewares/authMiddleware';
import { seller_role } from '../../utils/constants';
import {
  add__ClientType,
  update__ClientType,
  getAll__ClientTypes,
  getOne__ClientType,
  delete__ClientType,
} from '../../controllers/refData/controller__ClientType';

const router = express.Router();
router.use(protect);
router.use(authorize(seller_role));

router.route('/').get(getAll__ClientTypes).post(add__ClientType);

router
  .route('/:id')
  .get(getOne__ClientType)
  .put(update__ClientType)
  .delete(delete__ClientType);

export default router;
