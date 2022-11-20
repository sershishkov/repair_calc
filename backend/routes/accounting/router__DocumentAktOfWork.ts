import express from 'express';
import { protect, authorize } from '../../middlewares/authMiddleware';
import { seller_role } from '../../utils/constants';
import {
  add__DocumentAktOfWork,
  update__DocumentAktOfWork,
  getAll__DocumentAktOfWorks,
  getOne__DocumentAktOfWork,
  delete__DocumentAktOfWork,
} from '../../controllers/accounting/controller__DocumentAktOfWork';

const router = express.Router();
router.use(protect);
router.use(authorize(seller_role));

router.route('/').get(getAll__DocumentAktOfWorks).post(add__DocumentAktOfWork);

router
  .route('/:id')
  .get(getOne__DocumentAktOfWork)
  .put(update__DocumentAktOfWork)
  .delete(delete__DocumentAktOfWork);

export default router;
