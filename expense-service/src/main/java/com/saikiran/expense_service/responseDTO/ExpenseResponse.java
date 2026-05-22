package com.saikiran.expense_service.responseDTO;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.saikiran.expense_service.enums.OwnerType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ExpenseResponse {

    private BigDecimal amount;
    private String userId;
    private String currencyType;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    private String category;
    private String description;
    private OwnerType ownerType;
    private Long fundId;
    private Long expenseId;
}
