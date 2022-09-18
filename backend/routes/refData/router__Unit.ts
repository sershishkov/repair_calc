import express from 'express';
import { protect, authorize } from '../../middlewares/authMiddleware';
import {
  add__Unit,
  update__Unit,
  getAll__Units,
  getOne__Unit,
  delete__Unit,
} from '../../controllers/refData/controller__Unit';

const router = express.Router();
router.use(protect);
router.use(
  authorize('seller', 'engineer', 'accountant', 'manager', 'boss', 'admin')
);

router.route('/').get(getAll__Units).post(add__Unit);

router.route('/:id').get(getOne__Unit).put(update__Unit).delete(delete__Unit);

export default router;
