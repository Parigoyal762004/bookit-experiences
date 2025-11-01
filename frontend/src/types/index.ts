export interface Experience {
    id: string;
    title: string;
    description: string;
    location: string;
    price: number;
    duration: string;
    images: string[];
    category: string;
    rating: number;
    reviews: number;
    highlights: string[];
    included: string[];
    maxGroupSize: number;
}

export interface Slot {
    id: string;
    experienceId: string;
    date: string;
    startTime: string;
    endTime: string;
    availableSpots: number;
    totalSpots: number;
    price: number;
}

export interface BookingData {
    experienceId: string;
    slotId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    guests: number;
    promoCode?: string;
    totalPrice: number;
}

export interface PromoCode {
    code: string;
    type: 'PERCENTAGE' | 'FLAT';
    value: number;
    valid: boolean;
}

export interface BookingResponse {
    success: boolean;
    bookingId?: string;
    message: string;
}