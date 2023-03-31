-- Active: 1652468798455@@127.0.0.1@3306@studyapp

CREATE TABLE user(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    mail VARCHAR(255) NOT NULL UNIQUE,
    birth DATE NOT NULL, 
    country VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    sexe VARCHAR(5) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE user
ADD path_to_profile_photo TEXT(500);

CREATE TABLE subject(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    exercise BOOLEAN NOT NULL
);

CREATE TABLE emploi_du_temps(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE emploi_du_temps_content(
    id INT AUTO_INCREMENT PRIMARY KEY,
    subject VARCHAR(255) NOT NULL,
    date INT NOT NULL,
    time INT UNIQUE NOT NULL,
    chapter VARCHAR(255) NOT NULL,
    done BOOLEAN DEFAULT FALSE,
    emploi_du_temps_id INT NOT NULL,
    FOREIGN KEY (emploi_du_temps_id) REFERENCES emploi_du_temps(id) ON DELETE CASCADE
);

CREATE TABLE emploi_du_temps_subject(
    emploi_du_temps_id INT NOT NULL,
    subject_id INT NOT NULL,
    FOREIGN KEY (emploi_du_temps_id) REFERENCES emploi_du_temps(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subject(id) ON DELETE CASCADE
);

CREATE TABLE user_subject(
    user_id INT NOT NULL,
    subject_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subject(id) ON DELETE CASCADE
);

CREATE TABLE emploi_du_temps_day(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    calendar_timestamp INT NOT NULL,
    emploi_du_temps_id INT NOT NULL,
    FOREIGN KEY (emploi_du_temps_id) REFERENCES emploi_du_temps(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE user_images(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    path VARCHAR(255) NOT NULL,
    extension VARCHAR(10) NOT NULL,
    size INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE

);

ALTER TABLE user_images
DROP name;

ALTER TABLE emploi_du_temps_content
ADD FOREIGN KEY (emploi_du_temps_id) REFERENCES emploi_du_temps(id) ON DELETE CASCADE;

CREATE TABLE events_user(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    user_id INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

ALTER TABLE events_user
ADD date DATETIME NOT NULL;