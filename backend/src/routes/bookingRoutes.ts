import { Router } from 'express';
import { body } from 'express-validator';
import { createBooking, getBookingById } from '../controllers/bookingController';
import { validate } from '../middleware/validator';

const router = Router();

router.post(
    '/',
    [
        body('experienceId').notEmpty().withMessage('Experience ID is required'),
        body('slotId').notEmpty().withMessage('Slot ID is required'),
        body('firstName').trim().notEmpty().withMessage('First name is required'),
        body('lastName').trim().notEmpty().withMessage('Last name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('phone').matches(/^[0-9]{10}$/).withMessage('Valid 10-digit phone number is required'),
        body('guests').isInt({ min: 1 }).withMessage('At least 1 guest required'),
        body('totalPrice').isFloat({ min: 0 }).withMessage('Valid total price is required'),
    ],
    validate,
    createBooking
);

router.get('/:id', getBookingById);

export default router;