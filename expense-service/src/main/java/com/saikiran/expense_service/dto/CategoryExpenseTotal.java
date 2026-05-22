package com.saikiran.expense_service.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class CategoryExpenseTotal {
    private String category;
    private BigDecimal total;

    public CategoryExpenseTotal(String category, BigDecimal total) {
        this.category = category;
        this.total = total;
    }
}

