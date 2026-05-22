package com.saikiran.expense_service.responseDTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.saikiran.expense_service.enums.FundStatus;
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
public class FundResponse {

    private String userId;
    private Long fundId;
    private BigDecimal amountReceived;
    private String ownerName;
    private BigDecimal remainingAmount;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate givenDate;
    private FundStatus status;
}
