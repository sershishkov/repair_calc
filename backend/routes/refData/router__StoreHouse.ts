import express from 'express';
import { protect, authorize } from '../../middlewares/authMiddleware';
import { seller_role } from '../../utils/constants';
import {
  add__StoreHouse,
  update__StoreHouse,
  getAll__StoreHouses,
  getOne__StoreHouse,
  delete__StoreHouse,
} from '../../controllers/refData/controller__StoreHouse';

const router = express.Router();
router.use(protect);
router.use(authorize(seller_role));

router.route('/').get(getAll__StoreHouses).post(add__StoreHouse);

router
  .route('/:id')
  .get(getOne__StoreHouse)
  .put(update__StoreHouse)
  .delete(delete__StoreHouse);

export default router;
