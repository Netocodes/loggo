select * from registers;













-- CREATE TABLE registers(
--     id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--     first_name VARCHAR(50) NOT NULL,
--     last_name VARCHAR(50) NOT NULL,
--     email VARCHAR(100) NOT NULL UNIQUE,
--     password VARCHAR(255) NOT NULL,
--     mobile_number VARCHAR(15) NOT NULL
-- )
-- select * from registers;

-- ALTER TABLE registers
-- ADD COLUMN IF NOT EXISTS reset_token VARCHAR(255),
-- ADD COLUMN IF NOT EXISTS reset_token_expiry TIMESTAMP;