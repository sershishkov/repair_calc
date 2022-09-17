import express from 'express';
import { protect, authorize } from '../../middlewares/authMiddleware';
import {
  add__ServiceWork,
  update__ServiceWork,
  getAll__ServiceWorks,
  getOne__ServiceWork,
  delete__ServiceWork,
} from '../../controllers/accounting/controller__ServiceWork';

const router = express.Router();
router.use(protect);
router.use(
  authorize('seller', 'engineer', 'accountant', 'manager', 'boss', 'admin')
);

router.route('/').get(getAll__ServiceWorks).post(add__ServiceWork);

router
  .route('/:id')
  .get(getOne__ServiceWork)
  .put(update__ServiceWork)
  .delete(delete__ServiceWork);

export default router;
