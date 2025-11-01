import { Request, Response } from 'express';
import { query } from '../config/database';

export const validatePromoCode = async (req: Request, res: Response) => {
    try {
        const { code } = req.body;

        if (!code) {
            return res.status(400).json({
                valid: false,
                error: 'Promo code is required',
            });
        }

        const result = await query(
            'SELECT * FROM promo_codes WHERE code = $1 AND active = true',
            [code.toUpperCase()]
        );

        if (result.rows.length === 0) {
            return res.json({
                valid: false,
                message: 'Invalid or expired promo code',
            });
        }

        const promo = result.rows[0];

        res.json({
            valid: true,
            type: promo.type,
            discount: parseFloat(promo.value),
            message: 'Promo code applied successfully',
        });
    } catch (error) {
        console.error('Error validating promo code:', error);
        res.status(500).json({
            valid: false,
            error: 'Failed to validate promo code',
        });
    }
};