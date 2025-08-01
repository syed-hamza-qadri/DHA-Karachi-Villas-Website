-- Add images array column to properties table
ALTER TABLE properties ADD COLUMN IF NOT EXISTS images TEXT[];

-- Migrate existing single images to images array
UPDATE properties 
SET images = ARRAY[image] 
WHERE images IS NULL AND image IS NOT NULL;

-- Update properties with no image to have empty array
UPDATE properties 
SET images = ARRAY[]::TEXT[] 
WHERE images IS NULL;
