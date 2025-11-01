import { Request, Response } from 'express';
import pool, { query } from '../config/database';
import { Booking } from '../types';

// Generate unique booking ID
const generateBookingId = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';
    for (let i = 0; i < 8; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
};

export const createBooking = async (req: Request, res: Response) => {
    const client = await pool.connect();

    try {
        const {
            experienceId,
            slotId,
            firstName,
            lastName,
            email,
            phone,
            guests,
            promoCode,
            totalPrice,
        } = req.body;

        // Validate required fields
        if (!experienceId || !slotId || !firstName || !lastName || !email || !phone || !guests || !totalPrice) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields',
            });
        }

        // Start transaction
        await client.query('BEGIN');

        // Check slot availability with row locking
        const slotResult = await client.query(
            'SELECT * FROM slots WHERE id = $1 FOR UPDATE',
            [slotId]
        );

        if (slotResult.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({
                success: false,
                message: 'Slot not found'
            });
        }

        const slot = slotResult.rows[0];

        if (slot.available_spots < guests) {
            await client.query('ROLLBACK');
            return res.status(400).json({
                success: false,
                message: `Not enough spots available. Only ${slot.available_spots} spots left.`,
            });
        }

        // Create booking
        const bookingId = generateBookingId();

        await client.query(
            `INSERT INTO bookings (
        id, experience_id, slot_id, first_name, last_name, 
        email, phone, guests, promo_code, total_price, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
            [
                bookingId,
                experienceId,
                slotId,
                firstName,
                lastName,
                email,
                phone,
                guests,
                promoCode || null,
                totalPrice,
                'confirmed',
            ]
        );

        // Update slot availability
        await client.query(
            'UPDATE slots SET available_spots = available_spots - $1 WHERE id = $2',
            [guests, slotId]
        );

        // Commit transaction
        await client.query('COMMIT');

        res.status(201).json({
            success: true,
            bookingId,
            message: 'Booking created successfully',
        });

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error creating booking:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create booking. Please try again.',
        });
    } finally {
        client.release();
    }
};

export const getBookingById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const result = await query(
            `SELECT 
        b.*,
        e.title as experience_title,
        e.location as experience_location,
        e.images as experience_images,
        s.date,
        s.start_time,
        s.end_time
       FROM bookings b
       JOIN experiences e ON b.experience_id = e.id
       JOIN slots s ON b.slot_id = s.id
       WHERE b.id = $1`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        res.json({
            success: true,
            booking: result.rows[0],
        });

    } catch (error) {
        console.error('Error fetching booking:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch booking'
        });
    }
};

export const getAllBookings = async (req: Request, res: Response) => {
    try {
        const { email } = req.query;

        let queryText = `
      SELECT 
        b.*,
        e.title as experience_title,
        e.location as experience_location,
        s.date,
        s.start_time
      FROM bookings b
      JOIN experiences e ON b.experience_id = e.id
      JOIN slots s ON b.slot_id = s.id
    `;

        const params: any[] = [];

        if (email) {
            queryText += ' WHERE b.email = $1';
            params.push(email);
        }

        queryText += ' ORDER BY b.created_at DESC';

        const result = await query(queryText, params);

        res.json({
            success: true,
            bookings: result.rows,
        });

    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch bookings'
        });
    }
};