import { Router } from 'express';
import { body } from 'express-validator';
import { validatePromoCode } from '../controllers/promoController';
import { validate } from '../middleware/validator';

const router = Router();

router.post(
    '/validate',
    [body('code').notEmpty().withMessage('Promo code is required')],
    validate,
    validatePromoCode
);

export default router;