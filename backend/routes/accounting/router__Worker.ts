import express from 'express';
import { protect, authorize } from '../../middlewares/authMiddleware';
import {
  add__Worker,
  update__Worker,
  getAll__Workers,
  getOne__Worker,
  delete__Worker,
} from '../../controllers/accounting/controller__Worker';

const router = express.Router();
router.use(protect);
router.use(
  authorize('seller', 'engineer', 'accountant', 'manager', 'boss', 'admin')
);

router.route('/').get(getAll__Workers).post(add__Worker);

router
  .route('/:id')
  .get(getOne__Worker)
  .put(update__Worker)
  .delete(delete__Worker);

export default router;
