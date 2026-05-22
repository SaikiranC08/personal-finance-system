package com.saikiran.expense_service.requestDTO;

import com.fasterxml.jackson.annotation.JsonFormat;
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
public class CreateFundRequest {

    private String userId;
    private BigDecimal amountReceived;
    private String ownerName;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate givenDate;
    private String status;
    private String ownerType;
}
