-- Create trips table

CREATE TABLE trips(
id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 name varchar(30) NOT NULL,
 user_id(30) NOT NULL,
 is_private boolean
)

-- Insert into trips

INSERT INTO users
(name, user_id, is_private)
VALUES
('Jim', 'Abbot', 'Angels'),
('George', 'Brett', 'Cardinals'),
('Bo', 'Jackson', 'Royals');

-- Read Users

SELECT * FROM users;
