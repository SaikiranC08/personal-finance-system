package com.saikiran.expense_service.responseDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaginatedResponse<T> {

    private List<T> data;          // actual response list (ExpenseResponse, FundResponse, etc.)
    private PaginationMeta pagination;
}
