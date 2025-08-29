CREATE DATABASE manga_soul;
USE manga_soul;

CREATE TABLE user(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    username VARCHAR(100) UNIQUE NOT NULL, 
    email VARCHAR(100) UNIQUE NOT NULL, 
    password VARCHAR(20) NOT NULL, 
    creation_timestamp TIMESTAMP,
    type VARCHAR(10) NOT NULL
);

CREATE TABLE genre(
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE author(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	full_name VARCHAR(255) NOT NULL, 
	birthate DATE
);

CREATE TABLE manga(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
    summary VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    image VARCHAR(255) NOT NULL, 
    volumes INT NOT NULL,
    editor_name VARCHAR(255) NOT NULL,
    score INT,
    status VARCHAR(10) NOT NULL,
    author_id INT NOT NULL,
    
    FOREIGN KEY (author_id) REFERENCES author(id)
);

CREATE TABLE manga_genre(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	manga_id INT NOT NULL,
	genre_id  INT NOT NULL,
    
    FOREIGN KEY (manga_id) REFERENCES manga(id),
    FOREIGN KEY (genre_id) REFERENCES genre(id)
);

CREATE TABLE review(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	score INT NOT NULL, 
    text VARCHAR(255), 
    user_id INT NOT NULL, 
    manga_id INT NOT NULL,
    
    FOREIGN KEY (manga_id) REFERENCES manga(id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE library(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	user_id INT NOT NULL, 
    manga_id INT NOT NULL,
    status varchar(10) NOT NULL,
    fav VARCHAR(3)
);



