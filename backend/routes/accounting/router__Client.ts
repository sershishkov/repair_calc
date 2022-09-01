import express from 'express';
import { protect, authorize } from '../../middlewares/authMiddleware';
import {
  add__Client,
  update__Client,
  getAll__Clients,
  getOne__Client,
  delete__Client,
} from '../../controllers/accounting/controller__Client';

const router = express.Router();
router.use(protect);
router.use(
  authorize('seller', 'engineer', 'accountant', 'manager', 'boss', 'admin')
);

router.route('/').get(getAll__Clients).post(add__Client);

router
  .route('/:id')
  .get(getOne__Client)
  .put(update__Client)
  .delete(delete__Client);

export default router;
