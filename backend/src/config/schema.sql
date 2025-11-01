-- Create Tables

-- Experiences Table
CREATE TABLE IF NOT EXISTS experiences (
                                           id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    rating DECIMAL(3, 2) DEFAULT 0,
    reviews INTEGER DEFAULT 0,
    max_group_size INTEGER NOT NULL,
    images TEXT[] NOT NULL,
    highlights TEXT[],
    included TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- Slots Table
CREATE TABLE IF NOT EXISTS slots (
                                     id VARCHAR(50) PRIMARY KEY,
    experience_id VARCHAR(50) REFERENCES experiences(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    total_spots INTEGER NOT NULL,
    available_spots INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(experience_id, date, start_time)
    );

-- Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
                                        id VARCHAR(50) PRIMARY KEY,
    experience_id VARCHAR(50) REFERENCES experiences(id),
    slot_id VARCHAR(50) REFERENCES slots(id),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    guests INTEGER NOT NULL,
    promo_code VARCHAR(50),
    total_price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'confirmed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- Promo Codes Table
CREATE TABLE IF NOT EXISTS promo_codes (
                                           code VARCHAR(50) PRIMARY KEY,
    type VARCHAR(20) NOT NULL CHECK (type IN ('PERCENTAGE', 'FLAT')),
    value DECIMAL(10, 2) NOT NULL,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- Indexes for performance
CREATE INDEX idx_slots_experience_date ON slots(experience_id, date);
CREATE INDEX idx_bookings_email ON bookings(email);
CREATE INDEX idx_experiences_category ON experiences(category);