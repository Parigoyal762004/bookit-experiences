import { api } from './api';
import type {Experience, Slot} from '../types';

export const experienceService = {
    // Get all experiences
    getExperiences: async (params?: {
        category?: string;
        search?: string;
        minPrice?: number;
        maxPrice?: number;
    }): Promise<Experience[]> => {
        const response = await api.get('/experiences', { params });
        return response.data;
    },

    // Get experience by ID
    getExperienceById: async (id: string): Promise<Experience> => {
        const response = await api.get(`/experiences/${id}`);
        return response.data;
    },

    // Get available slots for experience
    getSlots: async (experienceId: string, date?: string): Promise<Slot[]> => {
        const response = await api.get(`/experiences/${experienceId}/slots`, {
            params: { date },
        });
        return response.data;
    },
};