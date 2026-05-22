package com.saikiran.expense_service.requestDTO;


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
public class CreateExpenseRequest {

    private BigDecimal amount;
    private String userId;
    private String currencyType;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    private String category;
    private Long categoryId;
    private String ownerName;
    private OwnerType ownerType;
    private String idempotencyKey;
    private String description;

}
