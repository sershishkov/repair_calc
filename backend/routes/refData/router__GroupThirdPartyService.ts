import express from 'express';
import { protect, authorize } from '../../middlewares/authMiddleware';
import { seller_role } from '../../utils/constants';
import {
  add__GroupThirdPartyService,
  update__GroupThirdPartyService,
  getAll__GroupThirdPartyServices,
  getOne__GroupThirdPartyService,
  delete__GroupThirdPartyService,
} from '../../controllers/refData/controller__GroupThirdPartyService';

const router = express.Router();
router.use(protect);
router.use(authorize(seller_role));

router
  .route('/')
  .get(getAll__GroupThirdPartyServices)
  .post(add__GroupThirdPartyService);

router
  .route('/:id')
  .get(getOne__GroupThirdPartyService)
  .put(update__GroupThirdPartyService)
  .delete(delete__GroupThirdPartyService);

export default router;
