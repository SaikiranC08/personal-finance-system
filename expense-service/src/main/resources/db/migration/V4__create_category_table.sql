CREATE TABLE category (
                          id BIGINT AUTO_INCREMENT PRIMARY KEY,

                          name VARCHAR(255) NOT NULL,

                          user_id VARCHAR(255),

                          source VARCHAR(50)
);