import express from 'express';
import { protect, authorize } from '../../middlewares/authMiddleware';
import { seller_role } from '../../utils/constants';
import {
  add__Contract,
  update__Contract,
  getAll__Contracts,
  getOne__Contract,
  delete__Contract,
} from '../../controllers/refData/controller__Contract';

const router = express.Router();
router.use(protect);
router.use(authorize(seller_role));

router.route('/').get(getAll__Contracts).post(add__Contract);

router
  .route('/:id')
  .get(getOne__Contract)
  .put(update__Contract)
  .delete(delete__Contract);

export default router;
