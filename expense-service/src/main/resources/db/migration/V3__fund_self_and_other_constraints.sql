-- Generated column ONLY for SELF rows
-- ALTER TABLE funds
--     ADD COLUMN self_user_key VARCHAR(255)
--         GENERATED ALWAYS AS (
--             CASE
--                 WHEN owner_type = 'SELF' THEN user_id
--                 ELSE NULL
--                 END
--             ) STORED;

-- Enforce ONE SELF fund per user
-- CREATE UNIQUE INDEX uk_one_self_per_user
--     ON funds (self_user_key);

CREATE UNIQUE INDEX uk_user_other_name
    ON funds (user_id, owner_type, owner_name);
