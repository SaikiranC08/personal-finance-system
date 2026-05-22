package com.saikiran.expense_service.services;

import com.saikiran.expense_service.dto.CategoryExpenseTotal;
import com.saikiran.expense_service.dto.FundSpendSummary;
import com.saikiran.expense_service.repository.ExpenseRepository;
import com.saikiran.expense_service.repository.FundRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class DashboardService {



        private final ExpenseRepository expenseRepository;
        private final FundRepository fundRepository;

        public Map<String, BigDecimal> getCategoryWiseTotal(String userId) {

            List<CategoryExpenseTotal> totals =
                    expenseRepository.findCategoryTotals(userId);

            Map<String, BigDecimal> response = new HashMap<>();

            for (CategoryExpenseTotal total : totals) {
                response.put(
                        total.getCategory(),
                        total.getTotal()
                );
            }

            return response;
        }

    public List<FundSpendSummary> getFundWiseTotal(String userId) {
        return fundRepository.findFundSpendSummary(userId);
    }


}
