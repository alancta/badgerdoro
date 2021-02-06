CREATE DATABASE jwttutorial;

-- DO : create extension if not exists "uuid-ossp";
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_firstName VARCHAR(255) NOT NULL,
    user_lastName VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL 
);

CREATE TABLE rewards(
    reward_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_email VARCHAR(255) NOT NULL,
    badgerbucks INTEGER
);

CREATE FUNCTION 


INSERT INTO users(user_name, user_email, user_password) VALUES ('alan', 'alanchuan803@gmail.com', 'alan');
INSERT INTO users(user_name, user_email, user_password) VALUES ('riza', 'ruhulruzbihan@gmail.com', 'riza1234');

INSERT INTO rewards(user_email,badgerbucks) VALUES ('ruhulruzbihan@gmail.com',100);

-- Update badgerbucks
UPDATE rewards SET badgerbucks = badgerbucks + 100 WHERE user_email = 'rania@gmail.com';