import express from 'express';
import { protect, authorize } from '../../middlewares/authMiddleware';
import {
  add__WorkerRole,
  update__WorkerRole,
  getAll__WorkerRoles,
  getOne__WorkerRole,
  delete__WorkerRole,
} from '../../controllers/accounting/controller__WorkerRole';

const router = express.Router();
router.use(protect);
router.use(
  authorize('seller', 'engineer', 'accountant', 'manager', 'boss', 'admin')
);

router.route('/').get(getAll__WorkerRoles).post(add__WorkerRole);

router
  .route('/:id')
  .get(getOne__WorkerRole)
  .put(update__WorkerRole)
  .delete(delete__WorkerRole);

export default router;
