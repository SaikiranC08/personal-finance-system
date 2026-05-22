CREATE TABLE expense (
                         expense_id BIGINT AUTO_INCREMENT PRIMARY KEY,

                         idempotency_key VARCHAR(255) UNIQUE NOT NULL,

                         user_id VARCHAR(255),

                         amount DECIMAL(19,2),

                         currency_type VARCHAR(255),

                         date DATE,

                         description VARCHAR(255),

                         owner_type VARCHAR(255),

                         fund_id BIGINT,

                         category_id BIGINT,

                         created_at TIMESTAMP,

                         updated_at TIMESTAMP
);