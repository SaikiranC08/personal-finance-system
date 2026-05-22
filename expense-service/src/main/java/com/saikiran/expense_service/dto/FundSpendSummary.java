package com.saikiran.expense_service.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.math.RoundingMode;

@Data
public class FundSpendSummary {
    private Long fundId;
    private String fundName;
    private BigDecimal amountSpent;
    private BigDecimal amountReceived;
    private BigDecimal remainingAmount;
    private BigDecimal amountSpendPercentage;

    // Constructor WITHOUT percentage parameter
    public FundSpendSummary(Long fundId, String fundName, Number amountSpent,
                            BigDecimal amountReceived, BigDecimal remainingAmount) {
        this.fundId = fundId;
        this.fundName = fundName;
        this.amountSpent = amountSpent != null ?
                new BigDecimal(amountSpent.toString()) : BigDecimal.ZERO;
        this.amountReceived = amountReceived;
        this.remainingAmount = remainingAmount;

        // Calculate percentage in Java with proper precision
        this.amountSpendPercentage = calculatePercentage();
    }

    private BigDecimal calculatePercentage() {
        if (amountReceived == null || amountReceived.compareTo(BigDecimal.ZERO) == 0) {
            return BigDecimal.ZERO;
        }

        return amountSpent
                .divide(amountReceived, 4, RoundingMode.HALF_UP)  // 4 decimal places
                .multiply(new BigDecimal("100"))
                .setScale(2, RoundingMode.HALF_UP);  // Final result: 2 decimal places
    }
}