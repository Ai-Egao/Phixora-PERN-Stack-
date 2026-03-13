CREATE EXTENSION IF NOT EXISTS "pgcrypto";



CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash TEXT,
    
    role VARCHAR(20) NOT NULL CHECK (role IN ('customer','provider','admin')),

    phone VARCHAR(20),
    profile_image TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(100) NOT NULL,
    description TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    customer_id UUID REFERENCES users(id),
    provider_id UUID REFERENCES users(id),
    service_id UUID REFERENCES services(id),

    booking_date TIMESTAMP,
    
    status VARCHAR(20) DEFAULT 'pending'
    CHECK (status IN ('pending','accepted','in_progress','completed','cancelled')),

    address TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
