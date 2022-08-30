import express from 'express';
const router = express.Router();

import authRoutes from './user/authRoutes';
import router__Unit from './accounting/router__Unit';
import router__FirmType from './accounting/router__FirmType';
import router__TaxationType from './accounting/router__TaxationType';

router.use('/auth', authRoutes);

router.use('/accounting/unit', router__Unit);
router.use('/accounting/firmtype', router__FirmType);
router.use('/accounting/taxationtype', router__TaxationType);

export default router;
