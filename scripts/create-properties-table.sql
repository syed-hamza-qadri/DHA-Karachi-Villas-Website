-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  price VARCHAR(50) NOT NULL,
  location VARCHAR(255) NOT NULL,
  image TEXT DEFAULT '/placeholder.svg?height=300&width=400',
  type VARCHAR(100) NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('For Sale', 'For Rent')),
  category VARCHAR(20) NOT NULL CHECK (category IN ('residential', 'commercial')),
  description TEXT NOT NULL,
  bedrooms INTEGER,
  bathrooms DECIMAL(3,1),
  area VARCHAR(50),
  building_size VARCHAR(50),
  total_floors INTEGER,
  parking_spaces INTEGER,
  zoning VARCHAR(100),
  lease_term VARCHAR(50),
  features JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_properties_category ON properties(category);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(type);
