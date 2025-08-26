-- Initialize Student Management Database
-- This script runs automatically when the PostgreSQL container starts

-- Create extensions if they don't exist
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create database user for application (if needed)
-- DO $$ 
-- BEGIN
--     IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'student_management_user') THEN
--         CREATE USER student_management_user WITH PASSWORD 'secure_password_here';
--     END IF;
-- END
-- $$;

-- Grant permissions
-- GRANT ALL PRIVILEGES ON DATABASE student_management TO student_management_user;
-- GRANT ALL PRIVILEGES ON DATABASE student_management_dev TO student_management_user;

-- Set timezone
SET timezone = 'Asia/Bangkok';

-- Log initialization
SELECT 'Student Management Database initialized successfully!' as status;



