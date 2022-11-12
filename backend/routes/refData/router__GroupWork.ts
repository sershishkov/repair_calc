import express from 'express';
import { protect, authorize } from '../../middlewares/authMiddleware';
import { seller_role } from '../../utils/constants';
import {
  add__GroupWork,
  update__GroupWork,
  getAll__GroupWorks,
  getOne__GroupWork,
  delete__GroupWork,
} from '../../controllers/refData/controller__GroupWork';

const router = express.Router();
router.use(protect);
router.use(authorize(seller_role));

router.route('/').get(getAll__GroupWorks).post(add__GroupWork);

router
  .route('/:id')
  .get(getOne__GroupWork)
  .put(update__GroupWork)
  .delete(delete__GroupWork);

export default router;
