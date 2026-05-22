package com.saikiran.expense_service.controller;

import com.saikiran.expense_service.dto.FundSpendSummary;
import com.saikiran.expense_service.enums.DateRange;
import com.saikiran.expense_service.responseDTO.ExpenseResponse;
import com.saikiran.expense_service.services.CustomDateService;
import com.saikiran.expense_service.services.DashboardService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/dashboard/v1")
@RequiredArgsConstructor
public class DashboardController {

    private final CustomDateService customDateService;
    private final DashboardService dashboardService;

    @GetMapping("/expenses")
    public ResponseEntity<List<ExpenseResponse>> getExpensesByRange(
            @RequestHeader("x-user-id") @NonNull String userId,
            @RequestParam DateRange range,
            @RequestParam(required = false) LocalDate startDate,
            @RequestParam(required = false) LocalDate endDate
    ) {
        return ResponseEntity.ok(
                customDateService.getExpensesByRange(userId, range, startDate, endDate)
        );
    }

    @GetMapping("/expenses/category-total")
    public ResponseEntity<Map<String, BigDecimal>> getCategoryTotals(
            @RequestHeader("x-user-id") String userId
    ) {
        return ResponseEntity.ok(
                dashboardService.getCategoryWiseTotal(userId)
        );
}

    @GetMapping("/funds/spend-summary")
    public ResponseEntity<List<FundSpendSummary>> getFundSpendSummary(
            @RequestHeader("x-user-id") String userId
    ) {
        return ResponseEntity.ok(
                dashboardService.getFundWiseTotal(userId)
        );
    }
}




