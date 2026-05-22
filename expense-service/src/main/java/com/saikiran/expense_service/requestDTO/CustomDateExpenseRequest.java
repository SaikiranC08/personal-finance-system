package com.saikiran.expense_service.requestDTO;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class CustomDateExpenseRequest {

    LocalDate startDate;
    LocalDate endDate;
}
