-- Create trips table

CREATE TABLE trips(
id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 name varchar(30) NOT NULL,
 user_id(30) NOT NULL,
 is_private boolean
)

-- Insert into trips

INSERT INTO trips
(name, user_id, is_private)
VALUES
('Vietnam', '1', false),
('Vienna', '2', true),
('Sheridan', '2', false);

-- Read Users

SELECT * FROM trips;
