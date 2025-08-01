-- Insert sample properties
INSERT INTO properties (
  title, price, location, type, status, category, description, 
  bedrooms, bathrooms, area, features
) VALUES 
(
  'Spacious Family Home with Garden',
  '75000000',
  'DHA Phase 6, Lahore',
  'House',
  'For Sale',
  'residential',
  'A beautiful and spacious family home located in the prestigious DHA Phase 6, featuring a large garden, modern interiors, and ample living space. Perfect for a growing family.',
  5,
  4,
  '5,445 sq yards',
  '["Swimming Pool", "Garden", "Garage", "Security System", "Modern Kitchen", "Walk-in Closets", "Balcony", "Fireplace"]'::jsonb
),
(
  'Modern Apartment in City Center',
  '32000000',
  'Gulberg III, Lahore',
  'Apartment',
  'For Rent',
  'residential',
  'Contemporary apartment in the vibrant heart of Gulberg, offering stunning city views, state-of-the-art amenities, and easy access to commercial hubs and entertainment.',
  3,
  2,
  '1,800 sq yards',
  '["City View", "Elevator", "Gym", "Parking", "24/7 Security", "Central AC", "Modern Appliances", "Balcony"]'::jsonb
),
(
  'Luxury Villa with Private Pool',
  '120000000',
  'Bahria Town, Karachi',
  'Villa',
  'For Sale',
  'residential',
  'An exquisite luxury villa boasting a private swimming pool, lush green lawns, and high-end finishes. Located in the serene environment of Bahria Town, perfect for an opulent lifestyle.',
  6,
  5,
  '10,890 sq yards',
  '["Private Pool", "Landscaped Garden", "Servant Quarters", "Home Theater", "Wine Cellar", "Gym", "Study Room", "Guest House"]'::jsonb
),
(
  'Cozy Townhouse in Gated Community',
  '48000000',
  'F-11, Islamabad',
  'Townhouse',
  'For Sale',
  'residential',
  'Charming townhouse within a secure gated community, offering a peaceful living environment with modern amenities and close proximity to schools and markets.',
  4,
  3,
  '1,500 sq yards',
  '["Gated Community", "Playground", "Community Center", "Parking", "Security", "Modern Kitchen", "Terrace", "Storage Room"]'::jsonb
),
(
  'Prime Commercial Office Building',
  '250000000',
  'Blue Area, Islamabad',
  'Office',
  'For Sale',
  'commercial',
  'A state-of-the-art commercial office building in the heart of Islamabad''s business district. Ideal for large corporations seeking a prestigious address.',
  NULL,
  NULL,
  NULL,
  '["Central AC", "High Speed Elevators", "24/7 Security", "Backup Generator", "Conference Rooms", "Cafeteria", "Reception Area", "Fire Safety System"]'::jsonb
),
(
  'Retail Shop in Busy Market',
  '60000000',
  'Anarkali Bazaar, Lahore',
  'Retail',
  'For Rent',
  'commercial',
  'A bustling retail shop located in the historic Anarkali Bazaar, perfect for businesses looking for high foot traffic and visibility.',
  NULL,
  NULL,
  NULL,
  '["High Foot Traffic", "Display Windows", "Storage Area", "Customer Parking", "Security System", "Modern Lighting", "Air Conditioning", "Loading Area"]'::jsonb
),
(
  'Large Warehouse for Logistics',
  '180000000',
  'Port Qasim, Karachi',
  'Warehouse',
  'For Sale',
  'commercial',
  'Expansive warehouse facility near Port Qasim, offering vast storage space and excellent connectivity for logistics and distribution operations.',
  NULL,
  NULL,
  NULL,
  '["Loading Docks", "High Ceiling", "Truck Access", "Security Fencing", "Office Space", "Weighbridge", "Cold Storage", "Fire Safety"]'::jsonb
),
(
  'Boutique Office Space',
  '40000000',
  'Clifton, Karachi',
  'Office',
  'For Rent',
  'commercial',
  'Chic boutique office space in a prime Clifton location, perfect for startups or small businesses seeking a modern and accessible workspace.',
  NULL,
  NULL,
  NULL,
  '["Sea View", "Modern Design", "Meeting Rooms", "Kitchen Area", "High Speed Internet", "Parking", "Security", "Reception"]'::jsonb
);

-- Update commercial properties with commercial-specific fields
UPDATE properties 
SET 
  building_size = '15,000 sq feet',
  total_floors = 10,
  parking_spaces = 50,
  zoning = 'Commercial',
  lease_term = '5 years'
WHERE title = 'Prime Commercial Office Building';

UPDATE properties 
SET 
  building_size = '800 sq feet',
  total_floors = 2,
  parking_spaces = 5,
  zoning = 'Retail',
  lease_term = '3 years'
WHERE title = 'Retail Shop in Busy Market';

UPDATE properties 
SET 
  building_size = '20,000 sq feet',
  total_floors = 1,
  parking_spaces = 100,
  zoning = 'Industrial',
  lease_term = '10 years'
WHERE title = 'Large Warehouse for Logistics';

UPDATE properties 
SET 
  building_size = '1,500 sq feet',
  total_floors = 3,
  parking_spaces = 10,
  zoning = 'Commercial',
  lease_term = '2 years'
WHERE title = 'Boutique Office Space';
