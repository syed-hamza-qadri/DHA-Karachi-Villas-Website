-- Update the properties table to change id column from integer to text
-- This allows alphanumeric property IDs like 'PROP123', 'ABC-001', etc.

-- First, create a backup of the existing data
CREATE TABLE properties_backup AS SELECT * FROM properties;

-- Drop the existing primary key constraint
ALTER TABLE properties DROP CONSTRAINT IF EXISTS properties_pkey;

-- Change the id column type to text
ALTER TABLE properties ALTER COLUMN id TYPE TEXT USING id::TEXT;

-- Add the primary key constraint back
ALTER TABLE properties ADD PRIMARY KEY (id);

-- Update any existing numeric IDs to have a 'PROP' prefix
UPDATE properties 
SET id = 'PROP' || LPAD(id, 4, '0') 
WHERE id ~ '^[0-9]+$';

-- Add a comment to document the change
COMMENT ON COLUMN properties.id IS 'Alphanumeric property ID (e.g., PROP123, ABC-001)';
