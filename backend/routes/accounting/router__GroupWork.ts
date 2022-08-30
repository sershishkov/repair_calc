import express from 'express';
import { protect, authorize } from '../../middlewares/authMiddleware';
import {
  add__GroupWork,
  update__GroupWork,
  getAll__GroupWorks,
  getOne__GroupWork,
  delete__GroupWork,
} from '../../controllers/accounting/controller__GroupWork';

const router = express.Router();
router.use(protect);
router.use(
  authorize('seller', 'engineer', 'accountant', 'manager', 'boss', 'admin')
);

router.route('/').get(getAll__GroupWorks).post(add__GroupWork);

router
  .route('/:id')
  .get(getOne__GroupWork)
  .put(update__GroupWork)
  .delete(delete__GroupWork);

export default router;
