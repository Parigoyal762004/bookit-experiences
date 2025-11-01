import { api } from './api';
import type {BookingData, BookingResponse} from '../types';

export const bookingService = {
    // Create booking
    createBooking: async (bookingData: BookingData): Promise<BookingResponse> => {
        const response = await api.post('/bookings', bookingData);
        return response.data;
    },

    // Validate promo code
    validatePromo: async (code: string): Promise<{
        valid: boolean;
        discount: number;
        type: 'PERCENTAGE' | 'FLAT';
    }> => {
        const response = await api.post('/promo/validate', { code });
        return response.data;
    },
};