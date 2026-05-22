ALTER TABLE expense
    ADD CONSTRAINT fk_expense_fund
        FOREIGN KEY (fund_id)
            REFERENCES funds(fund_id);

ALTER TABLE expense
    ADD CONSTRAINT fk_expense_category
        FOREIGN KEY (category_id)
            REFERENCES category(id);