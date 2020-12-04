DROP TABLE IF EXISTS user;

CREATE TABLE user (
    id          INTEGER PRIMARY KEY,
    username    VARCHAR NOT NULL UNIQUE,
    password    VARCHAR NOT NULL
);
