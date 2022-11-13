import express from 'express';
import { protect, authorize } from '../../middlewares/authMiddleware';
import { seller_role } from '../../utils/constants';
import {
  add__DocumentNakladnaya,
  update__DocumentNakladnaya,
  getAll__DocumentNakladnayas,
  getOne__DocumentNakladnaya,
  delete__DocumentNakladnaya,
} from '../../controllers/accounting/controller__DocumentNakladnaya';

const router = express.Router();
router.use(protect);
router.use(authorize(seller_role));

router
  .route('/')
  .get(getAll__DocumentNakladnayas)
  .post(add__DocumentNakladnaya);

router
  .route('/:id')
  .get(getOne__DocumentNakladnaya)
  .put(update__DocumentNakladnaya)
  .delete(delete__DocumentNakladnaya);

export default router;
