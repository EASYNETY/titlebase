-- MySQL Schema for when you deploy to your own server
-- Copy this to your MySQL database

CREATE DATABASE IF NOT EXISTS titlebase;
USE titlebase;

CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    wallet_address VARCHAR(42) UNIQUE,
    email VARCHAR(255),
    name VARCHAR(255),
    avatar_url TEXT,
    kyc_status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE properties (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    price DECIMAL(20, 2),
    category VARCHAR(100),
    images JSON,
    documents JSON,
    title_deed_hash VARCHAR(66),
    verification_status ENUM('pending', 'verified', 'rejected') DEFAULT 'pending',
    owner_id VARCHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id)
);

CREATE TABLE listings (
    id VARCHAR(36) PRIMARY KEY,
    property_id VARCHAR(36) NOT NULL,
    seller_id VARCHAR(36) NOT NULL,
    listing_type ENUM('fixed_price', 'auction') NOT NULL,
    price DECIMAL(20, 2),
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    status ENUM('active', 'sold', 'cancelled', 'expired') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES properties(id),
    FOREIGN KEY (seller_id) REFERENCES users(id)
);

CREATE TABLE bids (
    id VARCHAR(36) PRIMARY KEY,
    listing_id VARCHAR(36) NOT NULL,
    bidder_id VARCHAR(36) NOT NULL,
    amount DECIMAL(20, 2) NOT NULL,
    status ENUM('active', 'outbid', 'winning', 'won') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (listing_id) REFERENCES listings(id),
    FOREIGN KEY (bidder_id) REFERENCES users(id)
);

CREATE TABLE transactions (
    id VARCHAR(36) PRIMARY KEY,
    listing_id VARCHAR(36),
    buyer_id VARCHAR(36) NOT NULL,
    seller_id VARCHAR(36) NOT NULL,
    amount DECIMAL(20, 2) NOT NULL,
    transaction_hash VARCHAR(66),
    status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (listing_id) REFERENCES listings(id),
    FOREIGN KEY (buyer_id) REFERENCES users(id),
    FOREIGN KEY (seller_id) REFERENCES users(id)
);

-- Add indexes for better performance
CREATE INDEX idx_properties_owner ON properties(owner_id);
CREATE INDEX idx_properties_category ON properties(category);
CREATE INDEX idx_listings_property ON listings(property_id);
CREATE INDEX idx_listings_seller ON listings(seller_id);
CREATE INDEX idx_listings_status ON listings(status);
CREATE INDEX idx_bids_listing ON bids(listing_id);
CREATE INDEX idx_bids_bidder ON bids(bidder_id);
CREATE INDEX idx_transactions_buyer ON transactions(buyer_id);
CREATE INDEX idx_transactions_seller ON transactions(seller_id);
