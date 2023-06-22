CREATE TABLE (
id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
first_name varchar(30) NOT NULL,
password_hash varchar(200) NOT NULL,
)


CREATE TABLE animals (
id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
first_name varchar(30) NOT NULL,
type varchar(30) NOT NULL,
accessory varchar(40)
);
