CREATE TABLE funds (
    fund_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    owner_type VARCHAR(255) NOT NULL,
    owner_name VARCHAR(255),
    amount_received DECIMAL(19,2),
    remaining_amount DECIMAL(19,2),
    status VARCHAR(255) NOT NULL,
    created_date DATE NOT NULL
);