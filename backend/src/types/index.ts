export interface Experience {
    id: string;
    title: string;
    description: string;
    location: string;
    price: number;
    duration: string;
    category: string;
    rating: number;
    reviews: number;
    max_group_size: number;
    images: string[];
    highlights: string[];
    included: string[];
    created_at?: Date;
    updated_at?: Date;
}

export interface Slot {
    id: string;
    experience_id: string;
    date: string;
    start_time: string;
    end_time: string;
    total_spots: number;
    available_spots: number;
    price: number;
    created_at?: Date;
}

export interface Booking {
    id: string;
    experience_id: string;
    slot_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    guests: number;
    promo_code?: string;
    total_price: number;
    status: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface PromoCode {
    code: string;
    type: 'PERCENTAGE' | 'FLAT';
    value: number;
    active: boolean;
}