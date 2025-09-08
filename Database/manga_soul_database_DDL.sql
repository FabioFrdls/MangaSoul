CREATE DATABASE manga_soul;
USE manga_soul;

CREATE TABLE user (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    username VARCHAR(100) UNIQUE NOT NULL, 
    email VARCHAR(100) UNIQUE NOT NULL, 
    password VARCHAR(255) NOT NULL, 
    creation_timestamp TIMESTAMP,
    type VARCHAR(10) NOT NULL
);

CREATE TABLE genre (
    id BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE author (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    full_name VARCHAR(255) NOT NULL, 
    birthdate DATE
);

CREATE TABLE manga (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    summary TEXT NOT NULL,
    year INT NOT NULL,
    image VARCHAR(255) NOT NULL, 
    volumes INT NOT NULL,
    editor_name VARCHAR(255) NOT NULL,
    score Double,
    status VARCHAR(10) NOT NULL,
    author_id BIGINT NOT NULL,
    FOREIGN KEY (author_id) REFERENCES author(id)
);

CREATE TABLE manga_genre (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    manga_id BIGINT NOT NULL,
    genre_id BIGINT NOT NULL,
    FOREIGN KEY (manga_id) REFERENCES manga(id),
    FOREIGN KEY (genre_id) REFERENCES genre(id)
);

CREATE TABLE review (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    score INT NOT NULL, 
    text TEXT, 
    user_id BIGINT NOT NULL, 
    manga_id BIGINT NOT NULL,
    FOREIGN KEY (manga_id) REFERENCES manga(id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE library (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL, 
    manga_id BIGINT NOT NULL,
    status VARCHAR(10) NOT NULL,
    fav VARCHAR(3),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (manga_id) REFERENCES manga(id)
);