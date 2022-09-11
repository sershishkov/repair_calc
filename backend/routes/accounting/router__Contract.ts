import express from 'express';
import { protect, authorize } from '../../middlewares/authMiddleware';
import {
  add__Contract,
  update__Contract,
  getAll__Contracts,
  getOne__Contract,
  delete__Contract,
} from '../../controllers/accounting/controller__Contract';

const router = express.Router();
router.use(protect);
router.use(
  authorize('seller', 'engineer', 'accountant', 'manager', 'boss', 'admin')
);

router.route('/').get(getAll__Contracts).post(add__Contract);

router
  .route('/:id')
  .get(getOne__Contract)
  .put(update__Contract)
  .delete(delete__Contract);

export default router;
