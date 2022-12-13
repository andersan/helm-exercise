CREATE EXTENSION pgcrypto;

CREATE TABLE employees
(
    id SERIAL,
    name text,
    title text,
    CONSTRAINT employees_pkey PRIMARY KEY (id)
);

CREATE TABLE users
(
    id SERIAL,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    passhash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT users_pkey PRIMARY KEY (id)
    /* events as host */
    /* events as participant */
);

 CREATE TABLE events
(
    id SERIAL,
    title VARCHAR(255) NOT NULL,
    startTime TIMESTAMP NOT NULL,
    endTime TIMESTAMP NOT NULL,
    description text,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT events_pkey PRIMARY KEY (id),
    host_id INTEGER NOT NULL,
    participant_ids INTEGER[]
    /* host */
    /* participants */
);

CREATE TABLE participants
(
    id SERIAL,
    required BOOLEAN NOT NULL DEFAULT FALSE,
    attending BOOLEAN NOT NULL DEFAULT FALSE,
    user_id INTEGER NOT NULL,
    event_id INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT participant_pkey PRIMARY KEY (id)
    /* user */
    /* event */
);



INSERT INTO employees(name, title) VALUES
 ('Meadow Crystalfreak ', 'Head of Operations'),
 ('Buddy-Ray Perceptor', 'DevRel'),
 ('Prince Flitterbell', 'Marketing Guru');


INSERT INTO users(email, name, passhash) VALUES
('test@example.com ', 'Messi', crypt('131983ryewi123h,sajh312k3j12l', gen_salt('bf'))),
('test3@example.com ', 'Ronaldo', crypt(';oiknl,lasifdjm', gen_salt('bf'))),
('test2@example.com ', 'Neymar', crypt('dsfa;kjdsaf,09809uvckjl', gen_salt('bf')));


INSERT INTO events(title, startTime, endTime, description, host_id) VALUES
('Event 1', CURRENT_TIMESTAMP, CURRENT_DATE + INTERVAL '1 hour', 'Great event!!', 1),
('Event 2', CURRENT_TIMESTAMP, CURRENT_DATE + INTERVAL '1 hour', 'OK event!!', 2),
('Event 3', CURRENT_TIMESTAMP, CURRENT_DATE + INTERVAL '1 hour', 'The Best Event!!', 3);

INSERT INTO participants(user_id, event_id, required, attending) VALUES
(1, 1, TRUE, TRUE),
(2, 1, TRUE, FALSE),
(3, 1, FALSE, TRUE),
(1, 2, FALSE, TRUE),
(2, 2, TRUE, FALSE),
(3, 2, TRUE, FALSE),
(1, 3, FALSE, TRUE),
(2, 3, FALSE, TRUE),
(3, 3, FALSE, FALSE);