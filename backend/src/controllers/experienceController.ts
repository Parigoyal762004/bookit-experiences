import { Request, Response } from 'express';
import { query } from '../config/database';
import { Experience, Slot } from '../types';

export const getAllExperiences = async (req: Request, res: Response) => {
    try {
        const { category, search, minPrice, maxPrice } = req.query;

        let queryText = 'SELECT * FROM experiences WHERE 1=1';
        const params: any[] = [];
        let paramCount = 0;

        if (category && category !== 'all') {
            paramCount++;
            queryText += ` AND category = $${paramCount}`;
            params.push(category);
        }

        if (search) {
            paramCount++;
            queryText += ` AND (title ILIKE $${paramCount} OR description ILIKE $${paramCount} OR location ILIKE $${paramCount})`;
            params.push(`%${search}%`);
        }

        if (minPrice) {
            paramCount++;
            queryText += ` AND price >= $${paramCount}`;
            params.push(minPrice);
        }

        if (maxPrice) {
            paramCount++;
            queryText += ` AND price <= $${paramCount}`;
            params.push(maxPrice);
        }

        queryText += ' ORDER BY created_at DESC';

        const result = await query(queryText, params);

        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching experiences:', error);
        res.status(500).json({ error: 'Failed to fetch experiences' });
    }
};

export const getExperienceById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const result = await query(
            'SELECT * FROM experiences WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Experience not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching experience:', error);
        res.status(500).json({ error: 'Failed to fetch experience' });
    }
};

export const getExperienceSlots = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { date } = req.query;

        let queryText = 'SELECT * FROM slots WHERE experience_id = $1';
        const params: any[] = [id];

        if (date) {
            queryText += ' AND date = $2';
            params.push(date);
        } else {
            // Get slots for next 30 days
            queryText += ' AND date >= CURRENT_DATE AND date <= CURRENT_DATE + INTERVAL \'30 days\'';
        }

        queryText += ' ORDER BY date, start_time';

        const result = await query(queryText, params);

        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching slots:', error);
        res.status(500).json({ error: 'Failed to fetch slots' });
    }
};